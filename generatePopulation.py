from random import randint,random

#Lee el tablero desde un archivo
text_file = open("boardPython.txt","r")
maze = text_file.read().split(",")
rows = 22
cols = 19
dx = [-1,0,1,0]
dy = [0,-1,0,1]
ghosts = [[1,1],[1,17]] #posiciones iniciales


#Lee los tres genes desde archivo
MAX_GENES = 3
MAX_POINTS = 191
splitting = ""
population= []
for i in range(1,MAX_GENES+1):
    filename = "genes_iniciales/"+str(i)+".txt"
    text_file = open(filename,"r")
    #El primer archivo es difrente a los demás
    if(i==1):
        splitting = ","
    else:
        splitting = "\n"
    gene = text_file.read().split(splitting)
    population.append(map(int,gene))
    
print(population[2])

#inicia entrenamienpto de pacman
def index(x,y):
    return(x*cols+y)

def nextRandomMove(i):
    auxMov = randint(0,3)
    aX = ghosts[i][0] + dx[auxMov]
    aY = ghosts[i][1] + dy[auxMov]
    posible = True
    if(maze[index(aX,aY)] != 'X'):
        for j in range(2):
            if(aX == ghosts[j][0] and aY == ghosts[j][1]):
                posible=False
                break
    else:
        posible = False
    if(posible):
        ghosts[i][0] = aX
        ghosts[i][1] = aY
def euclidean(x1,x2,y1,y2):
    return sqrt((x1-x2)**2 + (y1-y2)**2)
def nextMove(code,Px,Py,steps,points,visited):
    indexMov = code-37
    auxX = Px + dx[indexMov]
    auxY = Py + dy[indexMov]
    if(maze[index(auxX,auxY)] != 'X'):
        Px = auxX
        Py = auxY
        steps = steps+1
    if(visited[index(Px,Py)]):
        visited[index(Px,Py)] = True
        points = points+1
def fitness(gene):
    points = 0
    steps = 0
    visited = [False for i in range(len(maze))]
    Px = 16
    Py = 9
    geneIndex= 0
    randomRate = 0.3
    while(True):
        for i in range(len(ghosts)):
            if(random() < randomRate):
                nextRandomMove(i)
            else:
                auxX = 0
                auxY = 0
                best =1000
                bestX = 0
                bestY = 0
                posible = True
                for j in range(len(dx)):
                    auxX = ghosts[i][0] + dx[j]
                    auxY = ghosts[i][1] + dy[j]
                    if(maze[index(auxX,auxY)] != 'X'):
                        if(euclidean(auxX,Px,auxY,Py) < best):
                            best = euclidean(auxX,Px,auxY,Py)
                            bestX = auxX
                            bestY = auxY
                
                for j in range(2):
                    if(bestX == ghosts[j][0] and bestY == ghosts[j][1]):
                        posible=False
                        break
                if(posible):
                    ghosts[i][0] = bestX
                    ghosts[i][1] = bestY
         
        nextMovement = gene[geneIndex]
        nextMove(nextMovement,Px,Py,steps,points,visited)
        geneIndex = geneIndex+1
        geneIndex = geneIndex%len(gene)
        if(points == MAX_POINTS):
            return(points,steps)
        for i in range(len(ghosts)):
            difX = abs(Px-ghosts[i][0])
            difY = abs(Py-ghosts[i][1])
            if((difX == 1 and difY==0) or (difX ==0  and difY==1) or (difX == 0 and difY==0)):
                return(points,steps)
    
MAX_GENERATIONS = 5
numPopulation = len(population)

for g in range(MAX_GENERATIONS):
    scores = []
    ghosts = [[1,1],[1,17]]
    for i in range(numPopulation):
        scores.push(fitness(population[i]))
        #Tomar los mejores dos
        #Crossover
        #Mutation
    


