function preLoad() {
    $(document).ready(function () {
        $("#bodyPageHome").empty();
        $("#com").empty();
        $("#company").empty();
        $("#price").empty();
    });
}

function ShowHomePage() {
    $(document).ready(function () {
        preLoad();
        $("#bodyPageHome").load("home.html");
        console.log("load home page");

    });
}

function ShowChatPage() {
    $(document).ready(function () {
        preLoad();
        $("#com").load("chat.html");
        console.log("load chat page");

    });
}

function ShowSearchPage() {
    $(document).ready(function () {
        preLoad();
        $("#com").load("search.html");
        console.log("load search page");
    });
}

function ShowCatalogPage() {
    $(document).ready(function () {
        preLoad();
        $("#com").load("catalog.html");
        console.log("load catalog page");
    });
}

function ShowLogInPage() {
    $(document).ready(function () {
        preLoad();
        $("#com").load("password.html");  // need to build html
        console.log("load Log In page");

    });
}

function ShowSingnupPage() {
    $(document).ready(function () {
        preLoad();
        $("#com").load("admin.html");   //need to build html
        console.log("load Sign up page");

    });
}

function ShowCartPage() {
    $(document).ready(function () {
        preLoad();
        $("#com").load("cart.html");
        console.log("load cart page");

    });
}
// Filter number 1 - by gender, size, category
// Filter number 1 - by gender, size, category
function ShowCatalog1(val1, val2, val3) {

    $.get("catalogarr", function (data, status) {
        $("#company").empty();
        $("#price").empty();
        let count = 0;
        let UserGender = val1
        let UserSize = val2;
        let UserCategory = val3;
        console.log(val1);
        console.log(val2);
        console.log(val3);
        for (let i = 0; i < data.length; i++) {
            if ((UserSize == data[i].size || UserSize == "all") && (UserGender == data[i].gender || UserGender == "all") && (UserCategory == data[i].category || UserCategory == "all")) {
                $("#company").append(`<p id="proname"><b><Company:</b></font> ${data[i].company}</p> <p><b>Price:</b>${data[i].price}$</p>
                <p><b>Color: </b>${data[i].color}</p>
                <p><b>Size: </b>${data[i].size}</p>
                <p><b>Gender: </b>${data[i].gender}</p>
                <p><b>Category: </b>${data[i].category}</p>`);
                var col = document.getElementById('company');
                col.innerHTML += '<button onclick="AddCart(' + i + ')">Add To Cart</button>';
                document.getElementById("price").innerHTML += `<p><img id="image_` + i + `" class="pic"/></p><br><br><br><br><br>`;
                $("#image" + "_" + i).attr("src", data[i].imageUrl);
                $("#image" + "_" + i).attr("width", "300px");
                $("#image" + "_" + i).attr("height", "195px");
                count++;
                
            }
        }
        if (count == 0) {
            $("#company").append("Sorry! There are 0 results to your search. Please try again!");
        }

    });

}
function ShowCatalog2(val1, val2, val3) {
    $.get("catalogarr", function (data, status) {
        $("#company").empty();
        $("#price").empty();
        console.log(val1);
        console.log(val2);
        console.log(val3);
        let count = 0;
        let UserCompany = val1;
        let UserPrice = val2;
        let UserColor = val3;
        for (let i = 0; i < data.length; i++) {
            if ((UserPrice >= data[i].price || UserPrice == "all") && (UserCompany == data[i].company || UserCompany == "all") && (UserColor == data[i].color || UserColor == "all")) {
                $("#company").append(`<p id="proname"><b><Company:</b></font> ${data[i].company}</p> <p><b>Price:</b>${data[i].price}$</p>
                <p><b>Color: </b>${data[i].color}</p>
                <p><b>Size: </b>${data[i].size}</p>
                <p><b>Gender: </b>${data[i].gender}</p>
                <p><b>Category: </b>${data[i].category}</p>`);
                var col = document.getElementById('company');
                col.innerHTML += '<button onclick="AddCart(' + i + ')">Add To Cart</button>';
                document.getElementById("price").innerHTML += `<p><img id="image_` + i + `" class="pic"/></p><br><br><br>`;
                $("#image" + "_" + i).attr("src", data[i].imageUrl);
                $("#image" + "_" + i).attr("width", "300px");
                $("#image" + "_" + i).attr("height", "195px");
                count++;
            }
        }
        console.log(count);
        if (count == 0) {
            $("#company").append("Sorry! There are 0 results to your search. Please try again!");
        }

    });

}
function AddCart(i) {
    let index = i;
    console.log(i);
    $.get("catalogarr", function (data, status) {
        console.log(i);
        document.getElementById("com").getElementsByClassName("cart-product-title")[0].innerHTML += `<p id="proname"><b><Company:</b></font> ${data[i].company}</p> <p><b>Price:</b>${data[i].price}$</p>
        <p><b>Color: </b>${data[i].color}</p>
        <p><b>Size: </b>${data[i].size}</p>
        <p><b>Gender: </b>${data[i].gender}</p>
        <p><b>Category: </b>${data[i].category}</p>`;
        document.getElementById("com").getElementsByClassName("cart-product-title")[0].innerHTML += `<p><img id="img_` + i + `" class="pic1"/></p>`;
        $("#img" + "_" + i).attr("src", data[i].imageUrl);
        $("#img" + "_" + i).attr("width", "150px");
        $("#img" + "_" + i).attr("height", "100px");
        document.getElementById("com").getElementsByClassName("cart-product-title")[0].innerHTML += `<button id="botton_` + i + `" onclick="Remove(` + i + `)">Remove</button><br><br><br>`;
    });

}
function Remove(i) {
    $("com").empty();

}


function AdminLogIn() {
    $("#wrong").empty();
    var user = document.getElementById('userAdmin').value;
    var pass = document.getElementById('passAdmin').value;
    var us = 'app';
    var pa = '555';
    console.log(user.localeCompare(us));
    if (!(user.localeCompare(us) && pass.localeCompare(pa))) {
        ShowSingnupPage();
    }
    else {
        $("#wrong").append('<p id="red" >The username or password is wrong</p>');
        console.log("The username or password is wrong");
    }
}



