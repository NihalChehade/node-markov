/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } =require("./markov");

function generateText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

function makeTextFromFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(`Error reading file: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

async function makeTextFromURL(url) {
  try {
    const response = await axios.get(url);
    generateText(response.data);
  } catch (err) {
    console.log(`Error fetching URL: ${err}`);
    process.exit(1);
  }
}

const [method, path] = process.argv.slice(2);

if (method === 'file') {
  makeTextFromFile(path);
} else if (method === 'url') {
  makeTextFromURL(path);
} else {
  console.log('Unknown method. Use "file" or "url"');
  process.exit(1);
}