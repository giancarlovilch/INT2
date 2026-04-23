<?php

require_once __DIR__ . '/../Core/Controller.php';
require_once __DIR__ . '/../Services/PostulanteService.php';

class PostulanteController extends Controller
{
    private PostulanteService $service;

    public function __construct()
    {
        $this->service = new PostulanteService();
    }

    public function accessView(): void
    {
        require_once __DIR__ . '/../../views/postulacion/acceso.php';
    }

    public function index(): void
    {
        $postulantes = $this->service->getAll();

        $this->success('Lista de postulantes obtenida correctamente', $postulantes);
    }

    public function show($id): void
    {
        $postulante = $this->service->getById((int) $id);

        if (!$postulante) {
            $this->notFound('Postulante no encontrado');
        }

        $this->success('Postulante encontrado', $postulante);
    }

    public function store(): void
    {
        $data = $this->getAllInput();
        $result = $this->service->create($data);

        if (!$result['success']) {
            $this->handleServiceError($result);
        }

        $this->created($result['message'], $result['data']);
    }

    public function update($id): void
    {
        $data = $this->getAllInput();
        $result = $this->service->update((int) $id, $data);

        if (!$result['success']) {
            $this->handleServiceError($result);
        }

        $this->success($result['message'], $result['data']);
    }

    public function destroy($id): void
    {
        $result = $this->service->delete((int) $id);

        if (!$result['success']) {
            $this->handleServiceError($result);
        }

        $this->success($result['message'], $result['data']);
    }

    private function handleServiceError(array $result): void
    {
        $status = $result['status'] ?? 500;
        $message = $result['message'] ?? 'Ocurrió un error';
        $errors = $result['errors'] ?? null;

        switch ($status) {
            case 404:
                $this->notFound($message);
                break;
            case 422:
                $this->validationError($message, $errors ?? []);
                break;
            case 401:
                $this->unauthorized($message);
                break;
            case 403:
                $this->forbidden($message);
                break;
            case 409:
                $this->error($message, 409, $errors ?? []);
                break;
            default:
                $this->error($message, $status, $errors);
                break;
        }
    }
    public function checkDni(): void
    {
        $data = $this->getAllInput();
        $result = $this->service->checkDni($data);

        if (!$result['success']) {
            $this->handleServiceError($result);
        }

        $this->success($result['message'], $result['data']);
    }

    public function validateAccess(): void
    {
        $data = $this->getAllInput();
        $result = $this->service->validateAccess($data);

        if (!$result['success']) {
            $this->handleServiceError($result);
        }

        $this->success($result['message'], $result['data']);
    }

    public function apply(): void
    {
        $data = $this->getAllInput();
        $result = $this->service->apply($data);

        if (!$result['success']) {
            $this->handleServiceError($result);
        }

        $this->created($result['message'], $result['data']);
    }

    public function getApplicationView($dni): void
    {
        $result = $this->service->getApplicationView((string) $dni);

        if (!$result['success']) {
            $this->handleServiceError($result);
        }

        $this->success($result['message'], $result['data']);
    }

    public function formView(): void
    {
        require_once __DIR__ . '/../../views/postulacion/formulario.php';
    }
}
