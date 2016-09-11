/**背景 */
class BackgroundPanel extends egret.Sprite implements IBase {

	/**顶部背景 */
	private topImageArr: Array<egret.Bitmap>;

	

	public constructor() {
		super();
		this.topImageArr = new Array<egret.Bitmap>();
		this.topImageArr.push(BitMapUtil.createBitmapByName("bg_png"));
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
		this.topImageArr.forEach(element => {
			element.x -= data;
		});
		if (this.topImageArr[0].x <= -this.topImageArr[0].width) {
			this.topImageArr.push(this.topImageArr.shift());
			this.topImageArr[this.topImageArr.length - 1].x = this.topImageArr[this.topImageArr.length - 2].x + this.topImageArr[this.topImageArr.length - 2].width;
		}
	}


}