<?php
require_once('../includes/importDb.php');
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);
$sql = "CREATE TABLE IF NOT EXISTS user(
    id int primary key auto_increment,
    fullname varchar(40), 
    username varchar(40) unique,
    email   varchar (255) unique,
    phone    varchar(40),
    addresss varchar(40),
    password varchar(40) 
)";
mysqli_query($connect,$sql);



?>