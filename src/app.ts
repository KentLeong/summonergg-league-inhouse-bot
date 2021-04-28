import dotenv from "dotenv";
dotenv.config();
import log from "chalk-logging";
import Discord from "discord.js";
import { DiscordAPI, Guild } from "@summonergg/league-inhouse-api";
import { Summoner } from "@summonergg/riot-api";
import { events } from "./events";
import { CommandMap, commandTranslate, Authorize } from "./modules";
import { LobbyBot } from "@summonergg/league-inhouse-lobby-client";

const guildMap = new Map();
const limiter = new Map();

const client = new Discord.Client();

events.forEach(event => event(client));

client.on("message", async (msg: DiscordMessage) => {
  var guild: Guild;
  // return messages that are from bots/dms/noguild and not approved
  if (msg.author.bot || msg.channel.type == "dm" || !msg.guild) return;

  // retrieve/create guild settings
  if (!guildMap.has(msg.guild.id)) {
    guild = await Guild.findOne({id: msg.guild.id});
    if (!guild) return;
    guildMap.set(guild.id, guild);
  } else {
    guild = guildMap.get(msg.guild.id);
  }

  if (guild.prefix ===  msg.content.slice(0, guild.prefix.length)) {
    // get command
    var auth = Authorize(guild.roles, msg);
    var args: Array<string> = msg.content.split(" ");
    var command: string = args.shift()?.slice(guild.prefix.length) ?? "help";
    var translated = commandTranslate[guild.language][command] ?? commandTranslate["en_US"][command];
    if (guild.channels.hosts.includes(msg.channel.id) && !CommandMap[translated]) {
      if (msg.deletable) msg.delete();
    }
    if (!CommandMap[translated]) return;
    // check spam
    if (!limiter.has(msg.member?.id)) limiter.set(msg.member?.id, {});
    var user = limiter.get(msg.member?.id);
    if (!user[command]) user[command] = 0;
    if (user[command] > 4) return console.log("rate limited");
    user[command]++;
    limiter.set(msg.member?.id, user);

    // run command
    var c = CommandMap[translated];
    msg.server = guild;
    msg.args = args;
    msg.auth = auth;
    msg.command = command;
    if (!msg.auth(c.perm)) return;
    var api: DiscordAPI = new DiscordAPI({msg});
    log.info(command);
    setTimeout(() => {
      if (msg.deletable) msg.delete();
    }, 1000)
    await c.exec(api).then((data: any) => {
      log.complete(command);
    })
  } else if (guild.channels.hosts.includes(msg.channel.id)) {
    setTimeout(() => {
      if (msg?.deletable) msg?.delete();
    }, 1000)
  }
})

setInterval(() => {
  limiter.clear();
}, 10000)

client.login(process.env.DISCORD_TOKEN);