

# Documento de Especificación de Requerimientos de Software (ERS)

# Sistema de Gestión Integral para Boticas

## 1. Propósito del sistema

El sistema tendrá como finalidad centralizar y controlar de manera integrada los procesos de:

- reclutamiento y gestión de talento,
- seguridad y acceso al sistema,
- arqueo, cuadre y conciliación de caja,
- control de asistencia y estándares de presentación,
- evaluación de desempeño del personal,
- cálculo y control de sueldos mensuales.

El sistema deberá permitir trazabilidad, control operativo, control administrativo y generación de indicadores para la toma de decisiones.

---

## 2. Objetivos del sistema

### 2.1 Objetivo general

Implementar una plataforma que permita gestionar al personal y las operaciones críticas de caja de forma segura, auditable y medible.

### 2.2 Objetivos específicos

- Construir una base de datos estructurada de postulantes y trabajadores.
- Mantener control sobre el ingreso de información sensible.
- Registrar el flujo operativo de cada caja y cada turno.
- Medir asistencia, cumplimiento y rendimiento del personal.
- Calcular el sueldo mensual de manera objetiva, automatizada y sustentada.
- Permitir revisión histórica y auditoría de todas las operaciones relevantes.

---

## 3. Alcance funcional del sistema

El sistema comprenderá los siguientes módulos:

1. Gestión de Talento y Reclutamiento
2. Seguridad y Acceso
3. Arqueo y Cuadre de Caja
4. Control de Asistencia y Estándares de Imagen
5. Evaluación de Desempeño y Cálculo de Sueldos

---

## 4. Módulo de Gestión de Talento (Reclutamiento)

### 4.1 Objetivo del módulo

Permitir la captación, evaluación inicial y almacenamiento de postulantes para conformar una bolsa de talento activa y reutilizable.

### 4.2 Seguridad y acceso al formulario

El ingreso al formulario de postulación deberá estar controlado mediante una clave estatica que en cada local se podra obtener en este caso es "soloboticas", clave fija y unica.

### 4.3 Formulario de postulación

El formulario deberá recopilar datos personales, logísticos y laborales mínimos para el proceso de evaluación.

#### 4.3.1 Datos obligatorios

- DNI de 8 dígitos
- Nombres
- Apellidos
- Fecha de nacimiento
- Edad calculada
- Celular
- Dirección
- Distrito
- Referencia de ubicación

#### 4.3.2 Validaciones

- El DNI debe tener exactamente 8 dígitos.
- La edad debe ser mayor a 18 años.
- Los campos obligatorios no deben enviarse vacíos.
- No se debe permitir duplicidad de postulante por número de documento.

### 4.4 Disponibilidad del postulante

El sistema deberá registrar turnos disponibles del postulante.

#### Opciones mínimas

- 7:00 am – 3:00 pm
- 3:00 pm – 11:00 pm
- Rotativo

### 4.5 Perfil académico y técnico

El sistema deberá permitir registrar:

- grado o título,
- tipo de estudio,
- estado del estudio,
- institución,
- especialidades adicionales,
- habilidades.



### 4.6 Contactos de emergencia

Se deberán registrar obligatoriamente **dos contactos de emergencia**.

#### Cada contacto debe incluir:

- nombre completo,
- parentesco,
- teléfono.

#### Regla

- No se permitirá enviar la postulación si no se han registrado ambos contactos.

### 4.7 Gestión administrativa del postulante

El área administrativa deberá poder revisar, clasificar y dar seguimiento a cada postulante.

#### Funcionalidades

- Historial o timeline de eventos del postulante.
- Registro de observaciones del proceso.
- Scoring inicial de entrevista.
- Clasificación por estado.
- Búsqueda y filtro por elegibilidad.

#### Ejemplos de eventos

- “Entrevista realizada”
- “No se presentó”
- “Buen perfil comercial”
- “Apto para reemplazos”
- “Pendiente de documentos”

### 4.9 Bolsa activa de talento

El sistema deberá permitir filtrar postulantes elegibles para contrataciones o reemplazos rápidos.

#### Criterios sugeridos

- distrito,
- turnos disponibles,
- nivel de estudios,
- experiencia,
- scoring,
- estado de elegibilidad.

---

## 5. Módulo de Seguridad y Acceso

### 5.1 Objetivo del módulo

Gestionar usuarios, permisos y trazabilidad de acciones dentro del sistema.

### 5.2 Roles del sistema

Como mínimo deberán existir los siguientes roles:

- **ADMIN**
  - control total del sistema,
  - gestión de usuarios,
  - edición de datos críticos,
  - revisión y aprobación,
  - acceso a reportes.
- **STAFF**
  - acceso limitado según su función,
  - registro de información operativa,
  - sin permisos para alterar información crítica histórica.



#### 5.3 Reglas de acceso

- Cada usuario tendrá usuario y contraseña.
- El acceso debe estar vinculado a un trabajador/postulante registrado.
- No se debe permitir duplicidad de username.
- Debe existir un indicador de usuario activo/inactivo.

## 5.4 Auditoría

Toda modificación sobre información sensible deberá quedar registrada.

### Casos mínimos auditables

- edición de ventas externas,
- modificación de montos,
- anulaciones,
- rectificaciones,
- cambios de estado,
- revisión de sesiones,
- aprobación o rechazo de operaciones.

### Datos mínimos de auditoría

- usuario que realizó la acción,
- fecha y hora,
- campo modificado,
- valor anterior,
- valor nuevo,
- motivo u observación.



---

## 6. Módulo de Arqueo y Cuadre de Caja

### 6.1 Objetivo del módulo

Garantizar que el dinero físico, digital y declarado coincida con la operación real de cada caja y turno.

### 6.2 Estructura operativa del negocio

