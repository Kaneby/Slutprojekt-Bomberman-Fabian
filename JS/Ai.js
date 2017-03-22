function Ai(startX, startY) {

    //deklarera variabler
    this.xPos = startX;
    this.yPos = startY;
    /*this.moveRight = 0;
    this.moveLeft = 0;
    this.moveUp = 0;
    this.moveDown = 0;
    this.layBomb = 0;
    this.whereTo = 0;*/
    this.diffAction = [];

    //functionen som ska köras varje gång AI ska göra en action
    this.actionCheck = function () {

        //checkleft, kollar först om vänster är möjligt, sedan olika fördelaktiga conditions för att gå vänster, stämmer de lägger jag till en nolla i arrayen.
        if ((this.yPos / 50) % 2 == 0 && this.xPos != 0) {

            for (var i = 0; i < boxes.length; i++) {

                if (this.xPos - 50 == boxes[i].xPos && this.yPos == boxes[i].yPos) {
                    //stänger av loopen
                    i = boxes.length + 1;

                }
                //får player1 att gå om den loopar egenom hela
                if (i == boxes.length - 1) {
                    this.diffAction.push(0);

                    if ((players[1].xPos - this.xPos) ^ 2 + (players[1].yPos - this.yPos) ^ 2 > (players[1].xPos - (this.xPos - 50)) ^ 2 + (players[1].yPos - this.yPos) ^ 2) {

                        this.diffAction.push(0);
                        console.log("närmare");

                    }
                }

            }

        }




        //check right

        if ((this.yPos / 50) % 2 == 0 && this.xPos != 600) {

            for (var i = 0; i < boxes.length; i++) {

                if (this.xPos + 50 == boxes[i].xPos && this.yPos == boxes[i].yPos) {
                    //stänger av loopen
                    i = boxes.length + 1;

                }
                //får player1 att gå om den loopar egenom hela
                if (i == boxes.length - 1) {
                    this.diffAction.push(1);

                    if ((players[1].xPos - this.xPos) ^ 2 + (players[1].yPos - this.yPos) ^ 2 > (players[1].xPos - (this.xPos + 50)) ^ 2 + (players[1].yPos - this.yPos) ^ 2) {

                        this.diffAction.push(1);


                    }



                }

            }

        }



        //check up

        if ((this.xPos / 50) % 2 == 0 && this.yPos != 0) {

            //loopa igenom boxes för att skapa collision för dem
            for (var i = 0; i < boxes.length; i++) {

                if (this.yPos - 50 == boxes[i].yPos && this.xPos == boxes[i].xPos) {
                    //stänger av loopen
                    i = boxes.length + 1;

                }
                //får player1 att gå om den loopar egenom hela
                if (i == boxes.length - 1) {
                    this.diffAction.push(2);

                    if ((players[1].xPos - this.xPos) ^ 2 + (players[1].yPos - this.yPos) ^ 2 > (players[1].xPos - this.xPos) ^ 2 + (players[1].yPos - (this.yPos - 50)) ^ 2) {

                        this.diffAction.push(2);


                    }
                }

            }

        }
        
        //check down
        
            if ((this.xPos / 50) % 2 == 0 && this.yPos != 600) {

            //loopa igenom boxes för att skapa collision för dem
            for (var i = 0; i < boxes.length; i++) {

                if (this.yPos + 50 == boxes[i].yPos && this.xPos == boxes[i].xPos) {
                    //stänger av loopen
                    i = boxes.length + 1;

                }
                //får player1 att gå om den loopar egenom hela
                if (i == boxes.length - 1) {
                    this.diffAction.push(3);

                    if ((players[1].xPos - this.xPos) ^ 2 + (players[1].yPos - this.yPos) ^ 2 > (players[1].xPos - this.xPos) ^ 2 + (players[1].yPos - (this.yPos + 50)) ^ 2) {

                        this.diffAction.push(3);


                    }
                }

            }

        }









    }

    this.doAction = function () {

        var i = Math.floor((Math.random() * this.diffAction.length));

        var j = this.diffAction[i];
        
        console.log(i);
        console.log(j);
        
        console.log(this.diffAction);
        if (j == undefined){
            this.xPos = this.xPos;
            
            this.yPost = this.yPos;
            
        }
        
        if (j == 0) {
            //move left

            this.xPos = this.xPos - 50;
        }

        if (j == 1) {
            //move right

            this.xPos = this.xPos + 50;
        }
        
        if (j == 2){
            //move up
            this.yPos = this.yPos - 50;
        }
        
        if (j == 3){
            
            this.yPos = this.yPos + 50;
        }
        //rensa arrayen
        this.diffAction = [];

    }



    this.render = function () {
        ctx.fillStyle = "orange";
        ctx.fillRect(this.xPos, this.yPos, 50, 50);
    }






}