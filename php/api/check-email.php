<?php
require_once __DIR__ . '/../config/config.php';

// Allow POST + preflight BEFORE any logic
cors_bootstrap(['POST','OPTIONS']); // in config.php

// IMPORTANT: NO admin token check here (public endpoint)

try {
  // Read JSON body (fallback to form-encoded)
  $raw  = file_get_contents('php://input') ?: '';
  $data = json_decode($raw, true);
  if (!is_array($data)) $data = $_POST;

  $email = isset($data['email']) ? trim($data['email']) : '';
  if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid email']); exit;
  }

  // Ensure storage exists
  if (!is_dir(BASE_DIR)) {
    // Create storage dir if missing (permissions: 0755)
    if (!mkdir(BASE_DIR, 0755, true) && !is_dir(BASE_DIR)) {
      throw new Exception('Cannot create storage directory');
    }
  }

  $exists = false;
  $needle = strtolower($email);

  // If file doesn't exist yet -> no entries
  if (file_exists(VERIFIED_FILE)) {
    $fh = fopen(VERIFIED_FILE, 'rb');
    if ($fh === false) throw new Exception('Cannot open storage file');

    while (($line = fgets($fh)) !== false) {
      $row = json_decode($line, true);
      if (!$row) continue;
      $rowEmail = strtolower(trim($row['email'] ?? $row['Email'] ?? ''));
      if ($rowEmail === $needle) { $exists = true; break; }
    }
    fclose($fh);
  }

  echo json_encode(['ok' => true, 'exists' => $exists]); // 200
} catch (Throwable $e) {
  // Don't leak internals to client; log server-side
  error_log('check-email error: ' . $e->getMessage());
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Server error']);
}
