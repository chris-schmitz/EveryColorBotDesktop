let TwitterApi = require('./lib/TwitterApi')
let config = require('./config')

let api = new TwitterApi(config.consumerKey, config.consumerSecret, function(result){
    console.log('authorized')
    console.log(this)
})

// Should this just be moved into the constructor?
api.setAccessToken(config.accessToken)
api.setTokenSecret(config.tokenSecret)

let getLatestTweet = function (){
    let screenName = 'everycolorbot'
    let count = 1
    api.getLatestTweetsFromUser(screenName, count)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.error(error)
        })
}
getLatestTweet()