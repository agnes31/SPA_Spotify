const dotenv = require("dotenv") // This is the module that loads the .env file   
dotenv.config(); // This is the function that loads the .env file

module.exports = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
}
