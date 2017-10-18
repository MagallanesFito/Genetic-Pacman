from random import randint,random
#Leer el escenario y el gen inicial desde archivo de texto

tempGene = []
maxGenerations = 200
maxLength = len(population[0])
minLength = 191
deltaMaxLength = 20

#haz 4 genes derivados del primero
percentChange = 0.5
for k in range(3):
    elements = randint(minLength,maxLength+deltaMaxLength)
    tempGene = population[k][:elements]
    for i in range(len(tempGene)):
        if(random() < percentChange):
            #randomIndex = randint(0,len(population[0])) 
            tempGene[i] = randint(37,40)
    population.append(tempGene)
population.append(map(int,initGene))



#rows = 22
#cols = 19
#visited = [False for i in range(len(indexBoard))]
#
#def index(x,y):
#    return (x*cols+y)
#
#def printBoard():
#    for i in range(rows):
#        for j in range(cols):
#            print(indexBoard[index(i,j)]),
#        print("\n")
#    print("\n\n")
#
#
#Px = 16
#Py = 9
#points = 0
#indexBoard[index(Px,Py)] = 'P'
#movimiento = ''
#
#while(points<191):
#    print(points)
#    printBoard()
#    movimiento = raw_input('')
#    if(movimiento=='a'):
#        Py = Py-1
#    if(movimiento=='w'):
#        Px = Px -1
#    if(movimiento=='d'):
#        Py = Py+1
#    if(movimiento == 's'):
#        Px = Px+1
#    if(visited[index(Px,Py)]):
#        points = points+1
#    indexBoard[index(Px,Py)] = 'P'
#    
#    
