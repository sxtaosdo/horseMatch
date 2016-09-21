/**
 * 数据持久层
 * @author sxt
 */
class ClientModel {

    private static _instance: ClientModel;
    /**
     * 心跳间隔
     */
    private static heartbeat_interval: number = 10000;

    private _gameState: IBase;
    private _moneyType: string;
    private user: UserModel;

    private _resLoaded: boolean = false;

    /**
     * 语言
     */
    private _language: string = "zh_CN";
    /**
     * 当前打开的窗口
     */
    private _currentWin: any;
    /**
     * 客户端模拟的比赛过程的数据
     */
    private _phaseList: Array<any>;
    /**
     * 马
     */
    private _horseList: Array<HorseEntity>;

    /** 
     * 已经经过跑道长度 
     */
    private _roadPastLength: number;
    /**
     * 最快速度
     */
    public maxSpeed: number = 0;

    /**游戏状态信息 */
    private _gameInfo: GameInfoVo;
    /**游戏赔率历史信息 */
    private _betInfo: any;
    /**最近一期游戏赔率信息 */
    private _lastBetInfo: any;
    /**历史奖期记录 */
    private _history: Array<HistoryVo>;

    /**下注时间 */
    public betTime: number;
    /**结果时间 */
    public resultTime: number;
    /**准备时间 */
    public prepareTime: number;
    /**距下一场比赛 */
    public nextTime: number;

    public constructor() {
        this.user = UserModel.instance;
        this.moneyType = "0";
        this._phaseList = new Array<any>();
        this._horseList = new Array<HorseEntity>();
        this._history = new Array<HistoryVo>();
        this._gameInfo = new GameInfoVo();
        this._betInfo = new Object();
    }

    /**
     * 简单版（移动版中web版、微信），会少加载资源
     */
    public get isSimple(): boolean {
        if ((egret.Capabilities.isMobile && (egret.Capabilities.runtimeType == "web")) || InterfaceManager.instance.isWeiXin) {
            return true;
        }
        return false;
    }

    public static get instance(): ClientModel {
        if (this._instance == null) {
            this._instance = new ClientModel();
        }
        return this._instance;
    }

    /**
     * 解析参数
     */
    public parseParams(): void {
        console.log("当前系统：" + egret.Capabilities.os);
        console.log("移动设备：" + egret.Capabilities.isMobile);
        console.log("系统语言：" + egret.Capabilities.language);
        console.log("运行环境：" + egret.Capabilities.runtimeType);
        console.log("龙骨version：" + dragonBones.DragonBones.VERSION);

        if (egret.Capabilities.isMobile) {
            console.log("native support版本：" + egret.Capabilities.supportVersion);
        }
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {//WEB环境
            var url = window.document.location.href.toString();
            console.log("浏览器地址：" + url);
            UserModel.instance.userName = decodeURI(egret.getOption("userName").toString());
            UserModel.instance.roleName = decodeURI(egret.getOption("roleName"));
            UserModel.instance.nickName = decodeURI(egret.getOption("nickName"));
            UserModel.instance.token = (egret.getOption("lztoken"));
        }
        if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {//native

        }
    }

	/**
	 * 状态机
	 */
    public changeGameState(state: IBase): void {
        if (this._gameState == state) {
            return;
        }
        this._gameState = state;
        // switch (this.gameState) {
        //     case GameStateDef.GAME_STATE_LOTTERY:
        //         break;
        //     case GameStateDef.GAME_STATE_LOTTERY_COMMON:
        //         break;
        //     case GameStateDef.GAME_STATE_LOTTERY_FREE:
        //         break;
        // }
        GameDispatcher.send(GameEvent.GAME_STATE_EVENT);
    }

    public get gameState(): IBase {
        return this._gameState;
    }

    public get moneyType(): string {
        return this._moneyType;
    }

    public set moneyType(value: string) {
        this._moneyType = value;
    }

    public get language(): string {
        return this._language;
    }

    public set language(value: string) {
        this._language = value;
    }

    public get betInfo(): any {
        return this._betInfo;
    }

    public get lastBetInfo(): MatchInfoVo {
        return this._lastBetInfo;
    }

