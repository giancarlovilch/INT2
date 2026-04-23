const form = document.getElementById('accessForm');
const dniInput = document.getElementById('num_documento');
const accessKeyInput = document.getElementById('access_key');
const birthDateContainer = document.getElementById('birthDateContainer');
const birthDateInput = document.getElementById('fecha_nacimiento');
const messageBox = document.getElementById('messageBox');
const submitBtn = document.getElementById('submitBtn');

let requiresBirthValidation = false;

/**
 * Detecta el base path de la aplicación.
 * Ejemplos:
 * - http://localhost:8000/postulacion/acceso        => ''
 * - http://localhost:8000/bolsa/public/postulacion/acceso => '/bolsa/public'
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

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    clearMessage();

    const numDocumento = dniInput.value.trim();
    const accessKey = accessKeyInput.value.trim();
    const fechaNacimiento = birthDateInput.value.trim();

    if (!requiresBirthValidation) {
        await checkDni(numDocumento, accessKey);
        return;
    }

    await validateAccess(numDocumento, accessKey, fechaNacimiento);
});

async function checkDni(numDocumento, accessKey) {
    try {
        setLoading(true);

        const response = await fetch(buildUrl('/postulantes/check-dni'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                num_documento: numDocumento,
                access_key: accessKey
            })
        });

        const result = await response.json();

        if (!result.success) {
            showMessage(result.message, true);
            return;
        }

        if (result.data.requires_birth_validation) {
            requiresBirthValidation = true;
            birthDateContainer.style.display = 'block';
            birthDateInput.required = true;
            showMessage('DNI encontrado. Ingresa tu fecha de nacimiento para continuar.');
            return;
        }

        window.location.href = buildUrl(`/postulacion/formulario?dni=${encodeURIComponent(numDocumento)}`);
    } catch (error) {
        showMessage('Ocurrió un error al verificar el DNI.', true);
    } finally {
        setLoading(false);
    }
}

async function validateAccess(numDocumento, accessKey, fechaNacimiento) {
    try {
        setLoading(true);

        const response = await fetch(buildUrl('/postulantes/validate-access'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                num_documento: numDocumento,
                access_key: accessKey,
                fecha_nacimiento: fechaNacimiento
            })
        });

        const result = await response.json();

        if (!result.success) {
            showMessage(result.message, true);
            return;
        }

        window.location.href = buildUrl(`/postulacion/formulario?dni=${encodeURIComponent(numDocumento)}`);
    } catch (error) {
        showMessage('Ocurrió un error al validar la identidad.', true);
    } finally {
        setLoading(false);
    }
}

function showMessage(message, isError = false) {
    messageBox.textContent = message;
    messageBox.style.color = isError ? 'red' : 'black';
}

function clearMessage() {
    messageBox.textContent = '';
}

function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading ? 'Validando...' : 'Continuar';
}