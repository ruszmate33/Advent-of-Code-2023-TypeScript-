import * as fs from "fs";

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const testInput2 = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green`;

interface colorNumColors {
  [key: string]: number;
}

const possibleCubes: colorNumColors = { red: 12, green: 13, blue: 14 };

// part1 puzzle input solution 2085
// testInput with part1 is 8

// part2 puzzle input solution 79315
// testInput with part1 is 2286

const filePath = "../inputs/input2.txt";

function processGameSets(line: string): string[][] {
  const sets: string[] = line.trim().split(": ")[1].split("; ");
  let gameSets: string[][] = [];
  sets.forEach((s) => {
    gameSets.push(s.split(", "));
  });
  return gameSets;
}

function validDraw(
  drawNum: number,
  drawColor: string,
  possibleCubes: colorNumColors
): boolean {
  if (drawNum > possibleCubes[drawColor]) {
    return false;
  }
  return true;
}

function getMinimumSets(gameSets: string[][]): colorNumColors {
  let minimumSet: colorNumColors = {};
  for (let i = 0; i < gameSets.length; i++) {
    for (let j = 0; j < gameSets[i].length; j++) {
      let draw = gameSets[i][j];
      let drawNum = parseInt(draw.split(" ")[0]);
      let drawColor = draw.split(" ")[1];
      let currentNumbreForColor = minimumSet[drawColor] ?? 0;
      if (currentNumbreForColor < drawNum) {
        minimumSet[drawColor] = drawNum;
      }
    }
  }
  return minimumSet;
}

function sumOfNums(nums: number[]): number {
  return nums.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
}

function productOfNums(nums: number[]): number {
  return nums.reduce((accumulator, currentValue) => {
    return accumulator * currentValue;
  }, 1);
}

function main() {
  const validGameIds: number[] = [];
  const puzzle_input = fs.readFileSync(filePath, { encoding: "utf-8" });
  const lines = puzzle_input.split("\n");
  let sumOfProductsMinimumSets = 0;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let gameId = parseInt(line.split(": ")[0].split(" ")[1]);
    let gameSets = processGameSets(line);
    sumOfProductsMinimumSets += productOfNums(
      Object.values(getMinimumSets(gameSets))
    );
    let gameValid = true;
    for (let j = 0; j < gameSets.length; j++) {
      if (!gameValid) {
        break;
      }
      let gSet: string[] = gameSets[j];
      for (let k = 0; k < gSet.length; k++) {
        let draw: string = gSet[k];
        let drawNum = parseInt(draw.split(" ")[0]);
        let drawColor = draw.split(" ")[1];
        if (!validDraw(drawNum, drawColor, possibleCubes)) {
          gameValid = false;
          break;
        }
      }
    }
    if (gameValid) validGameIds.push(gameId);
  }
  console.log(`part1: ${sumOfNums(validGameIds)}`);
  console.log(`part2: ${sumOfProductsMinimumSets}`);
}

main();
