var fs = require('node:fs');
function CalculateDistanceProduct(input) {
    var product = 1;
    var _loop_1 = function (i) {
        var time = input[0][i];
        var record = input[1][i];
        var holdTimes = Array.from(Array(time + 1).keys());
        product *= holdTimes.map(function (hold) { return CalculateDistance(hold, time); }).filter(function (x) { return x > record; }).length;
    };
    for (var i = 0; i < input[0].length; i++) {
        _loop_1(i);
    }
    return product;
}
function PartOne(fileName) {
    var input = fs.readFileSync(fileName, 'utf8').split("\r\n").map(function (row) { return row.split(':')[1].trim(); }).map(function (row) { return row.match(/\d+/g).map(function (x) { return Number(x); }); });
    return CalculateDistanceProduct(input);
}
function PartTwo(fileName) {
    var input = fs.readFileSync(fileName, 'utf8').split("\r\n").map(function (row) { return row.split(':')[1].trim(); }).map(function (row) { return row.match(/\d+/g).reduce(function (acc, current) { return acc + current; }); }).map(function (x) { return Number(x); });
    var product = 1;
    var time = input[0];
    var record = input[1];
    var holdTimes = Array.from(Array(time + 1).keys());
    product *= holdTimes.map(function (hold) { return CalculateDistance(hold, time); }).filter(function (x) { return x > record; }).length;
    return product;
}
function CalculateDistance(hold, time) {
    return hold * (time - hold);
}
console.log(PartTwo("input.txt"));
module.exports = {
    PartOne: PartOne,
    CalculateDistance: CalculateDistance
};
//# sourceMappingURL=index.js.map