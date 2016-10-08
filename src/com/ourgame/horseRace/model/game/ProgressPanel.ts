/**
 * 底部进度条
 */
class ProgressPanel extends egret.Sprite implements IBase {

	private static STAR_X: number = 23;
	private static PORGRESS_WIDTH: number = 1195;


	private client: ClientModel;

	private propressBg: egret.Bitmap;
	private flag: egret.Bitmap;
	private arrowList: Array<egret.Sprite>;

	public constructor() {
		super();
		this.client = ClientModel.instance;

		this.propressBg = BitMapUtil.createBitmapByName("gameProgress_png");
		this.propressBg.width = 1242;
		this.propressBg.x = (GameWorld.GAME_WIDTH - this.propressBg.width) >> 1;
		this.addChild(this.propressBg);
		this.y = GameWorld.GAME_HEIGHT - 61;

		this.arrowList = new Array<egret.Sprite>();
		for (var i: number = 0; i < 5; i++) {
			var sp: egret.Sprite = new egret.Sprite();

			var bmp: egret.Bitmap = BitMapUtil.createBitmapByName("arrow" + (i + 1) + "_png");
			sp.x = ProgressPanel.STAR_X;
			sp.addChild(bmp)

			var tf: egret.TextField = new egret.TextField();
			tf.textColor = 0x000000;
			tf.x = 6;
			tf.y = 2;
			tf.width = tf.height = 30;
			tf.text = String(i + 1);
			sp.addChild(tf);


			this.arrowList.push(sp);
			this.addChild(sp);
		}
	}

	public enter(data?: any): void {
		this.arrowList.forEach(element => {
			element.x = ProgressPanel.STAR_X;
		});
	}

	public exit(): void {

	}

	public execute(data?: any): void {
		var that: ProgressPanel = this;
		this.client.horseList.forEach(element => {
			var temp: egret.Sprite = that.arrowList[element.getDataVo<HorseVo>(HorseVo).id - 1]
			if (temp) {
				temp.x = Math.min(ProgressPanel.STAR_X + ProgressPanel.PORGRESS_WIDTH * (element.currentX - GameWorld.LEFT_LINE) / (GameWorld.DEADLINE_LENGTH - GameWorld.LEFT_LINE), ProgressPanel.PORGRESS_WIDTH + ProgressPanel.STAR_X);
			}
		});
	}
}