
(function( window, $ ) {

    "use strict";

    var listItems = $('.item');
    var buttons   = $('.btn');

    var framework = '';


    /* Auxiliary Function */

    var loadTest = function ( script ) {

        // Removing the old canvas
        var canvas = $('#canvas');
        canvas.remove();

        // Creating a new one, added to the webpage
        canvas = $('<canvas id="canvas"></canvas>');
        $('#visual').append( canvas );

        // Canvas resized
        var c = canvas[0];
        c.width  = canvas.parent().width();
        c.height = canvas.parent().height() - $('.header').height();

        // Launch the new test
        var str = '<script type="text/javascript" src="' + script + '"></script>';
        var dom = $(str);
        $('body').append( str );
    };


    /* Event Handlers */

    var testHandler = function ( event ) {

        event.preventDefault();

        if ( ! framework ) {
            showAlert();

        } else {
            var num = $(this).prevAll().length;
            var test = [ 'setup', 'models-json', 'models-collada', 'controls', 'lights', 'collisions' ];

            var currentTest = test[ num ];
            var path = 'js/' + framework + '/';
            var script  = window.location.href + path + currentTest + '.js';

            loadTest( script );
        }

    };


    var buttonsHandler = function( event, param, yeah ) {

        buttons.removeClass('active');
        var b = $(event.target).toggleClass('active');

        var f = b.text();
        framework = f.toLowerCase();

    };


    var showAlert = function ( opt ) {

        var alert = $('.alert');
        var TIME = 5000;

        if ( alert.css('display') === 'none' ) {
            alert.fadeIn();
            setTimeout(function() {
                alert.fadeOut();
            }, TIME);
        }

        /*
        alerts.filter(function(a) {
            return a.hasClass('alert')

        })
        switch (op) {
            case AL.WARNING : break;
            case AL.ERROR   : break;
            case AL.INFO    : break;
            default :
        }
        */

    };


    /* Event Assignments */

    $(listItems).on('click', testHandler);
    $(buttons).on('click', buttonsHandler);


})( window, jQuery );
