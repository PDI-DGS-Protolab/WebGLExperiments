Jax.Controller.create "Teapot", ApplicationController,

    currentLight : 0

    point: ->
        @world.addLightSource "point1"
        @world.addLightSource "point2"
        @world.addLightSource "point3"
        @world.addLightSource "point4"

    directional: ->
        @world.addLightSource "sun1"
        @world.addLightSource "sun2"

    spot: ->
        @world.addLightSource "spot"

    changeLights : ->
        l = [ @point, @directional, @spot ]
        f = l[@currentLight]
        f.call(this)

    index: ->
        @createScene()


    createScene: ->
        teapot = new Jax.Model
            position: [0, 0, -5]
            direction: [3, 0, 3]
            mesh: new Jax.Mesh.Cube
                material: "teapot"

        @skybox = @world.addObject(new Jax.Model({mesh: new Jax.Mesh.Sphere({radius:25,material:Material.find("skybox")})}));

        @world.addObject teapot
        @player.camera.lookAt [0, 0, -5], [0, 1.25, -3]

        @changeLights()


    key_pressed: (event) ->
        if event.keyCode is KeyEvent.DOM_VK_ENTER
            console.log "hola"
            @world.dispose()
            @currentLight = (@currentLight + 1) % @currentLight.length
            @createScene()


    update: ->

