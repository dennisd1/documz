$(document).ready(function() {
    $("#goto_step5,#goto_step5-2").click(function() {
        document.location.href = "#five";
    });

$("fieldset#step4 input").change(function() { //смена оформлени€ €чейки
        // $(this).blur();
        //TODO найти стиль дл€ сн€ти€ выделени€
        //http://www.xiper.net/collect/html-and-css-tricks/css-tricks/dotted-border-focus-elements.html
        $(this).parents("fieldset").find(".step_table.single").removeClass("selected");
        $(this).parents("div").toggleClass("selected");
    });

    //    $("#step4 input").click(function() {//чтобы при сн€тии чекбокса окраска мен€лась, несмотр€ на hover
//        if (!$(this).attr("checked"))
//            $(this).parents("div.step_table").addClass("unchecked");
//    });
//
//    $("div.step_table.unchecked").live("mouseleave", function() {//а при выводе мышки ее востанавливаем дл€ будующего
//        $(this).removeClass("unchecked");
//    });

    if (tab_enable)
        $("fieldset#step4 input").keyup(function(event) {
        if (event.keyCode == 9) {
            tabindex = parseInt($(this).attr("tabindex"));
            if (event.shiftKey) {
                tabindex--;
                if (tabindex == -1) tabindex = 3;
            } else {
                tabindex++;
                if (tabindex == 4) tabindex = 0;
            }
            $("fieldset#step4 input[tabindex=" + tabindex + "]").focus();
        }
    });
});

//function before_step4() { //устанавливаем показ инфо блока про линованный конверт
//    if ($("#step3_line:checked").length == 1) {
//        $("#step_four div.info").show();
//        $("#step4_index").attr("checked", false);
//    }
//    else {
//        $("#step_four div.info").hide();
//        $("#step4_index").attr("checked", "checked");
//    }
//    //раскраска по значению чекбоксов
//    $("#step4 .selected").removeClass("selected");
//    $("#step4 input").filter(":checked").each(function() {
//        $(this).parents("div").addClass("selected");
//    });
//}

function before_step4() {
    if (($("input[name='step3']:checked").val() == "line")) {
        $("#step4_overlay").show();
    } else {
        $("#step4_overlay").hide();
    }
    $("#step4 input:checked").parents("div.step_table").removeClass("selected");
    $("#step4 input:checked").parents("div.step_table").addClass("selected");
}

function after_step4() {
    if (($("input[name='step3']:checked").val() == "line")) {
        $("#goto_step5-2").focus();
    }
    else {
        $("#goto_step5").focus();
    }
}