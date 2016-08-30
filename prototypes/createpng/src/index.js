const fs = require('fs')
const PNG = require('pngjs').PNG

function createPng(rgb){
    fs.createReadStream('./pngWorkspace/in.png')
        .pipe(new PNG({
            filterType:4
        }))
        .on('parsed', function (){

            // loop through y axis coordinates from top to bottom
            for(let y = 0; y < this.height; y++){
                // loop through x axis coordinates from left to right
                for(let x = 0; x < this.width; x++){

                    // leaving this as a bit of magic at the moment, but later come back and read up on
                    // bit shifting: http://stackoverflow.com/questions/141525/what-are-bitwise-shift-bit-shift-operators-and-how-do-they-work#answer-141873
                    let idx = (this.width * y+x) << 2
                    this.data[idx] = rgb.r
                    this.data[idx+1] = rgb.g
                    this.data[idx+2] = rgb.b
                }
            }
            this.pack().pipe(fs.createWriteStream('./pngWorkspace/out.png'))
            console.log('color swatch created')
        })
}

function hexToRgb(hex){
    // use regular expressions to break apart the 3 parts of th hex value
    let parsed = /^0x([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    // convert each part from base 16. If there wasn't a regex match, return a null rgb object
    let base = 16
    return
        parsed ?
        {r: parseInt(parsed[1], base), g: parseInt(parsed[2], base), b:(parsed[3], base)} :
        {r:null, g:null, b:null}
}

let hexColor = '0x2300F5'
let rgb = hexToRgb(hexColor)
createPng(rgb)


{r: null}
Option('r' ; null )
['a', 'b', 'c']

[
    {'first_name': "chris", 'last_name': 'schmitz', 'emails': [{type: 'personal', email:'schmitz.chris@gmail.com'}, {type:'work', email: 'chris.schmitz@skeletonkey.com'}]},
    {'first_name': "chris", 'last_name': 'schmitz'}
]