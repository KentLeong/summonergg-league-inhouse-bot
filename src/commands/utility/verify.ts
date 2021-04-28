import { Token, DiscordAPI, User } from "@summonergg/league-inhouse-api";
import { Summoner } from "@summonergg/riot-api";
import log from "chalk-logging";

export const verify: Command = async (api: DiscordAPI) => {
  try {
    // get Token from User
    var token: Token = await api.getToken();
    if (!token) return;
  
    // Get Summoner from riot API
    var summoner: Summoner = await Summoner.get({summonerId: token.summonerId, region: token.region});
    if (!summoner) return;
  
    // check if the profile icons match from token and Summoner
    var checkIcons = await api.compareIcons(summoner, token);
    if (!checkIcons) return;
  
    // find/create user and add summoner and then delete token
    var user: User = await api.findOrCreateUser();
    await user.addSummoner(summoner, token.region);
    await token.delete();
  } catch(err) {log.warning(err)}
}