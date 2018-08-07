import Random_Traversal_III from './Random Traversal III.js'
import erosion from './erosion.js'
import pra from './primAlgo.js'
import 'style-loader!css-loader!../D3.css';
import 'style-loader!css-loader!../reset_css.css';

import yh from 'file-loader!../img/yh.jpg';
import cyber1 from 'file-loader!../img/cyber1.jpg';
import cyber2 from 'file-loader!../img/cyber2.jpg';
import cyber3 from 'file-loader!../img/cyber3.jpg';
import task from './task.js';
window.onload = function () {
    // Random_Traversal_III();
    let arr = [];
    arr.push(yh);
    arr.push(cyber1);
    arr.push(cyber2);
    arr.push(cyber3);
    //
    erosion.init(500,500,arr);

    task.run();
};
