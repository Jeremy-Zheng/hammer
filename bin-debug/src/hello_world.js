var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Administrator on 2014/8/22.
*/
var Hello_world = (function (_super) {
    __extends(Hello_world, _super);
    function Hello_world() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    //一切就绪之后就开始运行这个函数
    Hello_world.prototype.onAddToStage = function (event) {
        //初始化加载时的文字
        this.init_laod_text();

        //配置加载文件
        RES.loadConfig("resource/resource.json", "resource/");

        //监听资源加载过程中出发的事件
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);

        //监听资源加载完后触发事件
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);

        //开始加载资源
        RES.loadGroup("preload");
    };

    //资源加载过程中执行的函数
    Hello_world.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.load_text.text = "游戏加载中..." + event.itemsLoaded + "/" + event.itemsTotal;
        }
    };

    //资源加载完成后执行的函数
    Hello_world.prototype.onGroupComp = function () {
        //移除加载文本......
        this.removeChildAt(0);
        this.load_text = null;

        //开始游戏
        this.game_start();
    };

    //初始化加载文字
    Hello_world.prototype.init_laod_text = function () {
        this.load_text = new egret.TextField();
        this.addChild(this.load_text);
        this.load_text.y = 300;
        this.load_text.width = 480;
        this.load_text.height = 100;
        this.load_text.textColor = "#000000";
        this.load_text.textAlign = "center";
    };

    //初始化person动画对象
    Hello_world.prototype.init_person_animation = function () {
        var data = RES.getRes("person_json");
        var texture = RES.getRes("person_png");
        this.person = new egret.MovieClip(data, texture); //创建MovieClip

        this.addChild(this.person); //添加到显示列表，显示影片剪辑
        this.person.frameRate = 10; //设置动画的帧频
        this.person.x = 40;
        this.person.y = 150;
        this.person.gotoAndPlay("stand_0"); //跳转到指定帧并开始播放

        this.person.touchEnabled = true;
    };

    //初始化time_text文本对象
    Hello_world.prototype.init_time_text = function () {
        this.time_text = new egret.TextField();
        this.addChild(this.time_text);
        this.time_text.x = 10;
        this.time_text.y = 10;
        this.time_text.textColor = "#000000";
        this.time_text.text = "剩余殴打时间：10";
    };

    //初始化time_text文本对象
    Hello_world.prototype.init_hammer_text = function () {
        this.hammer_text = new egret.TextField();
        this.addChild(this.hammer_text);
        this.hammer_text.x = 10;
        this.hammer_text.y = 50;
        this.hammer_text.textColor = "#000000";
        this.hammer_text.text = "捶锤子的次数：0";
    };

    //初始化hammer动画对象
    Hello_world.prototype.init_hammer_animation = function () {
        var data = RES.getRes("hammer_json");
        var texture = RES.getRes("hammer_png");
        this.hammer = new egret.MovieClip(data, texture); //创建MovieClip
        this.hammer.x = 0;
        this.hammer.y = 0;
        this.addChild(this.hammer); //添加到显示列表，显示影片剪辑
        this.hammer.frameRate = 24; //设置动画的帧频

        this.hammer._scaleX = 2;
        this.hammer._scaleY = 2;

        this.hammer.x = 220;
        this.hammer.y = 0;

        this.hammer.gotoAndStop("hammer"); //跳转到指定帧并开始播放

        var hammer_temp = this.hammer;
        this.hammer.addEventListener("hammer_end", function () {
            hammer_temp.stop();
        }, this);
    };

    //初始化timer计时器
    Hello_world.prototype.init_timer = function () {
        //创建一个计时器对象
        this.timer = new egret.Timer(1000, 13);

        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);

        //开始计时
        this.timer.start();
    };

    //当person动画被点击后显示的动画
    Hello_world.prototype.onTouch = function (event) {
        this.hammer_account++;
        this.hammer_text.text = "捶锤子的次数：" + this.hammer_account;
        this.hammer.x = event._stageX - 55;
        this.hammer.y = event._stageY - 170;
        this.hammer.gotoAndPlay("hammer");

        //被打后的运行的动画
        if (this.hammer_account > 40) {
            if (this.hammer_account % 2 == 0) {
                this.person.gotoAndStop("swell_0");
            } else {
                this.person.gotoAndStop("swell_1");
            }
        } else if (this.hammer_account > 20 && this.hammer_account <= 40) {
            if (this.hammer_account % 2 == 0) {
                this.person.gotoAndStop("cry_1");
            } else {
                this.person.gotoAndStop("cry_0");
            }
        } else {
            if (this.hammer_account % 2 == 0) {
                this.person.gotoAndStop("stand_1");
            } else {
                this.person.gotoAndStop("stand_0");
            }
        }
    };

    //timer 每次间隔出发的函数
    Hello_world.prototype.timerFunc = function () {
        if (this.timer._currentCount == 1) {
            alert("抡起大锤锤捶小锤锤\n记住秘诀：大力！快速！");
            this.person.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        } else if (this.timer._currentCount == this.timer.repeatCount) {
        } else {
            this.time_text.text = "剩余殴打时间：" + this.time;
            this.time--;
        }
    };

    //timer结束时执行的函数
    Hello_world.prototype.timerComFunc = function () {
        //修改title
        document.title = "小锤锤被我的大锤锤捶了" + this.hammer_account + "锤，" + "快来用你的大锤锤捶小锤锤，记住秘诀：大力！快速！！";

        //修改显示被锤的次数
        document.getElementById("hit_account").innerHTML = this.hammer_account;

        //显示遮挡层
        document.getElementById("shelter").style.display = "block";

        //点击重来一盘
        var instance = this;
        document.getElementById("start_btn").onclick = function () {
            instance.game_start();
        };
    };

    //开始游戏的函数
    Hello_world.prototype.game_start = function () {
        //隐藏遮挡层
        document.getElementById("shelter").style.display = "none";

        this.time = 10;

        this.hammer_account = 0;

        this.removeChildren();

        this.init_timer();

        this.init_time_text();

        this.init_hammer_text();

        this.init_person_animation();

        this.init_hammer_animation();
    };
    return Hello_world;
})(egret.DisplayObjectContainer);
Hello_world.prototype.__class__ = "Hello_world";
