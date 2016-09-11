/**
 * 底部进度条
 */
class ProgressPanel extends egret.Sprite implements IBase {

	private static STAR_X: number = 23;
	private static PORGRESS_WIDTH: number = 1195;


	private client: ClientModel;

	private propressBg: egret.Bitmap;
	private flag: egret.Bitmap;
	private arrowList: Array<egret.Bitmap>;

	public constructor() {
		super();
		// this.graphics.beginFill(0x1111ff);
		// this.graphics.drawRoundRect(ProgressPanel.STAR_X, 20, 300, 40, 10, 10);
		// this.graphics.endFill();
		this.client = ClientModel.instance;

		this.propressBg = BitMapUtil.createBitmapByName("gameProgress_png");
		this.propressBg.width = 1242;
		this.propressBg.x = (GameWorld.GAME_WIDTH - this.propressBg.width) >> 1;
		this.addChild(this.propressBg);

		this.flag = BitMapUtil.createBitmapByName("flag_png");
		this.flag.x = this.propressBg.x + this.propressBg.width - this.flag.width / 2;
		this.flag.y = this.propressBg.y - this.propressBg.height - this.flag.height / 2;
		this.addChild(this.flag);

		this.y = GameWorld.GAME_HEIGHT - 61;

		this.arrowList = new Array<egret.Bitmap>();
		for (var i: number = 0; i < 5; i++) {
			var bmp: egret.Bitmap = BitMapUtil.createBitmapByName("arrow" + (i + 1) + "_png");
			bmp.x = ProgressPanel.STAR_X;
			this.arrowList.push(bmp);
			this.addChild(bmp);
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
			var temp: egret.Bitmap = that.arrowList[element.getDataVo<HorseVo>(HorseVo).id - 1]
			if (temp) {
				temp.x = ProgressPanel.STAR_X + ProgressPanel.PORGRESS_WIDTH * (element.currentX / (GameWorld.DEADLINE_LENGTH - GameWorld.LEFT_LINE*2));
			}
			if (temp.x > ProgressPanel.PORGRESS_WIDTH) {
				temp.x = ProgressPanel.PORGRESS_WIDTH + ProgressPanel.STAR_X;
			}
		});
	}
}