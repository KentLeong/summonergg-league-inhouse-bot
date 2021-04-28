import { __awaiter } from "tslib";
import { Summoner } from "@summonergg/riot-api";
export const verify = (msg, api) => __awaiter(void 0, void 0, void 0, function* () {
    var token = yield api.getToken();
    if (!token)
        return;
    var summoner = yield Summoner.get({ summonerId: token.summonerId, region: token.region });
    if (!summoner)
        return;
    var checkIcons = yield api.compareIcons(summoner, token);
    if (!checkIcons)
        return;
    var user = yield api.findOrCreateUser();
    yield user.addSummoner(summoner, token.region);
    yield token.delete();
    return;
});
//# sourceMappingURL=verify.js.map