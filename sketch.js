var bg,bgimg
var bob,bobrunning
var platform,platformImg,platformGroup
var laser,laserImg,laserGroup
var rock,rockImg,rockGroup
var gem,gemImg,gemGroup
var coin,coinImg,coinGroup
var gameState = "play"
var score = 0
var life = 3
var invisibleBottom,invibleTop

function preload(){
    bgimg = loadImage("Assets/bg.png")
    bobrunning = loadAnimation("Assets/bob1.png","Assets/bob2.png","Assets/bob3.png","Assets/bob4.png","Assets/bob5.png","Assets/bob6.png","Assets/bob7.png")
    platformImg = loadImage("Assets/platform.png")
    coinImg = loadAnimation("Assets/c1.png","Assets/c2.png","Assets/c3.png","Assets/c4.png","Assets/c5.png","Assets/c6.png","Assets/c7.png","Assets/c8.png","Assets/c9.png")
    rockImg = loadImage("Assets/stone.png")
    gemImg = loadImage("Assets/gem.png")
    laserImg = loadImage("Assets/laser.png")

}

function setup(){
    createCanvas(1700,900)
    bg = createSprite(700,450,1400,900)
    bg.addImage(bgimg)
    bob = createSprite(80,670,60,60)
    bob.addAnimation("running",bobrunning)
   // bob.debug = true
    invisibleBottom = createSprite(20,850,30000,20)
    invisibleBottom.visible = false
    platformGroup = new Group()
    coinGroup = new Group()
    gemGroup = new Group()
    rockGroup = new Group()
    laserGroup = new Group()
    bob.debug = false
}   

function draw(){
    background(0)


    if(gameState === "play") {
        if(keyDown("right")) {
            bob.x += 5
        }
        if(keyDown("up")) {
            bob.velocityY = -10
        }
        bob.velocityY += 0.8

       bg.velocityX = -2
       if(bg.x<100) {
        bg.x = 1000
       }

       if(bob.y<=0) {
       bob.y = 0
       }

       if(platformGroup.isTouching(bob)) {
        bob.velocityY = 0
        bob.collide(platformGroup)
       }


       rockGroup.isTouching(invisibleBottom,rockCollide)
        
       coinGroup.isTouching(bob,destroyCoins)
       gemGroup.isTouching(bob,destroyGems)
       rockGroup.isTouching(bob,destroyRocks)
       if(laserGroup.isTouching(bob)||score<0||life<0) {
        gameState = "end"
       }

       spawnPlatform()
       spawnGem()
       spawnRock()
       spawnLaser()
    }

    if(gameState === "end") {
        bob.destroy()
        platformGroup.destroyEach()
        coinGroup.destroyEach()
        laserGroup.destroyEach()
        gemGroup.destroyEach()
        rockGroup.destroyEach()
        bg.velocityX = 0
        life = 0
        gameOver()
    }


    bob.collide(invisibleBottom)
    drawSprites()
   
    textSize(25)
    stroke(0)
    strokeWeight(3)
    fill(0)
    text(" S C O R E : "+ score, bob.x -120, bob.y - 120)
    text(" L I F E : "+ life, bob.x -100, bob.y - 70)

}

function spawnRock() {
    if(frameCount%200===0) {
        rock = createSprite(random(100,1600),0)
        rock.addImage("rock",rockImg)
        rock.scale = 0.5
        var v = random(6,20)
        rock.velocityY =  v
        rock.lifetime = 900/v
        rockGroup.add (rock)
    }
}




function spawnPlatform() {
if(frameCount%300===0) {
    platform = createSprite(1700,600)
    platform.addImage(platformImg)
    platform.velocityX = -3
    platform.scale = 0.4
    platform.y = random(100,500)
    platform.lifetime = 1700/3
    platform.debug = false
    platform.setCollider("rectangle",0,0,350,200)
    platformGroup.add(platform)

    coin = createSprite(platform.x,platform.y - 70)
    coin.addAnimation("coin",coinImg)
    coin.velocityX = -3
    coin.lifetime = 1700/3
    coinGroup.add(coin)
    coin.scale = 0.6
}

}

function spawnGem() {
    if(frameCount%500===0) {
        gem = createSprite(1700,random(100,400))
        gem.addImage("gem",gemImg)
        gem.scale = 0.4
        gem.velocityX = -7
        gem.lifetime = 1700/7
        gemGroup.add(gem)
    }

}

function spawnLaser() {
if(frameCount%100===0) {
    laser = createSprite(1700,random(100,400))
    laser.addImage("laser",laserImg)
    laser.scale = 0.09
    laser.debug = false
    laser.setCollider("rectangle",0,0,200,20)
    laser.velocityX = -9
    laser.lifetime = 1700/9
    laserGroup.add(laser)
}

}

function rockCollide(rock) {
rock.collide(invisibleBottom)
rock.lifetime = -1
rock.velocityX = -2
}

function destroyCoins(coin) {
score+= 3
coin.destroy()
}

function destroyGems(gem) {
score += 5
gem.destroy()

}

function destroyRocks(rock) {
rock.destroy()
score -= 3
life -= 1
}

function gameOver() {
    swal(
        {
            title: "G A M E  O V E R !!!", 
            text: "Thanks for playing...",
            imageUrl:  "assets/bob1.png", 
            imageSize: "150x150",
            confirmButtonText: "PLAY AGAIN"
        },
        function(isConfirm) {
            if(isConfirm) {
                location.reload()
            }
        }
    )
}







