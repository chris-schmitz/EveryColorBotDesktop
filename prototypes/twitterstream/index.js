const Twitter = require('twitter-api-stream')
const twitterCredentials = require('./credentials').twitter

const twitterApi = new Twitter(twitterCredentials.consumerKey, twitterCredentials.consumerSecret, function(){
    console.log(arguments)
})

twitterApi.getHomeLineTweets(twitterCredentials.accessToken, twitterCredentials.accessTokenSecret, (error, result) => {
    if (error) {
        console.error(error)
    }
    if (result) {
        console.log(result)
    }
})
