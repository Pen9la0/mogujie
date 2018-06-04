<?php
$name = $_GET['name'];
$imgurl = $_GET['imgurl'];
$price = $_GET['price'];
$sale = $_GET['sale'];
$qty = $_GET['qty'];
$id = $_GET['id'];

require("connect.php");

//先查询是否有这个商品如果有qty++,如果没有update
$sql = "SELECT * FROM `car` WHERE name = '$name'";
$res = $conn -> query($sql);
$row = $res ->  fetch_all(MYSQLI_ASSOC);



if(count($row) === 0){
    $sql = "INSERT INTO `car`(`id`,`name`, `imgurl`, `price`, `sale`, `qty`) VALUES ($id,'$name','$imgurl',$price,$sale,$qty)";
    $conn -> query($sql);

    echo 'insert';
}
else if($row[0]['name'] === $name){
    $newqty = $row[0]['qty']+1;  
    $sql = "UPDATE `car` SET `qty`= $newqty WHERE name = '$name'";
    $conn -> query($sql);
    echo 'updata';
}
//拿到所有数据返回前端并关闭数据库


?>