<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Content-Type: application/json; charset=utf-8');
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../src/Helpers/Response.php';
require_once __DIR__ . '/../src/Core/Controller.php';
require_once __DIR__ . '/../src/Core/Router.php';
require_once __DIR__ . '/../src/Core/Database.php';
require_once __DIR__ . '/../src/Controllers/PostulanteController.php';
require_once __DIR__ . '/../src/Controllers/CatalogoController.php';
require_once __DIR__ . '/../src/Controllers/HomeController.php';

/**
 * Detecta la carpeta base del proyecto cuando no está en la raíz del dominio.
 * Ejemplos:
 * - /index.php                  => base path = ''
 * - /bolsa/public/index.php     => base path = /bolsa/public
 */
$scriptName = str_replace('\\', '/', $_SERVER['SCRIPT_NAME'] ?? '');
$basePath = rtrim(str_replace('/index.php', '', $scriptName), '/');

/**
 * Normaliza la URI para que el router trabaje siempre con rutas del tipo:
 * /postulantes/check-dni
 * /postulacion/acceso
 */
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$requestPath = parse_url($requestUri, PHP_URL_PATH) ?? '/';

if ($basePath !== '' && strpos($requestPath, $basePath) === 0) {
    $requestPath = substr($requestPath, strlen($basePath));
}

$requestPath = $requestPath === '' ? '/' : $requestPath;

// Exponer el base path para las vistas y JS
define('APP_BASE_PATH', $basePath);

$router = new Router();


$router->get('/', [HomeController::class, 'index']);
$router->get('/postulantes', [PostulanteController::class, 'index']);
$router->get('/postulantes/{id}', [PostulanteController::class, 'show']);
$router->post('/postulantes', [PostulanteController::class, 'store']);
$router->post('/postulantes/check-dni', [PostulanteController::class, 'checkDni']);
$router->post('/postulantes/validate-access', [PostulanteController::class, 'validateAccess']);
$router->post('/postulaciones', [PostulanteController::class, 'apply']);
$router->get('/postulaciones/{dni}', [PostulanteController::class, 'getApplicationView']);
$router->put('/postulantes/{id}', [PostulanteController::class, 'update']);
$router->delete('/postulantes/{id}', [PostulanteController::class, 'destroy']);
$router->get('/postulacion/acceso', [PostulanteController::class, 'accessView']);
$router->get('/postulacion/formulario', [PostulanteController::class, 'formView']);
$router->get('/catalogos/postulacion', [CatalogoController::class, 'getAll']);

$router->dispatch($_SERVER['REQUEST_METHOD'], $requestPath);