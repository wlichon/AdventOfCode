"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const generateSequence = (sequence) => {
    let result = [];
    for (let i = 0; i < sequence.length - 1; i++) {
        result.push(sequence[i + 1] - sequence[i]);
    }
    return result;
};
const fillPlaceholder = (longerSequence, previousPlaceholder) => {
    return longerSequence.slice(-1)[0] + previousPlaceholder;
};
const run = (sequence) => {
    let current = sequence;
    let sequenceTree = [];
    sequenceTree.push(current);
    while (true) {
        current = generateSequence(current);
        sequenceTree.unshift(current);
        if (current.filter(x => x === 0).length === current.length) {
            break;
        }
    }
    let placeHolder = 0;
    for (let currSequence of sequenceTree) {
        if (Number.isNaN(placeHolder)) {
            console.log(placeHolder);
        }
        let lastElement = currSequence.slice(-1)[0];
        if (Number.isNaN(lastElement) || lastElement === undefined) {
            lastElement = 0;
        }
        placeHolder += lastElement;
    }
    return placeHolder;
};
const PartOne = (fileName) => {
    let input = fs_1.default.readFileSync(fileName, 'utf-8').split("\r\n");
    let sequences = input.map(line => { var _a; return (_a = line.match(/-?\d+/g)) === null || _a === void 0 ? void 0 : _a.map(val => Number(val)); });
    let predictions = sequences.map((seq) => run(seq));
    return predictions.reduce((acc, current) => acc + current);
};
console.log(PartOne("input.txt"));
module.exports = {
    generateSequence,
    fillPlaceholder,
    PartOne,
    run
};
//# sourceMappingURL=index.js.map