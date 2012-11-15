(function (CubicVR, undefined){

    "use strict";

    function webGLStart(gl,canvas) {
        var scene = new CubicVR.Scene({
            light   :{
            },
            camera  :{
                name     : "camera",
                width    : canvas.width,
                height   : canvas.height,
                position : [1,1,1],
                lookat   : [0,0,0]
            },
            obj     :{
                name        : "cube",
                primitive   : {
                    type     : "box",
                    size     : 1.0,
                    uvmapper : {
                        projectionMode : "cubic",
                        scale : [1,1,1]
                    }
                },
                compile : true
            }
        });

        CubicVR.addResizeable(scene.camera);

        scene.setSkyBox();

        CubicVR.MainLoop(function(timer,gl){
            scene.render();
        });
    }

    CubicVR.start('auto',webGLStart);

})( CubicVR );
