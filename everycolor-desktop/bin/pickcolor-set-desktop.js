#!/usr/bin/env node
const program = require('commander')
const fs = require('fs')
const desktop = require('../lib/SetsDesktopImages')
const notifier = require('../lib/NotifiesUser')
const path = require('path')
const co = require('co')
const chalk = require('chalk')

program
    .parse(process.argv)

if(process.platform !== 'darwin'){
    throw new Error('At the moment this tool will only run on MacOS. Pull requests are welcome ;).')
}

const filepath = program.args[0]

function fileExists(filepath){
    return new Promise((resolve, reject) => {
        fs.stat(filepath, (error, stat) => {
            if(error) {
                reject(new Error(error))
            }
            resolve(stat)
        })
    })
}

co(function *(){
    let exists = yield fileExists(filepath)
    let backgroundSetSuccessMessage = yield desktop.setDesktopBackground(filepath)

    console.log(chalk.green(backgroundSetSuccessMessage))

    let fileName = path.basename(filepath)
    notifier.notifyUser('Desktop Background Set', `Desktop set to ${fileName}`)
}).catch(error => {
    console.error(chalk.red(error))
})