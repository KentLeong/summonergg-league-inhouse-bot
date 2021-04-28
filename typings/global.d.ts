import Discord, { Client } from "discord.js";
import { DiscordAPI, Guild } from "@summonergg/league-inhouse-api";
import { LobbyBot } from "@summonergg/league-inhouse-lobby-client";

declare global {
  type Command = (api: DiscordAPI) => Promise<void | object>;
  type CommandEvent = (client: Discord.Client) => void;

  type bots = Record<string, bot>;
  type bot = Map<string, LobbyBot>;
  type Translater = (msg: Discord.Message) => (id: number, args?: Record<string, any>) => void;
  type TranslateLanguage = Record<string, string>;
  type TranslateResponse = (id: number, args?: Record<string, any>) => undefined;
  type CommmandType = "admin" | "utility" | "server" | "game";
  type UserAuth = "leong" | "owner" | "mod" | "hoster" | "member" | "none";
  type regions = "na" | "kr";
  type auth = (level: UserAuth) => boolean;
  type CommandModel = {
    type: CommandType,
    perm: UserAuth,
    exec: Command
  }

  interface DiscordMessage extends Discord.Message {
    server?: Guild;
    args?: string[];
    auth?: auth;
    command?: string;
  }
}