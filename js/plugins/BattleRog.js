var PushLogManager = {
    logs: [],
    maxLogs: 6,

    add(text){
        this.logs.unshift({text:text, life:180});

        if(this.logs.length > this.maxLogs){
            this.logs.pop();
        }
    },

    update(){
        for(let log of this.logs){
            log.life--;
        }

        this.logs = this.logs.filter(l => l.life > 0);
    }
};

function Window_PushLog(){
    this.initialize(...arguments);
}

Window_PushLog.prototype = Object.create(Window_Base.prototype);

Window_PushLog.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, 0,0,400,200);
    this.x = Graphics.width - this.width;
    this.y = Graphics.height - this.height;
};



Window_PushLog.prototype.update = function(){
    Window_Base.prototype.update.call(this);

    PushLogManager.update();
    this.refresh();
};

Window_PushLog.prototype.refresh = function(){
    this.contents.clear();

    for(let i=0;i<PushLogManager.logs.length;i++){

        let log = PushLogManager.logs[i];

        let opacity = log.life / 180;

        this.contents.paintOpacity = 255 * opacity;

        this.drawText(log.text,0,i*24,360);
    }

    this.contents.paintOpacity = 255;
};

const _SceneMap_createDisplayObjects =
Scene_Map.prototype.createDisplayObjects;

Scene_Map.prototype.createDisplayObjects = function(){

    _SceneMap_createDisplayObjects.call(this);

    this._pushLogWindow = new Window_PushLog();
    this.addChild(this._pushLogWindow);
};