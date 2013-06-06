/*
 *  Project:
 *  Description:
 *  Author:
 *  License:
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "ribbonize", expanded_ribbon = false,
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).

            var element = $(this.element);            

            $(this.element).append('<div id="toggle-ribbon" style="position:absolute; width:7vw; height:7vw; cursor:pointer; background:black;"></div>');

            $(this.element).find('li').css({
                'width': '5vw',
                'height': '8vh',
                'margin': 'auto',
                'font-size': '1vw',
                'background': 'blue'
            });     

            $(this.element).find('i').css({
                'width': '5vw',
                'height': '5vh',
                'background': 'green'
            }); 

            $(this.element).css({
                'position': 'absolute',
                'list-style': 'none',
                'width': '7vw',
                'text-align': 'center',
                'top': $('#toggle-ribbon').height() - element.height() - 40 + 'px',
                'padding-top': '38px',
                'background': 'red'
            });

            $('#toggle-ribbon').click(function () {
                if (expanded_ribbon) {
// collapse   
                    element.animate({
                        'top': $('#toggle-ribbon').height() - element.height() - 40 + 'px'
                    }, 500);

                    expanded_ribbon = !expanded_ribbon;
                    console.log('collapse ribbon');

                } else {
// expand
                    element.animate({
                        'top': '0px'
                    }, 500, function () {
                        element.animate({
                            'top': '-30px'
                        }, 100);
                    });

                    expanded_ribbon = !expanded_ribbon;
                    console.log('expand ribbon');

                }
            });
        },

        toggle_ribbon: function(el, options) {
            // some logic
            alert("Hello");
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );