const wordsRaw = require('./words.json');
const fs = require('fs');
const words = [];
for (const [word] of Object.entries(wordsRaw)) {
  if(word.length < 9 && !word.includes('-')) {
  words.push(word);
  }
}

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

fs.writeFileSync('src/helpers/dictAlpha.json', JSON.stringify(words));
shuffleArray(words);
fs.writeFileSync('src/helpers/dict.json', JSON.stringify(words));
console.log(words);

