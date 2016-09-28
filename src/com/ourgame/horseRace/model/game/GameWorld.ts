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
    /**赛跑阶段 */
    RUN,
    /**过线阶段 */
    END
}

/**
 * 游戏环节的主场景
 */
class GameWorld extends egret.Sprite implements IBase {

    /**游戏场景的宽高 */
    public static GAME_WIDTH: number = Main.STAGE_WIDTH;
    public static GAME_HEIGHT: number = Main.STAGE_HEIGHT;

    /**终点长度（包含初始左侧长度） */
    public static DEADLINE_LENGTH: number = 150000;
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
    private shutter: egret.Bitmap;
    /**子弹时间的加速度 */
    private tempSpeed: number = 0;


    private _timer: egret.Timer;
    /*顶部条 */
    private topBar: TopView;
    /**下注 */
    private betView: BetView;
    /**比赛结果 */
    private resultBiew: ResultView;

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
    /**龙骨动画播放速度 */
    private bdSpeed: number = -1;

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
        for (var i: number = 1; i < 6; i++) {
            var horse: HorseEntity = EntityManager.instance.getAvailableEntity<HorseEntity>(HorseEntity);
            horse.setData(ConfigModel.instance.horseList[i - 1]);
            horse.getDisplayObject().y = i * 110 + 187;

            this.client.horseList.push(horse);
            this.addChild(horse.getDisplayObject());
        }

        if (this.shutter == null) {
            this.shutter = BitMapUtil.createBitmapByName("shutter_png");
            this.shutter.scaleX = this.shutter.scaleY = 5;
            this.shutter.x = GameWorld.GAME_WIDTH >> 1
            this.shutter.y = GameWorld.GAME_HEIGHT >> 1;
            this.shutter.anchorOffsetX = this.shutter.width >> 1;
            this.shutter.anchorOffsetY = this.shutter.height >> 1;
        }

        this.addChildAt(this.racetrack, 0);

        GameDispatcher.addEventListener(BaseEvent.REACH_END_LINE, this.onReachEndLine, this);
        GameDispatcher.addEventListener(BaseEvent.GAME_STATE_INFO, this.onGameInfo, this);
        GameDispatcher.addEventListener(BaseEvent.BET_INFO_CHANGE, this.onMatchInfoChange, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);

