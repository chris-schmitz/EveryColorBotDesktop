const fs = require('fs')
const PNG = require('pngjs').PNG
const appPaths = require('../config').paths
const path = require('path')

/**
 * Creates an solid color png based on the hex value passed in
 * @param  {String} color   The Hex value to create the png of
 * @return {filePath}       The path to the created file
 */
function createImageForColor(color = '0x000000'){
    let rgb = hexToRgb(color)
    let path = createPNG(rgb, `${color}.png`)
    return path
}

/**
 * Converts the provided hex color value to its RGB equivalent.
 * @param  {String} hex The hex color value
 * @return {Object}     The RGB color value
 */
function hexToRgb(hex){
    const base = 16
    let exploded = /^0x([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    if(!exploded){
        return {r: null, g: null, b: null}
    }

    return {
        r: parseInt(exploded[1], base),
        g: parseInt(exploded[2], base),
        b: parseInt(exploded[3], base)
    }
}

/**
 * Creates a png file for a single given color
 * @param  {object} rgb      An object containing rgb values to use
 *                               e.g. {r: 1, g: 2, b: 5}
 * @param  {string} filename The name to use for the png file created
 */
function createPNG(rgb, filename){
    let filterMethod = 4
    let filePath

    debugger
    let stream = fs.createReadStream('pngWorkspace/base.png')
        .pipe(new PNG({
            filterType: filterMethod
        }))

    stream.on('parsed', function (){
        // loop through y axis coordinates from top to bottom
        for(let y = 0; y < this.height; y++){

            // loop through x axis coordinates from left to right
            for(let x = 0; x < this.width; x++){

                // Do some bit shifting that I only partially understand at the moment.
                // Review pngjs' docs for more detail.
                let idx = (this.width * y+x) << 2

                // The basic idea is that we're walking each pixel from left to right,
                // top to bottom, and we set the color for the current pixel.
                // We're trying to create a solid color png, so each pixel will get the
                // same color.
                this.data[idx] = rgb.r
                this.data[idx + 1] = rgb.g
                this.data[idx + 2] = rgb.b

            }
        }
        filePath = appPaths.pngOutput + filename
        this.pack().pipe(fs.createWriteStream(filePath))
    })

    // I don't think this process is going to work :|
    stream.on('close', function (){
        return filePath
    })
}

module.exports = {
    createImageForColor
}