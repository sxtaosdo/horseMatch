/**
 * 跑道
 */
class RacetrackPanel extends egret.Sprite implements IBase {
	/**跑道 */
	private racetrackArr: Array<egret.Sprite>;
	/**背景 */
    private bgImage: BackgroundPanel;
	/**天空背景 */
	private image3Group: egret.Bitmap;
	/**前景 */
	private image4Group: ImageGroup;


	public constructor() {
		super();

        this.bgImage = new BackgroundPanel();
        this.addChildAt(this.bgImage, 0);

		this.image4Group = new ImageGroup(this, "bg_image4_png");

		this.racetrackArr = new Array<egret.Sprite>();
		for (var i: number = 0; i < 5; i++) {
			var sp: egret.Sprite = new egret.Sprite();
			sp.y = 187 + i * 110;
			this.addChild(sp);
			this.racetrackArr.push(sp);
		}

		this.image3Group = BitMapUtil.createBitmapByName("bg_image3_png");
		this.addChildAt(this.image3Group, 0);
	}

	public enter(data?: any): void {

		this.bgImage.enter();
		this.racetrackArr.forEach(element => {
			element.x = 0;
		});
		for (var i = 0; i < 5; i++) {
			while (this.racetrackArr[i].numChildren > 0) {
				this.racetrackArr[i].removeChild(this.racetrackArr[i].getChildAt(0));
			}
			var bmp: egret.Bitmap = BitMapUtil.createBitmapByName("bg_start_png");
			bmp.x = GameWorld.LEFT_LINE - bmp.width;
			this.racetrackArr[i].addChild(bmp)

			bmp = BitMapUtil.createBitmapByName("bg_end_png");
			bmp.x = GameWorld.DEADLINE_LENGTH - bmp.width / 4;
			this.racetrackArr[i].addChild(bmp);

			// var arr = ClientModel.instance.phaseList[i];
			let arr = ClientModel.instance.horseList[i].roadList;
			if (arr) {

				arr.forEach(element => {
					if (element.obstacleType != 0) {
						bmp = BitMapUtil.createBitmapByName("bg_obstacle_" + element.obstacleType + "_png");
						bmp.y = -90;
						bmp.x = element.startX;
						if (element.obstacleType == 2) {
							bmp.y = -10;
							bmp.x = element.startX - 120;
						}
						this.racetrackArr[i].addChild(bmp);
					}
				});
			}
		}
		this.image4Group.enter();
	}

	public exit(): void {
		// this.clearnRacetrack();
		this.image4Group.exit();
		this.bgImage.exit();
		this.racetrackArr.forEach(element => {
			element.x = 0;
		});
	}

	public execute(data?: any): void {
		this.racetrackArr.forEach(element => {
			element.x = -ClientModel.instance.roadPastLength;
		});
		this.bgImage.execute(data);
		this.image4Group.execute(data);
	}

	private clearnRacetrack(): void {
		this.racetrackArr.forEach(element => {
			while (element.numChildren > 0) {
				element.removeChild(element.getChildAt(0));
			}
		});
	}

	public updateView(num: number): void {
		this.y = num - 720;
		this.image3Group.y = -this.y;
		this.image3Group.height = this.y + 211;
		this.image4Group.enter(this.height - 118);
	}

}