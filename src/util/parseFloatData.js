function doneNum(num, count) {
    var newNum = parseInt(num * Math.pow(10, count)) / Math.pow(10, count);
    return newNum;
}

export default function parseFloatData(data) {
    if (data !== '---') {
        return doneNum(parseFloat(data), 6);
    }
    return data
}