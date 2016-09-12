const notifier = require('node-notifier')

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