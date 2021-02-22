class Text{
    constructor(x=0, y=0, size=16, text="You Only Live Once", color="#000", fontFamily="arial" ){
        this.x = x,
        this.y = y,
        this.s = size,
        this.text = text,
        this.color = color,
        this.fFam = fontFamily
    }
    draw(context){
        this.w = context.measureText(this.text).width
        context.fillStyle = this.color
        context.font = this.s + "px '" + this.fFam + "'"
        context.fillText(this.text, this.x, this.y)
    }
    move(){
    }
}
export default Text