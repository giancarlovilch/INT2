# QUERIES DB

```mysql
USE test02;

SELECT 
    p.id_postulante,
    p.num_documento AS DNI,
    CONCAT(p.nombres, ' ', p.apellidos) AS nombre_completo,
    g.descripcion AS genero,
    e.descripcion AS estado_proceso,
    t.nombre_turno AS turno_preferencia,
    s.descripcion AS habilidad,
    n.descripcion AS nivel_habilidad,
    exp.empresa,
    exp.cargo,
    exp.fecha_inicio,
    exp.fecha_fin
FROM 
    postulante p
LEFT JOIN genero g ON p.genero_id = g.id_genero
LEFT JOIN estado e ON p.estado_id = e.id_estado
LEFT JOIN turno t ON p.turno_id = t.id_turno
LEFT JOIN postulante_skill ps ON p.id_postulante = ps.postulante_id
LEFT JOIN skill s ON ps.skill_id = s.id_skill
LEFT JOIN nivel n ON ps.nivel_id = n.id_nivel
LEFT JOIN experiencia exp ON p.id_postulante = exp.postulante_id
ORDER BY p.id_postulante;

SELECT * FROM postulant;
```

1. 



```mysql
SELECT 
    p.nombres, 
    p.apellidos, 
    t.nombre_turno
FROM 
    postulante p
JOIN 
    turno t ON p.turno_id = t.id_turno
WHERE 
    t.nombre_turno = 'Mañana';

SELECT COUNT(*) AS total_postulantes_tarde
FROM postulante p
JOIN turno t ON p.turno_id = t.id_turno
WHERE t.nombre_turno = 'Mañana';

select
p.id_postulante,
p.nombres, 
p.apellidos,
t.nombre_turno,
p.turno_id 
from
postulante p 
join
turno t on t.id_turno = p.turno_id 
where
t.nombre_turno  = 'Mañana'

select * from nivel n
order by id_nivel asc; 
```



```mysql
select * from institucion i
order by i.id_institucion asc;
```











