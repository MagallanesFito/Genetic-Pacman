function Pacman(i,j,gen){
    this.x = i;
    this.y = j;
    this.points = 0;
    this.steps = 0;
    this.gene = gen;
    this.geneIndex = 0;
    
    this.show = function(){
        var x = this.x*w;
        var y = this.y*w;
        noStroke();
        fill(255, 255, 51,255);
        ellipse(x+w/2,y+w/2,w,w);
    }
    this.getX = function(){
        return this.x;
    }
    this.getY = function(){
        return this.y;
    }
    this.getPoints = function(){
        return this.points;
    }
    this.nextMove = function(code){
        var index  = code-MIN_CODE;
        var auxX = this.x + dx[index];
        var auxY = this.y + dy[index];
        if(indexMaze[auxY*rows + auxX] != "X"){
            this.x = auxX;
            this.y = auxY;
            this.steps = this.steps+1;
        }
        if(maze[this.x*cols + this.y].isVisited()){
            maze[this.x*cols + this.y].visit();
            this.points = this.points+1;
        }        
    }
    this.nextGeneticMove = function(){
        var nextMovement = this.gene[this.geneIndex];
        this.nextMove(nextMovement);
        this.geneIndex++;
        this.geneIndex = (this.geneIndex)%this.gene.length;
    }
    
}