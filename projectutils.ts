/// <reference path="node_modules/utilsx/utils.ts" />

function findbest<T>(list:T[], evaluator:(v:T) => number):T {
    return list[findbestIndex(list,evaluator)]
}