
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
                position : [1,1,1],
                lookat   : [0,0,0],
                fov      : 60.0
            },

            sceneObject : {
                name     : "cube",
                position : [0.0, 0.0, 0.0],
                mesh     : {
                    primitive : {
                        type     : "box",
                        size     : 1.0,
                        uvmapper : {
                            projectionMode : "cubic",
                            scale : [1,1,1]
                        }
                    },

                    compile : true
                }
            },

            skybox : new CubicVR.SkyBox({ texture : '../assets/textures/skybox.jpg' })
        });

        CubicVR.addResizeable(scene.camera);

        CubicVR.MainLoop(function(timer, gl) {
            scene.render();
        });
    }


    CubicVR.start('auto', webGLStart);


})( CubicVR );
