var UPLOAD_FORM_ID = "haircut_upload_form";
var ADD_FORM_ID = "add_barbershop_form";

window.globals = {};

$(document).ready(
	function() {
		hideUploadedMessage();
		hideAddedMessage();
		
        loadBarbershops();

        (function() {
			$("#" + UPLOAD_FORM_ID).ajaxForm({
                beforeSubmit: function() {
                    hideUploadedMessage();
                    if ($("#imagefile_input").val() == "") return false;
                    if ($("#price_input").val() == "") return false;
                },
                dataType: 'json',
                complete: function(xhr) {
                    if (xhr.status == 200) {
                        showUploadedMessage(xhr.responseText);
                    }
                }
            });
		})();

		(function() {
			$("#" + ADD_FORM_ID).ajaxForm({
                beforeSubmit: function() {
                    hideAddedMessage();
                    if ($("#name_input").val() == "") return false;
                    if ($("#address_input").val() == "") return false;
                    if ($("#phone_input").val() == "") return false;
                },
                dataType: 'json',
                complete: function(xhr) {
                    if (xhr.status == 200) {
                        showAddedMessage(xhr.responseText);
                    }
                }
            });
		})();
	}
);

function loadBarbershops() {
    $.ajax({
        url: "vb?action=getBarbershops",
        type: "GET",
        dataType: "json"
    }).done(function(data) {
        window.globals.barbershops = data.barbershops;
        showBarbershops();
    });
}

function showBarbershops() {
    var bbs = window.globals.barbershops;
    var barbershopSelect = $("#barbershop_id_select");
    barbershopSelect.html("");
    for (var id in bbs) {
        var name = bbs[id];
        var opt = document.createElement("option");
        opt.value = id;
        opt.innerHTML = name;
        barbershopSelect.append(opt);
    }
}

function showUploadedMessage(val) {
    $("#uploadedMessage").html(val);
    $("#uploadedMessage").show();
}

function hideUploadedMessage() {
    $("#uploadedMessage").hide();
}

function showAddedMessage(val) {
    $("#addedMessage").html(val);
    $("#addedMessage").show();
}

function hideAddedMessage() {
    $("#addedMessage").hide();
}