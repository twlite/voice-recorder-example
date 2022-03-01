# Discord.js v13 Audio Recorder

This example shows how to make a voice recorder bot in discord.js v13 using **[DartJS](https://github.com/discord-player/dartjs)** framework.

# Installing

```s
$ git clone https://github.com/discord-player/voice-recorder-example.git
$ cd voice-recorder-example
$ yarn install # or npm install
```

Then rename `.env.example` to `.env` and add your bot token there:

```s
DISCORD_TOKEN=ABcdef.ghi123._jkl
```

Then run `yarn start` or `npm run start` to start the bot.

# Commands

* `!record` :: starts recording your voice
* `!play`   :: plays your recording
* `!ping`   :: bot latency