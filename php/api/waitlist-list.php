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
    header('Access-Control-Allow-Methods: GET, OPTIONS');
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

$entries = [];
if (file_exists(VERIFIED_FILE)) {
  $fh = fopen(VERIFIED_FILE, 'rb');
  while (($line = fgets($fh)) !== false) {
    $row = json_decode($line, true);
    if ($row) {
      if (isset($row['code']) && !isset($row['confirmationCode'])) {
        $row['confirmationCode'] = $row['code'];
      }
      $entries[] = $row;
    }
  }
  fclose($fh);
}

usort($entries, function ($a, $b) {
  $ta = strtotime($a['createdAt'] ?? '');
  $tb = strtotime($b['createdAt'] ?? '');
  if ($ta === $tb) return 0;
  return ($tb < $ta) ? -1 : 1;
});

echo json_encode([
  'entries'     => $entries,
  'totalCount'  => count($entries),
  'lastUpdated' => gmdate('c')
]);
