<?php
// proxy.php

// URL que deseas extraer
$url = 'https://xat.com/content/web/R00207/box/embed.html';

// Inicializa cURL
$ch = curl_init();

// Configura las opciones de cURL
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Para seguir redirecciones
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'); // User-Agent para evitar bloqueos
curl_setopt($ch, CURLOPT_TIMEOUT, 10); // Tiempo de espera para la conexión
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language: en-US,en;q=0.5',
]);

// Ejecuta la solicitud
$response = curl_exec($ch);

// Verifica si hubo un error
if (curl_errno($ch)) {
    echo 'Error: ' . curl_error($ch); // Muestra el error de cURL
} else {
    // Muestra el contenido obtenido
    echo $response;
}

// Cierra la conexión cURL
curl_close($ch);
?>
