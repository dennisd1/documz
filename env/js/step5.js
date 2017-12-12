var step5_old_index = "";
var step5_new_region = "";
var step5_prev_keycode = false;

$(document).ready(function() {
    $("#goto_step6").click(function() {
        document.location.href = "#six";
    });

    $("#step5_index").live("focusout", function() {
        if (!(parseInt($("#step5_index").val()) == $("#step5_index").val() && $("#step5_index").val().length == 6))
            $("#step5_index_warning").text("Неправильно. Индекс должен состоять из 6 цифр");
        else {
            $("#step5_index_warning").html("<img src='images/ajax-loader.gif'>");

            //далее код по загрузке данных на основе индекса
            $.getJSON("//api.print-post.com/api/index/v2/", {index:$(this).val()}, function(data, text) {
                if (data && data.error==undefined) {
                    if ($("#step5_address_region").val() == "") {
                        $("#step5_address_region").val(data.string);
                        $("#step5_index_warning").text("");
                        step5_old_index = $("#step5_index").val();

                    } else {
                        if (step5_old_index != $("#step5_index").val()) {
                            $("#step5_index_warning").html("<input type='button' id='step5_update_city_from_index'" +
                                    " style='margin-top:-4px' value='Обновить «Город» по введенному индексу'>");
                            step5_new_region = data.string;
                        } else {
                            $("#step5_index_warning").text("");
                        }
                    }
                } else {
                    $("#step5_index_warning").text("Индекс в базе не найден. Уверены в написании?");
                }
            });
        }
    });

    $("#step5_update_city_from_index").live("click", function() { // обработчик появляющейся кнопки замена
        $("#step5_address_region").val(step5_new_region);
        $("#step5_index_warning").text("");
        step5_old_index = $("#step5_index").val();
    });

    $("#step5 input, #step5 textarea").focus(function() {// делаем коричневым активный блок
        $(this).parents("fieldset").find(".step_table").removeClass("selected");
        $(this).parents("div").toggleClass("selected");
    });

    $("#form").keydown(function(event) {
        if (event.keyCode == 13)
            return false;
    });

    $("#step5_name").keyup(function(event) { // переход  в поле иднекс по ентеру
        if (event.keyCode == 13)
            $("#step5_index").focus();
        return false;
    });

    $("#step5_index").keyup(function(event) { // переход  в поле адрес по ентеру
        if (event.keyCode == 13)
            $("#step5_address_street").focus();
        return false;
    });

    $("#step5_address_street, #step5_address_region").focus(function() {
        step5_prev_keycode = false;
    });

    $("#step5_address_street").keyup(function(event) { // переход  в поле город по 2-х ентеру
        if (event.keyCode == 13) {
            if (step5_prev_keycode == true) {
                re = /\n{1,}$/g;
                str = $("#step5_address_street").val().replace(re, "");
                $("#step5_address_region").focus();
                $("#step5_address_street").val(str);
                step5_prev_keycode = false;
                return false;
            }
            else {
                step5_prev_keycode = true;
                $("#step5_address_street").val($("#step5_address_street").val()+"\n");
            }
        } else {
            step5_prev_keycode = false;
        }
    });
    $("#step5_address_region").keyup(function(event) { // переход  на кнопку по 2-х ентеру
        if (event.keyCode == 13) {
            if (step5_prev_keycode == true) {
                re = /\n{1,}$/g;
                str = $("#step5_address_region").val().replace(re, "");
                $("#goto_step6").focus();
                $("#step5_address_region").val(str);
                step5_prev_keycode = false;
                return false;
            }
            else {
                step5_prev_keycode = true;
                $("#step5_address_street").val($("#step5_address_street").val()+"\n");
            }
        } else {
            step5_prev_keycode = false;
        }
    });

    if (tab_enable)
        $("fieldset#step5 input, fieldset#step5 textarea").keyup(function(event) {
        if (event.keyCode == 9) {
            tabindex = parseInt($(this).attr("tabindex"));
            if (event.shiftKey) {
                tabindex--;
                if (tabindex == -1) tabindex = 4;
            } else {
                tabindex++;
                if (tabindex == 5) tabindex = 0;
            }
            $("fieldset#step5 [tabindex=" + tabindex + "]").focus();
        }
    });
});


function before_step5() {
    if ($("#step5_index").val() != "")
        $("#step5_index").trigger("focusout");
    step5_old_index = $("#step5_index").val();
}

function after_step5() {
    $("#step5_name").focus();
}