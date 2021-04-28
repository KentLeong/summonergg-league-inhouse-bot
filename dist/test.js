import { __awaiter } from "tslib";
import dotenv from "dotenv";
dotenv.config();
import Discord from "discord.js";
const client = new Discord.Client();
client.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.content === ".delete") {
        let filter = (m) => m.author.id === msg.author.id;
        msg.channel.send("Are you sure you want to delete all data? \`YES\` / \`NO\`").then(() => __awaiter(void 0, void 0, void 0, function* () {
            var collector = msg.channel.createMessageCollector(filter, {});
            collector.on("collect", (m) => {
                console.log(`collected: ${m}`);
                if (m.content === "end") {
                    console.log("ending");
                    collector.stop();
                }
            });
            collector.on("end", (collected) => {
                console.log("collectin ended");
            });
        }));
    }
}));
client.login(process.env.DISCORD_TOKEN);
//# sourceMappingURL=test.js.map