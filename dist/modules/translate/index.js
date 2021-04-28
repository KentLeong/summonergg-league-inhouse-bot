import { readdir } from "fs";
export const commandTranslate = {};
readdir("./src/modules/translate/languages", (err, files) => {
    files.forEach(file => {
        var name = file.split(".")[0];
        commandTranslate[name] = require(`./languages/${name}`)[name];
    });
});
//# sourceMappingURL=index.js.map