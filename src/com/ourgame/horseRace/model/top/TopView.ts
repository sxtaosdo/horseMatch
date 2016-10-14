/**
 * 顶部条
 */
class TopView extends BaseComponent implements IBase {

	public moneyText: eui.Label;
	public addBtn: eui.Button;
	public stateGroup: eui.Group;
	public timeBg: eui.Image;
	public timerText: eui.Label;
	public typeText: eui.Label;
	public kjBtn: eui.Button;
	public jlBtn: eui.Button;
	public smBtn: eui.Button;
	public moreBtn: eui.ToggleButton;
	public moreGroup: eui.Group;
	public soundBtn: eui.ToggleButton;
	public ruleBtn: eui.Button;
	public taskBtn: eui.Button;
	public shareBtn: eui.Button;

	private call: Function;
	private callThis: any;
	private isShowTime: boolean = false;

	public constructor() {
		super(false);
		this.skinName = "resource/skins/TopViewSkin.exml";
	}

	protected onSkinComplete(e: any): void {
		super.onSkinComplete(e);
		this.moneyText.text = String(UserModel.instance.money);
		this.kjBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onKjTap, this);
		this.jlBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJlTap, this);
		this.smBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSmTap, this);
		this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleTap, this);
		this.taskBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTaskTap, this);
		this.moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoreTap, this);
		this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddTap, this);
		this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundTap, this);
		this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareTap, this);
	}

	private changeTimerState(key: boolean): void {
		this.isShowTime = key;
		this.stateGroup.visible = key;
		this.timeBg.visible = key;
		if (!key) {
			TimerManager.instance.clearTimer(this.execute);
		}
	}

	private onMoreTap(): void {
		this.moreGroup.visible = this.moreBtn.selected;
	}

	public enter(data?: any): void {
		let client: ClientModel = ClientModel.instance;
		let config: ConfigModel = ConfigModel.instance;;
		if (this.skinLoaded) {
			switch (data) {
				case GameState.BET_STAGE:
					this.typeText.text = "投注倒计时";
					this.changeTimerState(true);
					break;
				case GameState.PREPARE_STAGE:
					this.typeText.text = "比赛倒计时";
					this.changeTimerState(true);
					break;
				case GameState.RUN_STAGE:
					this.typeText.text = "比赛中";
					this.changeTimerState(false);
					break;
				case GameState.RESULT_STAGE:
					this.typeText.text = "距下一场比赛";
					this.changeTimerState(false);
					break;
			}
		}
		this.onMoneyChange();
		GameDispatcher.addEventListener(BaseEvent.USER_MOENY_CHANGE, this.onMoneyChange, this);
	}

	public exit(): void {

	}

	public execute(data?: any): void {
		if (data < 0) {
			this.timerText.text = "";
		} else {
			this.timerText.text = String(data);
		}
	}

	public onKjTap(evt: egret.TouchEvent): void {
		ClientModel.instance.openWindow(HistoryPanel);
	}

	public onJlTap(evt: egret.TouchEvent): void {
		ClientModel.instance.openWindow(OpenationCordPanel);
	}

	public onSmTap(evt: egret.TouchEvent): void {
		ClientModel.instance.openWindow(InfoPanel);

	}

	public onSoundTap(evt: egret.TouchEvent): void {

	}

	public onRuleTap(): void {
		ClientModel.instance.openWindow(HelpPanel);
		this.changeMoreBtn();
	}

	public onTaskTap(): void {
		ClientModel.instance.openWindow(TaskPanel);
		this.changeMoreBtn();
	}

	private changeMoreBtn(key: boolean = false): void {
		this.moreBtn.selected = key;
		this.onMoreTap();
	}

	private onMoneyChange(): void {
		this.moneyText.text = String(UserModel.instance.money);
	}

	private onAddTap(): void {
		InterfaceManager.instance.native.recharge();
	}

	private onShareTap(): void {
		InterfaceManager.instance.native.share();
	}

}