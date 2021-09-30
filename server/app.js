const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require('dotenv').config();

var Web3 = require("web3");
var web3 = new Web3();

//Init Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.post("/api/ido/sign/v1", async (req, res) => {

    try {

        const api_key = req.body.apiKey;
        if (api_key !== process.env.API_KEY) {
            return res.status(404).send({ message: "Access denied, Unauthorized user" });
        }

        let userSting = req.body.userString;
        // Descrypting the key for sign
        const actualKey = () => {
            let oldKey = process.env.PRIVATE_KEY;
            let newKey = oldKey.split("").reverse().join("");
            return newKey;
        };

        let privateKey = actualKey();
        let data = await web3.eth.accounts.sign(
            userSting.toString(),
            privateKey
        );
        return res.status(201).send(data);

    } catch (error) {
        console.log('error', error)
        return res.status(401).send({ success: false, data: null, message: "Something went wrong in sign function" })
    }
});



module.exports = app;