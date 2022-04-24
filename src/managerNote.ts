import { Note } from "./note";
import * as chalk from 'chalk';
import * as fs from 'fs';

export class ManagerNote {
    /**
     * Constructor
     * @param user usuario que implementará los métodos
     */
    constructor(private user: string) {}
    /**
     * GetterUser
     * @returns devuelve el usuario
     */
    getUser() {
        return this.user
    }    
    /**
     * Agrega un nueva nota al directorio de notas del usuario
     * @param addNoteToUser nota a agregar
     */
    addNote(addNoteToUser: Note) {
        const rute: string = './src/database/' + this.user
        const fileRute: string =  './src/database/' + this.user + '/' + addNoteToUser.getTitle() + '.json'
        if(fs.existsSync(rute)) {
            console.log(chalk.green(`Bienvenido ${this.user}`))
            if(fs.existsSync(fileRute)) {
                console.log(chalk.red(`Lo sentimos ${this.user}, el titulo de la nota: ${addNoteToUser.getTitle()} no esta disponible, intentelo con otro titulo`))
            } else {
                fs.writeFileSync(fileRute, `{\n\t"title": "${addNoteToUser.getTitle()}",\n\t"body": "${addNoteToUser.getBody()}",\n\t"color": "${addNoteToUser.getColor()}"\n}`)
                console.log(chalk.green('New note added!'))
            }
        } else {
            console.log(chalk.green(`Creando la estructura personal para el usuario: ${this.user} para gestionar sus notas `))
            fs.mkdirSync(rute)
            fs.writeFileSync(fileRute, `{\n\t"title": "${addNoteToUser.getTitle()}",\n\t"body": "${addNoteToUser.getBody()}",\n\t"color": "${addNoteToUser.getColor()}"\n}`)
            console.log(chalk.green('New note added!'))
        }
    }
    /**
     * Edita una nota con sus nuevos parámetros
     * @param title titulo antiguo de la nota
     * @param newtitle nuevo titulo de la nota
     * @param newBody nuevo cuerpo de la nota
     * @param newColor nuevo color de la nota
     */
    editNote(title: string, newtitle: string, newBody: string, newColor: string) {
        const fileRute: string = './src/database/' + this.user + '/' + title + '.json'
        if(fs.existsSync(fileRute)) {
            fs.writeFileSync(fileRute, `{\n\t"title": "${newtitle}",\n\t"body": "${newBody}",\n\t"color": "${newColor}"\n}`)
            console.log(chalk.green(`Note ${title} edited`))
        } else {
            console.log(chalk.red(`La nota ${title} no existe en el directorio personal del ${this.user}`))
        }
    }
    /**
     * Elimina una nota del directorio del usuario a través del titulo
     * @param title titulo de la nota
     */
    removeNote(title: string) {
        const fileRute: string = './src/database/' + this.user + '/' + title + '.json';
        if(fs.existsSync(fileRute)) {
            fs.rmSync(fileRute)
            console.log(chalk.green('Note removed!'))
        } else {
            console.log(chalk.red('No se ha encontrado la nota, intentelo con otro titulo'))            
        }
    }
    /**
     * Lista las notas del directorio del usuario
     */
    listNotes() {
        const rute: string = './src/database/' + this.user
        if(fs.existsSync(rute)) {
            const notesA: string[] = []
            fs.readdirSync(rute).forEach((notes) => {
                notesA.push(notes)
            })
            if(notesA.length == 0) {
                console.log(chalk.red("El usuario no tiene notas"))
            } else {
                notesA.forEach((note) => {
                    fs.readFile(`./src/database/${this.user}/${note}`, (err, data) => {
                        if(err) {
                            console.log(chalk.red('Read error'))
                        } else {
                            const notesJson = JSON.parse(data.toString())
                            switch(notesJson.color) {
                                case 'Rojo':
                                    console.log(chalk.red(notesJson.title))
                                    break;
                                case 'Verde':
                                    console.log(chalk.green(notesJson.title))
                                    break;
                                case 'Azul':
                                    console.log(chalk.blue(notesJson.title))
                                    break;
                                case 'Amarillo':
                                    console.log(chalk.yellow(notesJson.title))
                                    break;
                            }
                        }
                    })
                })
            }
        }
    }
    /**
     * Lee la nota del usuario a través del titulo y lo imprime por consola
     * @param titleRead titulo de la nota
     */
    readNotes(titleRead: string) {
        const fileRute: string = './src/database/' + this.user + '/' + titleRead + '.json'
        if(fs.existsSync(fileRute)) {
            fs.readFile(fileRute, (err, data) => {
                if(err) {
                    console.log(chalk.red('Read Error'))
                } else {
                    const notesJson = JSON.parse(data.toString())
                    switch(notesJson.color) {
                        case 'Rojo':
                            console.log(chalk.red(`${notesJson.title}\n${notesJson.body}`))
                            break;
                        case 'Verde':
                            console.log(chalk.green(`${notesJson.title}\n${notesJson.body}`))
                            break;
                        case 'Azul':
                            console.log(chalk.blue(`${notesJson.title}\n${notesJson.body}`))
                            break;
                        case 'Amarillo':
                            console.log(chalk.yellow(`${notesJson.title}\n${notesJson.body}`))
                            break;
                    }
                    
                }
            })
        } else {
            console.log(chalk.red('La nota no existe, intentelo con otro titulo'))
        }
    }
}