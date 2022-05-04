import { Note } from "./note";
import { ManagerNote } from "./managerNote";
import * as yargs from 'yargs';
import * as chalk from 'chalk';

/**
 * Yargs de Add Note
 */
yargs.command({
  command: 'add',
  describe: 'Add new note',
  builder: {
      user: {
          describe: 'User Name',
          demandOption: true,
          type: 'string',
      },
      title: {
          describe: 'Note Title',
          demandOption: true,
          type: 'string',
      },
      body: {
          describe: 'Note Body',
          demandOption: true,
          type: 'string',
      },
      color: {
          describe: 'Note Color',
          demandOption: true,
          type: 'string',
      },
  },
  handler(argv) {
      if(typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
          const newNote = new Note(argv.title, argv.body, argv.color)
          const managerNote = new ManagerNote(argv.user)
          managerNote.addNote(newNote)
      } else {
          console.log(chalk.red('Argumentos inválidos'))
      }
  }
})

/**
 * Yargs de Edit Note
 */
yargs.command({
  command: 'edit',
  describe: 'Edit note',
  builder: {
      user: {
          describe: 'User Name',
          demandOption: true,
          type: 'string',
      },
      title: {
          describe: 'Note Title',
          demandOption: true,
          type: 'string',
      },      
      newTitle: {
        describe: 'New Title',
        demandOption: true,
        type: 'string',
      },
      body: {
          describe: 'Note Body',
          demandOption: true,
          type: 'string',
      },
      color: {
          describe: 'Note Color',
          demandOption: true,
          type: 'string',
      },
  },
  handler(argv) {
      if(typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string' && typeof argv.newTitle === 'string') {
          const managerNote = new ManagerNote(argv.user)
          managerNote.editNote(argv.title, argv.newTitle, argv.body, argv.color)
      } else {
          console.log(chalk.red('Argumentos inválidos'))
      }
  }
})

/**
 * Yargs de Remove Note
 */
yargs.command({
    command: 'remove',
    describe: 'Eliminar una nota',
    builder: {
      user: {
        describe: 'Nombre de usuario',
        demandOption: true,
        type: 'string',
      },
      title: {
        describe: 'Título de la nota',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.user === 'string' && typeof argv.title === 'string') {
        const managerNote = new ManagerNote(argv.user);
        managerNote.removeNote(argv.title);
      } else {
        console.log(chalk.red('Argumentos no válidos'));
      }
    },
});

/**
 * Yargs de List Notes
 */
yargs.command({
  command: 'list',
  describe: 'List Notes of a User',
  builder: {
    user: {
      describe: 'User Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if(typeof argv.user === 'string') {
      const managerNote = new ManagerNote(argv.user);
      managerNote.listNotes() 
    } else {
      console.log(chalk.red('Argumentos no válidos'))
    }
  }
})

/**
 * Yargs Read Notes
 */
yargs.command({
  command: 'read',
  describe: 'Read Notes of a User',
  builder: {
    user: {
      describe: 'User Name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Título de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if(typeof argv.user === 'string' && typeof argv.title === 'string') {
      const managerNote = new ManagerNote(argv.user);
      managerNote.readNotes(argv.title) 
    } else {
      console.log(chalk.red('Argumentos no válidos'))
    }
  }
})

yargs.parse()