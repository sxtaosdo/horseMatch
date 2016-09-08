/**
 * 马
 */
class HorseEntity extends BaseMovingEntity implements IMovingEneity {

	private _vo: HorseVo;
	/**是否被选中 */
	private _selectArrow: egret.MovieClip;
	/**显示层 包括箭头、脚印、主体*/
	private _content: egret.Sprite;
	private _text: egret.TextField;

	public constructor() {
		super();
		this._content = new egret.Sprite();
		this._selectArrow = MovieclipUtils.createMc("arrow_png", "arrow_json");
		this._content.addChild(this._selectArrow);
		this.showSelect(false)

		this._text = new egret.TextField();
		this._content.addChild(this._text);
	}

    public update(): void {
		this.getFSM().Update();
	}

	public handleMessage(msg: Telegram): boolean {
		return;
	}

    public getFSM(): StateMachine {
		return this.stateMachine;
	}

	public getDisplayObject(): egret.DisplayObject {
		return this._content;
	}

	public setData(vo: HorseVo): void {
		this._vo = vo;
		this.setMc(this._vo.mcName);
		this._text.text = vo.id + "";
	}

	private setMc(id: any): void {
		var mc: egret.MovieClip;
        var js: any = RES.getRes("fish" + id + "_json");
        var tx: any = RES.getRes("fish" + id + "_png");
        var data: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(js, tx);
        mc = new egret.MovieClip(data.generateMovieClipData());
		mc.stop();
        // mc.rotation = 180;
		// mc.anchorOffsetX = mc.width >> 1;
		mc.anchorOffsetY = mc.height >> 1;
        mc.play(-1);
        mc.touchEnabled = false;
		this.displayObject = mc;
		this._content.addChild(this.displayObject);
		this._selectArrow.x = this.displayObject.width + this._selectArrow.width;
	}

	public getDataVo<T>(clazz: any) {
		var vo: T;
		vo = <any>this._vo;
		return vo;
	}

	public showSelect(key: boolean): void {
		this._selectArrow.visible = key;
	}
}