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
$courseid = $_GET["course_id"];
$date = $_GET["date"];
$starttime = $_GET["start_time"];
$endtime = $_GET["end_time"];

$temp_start = str_replace("%3A", ":", "{$date} {$starttime}:00");
$temp_end = str_replace("%3A", ":", "{$date} {$endtime}:00");

$sql = "call teacher_class_release(?,?,?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $courseid, $temp_start, $temp_end);

if($stmt->execute()){
    $stmt->bind_result($result);
    $stmt->fetch();
    echo($result);
}else{
    echo 0;
}

$stmt->close();
$conn->close();
?>