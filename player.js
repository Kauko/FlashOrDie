
Crafty.c("Player", {
    _keys: { 
    UP_ARROW: [0,-1],
    }, 

    _onmousemove: function(e){
        this.origin("center");

        this.dire = new Crafty.math.Vector2D(0,0);

        this.dire.x = this.x - e.pageX;
        this.dire.y = this.y - e.pageY;

        this.dire.normalize();

        angle = Math.atan2(this.dire.x, this.dire.y) * 180/3.141;

        this.rotation = -angle;
        console.log(angle);
    },

    init: function() {
      for(var k in this._keys) {
        var keyCode = Crafty.keys[k] || k;
        this._keys[keyCode] = this._keys[k];
      }

      this.bind("Key",function(e) {
        if(this._keys[e.key]) {
          
        }
      })

      Crafty.addEvent(this, Crafty.canvas._canvas, "mousemove", this._onmousemove);
    }
    
  });