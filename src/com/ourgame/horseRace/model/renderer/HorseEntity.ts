/**
 * 马
 */
class HorseEntity extends BaseMovingEntity implements IMovingEneity {

	private _vo: HorseVo;

	public constructor() {
		super();
	}


	public updateHitBox(x, y): void {

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
		return this.displayObject;
	}

	public setData(vo: HorseVo): void {
		this._vo = vo;
		this.setMc(this._vo.mcName);
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
	}

	public getDataVo<T>(clazz: any) {
		var vo: T;
		vo = <any>this._vo;
		return vo;
	}
}