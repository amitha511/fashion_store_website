var requestURL = 'https://api.exchangerate.host/latest';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    var response = request.response;
    console.log(response.rates.USD);
    document.getElementById("exchange").innerHTML = 'The Current Exchange rates is:<br>1 € =' + response.rates.USD + ' $<br>1 € =' + response.rates.ILS + ` Shekels`;

}