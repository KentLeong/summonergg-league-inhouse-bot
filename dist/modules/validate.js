import { __awaiter } from "tslib";
import { Game, User } from "@summonergg/league-inhouse-api";
export const gameValidation = (res, msg) => __awaiter(void 0, void 0, void 0, function* () {
    var user = yield User.findOne({ discordId: msg.member.id });
    if (!user)
        return res(100);
    if (!user.accounts.lol[0])
        return res(101);
    var game = yield Game.findOne({
        server: msg.guild.id,
        channel: msg.channel.id,
        done: false,
        state: "lobby"
    });
    if (!game)
        return res(102);
    return {
        user: user,
        game: game
    };
});
//# sourceMappingURL=validate.js.map