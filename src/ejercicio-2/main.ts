import * as chalk from 'chalk'
import * as yargs from 'yargs';
import { GrepCommand } from './grepCommand';

/**
 * Yargs con tuberia
 */
yargs.command({
  command: 'pipe',
  describe: 'Grep de un fichero con tuperia',
  builder: {
    file: {
      describe: 'file',
      demandOption: true,
      type: 'string',
    },
    word: {
      describe: 'word',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.file === 'string' && typeof argv.word === 'string' && process.argv.length === 5) {
        const pipeFunction = new GrepCommand(argv.file, argv.word)
        console.log(pipeFunction.pipe())
    } else {
        console.log(chalk.red('Argumentos inválidos'))
    }
  },
});

/**
 * Yargs sin tuberia
 */
yargs.command({
  command: 'nopipe',
  describe: 'Grep de un fichero sin tuberia',
  builder: {
    file: {
      describe: 'file',
      demandOption: true,
      type: 'string',
    },
    word: {
      describe: 'word',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.file === 'string' && typeof argv.word === 'string' && process.argv.length === 5) {
        const nopipeFunction = new GrepCommand(argv.file, argv.word)  
        console.log(nopipeFunction.nopipe())
    } else {
        console.log(chalk.red('Argumentos inválidos'))
    }
  },
});

yargs.parse()