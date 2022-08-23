let count = 0;
let ClientId = 0;
//---Load Pages - Begin to Index---
function preLoad() {
    $(document).ready(function () {
        $("#bodyPageHome").empty();
        $("#com").empty();
        $("#loadDiv").empty();
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
        $("#exchange").empty();
        console.log("load chat page");

    });
}

function ShowSearchPage() {
    $(document).ready(function () {
        preLoad();
        $("#exchange").empty();
        $("#com").load("search.html");
        console.log("load search page");
    });
}
function ShowCatalogPage() {
    $(document).ready(function () {
        preLoad();
        $("#com").load("catalog.html");
        count = 1;
        console.log("load catalog page");
    });
}

function ShowLogInPage() {
    $(document).ready(function () {
        preLoad();
        $("#com").load("password.html");
        console.log("load Log In page");

    });
}
function ShowAdminPage() {
    $(document).ready(function () {
        preLoad();
        $("#com").load("admin.html");
        console.log("load admin page");

    });
}
/*-----------------------------------------Catalog Page -----------------------------------------*/
// Search Button number 1 - by gender, size, category
function ShowCatalog1(val1, val2, val3) {

    $.get("catalogarr", function (data, status) {
        $("#loadDiv").empty();
        $("#price").empty();
        let count = 0;
        let UserGender = val1;
        let UserSize = val2;
        let UserCategory = val3;
        console.log(val1);
        console.log(val2);
        console.log(val3);
        for (let i = 0; i < data.length; i++) {
            if ((UserSize == data[i].size || UserSize == "all") && (UserGender == data[i].gender || UserGender == "all") && (UserCategory == data[i].category || UserCategory == "all")) {
                $("#loadDiv").append(`<p id="proname"><b><Company:</b></font> ${data[i].company}</p> <p><b>Price:</b>${data[i].price}$</p>
                <p><b>Color: </b>${data[i].color}</p>
                <p><b>Size: </b>${data[i].size}</p>
                <p><b>Gender: </b>${data[i].gender}</p>
                <p><b>Category: </b>${data[i].category}</p>`);
                var col = document.getElementById('loadDiv');
                col.innerHTML += '<button class="btn-add" onclick="AddCart(' + i + ')">Add To Cart</button>';
                document.getElementById("price").innerHTML += `<p><img id="image_` + i + `" class="pic"/></p><br><br><br>`;
                $("#image" + "_" + i).attr("src", data[i].imageUrl);
                $("#image" + "_" + i).attr("width", "300px");
                $("#image" + "_" + i).attr("height", "195px");
                count++;
            }
        }
        if (count == 0) {
            $("#loadDiv").append("Sorry! There are 0 results to your search. Please try again!");
        }

    });

}
// Search Button number 2 - by maxPrice, company, color
function ShowCatalog2(val1, val2, val3) {
    $.get("catalogarr", function (data, status) {
        $("#loadDiv").empty();
        $("#price").empty();
        console.log(val1);
        console.log(val2);
        console.log(val3);
        let count = 0;
        let UserCompany = val1;
        let UserPrice = val2;
        let UserColor = val3;
        for (let i = 0; i < data.length; i++) {
            if ((parseInt(UserPrice) >= parseInt(data[i].price) || UserPrice == "all") && (UserCompany == data[i].company || UserCompany == "all") && (UserColor == data[i].color || UserColor == "all")) {
                $("#loadDiv").append(`<p id="proname"><b><Company:</b></font> ${data[i].company}</p> <p><b>Price:</b>${data[i].price}$</p>
                <p><b>Color: </b>${data[i].color}</p>
                <p><b>Size: </b>${data[i].size}</p>
                <p><b>Gender: </b>${data[i].gender}</p>
                <p><b>Category: </b>${data[i].category}</p>`);
                var col = document.getElementById('loadDiv');
                col.innerHTML += '<button class="btn-add" onclick="AddCart(' + i + ')">Add To Cart</button>';
                document.getElementById("price").innerHTML += `<p><img id="image_` + i + `" class="pic"/></p><br><br><br>`;
                $("#image" + "_" + i).attr("src", data[i].imageUrl);
                $("#image" + "_" + i).attr("width", "300px");
                $("#image" + "_" + i).attr("height", "195px");
                count++;
            }
        }
        console.log(count);
        if (count == 0) {
            $("#loadDiv").append("Sorry! There are 0 results to your search. Please try again!");
        }

    });

}
//Add to cart Button - Add Product to the cart
const indexes = [];
function AddCart(i) {
    let index = i;
    console.log(i);
    keepGood = 0;
    $.get("catalogarr", function (data, status) {
        console.log(i);
        if (indexes[i] == 1) {
            console.log("Second Time");
            PlusQuantity(i);
        }
        if (indexes[i] == undefined) {
            document.getElementById("com").getElementsByClassName("cart-product-title")[0].innerHTML += `<div class="item_` + i + `"><p><b><Company:</b></font> ${data[i].company}<b></p><p>Price:</b>${data[i].price}$</p></div>`;
            document.getElementById("com").getElementsByClassName("cart-product-title")[0].innerHTML += `<div class="item_` + i + `"><p><img id="img_` + i + `" class="pic1"/></p></div>`;
            $("#img" + "_" + i).attr("src", data[i].imageUrl);
            $("#img" + "_" + i).attr("width", "150px");
            $("#img" + "_" + i).attr("height", "100px");
            document.getElementById("com").getElementsByClassName("cart-product-title")[0].innerHTML += `<div class="item_` + i + `"><button class="btn-rmv" id="botton_` + i + `" onclick="Remove(` + i + `)">Remove</button></div><br>`;
            document.getElementById("com").getElementsByClassName("cart-product-title")[0].innerHTML += `<div class="item_` + i + `" id="quan"><button class="btn-minus-btn" type="button" onclick="MinusQuantity(` + i + `)">-</button><div class="pin_` + i + `">1</div>
            <button class="btn-plus-btn" type="button" onclick="PlusQuantity(` + i + `)">+</button></div>`;
            let sum = parseInt(document.getElementById("com").getElementsByClassName("cart-total")[0].innerHTML) + parseInt(data[i].price);
            document.getElementById("com").getElementsByClassName("cart-total")[0].innerHTML = sum;
            console.log("the sum" + sum);
            indexes[i] = 1;
        }
        if (indexes[i] != undefined && indexes[i] != 1) {
            document.getElementById("com").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[0].innerHTML += `<p><b><Company:</b></font> ${data[i].company}<b></p><p>Price:</b>${data[i].price}$</p>`;
            document.getElementById("com").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[1].innerHTML += `<p><img id="img_` + i + `" class="pic1"/></p>`;
            $("#img" + "_" + i).attr("src", data[i].imageUrl);
            $("#img" + "_" + i).attr("width", "150px");
            $("#img" + "_" + i).attr("height", "100px");
            document.getElementById("com").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[2].innerHTML += `<button class="btn-rmv" id="botton_` + i + `" onclick="Remove(` + i + `)">Remove</button></div>`;
            document.getElementById("com").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].innerHTML += `<button class="btn-minus-btn" type="button" onclick="MinusQuantity(` + i + `)">-</button> <div class="pin_` + i + `">1</div>
            <button class="btn-plus-btn" type="button" onclick="PlusQuantity(` + i + `)">+</button>`;
            let sum = parseInt(document.getElementById("com").getElementsByClassName("cart-total")[0].innerHTML) + parseInt(data[i].price);
            document.getElementById("com").getElementsByClassName("cart-total")[0].innerHTML = sum;
            console.log("the sum" + sum);
            indexes[i] = 1;

        }

    });
}
//Remove Button - Remove Product from the cart
function Remove(i) {
    if (indexes[i] == 1) {
        indexes[i] = 0;
    }
    let Quantity = parseInt(document.getElementById("com").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].getElementsByClassName("pin_" + i)[0].innerHTML);
    document.getElementById("com").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[0].innerHTML = "";
    document.getElementById("com").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[1].innerHTML = "";
    document.getElementById("com").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[2].innerHTML = "";
    document.getElementById("com").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].innerHTML = "";
    $.get("catalogarr", function (data, status) {
        let sum = parseInt(document.getElementById("com").getElementsByClassName("cart-total")[0].innerHTML) - (parseInt(data[i].price) * Quantity);
        document.getElementById("com").getElementsByClassName("cart-total")[0].innerHTML = sum;
        console.log("the sum" + sum);
    });




}
//Minus Button - Decrease the amount of Product
function MinusQuantity(i) {
    let value = parseInt(document.getElementById("com").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].getElementsByClassName("pin_" + i)[0].innerHTML);
    if (value == 1)
        Remove(i);
    else {
        $.get("catalogarr", function (data, status) {
            let sum = parseInt(document.getElementById("com").getElementsByClassName("cart-total")[0].innerHTML) - parseInt(data[i].price);
            document.getElementById("com").getElementsByClassName("cart-total")[0].innerHTML = sum;
            --value;
            // alert(value);
            document.getElementById("com").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].getElementsByClassName("pin_" + i)[0].innerHTML = value;
        });
    }


}
//Plus Button - Increase the amount of product
function PlusQuantity(i) {
    let value = parseInt(document.getElementById("com").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].getElementsByClassName("pin_" + i)[0].innerHTML);
    $.get("catalogarr", function (data, status) {
        let sum = parseInt(document.getElementById("com").getElementsByClassName("cart-total")[0].innerHTML) + parseInt(data[i].price);
        document.getElementById("com").getElementsByClassName("cart-total")[0].innerHTML = sum;
        ++value;
        // alert(value);
        document.getElementById("com").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].getElementsByClassName("pin_" + i)[0].innerHTML = value;
    });
}
//Buy Now Button - Add the Products to the Shoppings DB
function BuyNow() {
    let flag = 0
    document.getElementById("com").getElementsByClassName("cart")[0].getElementsByClassName("userAlert")[0].innerHTML = "";
    document.getElementById("com").getElementsByClassName("cart")[0].getElementsByClassName("userAlert2")[0].innerHTML = "";
    let fileduserID = document.getElementById("com").getElementsByClassName("cart")[0].getElementsByClassName("un")[0].value;
    let filedPrice = document.getElementById("com").getElementsByClassName("cart-total")[0].innerHTML;
    if (fileduserID == "") {
        document.getElementById("com").getElementsByClassName("cart")[0].getElementsByClassName("userAlert")[0].innerHTML = "This is Required Filed" + `<br>`;
        flag = 1;
    }
    if (filedPrice == "0") {
        document.getElementById("com").getElementsByClassName("cart")[0].getElementsByClassName("userAlert2")[0].innerHTML = " Your Cart is Empty";
        flag = 1;
    }
    var user = fileduserID;
    var gender = 1;
    var category = 1;
    if (flag != 1) {
        $.get("catalogarr", function (data, status) {
            for (let i = 0; i < data.length; i++) {
                if (indexes[i] == 1) {
                    let value = parseInt(document.getElementById("com").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].getElementsByClassName("pin_" + i)[0].innerHTML);
                    if (data[i].gender == "female") {
                        gender = -1 * value;
                    }
                    else {
                        gender = 1 * value;
                    }
                    if (data[i].category == "plaid") {
                        category = -1 * value;
                    }
                    else {
                        category = 1 * value;
                    }
                    $.post("http://localhost:8080/form", { user: user, productId: data[i]._id, company: data[i].company, price: data[i].price, quantity: value, category: category, gender: gender }, function (data) {
                    });
                }
            }
        });
        alert("Shopping Completed!");
        ClearCart();
    }
}
//After Buy now Clears the Cart;
function ClearCart() {
    $.get("catalogarr", function (data, status) {
        for (let i = 0; i < data.length; i++) {
            if (indexes[i] == 1) {
                Remove(i);
            }

        }
        var cId = document.getElementById("com").getElementsByClassName("cart")[0].getElementsByClassName("un")[0].value;
        document.getElementById("com").getElementsByClassName("cart")[0].getElementsByClassName("un")[0].value = "";
        OfferSuggest(cId);
    });
}
//After Buy, Suggest product based on Price,Category,Gender
function OfferSuggest(id) {
    var category;
    var max;
    var gender;
    console.log("id" + id);
    $.get("offer", function (data, status) {
        for (let i = 0; i < data.length; i++) {
            if (id == data[i]._id) {
                max = parseInt(data[i].MaxSaleAmount);
                category = parseInt(data[i].avgCategory);
                gender = data[i].avgGender;
            }
        }
    });
    $.get("catalogarr", function (data, status) {
        $("#loadDiv").empty();
        $("#price").empty();
        var cat;
        var gen;
        console.log("Gender Value" + gender);
        if (gender < 0) {
            gen = "female";
        }
        else {
            gen = "male";
        }
        console.log("category Value" + category);
        if (category < 0) {
            cat = "plaid";
        }
        else {
            cat = "t-shirt";
        }
        for (let i = 0; i < data.length; i++) {
            if ((parseInt(max) >= parseInt(data[i].price)) && (cat == data[i].category) && (gen == data[i].gender)) {
                $("#loadDiv").append(`<p id="proname"><b><Company:</b></font> ${data[i].company}</p> <p><b>Price:</b>${data[i].price}$</p>
                <p><b>Color: </b>${data[i].color}</p>
                <p><b>Size: </b>${data[i].size}</p>
                <p><b>Gender: </b>${data[i].gender}</p>
                <p><b>Category: </b>${data[i].category}</p>`);
                var col = document.getElementById('loadDiv');
                col.innerHTML += '<button class="btn-add" onclick="AddCart(' + i + ')">Add To Cart</button>';
                document.getElementById("price").innerHTML += `<p><img id="image_` + i + `" class="pic"/></p><br><br><br>`;
                $("#image" + "_" + i).attr("src", data[i].imageUrl);
                $("#image" + "_" + i).attr("width", "300px");
                $("#image" + "_" + i).attr("height", "195px");
                count++;
                document.getElementsByClassName("section-title")[0].innerHTML = `<h2>Shirts you may Like</h2><br><h3>Around your max purchase, Gedner and Category</h3>`
            }
        }

        console.log(count);
        if (count == 0) {
            for (let i = 0; i < data.length; i++) {
                if ((cat == data[i].category) && (gen == data[i].gender)) {
                    $("#loadDiv").append(`<p id="proname"><b><Company:</b></font> ${data[i].company}</p> <p><b>Price:</b>${data[i].price}$</p>
                    <p><b>Color: </b>${data[i].color}</p>
                    <p><b>Size: </b>${data[i].size}</p>
                    <p><b>Gender: </b>${data[i].gender}</p>
                    <p><b>Category: </b>${data[i].category}</p>`);
                    var col = document.getElementById('loadDiv');
                    col.innerHTML += '<button onclick="AddCart(' + i + ')">Add To Cart</button>';
                    document.getElementById("price").innerHTML += `<p><img id="image_` + i + `" class="pic"/></p><br><br><br>`;
                    $("#image" + "_" + i).attr("src", data[i].imageUrl);
                    $("#image" + "_" + i).attr("width", "300px");
                    $("#image" + "_" + i).attr("height", "195px");
                    count++;
                    document.getElementsByClassName("section-title")[0].innerHTML = `<h2>Shirts you may Like</h2><br><h3>Only by Gender and Category</h3>`
                }
            }
        }

    });
}
/*-----------------------------------------Search Page -----------------------------------------*/
//GroupByCompany Button
function GroupByCompany() {
    $("#loadDiv").empty();
    $.get("groupbycompany", function (data, status) {
        for (let i = 0; i < data.length; i++) {
            $("#loadDiv").append(`<p id="proname"><b><Company:</b></font> ${data[i]._id}:${data[i].count}</p>`);
        }

    });


}
//GrouptBySize Button
function GroupBySize() {
    $("#loadDiv").empty();
    $.get("groupbysize", function (data, status) {
        for (let i = 0; i < data.length; i++) {
            $("#loadDiv").append(`<p id="proname"><b><Company:</b></font> ${data[i]._id}:${data[i].count}</p>`);
        }

    });


}
//GroupByCategory Button
function GroupByCategory() {
    $("#loadDiv").empty();
    $.get("groupbycategory", function (data, status) {
        for (let i = 0; i < data.length; i++) {
            $("#loadDiv").append(`<p id="proname"><b><Company:</b></font> ${data[i]._id}:${data[i].count}</p>`);
        }

    });


}
///*-----------------------------------------Log in Page-----------------------------------------*/
//Log In Function
function AdminLogIn() {
    $("#wrong").empty();
    var user = document.getElementById('userAdmin').value;
    var pass = document.getElementById('passAdmin').value;
    var us = 'app';
    var pa = '5555';
    console.log(pass);
    console.log(pa);

    if (!pass.localeCompare(pa)) {
        console.log(pass.localeCompare(pa));
        if (!user.localeCompare(us)) {
            console.log(user.localeCompare(us));
            ShowAdminPage();
        }
    }
    else {
        $("#wrong").append('<p id="red" >The username or password is wrong</p>');
        console.log("The username or password is wrong");
    }
}
/*---------------------------------------Admin Page-------------------------------------------*/
//Search Button - Show all the Product DB
function ShowDB() {
    document.getElementById("com").getElementsByClassName("errmsg")[0].innerHTML = "";
    document.getElementById("com").getElementsByClassName("tableA")[0].innerHTML = "";
    document.getElementById("com").getElementsByClassName("tableA")[0].innerHTML = `<div class="rowA header">
    <div class="cellA">
        item(key)
    </div>
    <div class="cellA">
        company
    </div>
    <div class="cellA">
        price
    </div>
    <div class="cellA">
        color
    </div>
    <div class="cellA">
        size
    </div>
    <div class="cellA">
        gender
    </div>
    <div class="cellA">
        category
    </div>
    <div class="cellA">
        image
    </div>

</div>`;
    $.get("catalogarr", function (data, status) {

        for (let i = 0; i < data.length; i++) {
            document.getElementById("com").getElementsByClassName("tableA")[0].innerHTML += ` <div class="rowA">
        <div data-title="Name">
        ${data[i]._id}
        </div>
        <div class="cellA" data-title="Age">
        ${data[i].company}
        </div>
        <div class="cellA" data-title="Occupation">
        ${data[i].price}
        </div>
        <div class="cellA" data-title="Location">
        ${data[i].color}
        </div>
        <div class="cellA" data-title="Location">
        ${data[i].size}
        </div>
        <div class="cellA" data-title="Location">
        ${data[i].gender}
        </div>
        <div class="cellA" data-title="Location">
        ${data[i].category}
        </div>
        <div class="cellA" data-title="Location">
        <img id="image_` + i + `"/><div>
        <div class="cellA" data-title="Location">
        <button onclick="LoadProduct(` + i + `)">Update</button>
        <button onclick="DeleteProduct(` + i + `)">Delete</button>
        </div>
        `
            $("#image" + "_" + i).attr("src", data[i].imageUrl)
            $("#image" + "_" + i).attr("width", "80px")
            $("#image" + "_" + i).attr("height", "70px")

        }


    });


}
//Update Button - Load Product to the input fileds
function LoadProduct(i) {
    $.get("catalogarr", function (data, status) {
        document.getElementById("com").getElementsByClassName("company")[0].value = data[i].company;
        document.getElementById("com").getElementsByClassName("price")[0].value = data[i].price;
        document.getElementById("com").getElementsByClassName("color")[0].value = data[i].color;
        document.getElementById("com").getElementsByClassName("size")[0].value = data[i].size;
        document.getElementById("com").getElementsByClassName("gender")[0].value = data[i].gender;
        document.getElementById("com").getElementsByClassName("category")[0].value = data[i].category;
        document.getElementById("com").getElementsByClassName("image")[0].value = data[i].imageUrl;
        document.getElementById("com").getElementsByClassName("key")[0].value = data[i]._id;

    });
}
//Main Update Button - Update the Product
function UpdateProduct() {
    let flag = 0;
    document.getElementById("com").getElementsByClassName("errmsg")[0].innerHTML = "";
    let company = document.getElementById("com").getElementsByClassName("company")[0].value;
    let price = document.getElementById("com").getElementsByClassName("price")[0].value;
    let color = document.getElementById("com").getElementsByClassName("color")[0].value;
    let size = document.getElementById("com").getElementsByClassName("size")[0].value;
    let gender = document.getElementById("com").getElementsByClassName("gender")[0].value;
    let category = document.getElementById("com").getElementsByClassName("category")[0].value
    let image = document.getElementById("com").getElementsByClassName("image")[0].value;
    let id = document.getElementById("com").getElementsByClassName("key")[0].value;
    if (company == "" || price == "" || color == "" || size == "" || gender == "" || category == "" || image == "" || id == "") {
        document.getElementById("com").getElementsByClassName("errmsg")[0].innerHTML = "One or more fileds Empty! Please fill all the fileds to Update!"
        flag = 1;
    }
    if (gender != "male" && gender != "female") {
        flag = 1;
        document.getElementById("com").getElementsByClassName("errmsg")[0].innerHTML += "Your gender input is not correct!"
    }
    if (category != "t-shirt" && category != "plaid") {
        flag = 1;
        document.getElementById("com").getElementsByClassName("errmsg")[0].innerHTML += " Your Category input is not correct!"
    }
    if (size != "S" && size != "M" && size != "L" && size != "XL" && size != "XXL") {
        flag = 1;
        document.getElementById("com").getElementsByClassName("errmsg")[0].innerHTML += " Your Size input is not correct!"
    }
    if (flag == 0) {
        $.post("http://localhost:8080/update", { id: id, company: company, price: price, color: color, size: size, gender: gender, category: category, image: image }, function (data) {
        });
        alert("Update Completed!");
        ClearInput();
        ShowDB();
    }


}
//Add Button - Add Product to the DB
function AddProduct() {
    document.getElementById("com").getElementsByClassName("errmsg")[0].innerHTML = "";
    let flag = 0;
    let company = document.getElementById("com").getElementsByClassName("company")[0].value;
    let price = document.getElementById("com").getElementsByClassName("price")[0].value;
    let color = document.getElementById("com").getElementsByClassName("color")[0].value;
    let size = document.getElementById("com").getElementsByClassName("size")[0].value;
    let gender = document.getElementById("com").getElementsByClassName("gender")[0].value;
    let category = document.getElementById("com").getElementsByClassName("category")[0].value
    let image = document.getElementById("com").getElementsByClassName("image")[0].value;
    let id = document.getElementById("com").getElementsByClassName("key")[0].value;
    if (company == "" || price == "" || color == "" || size == "" || gender == "" || category == "" || image == "") {
        flag = 1;
        document.getElementById("com").getElementsByClassName("errmsg")[0].innerHTML = " One or more fileds Empty! Please fill all the fileds to Add!"
    }
    if (id != "") {
        document.getElementById("com").getElementsByClassName("errmsg")[0].innerHTML += " Cant Add Product with existing ID!"
        flag = 1;
    }
    if (gender != "male" && gender != "female") {
        flag = 1;
        document.getElementById("com").getElementsByClassName("errmsg")[0].innerHTML += " Your gender input is not correct!"
    }
    if (category != "t-shirt" && category != "plaid") {
        flag = 1;
        document.getElementById("com").getElementsByClassName("errmsg")[0].innerHTML += " Your Category input is not correct!"
    }
    if (size != "S" && size != "M" && size != "L" && size != "XL" && size != "XXL") {
        flag = 1;
        document.getElementById("com").getElementsByClassName("errmsg")[0].innerHTML += " Your Size input is not correct!"
    }
    if (flag == 0) {
        $.post("http://localhost:8080/addproduct", { company: company, price: price, color: color, size: size, gender: gender, category: category, image: image }, function (data) {
        });
        alert("Product Added!");
        ClearInput();
        ShowDB();
        let message = ` New Product Arrived!: Company: ${company} Price: ${price}$ Gender: ${gender}, Size: ${size}, Color: ${color}, Category: ${category}`;
        faceBookPost(message);
    }


}
//Delete Button - Delete Product
function DeleteProduct(i) {
    $.get("catalogarr", function (data, status) {
        let company = data[i].company;
        let price = data[i].price;
        let gender = data[i].gender;
        let size = data[i].size;
        let color = data[i].color;
        let category = data[i].category;
        $.post("http://localhost:8080/deleteproduct", { id: data[i]._id }, function (data) {
        });
        alert("Product Deleted!");
        ShowDB();
        let message = ` Sorry, This Product Out of Stock!: Company: ${company} Price: ${price}$ Gender: ${gender}, Size: ${size}, Color: ${color}, Category: ${category}`;
        faceBookPost(message);
    });
}
//Clear Button - clear the text in the inputs.
function ClearInput() {
    document.getElementById("com").getElementsByClassName("company")[0].value = "";
    document.getElementById("com").getElementsByClassName("price")[0].value = "";
    document.getElementById("com").getElementsByClassName("color")[0].value = "";
    document.getElementById("com").getElementsByClassName("size")[0].value = "";
    document.getElementById("com").getElementsByClassName("gender")[0].value = "";
    document.getElementById("com").getElementsByClassName("category")[0].value = "";
    document.getElementById("com").getElementsByClassName("image")[0].value = "";
    document.getElementById("com").getElementsByClassName("key")[0].value = "";
    document.getElementById("com").getElementsByClassName("errmsg")[0].innerHTML = "";
}
/*-----------------------------------------done Admin Page Functions-----------------------------------------*/
/*----------------------------------------- Map api -----------------------------------------*/

