/**
 * 跑道
 */
class RacetrackPanel extends egret.Sprite implements IBase {
	/**跑道 */
	private racetrackArr: Array<egret.Sprite>;
	/**背景 */
    private bgImage: BackgroundPanel;

	public constructor() {
		super();

        this.bgImage = new BackgroundPanel();
        this.addChildAt(this.bgImage, 0);

		this.racetrackArr = new Array<egret.Sprite>();
		for (var i: number = 0; i < 5; i++) {
			var sp: egret.Sprite = new egret.Sprite();
			sp.y = 187 + i * 110;
			this.addChild(sp);
			this.racetrackArr.push(sp);
		}
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
			bmp.x = GameWorld.DEADLINE_LENGTH;
			this.racetrackArr[i].addChild(bmp);

			var arr = ClientModel.instance.phaseList[i];
			arr.forEach(element => {
				if (element.obstacleType!=0) {
					// bmp = BitMapUtil.createBitmapByName("bg_obstacle_" + element.type + "_png");	
					bmp = BitMapUtil.createBitmapByName("bg_obstacle_"+element.obstacleType.toString()+"_png");
					bmp.x = element.startX;
					console.log("ObstacleVo:" + element.startX);
					this.racetrackArr[i].addChild(bmp);
				}
			});
		}
	}

	public exit(): void {
		// this.clearnRacetrack();
		this.bgImage.exit();
	}

	public execute(data?: any): void {
		this.racetrackArr.forEach(element => {
			element.x -= ClientModel.instance.maxSpeed;
		});
		this.bgImage.execute(ClientModel.instance.maxSpeed);
	}

	private clearnRacetrack(): void {
		this.racetrackArr.forEach(element => {
			while (element.numChildren > 0) {
				element.removeChild(element.getChildAt(0));
			}
		});
	}

}