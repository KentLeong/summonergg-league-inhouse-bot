import { readdir } from "fs";

export const commandTranslate: Record<string, TranslateLanguage> = {};

readdir("./src/modules/translate/languages", (err, files) => {
  files.forEach(file => {
    var name = file.split(".")[0];
    commandTranslate[name] = require(`./languages/${name}`)[name];
  })
})

