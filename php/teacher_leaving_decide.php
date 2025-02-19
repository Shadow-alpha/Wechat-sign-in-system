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
$leavecode = $_GET["code"];
$decision_type = $_GET["decision"];

$sql = "call teacher_leaving_decide(?,?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param('si', $leavecode, $decision_type);

if($stmt->execute()){
    echo 1;
}else{
    echo 0; 
}

$stmt->close();
$conn->close();
?>