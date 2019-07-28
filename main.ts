/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="projectutils.ts" />
/// <reference path="minimax.ts" />


var cells = document.querySelectorAll('.cell')
var not = `
    <circle cx="50%" cy="50%" r="50" stroke="black" stroke-width="10" fill="none" />
`
var cross = `
    <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="black" stroke-width="10" />
    <line x1="20%" y1="80%" x2="80%" y2="20%" stroke="black" stroke-width="10" />
`
var empty = ''

cells.forEach((cell,i) => {
    cell.addEventListener('click',e => {
        console.log(i)
    })
})


var xturn = true
var startstate = new TicTacToeState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
])
startstate.Xturn = xturn
var root = new TreeNode(startstate,xturn,0)

function drawTicTacToeState(state:TicTacToeState){
    new Vector(3,3).loop2d(v => {
        var char = state.board[v.y][v.x]
        if(char == 'X'){
            cells[v.y * 3 + v.x].innerHTML = cross
        }else if(char == 'O'){
            cells[v.y * 3 + v.x].innerHTML = not
        }else{
            cells[v.y * 3 + v.x].innerHTML = empty
        }
    })
}

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

drawTicTacToeState(last(bestchildren(result)).state)

// console.log(bestchildrenstates(result))
