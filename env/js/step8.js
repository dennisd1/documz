//step8_old_header=$("#step8_success h2").text();
function digit_postfix(digit, word) {
    var one = "";
    var two_four = "а";
    var five = "ов";
    if (digit < 2) return word + one;
    else if (digit > 1 && digit < 5) return word + two_four;
    else if (digit >= 5) return word + five;
}

function before_step8() {

    var text = new Object();
    var i = 0;
    /* количество конвертов*/
    d = $.parseJSON($("#step6_table_data").val());
    to = 0;
    selected=0;
    to_index = 0;
    for (var prop in d) {
        if(d[prop].select == true)
            selected++;
        if ((d[prop].select == true) &&(d[prop].name != "" || d[prop].index != "" || d[prop].street != "" || d[prop].region != "")) to++;
        if (d[prop].index != "") to_index++;
    }

    from = 0;
    if ($("#step5_name").val() != "") from++;
    if ($("#step5_index").val() != "") from++;
    if ($("#step5_address_street").val() != "") from++;
    if ($("#step5_address_region").val() != "") from++;

    lines = 0;
    if ($("#step4_to:checked").length == 1) lines++;
    if ($("#step4_from:checked").length == 1) lines++;
    if ($("#step4_index:checked").length == 1) lines++;


    if ($("input[name='step1']:checked").val() === undefined) {//не выбран конверт
        text[++i] = "Выберите формат конверта в разделе <a href='#one'>«Размер конверта»</a>;";
    }
    if ($("input[name='step3']:checked").val() === undefined) {//не выбран чистый-линованный
        text[++i] = "Выберите тип конверта в разделе <a href='#three'>«Что за конверт»</a>;";
    }
    if ($("input[name='step3']:checked").val() == "clear" &&
            ($("#step4_to:checked").length == 0 && $("#step4_from:checked").length == 0 && $("#step4_index:checked").length == 0 ) &&
            from == 0 && to == 0) {//чистый и блоки не печатаются
        text[++i] = "Вы не указали ни <a href='#five'>обратного адреса</a>, ни <a href='#six'>адреса получателя</a>" +
                " и отказались от печати <a href='four'>линий разметки</a>." +
                " Будет напечатан пустой лист.";
    }
    if (i != 0) {
        text2 = "<p><strong>К сожалению, вы пропустили необходимые для завершения шаги, вернитесь к ним, пожалуйста.</strong></p><ul>";
        for (var prop in text) {
            text2 = text2 + "<li>" + text[prop] + "</li>";
        }
        text2 = text2 + "</ul>";
        //  $("#step8_success h2").text("Вот казалось бы и всё…");
        $("#step8_warning").html(text2);
        $("#step8_error").show();
        $("#step8_success").hide();
    } else { //формирование описания заказа
        /**/
        if (to == 0) num = 1;
        else num = to;
        if ($("input[name='step3']:checked").val() == "clear") {
            if (to < 2) text = "Будет напечатан 1 конверт формата " + $("input[name='step1']:checked").val();
            else text = "Будет напечатано " + num + " " + digit_postfix(num, "конверт") + " формата " + $("input[name='step1']:checked").val();
        } else {
            if (to < 2) text = "Будет использован 1 линованный конверт формата " + $("input[name='step1']:checked").val();
            else text = "Будет использовано " + num + " линованных " + digit_postfix(num, "конверт") + " формата " + $("input[name='step1']:checked").val();

        }


        if ($("input[name='step3']:checked").val() == "line") {
            if (from && !to) {
                text = text + " с адресным блоком отправителя";
            } else if (!from && to) {
                if (to == 1) text = text + " с адресным блоком получателя";
                else text = text + " с адресными блоками получателей";
            } else if (from && to) {
                if (to == 1) text = text + " с адресными блоками отправителя и получателя";
                else        text = text + " с адресными блоками отправителя и получателей";
            }
        } else if ($("input[name='step3']:checked").val() == "clear") {
            if (!from && !to) {
                if ($("#step4_to").is(":checked") && $("#step4_from").is(":checked") && $("#step4_index").is(":checked")) {
                    text = text + " с разметкой всех блоков для дальнейшего ручного заполнения";
                } else if ($("#step4_to").is(":checked") && $("#step4_from").is(":checked") && !$("#step4_index").is(":checked")) {
                    text = text + " с разметкой блоков «От кого» и «Кому»";
                } else if ($("#step4_to").is(":checked") && !$("#step4_from").is(":checked") && $("#step4_index").is(":checked")) {
                    text = text + " с разметкой блока «Кому» и поля для нанесения индекса";
                } else if ($("#step4_to").is(":checked") && !$("#step4_from").is(":checked") && !$("#step4_index").is(":checked")) {
                    text = text + " с разметкой блока «От кого»";
                } else if (!$("#step4_to").is(":checked") && $("#step4_from").is(":checked") && $("#step4_index").is(":checked")) {
                    text = text + " с разметкой блока «От кого» и поля для нанесения индекса";
                } else if (!$("#step4_to").is(":checked") && $("#step4_from").is(":checked") && !$("#step4_index").is(":checked")) {
                    text = text + " с разметкой блока «Кому»";
                } else if (!$("#step4_to").is(":checked") && !$("#step4_from").is(":checked") && $("#step4_index").is(":checked")) {
                    text = text + " с разметкой в поле для нанесения индекса";
                }
            } else if (from && !to) {
                if ($("#step4_to").is(":checked") && !$("#step4_index").is(":checked")) {
                    text = text + " с адресом в блоке «От кого» и разметкой блока «Кому»";
                } else if (!$("#step4_to").is(":checked") && $("#step4_index").is(":checked")) {
                    text = text + " с адресом в блоке «От кого» и разметкой поля для нанесения индекса";
                } else if ($("#step4_to").is(":checked") && $("#step4_index").is(":checked")) {
                    text = text + " с адресом в блоке «От кого», разметкой блока «Кому» и поля для нанесения индекса";
                }
            } else if (!from && to) { //TODO вот это действительно для чистого конверта!!!
                if ($("#step4_from").is(":checked") && !$("#step4_index").is(":checked")) {
                    if (to == 1) text = text + " с адресом в блоке «Кому» и разметкой в блоке «От кого»";
                    else  text = text + " с адресами в блоке «Кому» и разметкой в блоке «От кого»";
                    if (to != to_index) text = text + ". Если в адресе получателя не указан индекс – вместо его разметки будет оставлено пустое место";
                } else if (!$("#step4_from").is(":checked") && $("#step4_index").is(":checked")) {
                    if (to == 1) text = text + " с адресом в блоке «Кому» и пустым пространством в блоке «От кого»";
                    else  text = text + " с адресами в блоке «Кому» и пустым пространством в блоке «От кого»";
                    if (to != to_index) text = text + ". Если в адресе получателя не указан индекс – на его место будет нанесена разметка";
                } else if ($("#step4_from").is(":checked") && $("#step4_index").is(":checked")) {
                    if (to == 1) text = text + " с адресом в блоке «Кому» и разметкой в блоке «От кого»";
                    else  text = text + " с адресами в блоке «Кому» и разметкой в блоке «От кого»";
                    if (to != to_index) text = text + ". Если в адресе получателя не указан индекс – на его место будет нанесена разметка";
                } else if (!$("#step4_from").is(":checked") && !$("#step4_index").is(":checked")) {
                    if (to == 1) text = text + " с адресом в блоке «Кому» и пустым пространством в блоке «От кого»";
                    else  text = text + " с адресами в блоке «Кому» и пустым пространством в блоке «От кого»";
                    if (to != to_index) text = text + ". Если в адресе получателя не указан индекс – вместо его разметки будет оставлено пустое место";
                }
            } else if (from && to) {
                if (to == to_index) {
                    if (to == 1) text = text + " с адресными блоками отправителя и получателя";
                    else        text = text + " с адресными блоками отправителя и получателей";

                } else if ($("#step4_index").is(":checked") && to != to_index) {
                    if (to == 1) text = text + " с адресными блоками отправителя и получателя. На месте индекса будет нанесена разметка";
                    else        text = text + " с адресными блоками отправителя и получателей. Если в адресе получателя не указан индекс – на его место будет нанесена разметка";
                } else if (!$("#step4_index").is(":checked") && to != to_index) {
                    if (to == 1) text = text + " с адресными блоками отправителя и получателя. На месте индекса будет оставлено пустое место";
                    else        text = text + " с адресными блоками отправителя и получателей. Если в адресе получателя не указан индекс – вместо его разметки будет оставлено пустое место";
                }
            }
            if(selected==0)
                text = text + ".<br><span style='font-weight: bold'>Внимание, вы не выделилили ни одного получателя</span>";
        }

        $("#step8_info").html("<p>" + text + ".</p>");
        $("#step8_error").hide();
        $("#step8_success").show();
    }
}

function after_step8(){
$("#goto_final").focus();
}