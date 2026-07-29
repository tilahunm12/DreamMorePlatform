<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->title) && !empty($data->description) && !empty($data->category) && !empty($data->budget) && !empty($data->deadline)) {
    if($db) {
        try {
            $query = "INSERT INTO jobs (employer_id, title, description, category, budget, deadline, status, created_at) 
                      VALUES (:employer_id, :title, :description, :category, :budget, :deadline, 'open', NOW())";
            $stmt = $db->prepare($query);

            $stmt->bindParam(":employer_id", $data->employer_id);
            $stmt->bindParam(":title", $data->title);
            $stmt->bindParam(":description", $data->description);
            $stmt->bindParam(":category", $data->category);
            $stmt->bindParam(":budget", $data->budget);
            $stmt->bindParam(":deadline", $data->deadline);

            if($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["status" => "success", "message" => "Job posted successfully.", "id" => $db->lastInsertId()]);
            } else {
                http_response_code(503);
                echo json_encode(["status" => "error", "message" => "Unable to post job."]);
            }
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => "success", "message" => "Job posted successfully (Mock Mode).", "id" => rand(10, 100)]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Incomplete job data provided."]);
}
?>
