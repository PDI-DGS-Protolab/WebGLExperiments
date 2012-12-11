movement =
  forward  : 0
  backward : 0
  left     : 0
  right    : 0

Jax.Controller.create "Teapot", ApplicationController,
    size: 1.0
    rotation_speed: 1.0 # in radians per second

    index: ->
        @teapot = new Jax.Model
            position: [0, 0, -5]
            direction: [3, 0, 3]
            mesh: new Jax.Mesh.Cube
                material: "teapot"

        sky = new Jax.Model
                mesh: new Jax.Mesh.Sphere
                    radius : 25
                    material : Material.find("skybox")

        @skybox = @world.addObject sky
        @world.addObject @teapot
        @world.addLightSource "sun"
        @player.camera.lookAt [0, 0, -5], [0, 1.25, -3]


    mouse_dragged: (event) ->
        console.log('dragging')
        @player.camera.pitch 0.01 *  event.diffy
        @player.camera.yaw   0.01 * -event.diffx


    key_pressed: (event) ->
        switch event.keyCode
            when KeyEvent.DOM_VK_UP    then movement.forward  = -1
            when KeyEvent.DOM_VK_DOWN  then movement.backward =  1
            when KeyEvent.DOM_VK_LEFT  then movement.left     =  1
            when KeyEvent.DOM_VK_RIGHT then movement.right    = -1


    key_released: (event) ->
        switch event.keyCode
            when KeyEvent.DOM_VK_UP    then movement.forward  = 0
            when KeyEvent.DOM_VK_DOWN  then movement.backward = 0
            when KeyEvent.DOM_VK_LEFT  then movement.left     = 0
            when KeyEvent.DOM_VK_RIGHT then movement.right    = 0


    update: (timechange) ->
        speed = 1.5 * timechange
        @teapot.camera.move (movement.forward + movement.backward) * speed
        # @teapot.camera.strafe (movement.left + movement.right) * speed

        if movement.left
            @teapot.camera.rotate Math.PI / 90, 0, 1, 0
        else if movement.right
            @teapot.camera.rotate -Math.PI / 90, 0, 1, 0

        if movement.forward or movement.backward or movement.left or movement.right
            @player.camera.lookAt @teapot.camera.getPosition @player.camera.getPosition
