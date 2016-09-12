const notifier = require('node-notifier')

/**
 * Creates a desktop notification.
 * @param  {String} title   Title you'd like the notification to have
 * @param  {String} message Message you'd like to display
 * @param  {String} link    A hyperlink you'd like fired when the user clicks the message
 */
function notifyUser(title = '', message = '',link = ''){
    if(link.length > 0){
        notifier.on('click', (notification,options) => {
            // open hyperlink, test to see how we'd do this
        })
    }
    let wait = link.length > 0 ? true : false

    notifier.notify({message,title, wait})
}

module.exports = {
    notifyUser
}