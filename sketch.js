/*
  For some reason that I have not discovered, there is a bug in the game.
  There is a big memory leak after the game is over. And when the game is restarted, the restart button remains unresponsive, but never goes away.
  So reload the game from time to time, but enjoy!
*/


//variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var restart,restartImage;
var bananaGroup, obstacleGroup;
var score;
var ground;
var survivality = 100;

//images and animations
function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  restartImage = loadImage("Restart.PNG");
 
}
function setup() {
  createCanvas(600,400);
  
  //monkey
  monkey = createSprite(50,350,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  //ground
  ground = createSprite(325,350,700,20);
  ground.velocityX = -3;

  //groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  //score
  score = 0;
  
  //monkey.debug = true;
 
}
function draw() { 
  background("white");

  //play
  if (gameState === PLAY){
    

    
  //ground reset
  if(ground.x<350){
    ground.x = 350;
  }
  
  //monkey jump
  if (keyDown("space")&&monkey.y>300){
    monkey.velocityY = -18;
    survivality -= 5;
  }
 
  
  
  //add the score
  if (frameCount%30 === 0){
    score++;
    
  }
  if (frameCount%100 === 0){
    survivality--;
  }
  
   
  if (bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    survivality+=10;
    
  
  }
    if (monkey.isTouching(obstacleGroup)||survivality<0){
    gameState = END;
    }
    
     //draw it!!
  bananas();
  }
  //game over
  else if (gameState === END){
    bananaGroup.destroyEach();
    obstacle.velocityX = 0;
    ground.velocityX = 0;
    obstacle.lifetime = -1;
    obstacleGroup.lifetime = -1;
    
    
    
    restart = createSprite(300,250,20,20);
    restart.addImage(restartImage);
    restart.scale = 0.6;
    
    if (mousePressedOver(restart)){
      //restartImage.visible = false;
      restarted();
  }
  }
    
 
  //gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  //make the monkey run on the ground
  monkey.collide(ground);
  
  
  
 
  //draw it!
  obstacles();
  drawSprites();
  
  //show the score
  textSize(20);
  fill("red");
  stroke("black");
  text("Survivality: "+score,400,50);
  text("Lifetime: "+survivality,200,50); 
}

//function for the bananas
function bananas(){
  if (frameCount%80===0){
    banana = createSprite(650,Math.round(random(150,300),20,20));
    banana.addImage("banana",bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.1;
    banana.lifetime = 175;
    bananaGroup.add(banana);
  }
  
}

//function for the obstacles
function obstacles(){
  if (frameCount%170===0){
    obstacle = createSprite(650,300,20,20);
    obstacle.addImage("rock",obstacleImage);
    obstacle.velocityX = -7;
    obstacle.scale = 0.2;
    obstacle.lifetime = 175;
    obstacleGroup.add(obstacle);
  }
  
}

function restarted(){
  
  gameState = PLAY;
  
  
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  restart.destroy();

  score = 0;
  survivality = 100;
}