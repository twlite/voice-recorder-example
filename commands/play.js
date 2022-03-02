const fs = require("fs");

exports.name = "play";

exports.execute = async (client, message) => {

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send("Please join a voice channel!");

    if (!fs.existsSync(`${__dirname}/../records/recorded-${message.author.id}.pcm`)) return message.channel.send("Your audio is not recorded!");

    const connection = await client.voiceManager.join(voiceChannel, { selfDeaf: true });
    const stream = fs.createReadStream(`${__dirname}/../records/recorded-${message.author.id}.pcm`);

    const dispatcher = connection.play(stream, {
        type: "raw"
    });

    dispatcher.on("finish", () => {
        connection.destroy();
        return message.channel.send("finished playing audio");
    })
}