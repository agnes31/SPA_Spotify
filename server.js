const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const { CLIENT_ID, CLIENT_SECRET } = require("./config");

// récupère le token
app.use("/static", express.static(path.resolve(__dirname, "public", "static")));

app.get("/generateToken", async (req, res) => {
    const url = 'https://accounts.spotify.com/api/token';
    const options = {
        method: "POST",
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const data = JSON.stringify(result);
        res.send(data);
    } catch (error) {
        console.log(error)
    }
});

// renvoie l'index.html
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// lance le serveur
app.listen(4003, () => console.log("Server running..."))