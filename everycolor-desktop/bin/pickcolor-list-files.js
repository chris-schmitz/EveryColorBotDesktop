#!/usr/bin/env node

const execFile = require('child_process').execFile
const projectPaths = require('../config').paths
const pngWorkspace = projectPaths.pngOutput
const path = require('path')

const chalk = require('chalk')
const fs = require('fs')
const co = require('co')
const workspacePath = path.resolve(__dirname, `../${pngWorkspace}`)
const usingIterm = process.env.TERM_PROGRAM === 'iTerm.app' ? true : false


/**
 * Returns an array of all file names from the configured pngWorkspace
 * @return {array} An array of all file names.
 *                    Note that we do _not_ attempt to filter out specific
 *                    files in this function.
 */
function getFileList(){
    return new Promise((resolve,reject) => {
        fs.readdir(workspacePath, (error, files) => {
            if(error) reject( new Error('Unable to find the files.') )
            resolve(files)
        })
    })
}

/**
 * Filters out file names not wanted by this utility.
 * @param  {array} filesArray An array of file names.
 * @return {array}            An array of filtered file names.
 */
function justThePngs(filesArray){
    return filesArray.filter(file => file !== "base.png" && file.substring(file.length -4) === ".png")
}

/**
 * Logs the file names out to the console and if we can determine that the
 * user is using iTerm 2, logs out the color image as well.
 * @param  {array} pngs  An array of file names
 * @return void
 */
function displayColorFiles(pngs = []){
    pngs.forEach(filename => {
        let filepath = `${workspacePath}/${filename}`
        if(usingIterm){
            execFile(path.resolve(__dirname,'imgcat.sh'), [filepath], (error, stdout, stderr) => {
                if(error) throw new Error(error)
                console.log(filepath)
                console.log(stdout)
            })
        } else {
            console.log(`${filepath}\n`)
        }
    })
}

co(function *(){
    let filesInDirectory = yield getFileList()
    let pngs = justThePngs(filesInDirectory)
    displayColorFiles(pngs)
}).catch(error => console.error(error))