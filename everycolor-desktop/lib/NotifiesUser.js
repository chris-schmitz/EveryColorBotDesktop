const notifier = require('node-notifier')
const open = require('open')

/**
 * Creates a desktop notification.
 * @param  {String} title   Title you'd like the notification to have
 * @param  {String} message Message you'd like to display
 * @param  {String} link    A hyperlink you'd like fired when the user clicks the message
 */
function notifyUser(title = '', message = '',link = ''){
    if(link.length > 0){
        notifier.on('click', (notification,options) => {
            open(link)
        })
        // notifier.on('timeout', (notification, options) => {})
    }
    let wait = link.length > 0 ? true : false

    notifier.notify({message,title, wait})
}

module.exports = {
    notifyUser
}