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
$teacherid = $_GET["id"];

$sql = "call teacher_prepare(?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $teacherid);

$rows = array ();
if($stmt->execute()){
    do{
        if($result = $stmt->get_result()){
            while ($row = $result->fetch_array(MYSQLI_ASSOC)){
                array_push($rows, $row);
            };
            $result->free_result();
        }
    }while($stmt->next_result());
}

echo json_encode($rows);

$stmt->close();
$conn->close();
?>