<?php

$X = $_POST['X'];
$Y = $_POST['Y'];
$R = $_POST['R'];

$result = "invalid";

if($X >= 0 && $Y >= 0) {
  if(($X * $X) + ($Y * $Y) < ($R/2)*($R/2)) {
    $result = "valid";
  }
} elseif($X <= 0 && $Y >= 0) {
	if($X > -1*$R && $Y < $R) {
		$result = "valid";
	}
} elseif($X <= 0 && $Y <= 0) {
	if($X > -$R/-2 && $Y > (-2*$X - $R)) {
		$result = "valid";
	}
}

echo $result;

?>
