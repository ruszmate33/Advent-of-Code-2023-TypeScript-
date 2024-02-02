import * as fs from "fs";

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const possibleCubes = { red: 12, green: 13, blue: 14 };

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

// function allPossibleDigitsFromLine(
//   line: string,
//   includeAlphaDigits: boolean
// ): string {
//   let digitsOnLine = "";
//   for (let j = 0; j < line.length; j++) {
//     let char = line[j];
//     const parsed = parseInt(char);
//     if (!isNaN(parsed)) {
//       // console.log(`${line} ${parsed}`)
//       digitsOnLine += parsed.toString();
//     }
//     if (includeAlphaDigits) {
//       for (const [index, alphaDigit] of alphabeticDigits.entries()) {
//         if (line.slice(j).startsWith(alphaDigit)) {
//           digitsOnLine = (index + 1).toString();
//           break
//         }
//       }
//     }
//   }
//   return digitsOnLine;
// }

// function numberFromFirstAndLastDigit(digits: string): number {
//   return parseInt(digits.charAt(0).concat(digits.slice(-1)));
// }

function main() {
  const puzzle_input = fs.readFileSync(filePath, { encoding: "utf-8" });
  const lines = puzzle_input.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let gameId = line.split(': ')[0].split(' ')[1]
    let gameSets = processGameSets(line);
    console.log(`gameId ${gameId} gameSets ${gameSets}`)
  }
}
//   let numbers: number[] = [];
//   const puzzle_input = fs.readFileSync(filePath, { encoding: "utf-8" });
//   const lines = puzzle_input.split("\n");
//   for (let i = 0; i < lines.length; i++) {
//     let line = lines[i];
//     let digitsOnLine = allPossibleDigitsFromLine(line, false);

//     let num = numberFromFirstAndLastDigit(digitsOnLine);
//     if (!isNaN(num)) {
//       numbers.push(num);
//     }
//   }
//   // console.log(`numbers ${numbers}`);
//   const sum = numbers.reduce((accumulator, currentValue) => {
//     return accumulator + currentValue;
//   }, 0);
//   console.log(sum);
// }

main();
