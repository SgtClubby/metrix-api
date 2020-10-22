const express = require('express');
const MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"

const router = express.Router();

router.get('/', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true },  function(err, db) {
        if (err) throw err
        var dbo = db.db("FortiAPI")
        dbo.collection("cloudkeys").find({}).toArray(function(err, output) {
            if (err) throw err
            db.close()
            var res_json = JSON.stringify(output)
            res.status(200).send(res_json)
        })
    })
});

module.exports = router;
    