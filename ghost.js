function Ghost(i,j,ghostColor){
    this.x = i;
    this.y = j;
    this.color = ghostColor;
    this.queue = [];
    this.lastX = 0;
    this.lasyY = 0;
    this.index = 0;
    //Pendiente a mejorar, por lo pronto movimientos aleatorios
    //PROBLEMAS EN PASILLOS CON UNA UNICA SALIDA.
    this.nextRandomMove = function(){
        var auxMovement = Math.floor((Math.random() * 3)); //Auxiliary movements
        var auxX = this.x + dx[auxMovement];
        var auxY = this.y + dy[auxMovement];
        var possibleMove = true;
        if(indexMaze[auxY*rows + auxX] != "X"){
            for(var i=0;i<ghosts.length;i++){
                if(auxX == ghosts[i].getX() && auxY == ghosts[i].getY()){
                    possibleMove = false;
                    break;
                }
            }
        }
        else{
            possibleMove = false;
        }
        if(possibleMove){
            this.x = auxX;
            this.y = auxY;
        }
        
    }
    this.euclidean = function(x1,x2,y1,y2){
        return sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
    }
    this.absMetric = function(x1,x2,y1,y2){
        return (abs(x1-x2) + abs(y1-y2));
    }
    /*
    Se mide con la metrica de distancia euclidiana para el 85% de los casos, en otros 
    se hace un movimiento aleatorio
    */
    this.getX = function(){
        return this.x;
    }
    this.getY = function(){
        return this.y;
    }
    this.nextMove = function(){
        
        var randomRate = 0.3;
        //nextMove extendido, en el 20% de las veces, el movimiento será aleatorio
        if(Math.random() < randomRate){
            this.nextRandomMove();
        }
        else{
            var auxX = 0;
            var auxY = 0;
            var best = 1000;
            var bestX = 0;
            var bestY = 0;
            var possibleMove = true;
            for(var i=0;i<dx.length;i++){
                auxX = this.x + dx[i];
                auxY = this.y + dy[i];
                if(indexMaze[auxY*rows + auxX] != "X"){
                    if(this.euclidean(auxX,Px,auxY,Py) < best){
                        best = this.euclidean(auxX,Px,auxY,Py);
                        bestX = auxX;
                        bestY = auxY;
                    }
                }
            }
            for(var i=0;i<ghosts.length;i++){
                if(bestX == ghosts[i].getX() && bestY == ghosts[i].getY()){
                    possibleMove = false;
                    break;
                }
            }
            if(possibleMove){
                this.x = bestX;
                this.y = bestY;
            }
        }
    }
    
    //Un fantasma representa un cuadrado rojo.
    this.show = function(){
        var x = this.x*w;
        var y = this.y*w;
        noStroke();
        line(x    , y    , x + w, y);
        line(x + w, y    , x + w, y + w);
        line(x + w, y + w, x    , y + w);
        line(x    , y + w, x    , y);
        noStroke();
        if(this.color == 0){
            fill(0, 204, 0,255);
        }
        else if(this.color == 1){
            fill(230, 0, 0,255);
        }
        else if(this.color == 2){
            fill(255, 51, 153,255);
        }
        rect(x, y, w, w);
    }
    
}