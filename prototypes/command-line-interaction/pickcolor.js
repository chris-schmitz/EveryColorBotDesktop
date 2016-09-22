#!/usr/bin/env node

const program = require('commander')

program
    .usage('<command>')
    .command('list-files', 'List the color files captured from everycolorbot')
    .command('set-desktop <filepath>', 'Sets the desktop to the given file.')

program.parse(process.argv)
