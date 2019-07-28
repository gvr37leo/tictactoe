class TreeNode<T>{
    parent:TreeNode<T>
    bestchild:TreeNode<T>
    children:TreeNode<T>[]
    constructor(public state:T,public isMax:boolean,public value:number,){

    }
}



function minimax<T>(depth,current:TreeNode<T>, nextStateGenerator:(state:T) => T[], stateEvaluator:(state:T) => number):TreeNode<T>{
    var score = stateEvaluator(current.state)
    if(depth == 0 || score != 0){
        current.value = score
        return current
    }
    var nextstates = nextStateGenerator(current.state)
    if(nextstates.length == 0){
        current.value = score
        return current
    }
    var children = nextstates.map(ns => {
        var node = new TreeNode(ns,!current.isMax,null)
        node.parent = current
        return node
    }) 

    children.forEach(childnode => minimax(depth - 1,childnode,nextStateGenerator,stateEvaluator))
    var best = findbestA(children,(tn,cbest) => {
        if(current.isMax){
            var result = tn.value - cbest.value
            if(result == 0){
                var ownchildchainlength = bestchildren(tn).length
                var opponentchainlength = bestchildren(cbest).length
                var longerness = ownchildchainlength - opponentchainlength
                if(tn.value > 0){//winning
                    return -longerness
                }else{
                    return longerness
                }
            }
            return result
        }else{//min
            var result = tn.value - cbest.value
            if(result == 0){
                var ownchildchainlength = bestchildren(tn).length
                var opponentchainlength = bestchildren(cbest).length
                var longerness = ownchildchainlength - opponentchainlength
                if(tn.value < 0){//winning
                    return -longerness
                }else{
                    return longerness
                }
            }
            return result * -1
        }
    })
    current.bestchild = best
    current.value = best.value
    current.children = children
    return best
}


class TicTacToeState{
    Xturn:boolean = true
    constructor(public board:string[][]){

    }

    c(){
        var arrc = this.board.map(arr => arr.slice())

        var c = new TicTacToeState(arrc)
        c.Xturn = this.Xturn
        return c
    }

    findWinner():string{
        var east = new Vector(1,0)
        var south = new Vector(0,1)
        var checks = [
            [new Vector(0,0),east],
            [new Vector(0,1),east],
            [new Vector(0,2),east],
            [new Vector(0,0),south],
            [new Vector(1,0),south],
            [new Vector(2,0),south],
            [new Vector(0,0),new Vector(1,1)],
            [new Vector(0,2),new Vector(1,-1)],
        ]
        for(var check of checks){
            var res = this.checkLine(check[0],check[1])
            if(res != ''){
                return res
            }
        }
        return ''
    }

    checkLine(start:Vector,direction:Vector):string{
        var current = start.c()
        var contents = []
        for(var i = 0; i < 3; i++){
            contents.push(this.board[current.y][current.x])
            current.add(direction)
        }
        if(contents.findIndex(v => v == '') == -1){
            if(contents[0] == contents[1] && contents[1] == contents[2]){
                return contents[0]
            }
        }
        return ''
    }
}

function bestchildren<T>(root:TreeNode<T>){
    var result = [root]
    var current = root
    while(current.bestchild != null){
        result.push(current.bestchild)
        current = current.bestchild
    }
    return result
}

function bestchildrenstates(root:TreeNode<TicTacToeState>){
    return bestchildren(root).map(tn => tn.state.board)
}