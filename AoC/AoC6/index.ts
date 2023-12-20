

const fs = require('node:fs')

function CalculateDistanceProduct(input : number[][]){
    let product = 1
    for(let i = 0; i < input[0].length; i++){
        let time = input[0][i]
        let record = input[1][i]
        let holdTimes : number[] = Array.from(Array(time+1).keys())
        product *= holdTimes.map(hold => CalculateDistance(hold, time)).filter(x => x > record).length

        
    }
    return product
}


function PartOne(fileName : string){
    let input : number[][] = fs.readFileSync(fileName, 'utf8').split("\r\n").map(row => row.split(':')[1].trim()).map(row => row.match(/\d+/g).map(x => Number(x)) as number[]);
    return CalculateDistanceProduct(input)
}

function PartTwo(fileName : string){
    let input : number[] = fs.readFileSync(fileName, 'utf8').split("\r\n").map(row => row.split(':')[1].trim()).map(row => row.match(/\d+/g).reduce((acc, current) => acc + current)).map(x => Number(x));
    let product = 1
    
    let time = input[0]
    let record = input[1]
    let holdTimes : number[] = Array.from(Array(time+1).keys())
    product *= holdTimes.map(hold => CalculateDistance(hold, time)).filter(x => x > record).length

        
   
    return product
    
}

function CalculateDistance(hold : number, time : number){
    return hold * (time-hold)
}

console.log(PartTwo("input.txt"))

module.exports = {
    PartOne : PartOne,
    CalculateDistance : CalculateDistance
}