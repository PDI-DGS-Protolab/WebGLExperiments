
(function (CubicVR, undefined){

    "use strict";


    function webGLStart (gl, canvas) {

        var CubicVR = window.CubicVR;

        var scene = new CubicVR.Scene({

            light : {
                name     : "light",
                type     : "point",
                position : [0.0, 2.0, 0.0]
            },

            camera : {
                name     : "camera",
                width    : canvas.width,
                height   : canvas.height,
                position : [0.0, 0.5, -2.0],
                target   : [0, 0, 0],
                fov      : 60.0
            },

            sceneObjects : [
                {
                    name : "plane",
                    position : [0.0, 0.0, 0.0],
                    rotation : [90, 0, 0],
                    mesh: {
                        primitive: {
                            type: "plane",
                            size: 10.0,
                            material: {
                                textures: {
                                    color: "assets/textures/plane.jpg"
                                }
                            },
                            uv: {
                                projectionMode: "planar"
                                //scale: [0.015, 0.015, 0.015]
                            }
                        },
                        compile: true
                    }
                }
            ]

        });


        // Collada model imported
/*
        var colladaScene = CubicVR.loadCollada("assets/duck/duck.dae", "assets/duck/");
        var duckMesh = colladaScene.getSceneObject("LOD3sp").obj;           // need to know it's name in the default scene
        var duck = new CubicVR.SceneObject({                            // SceneObject container for the mesh
            name : 'duck',
            mesh : duckMesh,
            position: [ 0.0, -0.05, 0.0 ],
            scale : [ 0.005, 0.005, 0.005 ]
        });
        scene.bindSceneObject(duck);
*/

        var colladaScene = CubicVR.loadCollada("assets/models/sportscar/car1.dae", "assets/models/sportscar/");
        var carMesh = colladaScene.getSceneObject("car1").obj;           // need to know it's name in the default scene
        var car = new CubicVR.SceneObject({                            // SceneObject container for the mesh
            name : 'car',
            mesh : carMesh,
            position: [ 0.0, 0.015, 0.0 ],
            scale : [ 0.1, 0.1, 0.1 ]
        });
        scene.bindSceneObject(car);


        // Camera resizable with enabled controls
        CubicVR.addResizeable(scene.camera);

        var rot = 0;
        var moving  = 0;
        var turning = 0;
        var kbd = CubicVR.keyboard;

        var mvc = new CubicVR.MouseViewController(canvas, scene.camera);

        mvc.bindEvent('keyDown', function(ctx, mpos, keyCode, keyState) {

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

            //return true;
        });

        mvc.bindEvent('keyUp', function(ctx, mpos, keyCode, keyState) {

            if (keyCode === kbd.UP_ARROW || keyCode === kbd.DOWN_ARROW) {
                moving = 0;

            } else if (keyCode === kbd.LEFT_ARROW || keyCode === kbd.RIGHT_ARROW) {
                turning = 0;
            }

            //return true;
        });


        scene.setSkyBox(new CubicVR.SkyBox({
            texture : 'assets/textures/skybox.jpg'
        }));


        CubicVR.MainLoop(function(timer, gl) {

            var car = scene.getSceneObject('car');

            scene.render();

            if (moving) {
                var move  = moving / 30;
                var angle = rot * Math.PI / 180;
                car.x += move * Math.sin(angle);
                car.z += move * Math.cos(angle);
            }

            if (turning) {
                rot += turning;
                rot %= 360;
                car.rotY += turning;
            }

            scene.camera.target = [ car.x, car.y, car.z ];

        });

    }


    CubicVR.start('auto', webGLStart);


})( CubicVR );
