(function() {

// ==============================
// ■ メニューウィンドウ
// ==============================
function Window_RogueMenu() {
    this.initialize.apply(this, arguments);
}

Window_RogueMenu.prototype = Object.create(Window_Command.prototype);
Window_RogueMenu.prototype.constructor = Window_RogueMenu;

Window_RogueMenu.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 200, 100);
    this.openness = 0;
};

Window_RogueMenu.prototype.makeCommandList = function() {
    this.addCommand("アイテム", "アイテム");
    this.addCommand("閉じる", "cancel");
};

// ==============================
// ■ マップへ追加
// ==============================
var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    _Scene_Map_createAllWindows.call(this);

    this._rogueMenu = new Window_RogueMenu();
    this.addWindow(this._rogueMenu);
};

// ==============================
// ■ メニュー開閉処理
// ==============================
var _Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);

    this._rogueInfo = new Window_RogueInfo();
    this.addWindow(this._rogueInfo);
    if (Input.isTriggered("cancel")) {
        if (this._rogueMenu.isOpen()) {
            this.closeRogueMenu();
        } else {
            this.openRogueMenu();
        }
    }
};

Scene_Map.prototype.openRogueMenu = function() {
    this._rogueMenu.open();
    this._rogueMenu.activate();
};

Scene_Map.prototype.closeRogueMenu = function() {
    this._rogueMenu.close();
    this._rogueMenu.deactivate();
};

// ==============================
// ■ 主人公のみ停止（重要）
// ==============================
var _Game_Player_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function() {
    var scene = SceneManager._scene;

    if (scene instanceof Scene_Map &&
        scene._rogueMenu &&
        scene._rogueMenu.isOpen()) {
        return; // 主人公のみ停止
    }

    _Game_Player_moveByInput.call(this);
};
Scene_Map.prototype.isMenuCalled = function() {
    return false;
};
})();

// ==============================
// ■ 情報ウィンドウ
// ==============================
function Window_RogueInfo() {
    this.initialize.apply(this, arguments);
}

Window_RogueInfo.prototype = Object.create(Window_Base.prototype);
Window_RogueInfo.prototype.constructor = Window_RogueInfo;

Window_RogueInfo.prototype.initialize = function() {
    var x = 0;         // メニューの下あたり
    var y = 500;
    var width = 815;
    var height = 120;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._text = "";
};

Window_RogueInfo.prototype.setText = function(text) {
    if (this._text !== text) {
        this._text = text;
        this.refresh();
    }
};

Window_RogueInfo.prototype.refresh = function() {
    this.contents.clear();
    this.drawTextEx(this._text, 0, 0);
};

