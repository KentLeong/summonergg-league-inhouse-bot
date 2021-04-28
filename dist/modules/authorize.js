export function Authorize(roles, msg) {
    return function auth(level) {
        var _a, _b, _c, _d, _e, _f, _g;
        var auth = {
            leong: 5,
            owner: 4,
            mod: 3,
            hoster: 2,
            member: 1,
            none: 0
        };
        var authLevel = 0;
        if (((_a = msg.member) === null || _a === void 0 ? void 0 : _a.id) == "752025586171510865") {
            authLevel = 5;
        }
        else if (((_b = msg.member) === null || _b === void 0 ? void 0 : _b.id) == ((_d = (_c = msg.guild) === null || _c === void 0 ? void 0 : _c.owner) === null || _d === void 0 ? void 0 : _d.id)) {
            authLevel = 4;
        }
        else if ((_e = msg.member) === null || _e === void 0 ? void 0 : _e.roles.cache.some(role => role.id === roles.mod)) {
            authLevel = 3;
        }
        else if ((_f = msg.member) === null || _f === void 0 ? void 0 : _f.roles.cache.some(role => role.id === roles.hoster)) {
            authLevel = 2;
        }
        else if ((_g = msg.member) === null || _g === void 0 ? void 0 : _g.roles.cache.some(role => role.id === roles.member)) {
            authLevel = 1;
        }
        return (authLevel >= auth[level]);
    };
}
//# sourceMappingURL=authorize.js.map