Cada local tendrá una o más cajas independientes y cada caja manejará su propio flujo por turno.

#### Configuración inicial indicada

- Local 2: 2 cajas
- Local 3: 3 cajas
- Local 4: 1 caja

Cada caja debe tener:

- identificación,
- local asociado,
- estado activo,
- historial de sesiones.



### 6.3 Apertura de sesión de caja

Cada turno deberá iniciar una sesión de caja independiente.

#### Datos mínimos de apertura

- caja,
- turno,
- trabajador responsable de apertura,
- fecha de operación,
- saldo inicial.

#### Reglas

- No debe existir más de una sesión para la misma caja, turno y fecha.
- La sesión inicia en estado abierta.
- El saldo inicial debe provenir del cierre real anterior o de una configuración autorizada.



### 6.4 Lógica de gastos

El sistema deberá registrar gastos que afectan el efectivo de la caja durante el turno.

#### Tipos de gastos

- gastos fijos,
- gastos generales,
- eventualidades.

#### Campos mínimos

- tipo de movimiento,
- descripción,
- monto,
- modo,
- número de operación,
- comprobante,
- responsable del registro,
- revisor.



### 6.5 Doble registro operativo

El cierre del turno se sustentará en dos fuentes distintas:

#### A. Registro del cajero

El cajero deberá declarar el arqueo físico y digital sin ver previamente el dato del vendedor.

#### B. Registro del vendedor

El vendedor deberá declarar el monto total de ventas del software externo de facturación.

### 6.6 Datos de cierre del cajero

El cajero registrará como mínimo:

- monto en monedas,
- billetes en caja,
- billetes en caja fuerte,
- monto Yape/Plin,
- monto Visa,
- monto BCP,
- observaciones de cierre.



### 6.7 Motor de conciliación

El sistema deberá calcular automáticamente:

#### 6.7.1 Arqueo esperado

Arqueo esperado = saldo real anterior + ventas del sistema externo

#### 6.7.2 Activos totales declarados

Activos declarados = efectivo + caja fuerte + saldos digitales + gastos registrados

#### 6.7.3 Diferencia de cierre

Diferencia = activos declarados – arqueo esperado

### 6.8 Resultado de conciliación

El sistema clasificará automáticamente el resultado:

- **Consistente**: diferencia igual a 0 o dentro del margen permitido.
- **Sobrante**: diferencia positiva.
- **Faltante**: diferencia negativa.

### 6.9 Reglas ante faltantes

- El sistema debe bloquear el cierre definitivo si corresponde a la política definida.
- Debe registrarse quién participó en la sesión.
- Aqui siempre el responsable sera la cajera, pero se debe adjuntar el nombre del vendedor, para marcarlo como co responsable. 



### 6.10 Continuidad del turno

El siguiente turno nunca debe iniciar con el monto esperado teórico, sino con el saldo real validado.

#### Regla

Saldo inicial siguiente turno = saldo real recibido del turno anterior

### 6.11 Transferencias entre cajas

El sistema deberá permitir registrar transferencias entre cajas con control de envío, recepción y revisión.



### 6.12 Pagos a personal desde caja

El sistema podrá registrar pagos efectuados desde caja hacia personal.



### 6.13 Rectificaciones

El sistema deberá permitir registrar rectificaciones posteriores con sustento y aprobación.

#### Ejemplos

- devolución de dinero,
- dinero encontrado,
- ajuste de conteo,
- compensación,
- otro.



---

## 7. Módulo de Control de Asistencia y Estándares de Imagen

### 7.1 Objetivo del módulo

Controlar asistencia diaria, puntualidad, cumplimiento de presentación personal e higiene del trabajador.

### 7.2 Registro de entrada y salida

Cada trabajador deberá registrar su asistencia diaria con sus credenciales.

#### Datos de identificación

- DNI
- contraseña personal

### 7.3 Lógica de marcado de asistencia

El sistema permitirá el registro de:

- hora de entrada,
- hora de salida,
- observaciones del día.

### Regla de edición

- Solo se podrá registrar o editar la asistencia del **día actual**.
- No se podrá modificar días anteriores ni posteriores por parte del trabajador.
- Las regularizaciones de días anteriores solo podrán ser realizadas por administrador, si la política lo permite.

## 7.4 Registro de puntualidad

El sistema deberá mostrar un campo de autodeclaración sobre tardanza.

### Ejemplo

- ¿Llegaste tarde? Sí / No

Además, el sistema podrá calcular automáticamente tardanza si existe un horario programado de referencia.

## 7.5 Checklist obligatorio de presentación e higiene

Antes de iniciar turno, el trabajador deberá completar una autodeclaración obligatoria.

### Ítems mínimos

- Chaqueta limpia y planchada.
- Uñas cortas y limpias.
- Cabello recogido / afeitado / aseo personal conforme corresponda.
- Sin síntomas gripales o heridas expuestas en manos.
- Confirmación de puntualidad o tardanza.

## 7.6 Regla de bloqueo

El trabajador no podrá completar el inicio operativo del turno si no ha completado el checklist obligatorio.

## 7.7 Supervisión administrativa

El administrador deberá contar con un panel diario de revisión.

### Funcionalidades

- ver lista de asistencia del día,
- ver checklist de cada trabajador,
- registrar observaciones,
- marcar incumplimientos detectados,
- dejar evidencia descriptiva.

## 7.8 Auditoría de verificación

Si un trabajador marca que cumple, pero el supervisor detecta incumplimiento real, se deberá registrar una observación de auditoría.

Este sera en una ventana de sanciones, la mentira tendra una sancion muy severa, asi que habra una ventana donde el administrador, pordra usar el id del trabajador y sancionarlo para que a fin de mes, figure en su reporte. 

---































