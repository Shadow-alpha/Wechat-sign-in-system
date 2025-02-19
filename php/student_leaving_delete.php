<?php
$servername = "localhost";
$username = "root";
$password = "123456789";
$database = 'project';
 
// 连接
$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
$conn->set_charset('utf8mb4');


//传参
$code = $_GET["code"];

$sql = "call student_leaving_delete(?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $code);


if($stmt->execute()){
    echo 1;
}
else{
    echo 0;
}

$stmt->close();
$conn->close();
?>