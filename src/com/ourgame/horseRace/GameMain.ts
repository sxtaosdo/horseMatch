/**
 * 程序主界面
 * 游戏界面
 * 大厅界面
 * 其他界面
 * 弹出框管理
 * top条
 */
class GameMain extends egret.Sprite implements IBase {

	private currentState: IBase;
	private previousState: IBase;

	private popup: WindowManager;

	public constructor() {
		super();

		this.popup = WindowManager.instance;

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.enter, this);
		GameDispatcher.addEventListener(GameEvent.ASSETS_COMPLETE_EVENT, this.onAssetsComplete, this);
		GameDispatcher.addEventListener(GameEvent.WINDOW_EVENT, this.onWindow, this);
	}

	public enter(data?: any): void {
		GameDispatcher.addEventListener(GameEvent.GAME_STATE_EVENT, this.onStateChange, this);
		this.setDefoult();
		// var temp: any = new window["lib"].无标题1();
		// this.stage.addChild(temp);
	}

	private onAssetsComplete(): void {

		// if (ConfigModel.instance.showTest) {
        //     var test: TestWindow = new TestWindow();
        //     this.addChild(test);
        //     test.enter(this.parent);
        // }
	}

	/**
	 * 打开窗口
	 */
	private onWindow(): void {
		if (ClientModel.instance.window == null) {
            if (this.contains(this.popup)) {
                this.removeChild(this.popup);
                this.popup.exit();
            }
        } else {
            this.addChild(this.popup);
            this.popup.enter();
        }
	}

	/**
	 * 进入游戏后默认的设置
	 */
	private setDefoult(): void {
		// if (ConfigModel.instance.debug) {
		// 	ClientModel.instance.changeGameState(new LoginView());
		// } else {
		ClientModel.instance.parseParams();
		ClientModel.instance.changeGameState(LoadingUI.instance);
		LoadingUI.instance.loadAssets(() => {
			ClientModel.instance.changeGameState(new GameWorld());
			ConnectionManager.instance.conn();
		}, LoadingUI.assets1);
		// console.log("setDefoult");

		// }
	}

	public exit(): void {

	}

	public execute(data?: any): void {

	}

	private onStateChange(evt: any): void {
		var newState: IBase = ClientModel.instance.gameState;

		this.previousState = this.currentState;
		if (this.previousState != null) {
			this.previousState.exit();
		}
		this.currentState = newState;
		this.currentState.enter();

		this.addChild(<any>this.currentState);
		// if ((newState instanceof LoginView) || (newState instanceof HallView) || (newState instanceof LoadingUI)) {
		// 	if (this.topBar && this.topBar.parent) {
		// 		this.topBar.removeChild(this.topBar);
		// 	}
		// } else {
		// 	this.addChild(this.topBar);
		// 	if (this.topBar) {
		// 		this.topBar.execute(newState);
		// 	}
		// }
	}

}