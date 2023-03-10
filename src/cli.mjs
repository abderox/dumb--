#!/usr/bin/env node

// Load the "fs" and "readline" modules
import fs from 'fs';
import readline from'readline';
import {displayDumb} from './modules/logo.mjs';
import {interpret} from './modules/interpreter.mjs';


function interpretFile(filename) {
  // Read the contents of the file
  var program = fs.readFileSync(filename, 'utf8');
  interpret(program,filename);
}


function interpretPrompt() {

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  

  rl.question('Enter a "dumb--" program: ', function(program) {
    // Interpret the program
    interpret(program);
    

    rl.close();
  });
}


await displayDumb();

if (process.argv.length > 2) {
  interpretFile(process.argv[2]);
}

else {
  interpretPrompt();
}
