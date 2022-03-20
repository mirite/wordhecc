import { Handler } from '@netlify/functions'
const wordsRaw = require('./words.json');
const wordsJSON = JSON.parse(wordsRaw);
const words: string[] = [];
for(const [word,] of Object.entries(wordsJSON)) {
  words.push(word);
}

function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
}

export const handler: Handler = async (event, context) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      word: words[getRandomInt(words.length-1)],
    }),
  }
}
