<?php
// login.php
session_set_cookie_params(['httponly' => true, 'samesite' => 'Strict']);
session_start();
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$username = trim($input['username'] ?? '');
$password = $input['password'] ?? '';

$usersFile = __DIR__ . '/data/users.json';

if (!file_exists($usersFile)) {
    echo json_encode(['success' => false, 'message' => 'No hay usuarios registrados. Regístrese primero.']);
    exit;
}

$users = json_decode(file_get_contents($usersFile), true) ?: [];

foreach ($users as $u) {
    if (strtolower($u['username']) === strtolower($username)) {
        if (password_verify($password, $u['password_hash'])) {
            $_SESSION['username'] = $u['username'];
            echo json_encode(['success' => true]);
            exit;
        }
        break;
    }
}

echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
?>