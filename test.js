import Text from "./Text.js"
import Sprite from "./Sprite.js"
import Entity from "./Entity.js"
import Layer from "./Layer.js"
import Game from "./Game.js"

const game = new Game(2000,2000, ()=>{}, ()=>{}, 30, null)

const layer = new Layer()


const sprite = new Sprite('./', "pistol.png")
const weapon = new Entity(1000,1000, sprite)
weapon.isRotatingToMouse = true
weapon.setVelocity(0,200)
setTimeout(()=>{
    weapon.setVelocity(0,-200)
},10000)

const weapo = new Entity(200,200,sprite)
weapo.isRotatingToMouse = true

const weapn = new Entity(50,50, sprite)
game.cameraFollow(weapon)
const text = new Text(20,20,16,"Engine", "#111")

game.add(layer)
layer.add(weapon)
layer.add(weapo)
layer.add(text)
layer.checkCollision(weapon,weapo,()=>{})
console.clear()