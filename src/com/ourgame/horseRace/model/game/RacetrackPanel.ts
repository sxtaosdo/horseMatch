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

			var bmp: egret.Bitmap = BitMapUtil.createBitmapByName("bg_start_png");
			bmp.x = GameWorld.LEFT_LINE - bmp.width;
			sp.addChild(bmp)

			bmp = BitMapUtil.createBitmapByName("bg_end_png");
			bmp.x = GameWorld.DEADLINE_LENGTH - (GameWorld.GAME_WIDTH / 4);
			sp.addChild(bmp)

			this.addChild(sp);
			this.racetrackArr.push(sp);
		}
	}

	public enter(data?: any): void {
		this.bgImage.enter();
		this.racetrackArr.forEach(element => {
			element.x = 0;
		});
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