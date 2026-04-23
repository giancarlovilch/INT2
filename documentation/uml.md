# UML



---



```mermaid
erDiagram
    %% Tablas Existentes (HR)
    POSTULANTE ||--|| USUARIO : "tiene cuenta"
    POSTULANTE ||--o{ SESION_CAJA : "vendedora_id"
    USUARIO ||--o{ SESION_CAJA : "cajera_id (postulante_id)"
    
    %% Tablas de Infraestructura
    LOCAL ||--o{ CAJA : "tiene"
    LOCAL ||--o{ GASTO : "registra gastos de"
    CAJA ||--o{ SESION_CAJA : "abre"
    
    %% Tablas Financieras (Operación)
    SESION_CAJA ||--|| DETALLE_FISICO : "registra lo que hay"
    SESION_CAJA ||--|| DECLARACION_VENTA : "registra lo vendido"
    SESION_CAJA ||--o{ GASTO : "justifica salida de dinero"
    SESION_CAJA ||--|| CONCILIACION_DIARIA : "genera balance"

    POSTULANTE {
        int id_postulante PK
        varchar nombres
        varchar num_documento
    }

    LOCAL {
        int id_local PK
        varchar descripcion
    }

    SESION_CAJA {
        int id_sesion PK
        int caja_id FK
        int cajera_id FK "Apunta a id_postulante de Usuario"
        int vendedora_id FK "Apunta a id_postulante"
        decimal saldo_inicial_X
        timestamp fecha_cierre
    }

    CONCILIACION_DIARIA {
        int id_conciliacion PK
        int sesion_id FK
        decimal diferencia "Faltante (-) o Sobrante (+)"
        decimal saldo_proximo_dia
    }
```

```mermaid
classDiagram
    class Local {
        int id_local
        string nombre
    }
    class Caja {
        int id_caja
        int local_id
        string descripcion
    }
    class SesionCaja {
        int id_sesion
        int caja_id
        int cajera_id
        int vendedora_id
        datetime apertura
        datetime cierre
        decimal saldo_inicial_X
    }
    class Gasto {
        int id_gasto
        int sesion_id
        int local_id
        string motivo
        decimal monto
    }
    class DetalleFisico {
        int id_detalle
        int sesion_id
        decimal monto_bcp
        decimal monto_monedas
        decimal monto_efectivo
        decimal monto_caja_fuerte
    }
    class DeclaracionVenta {
        int id_declaracion
        int sesion_id
        decimal total_ventas_declarado
    }
    class Conciliacion {
        int id_conciliacion
        int sesion_id
        decimal total_real_Y
        decimal total_teorico
        decimal diferencia
        decimal saldo_siguiente_dia
    }

    Local "1" -- "*" Caja
    Caja "1" -- "*" SesionCaja
    SesionCaja "1" -- "*" Gasto
    SesionCaja "1" -- "1" DetalleFisico
    SesionCaja "1" -- "1" DeclaracionVenta
    SesionCaja "1" -- "1" Conciliacion
```



## Diagrama UML de capas

Cliente → Router → Controller → Service → Repository → DB

```mermaid
erDiagram
    POSTULANTE ||--o{ SESION_CAJA : "vendedora_en"
    USUARIO ||--o{ SESION_CAJA : "cajera_en"
    LOCAL ||--o{ CAJA : "tiene"
    CAJA ||--o{ SESION_CAJA : "registra"
    
    SESION_CAJA ||--|| DETALLE_FISICO : "contiene conteo de"
    SESION_CAJA ||--|| DECLARACION_VENTA : "compara con"
    SESION_CAJA ||--o{ GASTO : "incluye"
    SESION_CAJA ||--|| CONCILIACION_DIARIA : "genera resultado"

    LOCAL {
        int id_local PK
        varchar nombre
        varchar direccion
    }

    CAJA {
        int id_caja PK
        int local_id FK
        varchar descripcion
    }

    SESION_CAJA {
        int id_sesion PK
        int caja_id FK
        int cajera_id FK "Relación con Usuario"
        int vendedora_id FK "Relación con Postulante"
        decimal saldo_inicial_X
        timestamp fecha_apertura
        timestamp fecha_cierre
        boolean estado "Abierta/Cerrada"
    }

    DETALLE_FISICO {
        int id_detalle PK
        int sesion_id FK
        decimal monto_bcp
        decimal monto_yape_plin
        decimal monto_efectivo
        decimal monto_monedas
        decimal monto_caja_fuerte
        decimal total_fisico_Y "Suma de los anteriores"
    }

    DECLARACION_VENTA {
        int id_declaracion PK
        int sesion_id FK
        decimal ventas_sistema "Lo que dice el software"
        decimal ventas_manuales "Lo que declara la vendedora"
        decimal total_ventas_teorico
    }

    GASTO {
        int id_gasto PK
        int sesion_id FK
        int local_id FK
        varchar descripcion
        decimal monto
    }

    CONCILIACION_DIARIA {
        int id_conciliacion PK
        int sesion_id FK
        decimal total_real "X + Y - Gastos"
        decimal total_esperado "X + Ventas"
        decimal diferencia "Sobrante (+) o Faltante (-)"
        decimal saldo_proximo_dia "Monto que queda físicamente"
    }
```

