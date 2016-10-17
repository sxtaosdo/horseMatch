
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"libs/modules/dragonBones/dragonBones.js",
	"libs/md5/md5.min.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/com/ourgame/horseRace/base/ai/entity/BaseGameEntity.js",
	"bin-debug/com/ourgame/horseRace/base/ai/entity/EntityManager.js",
	"bin-debug/com/ourgame/horseRace/base/ai/entity/MovingEntity.js",
	"bin-debug/com/ourgame/horseRace/base/ai/fsm/HorseEnityState.js",
	"bin-debug/com/ourgame/horseRace/base/ai/fsm/IState.js",
	"bin-debug/com/ourgame/horseRace/base/ai/fsm/StateMachine.js",
	"bin-debug/com/ourgame/horseRace/base/ai/messaging/MessageDispatcher.js",
	"bin-debug/com/ourgame/horseRace/base/ai/messaging/MessageType.js",
	"bin-debug/com/ourgame/horseRace/base/ai/messaging/Telegram.js",
	"bin-debug/com/ourgame/horseRace/base/ai/utils/TreeSet.js",
	"bin-debug/com/ourgame/horseRace/base/ai/v2d/Vector2Ds.js",
	"bin-debug/com/ourgame/horseRace/base/interface/IBase.js",
	"bin-debug/com/ourgame/horseRace/base/interface/IBaseGameEntity.js",
	"bin-debug/com/ourgame/horseRace/base/interface/ICompositor.js",
	"bin-debug/com/ourgame/horseRace/base/interface/IMovingEneity.js",
	"bin-debug/com/ourgame/horseRace/data/ClientModel.js",
	"bin-debug/com/ourgame/horseRace/data/ConfigModel.js",
	"bin-debug/com/ourgame/horseRace/data/def/AnimationType.js",
	"bin-debug/com/ourgame/horseRace/data/def/GameStateDef.js",
	"bin-debug/com/ourgame/horseRace/data/def/StateDef.js",
	"bin-debug/com/ourgame/horseRace/data/LanguageConfig.js",
	"bin-debug/com/ourgame/horseRace/data/RoadMethod.js",
	"bin-debug/com/ourgame/horseRace/data/UserModel.js",
	"bin-debug/com/ourgame/horseRace/data/vo/BetHistoryInfoVo.js",
	"bin-debug/com/ourgame/horseRace/data/vo/BetInfoVo.js",
	"bin-debug/com/ourgame/horseRace/data/vo/BufferVo.js",
	"bin-debug/com/ourgame/horseRace/data/vo/CoinBitmap.js",
	"bin-debug/com/ourgame/horseRace/data/vo/GameInfoVo.js",
	"bin-debug/com/ourgame/horseRace/data/vo/GetVo.js",
	"bin-debug/com/ourgame/horseRace/data/vo/HistoryVo.js",
	"bin-debug/com/ourgame/horseRace/data/vo/HorseVo.js",
	"bin-debug/com/ourgame/horseRace/data/vo/MatchInfoVo.js",
	"bin-debug/com/ourgame/horseRace/data/vo/MatchPlayerVo.js",
	"bin-debug/com/ourgame/horseRace/data/vo/ObstacleVo.js",
	"bin-debug/com/ourgame/horseRace/data/vo/ResultVo.js",
	"bin-debug/com/ourgame/horseRace/data/vo/RoadVo.js",
	"bin-debug/com/ourgame/horseRace/data/vo/StateVo.js",
	"bin-debug/com/ourgame/horseRace/event/BaseEvent.js",
	"bin-debug/com/ourgame/horseRace/event/GameDispatcher.js",
	"bin-debug/com/ourgame/horseRace/event/GameEvent.js",
	"bin-debug/com/ourgame/horseRace/GameMain.js",
	"bin-debug/com/ourgame/horseRace/model/game/BackgroundPanel.js",
	"bin-debug/com/ourgame/horseRace/model/window/BaseComponent.js",
	"bin-debug/com/ourgame/horseRace/model/game/BetView.js",
	"bin-debug/Main.js",
	"bin-debug/com/ourgame/horseRace/model/game/GameWorld.js",
	"bin-debug/com/ourgame/horseRace/model/game/ImageGroup.js",
	"bin-debug/com/ourgame/horseRace/model/game/JpBarPanel.js",
	"bin-debug/com/ourgame/horseRace/model/game/PlayerList.js",
	"bin-debug/com/ourgame/horseRace/model/game/ProgressPanel.js",
	"bin-debug/com/ourgame/horseRace/model/game/RacetrackPanel.js",
	"bin-debug/com/ourgame/horseRace/model/game/ResultView.js",
	"bin-debug/com/ourgame/horseRace/model/hall/HallView.js",
	"bin-debug/com/ourgame/horseRace/model/loading/LoadingUI.js",
	"bin-debug/com/ourgame/horseRace/model/login/LoginView.js",
	"bin-debug/com/ourgame/horseRace/model/renderer/BetHistoryItemRenderer.js",
	"bin-debug/com/ourgame/horseRace/model/renderer/HistoryItemRenderer.js",
	"bin-debug/com/ourgame/horseRace/model/renderer/HorseBetInfoRenderer.js",
	"bin-debug/com/ourgame/horseRace/model/renderer/HorseEntity.js",
	"bin-debug/com/ourgame/horseRace/model/renderer/InfoItemRenderer.js",
	"bin-debug/com/ourgame/horseRace/model/renderer/ResultItemRenderer.js",
	"bin-debug/com/ourgame/horseRace/model/top/TopView.js",
	"bin-debug/com/ourgame/horseRace/model/window/Alert.js",
	"bin-debug/com/ourgame/horseRace/model/window/HelpPanel.js",
	"bin-debug/com/ourgame/horseRace/model/window/HistoryPanel.js",
	"bin-debug/com/ourgame/horseRace/model/window/InfoPanel.js",
	"bin-debug/com/ourgame/horseRace/model/window/IWindow.js",
	"bin-debug/com/ourgame/horseRace/model/window/OpenationCordPanel.js",
	"bin-debug/com/ourgame/horseRace/model/window/OperationPanel.js",
	"bin-debug/com/ourgame/horseRace/model/window/RankPanel.js",
	"bin-debug/com/ourgame/horseRace/model/window/TaskPanel.js",
	"bin-debug/com/ourgame/horseRace/model/window/WindowManager.js",
	"bin-debug/com/ourgame/horseRace/native/AliInterface.js",
	"bin-debug/com/ourgame/horseRace/native/AndroidInterface.js",
	"bin-debug/com/ourgame/horseRace/native/INative.js",
	"bin-debug/com/ourgame/horseRace/native/InterfaceManager.js",
	"bin-debug/com/ourgame/horseRace/native/IosInterface.js",
	"bin-debug/com/ourgame/horseRace/native/IPlatform.js",
	"bin-debug/com/ourgame/horseRace/native/WebInterface.js",
	"bin-debug/com/ourgame/horseRace/native/WxInterface.js",
	"bin-debug/com/ourgame/horseRace/net/ConnectionManager.js",
	"bin-debug/com/ourgame/horseRace/net/handler/HttpHandler.js",
	"bin-debug/com/ourgame/horseRace/net/handler/HttpHandlerLoader..js",
	"bin-debug/com/ourgame/horseRace/net/handler/SocketIoHandler.js",
	"bin-debug/com/ourgame/horseRace/net/handler/WebSocketHandler.js",
	"bin-debug/com/ourgame/horseRace/net/ISocket.js",
	"bin-debug/com/ourgame/horseRace/net/message/BaseMessage.js",
	"bin-debug/com/ourgame/horseRace/net/message/MsgLoginReq.js",
	"bin-debug/com/ourgame/horseRace/net/MsgReceiveHelper.js",
	"bin-debug/com/ourgame/horseRace/net/MsgSendHelper.js",
	"bin-debug/com/ourgame/horseRace/net/MsgType.js",
	"bin-debug/com/ourgame/horseRace/net/service/HttpService.js",
	"bin-debug/com/ourgame/horseRace/net/service/LocalService.js",
	"bin-debug/com/ourgame/horseRace/utils/BitMapUtil.js",
	"bin-debug/com/ourgame/horseRace/utils/ButtonUtils.js",
	"bin-debug/com/ourgame/horseRace/utils/HitTestUtils.js",
	"bin-debug/com/ourgame/horseRace/utils/MatrixUtils.js",
	"bin-debug/com/ourgame/horseRace/utils/PcHelper.js",
	"bin-debug/com/ourgame/horseRace/utils/RandomUtil.js",
	"bin-debug/com/ourgame/horseRace/utils/RollNumber.js",
	"bin-debug/com/ourgame/horseRace/utils/StringUtils.js",
	"bin-debug/com/ourgame/horseRace/utils/TimerManager.js",
	"bin-debug/com/ourgame/horseRace/utils/TimeUtils.js",
	"bin-debug/test/HorseAnamiationDemo.js",
	"bin-debug/test/TestEvent.js",
	"bin-debug/test/TestWindow.js",
	"bin-debug/ThemeAdapter.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "fixedWidth",
		contentWidth: 1270,
		contentHeight: 720,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.3",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};