import { __awaiter } from "tslib";
import dotenv from "dotenv";
dotenv.config();
import Discord from "discord.js";
import { DiscordAPI, Guild } from "@summonergg/league-inhouse-api";
import { events } from "./events";
import { CommandMap, commandTranslate, Authorize } from "./modules";
const guildMap = new Map();
const limiter = new Map();
const client = new Discord.Client();
events.forEach(event => event(client));
client.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    var guild;
    // return messages that are from bots/dms/noguild and not approved
    if (msg.author.bot || msg.channel.type == "dm" || !msg.guild)
        return;
    // retrieve/create guild settings
    if (!guildMap.has(msg.guild.id)) {
        guild = yield Guild.findOne({ id: msg.guild.id }, msg);
        console.log(guild);
        if (!guild)
            return;
        guildMap.set(guild.id, guild);
    }
    else {
        guild = guildMap.get(msg.guild.id);
    }
    if (guild.prefix === msg.content.slice(0, guild.prefix.length)) {
        // get command
        var auth = Authorize(guild.roles, msg);
        var args = msg.content.split(" ");
        var command = (_b = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.slice(guild.prefix.length)) !== null && _b !== void 0 ? _b : "help";
        var translated = (_c = commandTranslate[guild.language][command]) !== null && _c !== void 0 ? _c : commandTranslate["en_US"][command];
        if (!CommandMap[translated])
            return;
        // check spam
        if (!limiter.has((_d = msg.member) === null || _d === void 0 ? void 0 : _d.id))
            limiter.set((_e = msg.member) === null || _e === void 0 ? void 0 : _e.id, {});
        var user = limiter.get((_f = msg.member) === null || _f === void 0 ? void 0 : _f.id);
        if (!user[command])
            user[command] = 0;
        if (user[command] > 4)
            return console.log("rate limited");
        user[command]++;
        limiter.set((_g = msg.member) === null || _g === void 0 ? void 0 : _g.id, user);
        // run command
        var c = CommandMap[translated];
        msg.server = guild;
        msg.args = args;
        msg.auth = auth;
        msg.command = command;
        if (!msg.auth(c.perm))
            return;
        var api = new DiscordAPI(msg);
        var data = yield c.exec(msg, api);
        // if command returned any data run
        if (data) {
        }
    }
}));
setInterval(() => {
    limiter.clear();
}, 10000);
client.login(process.env.DISCORD_TOKEN);
//# sourceMappingURL=app.js.map