<?php
require_once "./util/DBConfig.php";
require_once "./util/UserType.php";
require_once "./util/Validator.php";
$currentURL = "";
if (isset($_SERVER['HTTPS'])) {
    $currentURL = "https//";
}
if (!isset($_SERVER['HTTPS'])) {
    $currentURL = "http//";
};
$currentURL .= $_SERVER['HTTP_HOST'];
$currentURL .= $_SERVER['REQUEST_URI'];

if (isset($_POST["contact"]) &&  isset($_POST["password"])) {
    $contact = $_POST["contact"];
    $password = $_POST["password"];



    if (!Validator::validatePhoneNumber($contact)) {
        echo "invalid phone number";
        return;
    }

    $config = DatabaseConfig::getInstance($currentURL);
    $dbConnection = $config->getConnection();
    $query = "SELECT * FROM `user` WHERE `user`.`contact` = :contactNumber AND `user`.`password`=:userPassword";
    $statement = $dbConnection->prepare($query);
    $statement->bindParam(":contactNumber", $contact);
    $statement->bindParam(":userPassword", $password);
    $statement->execute();

    $row = $statement->rowCount();

    if ($row === 1) {
        $dataArray = array();
        $dataArray[] = "user does exists";
   
        $resultSet = $statement->fetchAll();
        $dataArray = array_merge($dataArray, $resultSet);

        echo json_encode($dataArray);
    } else {
        echo "User Does Not Exists";
    }
} else {
    $contact = "1234567890";
    $password = "123";


    $config = DatabaseConfig::getInstance($currentURL);
    $dbConnection = $config->getConnection();
    $query = "SELECT * FROM `user` WHERE `user`.`contact` = :contactNumber AND `user`.`password`=:userPassword";
    $statement = $dbConnection->prepare($query);
    $statement->bindParam(":contactNumber", $contact);
    $statement->bindParam(":userPassword", $password);
    $statement->execute();

    $row = $statement->rowCount();

    if ($row === 1) {
        $dataArray = array();
        $dataArray[] = "user does exists";
   
        $resultSet = $statement->fetchAll();
        $dataArray = array_merge($dataArray, $resultSet);

        echo json_encode($dataArray);
    } else {
        echo "User Does Not Exists";
    }
}
