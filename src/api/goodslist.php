<?php
$num = isset($_GET['num'])? $_GET['num'] : 0 ;
$idx = isset($_GET['idx'])? $_GET['idx'] : 0 ;

require("connect.php");

//查询前20条数据库并返回到前端
$sql = "SELECT `id`, `name`, `price`, `sale`, `imgurl`, `type` FROM `goodslist` LIMIT $idx,$num";

$res = $conn -> query($sql);
$row = $res ->  fetch_all(MYSQLI_ASSOC);
//拿到所有数据返回前端并关闭数据库

echo json_encode($row,JSON_UNESCAPED_UNICODE);

?>