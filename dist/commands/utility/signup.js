import { __awaiter } from "tslib";
export const signup = (msg, api) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("run");
    var signupValid = yield api.signupValid();
    if (!signupValid)
        return;
    var summonerTaken = yield api.summonerTaken();
    if (!summonerTaken)
        return;
    yield api.createToken();
    return;
});
//# sourceMappingURL=signup.js.map