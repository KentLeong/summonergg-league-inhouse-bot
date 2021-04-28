import { User, Game, DiscordAPI } from "@summonergg/league-inhouse-api";
import log from "chalk-logging";

export const join: Command = async (api: DiscordAPI) => {
  try {
    var user: User = await api.findUser(["hasSummoner", "isNotInGame"]);
    if (!user) return;
  
    var game: Game = await api.findGame();
    if (!game) return;

    var playerAdded = await game.addPlayer(user);
    if (!playerAdded) return;

    await game.displayLobby();
    return;
  } catch(err) { log.warning(err) }
}