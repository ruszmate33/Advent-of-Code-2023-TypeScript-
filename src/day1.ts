import * as fs from "fs";

const alphabeticDigits: ReadonlyArray<string> = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

// 142 part1
const testInput1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

// 54605 part1

const testInput2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const filePath = "../inputs/input1.txt";

function allPossibleDigitsFromLine(line: string): string {
  let digitsOnLine = "";
  for (let j = 0; j < line.length; j++) {
    let char = line[j];
    const parsed = parseInt(char);
    if (!isNaN(parsed)) {
      // console.log(`${line} ${parsed}`)
      digitsOnLine = digitsOnLine.concat(parsed.toString());
    }
    for (const [index, alphaDigit] of alphabeticDigits.entries()) {
      if (line.slice(j).startsWith(alphaDigit)) {
        digitsOnLine = digitsOnLine.concat((index + 1).toString());
      }
    }
  }
  return digitsOnLine;
}

function main() {
  let numbers: number[] = [];
  const puzzle_input = fs.readFileSync(filePath, { encoding: "utf-8" });
  const lines = puzzle_input.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let digitsOnLine = allPossibleDigitsFromLine(line);

    let num = parseInt(digitsOnLine.charAt(0).concat(digitsOnLine.slice(-1)));
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }
  // console.log(`numbers ${numbers}`);
  const sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  console.log(sum);
}

main();
