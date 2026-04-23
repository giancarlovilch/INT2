# Sistema de Control Financiero - SoloBoticas (INT2)

Este proyecto es una plataforma web centralizada diseñada para la gestión del flujo de caja y auditoría financiera de la cadena **Solo Boticas**. Está desarrollado en **PHP Nativo** siguiendo una arquitectura **MVC personalizada** para optimizar el rendimiento en entornos de hosting compartidos.

## Características Técnicas
- **Arquitectura:** MVC (Modelo-Vista-Controlador) manual sin frameworks pesados.
- **Backend:** PHP Nativo con soporte para variables de entorno.
- **Base de Datos:** MySQL con esquema de auditoría transaccional.
- **Frontend:** HTML5, CSS3 y JavaScript integrado mediante un Front Controller.
- **Herramientas de gestión:** Modelado en MySQL Workbench y DBeaver.

## Estructura del Proyecto
- `config/`: Configuración y conexión DB.
- `public/`: Archivos accesibles vía web (Assets e Index).
- `src/`: Lógica de negocio (Controllers, Models, Repositories).
- `tests/`: Pruebas de integración y conexión.

## Instalación Local
1. Clonar el repositorio: `git clone https://github.com/giancarlovilch/INT2.git`
2. Configurar el archivo `env.php` con las credenciales de tu base de datos local.
3. Ejecutar el servidor nativo de PHP:
   ```bash
   php -S localhost:8000 -t public