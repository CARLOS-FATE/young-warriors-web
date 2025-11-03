<?php
// admin/auth.php

$usuario_valido = 'admin';
$contrasena_valida = 'Warriors2025!'; 
// Si el usuario no ha enviado los datos de autenticación
if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
    header('WWW-Authenticate: Basic realm="Panel de Administración"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Acceso no autorizado.';
    exit;
} 
// Si los datos enviados no son correctos
else if ($_SERVER['PHP_AUTH_USER'] != $usuario_valido || $_SERVER['PHP_AUTH_PW'] != $contrasena_valida) {
    header('WWW-Authenticate: Basic realm="Panel de Administración"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Acceso no autorizado. Credenciales incorrectas.';
    exit;
}
// Si todo es correcto, el script continúa.
?>