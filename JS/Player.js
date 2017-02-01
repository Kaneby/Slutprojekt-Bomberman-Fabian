function Player(startX, startY, teamColour, explosionRange){
    
    //deklarera egenskaper
    this.xPos = startX;
    this.yPos = startY;
    this.colour = teamColour
    this.range = explosionRange;
    

    this.render = function(){
    
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.xPos, this.yPos, 50, 50);
        
        
    }

}