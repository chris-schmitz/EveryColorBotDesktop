const desktopImageCreator = require('./lib/CreatesDesktopImages')
const desktopSetter = require('./lib/SetsDesktopImages')
const notifications = require('./lib/NotifiesUser')
const Twitter = require('twitter')
const chalk = require('chalk')

const credentials = require('./config').credentials
let desktopNumbers = require('./config').desktopNumbers


// commented out while testing
// let client = new Twitter({
//     consumer_key: credentials.twitter.consumer_key,
//     consumer_secret: credentials.twitter.consumer_secret,
//     access_token_key: credentials.twitter.access_token_key,
//     access_token_secret: credentials.twitter.access_token_secret
// })

// commented out while testing
// let stream = client.stream('statuses/filter', {
//     follow: '243730082,1909219404'
// })

// test event
let event = {text: '0x189995 https://t.co/JvUtSZj15s'}

// commented out while testing
// stream.on('data', event => {

    let tweet = event.text.match(/^(0x[a-f\d]{6})\s(https:[/\w\d./]+)$/)
    if(tweet){
        console.log(chalk.green(`we got a color from the bot!: ${tweet[0]}`))

        let color = tweet[1]
        let link = tweet[2]

        // this is the part I need help figuring out. This needs to be asynchronous. There's a file
        // being created by this module and I need a way of being able to tell when that file creation is done
        // so that I can continue with the rest of the steps.
        // I figure I could use either a promise or a generator setup to make this work, but I'm not sure
        let filename = desktopImageCreator.createImageForColor(color)

        desktopSetter.setDesktopBackground(filePath, desktopNumbers) // consider coming back and adding the config for which monitor
        notifications.notifyUser("Desktop Color Set", `New desktop color set: ${color}.`)

    } else {
        console.log(chalk.red(`we got something other than a tweet from the bot: ${event.text}`))
    }
// })

stream.on('error', error => {
    console.error(error)
})