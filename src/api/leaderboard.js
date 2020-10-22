const express = require('express');
const token = require("./config.json").token
const MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"
const Discord = require('discord.js')

const client = new Discord.Client()

client.login(token)

const router = express.Router();

router.get('/', (req, res) => {
    MongoClient.connect(url,  function(err, db) {
        if (err) throw err
        var dbo = db.db("metrix")
        dbo.collection("levels").find({}, {"_id":0, "user_id":0}).sort({exp: -1}).toArray(function(err, output) {
            if (err) throw err
            db.close()
            var newjson = JSON.stringify(output)
            res.status(200).send(newjson)
        })
    })
});

module.exports = router;
    