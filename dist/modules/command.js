import { readdir } from "fs";
export const CommandMap = {};
readdir("./src/commands/game", (err, files) => {
    var hostPerm = ["host", "cancel", "start"];
    files.forEach(file => {
        var name = file.split(".")[0];
        let perm = "member";
        if (hostPerm.includes(name))
            perm = "hoster";
        CommandMap[name] = {
            type: "game",
            perm: perm,
            exec: require(`../commands/game/${name}`)[name]
        };
    });
});
readdir("./src/commands/utility", (err, files) => {
    files.forEach(file => {
        var name = file.split(".")[0];
        CommandMap[name] = {
            type: "utility",
            perm: "none",
            exec: require(`../commands/utility/${name}`)[name]
        };
    });
});
readdir("./src/commands/server", (err, files) => {
    files.forEach(file => {
        var name = file.split(".")[0];
        CommandMap[name] = {
            type: "server",
            perm: "mod",
            exec: require(`../commands/server/${name}`)[name]
        };
    });
});
readdir("./src/commands/admin", (err, files) => {
    files.forEach(file => {
        var name = file.split(".")[0];
        CommandMap[name] = {
            type: "admin",
            perm: "mod",
            exec: require(`../commands/admin/${name}`)[name]
        };
    });
});
//# sourceMappingURL=command.js.map