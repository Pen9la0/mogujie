<?php
$type = $_GET['type'];
$id = $_GET['id']*1;

require("connect.php");

//判断类型进行操作
if($type === 'remove'){
    $sql = "DELETE FROM `car` WHERE id = $id";
    $conn -> query($sql);
    echo 'remove';
}
// else if($type === 'add'){
//     $sql = "UPDATE `car` SET `qty`= $newqty WHERE name = '$name'";
//     $conn -> query($sql);
// }
// else if($type === 'reduce'){
//     $sql = "UPDATE `car` SET `qty`= $newqty WHERE name = '$name'";
//     $conn -> query($sql);
// }

?>