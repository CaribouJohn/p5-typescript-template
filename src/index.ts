import P5 from "p5";

let w = 10;
// An array of 0s and 1s
let cells: number[];

// The process of creating the new generation
function generate() {
    // First we create an empty array for the new values
    let nextgen: number[] = Array(cells.length);
    // For every spot, determine new state by examing current state, and neighbor states
    // Ignore edges that only have one neighor
    for (let i = 1; i < cells.length - 1; i++) {
        let left = cells[i - 1];   // Left neighbor state
        let me = cells[i];     // Current state
        let right = cells[i + 1];   // Right neighbor state
        nextgen[i] = rules(left, me, right); // Compute next generation state based on ruleset
    }
    // The current generation is the new generation
    cells = nextgen;
    generation++;
}


// Implementing the Wolfram rules
// Could be improved and made more concise, but here we can explicitly see what is going on for each case
function rules(a: number, b: number, c: number) {
    if (a == 1 && b == 1 && c == 1) return ruleset[0];
    if (a == 1 && b == 1 && c == 0) return ruleset[1];
    if (a == 1 && b == 0 && c == 1) return ruleset[2];
    if (a == 1 && b == 0 && c == 0) return ruleset[3];
    if (a == 0 && b == 1 && c == 1) return ruleset[4];
    if (a == 0 && b == 1 && c == 0) return ruleset[5];
    if (a == 0 && b == 0 && c == 1) return ruleset[6];
    if (a == 0 && b == 0 && c == 0) return ruleset[7];
    return 0;
}


// We arbitrarily start with just the middle cell having a state of "1"
let generation = 0;

// An array to store the ruleset, for example {0,1,1,0,1,1,0,1}
//let ruleset = [0, 1, 0, 1, 1, 0, 1, 0];
let ruleset = [0, 1, 1, 0, 1, 1, 0, 1];

const sketch = (p5: P5) => {
    p5.setup = () => {
        p5.createCanvas(640, 400);
        cells = Array(Math.floor(p5.width / w));
        for (let i = 0; i < cells.length; i++) {
            cells[i] = 0;
        }
        cells[cells.length / 2] = 1;
    };

    p5.draw = () => {
        for (let i = 0; i < cells.length; i++) {
            if (cells[i] === 1) {
                p5.fill(200);
            } else {
                p5.fill(51);
                p5.noStroke();
                p5.rect(i * w, generation * w, w, w);
            }
        }
        if (generation < p5.height / w) {
            generate();
        }
    };

};



let _instance = new P5(sketch);
