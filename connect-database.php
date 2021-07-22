<?php
// PDO implementation
include 'database-properties.php';
include 'utility.php';
require 'entities/Book.php';

$dbname = 'PersonalWebsite';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
$options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        // PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        // PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
        $pdo = new PDO($dsn, $username, $password, $options);
        debug_to_console("Connected to $dbname database.");

        // Test queries
        $books = $pdo->query('SELECT Title FROM Book')->fetchAll(PDO::FETCH_CLASS, 'Book');
        debug_to_console(count($books));
        debug_to_console("hello");
        foreach ($books as &$book) {
                // debug_to_console($book->title);
        }
} catch (\PDOException $e) {
        debug_to_console($e->getMessage());
        throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

$pdo = null;
