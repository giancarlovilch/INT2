# Modular Database Design for Scalable Candidate Systems



## Overview

Reusable relational database model designed for managing candidate information, skills, and applications.
The architecture is database-centric and can be integrated into web, mobile, or desktop systems.

---



---

## Entity-Relationship Model

![eer](./.Images/eer-1774336105027-1.png)

## Estructura

### 1. RRHH / reclutamiento

Aquí entra todo lo de postulantes y su información:

- `postulante`
- `experiencia`
- `estudios`
- `institucion`
- `tipo_estudio`
- `estado`
- `postulacion`
- `etapa`
- `skill`
- `postulante_skill`
- `nivel`
- `situacion_vivienda`
- `preferencias`

Ese bloque es un mundo aparte. 

### 2. Seguridad / acceso

Lo que controla ingreso al sistema:

- `usuario`
- `rol`

Eso también forma otro grupo claro. 

### 3. Estructura de operación

Lo que define la empresa operativamente:

- `local`
- `caja`
- `turno`

Eso describe dónde y cómo funciona el negocio. 

### 4. Operación de caja y cuadre

Este ya es el núcleo fuerte del sistema:

- `sesion_caja`
- `movimiento_sesion`
- `detalle_cuadre`
- `sesion_participante`

Ahí está el cuadre diario/por turno. 

### 5. Incidencias y regularizaciones

Todo lo que corrige o explica diferencias:

- `rectificacion_cuadre`
- `tipo_movimiento`
- `modo`

Aunque `tipo_movimiento` y `modo` son catálogos, conceptualmente alimentan este bloque también. 

### 6. Flujos especiales de dinero

Movimientos que merecen tratamiento especial:

- `transferencia_caja`
- `pago_personal`

Porque no son solo movimientos comunes; tienen confirmación y revisión propia. 

### 7. Auditoría

- `auditoria_cuadre`

Eso ya es otro grupo transversal. 

---



### Fase 1. Base del framework propio

Haz bien estos archivos primero:

- `public/index.php`
- `src/Core/Router.php`
- `src/Core/Controller.php`
- `src/Core/Database.php`
- `src/Helpers/Response.php`
- `src/Helpers/Validator.php`

### Fase 2. Seguridad y auth

Luego:

- `Usuario.php`
- `AuthRepository.php`
- `AuthService.php`
- `AuthController.php`
- `AuthMiddleware.php`

### Fase 3. Módulo Postulante

Luego:

- `Postulante.php`
- `PostulanteRepository.php`
- `PostulanteService.php`
- `PostulanteController.php`

### Fase 4. Módulo Postulación

Luego:

- `Postulacion.php`
- `PostulacionRepository.php`
- `PostulacionService.php`
- `PostulacionController.php`

### Fase 5. Tests

Recién ahí:

- `tests unitarios de services`
- `tests de repositories`
- `tests de endpoints`



## POSTULANTE

![image-20260319170014102](./.Images/image-20260319170014102.png)

```mysql
INSERT INTO `postulante` 
(`id_postulante`, `nombres`, `apellidos`, `fecha_registro`) 
VALUES 
(1, 'Gian', 'Chavez', CURRENT_TIMESTAMP),
(2, 'Carlos', 'Sánchez', CURRENT_TIMESTAMP),
(3, 'Ana', 'Rojas', CURRENT_TIMESTAMP),
(4, 'Luis', 'Mendoza', CURRENT_TIMESTAMP),
(5, 'María', 'Fernández', CURRENT_TIMESTAMP),
(6, 'Roberto', 'García', CURRENT_TIMESTAMP),
(7, 'Lucía', 'Torres', CURRENT_TIMESTAMP),
(8, 'Ricardo', 'López', CURRENT_TIMESTAMP),
(9, 'Elena', 'Vargas', CURRENT_TIMESTAMP),
(10, 'Fernando', 'Castro', CURRENT_TIMESTAMP);
```

