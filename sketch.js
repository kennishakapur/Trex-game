var trex,trex_running , ground , groundimage , ground_invisible;
var cloudimg,cloudgroup;
var obs1 , obs2, obs3, obs4, obs5, obs6, obstaclegroup;
var count;
var PLAY, END , gameState;
var jump,die,checkpoint;
var gameOver ,gameOverimage ,  restart , restartimage ; 

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage=loadImage("ground2.png");
  cloudimg=loadImage("cloud.png");
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
  
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkpoint=loadSound("checkPoint.mp3");
  
  gameOverimage=loadImage("gameOver.png");
  restartimage=loadImage("restart.png");
  
}

function setup() {
  createCanvas(600,200);
  trex= createSprite(30,170,20,20);
  trex.addAnimation("running",trex_running);
  trex.scale=0.4;
  
  ground= createSprite(300,180,600,20);
  ground.addImage("ground", groundimage);
   ground.x = ground.width/2;
  
  ground_invisible=createSprite(300,190,600,5);
  ground_invisible.visible = false;  
  
  cloudgroup=new Group();
  obstaclegroup=new Group();
  
  gameOver=createSprite(300,90,20,20);
  gameOver.addImage(gameOverimage);
  gameOver.visible=false;
  
  restart=createSprite(300,130,20,20);
  restart.addImage(restartimage);
  restart.scale=0.5;
  restart.visible=false;
  
  count=0;
  PLAY= 1;
  END = 0;
  
  gameState = PLAY;
  
}

function draw() {
  background(180);
  
if(gameState===PLAY){
  if(keyDown("space")&&trex.y>=168){
  trex.velocityY=-10; 
  jump.play();
}
  ground.velocityX = -6; 
  
  if(ground.x<0){
  ground.x = ground.width/2;
  
}
 trex.velocityY=trex.velocityY+0.8;
    
   spawnClouds();
  spawnObstacles();
  
  count=count+Math.round(getFrameRate()/60);
  if(count%100===0&&count>0){
    checkpoint.play();
  }
   
  if(trex.isTouching(obstaclegroup)){
    gameState=END;
    die.play();
  }
}
else if(gameState===END){
  ground.velocityX=0;
  trex.velocityY=0;
 obstaclegroup.setVelocityXEach(0);
cloudgroup.setVelocityXEach(0);
  
  obstaclegroup.setLifetimeEach(-1);
  cloudgroup.setLifetimeEach(-1);
  
  gameOver.visible=true;
  restart.visible=true;
  
if (mousePressedOver(restart)){
  reset();
}
}
 //console.log(trex.y); 
  trex.collide(ground_invisible);
  text("SCORE :"+count,500,20);
  
  

  drawSprites();
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  count=0;
}
  function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,150,40,10);
    cloud.y = Math.round(random(100,140));
    cloud.addImage(cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudgroup.add(cloud);
  } 
}
   function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,170,10,40);
    obstacle.velocityX = - (6 + 2*count/100);
    
    //generate random obstacles
    var rand =Math.round (random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obs1);
      break;
      case 2:obstacle.addImage(obs2);
      break;
      case 3:obstacle.addImage(obs3);
      break;
      case 4:obstacle.addImage(obs4);
      break;
      case 5:obstacle.addImage(obs5);
      break;
      case 6:obstacle.addImage(obs6);
      break;
      default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    obstaclegroup.add(obstacle);
  }
}