<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$job_id = isset($_GET['job_id']) ? $_GET['job_id'] : null;
$freelancer_id = isset($_GET['freelancer_id']) ? $_GET['freelancer_id'] : null;

if ($db) {
    try {
        $sql = "SELECT p.*, j.title AS job_title, u.name AS freelancer_name, u.title AS freelancer_title, u.rating AS freelancer_rating, u.completed_jobs
                FROM proposals p
                JOIN jobs j ON p.job_id = j.id
                JOIN users u ON p.freelancer_id = u.id
                WHERE 1=1";
        $params = [];

        if ($job_id) {
            $sql .= " AND p.job_id = :job_id";
            $params[':job_id'] = $job_id;
        }

        if ($freelancer_id) {
            $sql .= " AND p.freelancer_id = :freelancer_id";
            $params[':freelancer_id'] = $freelancer_id;
        }

        $sql .= " ORDER BY p.created_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $proposals = $stmt->fetchAll();

        echo json_encode(["status" => "success", "data" => $proposals]);
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode([
        "status" => "success",
        "mode" => "mock",
        "data" => [
            [
                "id" => 1,
                "job_id" => 1,
                "job_title" => "Build E-Learning Dashboard in React & PHP API",
                "freelancer_id" => 3,
                "freelancer_name" => "Tilahun Abebe",
                "freelancer_title" => "Full-Stack Developer",
                "freelancer_rating" => 4.95,
                "completed_jobs" => 15,
                "proposal_text" => "I can build this React 19 dashboard within 5 days with clean component architecture and responsive CSS.",
                "amount" => 1100.00,
                "delivery_days" => 5,
                "status" => "pending",
                "created_at" => "2026-07-29"
            ]
        ]
    ]);
}
?>
