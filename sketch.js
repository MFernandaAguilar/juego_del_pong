var ball, playerPaddle, computerPaddle;
var gameState = "serve";
//variables para llevar la puntuación
var compScore = 0;
var playerScore = 0;
var edges;
function setup() {
  createCanvas(400,400);
  ball = createSprite(200,200,10,10);
  playerPaddle = createSprite(380,200,10,70);
  computerPaddle = createSprite(10,200,10,70);
}

function draw() 
{
  background("white");
  
  edges =createEdgeSprites();
  
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  if (gameState === "serve") {
    text("Presiona la Barra Espaciadora para Sacar",100,180);
  }
  
   //mostrar la puntuación
   text(compScore, 170,20);
   text(playerScore, 230,20);

   //hacer que se mueva con la posición y de la pelota
  computerPaddle.y = ball.y; 
   //haz que la barra del jugador se mueva con la posición y del ratón
  playerPaddle.y = World.mouseY;

  //dibuja una línea en el centro
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  }


  //crea los límites de borde
  //haz que la pelota rebote con el borde superior e inferior
 
  
  //ball.bounceOff(edges[2]);
  //ball.bounceOff(edges[3]);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
 


  if (keyDown("space") &&  gameState === "serve") {
    serve();
    gameState = "play";
  }


  //reinicia la posición de la pelota al centro si cruza la pantalla
  if(ball.x > 400 || ball.x <0) {
    
    if(ball.x > 400) {
      compScore = compScore + 1;
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1;
    }
    
    reset();
    gameState = "serve";
  }

  if (playerScore === 5 || compScore === 5){
    gameState = "over";
    text("¡Fin del Juego!",170,160);
    text("Presiona 'R' para Reiniciar",150,180);
  }
  
  if (keyDown("r") && gameState === "over") {
    gameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
  
 drawSprites();
}

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}



