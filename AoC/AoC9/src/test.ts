const app = require("./index.ts")

test('Generate Sequence', () => {
  expect(app.generateSequence([0, 3, 6, 9, 12, 15])).toStrictEqual([3, 3, 3, 3, 3]);
});


test('Generate Sequence', () => {
  expect(app.generateSequence([3, 3, 3, 3, 3])).toStrictEqual([0, 0, 0, 0]);
});

test('Generate Sequence', () => {
  expect(app.generateSequence([3, 3, 3, 3, 3])).toStrictEqual([0, 0, 0, 0]);
});

test('Fill Placeholder', () => {
  expect(app.fillPlaceholder([0, 3, 6, 9, 12, 15], 3)).toBe(18)
})


test('getForwardHistory test', () => {
  let result : number = app.getForwardHistory([
    [1, 1, 1, 1 ],
    [2, 3, 4, 5, 6],
    [1, 3, 6, 10, 15, 21],
  ])
  expect(result).toBe(28)
})


test('Generate Sequence', () => {
  expect(app.generateSequence([-4, 0])).toStrictEqual([4])
});


test('Easy Test', () => {
  expect(app.PartOne("input-easy.txt")).toBe(114)
})

test('Hard Test', () => {
  expect(app.PartOne("input.txt")).toBe(1930746032)
})


test('getBackwardHistory test', () => {
  let result : number = app.getBackwardHistory([
    [2,2,2],
    [0, 2, 4, 6],
    [3, 3, 5, 9, 15],
    [10,  13,  16,  21,  30,  45],
  ])
  expect(result).toBe(5)
})

test('Hard Test', () => {
  expect(app.PartTwo("input.txt")).toBe(1930746032)
})
