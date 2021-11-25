<?php

$xarray = array(
  -5 => -5,
  -4 => -4,
  -3 => -3,
  -2 => -2,
  -1 => -1,
  0 => 0,
  1 => 1,
  2 => 2,
  3 => 3
);

$rarray = array(
  1 => 1,
  2 => 2,
  3 => 3,
  4 => 4,
  5 => 5
);

$X = $_POST['X'];
$Y = $_POST['Y'];
$R = $_POST['R'];

$result = "invalid";

if(in_array($X, $xarray) && in_array($R, $rarray) && (($Y > -3) && ($Y < 3))) {
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

} else {
  // header("'HTTP/1.0 404 not found'");
  http_response_code(400);
  $result = "hacking!";
}

echo $result;

?>
