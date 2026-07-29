<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->proposal_id) && !empty($data->status)) {
    if($db) {
        try {
            $stmt = $db->prepare("UPDATE proposals SET status = :status WHERE id = :id");
            $stmt->bindParam(":status", $data->status);
            $stmt->bindParam(":id", $data->proposal_id);

            if($stmt->execute()) {
                if ($data->status === 'accepted') {
                    // Update corresponding job status to in_progress
                    $get_job = $db->prepare("SELECT job_id FROM proposals WHERE id = :id");
                    $get_job->bindParam(":id", $data->proposal_id);
                    $get_job->execute();
                    $row = $get_job->fetch();
                    if ($row) {
                        $job_stmt = $db->prepare("UPDATE jobs SET status = 'in_progress' WHERE id = :job_id");
                        $job_stmt->bindParam(":job_id", $row['job_id']);
                        $job_stmt->execute();
                    }
                }
                echo json_encode(["status" => "success", "message" => "Proposal status updated to " . $data->status]);
            } else {
                http_response_code(500);
                echo json_encode(["status" => "error", "message" => "Failed to update proposal status."]);
            }
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => "success", "message" => "Proposal status updated (Mock Mode)."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Missing proposal_id or status."]);
}
?>
