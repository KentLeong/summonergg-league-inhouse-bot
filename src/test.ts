import dotenv from "dotenv";
dotenv.config();
import Discord from "discord.js";

const client = new Discord.Client();

client.on("message", async (msg: Discord.Message) => {
  if (msg.content === ".delete") {
    let filter = (m: any) => m.author.id === msg.author.id;
    msg.channel.send("Are you sure you want to delete all data? \`YES\` / \`NO\`").then(async () => {
      var collector = msg.channel.createMessageCollector(filter, {});

      collector.on("collect", (m: any) => {
        console.log(`collected: ${m}`)
        if (m.content === "end") {
          console.log("ending")
          collector.stop();
        }
      })
      collector.on("end", (collected: any) => {
        console.log("collectin ended")
      })
    })
  }
})

client.login(process.env.DISCORD_TOKEN);