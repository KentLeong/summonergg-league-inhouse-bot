var _a;
import { __awaiter } from "tslib";
import { Guild } from "@summonergg/league-inhouse-api";
import { log } from "chalk-logging";
import Discord from "discord.js";
const BOT_ID = (_a = process.env.BOT_ID) !== null && _a !== void 0 ? _a : "";
export const guildCreate = (client) => {
    client.on("guildCreate", (guild) => __awaiter(void 0, void 0, void 0, function* () {
        var guildData;
        var channel;
        // get or create new guild
        var isGuildExist = yield Guild.findOne({ id: guild.id });
        if (!isGuildExist) {
            guildData = yield Guild.new({ id: guild.id });
        }
        else {
            guildData = isGuildExist;
        }
        // look for text channel
        if (!guild.systemChannel) {
            yield guild.channels.cache.some((ch) => {
                if (ch.type == "text")
                    channel = ch;
                return true;
            });
        }
        else {
            channel = guild.systemChannel;
        }
        // create welcome message
        var message = new Discord.MessageEmbed({
            type: "rich",
            title: "Instructions",
            description: "```Please follow the inscructions below to get started.```"
        });
        // create host message
        var hostMessage = new Discord.MessageEmbed({
            type: "rich",
            title: "Instructions",
            description: "```INFO: A catergory and host channel has been created for you. Feel free to rename these channels. This channel is used to host and join games. By default they will be invisible to everyone. Set a role for them to be visible with .setRole```"
        });
        // check bot admin perm
        var bot = yield guild.members.fetch(BOT_ID);
        var isAdmin = yield bot.hasPermission("ADMINISTRATOR");
        if (!isAdmin) {
            message.description += "```ERROR: Please set this bot as an admin when inviting, otherwise it will not work. Bot will leave now server.```";
            yield guildData.save();
            yield channel.send(message);
            yield guild.leave();
            return;
        }
        // create member, hoster, and mod role
        var roles = {
            "mod": "",
            "hoster": "",
            "member": ""
        };
        for (let r in roles) {
            let roleData = yield guild.roles.create({
                data: { name: r },
                reason: "created by summonergg bot"
            });
            roles[r] = roleData.id;
            guildData.roles[r] = roleData.id;
        }
        message.description += "```INFO: 3 roles have been created. Feel free to customize role name, colors, perms. mod, hoster, member. mod will have hoster permission addition to admin perms for bot. hosters will be able to create games using bot. Members will be able to see these games.```";
        // get or create category channel
        var catChannel = yield guild.channels.resolve(guildData.channels.category);
        if (catChannel == null) {
            try {
                catChannel = yield guild.channels.create("summonergg", { type: "category" });
                guildData.channels.category = channel.id;
            }
            catch (err) {
                console.error(err);
                log.error("Could not create category channel");
            }
        }
        // check system channel
        var sysChannel = yield guild.channels.resolve(guildData.channels.verify);
        if (sysChannel == null) {
            if (!guild.systemChannel) {
                try {
                    sysChannel = yield guild.channels.create("summonergg-signup", { type: "text" });
                    guildData.channels.verify = sysChannel.id;
                    message.description += "```INFO: You dont have a systems channel, so a custom channel that acts as one has been generated for you called #summonergg-signup. This channel is used to signup users. Feel free to delete the channel if you assign a system channel.```";
                }
                catch (err) {
                    console.error(err);
                    log.error("Could not create verify channel");
                }
            }
            else {
                sysChannel = guild.systemChannel;
                message.description += "```INFO: Your systems channel #" + guild.systemChannel.name + " will be used as the text channel to verify users league accounts. You can change the desired system channel in the your server settings.```";
            }
        }
        else {
            message.description += "```INFO: Will continue to use #" + sysChannel.name + " to verify users.```";
        }
        // check if guild meets member requirements
        if (guild.memberCount < +process.env.MEMBERS) {
            message.description += "```ERROR: You do not meet the requirements of 100 members to use this bot.```";
        }
        // check if host channel exists
        var hostChannel = yield guild.channels.resolve(guildData.channels.host);
        if (hostChannel == null) {
            try {
                hostChannel = yield guild.channels.create("summonergg-host", { type: "text", parent: catChannel.id,
                    permissionOverwrites: [
                        {
                            id: guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: roles.mod,
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id: roles.hoster,
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id: roles.member,
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                });
                guildData.channels.host = hostChannel.id;
                hostChannel.send(hostMessage);
            }
            catch (err) {
                console.error(err);
                log.error("Could not create host channel");
            }
        }
        // send message
        sysChannel.send(message);
        yield guildData.save();
    }));
};
//# sourceMappingURL=index.js.map