/**背景 */
class BackgroundPanel extends egret.Sprite implements IBase {

	/**赛道 */
	private trackImageArr: Array<egret.Bitmap>;
	/**近景背景 */
	private image1Arr: Array<egret.Bitmap>;
	/**远景背景 */
	private image2Arr: Array<egret.Bitmap>;
	/**天空背景 */
	private image3Arr: Array<egret.Bitmap>;



	public constructor() {
		super();
		this.trackImageArr = new Array<egret.Bitmap>();
		this.trackImageArr.push(BitMapUtil.createBitmapByName("bg_track_png"));

		this.image1Arr = new Array<egret.Bitmap>();
		this.image1Arr.push(BitMapUtil.createBitmapByName("bg_image1_png"));

		this.image2Arr = new Array<egret.Bitmap>();
		this.image2Arr.push(BitMapUtil.createBitmapByName("bg_image2_png"));

		this.image3Arr = new Array<egret.Bitmap>();
		this.image3Arr.push(BitMapUtil.createBitmapByName("bg_image3_png"));
	}

	public enter(data?: any): void {
		while (this.trackImageArr.length * this.trackImageArr[0].width < GameWorld.GAME_WIDTH * 2) {
			var bmp: egret.Bitmap = BitMapUtil.createBitmapByName("bg_track_png");
			bmp.x = this.trackImageArr.length * this.trackImageArr[0].width;
			this.trackImageArr.push(bmp);
		}
		var that: BackgroundPanel = this;
		this.trackImageArr.forEach(element => {
			that.addChild(element);
		});
	}

	public exit(): void {

	}

	public execute(data?: any): void {
		this.trackImageArr.forEach(element => {
			element.x -= data;
		});
		if (this.trackImageArr[0].x <= -this.trackImageArr[0].width) {
			this.trackImageArr.push(this.trackImageArr.shift());
			this.trackImageArr[this.trackImageArr.length - 1].x = this.trackImageArr[this.trackImageArr.length - 2].x + this.trackImageArr[this.trackImageArr.length - 2].width;
		}
	}


}