//deklarera variabler
var canvas,
    ctx
var players = [
    0,
    new Player(0, 0, "blue", 1),
    new Player(600, 600, "red", 1)
];
var boxes = [0]
var boxStartY = 0;
var bombPlayer1 = [0];
var bombPlayer2 = [0];
var bombTimer1 = 0;
var bombTimer2 = 0;
var boosters = [];


//instantiera boxes samt ge dom korrekta startX och startY värden
//loop för att bestämma X - led
for (var i = 1; i <= 13; i = i + 1) {
    //olika conditions för instatiering i olika x-led
    if (i % 2 == 0 && i != 1 && i != 13 && boxStartY != 1 && boxStartY != 11) {
        for (var j = 0; j <= 13; j = j + 2) {
            //instantiera slumpmässigt ut boxes

            if (Math.random() > 0.3) {
                boxes.push(new Box(j * 50, boxStartY * 50));
            }
        }
    } else if (i % 2 != 0 && i != 1 && i != 13) {
        for (var k = 0; k <= 12; k++) {
            //instantiera slumpmässigt ut boxes

            if (Math.random() > 0.3) {
                boxes.push(new Box(k * 50, boxStartY * 50));

            }
        }
        //förhindra boxes där players startar
    } else if (i == 1 || i == 13) {
        for (var l = 2; l < 11; l++) {
            //instatiera slumpmässigt ut boxes
            if (Math.random() > 0.3) {
                boxes.push(new Box(l * 50, boxStartY * 50));

            }
        }
        //förhindra boxes där players startar
    } else if (boxStartY == 1 || boxStartY == 11) {

        for (var j = 2; j <= 11; j = j + 2) {
            //instantiera slumpmässigt ut boxes

            if (Math.random() > 0.3) {
                boxes.push(new Box(j * 50, boxStartY * 50));
            }
        }

    }


    //öka Y-led för instantieringen
    boxStartY++;

}


function start() {

    canvas = document.getElementById("c");
    ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";

    window.setInterval(update, 20);
    
    boxesPic = document.getElementById("boxes");
    stonePic = document.getElementById("stone");
    player1Pic = document.getElementById("player1");
    player2Pic = document.getElementById("player2");
    explosionPic = document.getElementById("explosion");
    bombPic = document.getElementById("bomb");
    boostPic = document.getElementById("boost");
}


