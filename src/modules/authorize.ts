import Discord from "discord.js";
import { Guild } from "@summonergg/league-inhouse-api";

export function Authorize(roles: Guild["roles"], msg: Discord.Message) {
  return function auth(level: UserAuth): boolean {
    var auth = {
      leong: 5,
      owner: 4,
      mod: 3,
      hoster: 2,
      member: 1,
      none: 0
    }
    var authLevel = 0
    if (msg.member?.id == "752025586171510865") {
      authLevel = 5;
    } else if (msg.member?.id == msg.guild?.owner?.id) {
      authLevel = 4;
    } else if (msg.member?.roles.cache.some(role => role.id === roles.mod)) {
      authLevel = 3;
    } else if (msg.member?.roles.cache.some(role => role.id === roles.hoster)) {
      authLevel = 2;
    } else if (msg.member?.roles.cache.some(role => role.id === roles.member)) {
      authLevel = 1;
    }
    return (authLevel >= auth[level])
  }
}
 
 