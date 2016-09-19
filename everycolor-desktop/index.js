const desktopImageCreator = require('./lib/CreatesDesktopImages')
const desktopSetter = require('./lib/SetsDesktopImages')
const notifications = require('./lib/NotifiesUser')
let time = require('./lib/Time')

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

let stream = client.stream('statuses/filter', {follow: '243730082,1909219404'}, stream => {
    console.log(chalk.green("Listening for those sweet tweets!"))

    stream.on('data', event => {
        // put all of this in a try/throw/catch?

        let tweet = event
        if(tweet.delete){
            // When a tweet is deleted, we get an event from the stream that looks like this:
            // {"delete":{"status":{"id":777838091897712600,"id_str":"777838091897712641","user_id":243730082,"user_id_str":"243730082"},"timestamp_ms":"1474286059935"}}
            // In this utility, we don't really care about the contents of this event, but we do want to keep our utility from blowing up in the console so we're just
            // setting the property we're looking for to stock text turning it into somewhat of a null object so that our existing logic can handle the condition properly.
            tweet.text = "A tweet was deleted."
        }

        tweet = event.text.match(/^(0x[a-fA-F\d]{6})\s(https:[/\w\d./]+)$/)
        if(tweet){
            console.log(chalk.green(`${time.getCurrentTimestamp()} - We got a color from the bot!: ${tweet[0]}`))

            co(function *(){
                let color = tweet[1]
                let link = tweet[2]
                let filePath = yield desktopImageCreator.createImageForColor(color)
                desktopSetter.setDesktopBackground(filePath, desktopNumbers) // consider coming back and adding the config for which monitor
                notifications.notifyUser("Desktop Color Set", `New desktop color set: ${color}.`, link)
            }).catch(error => console.error(error))

        } else {
            console.log(chalk.red(`${time.getCurrentTimestamp()} - We got something other than a tweet from the bot: ${event.text}`))
        }
    })

    stream.on('error', error => {
        console.error(error)
    })
})

