<?php
// Получение параметров из PUT запроса
$data = file_get_contents('php://input');

// Путь к файлу HTML, который нужно обновить
$filePath = 'path/to/file.html';

// Запись данных в файл
file_put_contents($filePath, $data);

// Отправка ответа клиенту
echo 'HTML файл успешно обновлен.';
?>