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
$stuid = $_GET["stu_id"];
$courseid = $_GET["course_id"];
$class_number = $_GET["class_num"];
$signtime = $_GET["sign_time"];


$sql = "call student_register_submit(?,?,?,?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param('ssis', $stuid, $courseid, $class_number, $signtime);

if($stmt->execute()){
    $stmt->bind_result($result);
    $stmt->fetch();
    echo($result);
}

$stmt->close();
$conn->close();
?>