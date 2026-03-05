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

$username        = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $_SESSION['username']);
$companyName     = $input['companyName'] ?? '';
$answers         = $input['answers'] ?? [];
$completed       = isset($input['completed']) ? (int)(bool)$input['completed'] : 0;
$replaceTimestamp = $input['replaceTimestamp'] ?? null; // null = new save, string = update existing

$dir = __DIR__ . '/progress';
if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

$file = $dir . '/' . $username . '.csv';

// Read existing records (handles both old format: companyName,answers,completed
// and new format: timestamp,companyName,answers,completed)
$existingRows = [];
if (file_exists($file)) {
    $rfp = fopen($file, 'r');
    if ($rfp !== false) {
        $allRows = [];
        while (($row = fgetcsv($rfp, 0, ',', '"', '\\')) !== false) $allRows[] = $row;
        fclose($rfp);
        if (count($allRows) >= 2) {
            $hasTimestamp = ($allRows[0][0] ?? '') === 'timestamp';
            for ($i = 1; $i < count($allRows); $i++) {
                $r = $allRows[$i];
                if ($hasTimestamp) {
                    if (count($r) >= 4 && $r[0] !== 'timestamp') $existingRows[] = $r;
                } else {
                    // Migrate old format: prepend placeholder timestamp
                    if (count($r) >= 2 && $r[0] !== 'companyName') {
                        $existingRows[] = ['(sin fecha)', $r[0], $r[1] ?? '{}', $r[2] ?? '0'];
                    }
                }
            }
        }
    }
}

// Update existing record in-place or append a new one
if ($replaceTimestamp !== null) {
    $updated = false;
    foreach ($existingRows as &$row) {
        if ($row[0] === $replaceTimestamp) {
            $row = [$replaceTimestamp, $companyName, json_encode($answers), $completed];
            $updated = true;
            break;
        }
    }
    unset($row);
    if (!$updated) {
        // Timestamp not found (edge case), just append
        $existingRows[] = [$replaceTimestamp, $companyName, json_encode($answers), $completed];
    }
} else {
    // New save: append with current timestamp
    $existingRows[] = [date('Y-m-d H:i:s'), $companyName, json_encode($answers), $completed];
}
if (count($existingRows) > 20) {
    $existingRows = array_slice($existingRows, -20);
}

// Write full file in new format
$fp = fopen($file, 'w');
if ($fp === false) {
    echo json_encode(['success' => false, 'message' => 'No se pudo abrir el archivo para escritura. Verifique los permisos del directorio.']);
    exit;
}
flock($fp, LOCK_EX);
fputcsv($fp, ['timestamp', 'companyName', 'answers', 'completed'], ",", '"', "\\");
foreach ($existingRows as $row) {
    fputcsv($fp, $row, ",", '"', "\\");
}
flock($fp, LOCK_UN);
fclose($fp);

echo json_encode(['success' => true]);
?>
