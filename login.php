<?php
// login.php
header('Content-Type: application/json');

// Permitir solicitudes desde el mismo origen
// Leer input JSON
$input = json_decode(file_get_contents('php://input'), true);

$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

// Credenciales hardcodeadas según instrucción
$validUser = "Qualitas";
$validPass = "Prevencion2026!";

if ($username === $validUser && $password === $validPass) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
}
?>