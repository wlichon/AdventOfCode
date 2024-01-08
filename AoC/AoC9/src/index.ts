import fs from "fs"

const generateSequence = (sequence : number[]) : number[] => {
    let result : number[] = []
    for(let i = 0; i < sequence.length-1; i++){
        result.push(sequence[i+1] - sequence[i])
    }
    return result
}

const fillPlaceholder = (longerSequence : number[], previousPlaceholder : number) : number => {
    return longerSequence.slice(-1)[0] + previousPlaceholder
}

const run = (sequence : number[]) : number => {
    let current : number[] = sequence
    let sequenceTree : number[][] = []
    sequenceTree.push(current)
    while(true){
        current = generateSequence(current)
        sequenceTree.unshift(current)
        if(current.filter(x => x === 0).length === current.length){
            break;
        }
    }

    let placeHolder : number = 0
    for(let currSequence of sequenceTree){
        if(Number.isNaN(placeHolder)){
            console.log(placeHolder)
        }
        let lastElement : number = currSequence.slice(-1)[0]
        if(Number.isNaN(lastElement) || lastElement === undefined){
            lastElement = 0
        }
        placeHolder += lastElement
    }

    return placeHolder
}

const PartOne = (fileName : string) : number => { 
    let input = fs.readFileSync(fileName, 'utf-8').split("\r\n")
    let sequences = input.map(line => line.match(/-?\d+/g)?.map(val => Number(val)))
    let predictions = sequences.map((seq : any) => run(seq))
    return predictions.reduce((acc, current) => acc + current)
}

console.log(PartOne("input.txt"))


module.exports = {
    generateSequence,
    fillPlaceholder,
    PartOne,
    run
}