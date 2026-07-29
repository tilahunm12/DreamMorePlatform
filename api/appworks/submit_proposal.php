<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->job_id) && !empty($data->freelancer_id) && !empty($data->proposal_text) && !empty($data->amount)) {
    if($db) {
        try {
            $query = "INSERT INTO proposals (job_id, freelancer_id, proposal_text, amount, delivery_days, status, created_at) 
                      VALUES (:job_id, :freelancer_id, :proposal_text, :amount, :delivery_days, 'pending', NOW())";
            $stmt = $db->prepare($query);

            $stmt->bindParam(":job_id", $data->job_id);
            $stmt->bindParam(":freelancer_id", $data->freelancer_id);
            $stmt->bindParam(":proposal_text", $data->proposal_text);
            $stmt->bindParam(":amount", $data->amount);
            $delivery = isset($data->delivery_days) ? $data->delivery_days : 7;
            $stmt->bindParam(":delivery_days", $delivery);

            if($stmt->execute()) {
                // Update job proposals_count
                $update = $db->prepare("UPDATE jobs SET proposals_count = proposals_count + 1 WHERE id = :job_id");
                $update->bindParam(":job_id", $data->job_id);
                $update->execute();

                http_response_code(201);
                echo json_encode(["status" => "success", "message" => "Proposal submitted successfully."]);
            } else {
                http_response_code(503);
                echo json_encode(["status" => "error", "message" => "Unable to submit proposal."]);
            }
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => "success", "message" => "Proposal submitted successfully (Mock Mode)."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Incomplete proposal data."]);
}
?>
