<?php
function result_grouping($rows){
    $result = array(array(), array(), array());
    foreach($rows as $row){
        switch($row["leave_status"]){
            case "待审核":
                array_push($result[0], $row);break;
            case "通过":
                array_push($result[1], $row);break;
            case "不通过":
                array_push($result[2], $row);break;
        }
    }
    return $result;
}

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
$teacherid = $_GET["teacher_id"];

$sql = "call teacher_leaving_search(?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $teacherid);

$rows = array();
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

$result = result_grouping($rows);
echo json_encode($result);

$stmt->close();
$conn->close();
?>