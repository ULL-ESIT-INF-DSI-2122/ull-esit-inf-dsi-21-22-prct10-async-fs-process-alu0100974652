import * as fs from 'fs';
import * as chalk from 'chalk'
import {spawn} from 'child_process';

/**
 * clase GrepCommand con el comando grep y cat
 */
export class GrepCommand {
  /**
   * 
   * @param filename nombre del archivo
   * @param word palabra a encontrar
   */
  constructor(private filename:string , private word: string){}
  /**
   * Método pipe con tuberia
   */
  pipe(){
    if (fs.existsSync(this.filename)){
      const cat = spawn('cat', [this.filename]);
      const grep = spawn('grep', ['-c', this.word]);
      cat.stdout.pipe(grep.stdin);
      let grepOutput = '';
      grep.stdout.on('data', (piece) => {
        grepOutput += piece;
      });
      grep.on('close', () => {
        const x: number = +grepOutput
        if(x > 0) {
          console.log(chalk.green(`${this.word} esta en ${x} lineas del fichero`));
        } else {
          console.log(chalk.red(`La palabra ${this.word} no se encuentra en el fichero`));
        }
      });
    } else {
      console.log(chalk.red('El fichero no existe'))
    }
  }
  /**
   * Método nopipe sin tubería
   */
  nopipe(){
    if (fs.existsSync(this.filename)){
      const cat = spawn('cat', [this.filename]);
      const grep = spawn('grep', ['-c', this.word]);
      cat.stdout.on("data", (data) => {
        grep.stdin.write(data);
      });
      cat.on("close", () => {
        grep.stdin.end();
      });
      let grepOutput = '';
      grep.stdout.on('data', (piece) => {
        grepOutput += piece;
      });
      grep.on('close', () => {
        const x: number = +grepOutput
        if(x > 0){
          console.log(chalk.green(`${this.word} esta en ${x} lineas del fichero`));
        } else {
          console.log(chalk.red(`La palabra ${this.word} no se encuentra en el fichero`));
        }
      });
    } else {
      console.log(chalk.red('El fichero no existe'));
    }
  }
}