<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$category = isset($_GET['category']) ? $_GET['category'] : '';
$search = isset($_GET['search']) ? $_GET['search'] : '';

if ($db) {
    try {
        $sql = "SELECT j.*, u.name AS employer_name, u.avatar AS employer_avatar 
                FROM jobs j 
                LEFT JOIN users u ON j.employer_id = u.id 
                WHERE 1=1";
        $params = [];

        if (!empty($category) && $category !== 'All') {
            $sql .= " AND j.category = :category";
            $params[':category'] = $category;
        }

        if (!empty($search)) {
            $sql .= " AND (j.title LIKE :search OR j.description LIKE :search)";
            $params[':search'] = "%$search%";
        }

        $sql .= " ORDER BY j.created_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $jobs = $stmt->fetchAll();

        echo json_encode([
            "status" => "success",
            "count" => count($jobs),
            "data" => $jobs
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    // Fallback response for offline / database-less dev mode
    echo json_encode([
        "status" => "success",
        "mode" => "mock",
        "data" => [
            [
                "id" => 1,
                "employer_id" => 1,
                "employer_name" => "TechCorp Ethiopia",
                "title" => "Build E-Learning Dashboard in React & PHP API",
                "description" => "We are looking for a developer to implement an interactive LMS dashboard with React 19, Tailwind CSS, and REST API integration.",
                "category" => "Technology",
                "budget" => 1200.00,
                "deadline" => "2026-08-15",
                "status" => "open",
                "proposals_count" => 3,
                "created_at" => "2026-07-29"
            ],
            [
                "id" => 2,
                "employer_id" => 2,
                "employer_name" => "Ethio-Creative Studio",
                "title" => "Brand Identity & Logo Redesign for Dream More",
                "description" => "Redesign logo and corporate identity materials. Need SVG icons, color palettes, and mobile splash designs.",
                "category" => "Creative",
                "budget" => 450.00,
                "deadline" => "2026-08-10",
                "status" => "open",
                "proposals_count" => 2,
                "created_at" => "2026-07-28"
            ]
        ]
    ]);
}
?>
