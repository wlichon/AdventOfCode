const app = require("./index.ts")
import {Network} from "./index"

test('test', () => {
    expect(app.PartOne("input-easy.txt")).toBe(2);
});

const network : Network = {
    "AAA" : {left: "BBB", right: "CCC"},
    "BBB" : {left: "DDD", right: "CCC"},
    "CCC" : {left: "ZZZ", right: "ZZZ"},
}

test('StepCount', () => {
    expect(app.stepCount(network, "RL")).toBe(2);
});

test('StepCount', () => {
    expect(app.stepCount(network, "LR")).toBe(3);
});

test('test', () => {
    expect(app.PartOne("input-very-easy.txt")).toBe(6);
});

test('test', () => {
    expect(app.PartOne("input.txt")).toBe(16579);
});

test('test', () => {
    expect(app.PartTwo("input.txt")).toBe(12927600769609);
});

