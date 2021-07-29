<?php
//TODO: ensure properties file is secured on remote server
// chmod 700 /path/to/database-properties.php 
// create local database-properties.php file, connect to remote host, add to .gitignore
include '../database-properties.php';
include_once 'utils/debug.php';

//TODO: create Database contract& implement MySQL
$database_name = 'PersonalWebsite';
// TODO: close connection when user exits or finish fetching data
$link = mysqli_connect($host, $username, $password);
if (mysqli_connect_error()) {
        die("Failed to connect to mysql server!");
} else {
        debug_to_console("Connect to mysql server successfully!");
        select_database();
}

function select_database()
{
        global $database_name, $link;

        $database = mysqli_select_db($link, $database_name);
        if ($database) {
                debug_to_console("$database_name database found");
        } else {
                debug_to_console("$database_name database not found");
                create_database();
        }
}

function create_database()
{
        global $database_name, $link;

        $query = 'CREATE DATABASE ' . $database_name;
        if (mysqli_query($link, $query)) {
                debug_to_console("$database_name database created successfully");
        } else {
                debug_to_console("Error creating database: " . mysqli_error($link));
        }
}

//TODO: create tables if not exit