function update() {

    ctx.clearRect(0, 0, 650, 650)

    ctx.fillStyle = "black";
    //linjer för tydlighet, ev ta bort
    for (var i = 1; i < 13; i++) {
        ctx.fillRect(50 * i, 0, 1, 650);
    }
    for (var i = 1; i < 13; i++) {
        ctx.fillRect(0, 50 * i, 650, 1);

    }
    //måla "stenar"
    for (var i = 1; i < 12; i = i + 2) {
        for (var j = 1; j < 12; j = j + 2) {
            ctx.drawImage(stonePic, i * 50, j * 50, 50, 50);

        }
    }
    //måla ut alla boxes
    for (var i = 1; i < boxes.length; i++) {
        boxes[i].render()

    }

    //måla ut bomb för player 1 och player 2   
    if (bombPlayer1.length > 1 && bombTimer1 < 50) {


        bombPlayer1[1].bombRender();

        bombTimer1++;
    }

    //skriva ut liv kvar

    ctx.clearRect(650, 0, 50, 650);
    ctx.font = "50px Verdana";
    ctx.fillStyle = "blue";
    ctx.fillText(players[1].life, 665, 300);
    ctx.fillStyle = "red"
    ctx.fillText(players[2].life, 665, 400);

    ctx.fillStyle = "black";
    ctx.fillText("L", 665, 50);
    ctx.fillText("I", 665, 100);
    ctx.fillText("F", 665, 150);
    ctx.fillText("E", 665, 200);
    ctx.fillText("S", 665, 250);

    //starta removeBoxes funktionen
    if (bombTimer1 == 50) {

        bombPlayer1[1].removeBoxes(players[1]);
        bombTimer1++;

    }
    //måla ut explosionen
    if (bombTimer1 >= 51) {

        bombPlayer1[1].explosionRender(players[1]);
        bombTimer1++;

        //kolla om bomben dödar någon, samt skicka med att player1 la bomben
        bombPlayer1[1].kill(players[1]);

    }
    //ta bort bomben och reseta bombTimer1
    if (bombTimer1 == 100) {

        bombPlayer1.splice(1, 1);
        bombTimer1 = 0;
    }

    //Player2 Sprängning

    if (bombPlayer2.length > 1 && bombTimer2 < 50) {


        bombPlayer2[1].bombRender();
        bombTimer2++;
    }
    //starta removeBoxes funktionen
    if (bombTimer2 == 50) {
        bombPlayer2[1].removeBoxes(players[2]);
        bombTimer2++;
        //console.log("skicka till removeBoxes");
    }
    //måla ut explosionen
    if (bombTimer2 >= 51) {

        bombPlayer2[1].explosionRender(players[2]);
        bombTimer2++;
        //kolla om bomben dödar någon, samt skicka med att player2 la bomben
        bombPlayer2[1].kill(players[2]);
        //console.log("explosionrender");

    }
    //ta bort bomben och reseta bombTimer1
    if (bombTimer2 == 100) {
        bombPlayer2.splice(1, 1);
        //console.log("splice bomb2");
        bombTimer2 = 0;

    }

    //måla ut ev boost
    if (boosters.length > 0) {

        //console.log("i update funktionen");
        for (var i = 0; i < boosters.length; i++) {
            //console.log("i loopen")
            boosters[i].render();
        }


    }

    //loopa igenom och hitta om någon plockar upp booster samt vilken player
    if (boosters.length > 0) {

        for (var i = 0; i < boosters.length; i++) {

            if (players[1].xPos == boosters[i].xPos && players[1].yPos == boosters[i].yPos) {

                boosters[i].boostPickup(players[1], i);
                console.log("boostersPickup i update");

            } else if (players[2].xPos == boosters[i].xPos && players[2].yPos == boosters[i].yPos) {

                boosters[i].boostPickup(players[2], i);
                console.log("boostersPickup i update");

            }


        }

    }
    //kalla på immortal funktionen
    if(players[1].immortalTimer > 0){
        players[1].immortal();
        console.log("skickar från P1");
        
    }
    if(players[2].immortalTimer  > 0){
        players[2].immortal();
        console.log("skickar från p2");
    }

    
    //Avsluta spelet
    if (players[1].life == 0) {
            
            ctx.clearRect(0, 0, 750, 650);
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 750, 650);
            
            ctx.fillStyle = "red";
            ctx.font = "50px Verdana";
            ctx.fillText("RÖD VINNER, GRATTIS!", 100, 300);
            
        
        } else if (players[2].life == 0 ) {
            
            ctx.clearRect(0, 0, 750, 650);
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 750, 650);
            
            ctx.fillStyle = "blue";
            ctx.font = "50px Verdana";
            ctx.fillText("BLÅ VINNER, GRATTIS!", 100, 300);
            


        }
    








    //måla players
    players[1].render();
    players[2].render();







}

