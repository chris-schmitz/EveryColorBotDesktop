const desktopImageCreator = require('./lib/CreatesDesktopImages')
const desktopSetter = require('./lib/SetsDesktopImages')
const notifications = require('./lib/NotifiesUser')
const Twitter = require('twitter')
const chalk = require('chalk')
const co = require('co')

const credentials = require('./config').credentials
let desktopNumbers = require('./config').desktopNumbers


let client = new Twitter({
    consumer_key: credentials.twitter.consumer_key,
    consumer_secret: credentials.twitter.consumer_secret,
    access_token_key: credentials.twitter.access_token_key,
    access_token_secret: credentials.twitter.access_token_secret
})

let stream = client.stream('statuses/filter', {
    follow: '243730082,1909219404'
})

// let event = {text: '0xFC2712 https://t.co/JvUtSZj15s'}

stream.on('data', event => {
    // put all of this in a try/throw/catch?
    let tweet = event.text.match(/^(0x[a-fA-F\d]{6})\s(https:[/\w\d./]+)$/)
    if(tweet){
        console.log(chalk.green(`we got a color from the bot!: ${tweet[0]}`))

        co(function *(){
            let color = tweet[1]
            let link = tweet[2]
            let filePath = yield desktopImageCreator.createImageForColor(color)
            desktopSetter.setDesktopBackground(filePath, desktopNumbers) // consider coming back and adding the config for which monitor
            notifications.notifyUser("Desktop Color Set", `New desktop color set: ${color}.`)
        }).catch(error => console.error(error))

    } else {
        console.log(chalk.red(`we got something other than a tweet from the bot: ${event.text}`))
    }
})

stream.on('error', error => {
    console.error(error)
})