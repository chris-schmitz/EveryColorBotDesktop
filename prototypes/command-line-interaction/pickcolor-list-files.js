#!/usr/bin/env node

const fs = require('fs')
const co = require('co')
const chalk = require('chalk')
const execFile = require('child_process').execFile

const workspacePath = '../../everycolor-desktop/pngWorkspace/'

function getFileList(){
    return new Promise((resolve,reject) => {
        fs.readdir(workspacePath, (error, files) => {
            if(error) reject(error)
            resolve(files)
        })

    })
}

co(function *(){
    let files = yield getFileList()
    let filtered = files
            .filter(file => {
                return file !== "base.png" && file[0] !== "."
            })

    console.log(chalk.blue("Colors saved from everycolorbot tweets:\n"))
    filtered.forEach(
        file => execFile('./imgcat.sh',[`${workspacePath}${file}`],(err,stdout,stderr) => {
            if(err) throw err

            console.log(`${workspacePath}${file}`)
            console.log(stdout)
        })
    )
})

