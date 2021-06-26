var ben, bombs, edges, bombsGroup, gem, boosters;
var bombPNG, gemPNG, lightningboltPNG, ninjamonkeyPNG;
var jungleBackgroundJPG, gemWinJPG; 
var gameState = "play"; 

function preload(){
  bombPNG = loadImage("bomb.png");
  gemPNG = loadImage("gem.png");
  lightningBoltPNG = loadImage("lightning bolt.png");
  ninjaMonkeyPNG = loadImage("ninja monkey.png");
  jungleBackgroundJPG = loadImage("jungle background.jpg")
  gemWinJPG = loadImage("gem win.jpg")
}

function setup() {
  createCanvas(1900, 950);
  ben = createSprite(50,50)
  ben.addImage(ninjaMonkeyPNG)
  ben.scale = 0.1
  //ben.shapeColor = ("green");
  //bombs = createSprite(400,400,15,15)
  bombsGroup = new Group();
  gem = createSprite(1850,900)
  gem.addImage(gemPNG)
  gem.scale = 0.1
  gem.shapeColor = ("magenta")
  boostersGroup = new Group();
}

function draw() {
 
  
  if(gameState === "play"){
    background(jungleBackgroundJPG)
    edges = createEdgeSprites();
    fill("white")
    textSize(30);
    text("Ben",ben.x-25,ben.y-50);

    if(keyDown("W")){
      ben.velocityY = -7;
      ben.velocityX = 0;
    }
    if(keyDown("S")){
      ben.velocityY = 7;
      ben.velocityX = 0;
    }
    if(keyDown("A")){
      ben.velocityY = 0;
      ben.velocityX = -7;
    }
    if(keyDown("D")){
      ben.velocityY = 0;
      ben.velocityX = 7;
    }
    ben.bounceOff(edges);

    if(ben.isTouching(bombsGroup)){
      ben.x = 50
      ben.y = 50
    }
    if(ben.isTouching(gem)){
      gameState = "end"
      
    }
    if(ben.isTouching(boostersGroup)){
      ben.velocityY += Math.round(random(-10,10));
      ben.velocityX += Math.round(random(-10,10));
    }

    //if(bombsGroup.isTouching(boostersGroup)){
      //bombs.width = Math.round(random(50,200));
      //bombs.height = Math.round(random(50,200));
    //}

    console.log(ben.velocityY)
    spawnBombs();
    spawnBoosters();
    drawSprites();
  }
  if(gameState === "end"){
    ben.velocityY = 0
    ben.velocityX = 0
    ben.x = 50
    ben.y = 50
    bombsGroup.destroyEach();
    boostersGroup.destroyEach();
    background(gemWinJPG);
    fill("red");
    textSize(150);
    text("You have stolen the gem!",180,550);
    fill("red");
    textSize(50)
    text("Press Spacebar to start the game again!",500,650);
    if(keyDown("space")) {
      gameState = "play"
    }
 }
}

function spawnBombs(){
  if(frameCount % 3 === 0){ 
    bombs = createSprite(400,400)
    bombs.addImage(bombPNG);
    bombs.scale = 0.075
    //bombs.shapeColor = "red"; 
    //bombs.addImage()
    bombs.y = Math.round(random(75,950))
    bombs.x = Math.round(random(75,1900))
    bombs.lifetime = 75;
    ben.depth = bombs.depth;
    ben.depth = ben.depth + 1;
    bombsGroup.add(bombs);
  }
}

function spawnBoosters(){
  if(frameCount % 7 === 0){ 
    boosters = createSprite(400,400,35,35)
    boosters.addImage(lightningBoltPNG)
    boosters.scale = 0.075
    //boosters.shapeColor = "blue";
    //bombs.addImage()
    boosters.y = Math.round(random(75,950))
    boosters.x = Math.round(random(75,1900))
    boosters.lifetime = 200
    ben.depth = boosters.depth
    ben.depth = ben.depth + 1;
    boostersGroup.add(boosters);

  }
}


