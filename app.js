const notes = require('./notes.js')
const yargs = require('yargs')


//Adding add note command to help
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title : {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of the title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { notes.addNotes(argv.title, argv.body) }
})

//Adding remove note command to help
yargs.command({
    command: 'remove',
    describe: 'Remove an existing note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {notes.removeNote(argv.title) }
})

//Adding list command to help
yargs.command({
    command: 'list',
    describe: 'List of the notes',
    handler() { notes.listNotes() }
})

//Adding read command to help
yargs.command({
    command: 'read',
    describe: 'Read the note',
    builder:{
        title:{
            describe:'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { notes.readNote(argv.title) }
})

yargs.parse()