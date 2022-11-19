// connection.js
const mongoose = require("mongoose");
const WeatherStats = require("../models/WeatherStats.model");
// const connectionURI = "mongodb://weather_station_user:weather_station_password@192.168.1.133:37017/weather-stats";
const connectionURI = "mongodb://weather_station_user:weather_station_password@192.168.1.133:37017/weather_stats?authSource=admin";
const connectDb = () => {
    return mongoose.connect(connectionURI, {useNewUrlParser: true});
};
module.exports = connectDb;
