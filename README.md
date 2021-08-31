# CLEVERPY TEST

Prueba técnica Front-End para Cleverpy.<br>
Tiempo de trabajo: 16 horas aprox.<br>
Handicaps: Aprender Typescript en el proceso.

<br>

## Instalación:

1. Descomprime el fichero zip.
2. Abre la carpeta dentro del fichero con tu editor favorito.
3. Ejecuta 'npm i' para installar las dependencias.
4. Ejecuta 'npm start' y espera a que se abra en tu explorador.

<br>

## Características

1. React-router-Dom 
2. SCSS y variables
3. NavBar
4. Animaciones
5. Paleta de colores
6. Flexbox
7. Responsive

<br>

## Funcionalidades

Para acceder a los posts hay que loguearse usando los credentials:
Email: admin@gmail.com 
password: admin

Es algo básico y sencillo sin ningún tipo de protección. Para montar una buena seguridad habría que montar un backend y hashear la clave ahí.

1. Visor de todos los pots

Pulsa el botón GET para obtener los posts de la API.

<img src="./src/assets/imgReadme/01.png" style="width: 100%; height: auto">

<br><br>

2. Filtro de posts por User ID

<img src="./src/assets/imgReadme/02.png" style="width: 100%; height: auto">

<br><br>

3. Filtro de posts por ID

<img src="./src/assets/imgReadme/04.png" style="width: 100%; height: auto">
<br><br>

4. Filtro de posts por TITLE

<img src="./src/assets/imgReadme/03.png" style="width: 100%; height: auto">

<br><br>

5. Edición de posts

<img src="./src/assets/imgReadme/05.png" style="width: 100%; height: auto">

<br><br>

6. Eliminación de posts:

Para eliminar un post sólo hay que pulsar en el botón DELETE del mismo post.<br>

A la hora de visualizar el borrado del post en pantalla habrá que darle a UPDATE en el menú. Podría hacerse de forma directa pero tal como está concebido el filtro de posts es mejor hacerlo así.<br>

<br><br>

7. REDUX

No he visto la necesidad de usar REDUX para lo que se estaba pidiendo. A priori no era la mejor opción como bien estaba especificado en el pdf. De todas maneras como ampliación de la prueba lo he intentado aplicar para el login y aunque en javascript suelo usar redux sin ningún problema, la implementación me ha dado muchos problemas seguramente por mi falta de experiencia con typescript.He terminado por desmontar todo el sistema de redux que había creado ya que me almacenaba la información pero luego no podía extraerla adecuadamente.
<br><br>
P.D. He dejado la carpeta redux y las dependencias instaladas pero no hago uso de ello.





