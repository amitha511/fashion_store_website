/* ----Exchange Api----- */
var requestURL1 = 'https://api.exchangerate.host/2022-08-23';
var request1 = new XMLHttpRequest();
request1.open('GET', requestURL1);
request1.responseType = 'json';
request1.send();

request1.onload = function () {
    var response1 = request1.response;
    console.log(response1);
    document.getElementById("exchange").innerHTML += `<b>Historical Exchange Rates: </b>` + `<br>`;
    document.getElementById("exchange").innerHTML += `<b>The Exchange Rate on the: ` + response1.date + ` is: </b><br>`;
    document.getElementById("exchange").innerHTML += "1 EUR = " + response1.rates.USD + ` USD<br>`;
    document.getElementById("exchange").innerHTML += "1 EUR = " + response1.rates.ILS + ` ILS<br>`;
    var requestURL2 = 'https://api.exchangerate.host/2022-08-24';
    var request2 = new XMLHttpRequest();
    request2.open('GET', requestURL2);
    request2.responseType = 'json';
    request2.send();

    request2.onload = function () {
        var response2 = request2.response;
        console.log(response2);
        document.getElementById("exchange").innerHTML += `<b>The Exchange Rate on the: ` + response2.date + ` is: </b><br>`;
        document.getElementById("exchange").innerHTML += "1 EUR = " + response2.rates.USD + ` USD<br>`;
        document.getElementById("exchange").innerHTML += "1 EUR = " + response2.rates.ILS + ` ILS<br>`;

    }
    var requestURL3 = 'https://api.exchangerate.host/2022-08-25';
    var request3 = new XMLHttpRequest();
    request3.open('GET', requestURL3);
    request3.responseType = 'json';
    request3.send();

    request3.onload = function () {
        var response3 = request3.response;
        console.log(response3);
        document.getElementById("exchange").innerHTML += `<b>The Exchange Rate on the: ` + response3.date + ` is: </b><br>`;
        document.getElementById("exchange").innerHTML += "1 EUR = " + response3.rates.USD + ` USD<br>`;
        document.getElementById("exchange").innerHTML += "1 EUR = " + response3.rates.ILS + ` ILS<br>`;

    }

}
