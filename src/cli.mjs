#!/usr/bin/env node

// Load the "fs" and "readline" modules
import fs from 'fs';
import readline from 'readline';
import { displayDumb } from './modules/logo.mjs';
import { interpret } from './modules/interpreter.mjs';
import chalk from 'chalk';



var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



function interpretFile(filename) {
  // Read the contents of the file
  var program = fs.readFileSync(filename, 'utf8');
  interpret(program, filename);
  rl.close();
}


function interpretPrompt() {
 
  rl.question(chalk.bold('dumb-- >'), function (input) {
    // Interpret the input
    if (input === 'exit') {
      rl.close(); 
      return;
    }

    try {
      interpret(input);
    } catch (error) {
      console.error(error)
    }

    interpretPrompt()
  });
}


await displayDumb();

if (process.argv.length > 2) {
  interpretFile(process.argv[2]);
}

else {
  interpretPrompt();
}
