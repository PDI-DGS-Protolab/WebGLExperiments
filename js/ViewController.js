
(function( window, $ ) {

    "use strict";



    /* Global Variables */

    var listItems = $('.item');
    var buttons   = $('.btn');

    var framework = "";



    /* Auxiliary Functions */


    var loadIframe = function( iframe, test ) {

        var path = '../js/'  + framework + '/';

        var script  = document.createElement('script');
        script.type = 'text/javascript';
        script.src  = path + test + '.js';

        var bodyiframe = iframe.contentDocument.body;
        bodyiframe.appendChild( script );
        toggleJaxCanvas( bodyiframe );
    };


    var loadTest = function ( test, callback ) {

        var iframe = $('iframe')[0];

        iframe.contentWindow.location.reload();
        iframe.onload = function() {
            callback(iframe, test);
        };

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


    var getTestsFromServer = function( callback ) {

        var path = 'js/' + framework;

        $.get(path, function(data) {

            var links = $(data).find('a');

            var scriptsList = [];

            for (var i = 0; i < links.length; i++) {
                var s = links.eq(i).attr('href');
                var l = s.length;


                if ( s.substring( l-2, l ) === 'js' ) {
                    var name = s.substring( 0, l-3 );
                    scriptsList.push( name );
                }
            }

            callback( scriptsList );

        });

    };


    var enableTests = function() {

        getTestsFromServer(function(scripts) {

            for (var i = 0; i < listItems.length; i++) {

                var item = listItems.eq(i);

                var s = scripts.filter(function(i) {
                    var name = item.find('a').attr('href');
                    name = name.substring( 1, name.length );
                    return i === name;
                });

                if ( s.length ) {   // The test script exists
                    item.removeClass('disable').addClass('enable');
                    item.on('click', testHandler);
                } else {
                    item.addClass('disable').removeClass('enable');
                    item.off('click', testHandler);
                }

            }

        });

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


    var buttonsHandler = function( event ) {

        event.preventDefault();

        buttons.removeClass('active');
        var b = $(event.target).toggleClass('active');

        var f = b.text();
        framework = f.toLowerCase();

        var test = listItems.filter(function(i) {
            return listItems.eq(i).hasClass('active');
        });

        var nameTest = getNameTest( test );

        enableTests();
        loadTest( nameTest, loadIframe );

    };



    /* Main */

    (function() {

        // Initialize visualizator loading the first test and first framework
        var name = getNameTest( listItems.first() );
        loadTest( name, loadIframe );

        framework = buttons.first()
                        .addClass('active')
                        .text().toLowerCase();

        enableTests();

        // Event Assignments
        $(listItems).on('click', testHandler);
        $(buttons).on('click', buttonsHandler);

    })();



})( window, jQuery );
