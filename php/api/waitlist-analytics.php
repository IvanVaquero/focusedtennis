<?php
require_once __DIR__ . '/../config/config.php';
cors_bootstrap(['GET','OPTIONS']);

// Admin token check for security
$token = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? '';
if (!hash_equals(ADMIN_TOKEN, $token)) {
  http_response_code(403);
  echo json_encode(['error'=>'Forbidden']);
  exit;
}

// Initialize analytics data
$analytics = [
  'totalEntries' => 0,
  'practiceFrequency' => [
    '1-2' => 0,
    '3-4' => 0,
    '5+' => 0,
    'unknown' => 0
  ],
  'matchFrequency' => [
    '1-2' => 0,
    '3-4' => 0,
    '5+' => 0,
    'unknown' => 0
  ],
  'commonStruggles' => [],
  'commonExpectations' => [],
  'strugglesKeywords' => [],
  'expectationsKeywords' => [],
  'signupTrends' => [],
  'lastUpdated' => gmdate('c')
];

// Read and analyze data
if (file_exists(VERIFIED_FILE)) {
  $fh = fopen(VERIFIED_FILE, 'rb');
  $strugglesText = '';
  $expectationsText = '';
  $signupDates = [];
  
  while (($line = fgets($fh)) !== false) {
    $row = json_decode($line, true);
    if (!$row) continue;
    
    $analytics['totalEntries']++;
    
    // Practice frequency analysis
    $practice = $row['practiceFrequency'] ?? '';
    if (isset($analytics['practiceFrequency'][$practice])) {
      $analytics['practiceFrequency'][$practice]++;
    } else {
      $analytics['practiceFrequency']['unknown']++;
    }
    
    // Match frequency analysis
    $matches = $row['matchFrequency'] ?? '';
    if (isset($analytics['matchFrequency'][$matches])) {
      $analytics['matchFrequency'][$matches]++;
    } else {
      $analytics['matchFrequency']['unknown']++;
    }
    
    // Collect text for keyword analysis
    $struggles = strtolower(trim($row['struggles'] ?? ''));
    $expectations = strtolower(trim($row['expectations'] ?? ''));
    
    if ($struggles) {
      $strugglesText .= ' ' . $struggles;
      $analytics['commonStruggles'][] = $struggles;
    }
    
    if ($expectations) {
      $expectationsText .= ' ' . $expectations;
      $analytics['commonExpectations'][] = $expectations;
    }
    
    // Signup date for trends
    $createdAt = $row['createdAt'] ?? '';
    if ($createdAt) {
      $date = date('Y-m-d', strtotime($createdAt));
      $signupDates[] = $date;
    }
  }
  fclose($fh);
  
  // Keyword analysis for struggles
  $strugglesWords = str_word_count($strugglesText, 1);
  $strugglesCount = array_count_values($strugglesWords);
  arsort($strugglesCount);
  $analytics['strugglesKeywords'] = array_slice($strugglesCount, 0, 10, true);
  
  // Keyword analysis for expectations
  $expectationsWords = str_word_count($expectationsText, 1);
  $expectationsCount = array_count_values($expectationsWords);
  arsort($expectationsCount);
  $analytics['expectationsKeywords'] = array_slice($expectationsCount, 0, 10, true);
  
  // Signup trends (last 30 days)
  $signupTrends = array_count_values($signupDates);
  ksort($signupTrends);
  $analytics['signupTrends'] = $signupTrends;
  
  // Calculate percentages
  if ($analytics['totalEntries'] > 0) {
    foreach ($analytics['practiceFrequency'] as $key => $count) {
      $analytics['practiceFrequency'][$key] = [
        'count' => $count,
        'percentage' => round(($count / $analytics['totalEntries']) * 100, 1)
      ];
    }
    
    foreach ($analytics['matchFrequency'] as $key => $count) {
      $analytics['matchFrequency'][$key] = [
        'count' => $count,
        'percentage' => round(($count / $analytics['totalEntries']) * 100, 1)
      ];
    }
  }
}

echo json_encode($analytics, JSON_PRETTY_PRINT);
