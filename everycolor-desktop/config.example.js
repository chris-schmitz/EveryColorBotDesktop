const credentials = {
    twitter: {
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
    }
}

// Note that these paths are relative to the root directory of this
// project. I.e. these paths start relative to `everycolor-desktop/`.
const paths = {
    pngOutput: 'pngWorkspace/'
}

// This config is the desktop number or numbers used to tell the app
// which desktop to set the color to. At the moment this tool is only built
// to work with a mac and the desktop number value is specific
// to applescript. It's literally just the number of the particular desktop
// in a multi-monitor setup that you would see in your
// `System Preferences -> Displays -> Arrange`  menu. E.g. if you have 3 monitors
// plugged into your mac and you want to set the desktop for the first and third
// display, your value would be `const desktopNumbers = [1,3]`
const desktopNumbers = [1]


module.exports = {
    credentials,
    paths
}