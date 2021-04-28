import { DiscordAPI, User, Game } from "@summonergg/league-inhouse-api";
import log from "chalk-logging";

export const drop: Command = async (api: DiscordAPI) => {
  try {
    var user: User = await api.findUser();
    if (!user) return;

    var game: Game = await api.findGame();
    if (!game) return;

    var found = await game.removePlayer(user);
    if (!found) return;

    await game.displayLobby();
  } catch(err) { log.warning(err) };
}