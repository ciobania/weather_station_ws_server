const {createServer} = require("http");
const express = require("express");
const WebSocket = require('ws');
const path = require('path');


const app = express();
const connectDb = require("./core/connection");
const WeatherStats = require("./models/WeatherStats.model");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.json({extended: false}));
app.use("/api/getStats", require("./routes/api/getStats"));

const port = process.env.PORT || 1337;
const server = createServer(app);
server.listen(port, () => {
    console.info(`Server running on port: ${port}`);

    connectDb().then(() => {
        console.log("MongoDb connected;");
    });
});

const ws = new WebSocket.Server({server});

const messages = ['Start Chatting!'];
ws.on('connection', (socketClient) => {
    console.log('connected');
    console.log('Number of clients: ', ws.clients.size);
    socketClient.send(JSON.stringify(messages));

    socketClient.on('message', (encodedMessage) => {
        console.log("Received message: " + encodedMessage.toString());
        //save weather_stats: time, temp, humidity, pressure, altitude, mac, ip
        const decodedMessage = Buffer.from(encodedMessage, 'base64').toString();
        const weatherMsg = decodedMessage.split("|");
        console.log("Weather decoded msg:: " + weatherMsg);
        new WeatherStats({
            timestamp: weatherMsg[0],
            temp: weatherMsg[1],
            humidity: weatherMsg[2],
            pressure: weatherMsg[3],
            altitude: weatherMsg[4],
            macAddress: weatherMsg[5],
            ipAddress: weatherMsg[6]
        }).save();
        // push back messages to the clients
        // messages.push(message);
        // ws.clients.forEach((client) => {
        //     if (client.readyState === WebSocket.OPEN) {
        //         client.send(JSON.stringify([message]));
        //     }
        // });
    });
    app.locals.clients = ws.clients;
    for (const client in ws.clients) {
        client.close();
    }
});