## NIVEL

![image-20260319002411582](./.Images/image-20260319002411582.png)

```mysql
INSERT INTO rrhh.nivel (descripcion) VALUES
	 ('Avanzado'),
	 ('Básico'),
	 ('Intermedio');

```

## SKILL

![image-20260319004804358](./.Images/image-20260319004804358.png)

```mysql
INSERT INTO rrhh.skill (descripcion) VALUES
	 ('AgenteBCP'),
	 ('BPA'),
	 ('BPD'),
	 ('BPOF'),
	 ('Caja'),
	 ('Excel'),
	 ('Inyectables');
```

## PUESTO

![image-20260319003759840](./.Images/image-20260319003759840.png)

```mysql
INSERT INTO rrhh.puesto (descripcion) VALUES
	 ('Técnica en Farmacia'),
	 ('Caja'),
	 ('Almacén'),
	 ('Practicante'),
	 ('Contabilidad'),
	 ('Limpieza'),
	 ('Administración');
```

## GENERO

![image-20260319003918181](./.Images/image-20260319003918181.png)

```mysql
INSERT INTO rrhh.genero (descripcion) VALUES
	 ('Femenino'),
	 ('Masculino'),
	 ('Otro');
```



## ETAPA

![image-20260319173233989](./.Images/image-20260319173233989.png)

```mysql
INSERT INTO rrhh.etapa (descripcion) VALUES
	 ('Contratado'),
	 ('Entrevista'),
	 ('Pendiente'),
	 ('Rechazado'),
	 ('Despedido'),;
```



## INSTITUCION

![image-20260319004418645](./.Images/image-20260319004418645.png)

```mysql
INSERT INTO rrhh.institucion (nombre) VALUES
	 ('Instituto Federico Villarreal'),
	 ('Instituto IDAT'),
	 ('Instituto Superior Arzobispo Loayza'),
	 ('Instituto Superior Daniel Alcides Carrión'),
	 ('Otros'),
	 ('Universidad María Auxiliadora'),
	 ('Universidad Nacional Mayor de San Marcos'),
	 ('Universidad Norbert Wiener'),
	 ('Universidad Privada del Norte'),
	 ('Universidad Tecnológica del Perú');

```

## TURNO

![image-20260319010256556](./.Images/image-20260319010256556.png)

```mysql
INSERT INTO rrhh.turno (nombre_turno) VALUES
	 ('Mañana'),
	 ('Tarde');
```

## ESTADO

![image-20260319171330458](./.Images/image-20260319171330458.png)

```mysql
INSERT INTO rrhh.estado (descripcion) VALUES
	 ('Egreso'),
	 ('En curso'),
	 ('Titulado'),
	 ('Trunco');
```

## TIPO DE ESTUDIOS

![image-20260319172704323](./.Images/image-20260319172704323.png)

```mysql
INSERT INTO rrhh.tipo_estudio (descripcion) VALUES
	 ('Técnico'),
	 ('Universitario'),
	 ('Colegiado');
```

## VIVIENDA

![image-20260319172334534](./.Images/image-20260319172334534.png)

```mysql
INSERT INTO rrhh.situacion_vivienda (descripcion) VALUES
	 ('Alquilada'),
	 ('Familiar'),
	 ('Propia');

```



---

# DB CODE

