#!/usr/bin/env node

const exec = require('child_process').exec
const program = require('commander')
const chalk = require('chalk')
const fs = require('fs')
const desktop = require('../../everycolor-desktop/lib/SetsDesktopImages')

program
    .usage('<filepath>')
    .parse(process.argv)

const filepath = program.args[0]

fs.exists(filepath, exists => {
    if(!exists) throw new Error('This file does not exist')

    desktop.setDesktopBackground(filepath)
})

