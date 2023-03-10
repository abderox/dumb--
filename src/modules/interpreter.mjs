import chalk from 'chalk';

function interpret(program,filename) {

  var lines = program.split('\n');
  var statement = '';

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();

    if (line !== '' && !line.startsWith('//')) {

      if (line.endsWith(';')) {
        statement += line.slice(0, -1);
        interpretStatement(statement, i);
        statement = '';
      } else {
        statement += line + ' ';
      }
    }
  }

  function interpretStatement(statement, lineNum) {
    var tokens = statement.split('.');

    if (tokens.length >= 2 && tokens[0].trim() === 'tm') {
      var methodName = tokens[1].split('(')[0];
      if (methodName.trim() === 'dis') {
        var argumentMatch = statement.match(/['"`](.*?)['"`]/);
        if (argumentMatch !== null) {
          var argument = argumentMatch[1];
        } else {
          var argument = tokens[1].split('(')[1].trim().slice(0, -1);
        }
        console.log(chalk.green(`At Line [${lineNum + 1}]`) + ' ' + chalk.gray('>>') + ' ' + chalk.yellow(argument));
      }
      else {
        throw new Error(`Invalid method at Line [${lineNum + 1}]: ` + methodName + `(${filename})`);
      }
    }
    else {
      throw new Error('Invalid "dumb--" statement at Line [' + (lineNum + 1) + ']: ' + statement + `(${filename})` );
    }
  }
}

export { interpret };
