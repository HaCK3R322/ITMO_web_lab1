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
  let X;
  let XArr = document.getElementsByName("X");
  let xCheckedCount = 0; // count how much x was checked
  for(var i = 0; i < XArr.length; i++) {
    if(XArr[i].type == "checkbox" && XArr[i].checked) {
      X = XArr[i].value;
      xCheckedCount += 1;
    }
  }
  alert("x: " + X);

  let Y = document.getElementById("textBox").value;
  if(Y === "") {
    Y = 0;
  }
  alert("y: " + Y);

  let R;
  let RArr = document.getElementsByName("R");
  for(var i = 0; i < RArr.length; i++) {
    if (RArr[i].type == "radio" && RArr[i].checked) {
            R = RArr[i].value;
        }
  }
  alert("r: " + R)

  if(xCheckedCount == 1) {
    if(!isNaN(Y)) {
      if(Y <= -3 || Y >= 3) {
        let yString = String(Y);
        if(!(yString.substring(0, 4) === "-2.9" || yString.substring(0, 4) === "2.99")) {
          alert("Y out of range! Please change Y value. [Y range: (-3; 3)]");
        } else {
          check(X, Y, R);
        }
      } else {
        check(X, Y, R);
      }
    } else {
      alert("Please enter a number for Y .");
    }
  } else {
    alert("X must be checked 1 and only 1 time!")
  }
}
