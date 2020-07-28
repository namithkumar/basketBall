const Engine = Matter.Engine;
const World= Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var canvas;
var player1, player1Img, player2, player2Img, court, slingshot, courtImg, ball, ballImg, basket, basketImg;
var crowdSound, bounceSound, swishSound;
var score = 0;

function preload(){
    courtImg = loadImage("bbcourt.png");
    player1Img = loadImage("curry.png");
    player2Img = loadImage("lebron.png");
   // ballImg = loadImage("ball.png");
    basketImg = loadImage("basket.png");

    crowdSound = loadSound("bball+crowd.mp3");
    bounceSound = loadSound("BOUNCE+1.mp3");
    swishSound = loadSound("swish+2.mp3");
}

function setup(){
    canvas = createCanvas(displayWidth, displayHeight);
    engine = Engine.create(); 
    world = engine.world;

    player1 = createSprite(displayWidth/2-100, displayHeight/2, 5, 5);
    player2 = createSprite(displayWidth/2+100, displayHeight/2, 10, 10);
    basket = createSprite(1600, 400, 50, 30);
    ball = new Ball(displayWidth/2-50, displayHeight/2, 50, 20);
    slingshot = new SlingShot(ball.body,{x:displayWidth/2-50, y:displayHeight/2});
    ball.scale = 0.1;

    player1.addImage("player1", player1Img);
    player2.addImage("player2", player2Img);
    basket.addImage("basket", basketImg);

}

function draw(){
    background(courtImg);
    Engine.update(engine);

    ball.depth = basket.depth;
   // bounceSound.play();

   ball.body.position.x = player1.x;
   ball.body.position.y = player1.y;

   player2.x = player1.x+200;
   player2.y = player1.y-1;

    textSize(30);
    text("SCORE: "+score, displayWidth/2-50, 150);

    if(ball.body.x = basket.x){
        score = score+1;
        console.log("hi");
    }

    if(keyDown(RIGHT_ARROW)){
       var x = player1.x+5;
        run(x, player1.y);
        player1.velocityY = 0;
        bounceSound.play();
    }

    if(keyDown(LEFT_ARROW)){
        var x = player1.x-10;
        run(x, player1.y-10);
        player1.velocityY = 0;
        bounceSound.play();
    }

    if(keyDown(UP_ARROW)){
        var y = player1.y-5;
        run(player1.x, y);
        bounceSound.play();
     }
 
     if(keyDown(DOWN_ARROW)){
         var y = player1.y+5;
         run(player1.x, y);
         bounceSound.play();
     }

    if(keyDown("J")){
        player1.velocityY = -10;
    }

    if(player1.x !== displayWidth/2-100){ 
    player1.velocityY = player1.velocityY+0.8;
    }

    ball.display();
    slingshot.display();

    drawSprites();

}

function run(x, y){
    player1.x = x;
    player1.y = y;
}

function keyPressed(){
    if(keyCode === 32){
        slingshot.attach(ball.body);
    }
}

function mouseDragged(){
    Matter.Body.setPosition(ball.body, {x: mouseX , y: mouseY});
}

function mouseReleased(){
    slingshot.fly();
    swishSound.play();
    crowdSound.play();
}