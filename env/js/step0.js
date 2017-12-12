$(document).ready(function() {
    acrobat_version = PluginDetect.getVersion('AdobeReader');
    if (acrobat_version === null) {
        $("#acrobat_no").show();
    } else {
        $("#acrobat_yes").show();
    }

    $("#goto_step1").click(function() {
        document.location.href = "#one";
    });
});


function before_step0(){
$("#goto_step1").focus();
}