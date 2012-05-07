var MAIN_DIV_ID = "main_div";
var EDITOR_DIV_ID = "editor_div";
var COLLAGES_DIV_ID = "collages_div";

var FILE_UPLOAD_FORM_ID = "file_upload_form";

window.globals = {};

$(document).ready(
	function() {
		globals.currentDivId = MAIN_DIV_ID;

		loadOffers();
		
		(function() {
			var div = $('#progress_div');
			var bar = $('#progress_bar');
			var percent = $('#progress_percent');
			var status = $('#upload_status');

			$("#" + FILE_UPLOAD_FORM_ID).ajaxForm({
                beforeSubmit: function() {
                    console.log('beforeSubmit');
                    status.empty();
                    var percentVal = '0%';
                    bar.width(percentVal);
                    percent.html(percentVal);
                    div.removeClass('visibilityhidden');
                },
                dataType: 'json',
                uploadProgress: function(event, position, total, percentComplete) {
                    var percentVal = percentComplete + '%';
                    bar.width(percentVal);
                    percent.html(percentVal);
                },
                complete: function(xhr) {
                    if (xhr.status == 200) {
                        var percentVal = '100%';
                        bar.width(percentVal);
                        percent.html(percentVal);
                        var imagePath = JSON.parse(xhr.responseText);
                        setTimeout(function() {
                            proceedToEditor(imagePath);
                            div.addClass('visibilityhidden');
                        }, 300);
                    }
                }
            });
		})();
	}
);


function cell_mouseover(event) {
    var elem = $(this);
    if (!elem.hasClass("gallery_selected_cell")) {
        elem.addClass("gallery_hovered_cell");
    }
};

function cell_mouseout(event) {
    var elem = $(this);
    if (!elem.hasClass("gallery_selected_cell")) {
        elem.removeClass("gallery_hovered_cell");
    }
};

function haircutCell_click(event) {
    console.log("Haircut clicked");
    app.clear();

    var imgClicked = $(this).children("img")[0];
    console.log(imgClicked);
    var realHeight = imgClicked.naturalHeight;
    var realWidth = imgClicked.naturalWidth;
    window.globals.realHaircutHeight = realHeight;
    window.globals.realHaircutWidth = realWidth;
    var haircutId = imgClicked.getAttribute("haircut_id");

    // deselect previous selects
    var selectedCells = $(".gallery_selected_cell");
    selectedCells.each(function() {
        $(this).removeClass("gallery_selected_cell");
    });

    // select current cell
    var parentCell = $(imgClicked).parent();
    parentCell.addClass("gallery_selected_cell");
    parentCell.removeClass("gallery_hovered_cell");

    // register current haircut
    window.globals.currentHaircut = {};
    window.globals.currentHaircut.haircut_id = haircutId;
    window.globals.currentHaircut.angle = 0.0;
    window.globals.currentHaircut.sx = 1.0;
    window.globals.currentHaircut.sy = 1.0;

    showBarbershopInfo(haircutId);
    $("#editor_bbinfo_block").removeClass("visibilityhidden");

    // performing transfer to canvas
    var item = {"h": realHeight, "w": realWidth, "thing_id": imgClicked.src, "type": Item.TYPES.IMAGE};
    var transfer = new DataTransfer();
    transfer.setData("item", item);
    transfer.proxy = UI.itemRender(item, "s");
    event.xDataTransfer = transfer;

    // copy event object so it's modifiable
    var fakeEvent = {};
    for (var i in event) {
        fakeEvent[i] = event[i];
    }
    var faceImage = $("#face_image");
    fakeEvent.pageX = faceImage.offset().left + faceImage.width() / 2;
    fakeEvent.pageY = faceImage.offset().top + faceImage.height() / 2;
    app.onCanvasDrop(fakeEvent);
};

function uploadButton_click() {
    // Do nothing. It's ajaxForm business.
	return false;
}

function switchTab(newDivId) {
    var oldDivId = globals.currentDivId;
	//$("#"+oldDivId).slideToggle("slow");
	$("#"+oldDivId).addClass("displaynone");
	$("#"+newDivId).removeClass("displaynone");
	//$("#"+newDivId).slideToggle("slow");
	globals.currentDivId = newDivId;
}

function loadHaircuts() {
    $.ajax({
        url: "vb?action=getHaircuts",
        type: "GET",
        dataType: "json"
    }).done(function(haircuts) {
        window.globals.haircuts = haircuts;
        showHaircuts();
    });
}

function showHaircuts() {
    var haircutPaths = window.globals.haircuts.paths;
    var haircutGalleryDiv = $("#haircut_gallery_div");
    haircutGalleryDiv.html("");
    for (id in haircutPaths) {
        var path = haircutPaths[id];
        var cell = document.createElement("td");
        var photo = document.createElement("img");
        photo.src = path;
        photo.height = 100;
        photo.setAttribute("haircut_id", id);
        photo.className = "gallery_image";
        cell.appendChild(photo);
        haircutGalleryDiv.append(cell);

        // wiring mouse hover events
        $(cell).addClass("gallery_cell");
        cell.onmouseover = cell_mouseover;
        cell.onmouseout = cell_mouseout;

        // wiring click (being clicked, the haircut should appear on canvas)
        //Event.addListener(photo, "click", function(event) {
        cell.onclick = haircutCell_click;
    }
    // adjust height of the canvas
    app.setContainerSize();
}

