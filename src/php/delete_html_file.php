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

    if ($rout === 'type') {
      $responseData = deleteTypeFile($fileName);
    }
    if ($rout === 'product') {
      $responseData = deleteProductFile($fileName, $nameType, $responseData);
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

function deleteDirectories($folderNames)
{
  foreach ($folderNames as $folderName) {
    $dir = $GLOBALS['parentDirectory'] . "\\catalog\\$folderName";
    if (is_dir($dir)) {
      $files = scandir($dir);
      foreach ($files as $file) {
        if ($file != '.' && $file != '..') {
          $filePath = $dir . '/' . $file;
          if (is_dir($filePath)) {
            deleteDirectories([$filePath]); // Рекурсивно удалить вложенную папку
          } else {
            unlink($filePath); // Удалить файл
          }
        }
      }
      rmdir($dir); // Удалить пустую папку
    }
  }
}

function deleteTypeFile($fileName)
{
  $directory = $GLOBALS['parentDirectory'] . "\\catalog\\$fileName";
  if (file_exists($$directory . '.html')) {
    if (unlink($directory . '.html')) {
      $responseData['htmlMessage'] = "HTML-файл $fileName.html успешно удален.";
    } else {
      $responseData['errorMessage'] =  "Ошибка: Не удалось удалить файл $fileName.html.";
    }
  } else {
    $responseData['errorMessage'] =  "Ошибка: Файл $fileName.html не существует.";
  }
  // Удаление папки
  if (deleteDirectories($directory)) {
    $responseData['folderMessage'] = "Папка $fileName успешна удалена";
  } else {
    $responseData['errorMessage'] =  "Ошибка: Не удалось удалить папку $fileName.";
  }
  return $responseData;
}

function deleteProductFile($fileName, $nameType, $responseData)
{
  $directory = $GLOBALS['parentDirectory'] . "\\catalog\\$nameType";
  if (is_dir($directory)) {

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
