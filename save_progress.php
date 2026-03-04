<?php
// save_progress.php
session_set_cookie_params(['httponly' => true, 'samesite' => 'Strict']);
session_start();
header('Content-Type: application/json');

if (empty($_SESSION['username'])) {
    echo json_encode(['success' => false, 'message' => 'No autenticado.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    echo json_encode(['success' => false, 'message' => 'Datos inválidos.']);
    exit;
}

$username   = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $_SESSION['username']);
$companyName = $input['companyName'] ?? '';
$answers     = $input['answers'] ?? [];
$completed   = isset($input['completed']) ? (int)(bool)$input['completed'] : 0;

$dir = __DIR__ . '/progress';
if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

$file = $dir . '/' . $username . '.csv';

// Build CSV rows: header + one data row
$rows = [];
$rows[] = ['companyName', 'answers', 'completed'];
$rows[] = [
    $companyName,
    json_encode($answers),
    $completed
];

$fp = fopen($file, 'w');
if ($fp === false) {
    echo json_encode(['success' => false, 'message' => 'No se pudo abrir el archivo para escritura. Verifique los permisos del directorio.']);
    exit;
}
flock($fp, LOCK_EX);
foreach ($rows as $row) {
    fputcsv($fp, $row);
}
flock($fp, LOCK_UN);
fclose($fp);

echo json_encode(['success' => true]);
?>
