const { MarkovMachine } =require("./markov");

describe('MarkovMachine', () => {
  let mm;

  beforeEach(() => {
    mm = new MarkovMachine("the cat in the hat");
  });

  test('should create an instance of MarkovMachine', () => {
    expect(mm).toBeInstanceOf(MarkovMachine);
  });

  test('should correctly parse input text into words array', () => {
    expect(mm.words).toEqual(["the", "cat", "in", "the", "hat"]);
  });

  test('should correctly create chains', () => {
    const expectedChains = {
      "the": ["cat", "hat"],
      "cat": ["in"],
      "in": ["the"],
      "hat": [null]
    };
    expect(mm.chain).toEqual(expectedChains);
  });

  test('should generate text of specified length', () => {
    const text = mm.makeText(10);
    const words = text.split(" ");
    expect(words.length).toBeLessThanOrEqual(10);
  });

  test('should generate text using the chains', () => {
    const text = mm.makeText(10);
    const words = text.split(" ");
    for (let i = 0; i < words.length - 1; i++) {
      const currentWord = words[i];
      const nextWord = words[i + 1];
      expect(mm.chain[currentWord]).toContain(nextWord);
    }
  });

  test('should terminate text generation if null is encountered', () => {
    const mmWithEnd = new MarkovMachine("a b c");
    const text = mmWithEnd.makeText(10);
    expect(text.split(" ").length).toBeLessThanOrEqual(3);
  });
});
