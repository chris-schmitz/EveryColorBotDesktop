// const everyColorBot = require('./lib/QueriesEveryColorBot')
const desktopImageCreator = require('./lib/CreatesDesktopImages')
const desktopSetter = require('./lib/SetsDesktopImages')
const Twitter = require('twitter')
const credentials = require('./config').credentials
const chalk = require('chalk')
let desktopNumbers = require('./config').desktopNumbers

// let client = new Twitter({
//     consumer_key: credentials.twitter.consumer_key,
//     consumer_secret: credentials.twitter.consumer_secret,
//     access_token_key: credentials.twitter.access_token_key,
//     access_token_secret: credentials.twitter.access_token_secret
// })

// let stream = client.stream('statuses/filter', {
//     follow: '243730082,1909219404'
// })

let event = {text: '0x189995 https://t.co/JvUtSZj15s'}

// stream.on('data', event => {
    // put all of this in a try/throw/catch?
    let tweet = event.text.match(/^(0x[a-f\d]{6})\s(https:[/\w\d./]+)$/)
    if(tweet){
        console.log(chalk.green(`we got a color from the bot!: ${tweet[0]}`))

        let color = tweet[1]
        let link = tweet[2]

        // let filename = desktopImageCreator.createImageForColor(color)
        desktopSetter.setDesktopBackground(filePath, desktopNumbers) // consider coming back and adding the config for which monitor

        // notifier.notifyUser({message: `New desktop color set: ${color}. `, clickthroughLink: ${link}})
    } else {
        console.log(chalk.red(`we got something other than a tweet from the bot: ${event.text}`))
    }
// })

// stream.on('error', error => {
//     console.error(error)
// })




// desktopSetter.setDesktopBackground(filename)