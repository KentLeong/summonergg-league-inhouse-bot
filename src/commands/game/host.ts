import { User, Game, DiscordAPI } from "@summonergg/league-inhouse-api";
import log from "chalk-logging";

export const host: Command = async (api: DiscordAPI) => {
  try {
    // checks if user has a summoner and is not in a inhouse game already
    var user: User = await api.findUser(["hasSummoner", "isNotInGame"]);
    if (!user) return;
  
    var game: Game = await api.hostGame(user);
  
    await game.displayLobby();
  } catch(err) { log.warning(err) }
}