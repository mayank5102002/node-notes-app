const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    const notes = loadNotes()

    console.log(chalk.yellow.inverse.bold('Your notes :'))

    notes.forEach(element => console.log(chalk.blue.italic.inverse(element.title)))
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse.yellow.bold('Your notes :'))
    console.log()

    notes.forEach(element => {
        console.log(chalk.inverse.bold(element.title))
        console.log(element.body)
        console.log()
    })
}

const addNotes = (title, data) => {
    const notes = loadNotes()

    const duplicate = notes.find((note) => note.title == title)

    if (!duplicate) {
        notes.push({
            title: title,
            body: data
        })
        saveNotes(notes)
        console.log(chalk.inverse.bold.green('New note added'))
    } else {
        console.log(chalk.red.inverse.bold('Note with same title already exists'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    //Way to delete the note using filter method by keeping the notes which are not to be deleted
    // const notesToKeep = notes.filter((note) => note.title != title )
    // saveNotes(notesToKeep)

    var removed = false
    //Alternative way to delete the note using for loop
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].title == title) {
            notes.splice(i, 1)
            removed = true
            break
        }
    }

    if (removed) {
        console.log(chalk.inverse.bold.green('Note removed!'))
        saveNotes(notes)
    } else {
        console.log(chalk.inverse.bold.red('No note removed!'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()

    const note = notes.find((note) => note.title == title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const notesString = dataBuffer.toString()
        return JSON.parse(notesString)
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const data = JSON.stringify(notes)
    fs.writeFileSync('notes.json', data)
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}