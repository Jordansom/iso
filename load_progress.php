<?php
// load_progress.php
session_set_cookie_params(['httponly' => true, 'samesite' => 'Strict']);
session_start();
header('Content-Type: application/json');

if (empty($_SESSION['username'])) {
    echo json_encode(['success' => false, 'message' => 'No autenticado.']);
    exit;
}

$username = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $_SESSION['username']);
$file = __DIR__ . '/progress/' . $username . '.csv';

if (!file_exists($file)) {
    echo json_encode(['success' => true, 'found' => false]);
    exit;
}

$rows = [];
$fp = fopen($file, 'r');
if ($fp === false) {
    echo json_encode(['success' => false, 'message' => 'No se pudo leer el archivo de progreso.']);
    exit;
}
while (($row = fgetcsv($fp, 0, ',', '"', '\\')) !== false) {
    $rows[] = $row;
}
fclose($fp);

// Parse all data rows – handles both old format (companyName,answers,completed)
// and new format (timestamp,companyName,answers,completed)
$header = $rows[0] ?? [];
$hasTimestamp = ($header[0] ?? '') === 'timestamp';

$records = [];
for ($i = 1; $i < count($rows); $i++) {
    $r = $rows[$i];
    if ($hasTimestamp) {
        if (count($r) < 3 || $r[0] === 'timestamp') continue;
        $rec = [
            'timestamp'   => $r[0],
            'companyName' => $r[1],
            'answers'     => json_decode($r[2] ?? '{}', true) ?: [],
            'completed'   => isset($r[3]) ? (int)$r[3] : 0,
        ];
    } else {
        if (count($r) < 2 || $r[0] === 'companyName') continue;
        $rec = [
            'timestamp'   => null,
            'companyName' => $r[0],
            'answers'     => json_decode($r[1] ?? '{}', true) ?: [],
            'completed'   => isset($r[2]) ? (int)$r[2] : 0,
        ];
    }
    $rec['answeredCount'] = count($rec['answers']);
    $records[] = $rec;
}

// Return newest first
$records = array_reverse($records);

echo json_encode([
    'success' => true,
    'found'   => count($records) > 0,
    'records' => $records
]);
?>
