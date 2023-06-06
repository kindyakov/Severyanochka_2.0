<?php
// Получение параметров из POST запроса
$data = json_decode(file_get_contents('php://input'), true);

// Извлечение параметров
$title = $data['title'];
$content = $data['content'];

// Путь к HTML файлу с разметкой
$htmlFilePath = 'path/to/html/file.html';

// Чтение содержимого HTML файла
$html = file_get_contents($htmlFilePath);

// Замена заполнителей на значения параметров
$html = str_replace('{{title}}', $title, $html);
$html = str_replace('{{content}}', $content, $html);

// Указание пути для сохранения файла
$filePath = 'path/to/save/my_file.html';

// Запись HTML содержимого в файл
$file = fopen($filePath, 'w');
fwrite($file, $html);
fclose($file);

// Отправка ответа клиенту
echo 'HTML файл создан.';
?>
