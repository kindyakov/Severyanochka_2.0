<?php
function createHtmlFile($filename, $content) {
    $directory = '../../assets/pages/types_pages/';
    $file = fopen($directory . $filename, 'w');
    fwrite($file, $content);
    fclose($file);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fileName = $_POST['fileName'] ?? '';
    $name = $_POST['name'] ?? '';
    $typeId = $_POST['typeId'] ?? '';

    // Проверка наличия необходимых параметров
    if (!empty($fileName) && !empty($name) && !empty($typeId)) {
        $templateFile = 'type.html';

        if (file_exists($templateFile)) {
            $templateContent = file_get_contents($templateFile);
            $htmlContent = str_replace(['{{name}}', '{{typeId}}'], [$name, $typeId], $templateContent);

            $filename = $fileName . '.html';
            createHtmlFile($filename, $htmlContent);
            echo "HTML-файл создан: $filename";
        } else {
            echo 'Ошибка: Файл с шаблоном не найден';
        }
    } else {
        echo 'Ошибка: Недостаточно данных для создания файла';
    }
} else {
    echo 'Ошибка: Неверный метод запроса';
}
?>
