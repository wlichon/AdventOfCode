const app = require('./index.ts');

test('Hand Strength', () => {
  expect(app.handStrength("AAAAA").strength).toBe(app.HandStrength.Five);
});

test('Hand Strength', () => {
    expect(app.handStrength("AA8AA").strength).toBe(app.HandStrength.Four);
  });

test('Hand Strength', () => {
    expect(app.handStrength("23332").strength).toBe(app.HandStrength.Full);
});

test('Hand Strength', () => {
    expect(app.handStrength("TTT98").strength).toBe(app.HandStrength.Three);
});

test('Hand Strength', () => {
    expect(app.handStrength("23432").strength).toBe(app.HandStrength.Two);
});

test('Hand Strength', () => {
    expect(app.handStrength("A23A4").strength).toBe(app.HandStrength.One);
});

test('Hand Strength', () => {
    expect(app.handStrength("23456").strength).toBe(app.HandStrength.High);
});

test('Hand Strength', () => {
    expect(app.handStrength("2345J").strength).toBe(app.HandStrength.High);
});

test('Part One - easy', () => {
    expect(app.PartOne("input-easy.txt")).toBe(6440);
});

test('Part One - hard', () => {
    expect(app.PartOne("input.txt")).toBe(251216224);
});

test('Part Two - easy', () => {
    expect(app.PartTwo("input-easy.txt")).toBe(5905);
});

test('Part Two - hand strength with jokers', () => {
    expect(app.handStrength("QJJQ2", true).strength).toBe(app.HandStrength.Four);
});

test('Part Two - hand strength with jokers', () => {
    expect(app.handStrength("JJJJ2", true).strength).toBe(app.HandStrength.Five);
});

test('Part Two - hand strength with jokers', () => {
    expect(app.handStrength("AJJAA", true).strength).toBe(app.HandStrength.Five);
});

test('Part Two - hand strength with jokers', () => {
    expect(app.handStrength("AAAJA", true).strength).toBe(app.HandStrength.Five);
});

test('Part Two - hand strength with jokers', () => {
    expect(app.handStrength("TTQQJ", true).strength).toBe(app.HandStrength.Full);
});

test('Part Two - hand strength with jokers', () => {
    expect(app.handStrength("JJQQT", true).strength).toBe(app.HandStrength.Four);
});

test('Part Two - hand strength with jokers', () => {
    expect(app.handStrength("QJJQ2", true).strength).toBe(app.HandStrength.Four);
});

test('Part Two - hand strength with jokers', () => {
    expect(app.handStrength("TTJ25", true).strength).toBe(app.HandStrength.Three);
});

test('Part Two - hand strength with jokers', () => {
    expect(app.handStrength("T3J25", true).strength).toBe(app.HandStrength.One);
});


test('Hand Strength with jokers', () => {
    expect(app.handStrength("AAAAA", true).strength).toBe(app.HandStrength.Five);
  });
  
test('Hand Strength with jokers', () => {
    expect(app.handStrength("AA8AA", true).strength).toBe(app.HandStrength.Four);
});

test('Hand Strength with jokers', () => {
    expect(app.handStrength("23332", true).strength).toBe(app.HandStrength.Full);
});

test('Hand Strength with jokers', () => {
    expect(app.handStrength("TTT98", true).strength).toBe(app.HandStrength.Three);
});

test('Hand Strength with jokers', () => {
    expect(app.handStrength("23432", true).strength).toBe(app.HandStrength.Two);
});

test('Hand Strength with jokers', () => {
    expect(app.handStrength("A23A4", true).strength).toBe(app.HandStrength.One);
});

test('Hand Strength with jokers', () => {
    expect(app.handStrength("23456", true).strength).toBe(app.HandStrength.High);
});

test('Hand Strength with jokers', () => {
    expect(app.handStrength("2345J", true).strength).toBe(app.HandStrength.One);
});

test('Hand Strength with jokers', () => {
expect(app.handStrength("JJ8JJ", true).strength).toBe(app.HandStrength.Five);
});

test('Hand Strength with jokers', () => {
    expect(app.handStrength("AJJQJ", true).strength).toBe(app.HandStrength.Four);
});



test('Part Two - hard', () => {
    expect(app.PartTwo("input.txt")).toBe(5905);
});