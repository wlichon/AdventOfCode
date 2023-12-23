import fs from "fs"

var lcm = require('compute-lcm')
type node = {
    left : string,
    right : string
}

export type Network = {
    [key: string] : node  
}

const buildNetwork = (input : string[]) : Network => {
    const mappings : string[][] = input.map(l => {
        let matches = l.match(/[A-Z]+/g)!
        return [matches[0], matches[1], matches[2]]
    })

    const network : Network = mappings.reduce((acc : Network, mapping) => {
        acc[mapping[0]] = {left : mapping[1], right :  mapping[2]}
        return acc
    }, {})

    return network
}

const stepCount = (network : Network, instructions : string) : number => {
    let currentNode : string = "AAA"
    let steps : number = 0
   
    for(let i = 0; currentNode !== "ZZZ"; i = (i+1) % instructions.length){
        if(instructions[i] === 'L'){
            currentNode = network[currentNode].left
        }
        else{
            currentNode = network[currentNode].right
        }
        steps++
    }            
    return steps
}

/*

const stepCountTwo = (network : Network, instructions : string) : number => {
    const keys : string[] = Object.keys(network)
    let currentNodes = keys.filter(key => key[2] === 'A')
    let steps : number = 0
    let goToNextLoop : boolean = true

    for(let i = 0; goToNextLoop; i = (i+1) % instructions.length){
        //console.log([...currentNodes])
        goToNextLoop = false
        steps++
        currentNodes = currentNodes.map(curr => {
            if(instructions[i] === 'L'){
                curr = network[curr].left
            }
            else{
                curr = network[curr].right
            }
            if(curr[2] !== 'Z')
                goToNextLoop = true
            return curr
        })
        
    }            
    return steps
}
*/

const stepCountTwo = (network : Network, instructions : string) : number => {
    const keys : string[] = Object.keys(network)
    let currentNodes = keys.filter(key => key[2] === 'A')
    let goToNextLoop : boolean = true
    let distancesToZ = currentNodes.map(curr => {
        let steps : number = 0;
        for(let i = 0; curr[2] !== "Z" ; i = (i+1) % instructions.length){
            steps++
            if(instructions[i] === 'L'){
                curr = network[curr].left
            }
            else{
                curr = network[curr].right
            }
        }            
        return steps
    })

    return lcm([...distancesToZ])
}

const PartOne = (fileName : string) : number => {
    let input : string[]  = fs.readFileSync(fileName, 'utf8').split('\r\n')
    let instructions : string = input.shift()!
    input.shift() //remove blank
    let network : Network = buildNetwork(input)
    return stepCount(network, instructions)
}


const PartTwo = (fileName : string) : number => {
    let input : string[]  = fs.readFileSync(fileName, 'utf8').split('\r\n')
    let instructions : string = input.shift()!
    input.shift() //remove blank
    let network : Network = buildNetwork(input)
    return stepCountTwo(network, instructions)
}


PartOne("input-easy.txt")


module.exports = {
    PartOne,
    PartTwo,
    stepCount,
    buildNetwork
}