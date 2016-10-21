const desktopImageCreator = require('./lib/CreatesDesktopImages')
const desktopSetter = require('./lib/SetsDesktopImages')
const notifications = require('./lib/NotifiesUser')
let time = require('./lib/Time')

const Twitter = require('twitter')
const chalk = require('chalk')
const co = require('co')

const credentials = require('./config').credentials
let desktopNumbers = require('./config').desktopNumbers


// Initialize our twitter client
let client = new Twitter({
    consumer_key: credentials.twitter.consumer_key,
    consumer_secret: credentials.twitter.consumer_secret,
    access_token_key: credentials.twitter.access_token_key,
    access_token_secret: credentials.twitter.access_token_secret
})

// Start a stream that listens to tweets from everycolorbot(1909219404) and me(243730082) for testing.
let stream = client.stream('statuses/filter', {follow: '243730082,1909219404'}, stream => {
    console.log(chalk.green("Listening for those sweet tweets!"))

    // When new information comes in from the stream, twitter fires the `data` event. 
    // This can be tweets, retweets, deletes, etc. Now that we know we have new data
    // we need to figure out how we want to handle it.
    stream.on('data', event => {

        let tweet = event
        if(tweet.delete){
            // When a tweet is deleted, we get an event from the stream that looks like this:
            // {"delete":{"status":{"id":777838091897712600,"id_str":"777838091897712641","user_id":243730082,"user_id_str":"243730082"},"timestamp_ms":"1474286059935"}}
            // In this utility, we don't really care about the contents of this event, but we do want to keep our utility from blowing up in the console so we're just
            // setting the property we're looking for to stock text turning it into somewhat of a null object so that our existing logic can handle the condition properly.
            tweet.text = "A tweet was deleted."
        }

        // Make sure data we get matches the specific format that we know everycolorbot tweets in
        // i.e. a hex color, a space, and then a url
        tweet = event.text.match(/^(0x[a-fA-F\d]{6})\s(https:[/\w\d./]+)$/)

        // If our tweet matches the desired format we know we can start processing it
        if(tweet){
            console.log(chalk.green(`${time.getCurrentTimestamp()} - We got a color from the bot!: ${tweet[0]}`))

            // We're going to make a couple of async calls that depend on each other. Rather than nesting
            // callbacks which can get messy pretty quick, we kick off a generator function that will allow
            // our script to "pause" at the `yield` keyword while the async process does it's thing and then
            // resume once it's resolved. The added benefit of using promises to handle the async events is 
            // that we can create _one_ `catch` hook to handle all errors, which allows us to write the main
            // body of our business logic assuming all will go well (which I think makes it easier to read).
            co(function *(){
                let color = tweet[1]
                let link = tweet[2]
                let filePath = yield desktopImageCreator.createImageForColor(color)
                let backgroundSetSuccessMessage = yield desktopSetter.setDesktopBackground(filePath, desktopNumbers) // consider coming back and adding the config for which monitor
                console.log(chalk.green(backgroundSetSuccessMessage))
                notifications.notifyUser("Desktop Color Set", `New desktop color set: ${color}.`, link)
            }).catch(error => console.error(chalk.red(error)))

        } else {
            console.log(chalk.red(`${time.getCurrentTimestamp()} - We got something other than a tweet from the bot: ${event.text}`))
        }
    })

    stream.on('error', error => {
        console.error(chalk.red(new Error(error)))
    })
})

