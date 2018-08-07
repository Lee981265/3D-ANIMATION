let N = 1 << 0;
let S = 1 << 1;
let W = 1 << 2;
let E = 1 << 3;

self.addEventListener("message", function(event) {
    // console.log(event.data);
    postMessage(generateMaze(event.data.width, event.data.height));
});

function generateMaze(cellWidth, cellHeight) {
    let cells = new Array(cellWidth * cellHeight);
    let frontier = [];
    let startIndex = (cellHeight - 1) * cellWidth;

    cells[startIndex] = 0;
    frontier.push({index: startIndex, direction: N});
    frontier.push({index: startIndex, direction: E});

    let edge;
    let open;
    // console.log(edge);
    while ((edge=popRandom(frontier)) != null) {
        let i0 = edge.index;
        let d0 = edge.direction;
        let i1 =  i0 + (d0 === N ? -cellWidth : d0 === S ? cellWidth : d0 === W ? -1 : +1);
        // console.log(i1);
        let x0 = i0 % cellWidth;
        let y0 = i0 / cellWidth | 0;
        let x1;
        let y1;
        let d1;
        // console.log(cells.length);
        // console.log(cells[i1]);
        if(cells[i1] === null||cells[i1] === undefined){
            open=true;
        }
        // open = cells[i1] === null; // opposite not yet part of the maze

        if (d0 === N){
            x1 = x0;
            y1 = y0 - 1;
            d1 = S;
        }

        else if (d0 === S){
            x1 = x0;
            y1 = y0 + 1;
            d1 = N;
        }
        else if (d0 === W){
            x1 = x0 - 1;
            y1 = y0;
            d1 = E;
        }
        else{
            x1 = x0 + 1;
            y1 = y0;
            d1 = W;
        }

        if (open) {
            cells[i0] |= d0;
            cells[i1] |= d1;
            if (y1 > 0 && cells[i1 - cellWidth] == null) frontier.push({index: i1, direction: N});
            if (y1 < cellHeight - 1 && cells[i1 + cellWidth] == null) frontier.push({index: i1, direction: S});
            if (x1 > 0 && cells[i1 - 1] == null) frontier.push({index: i1, direction: W});
            if (x1 < cellWidth - 1 && cells[i1 + 1] == null) frontier.push({index: i1, direction: E});
        }
    }
    // console.log(cells);
    return cells;
}

function popRandom(array) {
    if (!array.length) return;
    let n = array.length;
    let i = Math.random() * n | 0;
    let t = array[i];
    array[i] = array[n - 1];
    array[n - 1] = t;
    return array.pop();
}