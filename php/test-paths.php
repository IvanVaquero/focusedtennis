<?php
/**
 * Test file to verify storage paths work correctly
 * Upload this to your Hostinger server in the php/ directory
 * Then visit: https://fctennispro.com/php/test-paths.php
 * 
 * This helps verify the storage paths are correct in production
 * DELETE THIS FILE after testing for security!
 */

require_once __DIR__ . '/config/config.php';

header('Content-Type: application/json');

$testResults = [
  'success' => true,
  'paths' => [
    '__DIR__' => __DIR__,
    'BASE_DIR' => BASE_DIR,
    'VERIFIED_FILE' => VERIFIED_FILE,
  ],
  'checks' => [
    'base_dir_exists' => is_dir(BASE_DIR),
    'base_dir_writable' => is_writable(BASE_DIR),
    'verified_file_exists' => file_exists(VERIFIED_FILE),
    'verified_file_writable' => file_exists(VERIFIED_FILE) && is_writable(VERIFIED_FILE),
    'verified_file_readable' => file_exists(VERIFIED_FILE) && is_readable(VERIFIED_FILE),
  ],
  'permissions' => [
    'base_dir' => file_exists(BASE_DIR) ? substr(sprintf('%o', fileperms(BASE_DIR)), -4) : 'N/A',
    'verified_file' => file_exists(VERIFIED_FILE) ? substr(sprintf('%o', fileperms(VERIFIED_FILE)), -4) : 'N/A',
  ],
  'file_info' => [
    'entry_count' => 0,
    'file_size' => file_exists(VERIFIED_FILE) ? filesize(VERIFIED_FILE) : 0,
  ]
];

// Count entries if file exists
if (file_exists(VERIFIED_FILE)) {
  $lines = file(VERIFIED_FILE, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  $testResults['file_info']['entry_count'] = count($lines);
  
  // Show first entry as sample (without sensitive data)
  if (count($lines) > 0) {
    $firstEntry = json_decode($lines[0], true);
    if ($firstEntry) {
      $testResults['file_info']['sample_entry'] = [
        'has_email' => isset($firstEntry['email']),
        'has_name' => isset($firstEntry['name']),
        'has_id' => isset($firstEntry['id']),
        'has_timestamp' => isset($firstEntry['createdAt']),
      ];
    }
  }
}

// Overall status
$allChecks = array_filter($testResults['checks']);
$testResults['status'] = (count($allChecks) === count($testResults['checks'])) ? 'ALL CHECKS PASSED ✅' : 'SOME CHECKS FAILED ❌';

// Add warning
$testResults['warning'] = 'DELETE THIS FILE AFTER TESTING - It exposes server paths!';

echo json_encode($testResults, JSON_PRETTY_PRINT);

