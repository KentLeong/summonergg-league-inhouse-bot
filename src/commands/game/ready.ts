import Discord from "discord.js";
import { User, Game, DiscordAPI } from "@summonergg/league-inhouse-api";
import log from "chalk-logging";

export const ready: Command = async (api: DiscordAPI) => {
  try {
    var user: User = await api.findUser(["hasSummoner"]);
    var game: Game = await api.findGame();
  
    await game.playerReady(api.msg.author.id);
    await game.displayLobby();
    return;
  } catch(err) {log.warning(err)}
}