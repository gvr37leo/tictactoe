/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="projectutils.ts" />
class TreeNode<T>{
    parent:TreeNode<T>
    bestchild:TreeNode<T>
    children:TreeNode<T>[]
    constructor(public state:T,public isMax:boolean,public value:number,){

    }
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
    var best = findbest(children,tn => current.isMax ? tn.value : -tn.value)//should also consider win in fewest moves
    current.bestchild = best
    current.value = best.value
    current.children = children
    return best
}

var startstate = new TicTacToeState([
    ["X", "X", ""],
    ["O", "", ""],
    ["O", "", ""],
])

var root = new TreeNode(startstate,true,0)

var result = minimax<TicTacToeState>(9,root, state => {
    var res:TicTacToeState[] = []
    
    new Vector(3,3).loop2d(v => {
        if(state.board[v.y][v.x] == ''){
            var copy = state.c()
            copy.board[v.y][v.x] = copy.Xturn ? 'X' : 'O'
            copy.Xturn = !state.Xturn
            res.push(copy)
        }
    })
    
    return res
}, state => {
    var winner = state.findWinner()
    if(winner == 'X'){
        return 1
    }else if(winner == 'O'){
        return -1
    }else{
        return 0
    }
})

function bestchildren<T>(root:TreeNode<T>){
    var result = [root]
    var current = root
    while(current.bestchild != null){
        result.push(current.bestchild)
        current = current.bestchild
    }
    return result
}

console.log(result)
