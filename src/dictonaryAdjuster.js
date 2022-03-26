const wordsRaw = require('./words.json');
const fs = require('fs');
const words = [];
for (const [word] of Object.entries(wordsRaw)) {
  if(word.length < 10) {
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

shuffleArray(words);
fs.writeFileSync('dict.json', JSON.stringify(words));
console.log(words);

