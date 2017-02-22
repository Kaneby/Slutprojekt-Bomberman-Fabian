function Box(startX, startY){
    
    
    this.xPos = startX;
    this.yPos = startY;
    
    //rendera boxes
    this.render = function(){
        
        ctx.fillStyle = "brown";
        ctx.drawImage(boxesPic, this.xPos, this.yPos, 50, 50);
        
    }
    
    
    
    
    
    
}