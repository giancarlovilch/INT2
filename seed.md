# SEED DB

```mysql
SHOW DATABASES;
USE rrhh;
INSERT INTO `genero` (`descripcion`) VALUES ('Masculino'), ('Femenino'), ('Otro');
INSERT INTO `turno` (`nombre_turno`) VALUES ('Mañana'), ('Tarde');
INSERT INTO `estado` (`descripcion`) VALUES ('Pendiente'), ('Entrevista'), ('Aprobado'), ('Rechazado');
INSERT INTO `nivel` (`descripcion`) VALUES ('Básico'), ('Intermedio'), ('Avanzado');
INSERT INTO `skill` (`descripcion`) VALUES ('AgenteBCP'), ('Inyectables'), ('Excel'), ('Caja');
INSERT INTO `puesto` (`descripcion`) VALUES ('Técnica en Farmacia'), ('Caja'), ('Almacén'), ('Practicante'), ('Contabilidad'), ('Limpieza');

INSERT INTO `postulante` 
(`nombres`, `apellidos`, `genero_id`, `email`, `num_documento`, `turno_id`, `estado_id`, `fecha_registro`) 
VALUES 
('Carlos', 'Sánchez', 1, 'c.sanchez@email.com', '72345678', 1, 1, CURRENT_TIMESTAMP);

INSERT INTO `postulante_skill` (`postulante_id`, `skill_id`, `nivel_id`) VALUES (1, 1, 3);
INSERT INTO `postulante_skill` (`postulante_id`, `skill_id`, `nivel_id`) VALUES (2, 2, 2);

INSERT INTO `experiencia` (`postulante_id`, `empresa`, `cargo`, `fecha_inicio`, `fecha_fin`) 
VALUES (1, 'Constructora Lima SAC', 'Asistente de Campo', '2023-01-15', '2024-01-15');

INSERT INTO `experiencia` (`postulante_id`, `empresa`, `cargo`, `fecha_inicio`, `fecha_fin`) 
VALUES 
(1, 'Inversiones Farmacéuticas SAC', 'Asistente de Sistemas', '2021-02-01', '2022-01-15'),
(1, 'Constructora Graña y Montero', 'Auxiliar de Oficina Técnica', '2022-03-01', '2023-11-30'),
(1, 'Corporación de Boticas Perú', 'Analista de Base de Datos', '2024-02-01', NULL); 
-- El NULL en fecha_fin indica que es su trabajo actual.
```

## INGRESAR DATOS

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

## BORRAR DATOS 

```mysql
DELETE FROM `postulante` 
WHERE `id_postulante` BETWEEN 1 AND 10;

DELETE FROM `postulante` 
WHERE `id_postulante` BETWEEN 1 AND 10;

DELETE FROM `postulante` 
WHERE `id_postulante` >= 1 AND `id_postulante` <= 10;
```

## ACTUALIZAR DATOS

```mysql
update `estado`
set 
`id_estado`='1'
where 
`id_estado`='7';
```

