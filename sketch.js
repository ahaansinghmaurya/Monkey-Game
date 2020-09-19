var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananasGroup, obstaclesGroup
var score=0
var bananaScore = 0;


function preload(){
  
  
  monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
 
 
}



function setup() {
  createCanvas(600,600);
  
monkey = createSprite(50,330);
monkey.addAnimation("running", monkey_running);
monkey.scale=0.14;
  
  ground = createSprite(400,350,900,10)
  ground.velocityX=-4;
  ground.x = ground.width /2;
  
  
  obstaclesGroup = new Group();
  bananasGroup = new Group();  
  
  score = 0;
  
}


function draw() {
  
  background("skyblue")  
  
  
  
  if(ground.x<400) {
   ground.x=ground.width/2;
  }
  
  if(keyDown("space")) {
    monkey.velocityY = -12;
  }
  
  if (monkey.isTouching(bananasGroup)){
      bananaScore++;  
      bananasGroup.destroyEach();
    
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
   fill("black");
   fill("black");
  text("SURVIVAL TIME: "+score, 70, 20);
   score = score + Math.round(getFrameRate()/60);
  text("BANANAS COLLECTED: "+bananaScore,200,20);
  
  monkey.collide(ground);
  banana();
  spawnObstacles();
  

  drawSprites();
 
  
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocitX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
  }
    
function banana(){
 if (frameCount%80 === 0){
    var banana
    banana = createSprite(400,120, 50, 50 )
    banana.y = Math.round(random(330,120))
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananasGroup.add(banana);
}
}
function spawnObstacles(){
  if (frameCount%200 === 0){
    obstacle = createSprite(400,330,20,20);
    obstacle.velocityX = -6
    obstacle.addAnimation(obstacleImage,"obstacle");
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ; 
    obstacle.lifetime = 220;
    obstaclesGroup.add(obstacle);
    
  }
  
  
}
}