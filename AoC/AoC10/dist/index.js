"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Move = (currPos, prevPos, input) => {
    let currentPipe = input[currPos.y][currPos.x];
    let newPos = { x: -1, y: -1 };
    switch (currentPipe) {
        case '|':
            if (prevPos.y < currPos.y)
                newPos = { x: currPos.x, y: currPos.y + 1 };
            else {
                newPos = { x: currPos.x, y: currPos.y - 1 };
            }
            break;
        case '-':
            if (prevPos.x < currPos.x) {
                newPos = { x: currPos.x + 1, y: currPos.y };
            }
            else {
                newPos = { x: currPos.x - 1, y: currPos.y };
            }
            break;
        case 'L':
            if (prevPos.y != currPos.y) {
                newPos = { x: currPos.x + 1, y: currPos.y };
            }
            else {
                newPos = { x: currPos.x, y: currPos.y - 1 };
            }
            break;
        case 'J':
            if (prevPos.y != currPos.y) {
                newPos = { x: currPos.x - 1, y: currPos.y };
            }
            else {
                newPos = { x: currPos.x, y: currPos.y - 1 };
            }
            break;
        case '7':
            if (prevPos.y != currPos.y) {
                newPos = { x: currPos.x - 1, y: currPos.y };
            }
            else {
                newPos = { x: currPos.x, y: currPos.y + 1 };
            }
            break;
        case 'F':
            if (prevPos.y != currPos.y) {
                newPos = { x: currPos.x + 1, y: currPos.y };
            }
            else {
                newPos = { x: currPos.x, y: currPos.y + 1 };
            }
            break;
        case '.':
            console.log("came upon a .");
            //currently not necessary
            break;
        case 'S':
            console.log("came upon a S");
            //currently not necessary
            break;
    }
    return [newPos, currPos];
    // | is a vertical pipe connecting north and south.
    // - is a horizontal pipe connecting east and west.
    // L is a 90-degree bend connecting north and east.
    // J is a 90-degree bend connecting north and west.
    // 7 is a 90-degree bend connecting south and west.
    // F is a 90-degree bend connecting south and east.
    // . is ground; there is no pipe in this tile.
    // S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
};
const PartOne = (fileName) => {
    const input = fs_1.default.readFileSync(fileName, 'utf-8').split("\r\n");
    let start = { x: -1, y: -1 };
    for (let i = 0; i < input.length; i++) {
        let match = input[i].match(/S/);
        if (match) {
            start.x = match.index;
            start.y = i;
        }
    }
    let pipe1 = { x: start.x + 1, y: start.y };
    let prev1 = start;
    let pipe2 = { x: start.x, y: start.y + 1 };
    let prev2 = start;
    let visited = new Set([start, pipe1, pipe2]);
    let condition = true;
    let steps = 1;
    while (true) {
        let result1 = Move(pipe1, prev1, input);
        let result2 = Move(pipe2, prev2, input);
        pipe1 = result1[0];
        prev1 = result1[1];
        pipe2 = result2[0];
        pipe2 = result2[1];
        if (pipe1.x === pipe2.x && pipe1.y === pipe2.y) {
            steps++;
            break;
        }
        if (visited.has(pipe1) || visited.has(pipe2)) {
            break;
        }
        visited.add(pipe1);
        visited.add(pipe2);
        steps++;
    }
    return steps;
};
console.log(PartOne("inputs/input.txt"));
module.exports = {
    PartOne,
    Move
};
//# sourceMappingURL=index.js.map