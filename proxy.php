<?php
$url = 'https://xat.com/content/web/R00207/box/embed.html';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

if ($response === FALSE) {
    echo 'Error al cargar el contenido.';
} else {
    echo $response;
}
?>
