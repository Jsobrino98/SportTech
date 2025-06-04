# Proyecto Final - Gestión de Equipos Deportivos

## Descripción
Este sistema es una aplicación de gestión de equipos deportivos, jugadores, torneos. Permite realizar operaciones sobre las entidades como equipos, jugadores y torneos. Además, facilita la gestión de usuarios con roles de **administrador** y **usuario normal**, permitiendo realizar operaciones de autenticación y autorización en la plataforma.

## Funcionalidades
- **Gestión de equipos**: Registrar y administrar equipos deportivos, incluyendo su nombre, ciudad y escudo.
- **Gestión de jugadores**: Registrar jugadores, asociándolos a equipos y almacenando su información (nombre, edad, valor).
- **Gestión de torneos**: Crear y gestionar torneos deportivos, con su nombre, fechas de inicio y fin, y logo.
- **Gestión de balones de oro**: Registrar nuevos ganadores, asi como su edad, club y año en que ganó.
- **Gestión de usuarios**: Administrar usuarios con roles distintos (**ADMIN, NORMAL**), incluyendo registro, login y control de permisos.

## Tecnologías Utilizadas
### Backend:
- **Spring Boot (Java)**: Framework para la creación de la API RESTful.

### Base de Datos:
- **MySQL**: Sistema de gestión de bases de datos relacional.

### Documentación de API:
- **Swagger**: Herramienta integrada para la documentación automática y pruebas de los endpoints.

### Frontend:
- **Thymeleaf**: Motor de plantillas para la creación de vistas dinámicas e interacción con el usuario.

### Pruebas de API:
- **Postman**: Utilizado para diseñar y probar los endpoints de la API.

## Requisitos
Para ejecutar este proyecto localmente, necesitas tener instalados los siguientes programas:
    -Java JDK 17+
    -Node.js v18+
    -Angular CLI
    -MySQL 8.x (con base de datos sportech creada)

## Instalación
### Clonar el repositorio:
```
git clone https://https://github.com/Jsobrino98/SportTech
```

### Configuración de la base de datos:
Ejecutamos el script BBDD de la carpeta despliegue.

### Ejecutar el backend del proyecto:
Ejecutamos el archivo ``LanzarAplicacion``

### Ejecutar el frontend proyecto:
Nos colocamos en la carpeta del frontend, abrimos una consola y ejecutamos:

``
npm install

ng serve -o

``

## Acceder a la API
Una vez que el servidor esté en ejecución, podrás acceder a la API en:
- Frontend: http://localhost:4200
- Backend API: http://localhost:9090
- Documentación de la API en Swagger: [http://localhost:9090/swagger-ui.html](http://localhost:9090/swagger-ui.html)

## Endpoints Principales
| Método | Endpoint           | Descripción                   |
|---------|-------------------|---------------------------------|
| POST    | `/api/equipos`    | Crear un nuevo equipo          |
| GET     | `/api/equipos`    | Obtener todos los equipos      |
| POST    | `/api/jugadores`  | Crear un jugador               |
| GET     | `/api/jugadores`  | Obtener todos los jugadores    |
| POST    | `/api/torneos`    | Crear un torneo                |
| GET     | `/api/torneos`    | Obtener todos los torneos      |
| POST    | `/auth/login`     | Autenticación de usuario      |

## Contribución
Si deseas contribuir al proyecto, sigue estos pasos:
1. Haz un **fork** del repositorio.
2. Crea una nueva rama:
   ```
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```
   git commit -am 'Añadir nueva funcionalidad'
   ```
4. Empuja tu rama al repositorio:
   ```
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un **pull request**.

## Licencia
Este proyecto está bajo la licencia **MIT**. Para más detalles, consulta el archivo `LICENSE`.



