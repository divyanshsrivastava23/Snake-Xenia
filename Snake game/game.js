const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// unit
const box = 32;
// load images
const ground = new Image();
ground.src = "ground.png";

const foodImg = new Image();
foodImg.src = "food.png";
// load audio files
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let left = new Audio();
let right = new Audio();
let down = new Audio();

dead.src = "mp3/dead.mp3";
eat.src = "mp3/eat.mp3";
up.src = "mp3/up.mp3";
left.src = "mp3/left.mp3";
right.src = "mp3/right.mp3";
down.src = "mp3/down.mp3";


//create snake
let snake = [];

snake[0] ={
    x : 15 * box,
    y : 15 * box
};

//food
let food = {
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box
}
//score
let score = 0;
//control the snake

let d;

document.addEventListener("keydown",direction)

function direction(event){
    if(event.keyCode == 65 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(event.keyCode == 87 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(event.keyCode == 68 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(event.keyCode == 83 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

//check collision
function collision(head,array)
{
    for(let i=0; i < array.length; i++)
    {
        if(head.x == array[i].x && head.y== array[i].y)
        {
            return true;
        }
        
    }
    return false;
}

//drawing everything to canvas
function draw() {
    ctx.drawImage(ground,0,0);
    for(let i=0; i < snake.length; i++)
    {
        ctx.fillStyle = ( i == 0 )?  "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y, box,box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    ctx.drawImage(foodImg, food.x, food.y);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //which direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN")snakeY +=box;
    
    // if snake eats the food
    if(snakeX == food.x && snakeY == food.y)
    {
        score++;
        eat.play();
       food = { 
             x: Math.floor(Math.random()*17+1) * box,
             y: Math.floor(Math.random()*15+3) * box
       }
    }else{
        //remove tail
        snake.pop();
    }

     // new head
     let newHead = {
        x : snakeX,
        y : snakeY
    }

    //game over rules
    if (snakeX < box || snakeX > 17*box || snakeY < 3*box || 
        snakeY > 17*box || collision(newHead, snake))
        {
            clearInterval(game);
            dead.play();
        }
    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Change one";
    ctx.fillText(score,2*box,1.6*box);

} 

//call draw function every 100ms
let game = setInterval(draw,100);
