<?php
if (isset($_POST)) {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $commets = $_POST["commets"];
    $res = "";

    $domian = $_SERVER["HTTP_HOST"];;
    $to = "kevincespedesalvares@gmail.com";
    $subject = "Contecto desde el formulario $domian: $subject";
    $message = "
    <p>
        Datos enviados desde el formulario <b>$domian</b>
        <ul>
            <li>Nombre: <b>$name</b> </li>
            <li>Email: <b>$email</b> </li>
            <li>Asunto: $subject </li>
            <li>Comentarios: $subject </li>
        </ul>
        
    </p>
    ";
    $headers =  "MIME-Version: 1.0\r\n" . "Content-Type:text/html; charset=utf-8\r\n" . "From: Envio Automático NO RESPONDER <no reply@$domian>";

    $send_mail = mail($to, $subject, $message, $headers);
    if ($send_mail) {
        $res = [
            "err" => false,
            "message" => "Tus datos han sido enviados"
        ];
    } else {
        $res = [
            "err" => true,
            "message" => "Error al enviar tus datos intente nuevamente"
        ];
    }
    header("Access-Control-Allow-Origin: *");
    header("Content-type: application/json");
    echo json_encode($res);
    exit;
}
