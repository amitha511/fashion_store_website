var fun = require("../Model/db");

function ShowCatalog() {
    $.get("catalogarr", function (data, status) {
        $("#company").empty();
        $.each(data, function (key, value) {
            $("#company").append(`<td><p>Company: ${value.company}</p> <p>Price: ${value.price}$</p>
                <p>Color: ${value.color}</p>
                <p>Size: ${value.size}</p>
                <p>Gender: ${value.gender}</p>
                <p>Category: ${value.category}</p></td>`);
            $('<img src="' + value.imageUrl + '">').load(function () {
                $(this).width(125).height(100).appendTo('#price');
            });
        });

    });
}