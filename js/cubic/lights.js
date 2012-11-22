
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

    //var tex = new CubicVR.Texture('')


        var scene = new CubicVR.Scene({

            lights : [
/*
                {
                    name      : "point",
                    type      : CubicVR.enums.light.type.POINT,
                    position  : [ 0.0, 3.0, 0.0 ],
                    distance  : 15
                }

                ,
                {
                    name     : "area",
                    type     : "area",
                    position : [ 0.0, -10.0, 0.0 ],
                    intensity : 0.01,
                    areaCeiling: 40,
                    areaFloor: -40,
                    areaAxis: [25.0, 5] // specified in degrees east/west north/south
                },
*/

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


            camera : {
                name     : "camera",
                width    : canvas.width,
                height   : canvas.height,
                position : [ 5.0, 5.0, 5.0 ],
                target   : [ 0, 0, 0 ],
                fov      : 60.0
            },

            sceneObjects : [
                {                            // SceneObject container for the mesh
                    name : 'duck',
                    mesh : CubicVR.loadCollada("assets/models/duck/duck.dae", "assets/models/duck/").getSceneObject("LOD3sp").obj,
                    position: [ 0.0, 0.0, 0.0 ],
                    scale : [ 0.01, 0.01, 0.01 ]
                },

                {                            // SceneObject container for the mesh
                    name : 'duck2',
                    mesh : CubicVR.loadCollada("assets/models/duck/duck.dae", "assets/models/duck/").getSceneObject("LOD3sp").obj,
                    position: [ 12.0, 0.0, 12.0 ],
                    scale : [ 0.01, 0.01, 0.01 ]
                },

                {                            // SceneObject container for the mesh
                    name : 'duck3',
                    mesh : CubicVR.loadCollada("assets/models/duck/duck.dae", "assets/models/duck/").getSceneObject("LOD3sp").obj,
                    position: [ -24.0, 0.0, -24.0 ],
                    scale : [ 0.01, 0.01, 0.01 ]
                }

            ],

            skybox : new CubicVR.SkyBox({ texture : 'assets/textures/skybox.jpg' })

        });

        var l = new CubicVR.Light({
            name      : "spot_shadow",
            type      : CubicVR.enums.light.type.SPOT_SHADOW,
            position  : [ -24.0, 3.0, -24.0 ],
            intensity : 3,
            distance: 200,
            map_res: 1024,
            cutoff: 25
        });

        l.setParent( scene.getSceneObject('duck3') );
        scene.bind(l);



        var current = 0;
        var modal = $('#modal');
        modal.show();
        var headline = modal.find('.headline');
        var details  = modal.find('.details');

        var headlinesA = [ 'Point Light', 'Directional Light', 'Spot Light' ];
        var detailsA = [ 'With diffuse and specular modifiers', '', '' ];

        headline.text( headlinesA[current] );
        details.text( detailsA[current] );

        var mvc = new CubicVR.MouseViewController(canvas, scene.camera);

        mvc.bindEvent('keyPress', function(ctx, mpos, keyCode, keyState) {

            if ( keyCode === CubicVR.keyboard.ENTER ) {
                current = (current + 1) % 3;

                var duck = scene.sceneObjects[current];
                scene.camera.target   = [ duck.x, duck.y, duck.z ];
                scene.camera.position = [ duck.x + 5, duck.y + 5 , duck.z + 5 ];

                headline.text( headlinesA[current] );
                details.text( detailsA[current] );
            }

        });

        CubicVR.MainLoop(function(timer, gl) {

            var ducks = [ 'duck', 'duck2', 'duck3' ];

            for (var i = ducks.length - 1; i >= 0; i--) {
                var duck = scene.getSceneObject( ducks[i] );
                duck.rotY += 1;
            }


            scene.render();

        });

    }


    CubicVR.start('auto', webGLStart);


})( CubicVR, jQuery );
