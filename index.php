<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XD</title>
</head>
<body>

<h2>Contenido de Xat</h2>
<div id="content">Cargando...</div>

<script>
    fetch('proxy.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => {
            document.getElementById('content').innerHTML = 'Error al cargar el contenido.';
            console.error('Error:', error);
        });
</script>

</body>
</html>
