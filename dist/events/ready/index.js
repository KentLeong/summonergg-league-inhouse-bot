import { log } from "chalk-logging";
export const ready = (client) => {
    client.on("ready", () => {
        log.success("Successfully connected to discord");
    });
};
//# sourceMappingURL=index.js.map