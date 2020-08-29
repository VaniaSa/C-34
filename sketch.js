var Ball;
var database,position;
function setup(){
    database=firebase.database();
    console.log(database);
    createCanvas(500,500);
    Ball = createSprite(250,250,10,10);
    Ball.shapeColor = "red";
    BallPosition = database.ref('Ball/position');
    BallPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(position!==undefined)
    {
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
    }
}

function changePosition(x,y){
    Ball.x = ball.x + x;
    Ball.y = ball.y + y;
}

function readPosition(data)
{
 position = data.val();
 //console.log(position.x);
 Ball.x = position.x;
 Ball.y = position.y;
}

function showError()
{
    console.log("error in writing to the database");
}

function writePosition(x,y)
{
    database.ref('Ball/position').set({
        'x': position.x+x,
        'y': position.y+y   
    })
}
