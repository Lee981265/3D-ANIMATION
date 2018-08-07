import * as d3 from 'd3'
let Connected_Particles = (function () {
    /*
    * 基础数据定义
    * */
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
    const radius = 2.5;
    const minDistance = 80;
    const maxDistance = 100;
    const minDistance2 = minDistance * minDistance;
    const maxDistance2 = maxDistance * maxDistance;
    const eAngle = 2 * Math.PI;
    const particles_num = 50;
    const particles = new Array(particles_num);

    /*初始化特效显示区域大小*/
    let init = function (width,heihgt) {
        canvas.width = width;
        canvas.height = heihgt;
    };

    /*
    * w:特效显示区域宽度
    * h:特效显示区域高度
    * */
    let run = function (w,h) {
        init(w,h);
        const width = canvas.width;
        const height = canvas.height;
        for (let i=0;i<particles_num;++i) {
            /*
            * x:初始x坐标
            * y0::初始y坐标
            * v:方向
            * */
            particles[i] = {
                x: width * Math.random(),
                y0: height * Math.random(),
                v: 0.1 * (Math.random() - 0.5)
            };
        }

        d3.timer(function(elapsed) {
            context.clearRect(0, 0, width, height);

            context.lineWidth = 1;
            context.strokeStyle = "#080d60";
            /*
            * 计算每个点是否在绘制圆环的最小范围内
            * */
            for (let i=0;i<particles_num;++i) {
                let pi = particles[i];
                for (let j=i+1;j<particles_num;++j) {
                    let pj = particles[j];
                    let dx = pi.x - pj.x;
                    let dy = pi.y - pj.y;
                    let d2 = dx * dx + dy * dy;
                    if (d2 < maxDistance2) {
                        context.globalAlpha = d2>minDistance2 ? (maxDistance2-d2)/(maxDistance2-minDistance2) : 1;
                        context.beginPath();
                        context.arc((pi.x+pj.x)/2,(pi.y+pj.y)/2,Math.sqrt(d2)/2,0,eAngle);
                        context.stroke();
                    }
                }
            }
            context.globalAlpha = 1;
            for (let i=0;i<particles_num;++i) {
                let p = particles[i];
                p.y = p.y0 + elapsed * p.v;
                if (p.y > height + maxDistance){
                    p.x = width * Math.random();
                    p.y0 -= height + 2 * maxDistance;
                }
                else if (p.y<-maxDistance){
                    p.x = width * Math.random();
                    p.y0 += height + 2 * maxDistance;
                }
                context.beginPath();
                context.fillStyle = '#4246ff';
                context.arc(p.x,p.y,radius,0,eAngle);
                context.fill();
            }
        });
    };

    return {
        run:run
    }
}());

export default Connected_Particles;