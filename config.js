// The Path module provides a way of working with directories and file paths
const path = require("path");
const dotenv = require("dotenv");


dotenv.config( path.join(__dirname, "./env") );
const config = {
  email: {
    email: process.env.email
  },
  password: {
    password: process.env.password
  }

};
// console.log("asascas"+config.email.email);

module.exports = config;
