<?php
require_once __DIR__ . '/../config/config.php';
cors_bootstrap(['GET','POST','OPTIONS']);

// Admin token check for security
$token = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? '';
if (!hash_equals(ADMIN_TOKEN, $token)) {
  http_response_code(403);
  echo json_encode(['error'=>'Forbidden']);
  exit;
}

// Input validation
$raw  = file_get_contents('php://input');
$body = json_decode($raw, true) ?: [];

$email = strtolower(trim($body['email'] ?? ''));
$name  = trim($body['name'] ?? '');

// Tennis-specific fields
$acceptTerms      = (bool)($body['acceptTerms'] ?? false);
$practiceFrequency = (string)($body['practiceFrequency'] ?? '');
$matchFrequency   = (string)($body['matchFrequency'] ?? '');
$struggles        = (string)($body['struggles'] ?? '');
$expectations     = (string)($body['expectations'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(['error'=>'Invalid email']); 
  exit;
}

if (!$name || !$acceptTerms) {
  http_response_code(422);
  echo json_encode(['error'=>'Missing required fields']); 
  exit;
}

// Check for duplicates
function email_exists($file, $email) {
  if (!file_exists($file)) return false;
  $fh = fopen($file, 'rb');
  if (!$fh) return false;
  while (($line = fgets($fh)) !== false) {
    $row = json_decode($line, true);
    if ($row && strtolower($row['email'] ?? '') === $email) { 
      fclose($fh); 
      return true; 
    }
  }
  fclose($fh);
  return false;
}

// If already exists, return success (idempotent)
if (email_exists(VERIFIED_FILE, $email)) {
  echo json_encode(['ok'=>true, 'idempotent'=>true, 'status'=>'already_joined']); 
  exit;
}

// Build tennis waitlist record
$id = bin2hex(random_bytes(8));
$ts = gmdate('c');

$entry = [
  'id'               => $id,
  'email'            => $email,
  'name'             => $name,
  'acceptTerms'      => $acceptTerms,
  'practiceFrequency' => $practiceFrequency,
  'matchFrequency'   => $matchFrequency,
  'struggles'        => $struggles,
  'expectations'     => $expectations,
  'status'           => 'joined',
  'createdAt'        => $ts
];

// Save to JSONL file
if (!is_dir(BASE_DIR)) { 
  mkdir(BASE_DIR, 0755, true); 
}

$fh = fopen(VERIFIED_FILE, 'ab');
if (!$fh || !flock($fh, LOCK_EX)) {
  http_response_code(500);
  echo json_encode(['error'=>'Storage error']); 
  exit;
}

fwrite($fh, json_encode($entry, JSON_UNESCAPED_SLASHES) . "\n");
flock($fh, LOCK_UN); 
fclose($fh);

// Success response (no email sending)
echo json_encode([
  'ok' => true, 
  'id' => $id, 
  'status' => 'joined',
  'message' => 'Successfully added to waitlist'
]);
