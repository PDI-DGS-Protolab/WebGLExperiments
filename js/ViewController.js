
(function( window, $ ) {

    "use strict";

    var listItems = $('.item');
    var buttons   = $('.btn');

    var framework = buttons.eq(0).addClass('active').text().toLowerCase();


    /* Auxiliary Function */

    var loadIframe = function( iframe, test ) {

        iframe = iframe[0];

        var path = '../js/'  + framework + '/';

        var js   = path + test + '.js';
        var script= document.createElement('script');
        script.type= 'text/javascript';
        script.src= js;


        var bodyiframe = iframe.contentDocument.body;
        bodyiframe.appendChild( script );

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
        nameTest = nameTest.slice( 1, nameTest.length );
        return nameTest;
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


    var buttonsHandler = function( event, param, yeah ) {

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
    var name = getNameTest( listItems.first() );
    loadTest( name, loadIframe );


    /* Event Assignments */

    $(listItems).on('click', testHandler);
    $(buttons).on('click', buttonsHandler);


})( window, jQuery );
