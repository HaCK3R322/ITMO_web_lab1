<?php

$X = $_POST['X'];
$Y = $_POST['Y'];
$R = $_POST['R'];

$result = "invalid";

if($X >= 0 && $Y >= 0) {
  if(($X * $X) + ($Y * $Y) < ($R)*($R)) {
    $result = "valid";
  }
} elseif($X >= 0 && $Y <= 0) {
	if($X <= $R/2 && $Y > -$R) {
		$result = "valid";
	}
} elseif($X <= 0 && $Y <= 0) {
	if($X >= -$R && $Y >= -($X + R)) {
		$result = "valid";
	}
}

echo $result;

?>
