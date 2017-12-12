$(document).ready(function() {


$("fieldset#step3 input").change(function() { //смена оформления ячейки
        $(this).parents("fieldset").find(".step_table.single").removeClass("selected");
        $(this).parents("div").toggleClass("selected");
    });

    $("#step3 label").dblclick(function() {
        document.location.href = "#four";
    });

    $("#goto_step4").click(function() {
        if($("#step3_line:checked").length==1)
        document.location.href = "#five";
        else
        document.location.href = "#four";
    });

    if (tab_enable)
        $("fieldset#step3 input").keyup(function(event) {
        if (event.keyCode == 9) {
            tabindex = parseInt($(this).attr("tabindex"));
            if (event.shiftKey) {
                tabindex--;
                if (tabindex == -1) tabindex = 2;
            } else {
                tabindex++;
                if (tabindex == 3) tabindex = 0;
            }
            $("fieldset#step3 input[tabindex=" + tabindex + "]").focus();
        }
    });
});

function before_step3() {
}

function after_step3() {
    $("fieldset#step3 input:checked").focus();
    $("fieldset#step3 input:checked").parents("fieldset").find(".step_table.single").removeClass("selected");
    $("fieldset#step3 input:checked").parents("div").toggleClass("selected");
}