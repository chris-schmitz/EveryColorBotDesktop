const everyColorBot = require('./lib/QueriesEveryColorBot')
const desktopImageCreator = require('./lib/CreatesDesktopImages')
const desktopSetter = require('./lib/SetsDesktopImages')


let color = everyColorBot.getLatestColor()
let filename = desktopImageCreator.createImageForColor(color)
desktopSetter.setDesktopBackground(filename)