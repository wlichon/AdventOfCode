"use strict";
const app = require("./index.ts");
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
    expect(app.fillPlaceholder([0, 3, 6, 9, 12, 15], 3)).toBe(18);
});
test('Run test', () => {
    let result = app.run([
        10, 7, 4, 1, -2, -5, -8, -11, -14, -17, -20, -23, -26, -29, -32, -35, -38, -41, -44, -47, -50
    ]);
    expect(result).toBe(-53);
});
test('Generate Sequence', () => {
    expect(app.generateSequence([-4, 0])).toStrictEqual([4]);
});
test('Easy Test', () => {
    expect(app.PartOne("input-easy.txt")).toBe(114);
});
test('Hard Test', () => {
    expect(app.PartOne("input.txt")).toBe(11);
});
//# sourceMappingURL=test.js.map