class Sprite{
    constructor(src, fileName){
        this.src = src
        this.fileName = fileName
        this.img = new Image()
        this.img.src = this.src;
    }
}
class Layer{
    
}
class Entity{
    constructor(x,y,sprite = null){
        this.x = x;
        this.y = y;
        if(sprite == null){
            this.sprite = new Sprite()
        }else{
            this.sprite = sprite
        }
    }
    draw(){

    }
}