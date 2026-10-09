const mongoose = require("mongoose")
const dns = require ("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();
const connectDB=()=>{
    return mongoose
    .connect(process.env.DB_LINK,)
    .then(()=>{
    console.log("connected to db successfuly")})
    .catch((err)=>{
        console.log(err);
    })}
module.exports={connectDB}