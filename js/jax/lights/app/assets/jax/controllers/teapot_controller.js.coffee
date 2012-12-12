
movement =
  forward  : 0
  backward : 0
  left     : 0
  right    : 0

modal = $('#modal')
headline = modal.find('.headline')
details  = modal.find('.details')

headlinesA = [ 'Point Light', 'Directional Light', 'Spot Light' ]
detailsA = [ 'Red, Green and Blue colors', 'Blue', 'Violet and Brown' ]


Jax.Controller.create "Teapot", ApplicationController,

    pos : [0, -0.5, 0]

    currentLight : 0

    point: ->
        @world.addLightSource "point1"
        @world.addLightSource "point2"
        @world.addLightSource "point3"

    directional: ->
        @world.addLightSource "sun1"

    spot: ->
        @world.addLightSource "spot1"
        @world.addLightSource "spot2"

    changeLights : ->
        @lights = [ @point, @directional, @spot ]
        f = @lights[@currentLight]
        headline.text headlinesA[@currentLight]
        details.text detailsA[@currentLight]
        f.call(this)
        modal.show().addClass('darkModal').removeClass('whiteModal');

    index: ->
        @createScene()
        modal.show()
        that = this

        window.parent.addEventListener 'keydown', (event) ->
            that.key_pressed( event )
        , false

    createScene: ->
        @teapot = new Jax.Model
            position: @pos
            direction: [3, 0, 3]
            mesh: new Jax.Mesh.Cube
                material: "teapot"

        @skybox = @world.addObject(new Jax.Model({mesh: new Jax.Mesh.Sphere({radius:25,material:Material.find("skybox")})}));

        @world.addObject @teapot
        @player.camera.lookAt @pos, [0, 1.25, -3]

        @changeLights()


    mouse_dragged: (event) ->
        @player.camera.move 0.01 * event.diffy
        @player.camera.strafe 0.01 * -event.diffx
        @player.camera.lookAt @teapot.camera.getPosition @player.camera.getPosition


    key_pressed: (event) ->
        if event.keyCode is KeyEvent.DOM_VK_RETURN
            @world.dispose()
            @currentLight = (@currentLight + 1) % @lights.length
            @createScene()


    update: (timechange) ->
        speed = 1.5 * timechange
        degrees = Math.PI / 120
        @teapot.camera.rotate degrees, 0, 1, 0
