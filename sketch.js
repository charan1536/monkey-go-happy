var monkey , monkey_running,ground;
var banana ,bananaImg, obs, obsImage;
var bananaGroup, obsGroup;
var bk,bkImg;
var survivalTime=1;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImg  = loadImage("banana.png");
  obsImage = loadImage("obstacle.png");
  bkImg= loadImage("bg_1.jpg");
 
}



function setup() {
  
createCanvas(500,400);
  
  bk=createSprite(10,10,500,500);
  bk.addImage(bkImg);
  bk.scale=3;
  bk.velocityX=-4;
  
  monkey=createSprite(100,390,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
  
  ground=createSprite(250,398,700,10);
  ground.visible=false;
  //ground.velocityX=-4;
  
  bananaGroup=new Group();
  obsGroup= new Group();
  
}


function draw() {
  background("white");
  //survivalTime=Math.round(frameCount%frameRate())
  
  
  
  if(bk.x<200){
    bk.x=bk.width/2;
  }
  
  if(keyDown("space")&& monkey.y>200){
    monkey.velocityY=-15;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    survivalTime= survivalTime+1;
    monkey.scale=0.21;
  }
  
  else if(obsGroup.isTouching(monkey)){
    monkey.scale=0.15;
    
    if(survivalTime >0){
        survivalTime=survivalTime-1;
    }
  }
  
  
  obstacles();
  food();
  monkey.collide(ground);
  drawSprites();
  
  if(survivalTime===0){
  textSize(50);
  fill("black");
  text("Game Over",150,280);
  monkey.destroy();
  bk.velocity=0;
    
  obsGroup.destroyEach();
  bananaGroup.destroyEach();
  }
  
  textSize(20);
  fill("white");
  text("Survival Time: "+survivalTime,200,80);
}


function food(){
  
  if(frameCount%120===0){
    banana=createSprite(500,Math.round(random(120,200)),10,10);
    banana.addImage(bananaImg);
    banana.scale=0.1;
    banana.velocityX=-4;
    banana.lifetime=150;
    
    bananaGroup.add(banana);
  }
  
 
}

function obstacles(){
  if(frameCount%200===0){
    obs=createSprite(500,375,10,10);
    obs.addImage(obsImage);
    obs.velocityX=-4;
    obs.scale=0.2;
    obs.lifetime=150;
    
    obs.setCollider("circle",0,0,20);
    obs.debug=true;
    obsGroup.add(obs);
    
  }
}