function keyDown(e) {
    //Player1 kontroller
    //vänster och skapa collision
    if (e.keyCode == 37 && (players[1].yPos / 50) % 2 == 0 && players[1].xPos != 0) {

        //loopa igenom boxes för att skapa collision för dem
        for (var i = 0; i < boxes.length; i++) {

            if (players[1].xPos - 50 == boxes[i].xPos && players[1].yPos == boxes[i].yPos) {
                //stänger av loopen
                i = boxes.length + 1;

            }
            //får player1 att gå om den loopar egenom hela
            if (i == boxes.length - 1) {
                players[1].xPos = players[1].xPos - 50;
            }

        }




    }
    //höger
    if (e.keyCode == 39 && (players[1].yPos / 50) % 2 == 0 && players[1].xPos != 600) {

        //loopa igenom boxes för att skapa collision för dem
        for (var i = 0; i < boxes.length; i++) {

            if (players[1].xPos + 50 == boxes[i].xPos && players[1].yPos == boxes[i].yPos) {
                //stänger av loopen
                i = boxes.length + 1;

            }
            //får player1 att gå om den loopar egenom hela
            if (i == boxes.length - 1) {
                players[1].xPos = players[1].xPos + 50;
            }

        }


    }
    //ner
    if (e.keyCode == 40 && (players[1].xPos / 50) % 2 == 0 && players[1].yPos != 600) {

        //loopa igenom boxes för att skapa collision för dem
        for (var i = 0; i < boxes.length; i++) {

            if (players[1].yPos + 50 == boxes[i].yPos && players[1].xPos == boxes[i].xPos) {
                //stänger av loopen
                i = boxes.length + 1;

            }
            //får player1 att gå om den loopar egenom hela
            if (i == boxes.length - 1) {
                players[1].yPos = players[1].yPos + 50;
            }

        }

    }
    //upp
    if (e.keyCode == 38 && (players[1].xPos / 50) % 2 == 0 && players[1].yPos != 0) {

        //loopa igenom boxes för att skapa collision för dem
        for (var i = 0; i < boxes.length; i++) {

            if (players[1].yPos - 50 == boxes[i].yPos && players[1].xPos == boxes[i].xPos) {
                //stänger av loopen
                i = boxes.length + 1;

            }
            //får player1 att gå om den loopar egenom hela
            if (i == boxes.length - 1) {
                players[1].yPos = players[1].yPos - 50;
            }

        }

    }
    if (e.keyCode == 32 && bombPlayer1.length == 1) {

        bombPlayer1.push(new Explosion(players[1].xPos, players[1].yPos, players[1], "blue"));

        // for(var i = 0; i < 50; i++){
        // explosion1[0].render();
        // }
        //explosion1.splice(0, 1);



    }
    //vänster
    if (e.keyCode == 65 && (players[2].yPos / 50) % 2 == 0 && players[2].xPos != 0) {

        //loopa igenom boxes för att skapa collision för dem
        for (var i = 0; i < boxes.length; i++) {

            if (players[2].xPos - 50 == boxes[i].xPos && players[2].yPos == boxes[i].yPos) {
                //stänger av loopen
                i = boxes.length + 1;

            }
            //får player1 att gå om den loopar egenom hela
            if (i == boxes.length - 1) {
                players[2].xPos = players[2].xPos - 50;
            }

        }




    }
    //Player2 kontroller
    //höger
    if (e.keyCode == 68 && (players[2].yPos / 50) % 2 == 0 && players[2].xPos != 600) {

        //loopa igenom boxes för att skapa collision för dem
        for (var i = 0; i < boxes.length; i++) {

            if (players[2].xPos + 50 == boxes[i].xPos && players[2].yPos == boxes[i].yPos) {
                //stänger av loopen
                i = boxes.length + 1;

            }
            //får player1 att gå om den loopar egenom hela
            if (i == boxes.length - 1) {
                players[2].xPos = players[2].xPos + 50;
            }

        }


    }
    //ner
    if (e.keyCode == 83 && (players[2].xPos / 50) % 2 == 0 && players[2].yPos != 600) {

        //loopa igenom boxes för att skapa collision för dem
        for (var i = 0; i < boxes.length; i++) {

            if (players[2].yPos + 50 == boxes[i].yPos && players[2].xPos == boxes[i].xPos) {
                //stänger av loopen
                i = boxes.length + 1;

            }
            //får player1 att gå om den loopar egenom hela
            if (i == boxes.length - 1) {
                players[2].yPos = players[2].yPos + 50;
            }

        }

    }
    //upp
    if (e.keyCode == 87 && (players[2].xPos / 50) % 2 == 0 && players[2].yPos != 0) {

        //loopa igenom boxes för att skapa collision för dem
        for (var i = 0; i < boxes.length; i++) {

            if (players[2].yPos - 50 == boxes[i].yPos && players[2].xPos == boxes[i].xPos) {
                //stänger av loopen
                i = boxes.length + 1;

            }
            //får player2 att gå om den loopar egenom hela
            if (i == boxes.length - 1) {
                players[2].yPos = players[2].yPos - 50;
            }

        }

    }
    if (e.keyCode == 86 && bombPlayer2.length == 1) {

        bombPlayer2.push(new Explosion(players[2].xPos, players[2].yPos, players[2], "blue"));
        //console.log("ny bombPlayer2 skapad");
        // for(var i = 0; i < 50; i++){
        // explosion1[0].render();
        // }
        //explosion1.splice(0, 1);





    }

}