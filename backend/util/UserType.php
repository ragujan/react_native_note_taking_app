<?php
require_once "DBConfig.php";


class UserType
{
    private static $currentURL = "";
    private static function setUrl()
    {

        if (isset($_SERVER['HTTPS'])) {
            self::$currentURL = "https//";
        }
        if (!isset($_SERVER['HTTPS'])) {
            self::$currentURL = "http//";
        };
        self::$currentURL .= $_SERVER['HTTP_HOST'];
        self::$currentURL .= $_SERVER['REQUEST_URI'];
    }
    public static function getUserTypeId($user_type_name)
    {
        $config = DatabaseConfig::getInstance(self::$currentURL);
        $dbConnection = $config->getConnection();
        $query = "SELECT * FROM `user_type` WHERE `user_type`.`user_type_name` = :user_type_name";
        $statement = $dbConnection->prepare($query);
        $statement->bindParam(":user_type_name", $user_type_name);
        $statement->execute();

        $count = $statement->rowCount();

        if ($count == 1) {
            $resultset =  $statement->fetchAll();
            return $resultset[0]['id'];
        }
    }
}
