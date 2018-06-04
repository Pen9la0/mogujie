<?php
/**
 * @Author: Marte
 * @Date:   2018-05-28 11:28:43
 * @Last Modified by:   Marte
 * @Last Modified time: 2018-05-31 21:45:28
 */
require("connect.php");
$uname = $_POST['username'];
$passw = $_POST['password'];
$type = $_POST['type'];



if($type === '登录'){
    $sql = "SELECT * FROM `user` WHERE username = '$uname'";

    $result = $conn -> query($sql);
    $row = $result -> fetch_all(MYSQLI_ASSOC);
    if($row[0]['password'] === $passw){
        $sql = "UPDATE `user` SET `login` = 1 WHERE username = $uname";

        $result = $conn -> query($sql);

        $sql = "SELECT * FROM `user` WHERE username = '$uname'";

        $result = $conn -> query($sql);
        
        $row = $result -> fetch_all(MYSQLI_ASSOC);

        echo $row[0]['login'];

    }else{
        
        echo "用户名或密码错误";
    }

}
else{
    $sql = "SELECT * FROM `user` WHERE username = '$uname'";

    //执行sql语句,查询结果
    $result = $conn -> query($sql);
    $row = $result -> fetch_all(MYSQLI_ASSOC);
    if($row){
        echo "此用户已存在";
    }else{
        $sql = "INSERT INTO `user`(`username`, `password`,`login`) VALUES ('$uname','$passw',0)";
        $conn -> query($sql);
        echo "注册成功";
    }
}

$conn -> close();

// echo '后端连接成功';
?>