function loadEditorApp() {
    if (window.app) {
        window.app.clear();
        return;
    }

    window.app = new App($_("canvas"), $_("panel"), {
        "show_promoted_items": "",
        "max_set_items": 50,
        "contest": null,
        "user_info": {},
        "selected_tab": null,
        "lookbooks": null,
        "template_edit": null
    });
    window._xsrc_ids = [];
    Event.trigger(document, 'available');
}

function proceedToEditor(imagePath) {
    var path;
    console.log(imagePath);
    for (v in imagePath) { // should be only one element
        window.globals.faceId = v;
        path = imagePath[v];
    }

    // add image to canvas
    var editorCanvasDiv = $("#editor_canvas_div");
    var photo = document.createElement("img");
    photo.id = "face_image";
    photo.className = "face_image";
    photo.src = path;
    photo.height = "400";
    editorCanvasDiv.html("");
    editorCanvasDiv.append(photo);

    // add script editor-loader
    loadEditorApp();

    // fill haircut gallery asynchronously
    loadHaircuts();

    switchTab(EDITOR_DIV_ID);
}

function getTransformation() {
    // get position, rotation, scale
    var haircut = $("#haircutContainer")[0];
    var face = $("#face_image")[0];
    var app = $("#edapp")[0];
    if (haircut) {
        var w = $(haircut).width(), h = $(haircut).height();
        window.globals.currentHaircut.x = Math.round($(app).offset().left + parseFloat(haircut.style.left) - $(face).offset().left + w / 2);
        window.globals.currentHaircut.y = Math.round($(app).offset().top + parseFloat(haircut.style.top) - $(face).offset().top + h / 2);
        window.globals.currentHaircut.sx = w / window.globals.realHaircutWidth;
        window.globals.currentHaircut.sy = h / window.globals.realHaircutHeight;
        window.globals.currentHaircut.face_id = window.globals.faceId;
        return window.globals.currentHaircut;
    }
    else {
        return null;
    }
}

function loadOffers() {
    $.ajax({
        url: "vb?action=getInfo",
        type: "GET",
        dataType: "json"
    }).done(function(data) {
        window.globals.info = data.info;
    });
}

function loadCollages(currentCollageId) {
    $.ajax({
        url: "vb?action=getCollages",
        type: "GET",
        dataType: "json"
    }).done(function(collages) {
        window.globals.collages = collages;
        showCollages();
        if (!currentCollageId) {
            for (var id in collages.haircuts) currentCollageId = id;
        }
        showLargeCollage(currentCollageId);
    });
}

function showCollages() {
    var collages = window.globals.collages;
    console.log(collages); // contains "paths" and "haircuts"
    var collagePaths = collages.paths;

    // filling the collage gallery
    var collageGalleryDiv = $("#collage_gallery_div");
    collageGalleryDiv.html("");
    for (id in collagePaths) {
        var path = collagePaths[id];
        var cell = document.createElement("td");
        var photo = document.createElement("img");
        photo.src = path;
        photo.height = 100;
        photo.setAttribute("collage_id", id);
        photo.className = "gallery_image";
        cell.appendChild(photo);
        collageGalleryDiv.append(cell);

        // wiring mouse hover events
        $(cell).addClass("gallery_cell");
        cell.onmouseover = cell_mouseover;
        cell.onmouseout = cell_mouseout;

        // wiring click (being clicked, the collage should appear large)
        cell.onclick = function(event) {
            var imgClicked = $(this).children("img")[0];
            var collageId = imgClicked.getAttribute("collage_id");

            // deselect previous selects
            var selectedCells = $(".gallery_selected_cell");
            selectedCells.each(function() {
                $(this).removeClass("gallery_selected_cell");
            });

            // select current cell
            var parentCell = $(imgClicked).parent();
            parentCell.addClass("gallery_selected_cell");
            parentCell.removeClass("gallery_hovered_cell");
            showLargeCollage(collageId);
        };
    }
}

function showLargeCollage(collageId) {
    if (!window.globals.collages || !window.globals.info) return;
    var collages = window.globals.collages;

    var image = $("#large_collage_image")[0];
    image.src = collages.paths[collageId];

    showBarbershopInfo(collages.haircuts[collageId]);
}

function showBarbershopInfo(haircutId) {
    if (!window.globals.info) return;
    var bbs = window.globals.info[haircutId];
    $(".barbershops_ul").each(function() {
        $(this).html("");
        for (var i = 0; i < bbs.length; i++) {
            var li = document.createElement("li");
            $(this).append(li);
            var string = "";
            string += "<b>" + bbs[i].price + "</b> at ";
            string += bbs[i].barbershop_name + "<br/>";
            string += bbs[i].address + "<br/>";
            string += bbs[i].phone + "<br/>";
            $(li).html(string);
        }
    });
}

function saveCollage(data) {
    $.ajax({
        url: "vb?action=saveCollage",
        type: "GET",
        data: data,
        dataType: "json"
    }).done(function(resp) {
        $("#ajax_loader_image").addClass("visibilityhidden");
        proceedToCollages(resp);
    });
}

function publishButton_click() {
    var currentHaircut = getTransformation();
	if (currentHaircut) {
	    console.log($.param(currentHaircut));
	    $("#ajax_loader_image").removeClass("visibilityhidden");
        saveCollage(currentHaircut);
	}
}

function alreadyCreatedCollages_click() {
    // load collages asynchronously
    loadCollages();
    switchTab(COLLAGES_DIV_ID);
}

function proceedToCollages(collageIdContainer) {
    var collageId = collageIdContainer["collage_id"];
    window.globals.collageId = collageId;

    // load collages asynchronously
    loadCollages(collageId);

    switchTab(COLLAGES_DIV_ID);
}