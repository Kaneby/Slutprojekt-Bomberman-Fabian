function Boost(startX, startY){
    
    this.xPos = startX;
    this.yPos = startY;
    this.lasting
    


this.render = function(){
    
    //console.log("i render funktionen");
    ctx.fillStyle = "green";
    ctx.fillRect(this.xPos, this.yPos, 50, 50);
    

    }

this.boostPickup = function(player, whichBooster){
    
    player.range++;
    boosters.splice(whichBooster, 1);
      
    }


}