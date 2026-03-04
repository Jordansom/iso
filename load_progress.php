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
while (($row = fgetcsv($fp)) !== false) {
    $rows[] = $row;
}
fclose($fp);

// Row 0 = header, Row 1 = data
if (count($rows) < 2) {
    echo json_encode(['success' => true, 'found' => false]);
    exit;
}

$data = $rows[1];
$companyName = $data[0] ?? '';
$answers     = json_decode($data[1] ?? '{}', true) ?: [];
$completed   = isset($data[2]) ? (int)$data[2] : 0;

echo json_encode([
    'success'     => true,
    'found'       => true,
    'companyName' => $companyName,
    'answers'     => $answers,
    'completed'   => $completed
]);
?>
