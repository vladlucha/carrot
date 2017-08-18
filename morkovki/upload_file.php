<?php

function getExtension( $str ) {
	$i = strrpos( $str, "." );
	if ( ! $i ) {
		return "";
	}
	$l   = strlen( $str ) - $i;
	$ext = substr( $str, $i + 1, $l );

	return $ext;
}

$formats = array( "jpg", "png", "gif", "bmp", "jpeg", "PNG", "JPG", "JPEG", "GIF", "BMP" );

if ( isset( $_POST ) and $_SERVER['REQUEST_METHOD'] == "POST" ) {
	$name = $_FILES['file']['name'];
	$size = $_FILES['file']['size'];
	$tmp  = $_FILES['file']['tmp_name'];
	if ( strlen( $name ) ) {
		$ext = getExtension( $name );
		if ( in_array( $ext, $formats ) ) {
			if ( $size < ( 1024 * 1024 * 10 ) ) {
				$imgn = time() . "." . $ext;
				if ( move_uploaded_file( $tmp, "./uploads/" . $imgn ) ) {
					$res = [
						'success' => true,
						'msg' => 'Файл успешно загружен! <br> Можете приступать к <span class="up">заказу</span>',
						'file' => "./uploads/" . $imgn
					];
					echo json_encode($res);
				} else {
					$res = [
						'success' => false,
						'msg' => 'Ошибка загрузки.'
					];
					echo json_encode($res);
				}
			} else {
				$res = [
					'success' => false,
					'msg' => 'Максимальный размер файла 8 мб.'
				];
				echo json_encode($res);
			}
		} else {
			$res = [
				'success' => false,
				'msg' => 'Файл должен быть изображением.'
			];
			echo json_encode($res);
		}
	} else {
		$res = [
			'success' => false,
			'msg' => 'Пожалуйста, загрузите изображение.'
		];
		echo json_encode($res);
		exit;
	}
}
else {
	$res = [
		'success' => false,
		'msg' => 'Пожалуйста, загрузите изображение.'
	];
	echo json_encode($res);
	exit;
}
