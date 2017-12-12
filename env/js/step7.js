var step7_start_from_x, step7_start_from_y, step7_start_to_x, step7_start_to_y, step7_start_index_x, step7_start_index_y;

$(document).ready(function() {
    $("fieldset#step7 input.input").digitalFloat();
    $("#goto_step8,#goto_step8-2").click(function() {
        document.location.href = "#eight";
    });

    if (tab_enable)
        $("fieldset#step7 input").keyup(function(event) {
        if (event.keyCode == 9) {
            tabindex = parseInt($(this).attr("tabindex"));
            if (event.shiftKey) {
                tabindex--;
                if (tabindex == -1) tabindex = 8;
            } else {
                tabindex++;
                if (tabindex == 9) tabindex = 0;
            }

            $("fieldset#step7 input[tabindex=" + tabindex + "]").focus().select();
            $.jStorage.set("autosave", $("form").serializeArray()); //копия сохранения из 0
        }

    });

    $("#step7_from_x, #step7_from_y, #step7_to_x, #step7_to_y, #step7_index_x, #step7_index_y").keyup(function() {
        step7_check_coord($(this));
    });


    $("#step7_from_step,  #step7_to_step").keyup(function(event) {
        step7_check_step($(this));
    });
});


function step7_check_coord(a) {
    re = /,/;
    a.val(a.val().replace(re, "."));
    re = /^-?(\d+|\d+\.\d{0,})$/;
    if (Math.abs(a.val()) > 20 || a.val().search(re) != 0)
        $("#" + a.attr("id") + "_error").text("Смещение не более 20 мм");
    else $("#" + a.attr("id") + "_error").text("");

    /*Смещение картинки*/
    if (a.attr("id") == "step7_from_x" || $(a).attr("id") == "step7_from_y") {
        X = step7_start_from_x + Math.round($("#step7_from_x").val()*2);
        Y = step7_start_from_y + Math.round($("#step7_from_y").val()*2);
        $("#step7_image_from").css("background-position", X + "px " + Y + "px");
    } else if (a.attr("id") == "step7_to_x" || $(a).attr("id") == "step7_to_y") {
        X = step7_start_to_x + Math.round($("#step7_to_x").val()*2);
        Y = step7_start_to_y + Math.round($("#step7_to_y").val()*2);
        $("#step7_image_to").css("background-position", X + "px " + Y + "px");
    } else if (a.attr("id") == "step7_index_x" || $(a).attr("id") == "step7_index_y") {
        X = step7_start_index_x + Math.round($("#step7_index_x").val()*2);
        Y = step7_start_index_y + Math.round($("#step7_index_y").val()*2);
        $("#step7_image_index").css("background-position", X + "px " + Y + "px");
    }
}

function step7_check_step(a) {
    re = /,/;
    a.val(a.val().replace(re, "."));
    re = /^(\d+|\d+\.\d{0,})$/;
    if (Math.abs(a.val()) > 10 || Math.abs(a.val()) < 5 || a.val().search(re) != 0)
        $("#" + a.attr("id") + "_error").text("Расстояние от 5.0 до 10.0 мм");
    else $("#" + a.attr("id") + "_error").text("");
}


function before_step7() {
    coord = $("#step7_image_from").css("background-position").split(" ");
    step7_start_from_x = parseInt(coord[0]);
    step7_start_from_y = parseInt(coord[1]);

    coord = $("#step7_image_to").css("background-position").split(" ");
    step7_start_to_x = parseInt(coord[0]);
    step7_start_to_y = parseInt(coord[1]);

//    coord = $("#step7_image_index").css("background-position").split(" ");
//    step7_start_index_x = parseInt(coord[0]);
//    step7_start_index_y = parseInt(coord[1]);

    $("#step7_from_x, #step7_from_y, #step7_to_x, #step7_to_y, #step7_index_x, #step7_index_y").each(function() {
        step7_check_coord($(this));
    });
    $("#step7_from_step,  #step7_to_step").each(function(event) {
        step7_check_step($(this));
    });
    if (($("input[name='step3']:checked").val() == "clear")) {

        $("#step7_overlay").show();
    }
    else {
        $("#step7_overlay").hide();
    }

}

function after_step7() {
    if (($("input[name='step3']:checked").val() == "clear")) {
        $("#goto_step8-2").focus();
    }
    else {
        $("#goto_step8").focus();
    }
}