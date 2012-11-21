
(function (CubicVR, undefined) {

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

            lights : [
                {
                    name     : "point",
                    type     : "point",
                    position : [ 0.0, 0.0, 0.0 ]
                },

                {
                    name     : "directional",
                    type     : "directional",
                    position : [ 4.0, 0.0, 0.0 ]
                },

                {
                    name     : "spot",
                    type     : "spot",
                    position : [ 0.0, 0.0, 4.0 ]
                }
/*
                {
                    name     : "area",
                    type     : "area",
                    position : [ 4.0, 0.0, 4.0 ]
                }
*/
            ],


            camera : {
                name     : "camera",
                width    : canvas.width,
                height   : canvas.height,
                position : [ 5.0, 5.0, 5.0 ],
                target   : [ 0, 0, 0 ],
                fov      : 60.0
            },

            sceneObjects : [{                            // SceneObject container for the mesh
                name : 'duck',
                mesh : CubicVR.loadCollada("assets/models/duck/duck.dae", "assets/models/duck/").getSceneObject("LOD3sp").obj,
                position: [ 0.0, 0.0, 0.0 ],
                scale : [ 0.01, 0.01, 0.01 ]
            }],

            skybox : new CubicVR.SkyBox({ texture : 'assets/textures/skybox.jpg' })

        });

        var mvc = new CubicVR.MouseViewController(canvas, scene.camera);


        CubicVR.MainLoop(function(timer, gl) {

            var duck = scene.getSceneObject('duck');

            duck.rotY += 1;

            scene.camera.target = [ duck.x, duck.y, duck.z ];
            scene.render();

        });

    }


    CubicVR.start('auto', webGLStart);


})( CubicVR );
