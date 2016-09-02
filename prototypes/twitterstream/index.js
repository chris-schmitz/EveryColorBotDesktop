const Twitter = require('twitter-api-stream')
const twitterCredentials = require('./credentials').twitter

const twitterApi = new Twitter(twitterCredentials.consumerKey, twitterCredentials.consumerSecret, function(){
    console.log(arguments)
})


twitterApi.getUsersTweets('everycolorbot', 1, twitterCredentials.accessToken, twitterCredentials.accessTokenSecret, (error, result) => {
    if (error) {
        console.error(error)
    }
    if (result) {
        console.log('got result')
        let tweet = JSON.parse(result)[0] // outputs an array of json objects
        return tweet
    }
})

function getColorAndLink(tweet){
    const expression = /^0x([\w\d]{6})\s([\w\d:/].*)/
    if(!expression.test(tweet)){
        return {color: null, link: null}
    }
    return {color: expression.exec(tweet)[1], link: expression.exec(tweet)[2]}
}
