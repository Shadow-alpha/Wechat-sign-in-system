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
$leavetime = $_GET["leave_time"];
$leave_reason = $_GET["reason"];

$sql = "call student_leaving_submit(?,?,?,?,?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param('ssiss', $stuid, $courseid, $class_number, $leavetime, $leave_reason);


if($stmt->execute()){
    $stmt->bind_result($result);
    $stmt->fetch();
    echo($result);
}
else{
    echo 0;
}

$stmt->close();
$conn->close();
?>