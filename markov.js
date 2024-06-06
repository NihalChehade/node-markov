/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    this.chain ={}
    for(let i=0; i <= this.words.length-1; i++){
      const arr=[];
      if(!(this.words[i] in this.chain)){
        for (let j=0; j <= this.words.length-1; j++){
          if(this.words[i]===this.words[j]){
            if(this.words[j+1]){
              arr.push(this.words[j+1])
              
            }else{
              arr.push(null)
            }
            
          }
        }
        this.chain[this.words[i]]=arr;
      }
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let text;
    let randomIdx = Math.floor(Math.random() * Object.keys(this.chain).length);
    const words = Object.keys(this.chain);
    let word =words[randomIdx];
    text = word;
    let possibleWords = this.chain[word];

    for(let i=1; i<= numWords-1; i++){
      let idx = Math.floor(Math.random() * possibleWords.length);
      word = possibleWords[idx];

      if(word === null){ return text;}

      text += " " + word;
      possibleWords = this.chain[word];
    }
    return text;  
  }
}

let mm = new MarkovMachine("the cat in the hat");


mm.makeText(numWords=50);
module.exports={ MarkovMachine}