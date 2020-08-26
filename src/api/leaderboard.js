const express = require('express');

const MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"
const Discord = require('discord.js')

const client = new Discord.Client()

client.login("Njk0NDc2ODUyMjgyMTMwNDU1.XvPApw.j_qZJLaKNYtiOpB6BtuB5ZiVYJQ")

const router = express.Router();

router.get('/', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true },  function(err, db) {
        if (err) throw err
        var dbo = db.db("metrix")
        dbo.collection("levels").find({}).sort({exp: -1}).limit(10).toArray(function(err, output) {
            if (err) throw err
            db.close()
            var newjson = JSON.stringify(output)
            res.send(newjson)
        })
    })
});

module.exports = router;
    