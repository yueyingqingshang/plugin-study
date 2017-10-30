;(function(win) {
    var precision = 100;
    var hearts = [];
    function Heart(dom,x,y) {
        var self = this;
        var canvas = document.getElementById(dom);
        var ctx = canvas.getContext('2d');
        var winW = win.innerWidth;
        var winH = win.innerHeight;
        canvas.width = winW;
        canvas.height = winH;
        ctx.strokeStyle = "red";
        ctx.shadowBlur = 25;
        ctx.shadowColor = "hsla(0, 100%, 60%,0.5)";
        var mouseMoved = false;
        this.canvas = canvas;
        this.ctx = ctx;
        this.winW = winW;
        this.winH = winH;
        this.mouseMoved = mouseMoved;
        this.dom = dom;

        this.x = x || Math.random() * this.winW;
        this.y = y || Math.random() * this.winH;
        this.size = Math.random()*2 + 1;
        this.shadowBlur = Math.random() * 10;
        this.speedX = (Math.random()+0.2-0.6) * 8;
        this.speedY = (Math.random()+0.2-0.6) * 8;
        this.speedSize = Math.random()*0.05 + 0.01;
        this.opacity = 1;
        this.vertices = [];
        for (var i = 0; i < precision; i++) {
            var step = (i / precision - 0.5) * (Math.PI * 2);
            var vector = {
                x : (15 * Math.pow(Math.sin(step), 3)),
                y : -(13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step))
            };
            this.vertices.push(vector);
        };
    };

    Heart.prototype = {};
    //加载canvas各种属性
    Heart.prototype.loadAttr = function (x,y) {

    };
    Heart.prototype.init = function() {

        //描绘桃心
        win.requestAnimationFrame(()=>{
            this.render();
        });
        //监听浏览器窗口变化
        win.addEventListener('resize',()=> {
            this.onResize();
        });
        //监听鼠标移动事件
        win.addEventListener('mousemove',()=>{
            this.onMove(event);
        });
    };


    //获取浏览器可视区域高度
    Heart.prototype.onResize = function() {
        this.winW = this.canvas.width = win.innerWidth;
        this.winH = this.canvas.height = win.innerHeight;
    };
    //渲染
    Heart.prototype.render = function() {
        //requestAnimationFrame(render);
        // setTimeout(()=> {
        //     this.render();
        // },50);
        win.requestAnimationFrame(()=>{
            this.render();
        });
        hearts.push(new Heart(this.dom));
        this.ctx.clearRect(0,0,this.winW,this.winH);
        for (var i = 0; i < hearts.length; i++) {
            hearts[i].draw();
            if(hearts[i].size <= 0){
                hearts.splice(i,1);
                i--;
            };
        };
    };

    //画出爱心
    Heart.prototype.draw = function() {
        this.size -= this.speedSize;
        this.x += this.speedX;
        this.y += this.speedY;
        this.ctx.save();
        this.ctx.translate(-1000,this.y);
        this.ctx.scale(this.size, this.size);
        this.ctx.beginPath();
        for (var i = 0; i < precision; i++) {
          var vector = this.vertices[i];
          this.ctx.lineTo(vector.x, vector.y);
        }
        this.ctx.globalAlpha = this.size;
        this.ctx.shadowBlur = Math.round((3 - this.size) * 10);
        this.ctx.shadowColor = "hsla(0, 100%, 60%,0.5)";
        this.ctx.shadowOffsetX = this.x + 1000;
        this.ctx.globalCompositeOperation = "screen"
        this.ctx.closePath();
        this.ctx.fill()
        this.ctx.restore();
    };
    //鼠标移动
    Heart.prototype.onMove = function(e) {
        hearts.push(new Heart(this.dom,e.clientX,e.clientY));
    };
    win.Heart = Heart;
})(window);
