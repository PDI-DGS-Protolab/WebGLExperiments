
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


        /* Main Animation Loop */

        CubicVR.MainLoop(function(timer, gl) {
            scene.render();
        });

    }


    CubicVR.start('auto', webGLStart);


})( CubicVR );
