# Práctica 10 - Sistema de ficheros y creación de procesos en Node.js
## _Desarrollo de Sistemas Informáticos_

[![Build](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0100974652/actions/workflows/build.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0100974652/actions/workflows/build.yml)

[![Node.js CI](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0100974652/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0100974652/actions/workflows/node.js.yml)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0100974652/actions/workflows/tests.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0100974652/actions/workflows/tests.js.yml)


En esta práctica se plantean una serie de ejercicios o retos a resolver haciendo uso de las APIs proporcionadas por Node.js para interactuar con el sistema de ficheros, así como para crear procesos.

Todo el código desarrollado deberá estar alojado en el repositorio generado tras la aceptación de la asignación de GitHub Classroom. En ese sentido, utilice en dicho repositorio una estructura de proyecto similar a la que hemos visto en clase.

Por último, tendrá que comentar en un informe la solución diseñada para cada ejercicio.
## Ejercicio 1
Se nos pide crear una traza del siguiente código:
```typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```
**_Contenido de la pila de llamadas:_**
```typescript
1.

if (process.argv.length !== 3) {
 console.log('Please, specify a file');
}

2.

const filename = process.argv[2];
access(filename, constants.F_OK, (err) => {});
3.

if (err) {
   console.log(`File ${filename} does not exist`);
 } else {
   console.log(`Starting to watch file ${filename}`);
 }
   const watcher = watch(process.argv[2]);
}
4.

watcher.on('change', () => {
  console.log(`File ${filename} has been modified somehow`);
}
5.
```
console.log(`File ${filename} is no longer watched`);
 **_Registro de eventos de la API:_**
 ```typescript
1.

(err) => {
 if (err) {
   console.log(`File ${filename} does not exist`);
 } else {
   console.log(`Starting to watch file ${filename}`);
 }
}
2.

const watcher = watch(process.argv[2]);
watcher.on('change', () => {
  console.log(`File ${filename} has been modified somehow`);
}
```
**_Cola de manejadores:_**
```typescript
1.

(err) => {
 if (err) {
   console.log(`File ${filename} does not exist`);
 } else {
   console.log(`Starting to watch file ${filename}`);
 }
}
2.

watcher.on('change', () => {
  console.log(`File ${filename} has been modified somehow`);
}
```
**_Contenido mostrado por consola:_**
```typescript
1.

Please, specify a file \


Starting to watch file helloWorld.txt \

File helloWorld.txt is no longer watched \

File helloWorld.txt has been modified somehow \

File helloWorld.txt is no longer watched \

File helloWorld.txt has been modified somehow \

File helloWorld.txt is no longer watched
```
- ¿Qué hace la función access? Determina si existe una ruta y qué permisos tiene un usuario para el archivo o directorio en esa ruta
- ¿Para qué sirve el objeto constants? Son los modos de permiso que están disponibles como propiedad en el objeto fs.
    - fs.constants.F_OK - Tiene permisos de lectura / escritura / ejecución (si no se proporciona ningún modo, este es el valor predeterminado)
    - fs.constants.R_OK - Tiene permisos de lectura
    - fs.constants.W_OK - Tiene permisos de escritura
    - fs.constants.X_OK - Tiene permisos de ejecución (Funciona igual que fs.constants.F_OK en Windows)
## Ejercicio 2 
Implemente un programa que devuelva el número de ocurrencias de una palabra en un fichero de texto. Para acceder al contenido del fichero deberá expandir el comando cat de Unix/Linux, además de expandir el comando grep con la salida proporcionada por cat como entrada para obtener las líneas en las que se encuentra la palabra buscada.

Para este ejercicio crearemos una clase llamada GrepCommand, que recibirá como parámetros el fichero y la palabra a entcontrar, que implementará las funciones tanto con tuberia como sin tuberia. Para ello, definiremos dos procesos, cat y grep, con el método spawn, y con la opción -c dentro del comando grep para contar las ocurrencias.
En el caso de la tuberia deberemos comunicar los dos procesos a través del canal de salida del cat.stdout con el canal de entrada de grep.stdin, alamacenamos el resultado dentro de una variable y comparamos la salida de grep.close al cerrar dicho canal. En caso de que la variable sea mayor de 0 querrá decir que existe la palabra dentro del fichero pasado como parámetro
```typescript
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
```
De la otra manera, para realizar el método sin la tubería, será de manera similar a la anterior, lo diferencial será en no poder usar el método pipe(), y conectando correctamente cada uno de los canales.
```typescript
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
```
En el programa main se añade la funcionalidad con yargs como la siguiente: 
```typescript
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
```
```bash
$node dist/ejercicio-2/main.js nopipe --file="/home/usuario/prct10/src/ejercicio-2/prueba.txt" --word="Hola"
```

```bash
[~/prct10(master)]$node dist/ejercicio-2/main.js nopipe --file="archivoNoExistente.txt" --word="Hola"
El fichero no existe
[~/prct10(master)]$node dist/ejercicio-2/main.js nopipe --file="/home/usuario/prct10/src/ejercicio-2/prueba.txt" --word="Hola"
Hola esta en 2 lineas del fichero
```