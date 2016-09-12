const exec = require('child_process').exec



function setDesktopBackground(filePath, desktopNumber = [1]){
    // future refactor: make this cross platform.

    if(!Array.isArray(desktopNumber)){
        desktopNumber = [desktopNumber]
    }

    let applescript = `osascript -e 'tell application "System Events" to set picture of desktop ${desktopNumber} to ("${filePath}" as POSIX file as alias)'`
    exec(applescript, (error, standardOut, standardError) => {
        if (error){
            console.error(error)
        } else {
            console.log(`Desktop ${desktopNumber} set to use background "${filePath}"`)
        }


    })
}


module.exports = {
    setDesktopBackground
}