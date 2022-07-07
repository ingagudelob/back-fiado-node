### RestServer -

## Crear un servido con Express basado en clases y Variables de estado

1. Instalamos npm i express
2. Instalamos npm i dotenv
3. Servidor con express basado en clases
   a. Creamos carpeta: models
   b. Creamos archivo de clase server.js
   c. Cremos rutas, nuevo metodo en archivo server.js
   d. Crear metodo como listener del puerto del server.
   e. creo una instania del servidor en app.js
   e. Llamo al listen del Server.
4. Creacion de la carpeta publica y archivo index.html
   a. En el Server los middlewares. 1er. .use
5. Crar los RestPonit (Get, Put, Posto, Delete) - Peticiones http
6. instalasr npm i cors: Sirve para a q la API solo ciertas paginas web puedan acceder (Portección del servidor)
7. Utilizamos cors ( ver documentación)
8. Separamos Rutas y el controlador de clases.
   a. Creamos carpeta routes
   b. creamos archivo js de acuerdo a ls rutas ej: user.router
   c. en el server llamamos el router por medio de una solicitud condicional, con un path.
   d. Separamos el controlador de la ruta. Se crea un archivo controller y creamos las funciones y las exportamos.
