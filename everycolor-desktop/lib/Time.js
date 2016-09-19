exports.getCurrentTimestamp = function(){

    let date = new Date()
    let d = [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('-')
    let t = [date.getHours(), date.getMinutes()].join(":")

    return d + " " + t
}

