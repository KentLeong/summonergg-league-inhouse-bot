import { DiscordAPI } from "@summonergg/league-inhouse-api";
import log from "chalk-logging";

export const signup: Command = async (api: DiscordAPI) => {
  try {
    // check if the params sent by user is valid
    var signupValid = await api.signupValid()
    if (!signupValid) return;
  
    // check if the summoner user provided is taken already
    var summonerTaken = await api.summonerTaken()
    if (!summonerTaken) return;
  
    // create token
    await api.createToken()
    return;
  } catch(err) {log.warning(err)}
}