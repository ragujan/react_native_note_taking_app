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




if (isset($_POST["contact"]) &&  isset($_POST["password"]) && isset($_POST["first_name"]) && isset($_POST["last_name"]) && isset($_POST["user_type"])) {
    $contact = $_POST["contact"];
    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];
    $user_type = $_POST["user_type"];
    $password = $_POST["password"];

    if (!Validator::validatePhoneNumber($contact)) {
        echo "invalid phone number";
        return;
    }
    if (!Validator::validatePlainText($first_name)) {
        echo "invalid first name";
        return;
    }
    if (!Validator::validatePlainText($last_name)) {
        echo "invalid last name";
        return;
    }
    if (!Validator::validatePlainText($user_type)) {
        echo "invalid user type";
        return;
    }

    

    try {
        $config = DatabaseConfig::getInstance($currentURL);
        $dbConnection = $config->getConnection();
        $query = "SELECT * FROM `user` WHERE `user`.`contact` = :contactNumber";
        $statement = $dbConnection->prepare($query);
        $statement->bindParam(":contactNumber", $contact);
        $statement->execute();

        $count = $statement->rowCount();

        if ($count == 1) {
            echo "This contact number already exists";
            return;
        } else {
            date_default_timezone_set('Asia/Colombo');
            $created_at = date('Y-m-d H:i:s');
            $user_type_id = UserType::getUserTypeId($user_type);
            $query = "INSERT INTO `user` (`contact`,`first_name`,`last_name`,`password`,`user_type_id`,`created_at`) VALUES (:contact,:first_name,:last_name,:password,:user_type_id,:created_at)";
            $statement = $dbConnection->prepare($query);
            $statement->bindParam(':contact', $contact);
            $statement->bindParam(':first_name', $first_name);
            $statement->bindParam(':last_name', $last_name);
            $statement->bindParam(':password', $password);
            $statement->bindParam(':user_type_id', $user_type_id);
            $statement->bindParam(':created_at', $created_at);

            if ($statement->execute()) {
                echo "New user added successfully";
            } else {
                echo "Error ";
            }
        }
        // Use $dbConnection for database operations
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Nothing received";
}
if (!isset($_SERVER['HTTPS'])) {
    $currentURL = "http//";

    $config = DatabaseConfig::getInstance($currentURL);

    try {
        date_default_timezone_set('Asia/Colombo');
        $created_at = date('Y-m-d H:i:s');
        $contact = '1234567890';
        $first_name = 'John';
        $last_name = 'Doe';
        $user_type_id = 1;
        $dbConnection = $config->getConnection();
        $query = "SELECT * FROM `user` WHERE `user`.`contact` = :contactNumber";
        $statement = $dbConnection->prepare($query);
        $statement->bindParam(":contactNumber", $contact);
        $statement->execute();

        $count = $statement->rowCount();
        echo "count is " . $count;

        if ($count == 1) {
            echo "This contact number already exists";
            return;
        } else {
            $query = "INSERT INTO `user` (`contact`,`first_name`,`last_name`,`user_type_id`,`created_at`) VALUES (:contact,:first_name,:last_name,:user_type_id,:created_at)";
            $statement = $dbConnection->prepare($query);
            $statement->bindParam(':contact', $contact);
            $statement->bindParam(':first_name', $first_name);
            $statement->bindParam(':last_name', $last_name);
            $statement->bindParam(':user_type_id', $user_type_id);
            $statement->bindParam(':created_at', $created_at);

            if ($statement->execute()) {
                echo "New user added successfully";
            } else {
                echo "Error ";
            }

            echo "Can be added as a new row";
        }
        echo "boom boom";
        // Use $dbConnection for database operations
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
};
