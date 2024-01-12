const app = require("./index.ts")
import {Position} from "./index"
import fs from 'fs'

test('Move function 7', () => {
    const input = fs.readFileSync("inputs/easiest.txt", 'utf-8').split("\r\n")
    let currPos : Position = {x: 3, y: 1}
    let prevPos : Position = {x: 2, y: 1}
    let result : Position = {x: 3, y:2}
    expect(app.Move(currPos, prevPos, input)[0]).toStrictEqual(result);
});

test('Move function 7 reverse', () => {
    const input = fs.readFileSync("inputs/easiest.txt", 'utf-8').split("\r\n")
    let currPos : Position = {x: 3, y: 1}
    let prevPos : Position = {x: 3, y:2}
    let result : Position = {x: 2, y: 1}
    expect(app.Move(currPos, prevPos, input)[0]).toStrictEqual(result);
});


test('Move function J', () => {
    const input = fs.readFileSync("inputs/easiest.txt", 'utf-8').split("\r\n")
    let currPos : Position = {x: 3, y: 3}
    let prevPos : Position = {x: 3, y: 2}
    let result : Position = {x: 2, y:3}
    expect(app.Move(currPos, prevPos, input)[0]).toStrictEqual(result);
});

test('Move function J reverse', () => {
    const input = fs.readFileSync("inputs/easiest.txt", 'utf-8').split("\r\n")
    let currPos : Position = {x: 3, y: 3}
    let prevPos : Position = {x: 2, y:3}
    let result : Position = {x: 3, y: 2}
    expect(app.Move(currPos, prevPos, input)[0]).toStrictEqual(result);
});

test('Move function L', () => {
    const input = fs.readFileSync("inputs/easiest.txt", 'utf-8').split("\r\n")
    let currPos : Position = {x: 1, y: 3}
    let prevPos : Position = {x: 1, y:2}
    let result : Position = {x: 2, y: 3}
    expect(app.Move(currPos, prevPos, input)[0]).toStrictEqual(result);
});

test('Move function L reverse', () => {
    const input = fs.readFileSync("inputs/easiest.txt", 'utf-8').split("\r\n")
    let currPos : Position = {x: 1, y: 3}
    let prevPos : Position = {x: 2, y: 3}
    let result : Position = {x: 1, y:2}
    expect(app.Move(currPos, prevPos, input)[0]).toStrictEqual(result);
});

test('Move function F', () => {
    const input = [
        ".....",
        ".F-7.",
        ".|.|.",
        ".L-J.",
        "....."
    ]
    let currPos : Position = {x: 1, y: 1}
    let prevPos : Position = {x: 1, y: 2}
    let result : Position = {x: 2, y:1}
    expect(app.Move(currPos, prevPos, input)[0]).toStrictEqual(result);
});

test('Move function F reverse', () => {
    const input = [
        ".....",
        ".F-7.",
        ".|.|.",
        ".L-J.",
        "....."
    ]
    let currPos : Position = {x: 1, y: 1}
    let prevPos : Position = {x: 2, y:1}
    let result : Position = {x: 1, y: 2}
    expect(app.Move(currPos, prevPos, input)[0]).toStrictEqual(result);
});


test('Determine Starting Pipes', () => {
    const input = [
        ".....",
        ".S-7.",
        ".|.|.",
        ".L-J.",
        "....."
    ]
    let indexOfS : Position = {x: 1, y: 1}
   
    expect(app.DetermineStartingPipes(indexOfS, input)).toEqual(expect.arrayContaining([{x:2, y:1}, {x:1, y:2}]));
});

test('Determine Starting Pipes', () => {
    const input = [
        ".....",
        ".F-S.",
        ".|.|.",
        ".L-J.",
        "....."
    ]
    let indexOfS : Position = {x: 3, y: 1}
   
    expect(app.DetermineStartingPipes(indexOfS, input)).toEqual(expect.arrayContaining([{x:2, y:1}, {x:3, y:2}]));
});

test('Determine Starting Pipes', () => {
    const input = [
        ".....",
        ".F-7.",
        ".|.|.",
        ".L-S.",
        "....."
    ]
    let indexOfS : Position = {x: 3, y: 3}
   
    expect(app.DetermineStartingPipes(indexOfS, input)).toEqual(expect.arrayContaining([{x:3, y:2}, {x:2, y:3}]));
});

test('Determine Starting Pipes', () => {
    const input = [
        ".....",
        ".F-7.",
        ".|.|.",
        ".S-J.",
        "....."
    ]
    let indexOfS : Position = {x: 1, y: 3}
   
    expect(app.DetermineStartingPipes(indexOfS, input)).toEqual(expect.arrayContaining([{x:1, y:2}, {x:2, y:3}]));
});


test('Determine Starting Pipes', () => {
    expect(app.PartOne("inputs/easiest.txt")).toEqual(4);
});


test('Determine Starting Pipes', () => {
    expect(app.PartOne("inputs/easy.txt")).toEqual(6);
});

test('Determine Starting Pipes', () => {
    expect(app.PartOne("inputs/input.txt")).toEqual(6725);
});


test('P2 easiest', () => {
    expect(app.PartTwo("inputs/easiest.txt", "F")).toEqual(1);
});

test('P2 easy', () => {
    expect(app.PartTwo("inputs/easy.txt", "F")).toEqual(2);
});

test('P2 hard example', () => {
    expect(app.PartTwo("inputs/p2-hard-example.txt", "F")).toEqual(2);
});

test('P2 harder example', () => {
    
    expect(app.PartTwo("inputs/p2-harder-example.txt", "F")).toEqual(4);
});

test('P2 harder example enclosed', () => {
    
    expect(app.PartTwo("inputs/p2-harder-example-enclosed.txt", "F")).toEqual(4);
});


test('P2 hardest example', () => {
    expect(app.PartTwo("inputs/p2-hardest-example.txt", "F")).toEqual(8);
});

test('P2 hardest example junk', () => {
    expect(app.PartTwo("inputs/p2-hardest-example-junk.txt", "7")).toEqual(10);
});

test('P2 real input', () => {
    expect(app.PartTwo("inputs/input.txt", "L")).toEqual(383);
});




