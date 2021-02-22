class Game{
    constructor(width = 2000, height = 2000, create = ()=>{}, update = ()=>{}, fps = 30, root = null){
        this.w = width;
        this.h = height;
        this.fps = fps
        this.layers = []
        this.create = create;
        this.update = update;
        if(root == null){
            this.root = document.body
        }else{
            this.root = root;
        }
        this.clock = setInterval(()=>{
            this.update()     
            this.layers.forEach(layer => {
                layer.drawEntities()
                layer.collideEntities()
            });
            this.follow()
        }, 1000/this.fps)
        this.screen = {
            w: window.innerWidth,
            h: window.innerHeight,
        }
        this.camera ={
            x: this.screen.w/2,
            y: this.screen.h/2,
            w: this.screen.w,
            h: this.screen.h,
            follow: false
        }
        
    }
    add(layer){
        this.canvas = document.createElement("canvas")
        this.canvas.setAttribute("width", this.w)
        this.canvas.setAttribute("height", this.h)
        this.root.appendChild(this.canvas)
        this.layers.push(layer)
        layer.initialize(this.layers.length-1, this.canvas, this.w, this.h, this.fps, this.camera)
    }
    follow(){
        
        console.log(this.camera)
        if(this.camera.follow.x - this.camera.w/2 > 0){
            if((this.camera.follow.x + this.camera.w/2) < this.w){
                this.camera.x = this.camera.follow.x + this.camera.follow.velocity.x / this.fps
            }
        }
        if(this.camera.follow.y - this.camera.h/2 > 0){
            if((this.camera.follow.y + this.camera.h/2) < this.h){
                this.camera.y = this.camera.follow.y + this.camera.follow.velocity.y /this.fps
            }
        }
    }
    cameraFollow(entity){
        this.camera.follow = entity
    }
}
export default Game;