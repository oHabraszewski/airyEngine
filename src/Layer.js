class Layer{
    constructor(){
        this.entities = []
        this.toCollide = []
    }
    add(entity){
        entity.layer = this
        this.entities.push(entity)
    }
    delete(entity){
        for(let i = 0; i < this.entities.length; i++){
            if(this.entities[i] = entity){
                this.entities.splice(i, 1)
            }
        }
    }
    drawEntities(){
        this.ctx.clearRect(0,0,this.camera.w, this.camera.h)
        this.entities.forEach(entity => {
            if(entity.auto){
                entity.move(this.fps)
            }
            entity.draw(this.ctx, this.camera)
        });
    }
    collideEntities(){
        if(this.toCollide.length > 0){
            for(let i = 0; i < this.toCollide.length; i++){
                const collideElem = this.toCollide[i]
                for(let j = 0; j < this.entities.length; j++){
                    const entityFromOne = this.entities[j]
                    if(entityFromOne == collideElem.fstEntity || entityFromOne == collideElem.sndEntity){
                        if(entityFromOne == collideElem.sndEntity){
                            const forOneMoment = collideElem.fstEntity;
                            collideElem.fstEntity = collideElem.sndEntity;
                            collideElem.sndEntity = forOneMoment
                        }
                        for(let k = 0; k < this.entities.length; k++){
                            const entityFromTwo = this.entities[k]
                            if(entityFromTwo == collideElem.sndEntity){
                                const fx = collideElem.fstEntity.x,
                                fy = collideElem.fstEntity.y,
                                fw = collideElem.fstEntity.sprite.w,
                                fh = collideElem.fstEntity.sprite.h

                                const sx = collideElem.sndEntity.x,
                                sy = collideElem.sndEntity.y,
                                sw = collideElem.sndEntity.sprite.w,
                                sh = collideElem.sndEntity.sprite.h

                                const minX = Math.min(fx, sx),
                                minY = Math.min(fy, sy),
                                maxX = Math.max(fx + fw, sx + sw),
                                maxY = Math.max(fy + fh, sy + sh)
                    
                                if((maxX - minX) < (fw + sw) && (maxY - minY) < (fh + sh)){//Noo, there is collision!
                                    collideElem.functionToDo(collideElem.fstEntity, collideElem.sndEntity)
                                }
                               
                                break
                            }
                        }
                        break
                    }
                }
            }
            
        }
    }
    checkCollision(fstEntity, sndEntity, functionToDo){
        for(let i = 0; i<this.entities.length; i++){//Checking for safety & better working
            const oneEntity = this.entities[i]
            console.log("i:" + i + "lenght:" + this.entities.length)
            if(oneEntity == fstEntity){
                for(let j = 0; j < this.entities.length; j++){
                    const twoEntity = this.entities[j]
                    if(twoEntity == sndEntity){
                        this.toCollide.push({
                            fstEntity: fstEntity,
                            sndEntity: sndEntity,
                            functionToDo: functionToDo
                        })
                        break
                    }
                    else if((j+1) == this.entities.length){
                        console.error("Second entity to collide not finded in layer's entities!")
                    }
                }
                break
            }else if((i+1)== this.entities.length){
                console.error("First entity to collide not finded in layer's entities!")
            }
        }
    }
    
    initialize(no, canvas, width, height, fps, camera){
        this.w = width
        this.h = height
        this.no = no
        this.fps = fps
        this.ctx = canvas.getContext("2d")
        this.camera = camera
    }
}
export default Layer;