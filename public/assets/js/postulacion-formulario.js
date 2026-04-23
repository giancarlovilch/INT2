const form = document.getElementById('postulacionForm');
const statusBox = document.getElementById('statusBox');
const submitBtn = document.getElementById('submitBtn');
const addExperienciaBtn = document.getElementById('addExperienciaBtn');
const addSkillBtn = document.getElementById('addSkillBtn');
const stageBanner = document.getElementById('stageBanner');

const params = new URLSearchParams(window.location.search);
const dni = params.get('dni');

let mode = 'editable';

let catalogoSkills = [];
let catalogoNiveles = [];

/**
 * Detecta la carpeta base de la aplicación.
 * Ejemplos:
 * - /postulacion/formulario => ''
 * - /mi-proyecto/public/postulacion/formulario => '/mi-proyecto/public'
 */
function getBasePath() {
    const path = window.location.pathname;
    const marker = '/postulacion/';

    const index = path.indexOf(marker);
    if (index === -1) {
        return '';
    }

    return path.substring(0, index);
}

const BASE_PATH = getBasePath();

function buildUrl(path) {
    return `${BASE_PATH}${path}`;
}

document.addEventListener('DOMContentLoaded', async () => {
    if (!dni) {
        showStatus('No se recibió el DNI en la URL.', true);
        return;
    }

    await loadCatalogos();
    await loadApplicationView();
});

if (addExperienciaBtn) {
    addExperienciaBtn.addEventListener('click', () => {
        const container = document.getElementById('experienciasContainer');
        if (!container) return;

        const div = document.createElement('div');
        div.classList.add('experiencia-item', 'dynamic-card');

        div.innerHTML = `
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
                    <input type="date" name="exp_fecha_inicio[]">
                </div>

                <div class="input-group">
                    <label>Fecha fin</label>
                    <input type="date" name="exp_fecha_fin[]">
                </div>
            </div>
        `;

        container.appendChild(div);
    });
}

if (addSkillBtn) {
    addSkillBtn.addEventListener('click', () => {
        const container = document.getElementById('skillsContainer');
        if (!container) return;

        const div = document.createElement('div');
        div.classList.add('skill-item', 'dynamic-card');

        div.innerHTML = `
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
        `;

        container.appendChild(div);

        const skillSelect = div.querySelector('select[name="skill_id[]"]');
        const nivelSelect = div.querySelector('select[name="nivel_id[]"]');

        fillSingleSelect(skillSelect, catalogoSkills);
        fillSingleSelect(nivelSelect, catalogoNiveles);
    });
}

async function loadCatalogos() {
    try {
        const response = await fetch(buildUrl('/catalogos/postulacion'), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const result = await response.json();

        if (!result.success) {
            showStatus(result.message || 'No se pudieron cargar los catálogos.', true);
            return;
        }

        const data = result.data;
        catalogoSkills = Array.isArray(data.skills) ? data.skills : [];
        catalogoNiveles = Array.isArray(data.niveles) ? data.niveles : [];

        fillSelect('genero_id', data.generos);
        fillSelect('situacion_vivienda_id', data.situaciones_vivienda);
        fillSelect('institucion_id', data.instituciones);
        fillSelect('tipo_estudio_id', data.tipos_estudio);
        fillSelect('estado_id', data.estados);
        fillSelect('turno_id', data.turnos);
        fillSelect('puesto_id', data.puestos);
        fillSelectMultiple('skill_id[]', data.skills);
        fillSelectMultiple('nivel_id[]', data.niveles);

    } catch (error) {
        showStatus('Error al cargar los catálogos.', true);
    }
}

async function loadApplicationView() {
    try {
        const response = await fetch(buildUrl(`/postulaciones/${encodeURIComponent(dni)}`), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const result = await response.json();

        if (!result.success) {
            showStatus(result.message || 'No se pudo cargar la postulación.', true);
            return;
        }

        const data = result.data;
        mode = data.mode;

        renderStageBanner(data.postulacion || null);

        if (shouldUseIntranet(data.postulacion || null)) {
            showStatus('Acceso restringido. Debes ingresar por intranet.', true);
            fillReadonlyData(data);
            disableForm();
            return;
        }

        if (mode === 'readonly') {
            showStatus('Solicitud enviada. Formulario en modo solo lectura.');
            fillReadonlyData(data);
            disableForm();
            return;
        }

        showStatus('Completa tus datos para enviar tu postulación.');
        prefillEditableData(data);

    } catch (error) {
        showStatus('Error al cargar la información de la postulación.', true);
    }
}

function fillSelect(selectId, items) {
    const select = document.getElementById(selectId);

    if (!select || !Array.isArray(items)) return;

    if (select.dataset.loaded === 'true') return;

    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.descripcion;
        select.appendChild(option);
    });

    select.dataset.loaded = 'true';
}

