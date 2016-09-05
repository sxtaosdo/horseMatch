enum GameState {
    /**下注阶段 */
    BET_STAGE,
    /**准备阶段 */
    PREPARE_STAGE,
    /**赛跑中 */
    RUN_STAGE,
    /**结果 */
    RESULT_STAGE
}

/**
 * 游戏环节的主场景
 */
class GameWorld extends egret.Sprite implements IBase {

    /**游戏场景的宽高 */
    public static GAME_WIDTH: number = Main.STAGE_WIDTH;
    public static GAME_HEIGHT: number = Main.STAGE_HEIGHT;
    /**左侧 */
    public static LEFT_LINE: number = GameWorld.GAME_WIDTH / 4 * 1;
    /**右侧 */
    public static RIGHT_LINE: number = GameWorld.GAME_WIDTH / 4 * 3;

    private static that: GameWorld;
    private client: ClientModel;
    /**子弹时间 */
    private isBulletTime: boolean = false;
    /** 快门动画 */
    private shutter: egret.MovieClip;
    /**子弹时间的加速度 */
    private tempSpeed: number = 0;

    private horseList: Array<HorseEntity>;
    private _timer: egret.Timer;
    /*顶部条 */
    private topBar: TopView;
    /**下注 */
    private betView: BetView;
    /**比赛结果 */
    private resultBiew: ResultView;
    /**当前游戏状态 */
    private _gameState: number = GameState.BET_STAGE;

    public constructor() {
        super();
        GameWorld.that = this;
        this.client = ClientModel.instance;

        this.horseList = new Array<HorseEntity>();

        this.graphics.beginFill(0x000000, 0.1);
        this.graphics.drawRect(0, 0, GameWorld.GAME_WIDTH, GameWorld.GAME_HEIGHT);
        this.graphics.endFill();

        this.graphics.beginFill(0x000000);
        this.graphics.drawRect(GameWorld.LEFT_LINE, 0, 5, GameWorld.GAME_HEIGHT);
        this.graphics.endFill();

        this.graphics.beginFill(0x000000);
        this.graphics.drawRect(GameWorld.RIGHT_LINE, 0, 5, GameWorld.GAME_HEIGHT);
        this.graphics.endFill();

        this.topBar = new TopView(this.onTimerComplete, this);
        this.betView = new BetView();

        this.resultBiew = new ResultView();
    }

    public enter(data?: any): void {

        for (var i: number = 1; i < 6; i++) {
            var horse: HorseEntity = EntityManager.instance.getAvailableEntity<HorseEntity>(HorseEntity);
            horse.setData(ConfigModel.instance.horseList[i - 1]);
            horse.displayObject.y = i * 80;

            this.horseList.push(horse);
            this.addChild(horse.displayObject);
        }

        if (this.shutter == null) {
            this.shutter = MovieclipUtils.createMc("shutter_png", "shutter_json");
            this.shutter.stop();
            this.shutter.scaleX = this.shutter.scaleY = GameWorld.GAME_WIDTH / this.shutter.width;
            // this.shutter.x = (GameWorld.GAME_WIDTH - this.shutter.width) >> 1;
            // this.shutter.y = (GameWorld.GAME_HEIGHT - this.shutter.height) >> 1;
            this.shutter.x = -50;
            this.shutter.y = -120;
        }

        this.addChild(this.topBar);
        this.changeState(GameState.BET_STAGE);
    }

    public exit(data?: any): void {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        TimerManager.instance.clearTimer(this.execute);
    }

    public execute(): void {
        if (this.isBulletTime == false) {
            this.horseList.forEach(element => {
                element.displayObject.x += RandomUtil.randNumber(1, 10);
                if ((element.displayObject.x + element.displayObject.width) >= GameWorld.RIGHT_LINE) {    //触碰重点
                    if (this.isBulletTime == false) {
                        this.isBulletTime = true;
                        this.onBullertTme();
                    }
                }
            });
        } else {
            this.horseList.forEach(element => {
                element.displayObject.x += this.tempSpeed;
            });
            this.tempSpeed += 0.02;
            // console.log("this.tempSpeed:" + this.tempSpeed);
        }
    }

    private onBullertTme(): void {
        if (this.isBulletTime) {
            this.addChild(this.shutter);
            this.shutter.gotoAndPlay(1, 1);

            egret.Tween.get(this).wait(1000 / 30 * 10).call(() => {
                if (this.shutter && this.shutter.parent) {
                    this.shutter.parent.removeChild(this.shutter);
                }
                this.horseList.forEach(element => {
                    element.displayObject["frameRate"] = 0;
                    egret.Tween.get(element.displayObject).wait(200).to({
                        frameRate: 24
                    }, 5000);
                });
            }, this).wait(2000).call(() => {
                this.changeState(GameState.RESULT_STAGE);
            });
        }
    }

    private onTimerComplete(): void {
        switch (this._gameState) {
            case GameState.BET_STAGE:
                if (this.betView.parent) {
                    this.betView.parent.removeChild(this.betView);
                }
                this.changeState(GameState.PREPARE_STAGE);
                break;
            case GameState.PREPARE_STAGE:
                this.changeState(GameState.RUN_STAGE);
                break;
            case GameState.RESULT_STAGE:
                this.changeState(GameState.BET_STAGE);
                break;
        }
    }

    private changeState(state: any): void {
        this._gameState = state;
        this.topBar.enter(state);
        switch (this._gameState) {
            case GameState.BET_STAGE:
                if (this.resultBiew.parent) {
                    this.resultBiew.parent.removeChild(this.resultBiew);
                }
                // this.topBar.enter(this._gameState);
                this.addChildAt(this.betView, this.numChildren - 1);
                this.betView.enter();
                this.horseList.forEach(element => {
                    element.displayObject.x = 0;
                });
                break;
            case GameState.RESULT_STAGE:
                // this.changeState(GameState.BET_STAGE);
                this.addChild(this.resultBiew);
                TimerManager.instance.clearTimer(this.execute);
                break;
            case GameState.RUN_STAGE:
                this.isBulletTime = false;
                this.tempSpeed = 0;
                this.run();
                break;
        }
    }

    private run(): void {
        TimerManager.instance.doFrameLoop(1, this.execute, this);
    }

}