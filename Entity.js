import Sprite from "./Sprite.js"
class Entity{
    constructor(x = 0,y = 0,sprite = null){
        console.log(this)
        this.x = x;
        this.y = y;
        this.scale = {
            x: 1,
            y:1
        }
        this.pivot = {
            x:0,
            y:0
        }
        this.velocity = {
            ideal: 0,
            x: 0,
            y: 0
        }
        this.friction = 0;
        this.rotation = 0;
        if(sprite == null){
            console.warn("You did not enter the Sprite variable so I set the default 😁")
            this.sprite = new Sprite("./","default.png")
        }else{
            this.sprite = sprite
        }
        this.w = this.sprite.img.w
        this.h = this.sprite.img.h

    }
    move(fps){
        if(this.toPoint != undefined){
            const px = this.toPoint.px
            const py = this.toPoint.py
            const max = Math.max(Math.abs(px-this.cx), Math.abs(py-this.cy))
            const min = Math.min(Math.abs(px-this.cx), Math.abs(py-this.cy))
            const relation = Math.abs(min/max)
            let f1 = 1, //Wiktor, pamiętam Twoje zmienne
            f2 = 1
            if((px - this.cx) < 0){
                f1 = -1
            }
            if((py -this.cy) < 0){
                f2 = -1
            }
            if(Math.abs(px - this.cx) > Math.abs(py -this.cy)){
                this.setVelocity(f1 * this.velocity.ideal,f2 * this.velocity.ideal*relation, false)
            }else{
                this.setVelocity(f1 * this.velocity.ideal*relation,f2 * this.velocity.ideal, false)
            } 
            this.toPoint = undefined
        }
        let toAddX,
        toAddY
        if(this.velocity.x > 0){
            toAddX = -this.friction
        }else if (this.velocity.x < 0){
            toAddX = this.friction
        }else{
            toAddX = 0
        }
        if(this.velocity.y > 0){
            toAddY = -this.friction
        }else if (this.velocity.y < 0){
            toAddY = this.friction
        }else{
            toAddY = 0
        }
        this.x += (this.velocity.x / fps) + (toAddX/fps);
        this.y += (this.velocity.y / fps)+ (toAddY/fps)
    }
    draw(context = null, camera){
        if(context != null && camera != undefined){
            this.cx = this.x - camera.x + camera.w /2 
            this.cy = this.y - camera.y + camera.h /2
            context.save()
            context.translate(this.cx + this.pivot.x, this.cy + this.pivot.y)
            context.rotate(this.rotation)
            context.drawImage(this.sprite.img, -this.pivot.x, -this.pivot.y, this.sprite.w * this.scale.x, this.sprite.h * this.scale.y)
            context.restore()
        }else{
            console.error("Entity was not added to the layer!")
        }
    }
    delete(){
        if(this.layer != undefined){
            this.layer.delete(this)
        }else{
            console.error("Entity was not added to the layer, so it can not be removed!")
        }
    }
    rotateToMouse(e){
        const targetX = e.pageX - (this.cx + this.pivot.x)
        const targetY = e.pageY - (this.cy + this.pivot.y)
        const rotation = Math.atan2(targetY, targetX)
        this.rotation = rotation
    }
    moveToPoint(px,py){
        this.toPoint = {
            px: px,
            py: py
        }
    }
    set isRotatingToMouse(is = false){
        if(is){
            window.addEventListener("mousemove", (e)=>{
                this.rotateToMouse(e)
            })
            // window.addEventListener("click", (e)=>{ //For testing moveToPoint
            //     this.moveToPoint(e.pageX, e.pageY)
            // })
        }
    }
    set scaleX(scale = 1){
        this.scale.x = scale
    }
    set scaleY(scale = 1){
        this.scale.y = scale
    }
    set pivotX(pivot = 0){
        this.pivot.x = pivot
    }
    set pivotY(pivot = 0){
        this.pivot.y= pivot
    }
    set velocityX(velocity = 0){
        this.velocity.x = velocity
    }
    set velocityY(velocity = 0){
        this.velocity.y= velocity
    }
    setScale(x = 0, y = null){
        this.scale.x = x;
        if(y == null){
            this.scale.y = x;
        }else{
            this.scale.y = y;
        }
    }
    setPivot(x = 0, y = null){
        this.pivot.x = x;
        if(y == null){
            this.pivot.y = x;
        }else{
            this.pivot.y = y;
        }
    }
    setVelocity(x = 0, y = null, is = true){
        if(is){
            this.velocity.ideal = x
        }
        
        this.velocity.x = x;
        if(y == null){
            this.velocity.y = x;
        }else{
            this.velocity.y = y;
        }
    }
    setFriction(friction = 0){
        this.friction = friction
    }
}
export default Entity;