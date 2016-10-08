class ImageGroup implements IBase {
	/**父容器 */
	private parent: egret.DisplayObjectContainer;
	/**单张图片宽度 */
	private imageWidth: number = 0;
	/**头指针 */
	private top: number;
	/**尾指针 */
	private end: number;
	/**图片资源 */
	private imageName: string;
	/**需要生成的总数量 */
	private totalImageNum: number = 0;
	/**ImageList */
	private imageList: Array<egret.Bitmap>;
	/**y */
	private startY: number = 0;

	public constructor(parent: egret.DisplayObjectContainer, imageName: string, startY: number = 0) {
		this.parent = parent;
		this.imageName = imageName;
		this.startY = startY;
		this.imageWidth = BitMapUtil.createBitmapByName(this.imageName).width;
		this.totalImageNum = Math.floor(Main.STAGE_WIDTH / this.imageWidth) + 2;
		this.imageList = new Array<egret.Bitmap>();

		for (var i = 0; i < this.totalImageNum; i++) {
			var bmp: egret.Bitmap = BitMapUtil.createBitmapByName(this.imageName);
			bmp.x = i * this.imageWidth;
			bmp.y = this.startY;
			this.parent.addChild(bmp);
			this.imageList.push(bmp);
		}

		this.top = 0;
		this.end = this.imageList.length - 1;
	}

	public enter(data?: any): void {
		if (data) {
			this.imageList.forEach(element => {
				element.y = data;
				this.parent.addChild(element);
			});
		}
	}

	public exit(): void {

	}

	public execute(data?: any): void {
		this.imageList.forEach(element => {
			element.x -= data;
		});
		if (this.imageList[this.top].x <= -this.imageList[this.top].width) {//当第一张图片移出屏幕时
			//移动图片
			this.imageList[this.top].x = this.imageList[this.end].x + this.imageList[this.end].width;
			//移动指针
			this.end = this.top;
			this.top++;
			if (this.top > (this.totalImageNum - 1)) {
				this.top = 0;
			}
		}
	}

}