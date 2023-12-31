let firstRequestBool = true;
let animation = null;
let choice = null;
let score = 0;

sendRequest();

function sendRequest() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    if (firstRequestBool == true) {
      firstRequest(this);
      firstRequestBool = false;
    } else {
      followingRequest(this);
    }
  }

  const currencies = [
    'usd', 'eur', 'gbp', 'cad', 'jpy', 'aud', 'chf', 'clp', 'sek', 'sgd', 
    'huf', 'uah', 'htg', 'dop', 'cny', 'isk', 'azn', 'uyu', 'ang', 'lbp', 
    'myr', 'irr', 'jod', 'php', 'xof', 'lyd', 'rsd', 'nzd', 'try', 'ngn', 
    'ars', 'nok', 'qar', 'czk', 'byn', 'crc', 'ves', 'bdt', 'ron', 'mdl', 
    'pyg', 'aed', 'idr', 'mxn', 'amd', 'brl', 'inr', 'npr', 'xaf', 'kgs', 
    'tmt', 'dkk', 'lkr', 'tnd', 'vnd', 'gel', 'pkr', 'bgn', 'rub', 'cop', 
    'sar', 'kzt', 'pab', 'bhd', 'egp', 'krw', 'dzd', 'bob', 'hkd', 'mad', 
    'zar', 'iqd', 'uzs', 'kwd', 'thb', 'twd', 'tjs', 'omr', 'ils', 'pen'
  ];

  xhttp.open("GET", "https://www.floatrates.com/daily/" + currencies[Math.floor(Math.random() * currencies.length)] + ".xml");
  xhttp.send();
}

let exchangeRate1 = null;
let exchangeRate2 = null;

function firstRequest(xml) {
  const xmlDoc = xml.responseXML;
  const x = xmlDoc.getElementsByTagName("item");

  let itemIndex = Math.floor(Math.random() * x.length);
  let baseName1 = x[itemIndex].getElementsByTagName("baseName")[0].childNodes[0].nodeValue;
  let targetName1 = x[itemIndex].getElementsByTagName("targetName")[0].childNodes[0].nodeValue;
  exchangeRate1 = x[itemIndex].getElementsByTagName("exchangeRate")[0].childNodes[0].nodeValue;
  let text1 = baseName1 + " --> " + targetName1 + " | " + exchangeRate1;
  document.getElementById("option1").innerHTML = text1;

  itemIndex = Math.floor(Math.random() * x.length);
  let baseName2 = x[itemIndex].getElementsByTagName("baseName")[0].childNodes[0].nodeValue;
  let targetName2 = x[itemIndex].getElementsByTagName("targetName")[0].childNodes[0].nodeValue;
  exchangeRate2 = x[itemIndex].getElementsByTagName("exchangeRate")[0].childNodes[0].nodeValue;
  let text2 = baseName2 + " --> " + targetName2;
  document.getElementById("option2").innerHTML = text2;
}

function followingRequest(xml) {
  const xmlDoc = xml.responseXML;
  const x = xmlDoc.getElementsByTagName("item");

  const aside = document.getElementById('aside');
  const main = document.getElementById('main');
  main.innerHTML += '<section id="3"><p id="option3"></p></section>';

  let itemIndex = Math.floor(Math.random() * x.length);
  let baseName3 = x[itemIndex].getElementsByTagName("baseName")[0].childNodes[0].nodeValue;
  let targetName3 = x[itemIndex].getElementsByTagName("targetName")[0].childNodes[0].nodeValue;
  let exchangeRate3 = x[itemIndex].getElementsByTagName("exchangeRate")[0].childNodes[0].nodeValue;
  let text3 = baseName3 + " --> " + targetName3;
  document.getElementById("option3").innerHTML = text3;

  let p2 = document.getElementById("option2");
  let p3 = document.getElementById("option3");
  let sectionLeft = document.getElementById("1");
  let sectionMiddle = document.getElementById("2");
  let sectionRight = document.getElementById("3");

  p2.innerHTML += " | " + exchangeRate2;
  let scoreText = document.getElementById("score");
  if((choice == 1 && exchangeRate2 >= exchangeRate1) || (choice == 0 && exchangeRate2 <= exchangeRate1)) {
    score += 1;
    aside.style.backgroundColor = "green";
    setTimeout(() => {
      aside.style.backgroundColor = "white";
    }, "500");
  } else {
    score = 0;
    aside.style.backgroundColor = "crimson";
    setTimeout(() => {
      aside.style.backgroundColor = "white";
    }, "500");

  }
  scoreText.innerHTML = "Score: " + score;
  exchangeRate1 = exchangeRate2;
  exchangeRate2 = exchangeRate3;

  setTimeout(() => {
    let pos = 0;
    clearInterval(animation);
    animation = setInterval(frame, 10);
    function frame() {
      if (pos == -50) {
        main.style.left = 0;
        sectionLeft.remove();
        sectionMiddle.id = "1";
        p2.id = "option1";
        sectionRight.id = "2";
        p3.id = "option2";
        sectionRight.innerHTML += '<button id="higher" onclick="pickButton(0), this.remove()">Higher</button><button id="lower" onclick="pickButton(1), this.remove()">Lower</button>';
        clearInterval(animation);
      } else {
        pos--;
        main.style.left = pos + '%';
      }
    }
  }, "2500");
}

function pickButton(elementID) {
  if(elementID == 1) {
    document.getElementById('higher').remove();
    choice = 0;
    sendRequest();
  } else if(elementID == 0) {
    document.getElementById('lower').remove();
    choice = 1;
    sendRequest();
  }
}