```mysql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema rrhh
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema rrhh
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `rrhh` DEFAULT CHARACTER SET utf8mb3 ;
USE `rrhh` ;

-- -----------------------------------------------------
-- Table `rrhh`.`etapa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rrhh`.`etapa` (
  `id_etapa` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_etapa`),
  UNIQUE INDEX `estados_postulacion_UNIQUE` (`descripcion` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `rrhh`.`genero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rrhh`.`genero` (
  `id_genero` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id_genero`),
  UNIQUE INDEX `descripcion_UNIQUE` (`descripcion` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `rrhh`.`institucion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rrhh`.`institucion` (
  `id_institucion` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id_institucion`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `rrhh`.`situacion_vivienda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rrhh`.`situacion_vivienda` (
  `id_situacion` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_situacion`),
  UNIQUE INDEX `descripcion_UNIQUE` (`descripcion` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `rrhh`.`postulante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rrhh`.`postulante` (
  `id_postulante` INT NOT NULL AUTO_INCREMENT,
  `nombres` VARCHAR(100) NOT NULL,
  `apellidos` VARCHAR(100) NOT NULL,
  `genero_id` INT NULL DEFAULT NULL,
  `fecha_nacimiento` DATE NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `telefono` VARCHAR(15) NULL DEFAULT NULL,
  `institucion_id` INT NULL DEFAULT NULL,
  `situacion_vivienda_id` INT NULL DEFAULT NULL,
  `num_documento` VARCHAR(8) NULL DEFAULT NULL,
  `fecha_registro` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `cv_url` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id_postulante`),
  INDEX `genero_id_idx` (`genero_id` ASC) VISIBLE,
  INDEX `institucion_id_idx` (`institucion_id` ASC) VISIBLE,
  INDEX `situacion_vivienda_id_idx` (`situacion_vivienda_id` ASC) VISIBLE,
  UNIQUE INDEX `num_documento_UNIQUE` (`num_documento` ASC) VISIBLE,
  CONSTRAINT `fk_postulante_genero`
    FOREIGN KEY (`genero_id`)
    REFERENCES `rrhh`.`genero` (`id_genero`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_postulante_institucion`
    FOREIGN KEY (`institucion_id`)
    REFERENCES `rrhh`.`institucion` (`id_institucion`),
  CONSTRAINT `fk_postulante_situacion_vivienda`
    FOREIGN KEY (`situacion_vivienda_id`)
    REFERENCES `rrhh`.`situacion_vivienda` (`id_situacion`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `rrhh`.`experiencia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rrhh`.`experiencia` (
  `id_experiencia` INT NOT NULL AUTO_INCREMENT,
  `postulante_id` INT NULL DEFAULT NULL,
  `empresa` VARCHAR(150) NULL DEFAULT NULL,
  `cargo` VARCHAR(100) NULL DEFAULT NULL,
  `fecha_inicio` DATE NULL DEFAULT NULL,
  `fecha_fin` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id_experiencia`),
  INDEX `postulante_id_idx` (`postulante_id` ASC) VISIBLE,
  CONSTRAINT `fk_experiencia_postulante`
    FOREIGN KEY (`postulante_id`)
    REFERENCES `rrhh`.`postulante` (`id_postulante`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `rrhh`.`nivel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rrhh`.`nivel` (
  `id_nivel` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_nivel`),
  UNIQUE INDEX `descripcion_UNIQUE` (`descripcion` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `rrhh`.`skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rrhh`.`skill` (
  `id_skill` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_skill`),
  UNIQUE INDEX `descripcion_UNIQUE` (`descripcion` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `rrhh`.`postulante_skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rrhh`.`postulante_skill` (
  `postulante_id` INT NOT NULL,
  `skill_id` INT NOT NULL,
  `nivel_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`postulante_id`, `skill_id`),
  INDEX `nivel_id_idx` (`nivel_id` ASC) VISIBLE,
  INDEX `id_postulante_idx` (`skill_id` ASC) VISIBLE,
  CONSTRAINT `fk_postulante_skill_skill`
    FOREIGN KEY (`skill_id`)
    REFERENCES `rrhh`.`skill` (`id_skill`),
  CONSTRAINT `fk_postulante_skill_postulante`
    FOREIGN KEY (`postulante_id`)
    REFERENCES `rrhh`.`postulante` (`id_postulante`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_postulante_skill_nivel`
    FOREIGN KEY (`nivel_id`)
    REFERENCES `rrhh`.`nivel` (`id_nivel`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `rrhh`.`puesto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rrhh`.`puesto` (
  `id_puesto` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_puesto`),
  UNIQUE INDEX `descripcion_UNIQUE` (`descripcion` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rrhh`.`postulacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rrhh`.`postulacion` (
  `id_postulacion` INT NOT NULL AUTO_INCREMENT,
  `postulante_id` INT NOT NULL,
  `puesto_id` INT NOT NULL,
  `fecha_postulacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `etapa_id` INT NULL,
  PRIMARY KEY (`id_postulacion`),
  INDEX `postulante_id_idx` (`postulante_id` ASC) VISIBLE,
  INDEX `puesto_id_idx` (`puesto_id` ASC) VISIBLE,
  INDEX `estado_id_idx` (`etapa_id` ASC) VISIBLE,
  UNIQUE INDEX `uq_postulante_puesto` (`postulante_id` ASC, `puesto_id` ASC) VISIBLE,
  CONSTRAINT `fk_postulacion_postulante`
    FOREIGN KEY (`postulante_id`)
    REFERENCES `rrhh`.`postulante` (`id_postulante`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_postulacion_puesto`
    FOREIGN KEY (`puesto_id`)
    REFERENCES `rrhh`.`puesto` (`id_puesto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_postulacion_etapa`
    FOREIGN KEY (`etapa_id`)
    REFERENCES `rrhh`.`etapa` (`id_etapa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `rrhh`.`tipo_estudio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rrhh`.`tipo_estudio` (
  `id_tipo` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_tipo`),
  UNIQUE INDEX `descripcion_UNIQUE` (`descripcion` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `rrhh`.`turno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rrhh`.`turno` (
  `id_turno` INT NOT NULL AUTO_INCREMENT,
  `nombre_turno` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id_turno`),
  UNIQUE INDEX `nombre_turno_UNIQUE` (`nombre_turno` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `rrhh`.`preferencias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rrhh`.`preferencias` (
  `turno_id` INT NOT NULL,
  `postulante_id` INT NOT NULL,
  PRIMARY KEY (`turno_id`, `postulante_id`),
  INDEX `fk_turno_has_postulante_postulante1_idx` (`postulante_id` ASC) VISIBLE,
  INDEX `fk_turno_has_postulante_turno1_idx` (`turno_id` ASC) VISIBLE,
  CONSTRAINT `fl_preferencia_turno`
    FOREIGN KEY (`turno_id`)
    REFERENCES `rrhh`.`turno` (`id_turno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_preferencia_postulante`
    FOREIGN KEY (`postulante_id`)
    REFERENCES `rrhh`.`postulante` (`id_postulante`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `rrhh`.`estado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rrhh`.`estado` (
  `id_estado` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_estado`),
  UNIQUE INDEX `descripcion_UNIQUE` (`descripcion` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rrhh`.`estudios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rrhh`.`estudios` (
  `postulante_id` INT NOT NULL,
  `tipo_id` INT NOT NULL,
  `estado_id` INT NOT NULL,
  PRIMARY KEY (`postulante_id`, `tipo_id`),
  INDEX `fk_estudios_postulante_idx` (`postulante_id` ASC) VISIBLE,
  INDEX `fk_estudios_tipo_idx` (`tipo_id` ASC) VISIBLE,
  INDEX `fk_estudios_estado_idx` (`estado_id` ASC) VISIBLE,
  CONSTRAINT `fk_estudios_postulante`
    FOREIGN KEY (`postulante_id`)
    REFERENCES `rrhh`.`postulante` (`id_postulante`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_estudios_tipo`
    FOREIGN KEY (`tipo_id`)
    REFERENCES `rrhh`.`tipo_estudio` (`id_tipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_estudios_estado`
    FOREIGN KEY (`estado_id`)
    REFERENCES `rrhh`.`estado` (`id_estado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

```

