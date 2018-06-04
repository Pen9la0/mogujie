<?php
require("connect.php");

//查询前20条数据库并返回到前端
$sql = "SELECT * FROM `car` WHERE 1";

$res = $conn -> query($sql);
$row = $res ->  fetch_all(MYSQLI_ASSOC);
//拿到所有数据返回前端并关闭数据库

echo json_encode($row,JSON_UNESCAPED_UNICODE);

?>