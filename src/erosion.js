import * as d3 from 'd3';


/*
* 代码的整体是思想:
    * 初始化一个随机位置,然后从该随机位置的东南西北四个方向分别检测是否在图片范围内
    * 如果在范围内就压入exploreArr队列,否则就false,压入exploreArr队列的位置也会进行上面的操作
    * fill函数负责填充若干个exploreArr队列中的点,被填充点会被pop出exploreArr队列,整个代码就这么循环运行
    * 多个图片的填充,首先随机选一张图片再随机选一个点,等当前图片填充完后,在填充下一张
* */
let erosion = (function () {
    let fill_timer = null;
    let width = 300;
    let height = 300;
    let imgArr = [];
    let currentPhotoIndex = null;
    let nextPhotoIndex = null;
    let exploreImg = null;
    //exploreArr存储待探索的索引
    let exploreArr = [];
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    let init = function (w,h,imgSrcArr) {
        width = w!==undefined?w:width;
        height = h!==undefined?h:height;
        canvas.width = width;
        canvas.height = height;
        loadImg(imgSrcArr);
    };

    let loadImg = function (imgSrcArr) {
        let waitLoad = [];
        try{
            waitLoad = imgSrcArr;
        }catch(err){
            console.log(err);
            console.log('需要设置被载入的图片.');
        }

        for(let i=0;i<waitLoad.length;i++){
            waitLoad[i] = setImg(waitLoad[i]);
        }
        let loadImgTimer = d3.timer(function () {
            for(let i=0;i<waitLoad.length;i++){
                if(waitLoad[i].complete){
                    let img = waitLoad[i];
                    let position_colorArr = getPositionColorData(img);
                    imgArr[i]={
                        img:waitLoad[i],
                        position_colorArr: position_colorArr
                    };
                }
            }
            if(imgArr.length===waitLoad.length){
                loadImgTimer.stop();
                initCanvas();
                run();
                return true;
            }
        })
    };

    let setImg = function (src) {
        let img= new Image();
        img.src =src;
        img.width = width;
        img.height = height;
        return img;
    };

    let initCanvas = function () {
        /*把canvas弄成特定颜色,默认灰色*/
        for(let y=0;y<height;y++){
            for(let x=0;x<width;x++){
                context.fillStyle="#868686";
                context.fillRect(x,y,1,1);
            }
        }
    };

    let getPositionColorData = function (img) {
        /*
        * 返回一个包含图片所有颜色的数组,每个数组元素都是对象
        * */
        context.drawImage(img,0,0,width,height);
        let positionColorArr = [];
        for(let y=0;y<height;y++){
            for(let x=0;x<width;x++){
                let color = context.getImageData(x, y,10,10).data;
                positionColorArr.push({
                    x:x,
                    y:y,
                    R:color[0],
                    G:color[1],
                    B:color[2],
                    A:color[3],
                    visited:false,
                    knew:false
                });
            }
        }
        return positionColorArr;
    };

    let run = function () {
        randomExploreArr();
        fill_timer = d3.timer(fill);
    };

    let randomExploreArr = function () {
        /*
        * 初始化一个随机图片和该图片的一个随机的点作为起始点
        * */
        currentPhotoIndex = Math.random()*imgArr.length|0;
        exploreImg = imgArr[0];
        let index= Math.random()*exploreImg.position_colorArr.length|0;
        exploreArr.push({index:index});
    };

    let fill = function () {
        /*该函数是给d3.timer使用的*/
        /*最多运行50次,最少是yh_colorArr的长度*/
        let maxNum = (width*height)/500;
        let explore = null;
        while(--maxNum>=0&&exploreArr.length!==0){
            explore = randomPop(exploreArr);
            let index = explore.index;
            let x = exploreImg.position_colorArr[index].x;
            let y = exploreImg.position_colorArr[index].y;
            exploreImg.position_colorArr[index].visited = true;
            let R = exploreImg.position_colorArr[index].R;
            let G = exploreImg.position_colorArr[index].G;
            let B = exploreImg.position_colorArr[index].B;
            context.fillStyle="rgb("+R+','+G+','+B+")";
            context.fillRect(x,y,1,1);
            find_init(exploreImg,explore);
        }
        if(exploreArr.length===0){
            switchPhoto();
        }
    };

    let switchPhoto = function () {
        resetImgData(imgArr[currentPhotoIndex]);
        while((nextPhotoIndex = Math.random()*imgArr.length|0)===currentPhotoIndex){}
        currentPhotoIndex = nextPhotoIndex;
        exploreImg = imgArr[currentPhotoIndex];
        let index = Math.random()*exploreImg.position_colorArr.length|0;
        exploreArr.push({index:index});
        return exploreArr;
    };

    let resetImgData = function (exploreImg) {
        /*重置图片中的visited和knew数据为false*/
        let position_colorArr = exploreImg.position_colorArr;
        for(let i=0;i<position_colorArr.length;i++){
            position_colorArr[i].visited = false;
            position_colorArr[i].knew = false;
        }
    };

    let randomPop = function (exploreArr) {
        /*从探测队列中随机选一个点进行探测,约束条件是不大于队列长度*/
        /*该函数同时还负责弹出已经绘制过的点*/
        let index = (Math.random()*exploreArr.length)|0;
        let temp = exploreArr[index];
        exploreArr.length===1?exploreArr.pop():exploreArr[index] = exploreArr.pop();
        return temp;
    };

    let find_init = function (exploreImg,explore) {
        let index = explore.index;
        let E = (index+1)%width===0?false:(index+1)<(width*height)?(index+1):false;
        let S = (index+width)<(width*height)?index+width:false;
        let W = (index-1)<0?false:index%width!==0?(index-1):false;
        let N = (index-width)>0?(index-width):false;
        find_catch(exploreImg,E,'E');
        find_catch(exploreImg,S,'S');
        find_catch(exploreImg,W,'W');
        find_catch(exploreImg,N,'N');

    };

    let find_catch = function (exploreImg,dir,str) {
        /*
        * 从visited为true(已知点)的点查找knew为false的点,通过visited检测是否已经被访问
        * index为已知点,已知点的knew会被赋值为true,visited是已经被绘制的点
        * */
        let position_colorArr = exploreImg.position_colorArr;
        str = str===undefined?' ':str;
        try{
            if(dir&&position_colorArr[dir].visited===false&&position_colorArr[dir].knew===false){
                position_colorArr[dir].knew = true;
                exploreArr.push({
                    index:dir
                })
            }
        }catch(err){
            console.log(err+str+dir);
        }
    };

    return {
        init:init
    }
})();

export default erosion;