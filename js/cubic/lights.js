
(function (CubicVR, $, undefined) {

    "use strict";


    function webGLStart (gl, canvas) {

        var CubicVR = window.CubicVR;

        /* Creating a new scene */

/*
    enums.light = {
        type: {
            NULL: 0,
            POINT: 1,
            DIRECTIONAL: 2,
            SPOT: 3,
            AREA: 4,
            DEPTH_PACK: 5,
            // this lets us pass the shadow stage in as a light definition
            SPOT_SHADOW: 6,
            SPOT_SHADOW_PROJECTOR: 7,
            MAX: 8
        }
    }
*/



        var scene = new CubicVR.Scene({

/*
            lights : [

                {
                    type:"spot_shadow",
                    position : [ 12.0, 1.0, 12.0 ],
                    intensity:1,
                    distance:100,
                    map_res:1024,
                    cutoff:90
                }
                */
/*
                {
                    name     : "area",
                    type     : "area",
                    position : [ 0.0, -10.0, 0.0 ],
                    intensity : 0.01,
                    areaCeiling: 40,
                    areaFloor: -40,
                    areaAxis: [25.0, 5] // specified in degrees east/west north/south
                },


                {
                    name: "spot_shadow",
                    type: "spot_shadow",
                    position  : [ -24.0, 3.0, -24.0 ],
                    target    : [ -24.0, 0.0, -24.0 ],
                    intensity: 0.6,
                    distance: 200,
                    map_res: 1024,
                    cutoff: 25
                }

            ],
*/


            camera : {
                name     : "camera",
                width    : canvas.width,
                height   : canvas.height,
                position : [ 5.0, 5.0, 5.0 ],
                target   : [ 0, 0, 0 ],
                fov      : 60.0
            },

            sceneObjects : [
                {
                    name : 'duck',
                    mesh : CubicVR.loadCollada("assets/models/duck/duck.dae", "assets/models/duck/").getSceneObject("LOD3sp").obj,
                    position: [ 0.0, 0.0, 0.0 ],
                    scale : [ 0.01, 0.01, 0.01 ]
                }

            ],

            skybox : new CubicVR.SkyBox({ texture : 'assets/textures/skybox.jpg' })

        });

        var duck = scene.getSceneObject( 'duck' );


        var points = function () {

            var pos = [
                [  3.0, 0.0,  0.0 ],
                [  0.0, 0.0, -3.0 ],
                [ -3.0, 0.0,  0.0 ],
                [  0.0, 0.0,  3.0 ]
            ];

            var diffuse = [
                [ 255.0, 0.0, 0.0 ],
                [ 0.0,   255.0, 0.0 ],
                [ 0.0,   0.0, 255.0 ],
                [ 70.0,   70.0, 70.0 ]
            ];

            for (var i = 0; i < pos.length; i++) {

                var l = new CubicVR.Light({
                    name     : "point" + i,
                    type     : "point",
                    position : pos[i],
                    diffuse  : diffuse[i],
                    distance : 15
                });

                scene.bind(l);
            }

        };


        var directionals = function () {

            var dir = [
                [ 0.0, -1.0, 0.0 ],
                [ 0.0,  1.0, 0.0 ]
            ];

            for (var i = 0; i < dir.length; i++) {

                var l = new CubicVR.Light({
                    name      : "directional" + i,
                    type      : "directional",
                    direction : dir[i]
                });

                scene.bind(l);
            }
        };


        var spots = function () {

            var pos = [
                [  10.0, 0.0,  10.0 ],
                [ -10.0, 0.0, -10.0 ]
            ];

            for (var i = 0; i < pos.length; i++) {

                var l = new CubicVR.Light({
                    name      : "spot" + i,
                    type      : "spot",
                    position  : pos[i],
                    diffuse: [1,1,1],
                    specular: [1,1,1],
                    cutoff   : 90.0,
                    direction : [ 0.0, 1.0, 0.0],
                    distance : 20,
                    intensity : 4

                });

                l.lookat( duck.pos );
                scene.bind(l);
            }

        };


        var area = function () {
            var l = new CubicVR.Light({
                name : "area",
                type : "area"
            });

            scene.bind(l);
        };


        var current = 0;
        var modal = $('#modal');
        modal.show();
        var headline = modal.find('.headline');
        var details  = modal.find('.details');

        var headlinesA = [ 'Point Light', 'Directional Light', 'Spot Light', 'Ambient Light' ];
        var detailsA = [ 'with diffuse and specular modifiers', '', '', '' ];

        headline.text( headlinesA[current] );
        details.text( detailsA[current] );


        var mvc = new CubicVR.MouseViewController(canvas, scene.camera);

        mvc.bindEvent('keyPress', function(ctx, mpos, keyCode, keyState) {

            var lights = [ points, directionals, spots, area ];

            if ( keyCode === CubicVR.keyboard.ENTER ) {
                current = (current + 1) % lights.length;

                scene.lights = [];
                lights[ current ]();

                headline.text( headlinesA[current] );
                details.text( detailsA[current] );
            }

        });


        function changeLight( pos ) {

            var i = pos;
            var light = scene.lights[i];
            var time = Date.now() * 0.0005;

            switch ( current ) {
                case 0 : light.pos = [
                            Math.sin( time * 0.7 * (i+1) / 4) * 10,
                            Math.cos( time * 0.5 * (i+1) / 4) * 10,
                            Math.cos( time * 0.3 * (i+1) / 4) * 10
                         ];
                         break;
                case 1 :
                case 2 :
                        light.setDirection(
                            Math.sin( time * 0.7 * (i+1) / 4),
                            Math.cos( time * 0.5 * (i+1) / 4),
                            Math.cos( time * 0.3 * (i+1) / 4)
                        );
                        break;
            }

        }


        CubicVR.MainLoop(function(timer, gl) {

            duck.rotY += 1;

            for (var i = 0; i < scene.lights.length; i++) {
                changeLight( i );
            }

            scene.render();

        });


        // Initialization

        points();

    }


    CubicVR.start('auto', webGLStart);


})( CubicVR, jQuery );