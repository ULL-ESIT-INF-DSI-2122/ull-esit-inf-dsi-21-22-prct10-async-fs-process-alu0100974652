# Práctica 10 - Sistema de ficheros y creación de procesos en Node.js
## _Desarrollo de Sistemas Informáticos_

En esta práctica se plantean una serie de ejercicios o retos a resolver haciendo uso de las APIs proporcionadas por Node.js para interactuar con el sistema de ficheros, así como para crear procesos.

Todo el código desarrollado deberá estar alojado en el repositorio generado tras la aceptación de la asignación de GitHub Classroom. En ese sentido, utilice en dicho repositorio una estructura de proyecto similar a la que hemos visto en clase.

Por último, tendrá que comentar en un informe la solución diseñada para cada ejercicio.

## Ejercicio 2 

```bash
$node dist/ejercicio-2/main.js nopipe --file="/home/usuario/prct10/src/ejercicio-2/prueba.txt" --word="Hola"
```

```bash
[~/prct10(master)]$node dist/ejercicio-2/main.js nopipe --file="archivoNoExistente.txt" --word="Hola"
El fichero no existe
[~/prct10(master)]$node dist/ejercicio-2/main.js nopipe --file="/home/usuario/prct10/src/ejercicio-2/prueba.txt" --word="Hola"
Hola esta en 2 lineas del fichero
```