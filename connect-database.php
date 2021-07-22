<?php
// PDO implementation
include 'database-properties.php';
include 'utility.php';

$dbname = 'PersonalWebsite';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
$options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
        $pdo = new PDO($dsn, $username, $password, $options);
        debug_to_console("Connected to $dbname database.");
} catch (\PDOException $e) {
        debug_to_console($e->getMessage());
        throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
