<?php

/**
 * SUBTÍTULO: El Tanque Matriz de Suministro (Clase Database)
 * Implementa el patrón Singleton para que toda la obra use la misma tubería.
 */
class Database
{
    // Esta es la "reserva de agua". Guardamos la conexión aquí para no crear una nueva cada vez.
    // El '?' significa que puede empezar siendo NULL (vacío).
    private static ?PDO $connection = null;

    // SUBTÍTULO: El Candado de Seguridad
    // Al ser privado, nadie fuera de aquí puede hacer "new Database()".
    // Obligamos a usar el método oficial.
    private function __construct() {}

    /**
     * SUBTÍTULO: La Válvula Principal (getConnection)
     * Retorna la conexión única a la base de datos.
     */
    public static function getConnection(): PDO
    {
        // Si el tanque está vacío, procedemos a llenarlo (conectar por primera vez)
        if (self::$connection === null) {
            // 1. Localización de los planos de configuración
            $configPath = __DIR__ . '/../../config/database.php';

            // Verificación de materiales: ¿Existe el archivo de configuración?
            if (!file_exists($configPath)) {
                throw new Exception("No se encontró el archivo de configuración de base de datos.");
            }

            // Cargamos los datos (host, usuario, password) en la variable $config
            $config = require $configPath;

            if (!is_array($config)) {
                throw new Exception("La configuración de base de datos no es válida.");
            }

            // 2. Ensamblado de la dirección técnica (DSN)
            // Preparamos el formato: mysql:host=xxx;port=xxx;dbname=xxx;charset=xxx
            $dsn = sprintf(
                'mysql:host=%s;port=%s;dbname=%s;charset=%s',
                $config['host'],
                $config['port'],
                $config['dbname'],
                $config['charset']
            );

            // 3. Instalación de la tubería (Conexión PDO)
            try {

                // Creamos la instancia de PDO con los parámetros de seguridad
                self::$connection = new PDO(
                    $dsn,
                    $config['username'],
                    $config['password'],
                    [
                        // Reportar errores como "Excepciones" para poder atraparlas
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,

                        // Entregar los datos como Arreglos Asociativos (Matriz de etiquetas)
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,

                        // Desactivar emulación para que MySQL haga la limpieza de seguridad real
                        // (Refuerzo antisísmico contra Inyección SQL)
                        PDO::ATTR_EMULATE_PREPARES => false,
                    ]
                );
            } catch (PDOException $e) {
                throw new Exception("Error de conexión a la base de datos", 0, $e);
            }
        }

        // Retornamos el tanque lleno (la conexión lista para usar)
        return self::$connection;
    }
}
