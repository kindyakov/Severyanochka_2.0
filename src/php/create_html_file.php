<?php
$GLOBALS['parentDirectory'] = dirname(__DIR__);

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

            if ($rout === 'type') {
                $responseData = createTypeFile($fileName, $htmlContent);
            }
            if ($rout === 'product') {
                $responseData = createProductFile($fileName, $htmlContent, $nameType, $responseData);
            }
        } else {
            $responseData['errorMessage'] = "Ошибка: Файл с шаблоном $rout.html не найден";
        }
    } else {
        $responseData = [
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
    $responseData['errorMessage'] = "Ошибка: Неверный метод запроса";
}

function createFolder($fileName, $directory)
{
    if (!is_dir("$directory/$fileName")) {
        $result = mkdir("$directory/$fileName", 0777, true); // Создание папки с правами 0777
        if ($result) {
            $responseData['folderMessage'] = "Папка $fileName успешно создана;";
            return $responseData;
        } else {
            $responseData['errorMessage'] = "Ошибка: Не удалось создать папку $fileName; $result";
            return $responseData;
        }
    } else {
        $responseData['errorMessage'] = "Папка $fileName уже существует.";
        return $responseData;
    }
}

function createTypeFile($fileName, $content)
{
    $directory = $GLOBALS['parentDirectory'] . "\\catalog";
    $file = fopen("$directory\\$fileName.html", 'w');
    fwrite($file, $content);
    fclose($file);
    $responseData['htmlMessage'] = "HTML-файл создан: $fileName.html";
    // Создание папки
    $responseData = createFolder($fileName, $directory);
    return $responseData;
}

function createProductFile($fileName, $content,  $nameType, $responseData)
{
    $directory = $GLOBALS['parentDirectory'] . "\\catalog\\$nameType";
    if (is_dir($directory)) {
        $file = fopen("$directory\\$fileName.html", 'w');
        fwrite($file, $content);
        fclose($file);
        // $responseData['htmlMessage'] = "HTML-файл создан: $directory\\$fileName.html";
        $responseData['htmlMessage'] = "HTML-файл создан: $fileName.html";
        return $responseData;
    } else {
        $responseData['errorMessage'] =  "Ошибка: В директории {$GLOBALS['parentDirectory']}\catalog не существует папки $nameType";
        return $responseData;
    }
}

// Отправляем данные в формате JSON
header('Content-Type: application/json; charset=utf-8');
echo json_encode($responseData, JSON_UNESCAPED_UNICODE);
