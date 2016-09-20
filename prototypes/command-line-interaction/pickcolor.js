#!/usr/bin/env node

const program = require('commander')

program
    .usage('<command>')
    .command('list-files', 'List the color files captured from everycolorbot')

program.parse(process.argv)
