import log from "chalk-logging";

export const ready: CommandEvent = (client) => {
  client.on("ready", () => {
    log.success("Successfully connected to discord");
  })
}