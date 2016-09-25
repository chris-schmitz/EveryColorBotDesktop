#!/usr/bin/env node

const program = require('commander')

program
    .command('list-files', 'List all color png files previously captured by everycolor-desktop.')
    .command('set-desktop <filename>', 'Sets the desktop to the given png file.')

program.parse(process.argv)