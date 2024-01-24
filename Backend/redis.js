require("dotenv").config();
const { createClient } = require("redis");

//redis config
const client = createClient({
    password: process.env.REDISPASSWORD,
    socket: {
      host: process.env.REDISURL,
      port: 16357,
    },
    legacyMode: true 
  }).on("error", (err) => console.log("redis error"));



module.exports={
    client
  }