---

## Diagrama de secuencia: envío de postulación

```mermaid
sequenceDiagram
autonumber
actor U as Usuario
participant F as Frontend
participant R as Router
participant C as PostulanteController
participant S as PostulanteService
participant PR as PostulanteRepository
participant PoR as PostulacionRepository
participant DB as MySQL

U->>F: Completa formulario y envía POST /postulaciones
F->>R: POST /postulaciones
R->>C: apply()
C->>C: getAllInput()
C->>S: apply(data)

S->>S: Validar campos requeridos y formatos
S->>PoR: findSubmittedApplicationByDocument(dni)
PoR->>DB: SELECT postulacion + postulante
DB-->>PoR: resultado
PoR-->>S: ya existe / no existe

alt Ya existe postulación enviada
  S-->>C: {success:false, status:409}
  C-->>F: Error 409
else No existe
  S->>S: Validar experiencias
  S->>PR: findByDocument(dni)
  PR->>DB: SELECT postulante
  DB-->>PR: resultado
  PR-->>S: postulante existente / null

  S->>DB: beginTransaction()

  alt No existe postulante
    S->>PR: create(data)
    PR->>DB: INSERT postulante
    DB-->>PR: id_postulante
    PR-->>S: postulante creado
  else Ya existe postulante
    S-->>S: reutiliza postulante existente
  end

  S->>PoR: create(postulacion)
  PoR->>DB: INSERT postulacion

  S->>PoR: createEstudio(data)
  PoR->>DB: INSERT estudios

  S->>PoR: createPreferencia(data)
  PoR->>DB: INSERT preferencias

  loop por cada experiencia
    S->>PoR: createExperiencia(data)
    PoR->>DB: INSERT experiencia
  end

  S->>DB: commit()
  S-->>C: {success:true, status:201}
  C-->>F: Created 201
end
```



## Diagrama de actividad: reglas de `apply()`

```mermaid
flowchart TD
    A[Inicio apply/data/] --> B[Validar campos obligatorios y formato]
    B -->|Error| X[Retornar 422]
    B --> C[Buscar postulación enviada por DNI]
    C -->|Existe| Y[Retornar 409]
    C --> D[Leer experiencias]
    D -->|No es arreglo| X2[Retornar 422]
    D --> E[Validar experiencias]
    E -->|Error| X3[Retornar 422]
    E --> F[Buscar postulante por DNI]
    F --> G{Existe postulante?}
    G -->|No| H[Validar DNI único y email único]
    H -->|Error| X4[Retornar 409]
    H --> I[Validar fecha_fin estudios >= fecha_inicio]
    G -->|Sí| I
    I -->|Error| X5[Retornar 422]
    I --> J[Begin Transaction]
    J --> K{Existe postulante?}
    K -->|No| L[Crear postulante]
    K -->|Sí| M[Reutilizar postulante]
    L --> N[Crear postulación]
    M --> N
    N --> O[Crear estudios]
    O --> P[Crear preferencias]
    P --> Q[Crear experiencias]
    Q --> R[Commit]
    R --> S[Retornar 201]
    N -->|Excepción| Z[Rollback y 500]
    O -->|Excepción| Z
    P -->|Excepción| Z
    Q -->|Excepción| Z
```

---

## Diagrama de secuencia: acceso por DNI