        TimerManager.instance.doFrameLoop(1, () => {
            dragonBones.WorldClock.clock.advanceTime(this.bdSpeed);
        }, this);
    }

    public exit(data?: any): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
        this.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
        if (this.parent != null) {
            this.parent.removeChild(this);
        }

        this.betView.exit();
        this.racetrack.exit();
        TimerManager.instance.clearTimer(this.execute);
    }

    public execute(): void {
        var that: GameWorld = this;
        this.client.horseList.forEach(element => {  //移动
            element.getFSM().Update();//
        });
        if (this._runState == RunState.RUN) {
            this.racetrack.execute(ClientModel.instance.roadPastLength);
        }
        if (this.progress.parent) {
            this.progress.execute();
        }

    }

    /**子弹时间的快门动画 */
    private onBullertTme(): void {
        if (this.isBulletTime) {
            this.addChild(this.shutter);
            egret.Tween.get(this.shutter).to({ scaleX: 1, scaleY: 1 }, 150).to({ scaleX: 5, scaleY: 5 }, 200).call(() => {
                if (this.shutter.parent) {
                    this.shutter.parent.removeChild(this.shutter);
                }
            }).wait(5000).call(() => {
                if (this.client.lastBetInfo.info.leftTime > ConfigModel.instance.nextTime) {//如果马跑完，但比赛时间未到，则同步一次时间
                    ConnectionManager.instance.sendHelper.drawMatch();
                } else {
                    this.changeState(GameState.RESULT_STAGE);
                }
            });
        }
    }

    private onTimerComplete(): void {
        switch (this._gameState) {
            case GameState.BET_STAGE:
                if (this.betView.parent) {
                    this.betView.parent.removeChild(this.betView);
                }
                ConnectionManager.instance.sendHelper.drawMatch(this.client.gameInfoVo.drawId);
                this.changeState(GameState.PREPARE_STAGE);
                break;
            case GameState.PREPARE_STAGE:
                this.changeState(GameState.RUN_STAGE);
                break;
            case GameState.RUN_STAGE:
                break;
            case GameState.RESULT_STAGE:
                this.changeState(GameState.BET_STAGE);
                break;
        }
    }

    private changeState(state: any, enterStateTime: number = 0): void {
        this._gameState = state;
        this.topBar.enter(state);
        switch (this._gameState) {
            case GameState.BET_STAGE:

                this.resultBiew.exit();
                this.betView.enter();
                this.client.horseList.forEach(element => {
                    element.getFSM().ChangeState(HorseEnityStateIdel.instance);
                });
                // this.addChildAt(this.betView, this.numChildren - 1);
                this.addChild(this.betView);
                break;
            case GameState.PREPARE_STAGE:
                this._runState = RunState.GEGIN;
                var d: Date = new Date();
                ClientModel.instance.enterStateTime = d.getTime() - enterStateTime;
                ClientModel.instance.initGameSprite(this.client.gameInfoVo.drawId);
                this.addChild(this.progress);
                var index: number = 0;
                this.client.horseList.forEach(element => {
                    element.roadList = ClientModel.instance.phaseList[index++];
                });
                this.betView.exit();
                this.racetrack.enter();
                this.progress.enter();
                break;
            case GameState.RESULT_STAGE:
                this._runState = RunState.END;
                this.addChild(this.resultBiew);
                this.resultBiew.enter();

                if (this.progress.parent) {
                    this.progress.parent.removeChild(this.progress);
                    this.progress.exit();
                }
                this.racetrack.exit();
                TimerManager.instance.clearTimer(this.execute);
                break;
            case GameState.RUN_STAGE:
                this._runState = RunState.RUN;
                this.addChild(this.progress);
                this.isBulletTime = false;
                this.tempSpeed = 0;
                ClientModel.instance.roadPastLength = 0;
                TimerManager.instance.doLoop(1 / 30 * 1000, this.execute, this);
                var that: GameWorld = this;
                ConfigModel.instance.horseList.forEach(element => {
                    if (element.id && (that.client.horseList[element.id - 1])) {
                        if (element.math && element.math.bet > 0) {
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
        this.addChild(this.topBar);
        this.onResize();
    }

    /**已经有马触碰终点线了 */
    private onReachEndLine(): void {
        if (!this.isBulletTime) {
            this.isBulletTime = true;
            this.onBullertTme();
        }
        ClientModel.instance.maxSpeed = 0;
        this.bdSpeed = 0.001;
        egret.Tween.get(this).wait(100).to({ bdSpeed: 0.03 }, 2000);
    }

    private onAdd(): void {
        this.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
        this.onResize();
    }

    private onResize(evt?: egret.Event): void {
        if (this.stage) {
            if (this.betView && this.betView.parent) {
                // this.betView.y = this.stage.stageHeight - this.betView.height;
                this.betView.top = 0;
                this.betView.bottom = 0;
                this.betView.height = this.stage.stageHeight;
            }
            if (this.racetrack && this.racetrack.parent) {
                // this.racetrack.y = this.stage.stageHeight - 720;
                this.racetrack.updateView(this.stage.stageHeight);
            }
            if (this.progress && this.progress.parent) {
                this.progress.y = this.stage.stageHeight - this.progress.height;
            }
            for (var i = 0; i < 5; i++) {
                this.client.horseList[i].getDisplayObject().y = this.stage.stageHeight - (4 - i) * 110 - 130;
            }
        }
    }

    //请求init后
    private onGameInfo(evt?: any): void {
        ConnectionManager.instance.sendHelper.drawMatch(this.client.gameInfoVo.drawId);
    }

    private onMatchInfoChange(): void {
        this.parseGameStateData(this.client.lastBetInfo.info);
    }

    private parseGameStateData(data: GameInfoVo): void {
        // console.log("berview \tcdTime:" + data.cdTime + "\tleftTime:" + data.leftTime);
        if (data.cdTime > 0) {
            this.client.betTime = data.cdTime;
            this.changeState(GameState.BET_STAGE);
        } else {
            if (data.leftTime >= (30 - ConfigModel.instance.prepareTime)) {//准备阶段
                this.client.prepareTime = data.leftTime;
                this.changeState(GameState.PREPARE_STAGE);
            } else if (data.leftTime <= (ConfigModel.instance.nextTime)) {//结果展示阶段
                this.client.nextTime = data.leftTime;
                if (this._gameState != GameState.RESULT_STAGE) {
                    this.changeState(GameState.RESULT_STAGE);
                }
            } else {//赛跑阶段
                this.changeState(GameState.RUN_STAGE, data.leftTime - ConfigModel.instance.nextTime);
            }
        }
    }
}