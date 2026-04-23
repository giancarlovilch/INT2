proyecto-rrhh/
├── config/                # Ajustes Globales
│   ├── config.php         # Credenciales y constantes de URL
│   └── Database.php       # Conexión Singleton con PDO
├── src/                   # EL CEREBRO (Clases PSR-4)
│   ├── Controllers/       # Orquestadores
│   │   ├── AuthController.php    # Login y Registro
│   │   ├── PublicController.php  # Portal de empleos
│   │   ├── AdminController.php   # Gestión (Solo Admins)
│   │   └── UserController.php    # Intranet (Empleados)
│   ├── Models/            # Entidades de la DB (Active Record)
│   │   ├── Postulante.php
│   │   ├── Usuario.php
│   │   └── Puesto.php
│   ├── Middleware/        # Guardianes de Seguridad
│   │   └── AuthMiddleware.php    # Filtra quién entra a qué ruta
│   └── Router.php         # El motor de navegación
├── views/                 # LA FACHADA (HTML + PHP)
│   ├── layouts/           # Partes Reutilizables
│   │   ├── header.php     # Meta tags y CSS
│   │   ├── navbar.php     # Menú Dinámico (Público/Empleado/Admin)
│   │   ├── footer.php     # Scripts y Copyright
│   │   └── main.php       # Plantilla Maestra (Contenedor)
│   ├── public/            # Vistas Portal Público (home, registro)
│   ├── intranet/          # Vistas Empleado (recursos, perfil)
│   └── admin/             # Vistas Administrador (gestión, reportes)
├── public/                # ÚNICO PUNTO DE ACCESO
│   ├── index.php          # Front Controller
│   ├── .htaccess          # Reescritura de URLs (Bonitas)
│   └── assets/            # CSS, JS, Imágenes, PDFs
└── .gitignore             # Para proteger config.php de GitHub

