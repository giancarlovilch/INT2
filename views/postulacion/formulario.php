<?php
$basePath = defined('APP_BASE_PATH') ? APP_BASE_PATH : '';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Postulación | Solo Boticas</title>

    <link rel="stylesheet" href="<?= htmlspecialchars($basePath . '/assets/css/normalize.css', ENT_QUOTES, 'UTF-8') ?>">
    <link rel="stylesheet" href="<?= htmlspecialchars($basePath . '/assets/css/home.css', ENT_QUOTES, 'UTF-8') ?>">
    <link rel="stylesheet" href="<?= htmlspecialchars($basePath . '/assets/css/formulario.css', ENT_QUOTES, 'UTF-8') ?>">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Signika:wght@400;500;600;700&display=swap" rel="stylesheet">


</head>

<body>

    <?php require_once __DIR__ . '/../partials/navbar.php'; ?>

    <section class="form-hero">
        <div class="form-hero-overlay">
            <div class="contenedor form-hero-content">
                <p class="form-kicker">Reclutamiento</p>
                <h1>Formulario de postulación</h1>
                <p class="form-hero-text">
                    Completa tu información con cuidado para registrar correctamente tu solicitud
                    dentro del proceso de selección de Solo Boticas.
                </p>
            </div>
        </div>
    </section>

    <main class="form-main">
        <section class="contenedor form-layout">
            <div id="stageBanner" class="stage-banner" style="display: none;"></div>
            <div class="status-banner" id="statusBox" role="status" aria-live="polite"></div>
            <div class="form-intro-card">
                <div class="section-heading form-heading">
                    <p class="section-kicker">Antes de empezar</p>
                    <h2>Información importante</h2>
                    <p>
                        Asegúrate de ingresar tus datos correctamente. La información enviada será utilizada
                        para evaluar tu perfil dentro del proceso de selección.
                    </p>
                </div>

                <div class="info-grid">
                    <article class="info-mini-card">
                        <h3>Datos personales</h3>
                        <p>Verifica nombres, DNI, correo, teléfono y fecha de nacimiento.</p>
                    </article>

                    <article class="info-mini-card">
                        <h3>Estudios y experiencia</h3>
                        <p>Completa la información académica y laboral con fechas reales y consistentes.</p>
                    </article>

                    <article class="info-mini-card">
                        <h3>Habilidades y preferencias</h3>
                        <p>Selecciona tus habilidades y el puesto al que deseas postular.</p>
                    </article>
                </div>
            </div>

            <form id="postulacionForm" class="postulacion-form" novalidate>

                <section class="form-section">
                    <div class="form-section-header">
                        <p class="section-kicker">Sección 1</p>
                        <h2>Datos personales</h2>
                    </div>

                    <div class="form-grid form-grid-2">
                        <div class="input-group">
                            <label for="nombres">Nombres</label>
                            <input type="text" id="nombres" name="nombres">
                        </div>

                        <div class="input-group">
                            <label for="apellidos">Apellidos</label>
                            <input type="text" id="apellidos" name="apellidos">
                        </div>

                        <div class="input-group">
                            <label for="genero_id">Género</label>
                            <select id="genero_id" name="genero_id">
                                <option value="">Seleccione</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <label for="fecha_nacimiento">Fecha de nacimiento</label>
                            <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" max="<?= date('Y-m-d') ?>">
                        </div>

                        <div class="input-group">
                            <label for="email">Correo electrónico</label>
                            <input type="email" id="email" name="email">
                        </div>

                        <div class="input-group">
                            <label for="telefono">Teléfono</label>
                            <input type="text" id="telefono" name="telefono" inputmode="numeric">
                        </div>

                        <div class="input-group form-grid-full">
                            <label for="situacion_vivienda_id">Situación de vivienda</label>
                            <select id="situacion_vivienda_id" name="situacion_vivienda_id">
                                <option value="">Seleccione</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section class="form-section">
                    <div class="form-section-header with-action">
                        <div>
                            <p class="section-kicker">Sección 2</p>
                            <h2>Habilidades</h2>
                        </div>
                        <button type="button" id="addSkillBtn" class="btn-outline">Agregar habilidad</button>
                    </div>

                    <div id="skillsContainer" class="dynamic-stack">
                        <div class="skill-item dynamic-card">
                            <div class="form-grid form-grid-2">
                                <div class="input-group">
                                    <label>Habilidad</label>
                                    <select name="skill_id[]">
                                        <option value="">Seleccione</option>
                                    </select>
                                </div>

                                <div class="input-group">
                                    <label>Nivel</label>
                                    <select name="nivel_id[]">
                                        <option value="">Seleccione</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="form-section">
                    <div class="form-section-header">
                        <p class="section-kicker">Sección 3</p>
                        <h2>Estudios</h2>
                    </div>

                    <div class="form-grid form-grid-2">
                        <div class="input-group">
                            <label for="institucion_id">Institución</label>
                            <select id="institucion_id" name="institucion_id">
                                <option value="">Seleccione</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <label for="tipo_estudio_id">Tipo de estudio</label>
                            <select id="tipo_estudio_id" name="tipo_estudio_id">
                                <option value="">Seleccione</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <label for="estado_id">Estado</label>
                            <select id="estado_id" name="estado_id">
                                <option value="">Seleccione</option>
                            </select>
                        </div>


                        <div class="input-group">
                            <label for="fecha_inicio">Fecha de inicio</label>
                            <input type="date" id="fecha_inicio" name="fecha_inicio" max="<?= date('Y-m-d') ?>">
                        </div>

                        <div class="input-group">
                            <label for="fecha_fin">Fecha de fin</label>
                            <input type="date" id="fecha_fin" name="fecha_fin" max="<?= date('Y-m-d') ?>">
                        </div>
                    </div>
                </section>

                <section class="form-section">
                    <div class="form-section-header with-action">
                        <div>
                            <p class="section-kicker">Sección 4</p>
                            <h2>Experiencia laboral</h2>
                        </div>
                        <button type="button" id="addExperienciaBtn" class="btn-outline">Agregar experiencia</button>
                    </div>

                    <div id="experienciasContainer" class="dynamic-stack">
                        <div class="experiencia-item dynamic-card">
                            <div class="form-grid form-grid-2">
                                <div class="input-group">
                                    <label>Empresa</label>
                                    <input type="text" name="empresa[]">
                                </div>

                                <div class="input-group">
                                    <label>Cargo</label>
                                    <input type="text" name="cargo[]">
                                </div>

                                <div class="input-group">
                                    <label>Fecha inicio</label>
                                    <input type="date" name="exp_fecha_inicio[]" max="<?= date('Y-m-d') ?>">
                                </div>

                                <div class="input-group">
                                    <label>Fecha fin</label>
                                    <input type="date" name="exp_fecha_fin[]" max="<?= date('Y-m-d') ?>">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="form-section">
                    <div class="form-section-header">
                        <p class="section-kicker">Sección 5</p>
                        <h2>Postulación</h2>
                    </div>

                    <div class="form-grid form-grid-1">
                        <div class="input-group">
                            <label for="puesto_id">Puesto al que aplica</label>
                            <select id="puesto_id" name="puesto_id">
                                <option value="">Seleccione</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <label for="turno_id">Turno</label>
                            <select id="turno_id" name="turno_id">
                                <option value="">Seleccione</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section class="form-note-card">
                    <h3>Importante</h3>
                    <p>
                        Antes de finalizar, revisa que toda tu información esté correcta. Una vez enviada la solicitud,
                        deberás verificar que el sistema muestre el mensaje de confirmación correspondiente para asegurarte
                        de que tu postulación se registró correctamente.
                    </p>
                </section>

                <div class="form-actions">
                    <button type="submit" id="submitBtn" class="btn-submit">
                        Enviar postulación
                    </button>
                </div>

            </form>

        </section>
    </main>

    <?php require_once __DIR__ . '/../partials/footer.php'; ?>

    <script src="<?= htmlspecialchars($basePath . '/assets/js/home.js', ENT_QUOTES, 'UTF-8') ?>"></script>
    <script src="<?= htmlspecialchars($basePath . '/assets/js/formulario.js', ENT_QUOTES, 'UTF-8') ?>"></script>
    <script src="<?= htmlspecialchars($basePath . '/assets/js/postulacion-formulario.js', ENT_QUOTES, 'UTF-8') ?>"></script>
</body>

</html>