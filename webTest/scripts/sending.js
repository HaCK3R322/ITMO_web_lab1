function check(x, y, r) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'checking.php', true);
  xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xmlhttp.send("X=" + encodeURIComponent(x) + "&Y=" + encodeURIComponent(y) + "&R=" + encodeURIComponent(r));
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      if(xmlhttp.status == 200) {
        var responseText = xmlhttp.responseText;
        if(responseText === "valid") {
          var resultText = document.getElementById('resultText');
          resultText.innerHTML = "Результат: ЕСТЬ ПРОБИТИЕ!";
        } else {
          var resultText = document.getElementById('resultText');
          resultText.innerHTML = "Результат: мимо";
        }
      }
    }
  };
}

function validate() {
  let X = document.getElementById("xSelect").value;
  let Y = document.getElementById("textBox").value;
  let R;

  let RArr = document.getElementsByName("R");
  for(var i = 0; i < RArr.length; i++) {
    if (RArr[i].type == "radio" && RArr[i].checked) {
            R = RArr[i].value;
        }
  }

  if(!isNaN(Y)) {
    if(Y <= -3 || Y >= 5) {
      let yString = String(Y);
      if(!(yString.substring(0, 4) === "-2.9" || yString.substring(0, 4) === "4.99")) {
        alert("Y out of range! Please change Y value. [Y range: (-3; 5)]");
      } else {
        check(X, Y, R);
      }
    } else {
      check(X, Y, R);
    }
  } else {
    alert("Please enter a number for Y .");
  }
}
