function Cell(i,j){
    this.x = i;
    this.y = j;
    //this.hasFood = true;
    //visitado por pacman solamente
    this.visited = true;
    
    this.show = function() {
        var x = this.x*w;
        var y = this.y*w;
        stroke(255);
        line(x    , y    , x + w, y);
        line(x + w, y    , x + w, y + w);
        line(x + w, y + w, x    , y + w);
        line(x    , y + w, x    , y);
        noStroke();
        if (this.isWall()) {
          fill(0, 102, 255,200);
          rect(x, y, w, w);
        }
        else{
          fill(0,0,0,255);
          rect(x, y, w, w);
          if(this.cellWithFood()){
              fill(230, 230, 0,255);
              ellipse(x+w/2,y+w/2,w/4,w/4);
          }
        }
    }
    this.isVisited = function(){
        return this.visited;
    }
    this.visit = function(){
        this.visited = false;
    }
    this.isWall = function(){
        return(indexMaze[this.y*rows + this.x] == "X");
    }
    //Esta celda debe tener comida si es un pasillo, o no ha sido visitada por pacman 
    this.cellWithFood = function(){
        if(!this.isWall() && this.visited){
            return true;
        }
        return false;
    }
    
}