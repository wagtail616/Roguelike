(function() {

function Window_RogueHUD() {
    this.initialize.apply(this, arguments);
}

Window_RogueHUD.prototype = Object.create(Window_Base.prototype);
Window_RogueHUD.prototype.constructor = Window_RogueHUD;

Window_RogueHUD.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, 815, 400);
    this.refresh();
};

Window_RogueHUD.prototype.refresh = function() {
    this.contents.clear();
    var x = 240;
    var y = 40;
    var width = 200;
    var height = 16;
    var actor = $gameParty.leader();
    if (!actor) return;
    this.opacity = 0;      // ウィンドウ全体
    this.backOpacity = 0;  // 背景だけ
    this.drawText(actor.hp + "F", 0, 0, 280);
    this.drawText("LV: " + actor.level, 100, 0, 280);
    this.drawText("HP: " + $gameVariables.value(23) + "/" + actor.mhp, 275, 0, 280);
    this.drawText("満腹度: " + $gameVariables.value(23) + "%", 600, 0, 280);

    // 外枠（白）
    this.contents.fillRect(x - 2, y - 2, width + 4, height + 4, "#ffffff");

    // 最大HPベース（赤）
    this.contents.fillRect(x, y, width, height, "#aa0000");

    // 現在HP割合
    var rate = $gameVariables.value(23) / actor.mhp;
    var hpWidth = Math.floor(width * rate);

    // 現在HP（緑）
    if($gameVariables.value(23)>0){
    this.contents.fillRect(x, y, hpWidth, height, "#00cc33");
    }
};

var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    _Scene_Map_createAllWindows.call(this);
    this._rogueHUD = new Window_RogueHUD();
    this.addWindow(this._rogueHUD);
};

Window_RogueHUD.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.refresh();
};

})();