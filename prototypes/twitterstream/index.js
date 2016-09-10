const Twitter = require('twitter-api-stream')
const twitterCredentials = require('./credentials').twitter

const twitterApi = new Twitter(twitterCredentials.consumerKey, twitterCredentials.consumerSecret, function(){
    console.log(arguments)
})

let getLatestTweet = function(screenName){
    return new Promise(function(resolve,reject){
        twitterApi.getLatestTweets(screenName, 1, twitterCredentials.accessToken, twitterCredentials.accessTokenSecret, (error, result) => {
            if (error) {
                reject(error)
            }
            if (result) {
                let tweet = JSON.parse(result)[0] // outputs an array of json objects
                resolve(tweet)
            }
        })
    })

}


function getColorAndLink(tweet){
    const expression = /^0x([\w\d]{6})\s([\w\d:/].*)/
    let text = tweet.text
    if(!expression.test(text)){
        return {color: null, link: null}
    }
    return {color: expression.exec(text)[1], link: expression.exec(text)[2]}
}

getLatestTweet('everycolorbot').then(tweet => console.log(getColorAndLink(tweet))).catch((error) => {console.log(error)})
