

export function checkWord(attemptedWord: string, actualWord: string) {
  const cleanedAttemptedWord = attemptedWord.toUpperCase();
  const cleanedActualWord = actualWord.toUpperCase();
  return (cleanedAttemptedWord === cleanedActualWord);
}

export function findMatchingCharacters (attemptedWord: string, actualWord: string): Array<boolean> {
  const output: Array<boolean> = [];

  const attemptArray = attemptedWord.toUpperCase().split('');
  const actualArray = actualWord.toUpperCase().split('');

  for(let x = 0; x < attemptArray.length; x++) {
    output.push(attemptArray[x] === actualArray[x])
  }
  return output;
}

export function findIncludedCharacters (attemptedWord: string, actualWord: string): Array<boolean> {
    const output: Array<boolean> = [];

    const attemptArray = attemptedWord.toUpperCase().split('');
    const actualArray = actualWord.toUpperCase().split('');

    for(let x = 0; x < attemptArray.length; x++) {
      if(actualArray.includes(attemptArray[x])) {
        output.push(true);
      } else {
        output.push(false);
      }
    }
    return output;
}

const wordsRaw = require('./words.json');
const words: string[] = [];
for(const [word,] of Object.entries(wordsRaw)) {
  words.push(word);
}

function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
}

export function getWord(): string {
  return words[getRandomInt(words.length-1)]
}
