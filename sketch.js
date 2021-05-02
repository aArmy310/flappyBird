var bird;
var bg, bgImg;
var foodGroup , obstacleGroup;
var a,b;
var score;
var ground, topE;
var gameState =0;
var play;
var tempBg;

function preload(){

    bgImg = loadImage("bg.jpg")
}

function setup(){

        createCanvas(600,500);

        bg = createSprite(300,250);
        bg.addImage(bgImg)
        bg.scale = 5;
        bg.velocityX = -2;
        bird = createSprite(50,250,50,50);
        ground = createSprite(300,495,600,5);
        topE = createSprite(300,5,600,5);
        tempBg = createSprite(300,250,600,500);
        tempBg.shapeColor ="white";
        tempBg.visible=false;
        foodGroup = new Group();
        obstacleGroup = new Group();

        play = createSprite(300,300,100,50);
        play.visible = false;
        play.shapeColor ="black"
        a =0;
        b=0;
        score = 0;
}


function draw(){

        background("black");

        if(gameState===0){
        bird.visible = false;
        play.visible = true;
        tempBg.visible=true

       if(keyDown("s")){
           gameState=1
           score=0
       }


        }else if(gameState===1){
            bird.visible = true;
            play.visible = false;
            tempBg.visible=false
            if(keyDown("space")){
                bird.velocityY = - 3;
            }
            bird.velocityY = bird.velocityY +0.3;
            bird.collide(ground);
            bird.collide(topE);

        
        obstacles();
        food();

        if (bird.isTouching(foodGroup)){
            var x=foodGroup.get(a);
            if(bird.isTouching(x))
            {
                x.destroy();
                score = score+1;
            }
            else{
                a = a+1;
            }
            }
            
            if (bird.isTouching(obstacleGroup)){
                var x=obstacleGroup.get(b);
                if(bird.isTouching(x))
                {
                    x.destroy();
                    score = score-1;
                }
                else{
                    b = b+1;
                }
                }
                if(score===10||bird.collide(topE)||bird.collide(ground) )  {
                    gameState=0;
                    obstacleGroup.setVelocityXEach(0)
                    foodGroup.setVelocityXEach(0)
                    obstacleGroup.destroyEach()
                    foodGroup.destroyEach()
        
        
                }
           
        }

         
        if(bg.x<0){
            bg.x = bg.width/2;
            }

        drawSprites();
        textSize(22);
        fill("white");
        text("score: "+score,480,40);

}


function obstacles(){
    if (frameCount%100===0){
        var ob=createSprite(600,random(5,495),30,30)
        ob.velocityX = -3;
        ob.lifetime = 600/3;
        ob.shapeColor ="red";
        obstacleGroup.add(ob);
    }
}
function food(){
    if (frameCount%80===0){
        var ob=createSprite(600,random(5,495),30,30)
        ob.velocityX = -3;
        ob.lifetime = 600/3;
        ob.shapeColor ="green";
        foodGroup.add(ob);
    }
}
