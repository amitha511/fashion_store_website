


// var myHeaders = new Headers();
// myHeaders.append("apikey", "qwDK7b74HNtFN2eRq7y7Vif3lngg1thF");

// var requestOptions = {
//     method: 'GET',
//     redirect: 'follow',
//     headers: myHeaders
// };

// fetch("https://api.apilayer.com/currency_data/live?source=usd&currencies=eur", requestOptions)
//     .then(response => response.json())
//     .then(result => document.getElementById("exchange").innerHTML = 'The Current Exchange rates is:<br>1 USD =' + result.quotes.USDEUR + ` EUR`)
//     .catch(error => console.log('error', error));

var requestURL = 'https://api.exchangerate.host/latest';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function () {
    var response = request.response;
    console.log(response);
    document.getElementById("exchange").innerHTML += "The Current Exchange Rates: " + `<br>`;
    document.getElementById("exchange").innerHTML += "The Exchange Rate on the: " + response.date + ` is: <br>`;
    document.getElementById("exchange").innerHTML += "1 EUR = " + response.rates.USD + ` USD<br>`;
    document.getElementById("exchange").innerHTML += "1 EUR = " + response.rates.ILS + ` ILS<br><br><br>`;



}
var requestURL1 = 'https://api.exchangerate.host/2022-08-21';
var request1 = new XMLHttpRequest();
request1.open('GET', requestURL1);
request1.responseType = 'json';
request1.send();

request1.onload = function () {
    var response1 = request1.response;
    console.log(response1);
    document.getElementById("exchange").innerHTML += "Historical Exchange Rates: " + `<br>`;
    document.getElementById("exchange").innerHTML += "The Exchange Rate on the: " + response1.date + ` is: <br>`;
    document.getElementById("exchange").innerHTML += "1 EUR = " + response1.rates.USD + ` USD<br>`;
    document.getElementById("exchange").innerHTML += "1 EUR = " + response1.rates.ILS + ` ILS<br>`;

}
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
val1 = "2022-08-01"
today = yyyy + "-" + mm + "-" + dd;
var requestURL2 = "https://api.exchangerate.host/timeseries?start_date=" + val1 + "&end_date=" + today + "";
var request2 = new XMLHttpRequest();
request2.open('GET', requestURL2);
request2.responseType = 'json';
request2.send();

request2.onload = function () {
    var response2 = request2.response;
    console.log(response2);
    console.log(response2.rates.date);

}
