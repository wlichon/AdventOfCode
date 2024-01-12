import fs from 'fs'

export type Position = {
    x : number,
    y : number
}

const Move = (currPos : Position, prevPos : Position,input : string[]) : Position[] => {
    let currentPipe = input[currPos.y][currPos.x]

    let newPos : Position = {x: -1, y: -1}
    
    switch(currentPipe) {
        case '|':
            if(prevPos.y < currPos.y)
                newPos = {x: currPos.x, y: currPos.y + 1}
            else{
                newPos = {x: currPos.x, y: currPos.y - 1}
            }
            break;
        case '-':
            if(prevPos.x < currPos.x){
                newPos = {x: currPos.x + 1, y :currPos.y}
            }
            else{
                newPos = {x: currPos.x - 1, y :currPos.y}
            }
            break;
        case 'L':
            if(prevPos.y != currPos.y){
                newPos = {x: currPos.x + 1, y :currPos.y}
            }
            else{
                newPos = {x: currPos.x, y : currPos.y - 1}
            }
            break;
        case 'J':
            if(prevPos.y != currPos.y){
                newPos = {x: currPos.x - 1, y :currPos.y}
            }
            else{
                newPos = {x: currPos.x, y : currPos.y - 1}
            }
            break;
        case '7':
            if(prevPos.y != currPos.y){
                newPos = {x: currPos.x - 1, y :currPos.y}
            }
            else{
                newPos = {x: currPos.x, y :currPos.y + 1}
            }
            break;
        case 'F':
            if(prevPos.y != currPos.y){
                newPos = {x: currPos.x + 1, y :currPos.y}
            }
            else{
                newPos = {x: currPos.x, y :currPos.y + 1}
            }
            break;
        case '.':
            console.log("came upon a .")
            //currently not necessary
            break;
        case 'S':
            console.log("came upon a S")
            //currently not necessary
            break;
    }

    return [newPos, currPos]

}

const DetermineStartingPipes = (indexOfS : Position, input : string[]) : Position[] => {
    let startingPipes : Position[] = []
    
    let topPipe = input[indexOfS.y - 1 < 0 ? 0 : indexOfS.y-1][indexOfS.x]
    let rightPipe = input[indexOfS.y][indexOfS.x + 1]
    let bottomPipe = input[indexOfS.y + 1][indexOfS.x]
    let leftPipe = input[indexOfS.y][indexOfS.x - 1]
    if(topPipe === "|" || topPipe === "7" || topPipe === "F"){
        startingPipes.push({x: indexOfS.x, y: indexOfS.y - 1})
    }
    if(rightPipe === "-" || rightPipe === "J" || rightPipe === "7"){
        startingPipes.push({x: indexOfS.x + 1, y: indexOfS.y})
    }
    if(bottomPipe === "|" || rightPipe === "L" || rightPipe === "J"){
        startingPipes.push({x: indexOfS.x, y: indexOfS.y + 1})
    }
    if(leftPipe === "-" || leftPipe === "L" || leftPipe === "F"){
        startingPipes.push({x: indexOfS.x - 1, y: indexOfS.y})
    }

    return startingPipes
}


const PartOne = (fileName : string) : number =>  {
    const input : string[] = fs.readFileSync(fileName, 'utf-8').split("\r\n")

    let start : Position = { x : -1, y : -1}
    for(let i = 0; i < input.length; i++){
        let match = input[i].match(/S/)
        if(match){
            start.x = match.index!
            start.y = i
        }
    }

    let [pipe1, pipe2] = DetermineStartingPipes(start, input)
    let prev1 : Position = start

    
    let prev2 : Position = start

    let visited = new Set([start])

    let steps = 1 
    while(true){
        let result1 = Move(pipe1, prev1, input)
        let result2 = Move(pipe2, prev2, input)

        pipe1 = result1[0]
        prev1 = result1[1]

        pipe2 = result2[0]
        prev2 = result2[1]
        if(pipe1.x === pipe2.x && pipe1.y === pipe2.y){
            steps++
            break
        }
        if(visited.has(pipe1) || visited.has(pipe2)){
            break
        }
        visited.add(pipe1)
        visited.add(pipe2)
        steps++
    }

    return steps
}

const pipeToEncoding : Map<string, number> = new Map([
    ['|', 1],
    ['-', 2],
    ['L', 3],
    ['J', 4],
    ['7', 5],
    ['F', 6]
])

const encodingToPipe : Map<number, string> = new Map([
    [1, '|'],
    [2, '-'],
    [3, 'L'],
    [4, 'J'],
    [5, '7'],
    [6, 'F']
])

const DrawPolygon = (input : any, startPipeShape : string) : string[] => {
    let start : Position = { x : -1, y : -1}
    for(let i = 0; i < input.length; i++){
        let match = input[i].match(/S/)
        if(match){
            start.x = match.index!
            start.y = i
        }
    }
    let prev : Position = start
    let [current] = DetermineStartingPipes(start, input)
    let iterator = 1
    while(input[current.y][current.x] !== "S"){
        let result = Move(current, prev, input)
        current = result[0]
        prev = result[1]
        input[prev.y] = input[prev.y].substring(0, prev.x) + pipeToEncoding.get(input[prev.y][prev.x]) + input[prev.y].substring(prev.x + 1);
    }

    input[current.y] = input[current.y].substring(0, current.x) + pipeToEncoding.get(startPipeShape) + input[current.y].substring(current.x + 1);

    return input

}


const PartTwo = (fileName : string, startPipeShape : string) : number =>  {
    let input : string[] = fs.readFileSync(fileName, 'utf-8').split("\r\n")
    let tiles = 0;
    let orderMap : Map<Position, number> = new Map()
    DrawPolygon(input, startPipeShape)

    for(let y = 0; y < input.length; y++){
        for(let x = 0; x < input[0].length; x++){
            let pos : Position = {x: x, y: y}
            if(PointInPolygon(input, pos)){
                tiles++
                input[pos.y] = input[pos.y].substring(0, pos.x) + "I" + input[pos.y].substring(pos.x + 1);
            }
        }
    }
    
    console.log(input)
    return tiles
}

function findKeyByContent(map : any, targetContent : Position) {
    for (const [key, value] of map) {
      if ((targetContent.x === key.x) && (targetContent.y === key.y)) {
        return key;
      }
    }
    return undefined;
  }

const PointInPolygon = (input : string[], pos : Position) : boolean => {
    let rayPos = pos.x
    let intersects = 0
    let firstCross : string | undefined = undefined
    if(Number(input[pos.y][rayPos]) && Number(input[pos.y][rayPos]) !== 7)
        return false
    for(; rayPos < input[0].length; rayPos++){
        let border = Number(input[pos.y][rayPos])
        if(border && border !== 7){
            if(encodingToPipe.get(border) === "L" || encodingToPipe.get(border) === "F"){
                firstCross = encodingToPipe.get(border)!
                intersects++
            }
            else if(firstCross){
                let currentPipe = encodingToPipe.get(border)
                if(firstCross === "L"){
                    if(currentPipe === "J"){
                        intersects++
                        firstCross = undefined
                    }
                    else if(currentPipe === "7"){
                        firstCross = undefined
                    }
                    
                }
                else if(firstCross === "F"){
                    if(currentPipe === "7"){
                        intersects++
                        firstCross = undefined
                    }
                    else if(currentPipe === "J"){
                        firstCross = undefined
                    }
                }
                
            }
            else{
                intersects++
            }
        }
    }
    return intersects % 2 ? true : false
}

module.exports = {
    PartOne,
    Move,
    DetermineStartingPipes,
    PartTwo
}
