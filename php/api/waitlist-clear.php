<?php
require_once __DIR__ . '/../config/config.php';
cors_bootstrap(['GET','POST','OPTIONS']);  // <- FIRST!

// Now do auth/token checks, logic, etc.
$token = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? '';
if (!hash_equals(ADMIN_TOKEN, $token)) {
  http_response_code(403);
  echo json_encode(['error'=>'Forbidden']);
  exit;
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  if (in_array($origin, $ALLOWED_ORIGINS, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Admin-Token');
  }
  http_response_code(204); exit;
}
if ($origin && in_array($origin, $ALLOWED_ORIGINS, true)) {
  header("Access-Control-Allow-Origin: $origin");
}
header('Content-Type: application/json');

$token = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? '';
if (!hash_equals(ADMIN_TOKEN, $token)) { http_response_code(403); echo json_encode(['error'=>'Forbidden']); exit; }

if (file_exists(VERIFIED_FILE)) {
  file_put_contents(VERIFIED_FILE, '');
}
echo json_encode(['ok'=>true, 'cleared'=>true]);
