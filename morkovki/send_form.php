<?php
require_once 'phpmailer/PHPMailerAutoload.php';

if ( isset( $_POST['form'] ) and $_SERVER['REQUEST_METHOD'] == "POST" ) {

	$formArr = array();
	parse_str($_POST['form'], $formArr);

	$mail = new PHPMailer;

	//$mail->SMTPDebug = 3;                               // Enable verbose debug output

	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'noreply@xn--80adxbhmbo.xn--d1acj3b';                 // SMTP username
	$mail->Password = 'A8YMtvjhMHKiLy9';                           // SMTP password
	$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 465;
	$mail->CharSet = 'UTF-8';// TCP port to connect to

	$mail->setFrom('noreply@xn--80adxbhmbo.xn--d1acj3b', 'Команда Морковка.дети');
	//$mail->addAddress('mail@pavelandrianov.ru');     // Add a recipient
	$mail->addAddress('morkovka.deti@yandex.ru');

	$mail->addAttachment(dirname(__FILE__) . trim($formArr['file_url'], '.'));         // Add attachments
	$mail->isHTML(true);                                  // Set email format to HTML

	$mail->Subject = 'Новый заказ на сайте Морковка.дети';

	$body  = 'На сайте Морковка.дети создан новый заказ.<br><br>';
	$body .= '<strong>ФИО</strong>: ' . $formArr['last_name'] . ' ' . $formArr['last_name'] . ' ' . $formArr['middle_name'] . '.<br>';
	$body .= '<strong>Телефон</strong>: ' . $formArr['phone'] . '.<br>';
	$body .= '<strong>Адрес</strong>: ' . $formArr['address'] . '.<br>';
	$body .= '<strong>Способ оплаты</strong>: ' . $formArr['payment'] . '.<br><br>';
	$body .= '<strong>Макет прикреплен во вложении к письму.</strong><br><br>';

	$mail->Body = $body;

	if(!$mail->send()) {
		echo 'Не удалось отправить сообщение: ' . $mail->ErrorInfo;
	} else {
		echo 'Ваш заказ принят, мы свяжемся с вами в ближайшее время.';
		unlink(dirname(__FILE__) . trim($formArr['file_url'], '.'));
	}
	die;
}
