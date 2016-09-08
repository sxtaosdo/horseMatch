/**
 * 底部进度条
 */
class ProgressPanel extends egret.Sprite implements IBase {
	private static STAR_X: number = 300;
	private propressBg: egret.Bitmap;
	private flag: egret.Bitmap;

	public constructor() {
		super();
		// this.graphics.beginFill(0x1111ff);
		// this.graphics.drawRoundRect(ProgressPanel.STAR_X, 20, 300, 40, 10, 10);
		// this.graphics.endFill();

		this.propressBg = BitMapUtil.createBitmapByName("gameProgress_png");
		this.propressBg.width = 700;
		this.propressBg.x = ProgressPanel.STAR_X;
		this.addChild(this.propressBg);

		this.flag = BitMapUtil.createBitmapByName("flag_png");
		this.flag.x = this.propressBg.x + this.propressBg.width - this.flag.width/2;
		this.flag.y = this.propressBg.y - this.propressBg.height - this.flag.height/2;
		this.addChild(this.flag);

		this.y = GameWorld.GAME_HEIGHT - this.height * 2;
	}

	public enter(data?: any): void {
	}

	public exit(): void {

	}

	public execute(data?: any): void {

	}
}