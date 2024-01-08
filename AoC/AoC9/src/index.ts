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

const generateSequenceTree = (sequence : number[]) : number[][] => {
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

    return sequenceTree
}

const getForwardHistory = (tree : number[][]) : number => {
    let placeHolder : number = 0
    for(let currSequence of tree){
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

const getBackwardHistory = (tree : number[][]) : number => {
    let placeHolder : number = 0
    let prevSequence : number[] = [0]
    for(let currSequence of tree){
        if(Number.isNaN(placeHolder)){
            console.log(placeHolder)
        }
        let firstElement : number = currSequence[0]
        if(Number.isNaN(firstElement) || firstElement === undefined){
            firstElement = 0
        }
        let currHistory : number = firstElement - prevSequence[0] 
        currSequence.unshift(currHistory)
        prevSequence = currSequence
        placeHolder = currHistory

    }
    return placeHolder
}

const PartOne = (fileName : string) : number => { 
    let input = fs.readFileSync(fileName, 'utf-8').split("\r\n")
    let sequences = input.map((line : String) => line.match(/-?\d+/g)?.map(val => Number(val)))
    let seqTrees : number[][][] = sequences.map((seq : any) => generateSequenceTree(seq))
    let predictions = seqTrees.map((tree : number[][]) => getForwardHistory(tree))
    return predictions.reduce((acc : any, current : any) => acc + current)
}

const PartTwo = (fileName : string) : number => { 
    let input = fs.readFileSync(fileName, 'utf-8').split("\r\n")
    let sequences = input.map((line : String) => line.match(/-?\d+/g)?.map(val => Number(val)))
    let seqTrees : number[][][] = sequences.map((seq : any) => generateSequenceTree(seq))
    let predictions = seqTrees.map((tree : number[][]) => getBackwardHistory(tree))
    return predictions.reduce((acc : any, current : any) => acc + current)
}

module.exports = {
    generateSequence,
    fillPlaceholder,
    getForwardHistory,
    getBackwardHistory,
    PartOne,
    PartTwo,
}