Jax.Controller.create "Teapot", ApplicationController,
    index: ->
        teapot = new Jax.Model
            position: [0, 0, -5]
            direction: [3, 0, 3]
            mesh: new Jax.Mesh.Cube
                material: "teapot"

        @world.addObject teapot
        @world.addLightSource "sun"
        @player.camera.lookAt [0, 0, -5], [0, 1.25, -3]

    mouse_pressed: (event) ->
