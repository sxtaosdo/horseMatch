/**
 * 顶部条
 */
class TopView extends BaseComponent implements IBase {

	public moneyText: eui.Label;
	public addBtn: eui.Button;
	public timerText: eui.Label;
	public typeText: eui.Label;
	public kjBtn: eui.Button;
	public jlBtn: eui.Button;
	public smBtn: eui.Button;
	public soundBtn: eui.ToggleButton;


	private time: number = 0;
	private call: Function;
	private callThis: any;

	public constructor(call: Function, callThis: any) {
		super(false);
		this.call = call;
		this.callThis = callThis;
		this.skinName = "resource/skins/TopViewSkin.exml";
	}

	protected onSkinComplete(e: any): void {
		super.onSkinComplete(e);
		this.moneyText.text = String(UserModel.instance.money);
		this.kjBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onKjTap, this);
		this.jlBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJlTap, this);
		this.smBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSmTap, this);
		this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundTap, this);
	}

	public enter(data?: any): void {
		if (this.skinLoaded) {
			switch (data) {
				case GameState.BET_STAGE:
					this.time = ConfigModel.instance.betTime;
					this.typeText.text = "投注倒计时";
					break;
				case GameState.PREPARE_STAGE:
					this.typeText.text = "比赛倒计时";
					this.time = ConfigModel.instance.resultTime;
					break;
				case GameState.RUN_STAGE:
					this.typeText.text = "";
					this.timerText.text = "";
					return;
				case GameState.RESULT_STAGE:
					this.typeText.text = "距下一场比赛";
					this.time = ConfigModel.instance.nextTime;
					break;
			}
		}
		TimerManager.instance.doLoop(1000, this.execute, this);
	}

	public exit(): void {

	}

	public execute(data?: any): void {
		if (this.time > -1) {
			this.timerText.text = String(this.time);
			this.time--;
		} else {
			TimerManager.instance.clearTimer(this.execute);
			if (this.call) {
				this.call.apply(this.callThis);
			}
		}
	}

	public onKjTap(evt: egret.TouchEvent): void {
		// ClientModel.instance.openWindow();
	}

	public onJlTap(evt: egret.TouchEvent): void {
		// ClientModel.instance.openWindow();

	}

	public onSmTap(evt: egret.TouchEvent): void {
		// ClientModel.instance.openWindow();

	}

	public onSoundTap(evt: egret.TouchEvent): void {
		// ClientModel.instance.openWindow();

	}

}