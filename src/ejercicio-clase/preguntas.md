# ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0100974652

1. Implemente un programa que observe un fichero en formato CSV. El fichero puede tener varias líneas de valores separados por comas. Por ejemplo:
Eduardo,Segredo,Gonzalez
Alejandro,Marrero,Díaz
Luis,García,Forte
2. Pruebe a ejecutar el comando cut desde una terminal de la siguiente manera, para comprender su funcionamiento. Ej: cut -d ',' -f 1. ¿Qué muestra el comando por la consola? 
Eduardo
Alejandro
Luis
¿Qué sucede si utilizamos el valor 3 para la opción -f? 
Gonzalez
Díaz
Forte
¿Y si usamos el valor 4? En blanco
¿Qué permite indicar la opción -d? Indica el delimitador
3. Haga que su programa ejecute el comando cut con cada cambio del fichero CSV observado para que introduzca en un array los valores obtenidos al cortar (cut) el fichero CSV por alguno de sus campos. Un ejemplo sería obtener el siguiente array, si se especifica que queremos cortar el fichero CSV por el campo número 2: ['Segredo', 'Marrero', 'García']. El número de campo por el que cortar, así como el nombre del fichero CSV, deben ser argumentos pasados al programa desde la línea de comandos.
4. ¿Qué sucede si el fichero pasado desde la línea de comandos al programa anterior no existe? Modifique el programa para gestionar esta posible situación.
Nos saldría un error como el siguiente:
error: Command failed: cut -d ',' -f1 src/database/ejercicio1.csv
cut: src/database/ejercicio1.csv: No such file or directory
Solución: importamos el modulo fs para la gestión de ficheros
if(fs.existsSync(fileRute)) {
    //realiza programa
} else {
    //mensaje de error
}

5. ¿Qué sucede si el número de campo pasado desde la línea de comandos es un campo no válido teniendo en cuenta el número de campos existente en el fichero CSV? Imprimiría caraceres en blanco
6. ¿Qué sucede si el fichero observado se elimina? Modifique el programa para gestionar esta posible situación.
