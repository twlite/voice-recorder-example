exports.name = "ping";

exports.execute = (client, message) => {
    message.channel.send({
        embeds: [
            {
                title: "Pong!",
                footer: {
                    text: `${Math.floor(client.ws.ping)}ms`
                },
                color: "BLURPLE"
            }
        ]
    });
};