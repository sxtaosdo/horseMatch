/**
 * 海底
 */
class DeabedPanel extends egret.Sprite implements IBase {

	private static bgNameList: Array<string> = ["bg2_png", "bg3_png", "bg4_png", "bg6_png", "bg7_png", "bg8_png", "BattleBackground1_png", "bg_png", "bg1_png"];
    private bg: egret.Bitmap;
	private plantList: Array<egret.MovieClip>;
	private config: ConfigModel;
	private wave: egret.Bitmap;
	private ripple: egret.MovieClip;

	public constructor() {
		super();
		this.bg = new egret.Bitmap();
		this.touchChildren = this.touchEnabled = false;
		this.plantList = new Array<egret.MovieClip>();
		this.config = ConfigModel.instance;
	}

	public enter(data?: any): void {
		this.addChildAt(this.bg, 0);
		// this.plantList.push();
		this.ripple = MovieclipUtils.createMc("wave1_png", "wave1_json");
		this.ripple.scaleX = GameWorld.GAME_WIDTH / this.ripple.width;
		this.ripple.scaleY = GameWorld.GAME_HEIGHT / this.ripple.height;
		this.ripple.alpha = 0.5;
		// this.ripple.setf
		this.addChild(this.ripple);
		this.execute(true);
	}

	public exit(): void {
		this.clreanPlant();
	}

	public execute(data?: any): void {
		// if (data) {
		// 	this.clreanPlant();
		// 	var vo: DeabedVo
		// 	this.playWave();
		// 	egret.Tween.get(this.bg).to({ alpha: 0.7 }, 500).call((vo) => {
		// 		this.bg.texture = RES.getRes(vo.bg);
		// 		this.bg.width = GameWorld.GAME_WIDTH;
		// 		this.bg.height = GameWorld.GAME_HEIGHT;
		// 		vo.plant.forEach(element => {
		// 			var mc: egret.MovieClip = MovieclipUtils.createMc("plant_" + element.id + "_png", "plant_" + element.id + "_json");
		// 			mc.x = element.x;
		// 			mc.y = element.y;
		// 			this.plantList.push(mc);
		// 			this.addChild(mc);
		// 		});
		// 	}, this, [vo]).to({ alpha: 1 }, 100);
		// 	this.bg.visible = true;
		// } else {
		// 	if (this.bg) {
		// 		this.bg.visible = false;
		// 		this.clreanPlant();
		// 	}
		// }
	}

	private clreanPlant(): void {
		while (this.plantList.length > 0) {
			var element: egret.MovieClip = this.plantList.pop();
			if (element.parent) {
				element.parent.removeChild(element);
			}
		}
	}

	private playWave(): void {
		if (this.wave == null) {
			this.wave = BitMapUtil.createBitmapByName("wave_png");
			var key: number = Main.STAGE_HEIGHT / this.wave.height;
			this.wave.scaleX = this.wave.scaleY = key;
		}
		this.addChild(this.wave);
		this.wave.x = Main.STAGE_WIDTH;
		egret.Tween.get(this.wave).to({ x: -this.wave.width }, 1000).call(() => {
			this.wave.parent.removeChild(this.wave);
		}, this);
	}
}