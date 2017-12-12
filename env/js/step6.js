// TODO при редактированнии ячейки работка клавиш вверх-вниз-вправо  - переход с сохранением

var step6_active_cell = null;
var step6_active_cell_old_value = null;
var step6_current_cell = null;


var undo = false;
var max_tr, max_td;
if ($.browser.opera) kursor_navigation = "keypress.navigation";
else kursor_navigation = "keydown.navigation";

function before_step6() {
    current_step = 6;
    if ($("#activecell").length == 0)
        $("#table_recipient tr td:first").attr("id", "activecell");
    tableNavigation();
    max_tr = $("#table_recipient tr td:first").parents("tr").nextAll().length + 1;
    max_td = $("#table_recipient tr td:first").parents("tr").children("td").length;

}

$(document).ready(function () {
    $("#goto_step7").click(function () {
        finishEditCell();
        if ($("#step3_line:checked").length == 1)
            document.location.href = "#seven";
        else
            document.location.href = "#eight";
    });


    $("#table_recipient td").click(function () {
        if ($(this).attr("id") == "activecell")
            return;
        setActiveCell(this);
    });

    $("#table_recipient td").dblclick(function () {

        if ($(this).hasClass("in_edit"))
            return;
        setActiveCell(this);
        setEditCell(this);
    });

    /**
     * Обработка чекбокса select_all
     */
    $("#select_all").click(function () {
        if ($(this).attr("checked") == true) {
            $("#table_recipient input[type=checkbox]").attr("checked", true);
        } else {
            $("#table_recipient input[type=checkbox]").attr("checked", false);
        }
    });
    $("#table_recipient input[type=checkbox]").change(function () {
        step6_save_data_to_form();
    });
});

function editNavigation() { // для ячейки ввода
    $("#edit_input").bind("keydown.edit_input", function (event) {
        if (event.keyCode == 27) {// esc
            finishEditCell($("#activecell"));
            $("#activecell").text(oldCellValue);
        } else if (event.keyCode == 13) {// enter
            finishEditCell($("#activecell"));
            moveCell("right");
            return false;
        }
    });
}

function tableNavigation() { //установка обработки клавиатуры для таблицы
    $(document).bind(kursor_navigation, function (event) {
        if (event.keyCode == 37) {// влево
            moveCell("left");
            return false;
        } else if (event.keyCode == 38) {
            moveCell("top");
            return false;
        } else if (event.keyCode == 39) {
            moveCell("right");
            return false;
        } else if (event.keyCode == 40 || event.keyCode == 13) {
            moveCell("down");
            return false;
        } else if (event.keyCode == 113) {//f2
            $("#activecell").trigger("dblclick");
            return false;
        }
        else if (event.keyCode == 46) {//del
            oldCellValue = $("#activecell").text();
            $("#activecell").text(""); // отчищаем ячейку
            finishEditCell(null);
            undo = $("#activecell");
            //todo undo
            return false;
        }
//                else if("ctrl+z" && undo !== false) { //отмена отчистки ячейки
//                    undo.text(oldCellValue);
//                    undo=false;
//                    }
//
        else if (event.keyCode == 32 ||
            event.keyCode == 178 ||
            event.keyCode == 188 ||
            (event.keyCode >= 109 && event.keyCode <= 111) ||
            (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90) ||
            (event.keyCode >= 96 && event.keyCode <= 107) || (event.keyCode >= 189 && event.keyCode <= 192) ||
            (event.keyCode >= 219 && event.keyCode <= 227)) {
            setEditCell($("#activecell"));
        }
    });
}

function setActiveCell(a) { //делаем новую активную ячейку
    if ($("#edit_input").length == 1)
        finishEditCell($("#activecell"));
    $("#activecell").attr("id", "");
    $(a).attr("id", "activecell");
}

var oldCellValue = ""; //сохраняет последнее значение перед началом редактирования

function setEditCell(a) { //добавляем input
    $(document).unbind(kursor_navigation);
    undo = false;
    $(a).addClass("in_edit");
    oldCellValue = $(a).text();
    $(a).html("<input id='edit_input' value='" + oldCellValue + "'>");
    if ($(a).hasClass("row_index")) {
        $("#edit_input").attr("maxlength", "6").addClass("index");
    }

    $("#edit_input").focus();
    $("#edit_input").select();
    editNavigation();
}

function finishEditCell(a) { // убирает поле редактирования и записывает значение
    $("#edit_input").unbind("keydown.edit_input");
    if (a !== null) {
        $(a).removeClass("in_edit");
        $(a).text($("#edit_input").val());
        tableNavigation();
    }
    if ($("#activecell").hasClass("row_index")) { // для индекса запрашиваем город
        if (!(parseInt($("#activecell").text()) == $("#activecell").text() && $("#activecell").text().length == 6)) {
            if ($("#activecell").text() != "")
                $("#activecell").addClass("index_error");
            else $("#activecell").removeClass("index_error");
        }
        else {
            $("#activecell").removeClass("index_error");
            //$("#step5_index_warning").html("<img src='/images/ajax-loader.gif'>");

            //далее код по загрузке данных на основе индекса
            $.getJSON("//api.print-post.com/api/index/?callback=?", {index: $("#activecell").text()}, function (data) {
                if (data.success == 1) {
                    cell = $(a).parents("tr").children("td.row_region");
                    if (cell.text() == "") {
                        cell.text(data.string);
                        step6_save_data_to_form();
                    }
                }
            });
        }
    }
    if (oldCellValue != $(a).text())
        step6_save_data_to_form();
}

function step6_save_data_to_form() { //сохраняет данные из таблицы в форму
    var step6_table_data = new Object();
    $("#table_recipient tr.data").each(function (index) {
        step6_table_data[index] = new Object();
        step6_table_data[index]['select'] = $(this).find("input[type=checkbox]").attr("checked");
        step6_table_data[index]['name'] = $(this).children("td.row_name").text();
        step6_table_data[index]['index'] = $(this).children("td.row_index").text();
        step6_table_data[index]['street'] = $(this).children("td.row_street").text();
        step6_table_data[index]['region'] = $(this).children("td.row_region").text();
    });
    $("#step6_table_data").val($.toJSON(step6_table_data));
    $.jStorage.set("autosave", $("form").serializeArray()); //принудительное сохранение в locStor

}

function moveCell(a) {

    tr_index = parseInt($("#table_recipient tr").index($("#activecell").parents("tr")));//с нуля
    td_index = parseInt($("#table_recipient tr:eq(" + tr_index + ") td").index($("#activecell")));//с единицы

    if (a == "left") {
        if (td_index != 0)  td_offset = -1;
        else                td_offset = 0;
        tr_offset = 0;
    } else if (a == "top") {
        td_offset = 0;
        if (tr_index != 1)  tr_offset = -1;
        else                tr_offset = 0;
    } else if (a == "right") {
        if (td_index < max_td - 1)  td_offset = 1;
        else                td_offset = 0;
        tr_offset = 0;
    } else if (a == "down") {
        td_offset = 0;
        if (tr_index < max_tr)  tr_offset = 1;
        else                tr_offset = 0;
    }
    $("#activecell").attr("id", "");
    $("#table_recipient tr:eq(" + (tr_index + tr_offset) + ") td:eq(" + (td_index + td_offset) + ")").attr("id", "activecell");
}

