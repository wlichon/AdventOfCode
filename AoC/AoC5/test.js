const AoC = require('./index')

// Part One

test('Iterate 1', () => {
    expect(AoC.Iterate(79, AoC.ParseInput('input-easy.txt').mappings[0])).toBe(81);
  });

test('Iterate 2', () => {
  expect(AoC.Iterate(49, AoC.ParseInput('input-easy.txt').mappings[0])).toBe(49);
});

test('Part One', () =>{
  expect(AoC.PartOne("input.txt")).toBe(535088217);
})

// Part Two

test('Intersection - Partial Overlap', () =>{
  expect(AoC.RangesOverlap([2,5], [4,7])).toBe(true)
})

test('Intersection - No Overlap', () =>{
  expect(AoC.RangesOverlap([2,3], [4,7])).toBe(false)
})

test('Intersection - Exact Overlap', () =>{
  expect(AoC.RangesOverlap([2,3], [2,3])).toBe(true)
})

test('Intersection - Engulfing Overlap', () =>{
  expect(AoC.RangesOverlap([2,3], [0,5])).toBe(true)
})



test('Intersection Interval - Partial Overlap', () =>{
  let expected = [4,5]
  let actual = AoC.GetRangeIntersection([2,5], [4,7]) 
  expect(actual).toStrictEqual(expected)
})

test('Intersection Interval - No Overlap', () =>{
  let expected = undefined
  let actual = AoC.GetRangeIntersection([2,3], [4,7]) 
  expect(actual).toStrictEqual(expected)
})

test('Intersection Interval - Exact Overlap', () =>{
  let expected = [2,3]
  let actual = AoC.GetRangeIntersection([2,3], [2,3]) 
  expect(actual).toStrictEqual(expected)
})

test('Intersection Interval - Engulfing Overlap', () =>{
  let expected = [2,3]
  let actual = AoC.GetRangeIntersection([2,3], [0,5]) 
  expect(actual).toStrictEqual(expected)
})


test('Translate - Partial Overlap', () =>{
  let mapLine = {
    'input' : [20, 40],
    'output' : [50, 70] 
  }
  let expected = {
    "intersection" : [20, 30],
    "output" : [50, 60]
  }
  let actual = AoC.TranslateToOutputRange([20, 30], mapLine) 
  expect(actual).toStrictEqual(expected)
})

test('Translate - Partial Overlap', () =>{
  let mapLine = {
    'input' : [20, 40],
    'output' : [50, 70] 
  }
  let expected = {
    "intersection" : [20, 20],
    "output" : [50, 50]
  }

  let actual = AoC.TranslateToOutputRange([20, 20], mapLine) 
  expect(actual).toStrictEqual(expected)
})

test('Translate - Partial Overlap', () =>{
  let mapLine = {
    'input' : [15, 25],
    'output' : [0, 10] 
  }

  let expected = {
    "intersection" : [15, 17],
    "output" : [0, 2]
  }
  let actual = AoC.TranslateToOutputRange([10, 17], mapLine) 
  expect(actual).toStrictEqual(expected)
})

test('Translate - No Overlap', () =>{
  let mapLine = {
    'input' : [15, 25],
    'output' : [0, 10] 
  }
  let expected = undefined
  let actual = AoC.TranslateToOutputRange([0, 5], mapLine) 
  expect(actual).toStrictEqual(expected)
})

test('Translate - Partial Overlap', () =>{
  let mapLine = {
    'input' : [15, 25],
    'output' : [0, 10] 
  }
  let expected = {
    "intersection" : [15, 20],
    "output" : [0, 5]
  }
  let actual = AoC.TranslateToOutputRange([10, 20], mapLine) 
  expect(actual).toStrictEqual(expected)
})


test('Translate - Partial Overlap', () =>{
  let mapLine = {
    'input' : [15, 25],
    'output' : [0, 10] 
  }

  let expected = {
    "intersection" : [20, 25],
    "output" : [5, 10]
  }
  let actual = AoC.TranslateToOutputRange([20, 30], mapLine) 
  expect(actual).toStrictEqual(expected)
})


test('Sorting results', () =>{
  let array = [
    {
        "intersection" : [20, 25],
        "output" : [5, 10]
    },

    {
      "intersection" : [5, 10],
      "output" : [5, 5]
    },

    {
      "intersection" : [30, 35],
      "output" : [5, 10]
    }
  ]
  array.sort(AoC.compareFn);
  
  let expected = [
    {
      "intersection" : [5, 10],
      "output" : [5, 5]
    },
    
    {
        "intersection" : [20, 25],
        "output" : [5, 10]
    },

    {
      "intersection" : [30, 35],
      "output" : [5, 10]
    }
  ]
  expect(array).toStrictEqual(expected)
})

test('Determine Unconverted Ranges', () =>{
  let seedRange = [0, 40]
  let results = [
    {
      "intersection" : [5, 10],
      "output" : [5, 5]
    },
    
    {
        "intersection" : [20, 25],
        "output" : [5, 10]
    },

    {
      "intersection" : [30, 35],
      "output" : [5, 10]
    }
  ]

  let unconvertedSeed = AoC.DetermineUnconvertedRanges(seedRange, results) 
  expect(unconvertedSeed).toStrictEqual([[0, 4], [11, 19], [26, 29], [36,40]])
})

test('Determine Unconverted Ranges', () =>{
  let seedRange = [70, 85]
  let results = [
    {
      "intersection" : [60, 90],
      "output" : [5, 5]
    }
  ]

  let unconvertedSeed = AoC.DetermineUnconvertedRanges(seedRange, results) 
  expect(unconvertedSeed).toStrictEqual([])
})

test('Determine Unconverted Ranges', () =>{
  let seedRange = [70, 85]
  let results = [
    {
      "intersection" : [75, 90],
      "output" : [5, 5]
    }
  ]

  let unconvertedSeed = AoC.DetermineUnconvertedRanges(seedRange, results) 
  expect(unconvertedSeed).toStrictEqual([[70, 74]])
})

test('Convert Seeds To Range', () =>{
  let seeds = [5, 10, 20, 5, 6, 3]

  let actual = AoC.ConvertSeedsToRange(seeds)
  let expected = [[5, 14], [20, 24], [6,8]]
  expect(actual).toStrictEqual(expected)
})
