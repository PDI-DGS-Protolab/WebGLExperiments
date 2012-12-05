
(function( window, $ ) {

    "use strict";



    /* Global Variables */

    var listItems = $('.item');
    var buttons   = $('.btn');

    var framework = "";



    /* Auxiliary Functions */

    var loadIframe = function( iframe, test ) {

        iframe = iframe[0];

        var path = '../js/'  + framework + '/';

        var js   = path + test + '.js';
        var script= document.createElement('script');
        script.type= 'text/javascript';
        script.src= js;

        var bodyiframe = iframe.contentDocument.body;
        bodyiframe.appendChild( script );

        toggleJaxCanvas( bodyiframe );

    };


    var loadTest = function ( test, callback ) {

        var iframe = $('iframe');
        iframe.attr({ 'src' : 'html/iframe.html' });

        setTimeout(function() {
            callback(iframe, test);
        }, 200);

    };


    var getNameTest = function ( test ) {

        var nameTest = test.find('a').attr('href');
        return nameTest.slice( 1, nameTest.length );

    };


    var toggleJaxCanvas = function( body ) {

        var jaxCanvas = $(body).find('#canvas');

        if ( framework === 'jax' ) {
            jaxCanvas.removeClass('hidden');

        } else {
            jaxCanvas.addClass('hidden');
        }

    };



    /* Event Handlers */

    var testHandler = function ( event ) {

        event.preventDefault();

        var num = $(this).prevAll().length;

        listItems.removeClass('active');
        var test = listItems.eq(num).addClass('active');

        var nameTest = getNameTest( test );

        loadTest( nameTest, loadIframe );

    };


    var buttonsHandler = function( event, param ) {

        buttons.removeClass('active');
        var b = $(event.target).toggleClass('active');

        var f = b.text();
        framework = f.toLowerCase();

        var test = listItems.filter(function(i) {
            return listItems.eq(i).hasClass('active');
        });

        var nameTest = getNameTest( test );
        loadTest( nameTest, loadIframe );

    };


    /*
    var showAlert = function ( opt ) {

        var alert = $('.alert');
        var TIME = 5000;

        if ( alert.css('display') === 'none' ) {
            alert.fadeIn();
            setTimeout(function() {
                alert.fadeOut();
            }, TIME);
        }

    };
    */



    /* Main */

    (function() {

        // Initialize visualizator loading the first test and first framework
        var name = getNameTest( listItems.first() );
        loadTest( name, loadIframe );

        framework = buttons.first()
                        .addClass('active')
                        .text().toLowerCase();


        // Event Assignments
        $(listItems).on('click', testHandler);
        $(buttons).on('click', buttonsHandler);

    })();




})( window, jQuery );