```mermaid
sequenceDiagram
autonumber
actor U as Usuario
participant F as Frontend
participant R as Router
participant C as PostulanteController
participant S as PostulanteService
participant PoR as PostulacionRepository
participant DB as MySQL

U->>F: Ingresa DNI
F->>R: POST /postulantes/check-dni
R->>C: checkDni()
C->>S: checkDni(data)
S->>PoR: findSubmittedApplicationByDocument(dni)
PoR->>DB: SELECT
DB-->>PoR: resultado
PoR-->>S: existe / no existe

alt No existe postulación enviada
  S-->>C: requires_birth_validation=false, next_step=new_application
  C-->>F: puede ir al formulario editable
else Existe postulación enviada
  S-->>C: requires_birth_validation=true, next_step=birth_validation
  C-->>F: pedir fecha de nacimiento
end

U->>F: Ingresa fecha de nacimiento
F->>R: POST /postulantes/validate-access
R->>C: validateAccess()
C->>S: validateAccess(data)
S->>PoR: findSubmittedApplicationByDocument(dni)
PoR->>DB: SELECT
DB-->>PoR: resultado

alt No existe postulación
  S-->>C: 404
  C-->>F: error
else Fecha no coincide
  S-->>C: 401
  C-->>F: acceso denegado
else Fecha coincide
  S-->>C: validated=true, mode=readonly
  C-->>F: permitir ver solicitud
end
```

## Diagrama UML de dominio / persistencia

```mermaid
classDiagram
direction TB

class Postulante {
  +id_postulante
  +nombres
  +apellidos
  +genero_id
  +fecha_nacimiento
  +email
  +telefono
  +situacion_vivienda_id
  +num_documento
  +cv_url
}

class Postulacion {
  +id_postulacion
  +postulante_id
  +puesto_id
  +fecha_postulacion
  +etapa_id
}

class Estudios {
  +postulante_id
  +tipo_id
  +institucion_id
  +estado_id
  +fecha_inicio
  +fecha_fin
}

class Preferencias {
  +turno_id
  +postulante_id
}

class Experiencia {
  +id_experiencia
  +postulante_id
  +empresa
  +cargo
  +fecha_inicio
  +fecha_fin
}

class Genero
class SituacionVivienda
class Institucion
class TipoEstudio
class Estado
class Turno
class Puesto
class Etapa

Postulante "1" --> "0..*" Postulacion
Postulante "1" --> "0..1" Estudios
Postulante "1" --> "0..1" Preferencias
Postulante "1" --> "0..*" Experiencia

Postulante --> Genero
Postulante --> SituacionVivienda
Estudios --> Institucion
Estudios --> TipoEstudio
Estudios --> Estado
Preferencias --> Turno
Postulacion --> Puesto
Postulacion --> Etapa
```

## Resumen simple

Si te lo explico en lenguaje directo, tu backend hoy funciona así:

1. **`index.php`** decide qué ruta llegó y la manda al controller correcto. 
2. **El controller** recibe la petición y se la delega al servicio. 
3. **El service** piensa: valida, decide, abre transacción y ordena qué se guarda. 
4. **Los repositories** ejecutan SQL con PDO.
5. **La base de datos** finalmente persiste todo.
6. Si algo falla, el servicio hace rollback y el controller devuelve el error HTTP adecuado.

---

## UML por paquetes del proyecto

