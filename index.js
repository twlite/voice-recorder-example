require("dotenv").config();
const { DartVoiceManager } = require("dartjs");
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});
const { existsSync, mkdirSync, readdirSync } = require("fs");
const COMMAND_PREFIX = "!";
const commands = new Collection;

client.voiceManager = new DartVoiceManager(client);

const commandsList = readdirSync(`${__dirname}/commands`);

for (const commandPath of commandsList) {
    const commandFile = require(`${__dirname}/commands/${commandPath}`);
    commands.set(commandFile.name, commandFile);
}

client.on("ready", () => {
    console.log("Bot is online!");

    // make records dir
    if (!existsSync(`${__dirname}/records`)) {
        mkdirSync(`${__dirname}/records`, { recursive: true });
    }
});

client
    .on("error", console.error)
    .on("warn", console.warn);

client.on("messageCreate", async (message) => {
    if (!message.guildId || message.author.bot) return;

    const [command, ...args] = message.content.slice(COMMAND_PREFIX.length).trim().split(
        String.fromCharCode(32)
    );

    if (!commands.has(command)) return;
    
    try {
        await commands.get(command).execute(client, message, args);
    } catch(e) {
        console.error(e);
    }
});

void client.login();