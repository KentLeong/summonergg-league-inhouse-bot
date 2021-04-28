import { DiscordAPI, User, Game } from "@summonergg/league-inhouse-api";
import log from "chalk-logging";

export const start: Command = async (api: DiscordAPI) => {
  try {
    var user: User = await api.findUser(["hasSummoner"]);
    if (!user) return;

    var game: Game = await api.findGame();
    if (!game) return;

    if (game.host !== user.discordId && !api.msg.auth("mod")) return;
    
    var isReady = await game.isReady();
    if (!isReady) return;

    await game.startLobby();
    return;
  } catch(err) { log.error(err) }
}