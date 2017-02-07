function Explosion(startX, startY, whichPlayer, teamColour, explosionRange) {

    this.xPos = startX;
    this.yPos = startY;
    this.player = whichPlayer;
    this.colour = teamColour;
    this.range = explosionRange;
    this.rightExp = 0;
    this.leftExp = 0;
    this.upExp = 0;
    this.downExp = 0;

    this.bombRender = function () {

        ctx.fillStyle = "black";
        ctx.fillRect(this.xPos + 12.5, this.yPos + 12.5, 25, 25);
        //ctx.fillRect(this.xPos - 50, this.yPos, 50, 50);
        //ctx.fillRect(this.xPos, this.yPos + 50, 50, 50);
        //ctx.fillRect(this.xPos, this.yPos - 50, 50, 50);
        //console.log("Explosion");

    }
    this.explosionRender = function (player) {

        //sprägning blir lika lång som player.range
        //for (var i = 1; i <= player.range; i++) {

        //console.log(i);
        //console.log("loop i expRender");

        ctx.fillStyle = "orange";
        //mitten sprängning
        ctx.fillRect(this.xPos, this.yPos, 50, 50);

        for (var i = 0; i <= this.rightExp; i++) {
            //höger sprängning
            if ((this.yPos / 50) % 2 == 0) {

                //console.log(i);
                ctx.fillRect(this.xPos + 50 * i, this.yPos, 50, 50);
            }
        }
        for (var i = 0; i <= this.leftExp; i++) {
            //vänster sprängning
            if ((this.yPos / 50) % 2 == 0) {
                ctx.fillRect(this.xPos - i * 50, this.yPos, 50, 50);
            }
        }
        for (var i = 0; i <= this.downExp; i++) {
            //ner sprängning
            if ((this.xPos / 50) % 2 == 0) {
                ctx.fillRect(this.xPos, this.yPos + i * 50, 50, 50);
            }
        }
        for (var i = 0; i <= this.upExp; i++) {
            //upp sprängning
            //console.log(i, this.upExp);
            if ((this.xPos / 50) % 2 == 0) {
                ctx.fillRect(this.xPos, this.yPos - i * 50, 50, 50);
            }


        }
    }

    this.removeBoxes = function (player) {

        //loopa igenom och kolla efter collision mella explosion och boxes, ta bort ev boxes

        for (var j = 0; j <= player.range; j++) {

            for (var i = 0; i < boxes.length; i++) {

                if (this.xPos + j * 50 == boxes[i].xPos && this.yPos == boxes[i].yPos) {


                    console.log(j);

                    //ge chans till att släppa boost
                    if (Math.random() > 0.7) {

                        console.log("boost skapad");
                        boosters.push(new Boost(boxes[i].xPos, boxes[i].yPos));
                    }

                    //ta bort box och stäng av loop samt ge rightExp nytt värde för hur långt den ska spränga
                    boxes.splice(i, 1);
                    console.log("kolla vänster");
                    this.rightExp = j;
                    j = player.range + 1;
                    i = boxes.length + 1;

                    //stäng av loop om den exploderar i sten
                } else if ((this.yPos / 50) % 2 !== 0) {
                    console.log("xpos/50");
                    this.rightExp = 1;
                    j = player.range + 1;
                    i = boxes.length + 1;

                    //om den går igenom hela loopen plyer rightexp = player.range
                } else if (i == boxes.length - 1) {
                    console.log("sista else this up = player range vänster");
                    this.rightExp = player.range;

                    //inte spränga utanför spelplanen
                } else if (this.xPos + j * 50 == 650) {

                    this.rightExp = j - 1;
                    j = player.range + 1;
                    i = boxes.length + 1;
                }



            }
        }
        for (var j = 0; j <= player.range; j++) {

            for (var i = 0; i < boxes.length; i++) {

                if (this.xPos - j * 50 == boxes[i].xPos && this.yPos == boxes[i].yPos) {


                    console.log(j);

                    //ge chans till att släppa boost
                    if (Math.random() > 0.7) {

                        console.log("boost skapad");
                        boosters.push(new Boost(boxes[i].xPos, boxes[i].yPos));
                    }

                    //ta bort box och stäng av loop samt ge leftexp nytt värde för hur långt den ska spränga
                    boxes.splice(i, 1);
                    console.log("kolla vänster");
                    this.leftExp = j;
                    j = player.range + 1;
                    i = boxes.length + 1;

                    //stäng av loop om den exploderar i sten
                } else if ((this.yPos / 50) % 2 !== 0) {
                    console.log("xpos/50");
                    this.leftExp = 1;
                    j = player.range + 1;
                    i = boxes.length + 1;

                    //om den går igenom hela loopen plyer leftexp = player.range
                } else if (i == boxes.length - 1) {
                    console.log("sista else this up = player range vänster");
                    this.leftExp = player.range;
                }
            }
        }
        //down spräng
        for (var j = 0; j <= player.range; j++) {

            for (var i = 0; i < boxes.length; i++) {

                if (this.yPos + j * 50 == boxes[i].yPos && this.xPos == boxes[i].xPos) {


                    console.log(j);

                    //ge chans till att släppa boost
                    if (Math.random() > 0.7) {

                        console.log("boost skapad");
                        boosters.push(new Boost(boxes[i].xPos, boxes[i].yPos));
                    }

                    //ta bort box och stäng av loop samt ge downExp nytt värde för hur långt den ska spränga
                    boxes.splice(i, 1);
                    console.log("kolla upp");
                    this.downExp = j;
                    j = player.range + 1;
                    i = boxes.length + 1;

                    //stäng av loop om den exploderar i sten
                } else if ((this.xPos / 50) % 2 !== 0) {
                    console.log("xpos/50");
                    this.downExp = 1;
                    j = player.range + 1;
                    i = boxes.length + 1;

                    //om den går igenom hela loopen plyer downExp = player.range
                } else if (i == boxes.length - 1) {
                    //console.log("sista else this up = player range");
                    this.downExp = player.range;
                }
            }
        }
        //up spräng
        for (var j = 0; j <= player.range; j++) {

            for (var i = 0; i < boxes.length; i++) {

                if (this.yPos - j * 50 == boxes[i].yPos && this.xPos == boxes[i].xPos) {


                    console.log(j);

                    //ge chans till att släppa boost
                    if (Math.random() > 0.7) {

                        console.log("boost skapad");
                        boosters.push(new Boost(boxes[i].xPos, boxes[i].yPos));
                    }

                    //ta bort box och stäng av loop samt ge upExp nytt värde för hur långt den ska spränga
                    boxes.splice(i, 1);
                    console.log("kolla upp");
                    this.upExp = j;
                    j = player.range + 1;
                    i = boxes.length + 1;

                    //stäng av loop om den exploderar i sten
                } else if ((this.xPos / 50) % 2 !== 0) {
                    console.log("xpos/50");
                    this.upExp = 1;
                    j = player.range + 1;
                    i = boxes.length + 1;

                    //om den går igenom hela loopen plyer upExp = player.range
                } else if (i == boxes.length - 1) {
                    //console.log("sista else this up = player range");
                    this.upExp = player.range;
                }
            }
        }

        for (var i = 0; i < boxes.length; i++) {

            if (i == boxes.length - 1) {

                //console.log("return true");
                return true
            }
        }



    }

    this.kill = function (player) {

        //kolla om någon player är i explosionen
        for (var i = 1; i < players.length; i++) {

            if (this.xPos - (this.leftExp * 50) <= players[i].xPos &&
                players[i].xPos <= this.xPos + (this.rightExp * 50) &&
                this.yPos == players[i].yPos ||
                this.yPos - (this.upExp * 50) <= players[i].yPos &&
                players[i].yPos <= this.yPos + (this.downExp * 50) &&
                this.xPos == players[i].xPos) {

               
                if (i == 1) {
                    //console.log("player1 död");
                    players[1].xPos = 0;
                    players[1].yPos = 0;
                    if (players[1].life > 0) {
                        
                        players[1].life--;
                    }





                } else if (i == 2) {

                    //console.log("player2 död");
                    players[2].xPos = 600;
                    players[2].yPos = 600;

                    if (players[2].life > 0) {
                        
                        players[2].life--;
                    }







                }

            }
        }







    }









}