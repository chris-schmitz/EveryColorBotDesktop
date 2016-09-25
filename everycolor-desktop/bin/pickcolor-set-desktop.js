#!/usr/bin/env node
const program = require('commander')
const fs = require('fs')
const desktop = require('../lib/SetsDesktopImages')
const notifier = require('../lib/NotifiesUser')
const path = require('path')

program
    .parse(process.argv)

if(process.platform !== 'darwin'){
    throw new Error('At the moment this tool will only run on MacOS. Pull requests are welcome ;).')
}

const filepath = program.args[0]

fs.stat(filepath, (error, stats) => {
    if(error) throw new Error(error)

    desktop.setDesktopBackground(filepath)
    // Come back and fix this code so that we handle the notification only on a successful set.
    // The only reason I'm not doing this right now is because I have maybe 10 mins before I have
    // to head out for brunch :P Prob another good spot for a generator function so you don't 
    // have to go another level in with a callback. 
    let filename = path.basename(filepath)
    notifier.notifyUser('Desktop Background Set', message = `Desktop set to ${filename}`)
})