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

$raw  = file_get_contents('php://input');
$body = json_decode($raw, true) ?: [];
$entries = $body['entries'] ?? null;
if (!is_array($entries)) { http_response_code(422); echo json_encode(['error'=>'Invalid payload']); exit; }

// Load existing
$existing = [];
if (file_exists(VERIFIED_FILE)) {
  $fh = fopen(VERIFIED_FILE, 'rb');
  while (($line = fgets($fh)) !== false) {
    $row = json_decode($line, true);
    if ($row) $existing[$row['id'] ?? $row['email']] = $row;
  }
  fclose($fh);
}

$added = 0;
$fh = fopen(VERIFIED_FILE, 'ab');
foreach ($entries as $e) {
  $key = $e['id'] ?? $e['email'] ?? null;
  if (!$key) continue;
  if (isset($existing[$key])) continue;
  if (empty($e['createdAt'])) $e['createdAt'] = gmdate('c');
  if (empty($e['status']))    $e['status'] = 'joined';
  fwrite($fh, json_encode($e, JSON_UNESCAPED_SLASHES) . "\n");
  $added++;
}
fclose($fh);

echo json_encode(['ok'=>true, 'added'=>$added]);
