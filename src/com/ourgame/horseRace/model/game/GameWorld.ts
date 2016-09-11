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
    /**终点长度（包含初始左侧长度） */
    public static DEADLINE_LENGTH: number = 1500;
    /**左侧 */
    public static LEFT_LINE: number = GameWorld.GAME_WIDTH / 4 * 1;
    /**右侧 */
    public static RIGHT_LINE: number = GameWorld.GAME_WIDTH / 4 * 3;
    /**已经在舞台之后的跑道 */
    private _pastlength: number = 0;


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
    /**跑道 */
    private racetrack: RacetrackPanel;


    /**当前游戏状态 */
    private _gameState: number = GameState.BET_STAGE;
    /**当前进度 */
    // private _currentProgress: number = 0;
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

        this.racetrack = new RacetrackPanel();
        this.addChildAt(this.racetrack, 0);

        this.bg = new BackgroundPanel();
        this.addChildAt(this.bg, 0);

        this.progress = new ProgressPanel();

        this.resultBiew = new ResultView();
    }

    private set pastlength(value: number) {
        this._pastlength = value;
    }

    private get pastlength(): number {
        return this._pastlength;
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

        this.addChildAt(this.racetrack, 0);
        this.addChild(this.topBar);
        this.changeState(GameState.BET_STAGE);

        GameDispatcher.addEventListener(BaseEvent.REACH_END_LINE, this.onReachEndLine, this);
    }

    public exit(data?: any): void {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.bg.exit();
        TimerManager.instance.clearTimer(this.execute);
    }

    public execute(): void {
        var that: GameWorld = this;
        this.client.horseList.forEach(element => {  //移动
            element.getFSM().Update();//
        });
        this.bg.execute(ClientModel.instance.maxSpeed);
        this.racetrack.execute(ClientModel.instance.roadPastLength);
        if (this.progress.parent) {
            this.progress.execute();
        }
    }

    /**子弹时间的快门动画 */
    private onBullertTme(): void {
        if (this.isBulletTime) {
            this.addChild(this.shutter);
            this.shutter.gotoAndPlay(1, 1);

            egret.Tween.get(this).wait(1000 / 30 * 10).call(() => {
                if (this.shutter.parent) {
                    this.shutter.parent.removeChild(this.shutter);
                }
            }).wait(2000).call(() => {
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
                this.addChildAt(this.betView, this.numChildren - 1);
                this.betView.enter();
                this.client.horseList.forEach(element => {
                    element.getFSM().ChangeState(HorseEnityStateIdel.instance);
                });
                ClientModel.instance.roadPastLength = 0;
                this._runState = RunState.GEGIN;
                break;
            case GameState.PREPARE_STAGE:
                ClientModel.instance.initGameSprite(201609081122);
                this.addChild(this.progress);
                var index: number = 0;
                this.client.horseList.forEach(element => {
                    element.setData(ClientModel.instance.phaseList[index++])
                });
                this.racetrack.enter();
                this.progress.enter();
                break;
            case GameState.RESULT_STAGE:
                this.addChild(this.resultBiew);
                if (this.progress.parent) {
                    this.progress.parent.removeChild(this.progress);
                    this.progress.exit();
                }
                this.racetrack.exit();
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
                this.client.horseList.forEach(element => {
                    element.getFSM().ChangeState(HorseEnityStateSeek.instance);
                });

                break;
        }
    }

    private run(): void {
        TimerManager.instance.doFrameLoop(1, this.execute, this);
    }

    /**已经有马触碰终点线了 */
    private onReachEndLine(): void {
        if (!this.isBulletTime) {
            this.isBulletTime = true;
            this.onBullertTme();
        }

        // this.client.horseList.forEach(element => {
        //     element.getFSM().ChangeState(HorseEnityStateEnd.instance);
        // });
    }

}