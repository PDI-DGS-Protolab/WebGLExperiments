
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
        scene.bindSceneObject(duck);                                      // Add SceneObject containing the mesh to the scene


        // Camera resizable with enabled controls
        CubicVR.addResizeable(scene.camera);
        var mvc = new CubicVR.MouseViewController(canvas, scene.camera);


        scene.setSkyBox(new CubicVR.SkyBox({
            texture : 'assets/textures/skybox.jpg'
        }));


        CubicVR.MainLoop(function(timer, gl) {
            scene.render();
        });

    }


    CubicVR.start('#canvas', webGLStart);


})( CubicVR );
