#!/usr/bin/env node

const program = require('commander')
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

program
    .command('list-files')
    .action(() => {
        co(function *(){
            let files = yield getFileList()
            let filtered = files.filter(file => {
                return file !== "base.png" && file[0] !== "."
            }).reduce((previous, current) => `${previous}\n${current}`)
            console.log(chalk.blue("Colors saved from everycolorbot tweets:\n") + filtered)
        })
    })

// program
//     .command('set-background <file>', 'Sets the desktop to the given file.')
//     .action(file => {
//         console.log('set the background to the file: %s.', file)
//     })

program.parse(process.argv)

// program
//     .arguments('<file>')
//     .option('-u, --username <username>', 'The username to authenticate as')
//     .option('-p, --password <password>', `The user's password`)
//     .action(file => {
//         console.log('user: %s pass: %s file: %s', program.username, program. password, file)
//     })
//     .parse(process.argv)