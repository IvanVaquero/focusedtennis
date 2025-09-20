<?php
// FocusedTennis Configuration
define('ADMIN_TOKEN', '9f2a7b4c5d8e10a3b6c9d2e4f7a1b3c59d7e4f2a1c0b8d7e6f5a4c3b2d1e0f9');

// Storage paths
define('BASE_DIR',       __DIR__ . '/../storage');
define('VERIFIED_FILE',  BASE_DIR . '/waitlist-verified.jsonl');

// Allowed origins for CORS
$ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'https://focusedtennis.com',
  'https://www.focusedtennis.com'
];

// Helper you can reuse in all endpoints
function cors_bootstrap(array $methods = ['GET','POST','OPTIONS']) {
  global $ALLOWED_ORIGINS;

  $origin      = $_SERVER['HTTP_ORIGIN'] ?? '';
  $reqMethod   = $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']  ?? '';
  $reqHeaders  = $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'] ?? '';

  // Preflight
  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if ($origin && in_array($origin, $ALLOWED_ORIGINS, true)) {
      header("Access-Control-Allow-Origin: $origin");
      header('Vary: Origin');
      header('Access-Control-Allow-Methods: ' . implode(', ', $methods));
      // Reflect requested headers if present; else provide defaults
      if ($reqHeaders) {
        header("Access-Control-Allow-Headers: $reqHeaders");
      } else {
        header('Access-Control-Allow-Headers: Content-Type, X-Admin-Token');
      }
      header('Access-Control-Max-Age: 86400');
    }
    http_response_code(204);
    exit;
  }

  // Actual request
  if ($origin && in_array($origin, $ALLOWED_ORIGINS, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
  }
  header('Content-Type: application/json');
}