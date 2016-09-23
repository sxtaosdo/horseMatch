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
		// this.y = 300;

		this.racetrackArr = new Array<egret.Sprite>();
		for (var i: number = 0; i < 5; i++) {
			this.racetrackArr.push(new egret.Sprite());
		}

        this.bgImage = new BackgroundPanel();
        this.addChildAt(this.bgImage, 0);
	}

	public enter(data?: any): void {
		this.bgImage.enter();
	}

	public exit(): void {
		this.clearnRacetrack();
		this.bgImage.exit();
	}

	public execute(data?: any): void {
		this.racetrackArr.forEach(element => {
			element.x = -data;
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