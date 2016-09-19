#!/usr/bin/env node

const program = require('commander')

program
    .command('list-files', 'Lists files pulled by everycolorbot.')
    .action(() => {
        console.log('listing the files')
    })

program
    .command('set-background <file>', 'Sets the desktop to the given file.')
    .action(file => {
        console.log('set the background to the file: %s.', file)
    })

program.parse(process.argv)

// program
//     .arguments('<file>')
//     .option('-u, --username <username>', 'The username to authenticate as')
//     .option('-p, --password <password>', `The user's password`)
//     .action(file => {
//         console.log('user: %s pass: %s file: %s', program.username, program. password, file)
//     })
//     .parse(process.argv)