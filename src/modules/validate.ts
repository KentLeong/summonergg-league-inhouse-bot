import { Game, User } from "@summonergg/league-inhouse-api";
interface gameVal {
  user: User,
  game: Game
}
export const gameValidation = async (res: any, msg: any):Promise<gameVal> => {
  var user: User = await User.findOne({discordId: msg.member.id});
  if (!user) return res(100);
  if (!user.accounts.lol[0]) return res(101);

  var game: Game = await Game.findOne({
    server: msg.guild.id,
    channel: msg.channel.id,
    done: false,
    state: "lobby"
  })
  if (!game) return res(102);
  
  return {
    user: user,
    game: game
  }
}