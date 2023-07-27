<?php
$GLOBALS['parentDirectory'] = dirname(__DIR__);
$GLOBALS['responseData'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $fileName = $data['fileName'] ?? '';
    $name = $data['name'] ?? '';
    $id = $data['id'] ?? '';
    $rout = $data['rout'] ?? '';
    $nameType = $data['nameType'] ?? '';
    // Проверка наличия необходимых параметров
    if (!empty($fileName) && !empty($name) && !empty($id) && !empty($rout)) {
        $templateFile = $GLOBALS['parentDirectory'] . "\\php\\html\\$rout.html";

        if (file_exists($templateFile)) {
            $templateContent = file_get_contents($templateFile);
            $htmlContent = str_replace(["{{name}}", "{{id}}"], [$name, $id], $templateContent);

            $rout === 'type' && createTypeFile($fileName, $htmlContent);
            $rout === 'product' && createProductFile($fileName, $htmlContent, $nameType);

            $$GLOBALS['responseData']['htmlMessage'] = "HTML-файл создан: $fileName.html";
        } else {
            $$GLOBALS['responseData']['errorMessage'] = "Ошибка: Файл с шаблоном $rout.html не найден";
        }
    } else {
        $$GLOBALS['responseData'] = [
            'errorMessage' => "Ошибка: Недостаточно данных для создания файла",
            'data' => [
                'fileName' => $fileName,
                'name' =>  $name,
                'id' => $id,
                'rout' => $rout,
                '$nameType' => $nameType,
            ],
        ];
    }
} else {
    $$GLOBALS['responseData']['errorMessage'] = "Ошибка: Неверный метод запроса";
}

function createFolder($fileName, $directory)
{
    if (!is_dir("$directory/$fileName")) {
        $result = mkdir("$directory/$fileName", 0777, true); // Создание папки с правами 0777
        if ($result) {
            $$GLOBALS['responseData']['folderMessage'] = "Папка $fileName успешно создана;";
        } else {
            $$GLOBALS['responseData']['folderMessage'] = "Ошибка: Не удалось создать папку $fileName; $result";
        }
    } else {
        $$GLOBALS['responseData']['folderMessage'] = "Папка $fileName уже существует.";
    }
}

function createTypeFile($fileName, $content)
{
    $directory = $GLOBALS['parentDirectory'] . "\\catalog";
    $file = fopen("$directory\\$fileName.html", 'w');
    fwrite($file, $content);
    fclose($file);
    // Создание папки
    createFolder($fileName, $directory);
}

function createProductFile($fileName, $content,  $nameType)
{
    // Сделать проверку на существование папки предже чем там создавать файл
    $directory = $GLOBALS['parentDirectory'] . "\\catalog\\$nameType";
    $file = fopen("$directory\\$fileName.html", 'w');
    fwrite($file, $content);
    fclose($file);
    if (is_dir($directory)) {
        $$GLOBALS['responseData']['htmlMessage'] = "HTML-файл создан: $directory\\$fileName.html.html";
    } else {
        $$GLOBALS['responseData']['errorMessage'] =  "Ошибка: В дириктории '../catalog/' не существует папки $nameType";
    }
}

// Отправляем данные в формате JSON
header('Content-Type: application/json; charset=utf-8');
echo json_encode($$GLOBALS['responseData'], JSON_UNESCAPED_UNICODE);
