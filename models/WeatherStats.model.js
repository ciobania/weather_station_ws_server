const mongoose = require("mongoose");
const uuid = require('node-uuid');

// t, h, p, a, t, mac, ip

const weatherStatsSchema = new mongoose.Schema({
    _id: {type: String, default: uuid.v1},
    temp: {type: mongoose.Decimal128},
    humidity: {type: mongoose.Decimal128},
    pressure: {type: mongoose.Decimal128},
    altitude: {type: mongoose.Decimal128},
    timestamp: {type: mongoose.Decimal128},
    createdAt: {type: Date, default: Date.now},
    macAddress: {type: String},
    ipAddress: {type: String}
});

const WeatherStats = mongoose.model("WeatherStats", weatherStatsSchema);
module.exports = WeatherStats;
