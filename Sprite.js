class Sprite{
    constructor(src = "/", fileName = ""){
        this.src = src
        this.fileName = fileName
        this.img = new Image()
        this.img.src = this.src + fileName;
        this.w = this.img.width
        this.h = this.img.height
    }
}
export default Sprite;