<?php
if (isset($_FILES["file"])) {
    $name = $_FILES["file"]["name"];
    $file = $_FILES["file"]["tmp_name"];
    $error = $_FILES["file"]["error"];
    $destination = "../file/$name";
    $uploader = move_uploaded_file($file, $destination);

    if ($uploader) {
        $res = array(
            "error" => false,
            "status" => http_response_code(200),
            "statusText" => "El archivo $name se subió CORRECTAMENTE",
            "files" => $_FILES["file"]
        );
    } else {
        $res = array(
            "error" => true,
            "status" => http_response_code(400),
            "statusText" => "El archivo $name no se pudo CORRECTAMENTE",
            "files" => $_FILES["file"]
        );
    }
    echo json_encode($res);
}
