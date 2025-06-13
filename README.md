# registro-productos-jmedina

Sistema de registro de productos desarrollado con PHP, JavaScript, HTML y CSS sin frameworks. Validación completa de formulario y almacenamiento en base de datos.

## Tecnologías utilizadas

- HTML5 (estructura del formulario)
- CSS3 (estilos sin frameworks)
- JavaScript (validaciones y AJAX)
- PHP puro (procesamiento de datos)
- PostgreSQL (preferido, pero compatible con MySQL)

## Requisitos

- PHP 8.0 o superior
- PostgreSQL 13+ (o MySQL 8+ si adaptas la conexión)
- Servidor local (XAMPP, MAMP, WAMP o Apache/Nginx manual)
- Navegador moderno con soporte para JavaScript

## Instrucciones de instalación

1. Clona el repositorio:

   git clone git@github.com:Sonurborg/registro-productos-jmedina.git

2. Configura el archivo .env con tus credenciales de base de datos:

   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME= tu_basededatos
   DB_USER= tu_usuario
   DB_PASSWORD= tu_contraseña

3. Importa el archivo SQL incluido (database.sql) en tu base de datos PostgreSQL para crear las tablas y cargar datos de ejemplo.

4. Inicia tu servidor local (XAMPP, MAMP, etc.) y accede al proyecto desde tu navegador.
