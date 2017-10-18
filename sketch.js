var maze = [];
var rows = 19;
var cols = 22;
var ghosts = [];
const MIN_CODE = 37;
const MAX_POINTS = 191;
const MAX_GENE_LENGTH = 5;
var generatedGene = [
 39,39,39,39,39,40,40,39,39,38,38,39,40,40,40,40,37,37,37,37,37,37,37,38,38,39,39,38,38,37,37,37,37,37,37,40,40,39,39,40,40,39,37,37,37,37,37,37,37,37,38,38,38,38,39,40,40,39,39,38,38,39,37,38,38,37,37,37,40,38,39,39,39,39,39,39,39,40,40,39,39,38,38,39,39,39,39,39,39,39,40,40,37,39,38,38,37,37,37,40,38,38,38,38,38,38,38,38,38,39,39,39,38,38,38,38,38,37,37,37,40,40,40,39,39,37,37,40,38,37,37,37,37,38,38,38,39,39,39,37,37,37,40,40,40,39,39,40,40,37,37,40,40,39,39,40,40,40,40,37,37,37,37,37,37,38,38,39,39,39,39,39,38,37,37,37,37,37,38,39,39,39,38,37,38,37,37,38,38,39,39,39,37,38,38,38,37,37,37,37,37,37,37,40,40,40,39,39,39,39,37,38,38,40,40,40,40,37,37,37,38,40,39,39,39,40,40,40,40,40,40,40];
var printableGene = [];
//ancho de cuadrado
var w = 30;
//Vectores de direccion
var dx = [-1,0,1,0];
var dy = [0,-1,0,1];
var str1 = "Puntos: ";

//Posiciones iniciales de pacman
var Px = 9;
var Py = 16;
var pacman;

var mystr = "X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X, , , , , , , , ,X, , , , , , , , ,X,X, ,X,X, ,X,X,X, ,X, ,X,X,X, ,X,X, ,X,X, ,X,X, ,X,X,X, ,X, ,X,X,X, ,X,X, ,X,X, , , , , , , , , , , , , , , , , ,X,X, ,X,X, ,X, ,X,X,X,X,X, ,X, ,X,X, ,X,X, , , , ,X, , , ,X, , , ,X, , , , ,X,X,X,X,X, ,X,X,X, , , ,X,X,X, ,X,X,X,X,X,X,X,X, ,X, , , , , , , ,X, ,X,X,X,X,X,X,X,X, ,X, , , , , , , ,X, ,X,X,X,X,X,X,X,X, ,X, , , , , , , ,X, ,X,X,X,X,X,X,X,X, ,X, ,X,X,X,X,X, ,X, ,X,X,X,X,X,X,X,X, ,X, , , , , , , ,X, ,X,X,X,X,X,X,X,X, ,X,X,X,X,X,X,X,X,X, ,X,X,X,X,X, , , , , , , , ,X, , , , , , , , ,X,X, ,X,X, ,X,X,X, ,X, ,X,X,X, ,X,X, ,X,X, , ,X, , , , , , , , , , , ,X, , ,X,X, , ,X, ,X, ,X,X,X,X,X, ,X, ,X, , ,X,X, , , , ,X, , , ,X, , , ,X, , , , ,X,X, ,X,X,X,X,X,X, ,X, ,X,X,X,X,X,X, ,X,X, , , , , , , , , , , , , , , , , ,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X";
var indexMaze = [];

function setup(){
    createCanvas(rows*w,cols*w+40);
    frameRate(5);
    indexMaze = mystr.split(",");
    
        
    for(var i=0;i<rows;i++){
        for(var j=0;j<cols;j++){
            var cell = new Cell(i,j);
            maze.push(cell);
        }
    }
    //Crea a Pacman
    var initGene = generatedGene;
    pacman = new Pacman(Px,Py,initGene);
    //La posicion inicial ya está visitada, no cuenta en los puntos de pacman
    maze[Px*cols +Py].visit();
    //Crea tres fantasmas con posiciones iniciales preestablecidas
    ghosts.push(new Ghost(1,1,0));
    //ghosts.push(new Ghost(9,4,1));
    ghosts.push(new Ghost(17,1,2,initGene));
    //console.log(maze);
}
function draw(){
    background(0);
    textSize(32);
    
    for(var i=0;i<maze.length;i++){
        maze[i].show();
    }
    //despliega los fantasmas
    for(var i=0;i<ghosts.length;i++){
        ghosts[i].show();
    }
    pacman.show();  
    var str2 = pacman.getPoints().toString();
    var textDisplay = str1.concat(str2);
    
    text(textDisplay,w-10,cols*w+w);
    
    if(gameFinished() == 1){
        text("HAZ GANADO!",220,cols*w+w);
        //console.log(printableGene);
        exit();
    }
    else if(gameFinished() == 2){
        text("HAZ PERDIDO!",220,cols*w+w);
        exit();
    }
    
    //Genera siguiente movimiento para los fantasmas
    for(var i=0;i<ghosts.length;i++){
        ghosts[i].nextMove();
    }
    Px = pacman.getX();
    Py = pacman.getY();
    //pacman.nextGeneticMove();
    
}
//Esto va a cambiar, solo mandar el valor de keyCode
function keyPressed(){
   printableGene.push(keyCode);
   pacman.nextMove(keyCode);
}
/*
La funcion regresa
0: si el juego aun debe continuar
1: el jugador ganó
2: el jugador perdió
*/
function gameFinished(){
   if(pacman.getPoints() == MAX_POINTS){
       return 1;
   }
   for(var i=0;i<ghosts.length;i++){
       /*if(pacman.getX() == ghosts[i].getX() && pacman.getY() == ghosts[i].getY()){
           return 2;
       }*/
       var difX = abs(pacman.getX() - ghosts[i].getX());
       var difY = abs(pacman.getY() - ghosts[i].getY());
       if((difX == 1 && difY == 0) || (difX == 0 && difY == 1) || (difX==0 && difY==0)){
           return 2;
       }
   }
    return 0;
   
}