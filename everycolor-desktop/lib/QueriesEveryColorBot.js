const Twitter = require('twitter')
const credentials = require('../credentials')

let client = new Twitter({
    consumer_key: credentials.twitter.consumer_key,
    consumer_secret: credentials.twitter.consumer_secret,
    access_token_key: credentials.twitter.access_token_key,
    access_token_secret: credentials.twitter.access_token_secret
})

function listenForLatestTweet(){
    console.log("here's the latest tweet")
}

function getLatestColor(){
    return '#34eaf7'
}

module.exports = {
    getLatestColor
}