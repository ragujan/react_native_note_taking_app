<?php
class Validator{
    public static function validatePhoneNumber($phoneNumber){
        if(preg_match('/^[0-9]{10}$/',$phoneNumber)){
            return true;
        }else{
            return false;
        }
    }
    public static function validatePlainText($text){
        if(preg_match('/^[a-zA-Z0-9]+$/',$text)){
            return true;
        }else{
            return false;
        }
    }
}

?>