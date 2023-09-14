<?php

class DatabaseConfig {
    private static $instance = null;
    private $pdo;

    private function __construct($url, $charset = 'utf8') {

        try {
            if (strpos($url, 'https//') !== false) {
                $this->pdo = new PDO("mysql:host=localhost;dbname=id21216242_ecommerce;charset={$charset}", 'id21216242_root', 'ragbag###111Rag');
            } else {
                $this->pdo = new PDO("mysql:host=localhost;dbname=react_native_app;charset={$charset}", 'root', 'ragJN100Mania');
            }
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }

    public static function getInstance($url, $charset = 'utf8') {
        if (self::$instance === null) {
            self::$instance = new DatabaseConfig($url, $charset);
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->pdo;
    }
}


?>