let oAuth = require('oauth').OAuth
let _oauth
let twitterAppConfig = require('./appconfig.js').twitter

let TwitterApi = function (consumerKey, consumerSecret, callbackUrl){
    if(!consumerKey || !consumerSecret || !callbackUrl){
        throw new Error('Configuration Error.')
    }

    _oauth = new oAuth(
        twitterAppConfig.oAuth.requestTokenUrl,
        twitterAppConfig.oAuth.accessTokenUrl,
        consumerKey,
        consumerSecret,
        twitterAppConfig.oAuth.version,
        callbackUrl,
        twitterAppConfig.oAuth.signatureMethod
    )
    this.config = {consumerKey, consumerSecret}

    return this
}

TwitterApi.prototype.setAccessToken = function (accessToken = ''){
    this.config.accessToken = accessToken
}
TwitterApi.prototype.setTokenSecret = function (tokenSecret = ''){
    this.config.tokenSecret = tokenSecret
}

TwitterApi.prototype.getLatestTweetsFromUser = function(screenName, count = 1){
    return new Promise(function(resolve,reject){
        _oauth.get(
                `${twitterAppConfig.requestUrls.userTimeline}?count=${count}&screen_name=${screenName}`,
                this.accessToken,
                this.tokenSecret,
                (error, result) => {
                    error ? reject(Error(error)) : resolve(result)
                }
            )
    })
}
module.exports = TwitterApi










