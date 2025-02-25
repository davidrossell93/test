<?php
$url = 'https://xat.com/content/web/R00207/box/embed.html';
$response = file_get_contents($url);
if ($response === FALSE) {
    echo 'Error al cargar el contenido.';
} else {
    echo $response;
}
?>
