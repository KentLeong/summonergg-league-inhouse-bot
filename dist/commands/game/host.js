import { __awaiter } from "tslib";
export const host = (msg, api) => __awaiter(void 0, void 0, void 0, function* () {
    var user = yield api.findUser(["hasSummoner"]);
    if (!user)
        return;
    // if (await user.IsInGame()) return;
    if (yield api.findGame())
        return;
    // var game: Game = await api.hostGame(user);
    // game.displayLobby();
});
//# sourceMappingURL=host.js.map