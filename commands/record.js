const fs = require("fs");

exports.name = "record";

exports.execute = async (client, message) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send("Please join a voice channel first!");

    const connection = await client.voiceManager.join(voiceChannel, { selfMute: true });
    const receiver = connection.receiver.createStream(message.member, {
        mode: "pcm",
        end: "silence"
    });

    const writer = receiver.pipe(fs.createWriteStream(`${__dirname}/../records/recorded-${message.author.id}.pcm`));
    writer.once("finish", () => {
        connection.disconnect();
        message.channel.send("Finished writing audio");
    });
};