var Trex , Obstacles , Ground, invGround , CloudGroup ,ObstacleGroup ,Tanim     , Count=0 ;
var PLAY = 1 , LOSE = 0;

var GameState=PLAY;
var o1 , o2 , o3 , o4 , o5 , o6;

function preload(){
  Tanim = loadAnimation("trex1.png","trex3.png","trex4.png");
  Tlose = loadAnimation("trex_collided.png");
  Gover = loadImage("gameOver.png");
  Rstart = loadImage("restart.png");
  Ganim = loadImage("ground2.png");
  Canim = loadImage("cloud.png");
   
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png"); 
  o4=loadImage("obstacle4.png"); 
  o5=loadImage("obstacle5.png");  
  o6=loadImage("obstacle6.png"); 
    
  Jump_S = loadSound("jump.mp3");
  Die_S  = loadSound("die.mp3");
  CP_S   = loadSound("checkPoint.mp3");
}

function setup() { 
  createCanvas(600, 300);
  
  //TREX 
  Trex = createSprite(50,  212  ,  5,  5);
  Trex.setCollider("circle",-5,-5,40); 
  Trex.debug =true;
  Trex.scale = 0.8;
  Trex.addAnimation("running",Tanim);
  Trex.addAnimation("collided" , Tlose);
  
  Ground = createSprite(300,250,600,1);
  Ground.addImage("ground",Ganim);
  Ground.velocityX=-7;
  
  invGround = createSprite(300,253,600,1);
  invGround.visible = false;
  
  CloudGroup=new Group();
  ObstacleGroup=new Group();
}

function draw() {
  background("white");
  textSize (15);
  text ("SCORE:"+Count ,500,30);
  
  if(GameState === PLAY){
    
    Count = Count + Math.round(getFrameRate()/60);
    
    if(Count%100===0){
        CP_S.play() ;
    }
    
    if(keyDown("space")&& Trex.y>=211){
       Trex.velocityY=-10; 
       Jump_S.play() ;
    }
  
    if(Ground.x<0){
     Ground.x = Ground.width/2
    }
    
  if(ObstacleGroup.isTouching(Trex)) {
     GameState = LOSE;
    Die_S.play();
  }

  Clouds(); 
  Obs();
    
  // GRavity
  Trex.velocityY=Trex.velocityY+0.5;
   
  } 
  else if(GameState===LOSE){
      ObstacleGroup.setLifetimeEach(-1);
      Trex.velocityY=0;
      ObstacleGroup.setVelocityXEach(0);
      CloudGroup.setLifetimeEach(-1);
      CloudGroup.setVelocityXEach(0);
      Ground.velocityX = 0;
      Trex.changeAnimation("collided",Tlose);
  }
  Trex.collide(invGround); 
  // console.log(Ground.x);
  drawSprites(); 
}
function Clouds(){  
  if(frameCount%60===0){
    var Cloud ;
        Cloud = createSprite(600,random(50,150),1,1);
        Cloud.velocityX=-5;
        Cloud.addImage("cloud",Canim);
    
    Trex.depth=Trex.depth+1; 
    Cloud.depth=Trex.depth;
    
    CloudGroup.add(Cloud);
  }
}
function Obs(){
  if(frameCount%60===0){ 
    var obstacle  
        obstacle=createSprite(600,225 ,1,1);
        obstacle.velocityX=-7;
        obstacle.scale=0.8; 
    var RandomNo = Math.round(random(1,6));   
    
    switch(RandomNo){
      case 1 : obstacle.addImage(o1);
        break;
      
      case 2: obstacle.addImage(o2);
        break;
        
      case 3: obstacle.addImage(o3);
        break;
        
      case 4: obstacle.addImage(o4);
        break;
        
      case 5: obstacle.addImage(o5);
        break;
        
      case 6: obstacle.addImage(o6);
        break;
        
      default:break;
 
    }
       ObstacleGroup.add(obstacle);
  }
}