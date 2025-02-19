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
$stuid = $_POST["id"];
$passw = $_POST["password"];
$type = $_POST["type"]; # 1是学生，0是老师


if($type==1){
    $sql = "call student_account_verify(?, ?)";
}
else if($type==0){
    $sql = "call teacher_account_verify(?, ?)";
}
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $stuid, $passw);

if($stmt->execute()){
    $stmt->bind_result($result);
    $stmt->fetch();
    echo($result);
}

$stmt->free_result();
$stmt->close();
$conn->close();
?>