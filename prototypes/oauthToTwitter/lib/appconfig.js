module.exports = {
    twitter: {
        oAuth:{
            requestTokenUrl: 'https://twitter.com/oauth/request_token',
            accessTokenUrl: 'https://twitter.com/oauth/access_token',
            version: '1.0A',
            signatureMethod: 'HMAC-SHA1'
        },
        requestUrls:{
            userTimeline: 'https://api.twitter.com/1.1/statuses/user_timeline.json'
        }
    }
}