import * as fs from 'fs';
import {spawn} from 'child_process';
import * as child_process from 'child_process'

/**
 * @class ProgramGrep devuelve el numero de ocurrencias de un fichero
 */
class ProgramGrep {
    constructor(fileRute: string){}

    grepCommand(occurrence: string) {
        const grep = child_process.spawn('grep', [occurrence])
        let cutOutPut = '';
        grep.stdout.on('data', (piece) => cutOutPut += piece);
        
        grep.on('close', () => {
            const cutOutputAsArray = cutOutPut.split(`\n`);
            console.log(`En formato array: ${cutOutputAsArray}`);
        });
    }
}