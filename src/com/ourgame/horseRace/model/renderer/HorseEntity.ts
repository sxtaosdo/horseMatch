/**
 * 马
 */
class HorseEntity extends BaseMovingEntity implements IMovingEneity {

	private _vo: HorseVo;
	/**被选中的箭头 */
	private _selectArrow: egret.MovieClip;
	/**主体动画 */
	private armature: dragonBones.Armature;
	private dragonbonesFactory: dragonBones.EgretFactory
	/**显示层 包括箭头、脚印、主体*/
	private _content: egret.Sprite;
	/**生成道路信息 */
	private _roadList:Array<RoadVo>;
	/**编号 */
	private _text: egret.TextField;
	/**当前所处的阶段 */
	public currentPhase: number = 0;
	/**完成的距离 */
	public currentX: number = 0;
	/**障碍 */
	public obstacle: ObstacleVo;
	/**状态 */
	public buffList: Array<BufferVo>;

	public constructor() {
		super();
		this._content = new egret.Sprite();
		this._selectArrow = MovieclipUtils.createMc("arrow_png", "arrow_json");
		this._content.addChild(this._selectArrow);
		this.showSelect(false)

		this._text = new egret.TextField();
		this._content.addChild(this._text);

		this.stateMachine = new StateMachine(this);
		this.getFSM().ChangeState(HorseEnityStateIdel.instance);
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

	public setData(vo: any): void {
		if (vo instanceof HorseVo) {
			this._vo = vo;
			this.setMc(this._vo.mcName);
			this._text.text = vo.id + "";
		}
	}

	public get roadList():Array<RoadVo>{
		return this._roadList;
	}

	public set roadList(value:Array<RoadVo>){
		this._roadList=value;
	}

	public changeAnimation(name: string): void {
		if (this.armature) {
			dragonBones.WorldClock.clock.remove(this.armature);
			this._content.removeChild(this.displayObject);

			this.armature = this.dragonbonesFactory.buildArmature(name);
			dragonBones.WorldClock.clock.add(this.armature);
			this.armature.animation.gotoAndPlay(name);
			// console.log("change animation to:" + name);
			this.displayObject = this.armature.display;
			this.displayObject.anchorOffsetX = this.displayObject.width / 2;
			this._content.addChild(this.displayObject);

		}
	}

	private setMc(id: any): void {
		// var dragonbonesData = RES.getRes("donghua" + id + "_json");
		// var textureData = RES.getRes("texture" + id + "_json");
		// var texture = RES.getRes("texture" + id + "_png");
		var dragonbonesData = RES.getRes("donghua" + 4 + "_json");
		var textureData = RES.getRes("texture" + 4 + "_json");
		var texture = RES.getRes("texture" + 4 + "_png");
		if (dragonbonesData) {
			this.dragonbonesFactory = new dragonBones.EgretFactory();
			this.dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
			this.dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));

			this.armature = this.dragonbonesFactory.buildArmature(AnimationType.IDEL);
			dragonBones.WorldClock.clock.add(this.armature);
			this.armature.animation.gotoAndPlay(AnimationType.IDEL);

			// this.changeAnimation(AnimationType.IDEL);
			this.displayObject = this.armature.display;
			this.displayObject.anchorOffsetX = this.displayObject.width / 2;
		} else {
			var mc: egret.MovieClip;
			var js: any = RES.getRes("fish" + id + "_json");
			var tx: any = RES.getRes("fish" + id + "_png");
			var data: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(js, tx);
			mc = new egret.MovieClip(data.generateMovieClipData());
			mc.stop();
			mc.anchorOffsetX = mc.width;
			mc.play(-1);
			mc.touchEnabled = false;
			this.displayObject = mc;
		}
		this._content.addChild(this.displayObject);
		this._selectArrow.x = this.displayObject.width + this._selectArrow.width;
	}

	public getDataVo<T>(clazz: any) {
		var vo: T;
		// if (clazz == HorseVo) {
		return <any>this._vo;
		// }
	}

	public showSelect(key: boolean): void {
		this._selectArrow.visible = key;
	}

	public set speed(value: number) {
		this._vo.speed = value;
	}

	// public phaseSprite(): Array<PhaseVo> {
	// 	return this._phaseSprite;
	// }
}
