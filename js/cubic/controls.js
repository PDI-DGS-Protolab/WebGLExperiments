
(function (CubicVR, undefined){

    "use strict";


    function webGLStart (gl, canvas) {

        var CubicVR = window.CubicVR;

        var scene = new CubicVR.Scene({

            light : {
                name     : "light",
                type     : "point",
                position : [1.0, 1.5, -2.0]
            },

            camera : {
                name     : "camera",
                width    : canvas.width,
                height   : canvas.height,
                position : [1.0, 1.0, 1.0],
                target   : [0, 0, 0],
                fov      : 60.0
            },

            sceneObjects : []

        });


        // Collada model imported

        var colladaScene = CubicVR.loadCollada("assets/duck/duck.dae", "assets/duck/");
        var duckMesh = colladaScene.getSceneObject("LOD3sp").obj;           // need to know it's name in the default scene
        var duck = new CubicVR.SceneObject({                            // SceneObject container for the mesh
            name : 'duck',
            mesh : duckMesh,
            position: [ 0.0, 0.0, 0.0 ],
            scale : [ 0.005, 0.005, 0.005 ]
        });
        scene.bindSceneObject(duck);

/*
        var wolfMesh = CubicVR.get("assets/duck/duck.json", CubicVR.Mesh);
        var wolf = new CubicVR.SceneObject({
            mesh     : wolfMesh,
            position : [0.0, 0.0, -2.0],
            //scale    : [10.0, 10.0, 10.0]
            scale : [ 0.005, 0.005, 0.005 ]
        });

        scene.bindSceneObject(wolf);
*/

        // Camera resizable with enabled controls
        CubicVR.addResizeable(scene.camera);

        var moving  = 0;
        var turning = 0;
        var kbd = CubicVR.keyboard;

        var mvc = new CubicVR.MouseViewController(canvas, scene.camera);
        mvc.setEvents({

            keyDown : function(ctx, mpos, keyCode, keyState) {

                if (keyCode === kbd.UP_ARROW) {
                    moving = 1;

                } else if (keyCode === kbd.DOWN_ARROW) {
                    moving = -1;
                }

                if (keyCode === kbd.LEFT_ARROW) {
                    turning = 1;

                } else if (keyCode === kbd.RIGHT_ARROW) {
                    turning = -1;
                }

                return true;
            },

            keyUp : function(ctx, mpos, keyCode, keyState) {

                if (keyCode === kbd.UP_ARROW || keyCode === kbd.DOWN_ARROW) {
                    moving = 0;

                } else if (keyCode === kbd.LEFT_ARROW || keyCode === kbd.RIGHT_ARROW) {
                    turning = 0;
                }

                return true;
            },

            mouseMove: function (ctx, mpos, mdelta, keyState) {
                if (!ctx.mdown) return;

                ctx.orbitView(mdelta);
                //          ctx.panView(mdelta);
            },

            mouseWheel: function (ctx, mpos, wdelta, keyState) {
                ctx.zoomView(wdelta);
            }

        });




        scene.setSkyBox(new CubicVR.SkyBox({
            texture : 'assets/textures/skybox.jpg'
        }));


        CubicVR.MainLoop(function(timer, gl) {
            scene.render();

            if (moving) {
                scene.getSceneObject('duck').x += moving / 100;
            }

            if (turning) {
                scene.getSceneObject('duck').z -= turning / 100;
            }

        });

    }


    CubicVR.start('auto', webGLStart);


})( CubicVR );