    public setBetInfo(key: string, data: any) {
        var vo: MatchInfoVo = new MatchInfoVo(data);
        this._lastBetInfo = vo;
        this._betInfo[key] = vo;
        GameDispatcher.send(BaseEvent.BET_INFO_CHANGE);
    }

    public get gameInfoVo(): GameInfoVo {
        return this._gameInfo;
    }

    public set gameInfo(value: Object) {
        this._gameInfo.setData(value);
        this.user.money = this._gameInfo.acctAmount;
        GameDispatcher.send(BaseEvent.GAME_STATE_INFO);
        switch (this._gameInfo.rtnCode) {
            case 0:
                break;
            case 100://奖期信息错误
                break;
            case 101://无法获得奖期信息
                break;
            case 102://奖期已过期
                break;
            case 103://奖期已停售
                break;
            case 200://奖期赛事信息错误
                break;
            case 201://无法获得奖期赛事信息
                break;
        }
    }

    public get window(): any {
        return this._currentWin;
    }

    /**
     * 打开窗口
     * @param value 类名
     * @param data 参数，可选
     */
    public openWindow(value: any, data?: any): void {
        // console.error("进入了ClientModel的openWindow，参数value:" + value + "data:" + data);
        if (value == ClientModel.instance._currentWin) {
            ClientModel.instance._currentWin = null;
        } else {
            ClientModel.instance._currentWin = value;
        }
        GameDispatcher.send(GameEvent.WINDOW_EVENT);
        WindowManager.instance.open(value, data);
    }

    /**
     * 弹出提示框
     * @param type 提示的类型或者文字
     * @param okFun ok按钮回调方法
     * @param cancelFun 取消按钮回调方法
     * @param closeFun 关闭按钮回调方法
     * <listing>
     * 1:充值
     * 2:关闭游戏
     * 3:游戏券不足
     * </listing>
     */
    public openAlert(type: any, okFun?: Function, cancelFun?: Function, closeFun?: Function): void {
        var txt: string = "";
        switch (type) {
            case 1:
                txt = LanguageConfig.instance.getLanguage("您的余额不足，请前往充值");
                okFun = InterfaceManager.instance.recharge;
                break;
            case 2:
                txt = LanguageConfig.instance.getLanguage("您已断开连接，请刷新");
                okFun = InterfaceManager.instance.closeApp;
                break;
            case 3:
                txt = LanguageConfig.instance.getLanguage("您的游戏卷不足");
                break;
            default:
                txt = type;
                break;
        }
        this.openWindow(Alert, { text: txt, okFun: okFun, cancelFun: cancelFun, closeFun: closeFun });
    }

    public onConn(): void {
        GameDispatcher.send(GameEvent.GAME_NET_CONN);
    }

    public onAssetsComplete(data?: any): void {
        this._resLoaded = true;
        GameDispatcher.send(GameEvent.ASSETS_COMPLETE_EVENT);
    }

    public resLoaded(): boolean {
        return this._resLoaded;
    }

    public onLiveTick(time: number): void {
        // console.log("消息延迟：" + (TimeUtils.timestampDate() - time));
    }

    public initGameSprite(id: number): Array<any> {
        for (var i: number = 0; i < 5; i++) {
            var list: Array<any> = new Array<any>();
            var obs: ObstacleVo = new ObstacleVo(new md5().hex_md5(id + i + "obstacle"));
            list.push(obs);
            var buf: BufferVo = new BufferVo(new md5().hex_md5(id + i + "buffer"));
            list.push(buf);
            this._phaseList.push(list);
        }
        return this._phaseList;
    }

    public get phaseList(): Array<any> {
        return this._phaseList;
    }

    public get horseList(): Array<HorseEntity> {
        return this._horseList;
    }

    public set roadPastLength(value: number) {
        if (this._roadPastLength == value) {
            return;
        }
        this._roadPastLength = value;
        // egret.log("此处需进行跑道画面移动的处理");
    }

    public get roadPastLength(): number {
        return this._roadPastLength;
    }

    public setHistory(data: any): void {
        while (this._history.length > 0) {
            this._history.pop();
        }
        data.drawInfo.forEach(element => {
            this._history.push(new HistoryVo(element));
        });
        GameDispatcher.send(BaseEvent.WINDOW_HISTORY);
    }

    public get history(): Array<HistoryVo> {
        return this._history;
    }

}
