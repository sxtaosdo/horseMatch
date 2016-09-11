/**
 * 跑道
 */
class RacetrackPanel extends egret.Sprite implements IBase {
	/**跑道 */
	private racetrackArr: Array<egret.Sprite>;
	private bg: egret.Sprite;

	public constructor() {
		super();
		this.y = 300;

		this.racetrackArr = new Array<egret.Sprite>();
		for (var i: number = 0; i < 5; i++) {
			this.racetrackArr.push(new egret.Sprite());
		}
		this.bg = new egret.Sprite();
		this.bg.graphics.beginFill(0x000000, 0.7);
		this.bg.graphics.drawRect(0, 50, GameWorld.GAME_WIDTH, 5);
		this.bg.graphics.drawRect(0, 150, GameWorld.GAME_WIDTH, 5);
		this.bg.graphics.drawRect(0, 250, GameWorld.GAME_WIDTH, 5);
		this.bg.graphics.drawRect(0, 350, GameWorld.GAME_WIDTH, 5);
		this.addChild(this.bg)
	}

	public enter(data?: any): void {
		var indexA: number = 0;
		var that: RacetrackPanel = this;
		ClientModel.instance.horseList.forEach(element => {
			var vo: Array<PhaseVo> = element.phaseSprite()
			var sp: egret.Sprite = new egret.Sprite();
			sp.y = indexA * 100;
			var indexB: number = 0;
			vo.forEach(element => {
				if (element.obstacleType > 0) {
					var thing: egret.Bitmap = BitMapUtil.createBitmapByName("obstacle" + element.obstacleType + "_png");
					thing.x = GameWorld.LEFT_LINE + element.obstaclePosition + indexB * (GameWorld.DEADLINE_LENGTH / 10);
					sp.addChild(thing)
				}
				indexB++;
			});
			that.racetrackArr.push(sp);
			indexA++;
			that.addChild(sp);
		});
	}

	public exit(): void {
		this.clearnRacetrack();
	}

	public execute(data?: any): void {
		this.racetrackArr.forEach(element => {
			element.x -= data;
		});
	}

	private clearnRacetrack(): void {
		this.racetrackArr.forEach(element => {
			while (element.numChildren > 0) {
				element.removeChild(element.getChildAt(0));
			}
		});
	}
}