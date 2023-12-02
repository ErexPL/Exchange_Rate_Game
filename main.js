function createSectionsData() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    createSections(this);
  }
  xhttp.open("GET", "https://www.floatrates.com/daily/pln.xml");
  xhttp.send();
}

function createSections(xml) {
  const xmlDoc = xml.responseXML;
  const x = xmlDoc.getElementsByTagName("item");

  let itemIndex = Math.floor(Math.random() * x.length);
  let baseName1 = x[itemIndex].getElementsByTagName("baseName")[0].childNodes[0].nodeValue;
  let targetName1 = x[itemIndex].getElementsByTagName("targetName")[0].childNodes[0].nodeValue;
  let exchangeRate1 = x[itemIndex].getElementsByTagName("exchangeRate")[0].childNodes[0].nodeValue;
  let text1 = baseName1 + " --> " + targetName1 + " | " + exchangeRate1;
  document.getElementById("option1").innerHTML = text1;

  itemIndex = Math.floor(Math.random() * x.length);
  let baseName2 = x[itemIndex].getElementsByTagName("baseName")[0].childNodes[0].nodeValue;
  let targetName2 = x[itemIndex].getElementsByTagName("targetName")[0].childNodes[0].nodeValue;
  let exchangeRate2 = x[itemIndex].getElementsByTagName("exchangeRate")[0].childNodes[0].nodeValue;
  let text2 = baseName2 + " --> " + targetName2 + " | " + exchangeRate2;
  document.getElementById("option2").innerHTML = text2;
}

function moveSectionsData() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    moveSections(this);
  }
  xhttp.open("GET", "https://www.floatrates.com/daily/pln.xml");
  xhttp.send();
}

function moveSections(xml) {
  const xmlDoc = xml.responseXML;
  const x = xmlDoc.getElementsByTagName("item");

  const main = document.getElementById('main');
  main.innerHTML += '<section id="3"><p id="option3"></p></section>';

  let p2 = document.getElementById("option2");
  let p3 = document.getElementById("option3");
  let sectionLeft = document.getElementById("1");
  let sectionMiddle = document.getElementById("2");
  let sectionRight = document.getElementById("3");

  let itemIndex = Math.floor(Math.random() * x.length);
  let baseName3 = x[itemIndex].getElementsByTagName("baseName")[0].childNodes[0].nodeValue;
  let targetName3 = x[itemIndex].getElementsByTagName("targetName")[0].childNodes[0].nodeValue;
  let exchangeRate3 = x[itemIndex].getElementsByTagName("exchangeRate")[0].childNodes[0].nodeValue;
  let text3 = baseName3 + " --> " + targetName3 + " | " + exchangeRate3;
  document.getElementById("option3").innerHTML = text3;
  
  sectionLeft.remove();
  sectionMiddle.id = "1";
  p2.id = "option1";
  sectionRight.id = "2";
  p3.id = "option2";
}
