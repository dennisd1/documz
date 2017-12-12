(function($) {
        $.fn.digitalInt = function() {
            return this.bind("keypress", function(event) {
                var value = $(this).val();
                if (value == parseInt(value)) {
                    value = parseInt(value);
                    if (event.keyCode == 38) { //up
                        $(this).val(value + 1);
                    } else if (event.keyCode == 40) { //down
                        $(this).val(value - 1);
                    }
                }
            });
        }
    })(jQuery);

(function($) {
        $.fn.digitalFloat = function() {
            return this.bind("keypress", function(event) {
                var value = $(this).val();
                if (value == parseFloat(value)) {
                    value = parseFloat(value);
                    if (event.shiftKey) add=1;
                        else add=.1;
                    if (event.keyCode == 38) { //up
                        $(this).val((value + add).toFixed(1));
                    } else if (event.keyCode == 40) { //down
                        $(this).val((value - add).toFixed(1));
                    }
                }
            });
        }
    })(jQuery);