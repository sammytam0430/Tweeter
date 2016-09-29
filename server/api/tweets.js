"use strict";

const User    = require("../lib/user-helper")
const express = require('express');
const tweets  = express.Router();

module.exports = function(db) {

  tweets.get("/", function(req, res) {
    let tweets = db.collection("tweets").find().sort({"created_at": -1});
    tweets.toArray((err, results) => {
      // simulate delay
      setTimeout(() => {
        return res.json(results);
      }, 300);
    });
  });

  tweets.get('/test', function(req, res) {
    res.send('hello world');
  });

  tweets.post("/", function(req, res) {
    console.log("New Tweet, Body:", req.body);
    const text = req.body.text
    if ((text.length > 140) || (text.length === 0) || text.match(/^\s+$/)) {
      res.status(400);
      return res.send("{'error': 'invalid request'}\n");
    }

    const user = req.body.user ? req.body.user : User.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };
    db.collection("tweets").insertOne(tweet, (err, result) => {
      console.log(result.ops[0]);
      res.json(result.ops[0]);
    });
  });

  return tweets;

}