function initMap() {

    let options = {
        zoom: 14,
        center: { lat: 31.969896, lng: 34.772101 }
    }

    let map = new google.maps.Map(document.getElementById('map'), options);

    AddMarker({
        coords: { lat: 31.969896, lng: 34.772101 },
        map: map,
        text: ["<h3 class='text-center'>&nbsp&nbsp&nbspOur store location</h3>", ""]
    }, map);
}

function AddMarker(mapArgument, map) {
    let marker = new google.maps.Marker({
        position: mapArgument.coords,
        map: mapArgument.map,
        icon: mapArgument.icon,
    });
    let infoWindow = new google.maps.InfoWindow({
        content: mapArgument.text[0] + mapArgument.text[1]
    });
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
}

/*-----------------------------------------done Map api -----------------------------------------*/
/*-----------------------------------------Start Facebook api -----------------------------------------*/
function faceBookPost(value) {
    let xhr = new XMLHttpRequest();
    var message = value //message
    var accessToken = "EAAFm2n39aoEBANZAvgJEM8tZAZCagWkkZAZCj8dqWD549JUKfXkmBgBYoZAZC2P93xYTENEDChEZCNiCRmWuKGZAoNaooXpT7YaZAOZAGs3rwcTL0FuGiCc0LdxMrrTTbhDjsca8iUZBgszXgi3tRvL1neBNWjmLHdaVoLR354QZCr092lyVKxjohrSCaR5EnC7dbMlQZD"
    var createPostRequest = "https://graph.facebook.com/v14.0/103914885705757/feed?message=" + encodeURIComponent(message) + "&access_token=" + accessToken
    xhr.open("POST", createPostRequest);
    xhr.onload = () => console.log(xhr.responseText);
    xhr.send()
    console.log(message);
    alert("Posted on Facebook!");
    document.getElementById('textbox').value = "";
}


