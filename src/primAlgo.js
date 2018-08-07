let prim = function () {

};

export default prim;

/*
* 示例代码
* */
// var width = 960,
//     height = 960;
//
// var N = 1 << 0,
//     S = 1 << 1,
//     W = 1 << 2,
//     E = 1 << 3;
//
// var cellSize = 4,
//     cellSpacing = 4,
/*每一个方块都是4像素*/
//     cellWidth = Math.floor((width - cellSpacing) / (cellSize + cellSpacing)),
//     cellHeight = Math.floor((height - cellSpacing) / (cellSize + cellSpacing)),
//     cells = new Array(cellWidth * cellHeight), // each cell’s edge bits
//     frontier = [];
//
// var canvas = d3.select("body").append("canvas")
//     .attr("width", width)
//     .attr("height", height);
//
// var context = canvas.node().getContext("2d");
//
// context.translate(
/*cellWidth * cellSize为能放置cellSize的个数,设为(1)*/
/*width-(1)为放置cellSize后剩余的宽度,设为(2)*/
/*(cellWidth + 1) * cellSpacing为能放置的cellSpacing个数加一,设为(3)*/
/*(2)-(3)为放置cellSize和cellSpacing后的剩余宽度*/
/*设 cellWidth * cellSize与 cellWidth * cellSpacing都为x*/
/*那么,实际上cellSize和cellSpacing都为4,所以实际该公式为(width-2*x-cellSpacing)/2*/
/*((width-cellSpacing)/2)-x===(width-cellSpacing)/2-cellWidth*cellSize*/
/*最终计算的就是内容显示宽度的一半减去cellSize总共占据的宽度*/
//     Math.round((width - cellWidth * cellSize - (cellWidth + 1) * cellSpacing) / 2),
//     Math.round((height - cellHeight * cellSize - (cellHeight + 1) * cellSpacing) / 2)
// );
//
// context.fillStyle = "white";
//
// // Add a random cell and two initial edges.
// var start = (cellHeight - 1) * cellWidth;
// cells[start] = 0;
// fillCell(start);
// frontier.push({index: start, direction: N});
// frontier.push({index: start, direction: E});
//
// // Explore the frontier until the tree spans the graph.
// d3.timer(function() {
//     var done, k = 0;
/*一次只搜索50个节点*/
//     while (++k < 50 && !(done = exploreFrontier()));
//     return done;
// });
//
// function exploreFrontier() {
/*返回一个随机节点,如果返回null则不执行探索操作*/
//     if ((edge = popRandom(frontier)) == null) return true;
//
/*这里利用的是es5的变量提前,实际上所有声明的变量都被提升了到函数开头*/
/*所以edge才具有index和direction属性*/
//     var edge,
//         i0 = edge.index,
//         d0 = edge.direction,
/* -cellWidth是往上减一层, cellWidth是往下加一层,-1和+1则是左右移动*/
//         i1 = i0 + (d0 === N ? -cellWidth : d0 === S ? cellWidth : d0 === W ? -1 : +1),
//         x0 = i0 % cellWidth,
//         y0 = i0 / cellWidth | 0,
//         x1,
//         y1,
//         d1,
//         open = cells[i1] == null; // opposite not yet part of the maze
//
//     context.fillStyle = open ? "white" : "black";
//     if (d0 === N) fillSouth(i1), x1 = x0, y1 = y0 - 1, d1 = S;
//     else if (d0 === S) fillSouth(i0), x1 = x0, y1 = y0 + 1, d1 = N;
//     else if (d0 === W) fillEast(i1), x1 = x0 - 1, y1 = y0, d1 = E;
//     else fillEast(i0), x1 = x0 + 1, y1 = y0, d1 = W;
//
//     if (open) {
//         fillCell(i1);
//         cells[i0] |= d0, cells[i1] |= d1;
//         context.fillStyle = "magenta";
//         if (y1 > 0 && cells[i1 - cellWidth] == null) fillSouth(i1 - cellWidth), frontier.push({index: i1, direction: N});
//         if (y1 < cellHeight - 1 && cells[i1 + cellWidth] == null) fillSouth(i1), frontier.push({index: i1, direction: S});
//         if (x1 > 0 && cells[i1 - 1] == null) fillEast(i1 - 1), frontier.push({index: i1, direction: W});
//         if (x1 < cellWidth - 1 && cells[i1 + 1] == null) fillEast(i1), frontier.push({index: i1, direction: E});
//     }
// }
//
// function fillCell(index) {
//     var i = index % cellWidth, j = index / cellWidth | 0;
//     context.fillRect(i * cellSize + (i + 1) * cellSpacing, j * cellSize + (j + 1) * cellSpacing, cellSize, cellSize);
// }
//
// function fillEast(index) {
//     var i = index % cellWidth, j = index / cellWidth | 0;
//     context.fillRect((i + 1) * (cellSize + cellSpacing), j * cellSize + (j + 1) * cellSpacing, cellSpacing, cellSize);
// }
//
// function fillSouth(index) {
/*i确定列数,j确定行数*/
//     var i = index % cellWidth, j = index / cellWidth | 0;
//     context.fillRect(i * cellSize + (i + 1) * cellSpacing, (j + 1) * (cellSize + cellSpacing), cellSize, cellSpacing);
// }
//
/*
* popRandom函数用于随机选择并返回该数组中的元素
* */
// function popRandom(array) {
//     if (!array.length) return;
/* Math.random() * n | 0,该位运算可以丢弃小数*/
//     var n = array.length, i = Math.random() * n | 0, t;
//     t = array[i], array[i] = array[n - 1], array[n - 1] = t;
//     return array.pop();
// }
//
// d3.select(self.frameElement).style("height", height + "px");