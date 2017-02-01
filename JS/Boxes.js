function Box(startX, startY){
    
    
    this.xPos = startX;
    this.yPos = startY;
    
    //rendera boxes
    this.render = function(){
        
        ctx.fillStyle = "brown";
        ctx.fillRect(this.xPos, this.yPos, 49, 49);
        
    }
    
    
    
    
    
    
}