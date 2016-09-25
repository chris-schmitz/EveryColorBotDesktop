const exec = require('child_process').exec
const chalk = require('chalk')

/**
 * Sets the desktop associated with the given number(s) to the given file
 * @param {[type]} filePath      Path to the file
 *                                   Can be either absolute or relative to the project directory
 * @param {Array}  desktopNumber The number or numbers of the desktops you'd like to set the image for
 */
function setDesktopBackground(filePath, desktopNumber = [1]){
    // future refactor: make this cross platform.
    return new Promise((resolve, reject) => {

        if(!Array.isArray(desktopNumber)){
            desktopNumber = [desktopNumber]
        }
        
        // todo: read into applescript's docs to see if you can set the desktop for multiple monitors at once (e.g. ..of desktop 1 and 2, and 3)
        // or if you need to do a .forEach to set each one.
        let applescript = `osascript -e 'tell application "System Events" to set picture of desktop ${desktopNumber} to ("${filePath}" as POSIX file as alias)'`
        exec(applescript, (error, standardOut, standardError) => {
            if (error){
                reject(new Error(error))
            } else {
                // hmm, should we really send a console message at this point? should we just return the
                // status of execution to the caller and let it handle the decision to message or not message?
                resolve(`Desktop ${desktopNumber} set to use background "${filePath}"`)
            }
        })
    })
}

module.exports = {
    setDesktopBackground
}