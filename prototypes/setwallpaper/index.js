const exec = require('child_process').exec

let applescript = `osascript -e 'tell application "System Events" to set picture of desktop 1 to ("../createpng/pngWorkspace/out.png" as POSIX file as alias)'`

exec(applescript, (error, standardOut, standardError) => {
    console.log('desktop color set')
    // console.log(`standard output: ${standardOut}`)
    // console.log(`standard error: ${standardError}`)
    // console.log(`error: ${error}`)
})
