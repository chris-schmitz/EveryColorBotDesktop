#!/usr/bin/env node

const fs = require('fs')
const co = require('co')
const chalk = require('chalk')

function getFileList(){
    return new Promise((resolve,reject) => {
        fs.readdir('../../everycolor-desktop/pngWorkspace/', (error, files) => {
            if(error) reject(error)
            resolve(files)
        })

    })
}

co(function *(){
    let files = yield getFileList()
    let filtered = files.filter(file => {
        return file !== "base.png" && file[0] !== "."
    }).reduce((previous, current) => `${previous}\n${current}`)
    console.log(chalk.blue("Colors saved from everycolorbot tweets:\n") + filtered)
})

