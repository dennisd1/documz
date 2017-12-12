$(document).ready(function() {

    $("fieldset#step1 input").change(function() { //смена оформления ячейки
        // $(this).blur();
        //TODO найти стиль для снятия выделения
        //http://www.xiper.net/collect/html-and-css-tricks/css-tricks/dotted-border-focus-elements.html
        $(this).parents("fieldset").find(".step_table.single").removeClass("selected");
        $(this).parents("div").toggleClass("selected");
    });

    $("#step1 label").dblclick(function() {
        document.location.href = "#three";
    });

    $("#goto_step2").click(function() {
        document.location.href = "#three";
    });

    if (tab_enable)
        $("fieldset#step1 input").keyup(function(event) {
        if (event.keyCode == 9) {
            tabindex = parseInt($(this).attr("tabindex"));
            if (event.shiftKey) {
                tabindex--;
                if (tabindex == -1) tabindex = 4;
            } else {
                tabindex++;
                if (tabindex == 5) tabindex = 0;
            }

            $("fieldset#step1 input[tabindex=" + tabindex + "]").focus();
        }
    });
});

function before_step1() {
}

function after_step1() {
    $("fieldset#step1 input:checked").focus();
    $("fieldset#step1 input:checked").parents("fieldset").find(".step_table.single").removeClass("selected");
    $("fieldset#step1 input:checked").parents("div").toggleClass("selected");
}