import 'mocha'
import { expect } from 'chai'
import { Note } from '../src/note'
import { ManagerNote } from '../src/managerNote'
import * as fs from 'fs'

const note1 = new Note('Nota1', 'Esto es el cuerpo de la nota 1', 'Rojo')
const note2 = new Note('Nota2', 'Esto es el cuerpo de la nota 2', 'Verde')
const note3 = new Note('Nota3', 'Esto es el cuerpo de la nota 3', 'Azul')
const note4 = new Note('Nota4', 'Esto es el cuerpo de la nota 4', 'Amarillo')

const userNote = new ManagerNote('User1')
const userWithoutNote = new ManagerNote('usuario1')
const userError = new ManagerNote('usuario3')

describe('Tests from ManagerNote class', () => {
    it('Se espera que userNote sea un objeto de la clase ManagerNote', () => {
        expect(userNote).instanceOf(ManagerNote)
    })
    it('Se obtiene un usuario de la clase ManagerNote', () => {
        expect(userNote.getUser()).to.be.eq('User1')
    })
    it('Existe el método addNote', () => {
        expect(userNote.addNote(note1))
        expect(userNote.addNote(note1))
        expect(userNote.addNote(note2))
        expect(userNote.addNote(note3))
        expect(userNote.addNote(note4))
    })
    it('Existe el método editNote', () => {
        expect(userNote.editNote('Nota1', 'Nota1 Editada', 'Cambiando el cuerpo de la nota', 'Rojo'))
        expect(userWithoutNote.editNote('Nota1', 'Nota1 Editada', 'Cambiando el cuerpo de la nota', 'Azul'))
    })
    it('Existe el método removeNote', () => {
        expect(userNote.removeNote('Nota1'))
        expect(userNote.removeNote('Nota1 Editada'))
        expect(userWithoutNote.removeNote('Nota1 Editada'))
    })
    it('Existe el método listNotes', () => {
        userNote.addNote(note1)
        expect(userNote.listNotes())
        expect(userWithoutNote.listNotes())
        expect(userError.listNotes())
    })
    it('Existe el método readNotes', () => {
        userNote.addNote(note1)
        expect(userNote.readNotes('Nota1'))
        expect(userNote.readNotes('Nota1 Editada'))
        expect(userNote.readNotes('Nota2'))
        expect(userNote.readNotes('Nota3'))
        expect(userNote.readNotes('Nota4'))
        expect(userWithoutNote.readNotes(''))
        expect(userError.readNotes(''))
    })
})

fs.rmSync('/home/usuario/prct09/src/database/User1', { recursive: true, force: true });