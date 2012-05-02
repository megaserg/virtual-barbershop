var MAIN_DIV_ID = "main_div";
var EDITOR_DIV_ID = "editor_div";
var COLLAGES_DIV_ID = "collages_div";

var FILE_UPLOAD_FORM_ID = "file_upload_form";

window.globals = {};

$(document).ready(
	function() {
		globals.currentDivId = MAIN_DIV_ID;
		
		(function() {
			var div = $('#progress_div');
			var bar = $('#progress_bar');
			var percent = $('#progress_percent');
			var status = $('#upload_status');
			
			$("#" + FILE_UPLOAD_FORM_ID).submit(function() { 
				// inside event callbacks 'this' is the DOM element so we first 
				// wrap it in a jQuery object and then invoke ajaxSubmit 
				$(this).ajaxSubmit({
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
		 
				// !!! Important !!! 
				// always return false to prevent standard browser submit and page navigation 
				return false; 
			});
		})();
	}
);

function uploadButton_click() {
	//uploadImage();
	//switchTab(EDITOR_DIV_ID);
}

function switchTab(newDivId) {
    var oldDivId = globals.currentDivId;
	$("#"+oldDivId).slideToggle("slow");
	//$("#"+oldDivId).addClass("displaynone");
	//$("#"+newDivId).removeClass("displaynone");
	$("#"+newDivId).slideToggle("slow");
	globals.currentDivId = newDivId;
}

/*function uploadImage() {
	//globals.picture_id = '';
}*/

function proceedToEditor(imagePath) {
    var imageId, path;
    console.log(imagePath);
    for (v in imagePath) { // should be only one element
        imageId = v;
        path = imagePath[v];
    }
    var photo = document.createElement("img");
    photo.src = "/" + path;
    $("#editor_canvas_div").html("");
    $("#editor_canvas_div").append(photo);
    switchTab(EDITOR_DIV_ID);
}

function fun() {
	
}