function fillSelectMultiple(name, items) {
    const selects = document.getElementsByName(name);

    if (!selects || !Array.isArray(items)) return;

    selects.forEach(select => {
        if (select.dataset.loaded === 'true') return;

        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.descripcion;
            select.appendChild(option);
        });

        select.dataset.loaded = 'true';
    });
}

function fillSingleSelect(select, items) {
    if (!select || !Array.isArray(items)) return;

    select.innerHTML = '<option value="">Seleccione</option>';

    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.descripcion;
        select.appendChild(option);
    });
}

function fillReadonlyData(data) {
    if (!data.postulante) return;

    setValue('nombres', data.postulante.nombres);
    setValue('apellidos', data.postulante.apellidos);
    setValue('genero_id', data.postulante.genero_id);
    setValue('fecha_nacimiento', data.postulante.fecha_nacimiento);
    setValue('email', data.postulante.email);
    setValue('telefono', data.postulante.telefono);
    setValue('situacion_vivienda_id', data.postulante.situacion_vivienda_id);
    setValue('institucion_id', data.postulante.institucion_id);
    setValue('tipo_estudio_id', data.postulante.tipo_estudio_id);
    setValue('estado_id', data.postulante.estado_id);
    setValue('fecha_inicio', data.postulante.fecha_inicio);
    setValue('fecha_fin', data.postulante.fecha_fin);
    setValue('turno_id', data.postulante.turno_id);

    if (data.postulacion) {
        setValue('puesto_id', data.postulacion.puesto_id);
    }

    fillReadonlyExperiencias(data.experiencias || []);
    fillReadonlySkills(data.skills || []);
}

function fillReadonlyExperiencias(experiencias) {
    const container = document.getElementById('experienciasContainer');
    if (!container) return;

    container.innerHTML = '';

    if (!Array.isArray(experiencias) || experiencias.length === 0) {
        const empty = document.createElement('div');
        empty.classList.add('experiencia-item', 'dynamic-card');

        empty.innerHTML = `
            <div class="form-grid form-grid-2">
                <div class="input-group">
                    <label>Empresa</label>
                    <input type="text" value="" disabled>
                </div>

                <div class="input-group">
                    <label>Cargo</label>
                    <input type="text" value="" disabled>
                </div>

                <div class="input-group">
                    <label>Fecha inicio</label>
                    <input type="date" value="" disabled>
                </div>

                <div class="input-group">
                    <label>Fecha fin</label>
                    <input type="date" value="" disabled>
                </div>
            </div>
        `;

        container.appendChild(empty);
        return;
    }

    experiencias.forEach((experiencia) => {
        const div = document.createElement('div');
        div.classList.add('experiencia-item', 'dynamic-card');

        div.innerHTML = `
            <div class="form-grid form-grid-2">
                <div class="input-group">
                    <label>Empresa</label>
                    <input type="text" value="${escapeHtml(experiencia.empresa || '')}" disabled>
                </div>

                <div class="input-group">
                    <label>Cargo</label>
                    <input type="text" value="${escapeHtml(experiencia.cargo || '')}" disabled>
                </div>

                <div class="input-group">
                    <label>Fecha inicio</label>
                    <input type="date" value="${experiencia.fecha_inicio || ''}" disabled>
                </div>

                <div class="input-group">
                    <label>Fecha fin</label>
                    <input type="date" value="${experiencia.fecha_fin || ''}" disabled>
                </div>
            </div>
        `;

        container.appendChild(div);
    });
}

