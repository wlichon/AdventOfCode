const fs = require('node:fs')

function Iterate(seed, map){
    let interval = map.filter(mapLine => mapLine.input[0] <= seed && mapLine.input[1] >= seed)[0]
    if(interval == undefined){
        return seed
    }
    let result = (seed-interval.input[0]) + interval.output[0]
    return result
}

function ParseInput(fileName){
    let input = fs
    .readFileSync(fileName, 'utf8')
    .toString()
    .trim()
    .split("\r\n\r\n")
    
    let seeds = input.shift().split(':')[1].trim().split(" ")

    mappings = input.map(currentMap => {
        let splitMap = currentMap.split("\r\n")
        splitMap.shift()
        let convertedSplitMap = splitMap.map(mapLine => {
            mapLineSplit = mapLine.split(" ").map(number => Number(number))
            
            return {
                'input' : [mapLineSplit[1], mapLineSplit[1] + mapLineSplit[2] - 1],
                'output' : [mapLineSplit[0], mapLineSplit[0] + mapLineSplit[2] - 1] 
            }
        })
        return convertedSplitMap
    })
    return {
        'seeds' : seeds,
        'mappings' : mappings
    }
}

function RangesOverlap(r1, r2){
    if(r1[0] <= r2[1] && r2[0] <= r1[1]){
            return true
        }
    return false
}

function GetRangeIntersection(seedRange, mapLineInput){
    let low = seedRange[0] < mapLineInput[0] ? mapLineInput[0] : seedRange[0]
    let high = seedRange[1] < mapLineInput[1] ? seedRange[1] : mapLineInput[1]
    return (low > high) ? undefined : [low, high] 
}

function TranslateToOutputRange(seedRange, mapLine){
    let intersection = GetRangeIntersection(seedRange, mapLine.input)
    if(intersection === undefined){
        return undefined
    }
    
    let low = intersection[0] - mapLine.input[0] + mapLine.output[0]
    let high = intersection[1] - mapLine.input[0] + mapLine.output[0]
    
    return {
        "intersection" : intersection, 
        "output" : [low, high]
    }
        
}

function DetermineUnconvertedRanges(seedRange, results){
    results.sort(compareFn)
    let lastLow = seedRange[0]
    let unconverted = []
    for(result of results){
        if(lastLow >= result.intersection[0]){
            lastLow = result.intersection[1] + 1 
            continue
        }
        unconverted.push([lastLow, result.intersection[0] - 1])
        lastLow = result.intersection[1] + 1
    }
    if(lastLow <= seedRange[1]){
        unconverted.push([lastLow, seedRange[1]])
    }
    return unconverted
}

function compareFn(a, b){
    if(a.intersection[0] < b.intersection[0]){
        return -1;
    }
    else if(a.intersection[0] > b.intersection[0]){
        return 1;
    }
    else{
        return 0;
    }
}

function ConvertRange(seedRanges, mapping){
    let results = []
    seedRanges.map(seedRange => {
        let currentSeedResults = []
        mapping.map(mapLine =>{
            if(RangesOverlap(seedRange, mapLine.input)){
                result = TranslateToOutputRange(seedRange, mapLine)
                if(result !== undefined){
                    currentSeedResults.push(result)        
                }
            }
        })
        let unconvertedSeed = DetermineUnconvertedRanges(seedRange, currentSeedResults)
        for(seed of unconvertedSeed){
            currentSeedResults.push({
                "intersection" : seed, 
                "output" : seed
            })
        }
        results = results.concat(currentSeedResults)
    })

    return results
}

function PartOne(fileName){  
    const input = ParseInput(fileName)
    
    let locations = []
    
    for(seed of input.seeds){
        soil = Iterate(seed, input.mappings[0])
        fertilizer = Iterate(soil, input.mappings[1])
        water = Iterate(fertilizer, input.mappings[2])
        light = Iterate(water, input.mappings[3])
        temp = Iterate(light, input.mappings[4])
        humid = Iterate(temp, input.mappings[5])
        location = Iterate(humid, input.mappings[6])
        locations.push(location)
    }
    
    let minLocation = Number.MAX_SAFE_INTEGER
    
    for(location of locations){
        if(location < minLocation){
            minLocation = location
        }
    }
    return minLocation
}

function ConvertSeedsToRange(seeds){
    let seedsRange = []
    for(i = 0; i < seeds.length; i+=2){
        seedsRange.push([seeds[i], seeds[i] + seeds[i+1] - 1])
    }

    return seedsRange
}

function PartTwo(fileName){
    const input = ParseInput(fileName)

    let currentRanges = ConvertSeedsToRange(input.seeds.map(x => Number(x)))

    currentRanges = ConvertRange(currentRanges, input.mappings[0])
    currentRanges = ConvertRange(currentRanges.map(r => r.output), input.mappings[1])
    currentRanges = ConvertRange(currentRanges.map(r => r.output), input.mappings[2])
    currentRanges = ConvertRange(currentRanges.map(r => r.output), input.mappings[3])
    currentRanges = ConvertRange(currentRanges.map(r => r.output), input.mappings[4])
    currentRanges = ConvertRange(currentRanges.map(r => r.output), input.mappings[5])
    currentRanges = ConvertRange(currentRanges.map(r => r.output), input.mappings[6])

    
    let minLocation = Number.MAX_SAFE_INTEGER

    for(range of currentRanges){
        
        if(range.output[0] < minLocation){
            minLocation = range.output[0]
        }
    
        
    }
    return minLocation
}

console.log(PartTwo("input.txt"))


module.exports = {
    PartOne : PartOne,
    Iterate : Iterate,
    ParseInput : ParseInput,
    RangesOverlap : RangesOverlap,
    GetRangeIntersection : GetRangeIntersection,
    TranslateToOutputRange : TranslateToOutputRange,
    compareFn : compareFn,
    DetermineUnconvertedRanges : DetermineUnconvertedRanges,
    ConvertSeedsToRange : ConvertSeedsToRange
};