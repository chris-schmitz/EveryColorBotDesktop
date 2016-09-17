const desktopImageCreator = require('./lib/CreatesDesktopImages')
const desktopSetter = require('./lib/SetsDesktopImages')
const notifications = require('./lib/NotifiesUser')
const Twitter = require('twitter')
const chalk = require('chalk')
const co = require('co')

const credentials = require('./config').credentials
let desktopNumbers = require('./config').desktopNumbers

co(function *(){
    let event = {text: '0x2300F4 https://t.co/JvUtSZj15s'}

    let tweet = event.text.match(/^(0x[a-fA-F\d]{6})\s(https:[/\w\d./]+)$/)
    if(tweet){
        console.log(chalk.green(`we got a color from the bot!: ${tweet[0]}`))
        let color = tweet[1]
        let link = tweet[2]
        let filePath = yield desktopImageCreator.createImageForColor(color)
        desktopSetter.setDesktopBackground(filePath, desktopNumbers) // consider coming back and adding the config for which monitor
        notifications.notifyUser("Desktop Color Set", `New desktop color set: ${color}.`)
    }else{
        console.log('did not find tweet')
    }

}).catch(error => console.error(error))







// } else {
//     console.log(chalk.red(`we got something other than a tweet from the bot: ${event.text}`))
// }
