<?php
$page = isset($_GET['page']) ? $_GET['page'] : 1; 
$qty = isset($_GET['qty']) ? $_GET['qty'] : 15;

require("connect.php");

//查询前20条数据库并返回到前端
$sql = "SELECT * FROM `goodslist` WHERE 1";

$res = $conn -> query($sql);
$row = $res ->  fetch_all(MYSQLI_ASSOC);
//拿到所有数据返回前端并关闭数据库
$data = array_slice($row,($page-1)*$qty,$qty);

$res = array(
        'total' => count($row),//数组数量
        'page' => $page*1,//页数
        'qty' => $qty*1,//数量
        'data' => $data//截取的数组
    );

echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>