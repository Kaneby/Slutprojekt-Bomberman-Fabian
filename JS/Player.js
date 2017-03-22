function Player(startX, startY, teamColour, explosionRange) {

    //deklarera egenskaper
    this.xPos = startX;
    this.yPos = startY;
    this.colour = teamColour
    this.range = explosionRange;
    this.life = 3;
    this.immortalTimer = 0;


    
    
    this.render = function () {

            if (this.colour === "blue") {
                //ctx.fillStyle = this.colour;
                ctx.drawImage(player1Pic, this.xPos - 50, this.yPos - 15, 150, 80);

            } else if (this.colour === "red") {
                
                
                ctx.drawImage(player2Pic, this.xPos - 50, this.yPos - 15, 150, 80);

            }

        }
        //funktion för att förhindra att dö direkt i spawn
    this.immortal = function () {

            this.immortalTimer--;
            ctx.font = "20px Verdana";
            ctx.fillSyle = "black";
            ctx.fillText("Immortal", this.xPos, this.yPos + 60);
            
            
           

        
    }




}