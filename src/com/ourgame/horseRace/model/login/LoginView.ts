/**
 * 登陆
 */
class LoginView extends egret.Sprite implements IBase {
	private static that: LoginView;
	private nameTip: egret.TextField;
	private nameText: egret.TextField;

	public constructor() {
		super();
		LoginView.that = this;

		var sp: egret.Sprite = new egret.Sprite();
		sp.graphics.beginFill(0x111101);
		sp.graphics.drawRect(0, 0, Main.STAGE_WIDTH, Main.STAGE_HEIGHT);
		sp.width = Main.STAGE_WIDTH;
		sp.height = Main.STAGE_HEIGHT;
		sp.graphics.endFill();
		sp.touchEnabled = true;
		this.addChild(sp);

		this.nameTip = new egret.TextField();
		this.nameTip.text = "用户名：";
		this.addChild(this.nameTip);
		this.nameTip.x = 100;
		this.nameTip.y = 200;

		this.nameText = new egret.TextField();
		this.nameText.type = egret.TextFieldType.INPUT;
		this.nameText.x = this.nameTip.x + this.nameTip.width;
		this.nameText.y = this.nameTip.y;
		this.nameText.width = 200;
		this.nameText.text = "#ogtest00" + RandomUtil.randInt(0, 9) + RandomUtil.randInt(0, 9);
		this.nameText.border = true;
		this.nameText.background = true;
		this.nameText.backgroundColor = 0x000000;
		this.addChild(this.nameText);

		var title: egret.TextField = new egret.TextField();
		title.text = "赛马";
		this.addChild(title);
		title.size = 50;
		title.x = this.nameTip.x;
		title.y = this.nameTip.y - 100;

		var tip: egret.TextField = new egret.TextField();
		tip.text = "点击屏幕登陆游戏";
		tip.size = 20;
		tip.x = this.nameTip.x;
		tip.y = this.nameTip.y + 200;
		tip.textColor = 0x010101;
		this.addChild(tip);

		egret.Tween.get(sp).to({ alpha: 0.1 }, 15000)
		sp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
	}

	public enter(data?: any): void {
		GameDispatcher.addEventListener(BaseEvent.LOGIN_RESULT_EVENT, this.onLoginResult, this);
	}

	public exit(): void {
		if (LoginView.that.parent != null) {
			LoginView.that.parent.removeChild(LoginView.that);
		}
		UserModel.instance.userName = this.nameText.text;
	}

	public execute(data?: any): void {
	}

	private onTap(): void {
		UserModel.instance.userName = this.nameText.text;
		ConnectionManager.instance.sendHelper.login();
	}

	/**登陆结果处理 */
	private onLoginResult(): void {
		ClientModel.instance.changeGameState(LoadingUI.instance);
		LoadingUI.instance.loadAssets(() => {
			ClientModel.instance.changeGameState(new HallView());
		}, LoadingUI.assets1);
	}
	
}