/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />

class TicTacToeState{
    Xturn:boolean = true
    constructor(public board:string[][]){

    }

    c(){
        var c = new TicTacToeState([[]])
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

var startstate = new TicTacToeState([
    ['','',''],
    ['','',''],
    ['','',''],
])

minimax<TicTacToeState>(3,true,startstate, state => {
    var res:TicTacToeState[] = []
    
    new Vector(3,3).loop2d(v => {
        var copy = state.c()
        if(state.board[v.y][v.x] == ''){
            state.board[v.y][v.x] = state.Xturn ? 'X' : 'O'
        }
        copy.Xturn = !state.Xturn
        res.push(copy)
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


function minimax<T>(depth,isMax:boolean,state:T, nextStateGenerator:(state:T) => T[], stateEvaluator:(state:T) => number):TreeNode{
    if(depth == 0 || gameover){

        return new TreeNode(state,isMax,stateEvaluator(state))
    }
    var nextstates = nextStateGenerator(state)

    if(isMax){

    }else{

    }
    for(var state of nextstates){
        
    }
    return 0
}

class TreeNode<T>{
    constructor(public state:T,public max:boolean,public value:number,){

    }
}

