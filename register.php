<?php
// register.php
session_set_cookie_params(['httponly' => true, 'samesite' => 'Strict']);
session_start();
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    echo json_encode(['success' => false, 'message' => 'Datos inválidos.']);
    exit;
}

$username = trim($input['username'] ?? '');
$password = $input['password'] ?? '';
$regKey   = $input['regKey'] ?? '';

// Validate registration key (not stored, only checked)
if ($regKey !== 'Prevencion2026!') {
    echo json_encode(['success' => false, 'message' => 'Clave de registro incorrecta.']);
    exit;
}

// Validate username: 3-32 alphanumeric / underscore / hyphen
if (!preg_match('/^[a-zA-Z0-9_\-]{3,32}$/', $username)) {
    echo json_encode(['success' => false, 'message' => 'Usuario inválido (3-32 caracteres, solo letras, números, _ o -).']);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode(['success' => false, 'message' => 'La contraseña debe tener al menos 6 caracteres.']);
    exit;
}

$dataDir   = __DIR__ . '/data';
$usersFile = $dataDir . '/users.json';

if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
    file_put_contents($dataDir . '/.htaccess', "Deny from all\n");
}

// Load existing users with file lock
$fp = fopen($usersFile, 'c+');
if ($fp === false) {
    echo json_encode(['success' => false, 'message' => 'No se pudo acceder al archivo de usuarios.']);
    exit;
}
flock($fp, LOCK_EX);
$json  = stream_get_contents($fp);
$users = json_decode($json, true);
if (!is_array($users)) $users = [];

// Check uniqueness (case-insensitive)
foreach ($users as $u) {
    if (strtolower($u['username']) === strtolower($username)) {
        flock($fp, LOCK_UN);
        fclose($fp);
        echo json_encode(['success' => false, 'message' => 'El usuario ya existe.']);
        exit;
    }
}

// Add new user with bcrypt-hashed password
$users[] = [
    'username'      => $username,
    'password_hash' => password_hash($password, PASSWORD_BCRYPT)
];

// Overwrite file
ftruncate($fp, 0);
rewind($fp);
fwrite($fp, json_encode($users, JSON_PRETTY_PRINT));
flock($fp, LOCK_UN);
fclose($fp);

echo json_encode(['success' => true]);
?>