function fillReadonlySkills(skills) {
    const container = document.getElementById('skillsContainer');
    if (!container) return;

    container.innerHTML = '';

    if (!Array.isArray(skills) || skills.length === 0) {
        const empty = document.createElement('div');
        empty.classList.add('skill-item', 'dynamic-card');

        empty.innerHTML = `
            <div class="form-grid form-grid-2">
                <div class="input-group">
                    <label>Habilidad</label>
                    <input type="text" value="" disabled>
                </div>

                <div class="input-group">
                    <label>Nivel</label>
                    <input type="text" value="" disabled>
                </div>
            </div>
        `;

        container.appendChild(empty);
        return;
    }

    skills.forEach((skill) => {
        const div = document.createElement('div');
        div.classList.add('skill-item', 'dynamic-card');

        div.innerHTML = `
            <div class="form-grid form-grid-2">
                <div class="input-group">
                    <label>Habilidad</label>
                    <input type="text" value="${escapeHtml(skill.skill_descripcion || '')}" disabled>
                </div>

                <div class="input-group">
                    <label>Nivel</label>
                    <input type="text" value="${escapeHtml(skill.nivel_descripcion || '')}" disabled>
                </div>
            </div>
        `;

        container.appendChild(div);
    });
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function prefillEditableData(data) {
    if (!data || !data.postulante) {
        showStatus(`Nueva postulación para el DNI ${dni}.`);
        return;
    }

    setValue('nombres', data.postulante.nombres);
    setValue('apellidos', data.postulante.apellidos);
    setValue('genero_id', data.postulante.genero_id);
    setValue('fecha_nacimiento', data.postulante.fecha_nacimiento);
    setValue('email', data.postulante.email);
    setValue('telefono', data.postulante.telefono);
    setValue('situacion_vivienda_id', data.postulante.situacion_vivienda_id);

    showStatus(`Completa o actualiza tus datos para el DNI ${dni}.`);
}

function setValue(id, value) {
    const element = document.getElementById(id);
    if (!element) return;
    element.value = value ?? '';
}

function disableForm() {
    const fields = form.querySelectorAll('input, select, button, textarea');
    fields.forEach(field => {
        field.disabled = true;
    });

    form.classList.add('is-readonly');
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (mode === 'readonly') {
        showStatus('La solicitud ya fue enviada y no puede modificarse.', true);
        return;
    }

    const empresas = document.getElementsByName('empresa[]');
    const cargos = document.getElementsByName('cargo[]');
    const fechasInicio = document.getElementsByName('exp_fecha_inicio[]');
    const fechasFin = document.getElementsByName('exp_fecha_fin[]');

    const experiencias = [];

    for (let i = 0; i < empresas.length; i++) {
        if (!empresas[i].value.trim() || !fechasInicio[i].value.trim()) continue;

        experiencias.push({
            empresa: empresas[i].value.trim(),
            cargo: cargos[i].value.trim(),
            fecha_inicio: fechasInicio[i].value,
            fecha_fin: fechasFin[i].value || null
        });
    }

    const skillIds = document.getElementsByName('skill_id[]');
    const nivelIds = document.getElementsByName('nivel_id[]');

    const skills = [];

    for (let i = 0; i < skillIds.length; i++) {
        if (!skillIds[i].value) continue;

        skills.push({
            skill_id: Number(skillIds[i].value),
            nivel_id: nivelIds[i].value ? Number(nivelIds[i].value) : null
        });
    }

    const selectedSkillIds = skills.map(skill => skill.skill_id);
    const uniqueSkillIds = new Set(selectedSkillIds);

    if (selectedSkillIds.length !== uniqueSkillIds.size) {
        showStatus('No puedes repetir la misma habilidad más de una vez.', true);
        return;
    }

    const body = {
        nombres: getValue('nombres'),
        apellidos: getValue('apellidos'),
        genero_id: normalizeNumber(getValue('genero_id')),
        fecha_nacimiento: getValue('fecha_nacimiento'),
        email: getValue('email'),
        telefono: getValue('telefono'),
        situacion_vivienda_id: normalizeNumber(getValue('situacion_vivienda_id')),
        num_documento: dni,
        institucion_id: normalizeNumber(getValue('institucion_id')),
        tipo_estudio_id: normalizeNumber(getValue('tipo_estudio_id')),
        estado_id: normalizeNumber(getValue('estado_id')),
        fecha_inicio: normalizeEmpty(getValue('fecha_inicio')),
        fecha_fin: normalizeEmpty(getValue('fecha_fin')),
        turno_id: normalizeNumber(getValue('turno_id')),
        puesto_id: normalizeNumber(getValue('puesto_id')),
        experiencias: experiencias,
        skills: skills
    };

    try {
        setLoading(true);

        const response = await fetch(buildUrl('/postulaciones'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const result = await response.json();

        if (!result.success) {
            showStatus(result.message || 'No se pudo enviar la postulación.', true);
            return;
        }

        mode = 'readonly';
        disableForm();
        scrollToStatusAndCountdown();

    } catch (error) {
        showStatus('Error al enviar la postulación.', true);
    } finally {
        setLoading(false);
    }
});

function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : '';
}

function normalizeNumber(value) {
    return value === '' ? null : Number(value);
}

function normalizeEmpty(value) {
    return value === '' ? null : value;
}

function showStatus(message, isError = false) {
    statusBox.textContent = message;
    statusBox.style.color = isError ? 'red' : 'black';
}

function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading ? 'Enviando...' : 'Enviar postulación';
}

