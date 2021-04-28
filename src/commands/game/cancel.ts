import { DiscordAPI, User, Game } from "@summonergg/league-inhouse-api";
import log from "chalk-logging";

export const cancel: Command = async (api: DiscordAPI) => {
  try {
    var user: User = await api.findUser(["hasSummoner"]);
    if (!user) return;

    var game: Game = await api.findGame();
    if (!game) return;

    if (game.host !== user.discordId && !api.msg.auth("mod")) return;

    await game.cancel();
    return;
  } catch(err) { log.error(err) };
}