// const everyColorBot = require('./lib/QueriesEveryColorBot')
const desktopImageCreator = require('./lib/CreatesDesktopImages')
const desktopSetter = require('./lib/SetsDesktopImages')
const Twitter = require('twitter')
const credentials = require('./credentials')
const chalk = require('chalk')

let client = new Twitter({
    consumer_key: credentials.twitter.consumer_key,
    consumer_secret: credentials.twitter.consumer_secret,
    access_token_key: credentials.twitter.access_token_key,
    access_token_secret: credentials.twitter.access_token_secret
})

let stream = client.stream('statuses/filter', {
    follow: '243730082,1909219404'
})

stream.on('data', event => {
    let tweet = event.text.match(/^0x[\w\d]{6}(?=\s)/)
    if(tweet){
        console.log(chalk.green(`we got a color from the bot: ${tweet[0]}`))
    } else {
        console.log(chalk.red(`we got something other than a tweet from the bot: ${event.text}`))
    }

})

stream.on('error', error => {
    console.error(error)
})




// let color = everyColorBot.getLatestColor()
// let filename = desktopImageCreator.createImageForColor(color)
// desktopSetter.setDesktopBackground(filename)