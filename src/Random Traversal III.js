import Random_Traversal_III_worker from 'file-loader!./Random Traversal III-worker.js'
import  * as d3  from 'd3';

let Random_Traversal_III = function () {
    let canvas = d3.select("canvas");
    let context = canvas.node().getContext("2d");
    let width = canvas.property("width");
    let height = canvas.property("height");
    // console.log(canvas.property);
    let worker = new Worker(Random_Traversal_III_worker);
    worker.postMessage({width: width, height: height});
    worker.addEventListener("message", function(event) {
        worker.terminate();
        let N = 1 << 0;
        let S = 1 << 1;
        let W = 1 << 2;
        let E = 1 << 3;

        let cells = event.data;
        let distance = 0;
        let visited = new Array(width * height);
        let frontier = [(height - 1) * width];
        let image = context.createImageData(width, height);

        function flood() {
            let frontier1 = [];
            let i0;
            let n0 = frontier.length;
            let i1;
            let color = d3.hsl((distance += .5) % 360, 1, .5).rgb();
            for (let i = 0; i < n0; ++i) {
                // console.log(i < n0);
                i0 = frontier[i] << 2;
                image.data[i0 + 0] = color.r;
                image.data[i0 + 1] = color.g;
                image.data[i0 + 2] = color.b;
                image.data[i0 + 3] = 255;
            }

            for (let i = 0; i < n0; ++i) {
                // console.log(i0);
                // console.log(cells);
                i0 = frontier[i];
                if (cells[i0] & E && !visited[i1 = i0 + 1]){
                    // console.log('E');
                    visited[i1] = true;
                    frontier1.push(i1);
                }
                if (cells[i0] & W && !visited[i1 = i0 - 1]){
                    // console.log('W');
                    visited[i1] = true;
                    frontier1.push(i1);
                }
                if (cells[i0] & S && !visited[i1 = i0 + width]){
                    // console.log('S');
                    visited[i1] = true;
                    frontier1.push(i1);
                }
                if (cells[i0] & N && !visited[i1 = i0 - width]){
                    // console.log('N');
                    visited[i1] = true;
                    frontier1.push(i1);
                }
                // console.log(frontier1.length);
            }

            frontier = frontier1;
            // console.log(frontier.length);
            return !frontier1.length;
        }
        // console.log(flood());
        d3.timer(function() {
            let done = flood();
            // for(let i = 0; i < 1 && !(done = flood()); ++i){}
            context.putImageData(image, 0, 0);
            return done;
        });
    });
};

export default Random_Traversal_III;