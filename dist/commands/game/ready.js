import { __awaiter } from "tslib";
import { DiscordAPI } from "@summonergg/league-inhouse-api";
export const ready = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    var api = new DiscordAPI(msg);
    var user = yield api.findUser(["hasSummoner"]);
    var game = yield api.findGame();
    yield game.playerReady(msg.author.id);
    game.displayLobby();
    return;
});
//# sourceMappingURL=ready.js.map