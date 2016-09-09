/**游戏状态 */
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

/**赛跑中状态 */
enum RunState {
    /**开始阶段 */
    GEGIN,
    /**拉锯阶段 */
    SEESAW,
    /**冲刺阶段 */
    SPRINT
}

/**
 * 游戏环节的主场景
 */
class GameWorld extends egret.Sprite implements IBase {

    /**游戏场景的宽高 */
    public static GAME_WIDTH: number = Main.STAGE_WIDTH;
    public static GAME_HEIGHT: number = Main.STAGE_HEIGHT;
    /**跑到长度 */
    public static TOTAL_LENGTH: number = 10000;
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


    private _timer: egret.Timer;
    /*顶部条 */
    private topBar: TopView;
    /**下注 */
    private betView: BetView;
    /**比赛结果 */
    private resultBiew: ResultView;
    /**背景 */
    private bg: BackgroundPanel;
    /**进度 */
    private progress: ProgressPanel;
    /**当前游戏状态 */
    private _gameState: number = GameState.BET_STAGE;
    /**当前进度 */
    private _currentProgress: number = 0;
    /**当前赛跑中的状态 */
    private _runState: any = RunState.GEGIN;

    public constructor() {
        super();
        GameWorld.that = this;
        this.client = ClientModel.instance;

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

        this.bg = new BackgroundPanel();
        this.addChildAt(this.bg, 0);

        this.progress = new ProgressPanel();

        this.resultBiew = new ResultView();
    }

    public enter(data?: any): void {
        this.bg.enter();
        for (var i: number = 1; i < 6; i++) {
            var horse: HorseEntity = EntityManager.instance.getAvailableEntity<HorseEntity>(HorseEntity);
            horse.setData(ConfigModel.instance.horseList[i - 1]);
            horse.getDisplayObject().y = i * 80 + 200;

            this.client.horseList.push(horse);
            this.addChild(horse.getDisplayObject());
        }

        if (this.shutter == null) {
            this.shutter = MovieclipUtils.createMc("shutter_png", "shutter_json");
            this.shutter.stop();
            this.shutter.scaleX = this.shutter.scaleY = GameWorld.GAME_WIDTH / this.shutter.width;
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
        this.bg.exit();
        TimerManager.instance.clearTimer(this.execute);
    }

    public execute(): void {
        var max: number = 0;
        var that: GameWorld = this;
        if (this.isBulletTime == false) {
            this.client.horseList.forEach(element => {
                var speed: number = RandomUtil.randNumber(1, 10);
                if (max < speed) {
                    max = speed;
                }
                this._currentProgress += max;
                element.getDisplayObject().x += speed
                if ((element.getDisplayObject().x + element.getDisplayObject().width - 155) >= GameWorld.RIGHT_LINE) {    //触碰重点
                    if (this.isBulletTime == false) {
                        this.isBulletTime = true;
                        this.onBullertTme();
                    }
                }
                element.currentX = element.getDisplayObject().x;    //temp
            });
            this.bg.execute(max);
        } else {
            this.client.horseList.forEach(element => {
                element.getDisplayObject().x += this.tempSpeed;
            });
            this.tempSpeed += 0.02;
            this.bg.execute(this.tempSpeed);
        }
        if (this.progress.parent) {
            this.progress.execute(this._currentProgress);
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
                this.client.horseList.forEach(element => {
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
                this.client.horseList.forEach(element => {
                    element.getDisplayObject().x = 0;
                });
                this._currentProgress = 0;
                this._runState = RunState.GEGIN;
                break;

            case GameState.PREPARE_STAGE:
                ClientModel.instance.initGameSprite(201609081122);
                this.addChild(this.progress);
                var index: number = 0;
                this.client.horseList.forEach(element => {
                    element.setData(ClientModel.instance.phaseList[index++])
                });
                this.progress.enter();
                break;
            case GameState.RESULT_STAGE:
                // this.changeState(GameState.BET_STAGE);
                this.addChild(this.resultBiew);
                if (this.progress.parent) {
                    this.progress.parent.removeChild(this.progress);
                    this.progress.exit();
                }
                TimerManager.instance.clearTimer(this.execute);
                break;
            case GameState.RUN_STAGE:
                this.isBulletTime = false;
                this.tempSpeed = 0;
                this.run();
                var that: GameWorld = this;
                ConfigModel.instance.horseList.forEach(element => {
                    if (element.id && (that.client.horseList[element.id - 1])) {
                        if (element.math.bet > 0) {
                            that.client.horseList[element.id - 1].showSelect(true);
                        } else {
                            that.client.horseList[element.id - 1].showSelect(false);
                        }
                    }
                });

                break;
        }
    }

    private run(): void {
        TimerManager.instance.doFrameLoop(1, this.execute, this);
    }

}