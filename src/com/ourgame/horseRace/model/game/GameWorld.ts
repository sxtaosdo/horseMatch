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
    public static DEADLINE_LENGTH: number = 10000;
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
    /**前景 */
    private image4Group: ImageGroup;


    /**当前游戏状态 */
    private _gameState: number = GameState.BET_STAGE;
    /**当前进度 */
    // private _currentProgress: number = 0;
    /**当前赛跑中的状态 */
    private _runState: any = RunState.GEGIN;
    /**龙骨动画播放速度 */
    private bdSpeed: number = -1;
    private lastX: number = 0;

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

        this.topBar = new TopView();
        this.betView = new BetView();

        this.racetrack = new RacetrackPanel();
        this.addChildAt(this.racetrack, 0);

        this.progress = new ProgressPanel();

        this.resultBiew = new ResultView();
        this.image4Group = new ImageGroup(this, "bg_image4_png");
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
            horse.getDisplayObject().y = i * 110 + 195;

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

        this.image4Group.enter();

        GameDispatcher.addEventListener(BaseEvent.REACH_END_LINE, this.onReachEndLine, this);
        GameDispatcher.addEventListener(BaseEvent.GAME_STATE_INFO, this.onGameInfo, this);
        GameDispatcher.addEventListener(BaseEvent.MATCH_INFO_CHANGE, this.onMatchInfoChange, this);
        GameDispatcher.addEventListener(BaseEvent.RESIZE_EVENT, this.onResize, this);

        TimerManager.instance.doFrameLoop(1, () => {
            dragonBones.WorldClock.clock.advanceTime(this.bdSpeed);
        }, this);
        TimerManager.instance.doLoop(1000, this.gameTimer, this);
        this.onResize();
    }

    public exit(data?: any): void {
        GameDispatcher.removeEventListener(BaseEvent.REACH_END_LINE, this.onReachEndLine, this);
        GameDispatcher.removeEventListener(BaseEvent.GAME_STATE_INFO, this.onGameInfo, this);
        GameDispatcher.removeEventListener(BaseEvent.MATCH_INFO_CHANGE, this.onMatchInfoChange, this);
        GameDispatcher.removeEventListener(BaseEvent.RESIZE_EVENT, this.onResize, this);
        if (this.parent != null) {
            this.parent.removeChild(this);
        }

        this.betView.exit();
        this.racetrack.exit();
        this.image4Group.exit();
        TimerManager.instance.clearTimer(this.execute);
    }

    public execute(): void {
        var that: GameWorld = this;
        this.client.horseList.forEach(element => {  //移动
            element.getFSM().Update();
        });
        if (this._runState == RunState.RUN) {
            this.racetrack.execute(ClientModel.instance.roadPastLength - this.lastX);
            this.image4Group.execute(ClientModel.instance.roadPastLength - this.lastX);
            this.lastX = ClientModel.instance.roadPastLength;
        }
        if (this.progress.parent) {
            this.progress.execute();
        }
    }

    public gameTimer(): void {
        let config: ConfigModel = ConfigModel.instance;
        let time: number = 0;
        if (this.topBar) {
            if (this.client.gameTime > -1) {
                switch (this._gameState) {
                    case GameState.BET_STAGE:
                        time = this.client.gameTime - (config.prepareTime + config.runTime + config.nextTime);
                        this.topBar.execute(time);
                        if (time < 1) {
                            this.changeState(GameState.PREPARE_STAGE);
                        }
                        break;
                    case GameState.PREPARE_STAGE:
                        time = this.client.gameTime - (config.runTime + config.nextTime);
                        this.topBar.execute(time);
                        if (time < 1) {
                            ConnectionManager.instance.sendHelper.drawMatch();  //准备倒计时结束后，请求名次信息,否则无法生成动画脚本
                        }
                        break;
                    case GameState.RUN_STAGE:
                        time = this.client.gameTime - config.nextTime;
                        //不处理，等待第一名撞线的事件改变游戏状态
                        break;
                    case GameState.RESULT_STAGE:
                        time = this.client.gameTime;
                        this.resultBiew.execute(time);
                        if (time < 1) {
                            this.changeState(GameState.BET_STAGE);
                            ConnectionManager.instance.sendHelper.drawMatch();  //结果之后请求下一场比赛的信息
                        }
                        break;
                }
            } else {
                console.log("游戏进度错误,TIME:" + this.client.gameTime);
            }
            this.client.gameTime--;
            if (this.client.gameTime < 0) {
                this.client.gameTime = 0;
            }
            console.log("\t this.client.gameTime:" + this.client.gameTime);
        }
    }

    /**子弹时间的快门动画 */
    private onBullertTme(): void {
        if (this.isBulletTime) {
            this.addChild(this.shutter);
            egret.Tween.get(this.shutter).to({ scaleX: 1, scaleY: 1 }, 200).to({ scaleX: 5, scaleY: 5 }, 400).call(() => {
                if (this.shutter.parent) {
                    this.shutter.parent.removeChild(this.shutter);
                }
            }, this).wait(2500).call(() => {
                // console.log("GameWorld:onBullertTme:" + this.client.lastBetInfo.info.leftTime);

                // if (this.client.lastBetInfo.info.leftTime > ConfigModel.instance.nextTime) {//如果马跑完，但比赛时间未到，则同步一次时间
                //     ConnectionManager.instance.sendHelper.drawMatch();
                // } else {
                this.changeState(GameState.RESULT_STAGE);
                // }
            }, this);
        }
    }

    // private onTimerComplete(): void {
    //     // console.log("GameWord:onTimerComplete 收到TopView的回调:" + this._gameState + "\t" + TimeUtils.printTime);
    //     switch (this._gameState) {
    //         case GameState.BET_STAGE:
    //             this.changeState(GameState.PREPARE_STAGE);
    //             break;
    //         case GameState.PREPARE_STAGE:
    //             ConnectionManager.instance.sendHelper.drawMatch();//准备倒计时结束后，请求名次信息
    //             break;
    //         case GameState.RUN_STAGE:
    //             break;
    //         case GameState.RESULT_STAGE:
    //             ConnectionManager.instance.sendHelper.drawMatch();///*****************************************************************
    //             break;
    //     }
    // }

    private changeState(state: any, enterStateTime: number = 0): void {
        // console.log("GameWord:changeState _gameState:" + this._gameState + "\t" + TimeUtils.printTime);
        this._gameState = state;
        this.topBar.enter(state);
        switch (this._gameState) {
            case GameState.BET_STAGE:
                this.client.first = null;
                this.resultBiew.exit();
                this.betView.enter();
                this.client.horseList.forEach(element => {
                    element.getFSM().ChangeState(HorseEnityStateIdel.instance);
                });
                this.addChild(this.betView);
                this.image4Group.exit();
                TimerManager.instance.clearTimer(this.execute);
                break;
            case GameState.PREPARE_STAGE:
                if (this.betView.parent) {
                    this.betView.parent.removeChild(this.betView);
                }
                this._runState = RunState.GEGIN;
                this.betView.exit();
                this.addChild(this.progress);
                this.lastX = 0;
                this.progress.enter();
                break;
            case GameState.RESULT_STAGE:
                this._runState = RunState.END;
                this.addChild(this.resultBiew);
                // this.resultBiew.enter({ call: this.onTimerComplete, thisObj: this });
                if (this.progress.parent) {
                    this.progress.parent.removeChild(this.progress);
                    this.progress.exit();
                }
                this.racetrack.exit();
                this.lastX = 0;
                break;
            case GameState.RUN_STAGE:
                var d: Date = new Date();
                ClientModel.instance.enterStateTime = d.getTime() - enterStateTime;
                this._runState = RunState.RUN;
                this.addChild(this.progress);
                this.isBulletTime = false;
                this.tempSpeed = 0;
                ClientModel.instance.roadPastLength = 0;
                ClientModel.instance.initGameSprite(this.client.gameInfoVo.drawId);

                this.racetrack.enter();
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
    private onReachEndLine(e: any): void {
        if (!this.isBulletTime) {
            this.isBulletTime = true;
            this.onBullertTme();
        }
        // ClientModel.instance.maxSpeed = 0;
        this.client.horseList.forEach(element => {
            MessageDispatcher.instance.DispatchSimpleMessage(this.client.first, element, "onReachEndLine");
        });
        // this.bdSpeed = 0.001;
        // egret.Tween.get(this).wait(100).to({ bdSpeed: 0.03 }, 2000);
    }

    private onResize(evt?: egret.Event): void {
        if (this.stage) {
            if (this.racetrack && this.racetrack.parent) {
                this.racetrack.updateView(this.stage.stageHeight);
                this.image4Group.enter(this.stage.stageHeight - 118);
                this.addChild(this.progress);
            }
            if (this.betView && this.betView.parent) {
                // this.betView.y = this.stage.stageHeight - this.betView.height;
                this.betView.top = 0;
                this.betView.bottom = 0;
                this.betView.height = this.stage.stageHeight;
                this.addChild(this.betView);
            }
            if (this.topBar && this.topBar.parent) {
                this.addChild(this.topBar);
            }
            if (this.progress && this.progress.parent) {
                this.progress.y = this.stage.stageHeight - this.progress.height;
            }
            for (var i = 0; i < 5; i++) {
                this.client.horseList[i].getDisplayObject().y = this.stage.stageHeight - (4 - i) * 110 - 120;
            }
        }
    }

    //请求init后
    private onGameInfo(evt?: any): void {
        ConnectionManager.instance.sendHelper.drawMatch(this.client.gameInfoVo.drawId);
    }

    //draw信息结果
    private onMatchInfoChange(): void {
        // console.log("gameword 收到draw事件并处理" + this.client.lastBetInfo.info);
        let config: ConfigModel = ConfigModel.instance;
        switch (this._gameState) {
            case GameState.PREPARE_STAGE://比赛3秒倒计时后服务器才知道比赛结果，所以这里需要请求一次，如果没有名次信息则重试，次数太多弹板提示
                if (this.client.lastBetInfo.includeRank) {
                    this.changeState(GameState.RUN_STAGE, config.runTime - (this.client.gameTime - config.nextTime));
                } else {
                    ConnectionManager.instance.sendHelper.drawMatch();
                    console.log("获取名次信息失败，重试" + TimeUtils.printTime);
                }
                break;
            case GameState.RESULT_STAGE:
                if (this.client.lastBetInfo.info.isNew) {
                    this.changeState(GameState.BET_STAGE);
                    console.log("在结果展示界面倒计时完毕，收到cdTime：" + this.client.lastBetInfo.info.cdTime + "\t isNew:" + this.client.lastBetInfo.info.isNew + "\t" + TimeUtils.printTime);
                }
                break;
            default:
                this.parseGameStateData(this.client.lastBetInfo.info);
                break;
        }
    }

    //根据cdTime和leftTime确定游戏状态
    private parseGameStateData(data: GameInfoVo): void {
        console.log("berview \tcdTime:" + data.cdTime + "\tleftTime:" + data.leftTime + "\t" + TimeUtils.printTime);
        let config: ConfigModel = ConfigModel.instance;
        if (this.client.gameTime > config.betTime) {
            this.changeState(GameState.BET_STAGE);
        } else {
            if (this.client.gameTime > (config.runTime + config.nextTime)) {//准备阶段
                this.changeState(GameState.PREPARE_STAGE);
            } else if (this.client.gameTime <= config.nextTime) {//结果展示阶段
                if (this._gameState != GameState.RESULT_STAGE) {
                    this.changeState(GameState.RESULT_STAGE);
                }
            } else {//赛跑阶段
                this.changeState(GameState.RUN_STAGE, config.runTime - (this.client.gameTime - config.nextTime));
            }
        }
    }
}