/**背景 */
class BackgroundPanel extends egret.Sprite implements IBase {


	private topImageArr: Array<egret.Bitmap>;
	private bg: egret.Sprite;

	public constructor() {
		super();

		this.topImageArr = new Array<egret.Bitmap>();
		this.topImageArr.push(BitMapUtil.createBitmapByName("bg_png"));

		this.bg = new egret.Sprite();
		this.bg.graphics.beginFill(0x000000, 0.7);
		this.bg.graphics.drawRect(0, 0, GameWorld.GAME_WIDTH, 5);
		this.bg.graphics.drawRect(0, 80, GameWorld.GAME_WIDTH, 5);
		this.bg.graphics.drawRect(0, 160, GameWorld.GAME_WIDTH, 5);
		this.bg.graphics.drawRect(0, 240, GameWorld.GAME_WIDTH, 5);
		this.bg.y = 300;
		this.addChild(this.bg)
	}

	public enter(data?: any): void {
		while (this.topImageArr.length * this.topImageArr[0].width < GameWorld.GAME_WIDTH * 2) {
			var bmp: egret.Bitmap = BitMapUtil.createBitmapByName("bg_png");
			bmp.x = this.topImageArr.length * this.topImageArr[0].width;
			this.topImageArr.push(bmp);
		}
		var that: BackgroundPanel = this;
		this.topImageArr.forEach(element => {
			that.addChild(element);
		});
	}

	public exit(): void {

	}

	public execute(data?: any): void {
		// this.top.x -= data;
		this.topImageArr.forEach(element => {
			element.x -= data;
		});
		if (this.topImageArr[0].x <= -this.topImageArr[0].width) {
			this.topImageArr.push(this.topImageArr.shift());
			this.topImageArr[this.topImageArr.length - 1].x = this.topImageArr[this.topImageArr.length - 2].x + this.topImageArr[this.topImageArr.length - 2].width;
		}
	}
}