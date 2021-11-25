function showResults(x, y, r, result) {
  let results = document.getElementById("results");

  let tableContainer = document.createElement("div");
  tableContainer.setAttribute("id", "tableContainer");

  let table = document.createElement("table");
  tableContainer.appendChild(table);
  table.setAttribute("id", "resultTable");

  let row = table.insertRow(-1);
  let x_cell = row.insertCell(-1);
  let y_cell = row.insertCell(-1);
  let r_cell = row.insertCell(-1);
  let result_cell = row.insertCell(-1);

  if(y.toString().length > 5) {
    if(y > 0) {
      y = y.toString().substring(0, 5);
    } else {
      y = y.toString().substring(0, 6);
    }
  }

  x_cell.innerHTML = x;
  y_cell.innerHTML = y;
  r_cell.innerHTML = r;

  // results
  if(result === "valid") {
    result_cell.innerHTML = "ПОПАЛ";
    result_cell.setAttribute("style", "width:50%;color:green;");
    results.insertBefore(tableContainer, results.firstElementChild.nextSibling);
  } else if(result === "invalid") {
    result_cell.innerHTML = "МИМО";
    result_cell.setAttribute("style", "width:50%;color:red;");
    results.insertBefore(tableContainer, results.firstElementChild.nextSibling);
  } else {
    alert("НЕ ЛОМАЙ САЙТ ПЖ (выбирайте пожалуйста из предложенных значений!)");
  }
}

function check(x, y, r) {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'checking.php', true);
  xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xmlhttp.send("X=" + encodeURIComponent(x) + "&Y=" + encodeURIComponent(y) + "&R=" + encodeURIComponent(r));
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      if(xmlhttp.status == 200) {
        let responseText = xmlhttp.responseText;
        if(responseText === "valid") {
          let resultText = document.getElementById('resultText');
          resultText.innerHTML = "Результат: ЕСТЬ ПРОБИТИЕ!";
        } else {
          let resultText = document.getElementById('resultText');
          resultText.innerHTML = "Результат: мимо";
        }
        alert(responseText);
        showResults(x, y, r, responseText);
      } else {
        alert("Ошибка сервера!");
        document.location.href = "https://se.ifmo.ru/~s309629/404.html";
      }
    }
  };
}

function validate() {
  let X;
  let XArr = document.getElementsByName("X");
  let xCheckedCount = 0; // count how much x was checked
  for(let i = 0; i < XArr.length; i++) {
    if(XArr[i].type == "checkbox" && XArr[i].checked) {
      X = XArr[i].value;
      xCheckedCount += 1;
    }
  }

  let Y = document.getElementById("textBox").value;
  if(Y === "") {
    Y = 0;
  }

  let R;
  let RArr = document.getElementsByName("R");
  for(let i = 0; i < RArr.length; i++) {
    if (RArr[i].type == "radio" && RArr[i].checked) {
            R = RArr[i].value;
        }
  }

  if(xCheckedCount == 1) {
    Y = Y.toString().replace(",", ".");
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
