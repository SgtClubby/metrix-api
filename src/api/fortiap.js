const express = require('express');
const apikey = require("./config.json").apikey
const MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"
const router = express.Router();

router.post("/", async (req, res) => {
        try {
            // Gets URL Params and parses to find apikey, returns if invalid or not available
            const params = req.query
            if (!params.apikey) return res.json({message:"No API Key provided!"})
            if (params.apikey != apikey) return res.json({message:"Invalid API Key!"})

            //gets data from body and parses
            let dataparsed = req.body.text
            
            function isJson(str) {
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            }

            //connect to DB
            MongoClient.connect(url, function(err, db) {
                var dbo = db.db("FortiAPI")
                var coll = dbo.collection("cloudkeys", function(err, collection) {})
                //Ready the data for insertion
                if (isJson(dataparsed) === true) {
                    dataparsed = JSON.parse(dataparsed)
                }
                const cloudkey = dataparsed.cloud_key
                const serial = dataparsed.serial

                coll.findOne({
                    cloud_key: cloudkey
                }, (err, cloud_key) => {
                    if (err) console.error(err)
                    if (!cloud_key) {
                        var newcloud_key = {
                            cloud_key: cloudkey,
                            serial: serial,
                            createdAt: new Date()
                        } 
                        dbo.collection("cloudkeys").insertOne(newcloud_key, function(err, result) {
                            if (!err) {
                                res.status(200).json({message:`Success! ${result}`})
                            } else {
                                res.json({message:err})
                            }
                        })
                        db.close()
                    } else {
                        res.status(409).json({message: "Cloud Key already in database!"})
                    }
                })
            })
        } catch (error) {
            throw error 
        }         
     });
  
    /**
     * @method - POST
     * @param - /ScanClass
     * @description - Get Cloud_Key of FortiAP for FortiCloud
     */

module.exports = router;