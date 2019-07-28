/// <reference path="node_modules/utilsx/utils.ts" />

function findbestIndexA<T>(list:T[], evaluator:(c:T,cbest:T) => number):number {
    if (list.length < 1) {
        return -1;
    }
    var bestIndex = 0;
    var best = list[0]
    for (var i = 1; i < list.length; i++) {
        var current = list[i]
        if (evaluator(current,best) > 0) {
            best = current
            bestIndex = i
        }
    }
    return bestIndex
}

function findbestA<T>(list:T[], evaluator:(c:T,cbest:T) => number):T {
    return list[findbestIndexA(list,evaluator)]
}