function scrollToStatusAndCountdown() {
    const statusBox = document.getElementById('statusBox');

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    setTimeout(() => {
        showSuccessCountdown();
    }, 700);
}

function showSuccessCountdown() {
    let seconds = 5;
    const redirectUrl = buildUrl('/postulacion/acceso');

    showStatus(
        `✅ Tu postulación fue enviada correctamente. Serás redirigido en ${seconds} segundos...`
    );

    const interval = setInterval(() => {
        seconds--;

        if (seconds <= 0) {
            clearInterval(interval);
            window.location.href = redirectUrl;
            return;
        }

        showStatus(
            `✅ Tu postulación fue enviada correctamente. Serás redirigido en ${seconds} segundos...`
        );
    }, 1000);
}

function renderStageBanner(postulacion) {
    if (!stageBanner) return;

    if (!postulacion || !postulacion.etapa_id) {
        stageBanner.style.display = 'none';
        return;
    }

    const etapaId = Number(postulacion.etapa_id);

    stageBanner.className = 'stage-banner';
    stageBanner.style.display = 'block';

    if (etapaId === 1) {
        stageBanner.classList.add('stage-pendiente');
        stageBanner.textContent = 'Etapa actual: Pendiente. Tu postulación está en revisión.';
        return;
    }

    if (etapaId === 2) {
        stageBanner.classList.add('stage-entrevista');
        stageBanner.textContent = 'Etapa actual: Entrevista. Tu postulación avanzó a entrevista.';
        return;
    }

    if (etapaId === 3) {
        stageBanner.classList.add('stage-rechazado');
        stageBanner.textContent = 'Etapa actual: Rechazado. Tu proceso de selección ha finalizado.';
        return;
    }

    if (etapaId === 4 || etapaId === 5) {
        stageBanner.classList.add('stage-intranet');
        stageBanner.textContent = 'Tu proceso debe continuar por intranet. Inicia sesión en intranet.';
        return;
    }

    stageBanner.style.display = 'none';
}

function shouldUseIntranet(postulacion) {
    if (!postulacion || !postulacion.etapa_id) {
        return false;
    }

    const etapaId = Number(postulacion.etapa_id);
    return etapaId === 4 || etapaId === 5;
}