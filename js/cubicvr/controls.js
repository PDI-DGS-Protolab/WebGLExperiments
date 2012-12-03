
(function (CubicVR, undefined){

    "use strict";


    function webGLStart (gl, canvas) {

        var CubicVR = window.CubicVR;

        /* Creating a new scene */

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

            ]

        });

        scene.setSkyBox(new CubicVR.SkyBox({
            texture : '../assets/textures/skybox.jpg'
        }));


        /* Importing a model in XML format */

        var shipMesh = new CubicVR.loadMesh("../assets/models/starship/ship-main.json");
        shipMesh.clean();

        var shipObject = new CubicVR.SceneObject({
            name : 'car',
            mesh : shipMesh,
            position : [ 0, 0, 0 ],
            rotation : [ 0, 180, 0 ],
            scale : [ 0.1, 0.1, 0.1 ]
        });

        scene.bind(shipObject);

        // Camera resizable with enabled controls
        CubicVR.addResizeable(scene.camera);


        /* Movement variables */

        var rot = 0;
        var moving  = 0;
        var turning = 0;
        var speedMod = 15;


        /* Configuring ship controls */

        var keyDownHandler = function (keyCode) {

            var kbd = CubicVR.keyboard;

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

        };


        var keyUpHandler = function ( keyCode ) {

            var kbd = CubicVR.keyboard;

            if (keyCode === kbd.UP_ARROW || keyCode === kbd.DOWN_ARROW) {
                moving = 0;

            } else if (keyCode === kbd.LEFT_ARROW || keyCode === kbd.RIGHT_ARROW) {
                turning = 0;
            }

        };


        var mvc = new CubicVR.MouseViewController(canvas, scene.camera);

        mvc.bindEvent('keyDown', function(ctx, mpos, keyCode, keyState) {
            keyDownHandler(keyCode);
        });

        mvc.bindEvent('keyUp', function(ctx, mpos, keyCode, keyState) {
            keyUpHandler(keyCode);
        });


        window.parent.addEventListener('keydown', function ( event ) {
            keyDownHandler( event.which );

        }, false);


        window.parent.addEventListener('keyup', function ( event ) {
            keyUpHandler( event.which );

        }, false);


        /* Main Animation Loop */

        CubicVR.MainLoop(function(timer, gl) {

            var car = scene.getSceneObject('car');

            if (moving) {
                var move  = moving / speedMod;
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
            scene.render();

        });

    }


    CubicVR.start('auto', webGLStart);


})( CubicVR );
