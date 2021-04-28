"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const chalk_1 = tslib_1.__importDefault(require("chalk"));
exports.default = {
    title(message) {
        if (process.env.DEV == "false")
            return;
        console.log(chalk_1.default.bold(message));
    },
    success(message) {
        var _a;
        if (process.env.DEV == "false")
            return;
        if (typeof message == "object" && message.statusText) {
            var msg = (_a = message.statusText) === null || _a === void 0 ? void 0 : _a.split(" : ");
            var status = chalk_1.default.green("success " + msg[0]);
            console.log(status + " " + msg[1]);
        }
        else {
            var status = chalk_1.default.green("success ");
            console.log(status + message);
        }
    },
    warning(message) {
        var _a;
        if (process.env.DEV == "false")
            return;
        if (typeof message == "object" && message.statusText) {
            var msg = (_a = message.statusText) === null || _a === void 0 ? void 0 : _a.split(" : ");
            var status = chalk_1.default.yellow("warning " + msg[0]);
            console.log(status + " " + msg[1]);
        }
        else {
            var status = chalk_1.default.yellow("warning ");
            console.log(status + message);
        }
    },
    info(message) {
        var _a;
        if (process.env.DEV == "false")
            return;
        if (typeof message == "object" && message.statusText) {
            var msg = (_a = message.statusText) === null || _a === void 0 ? void 0 : _a.split(" : ");
            var status = chalk_1.default.blue("info " + msg[0]);
            console.log(status + " " + msg[1]);
        }
        else {
            var status = chalk_1.default.blue("info ");
            console.log(status + message);
        }
    },
    error(message) {
        var _a;
        if (process.env.DEV == "false")
            return;
        if (typeof message == "object" && message.statusText) {
            var msg = (_a = message.statusText) === null || _a === void 0 ? void 0 : _a.split(" : ");
            var status = chalk_1.default.red("error " + msg[0]);
            console.log(status + " " + msg[1]);
        }
        else {
            var status = chalk_1.default.red("error ");
            console.log(status + message);
        }
    },
    complete(message) {
        var _a;
        if (process.env.DEV == "false")
            return;
        if (typeof message == "object" && message.statusText) {
            var msg = (_a = message.statusText) === null || _a === void 0 ? void 0 : _a.split(" : ");
            var status = chalk_1.default.magenta("complete " + msg[0]);
            console.log(status + " " + msg[1]);
        }
        else {
            var status = chalk_1.default.magenta("complete ");
            console.log(status + message);
        }
    },
    group(messages) {
        if (process.env.DEV == "false")
            return;
        var branch = "├─";
        var end = "└─";
        for (let i = 0; i < messages.length; i++) {
            if (i + 1 === messages.length)
                return console.log(end + " " + messages[i]);
            console.log(branch + " " + messages[i]);
        }
    },
    branch(message) {
        if (process.env.DEV == "false")
            return;
        console.log("├─ " + message);
    },
    openBranch(message) {
        if (process.env.DEV == "false")
            return;
        console.log("├  " + message);
    },
    endBranch(message) {
        if (process.env.DEV == "false")
            return;
        console.log("└─ " + message);
    }
};
//# sourceMappingURL=index.js.map