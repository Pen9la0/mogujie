<?php
//声明服务器名,账号,密码,dbname属性
$servername = 'localhost';
$username = 'penglao';
$password = '123';
$dbname = 'mogujie';//数据库名

//创建连接
$conn = new mysqli($servername,$username,$password,$dbname);

//判断是否连接成功
if($conn -> connect_error){
    
    die("连接失败".$conn -> connect_error);
};

$conn-> set_charset('utf8');

// echo "数据库连接成功";
?>