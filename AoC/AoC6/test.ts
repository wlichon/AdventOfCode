
const AoC = require('./index.ts')

test('Calculate Distance 1', () => {
    expect(AoC.CalculateDistance(1, 7)).toBe(6);
  });

test('Calculate Distance 1', () => {
  expect(AoC.CalculateDistance(2, 7)).toBe(10);
});

test('Calculate Distance 1', () => {
  expect(AoC.CalculateDistance(3, 7)).toBe(12);
});

test('Calculate Distance 1', () => {
  expect(AoC.CalculateDistance(0, 7)).toBe(0);
});

test('Calculate Distance 1', () => {
  expect(AoC.CalculateDistance(7, 7)).toBe(0);
});

test('Calculate Distance 1', () => {
  expect(AoC.CalculateDistance(7, 7)).toBe(0);
});

test('Part One Easy', () => {
  expect(AoC.PartOne("input-easy.txt")).toBe(288);
});

test('Part One Easy', () => {
  expect(AoC.PartOne("input.txt")).toBe(138915);
});