```mermaid
classDiagram
direction LR

namespace public {
  class index_php {
    +bootstraps app
    +define routes
    +dispatch request
  }
}

namespace Core {
  class Router {
    +get()
    +post()
    +put()
    +delete()
    +dispatch()
  }

  class Controller {
    +getJsonInput()
    +getPostInput()
    +getQueryParams()
    +getAllInput()
    +success()
    +created()
    +error()
    +notFound()
    +validationError()
    +unauthorized()
    +forbidden()
  }

  class Database {
    +getConnection() PDO
  }
}

namespace Helpers {
  class Response {
    +success()
    +created()
    +error()
    +notFound()
    +validationError()
    +unauthorized()
    +forbidden()
  }

  class Validator {
    +required()
    +numeric()
    +exactLength()
    +email()
    +date()
    +max()
    +fails()
    +errors()
  }
}

namespace Controllers {
  class PostulanteController {
    -service: PostulanteService
    +index()
    +show()
    +store()
    +update()
    +destroy()
    +checkDni()
    +validateAccess()
    +apply()
    +getApplicationView()
    +accessView()
    +formView()
  }

  class CatalogoController {
    -service: CatalogoService
    +getAll()
  }
}

namespace Services {
  class PostulanteService {
    -repository: PostulanteRepository
    -postulacionRepository: PostulacionRepository
    +getAll()
    +getById()
    +create()
    +update()
    +delete()
    +checkDni()
    +validateAccess()
    +getApplicationView()
    +apply()
    -validateUniqueDocument()
    -validateUniqueEmail()
    -validateExperiencias()
  }

  class CatalogoService {
    -repository: CatalogoRepository
    +getAll()
  }
}

namespace Repositories {
  class PostulanteRepository {
    +findAll()
    +findById()
    +findByDocument()
    +findByEmail()
    +create()
    +update()
    +delete()
  }

  class PostulacionRepository {
    +findSubmittedApplicationByDocument()
    +findApplicationViewByDocument()
    +create()
    +createEstudio()
    +createPreferencia()
    +createExperiencia()
  }

  class CatalogoRepository {
    +getGeneros()
    +getSituacionesVivienda()
    +getInstituciones()
    +getTiposEstudio()
    +getEstados()
    +getTurnos()
    +getSkills()
    +getNiveles()
    +getPuestos()
  }
}

namespace Views {
  class acceso_php
  class formulario_php
}

namespace assets_js {
  class postulacion_acceso_js
  class postulacion_formulario_js
}

index_php --> Router : usa
Router --> PostulanteController : enruta
Router --> CatalogoController : enruta

PostulanteController --|> Controller
CatalogoController --|> Controller

Controller --> Response : delega respuestas
PostulanteController --> PostulanteService
CatalogoController --> CatalogoService

PostulanteService --> Validator
PostulanteService --> PostulanteRepository
PostulanteService --> PostulacionRepository
CatalogoService --> CatalogoRepository

PostulanteRepository --> Database
PostulacionRepository --> Database
CatalogoRepository --> Database

postulacion_acceso_js --> acceso_php
postulacion_formulario_js --> formulario_php
postulacion_acceso_js --> index_php : consume rutas
postulacion_formulario_js --> index_php : consume rutas
```

## `public`

Aquí vive el punto de entrada del sistema: `index.php`.
Ese archivo registra rutas y llama al router para despachar cada request. Eso se ve en tu estructura actual, donde `index.php` define endpoints como `/postulaciones`, `/catalogos/postulacion`, `/postulantes/check-dni` y similares. 

---

## `Core`

Es la base técnica del proyecto:

- `Router` decide qué controlador y método ejecutar. 
- `Controller` da utilidades comunes para leer input y responder JSON. 
- `Database` crea y reutiliza la conexión PDO. 

Este paquete no sabe nada de “postulaciones”; solo da infraestructura.

---

## `Helpers`

Aquí están las herramientas auxiliares:

- `Response` centraliza el formato de respuesta HTTP.
- `Validator` centraliza reglas como required, date, numeric, max, etc., y es usado fuerte por `PostulanteService`. 

---

## `Controllers`

Son la capa de entrada del backend:

- `PostulanteController` recibe la request, llama al service y convierte el resultado en respuesta HTTP. 
- `CatalogoController` hace lo mismo, pero para catálogos. 

Importante: el controller no mete SQL ni reglas grandes. Eso está bien.

---

## `Services`

Es la capa de negocio:

- `PostulanteService` contiene la lógica real del sistema: validaciones, reglas de negocio, flujo de acceso, creación de postulación, transacción y rollback. 
- `CatalogoService` es más simple: solo arma y devuelve los catálogos. 

---

## `Repositories`

Es la capa que habla con la BD:

- `PostulanteRepository` opera sobre `postulante`. 
- `PostulacionRepository` opera sobre `postulacion`, `estudios`, `preferencias` y `experiencia`. 
- `CatalogoRepository` lee las tablas catálogo. 

---

## `Views` y `assets_js`

Aunque estamos hablando de backend, tu sistema tiene una parte híbrida:

- `acceso.php` y `formulario.php` son vistas simples.
- `postulacion-acceso.js` y `postulacion-formulario.js` consumen los endpoints del backend.

O sea, tu frontend no está separado como SPA independiente; está acoplado de forma ligera al backend PHP.

---

## Mini mapa mental del proyecto

PUBLIC
└── index.php

CORE
├── Router
├── Controller
└── Database

HELPERS
├── Response
└── Validator

CONTROLLERS
├── PostulanteController
└── CatalogoController

SERVICES
├── PostulanteService
└── CatalogoService

REPOSITORIES
├── PostulanteRepository
├── PostulacionRepository
└── CatalogoRepository

VIEWS
├── acceso.php
└── formulario.php

ASSETS/JS
├── postulacion-acceso.js
└── postulacion-formulario.js

---

index.php
   ↓
Router
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Database / MySQL

---