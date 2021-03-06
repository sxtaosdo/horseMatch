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
    private _phaseList: Array<Array<RoadVo>>;
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
    // public maxSpeed: number = 0;

    /**游戏状态信息 */
    private _gameInfo: GameInfoVo;
    /**游戏赔率历史信息 */
    private _betInfo: any;
    /**最近一期游戏赔率信息 */
    private _lastBetInfo: MatchInfoVo;
    /**历史奖期记录 */
    private _history: Array<HistoryVo>;
    /**进入当前状态时间 */
    private _enterStateTime: number = 0;
    /**第一名的马匹 */
    private _first: HorseEntity;
    /**我的投注记录 */
    private _betHistory: Array<BetHistoryInfoVo>;
    /**奖励金额 */
    private _resultInfo: any;
    /**赛马信息 */
    private _horseInfo: Array<MatchPlayerVo>;

    /**游戏当前时间 */
    private _gameTime: number = 0;

    /**下注结果 */
    public _betOperation: string;
    /**撤销投注信息 */
    public _betCancel: any;
    /**每局的操作*/
    public operationObj: any;
    /**每局的操作-正在发送的操作 */
    public operationSended: any;
    /**每局的操作-当前的操作 */
    public operationCurrent: any;
    /**是否正在等待下注返回 */
    public isWaitBetResult: boolean = false;

    public constructor() {
        this.operationObj = new Object();
        this.operationSended = new Object();
        this.operationCurrent = new Object();
        this.user = UserModel.instance;
        this.moneyType = "0";
        this._phaseList = [];
        this._horseList = new Array<HorseEntity>();
        this._horseInfo = new Array<MatchPlayerVo>();
        this._history = new Array<HistoryVo>();
        this._gameInfo = new GameInfoVo();
        this._betHistory = new Array<BetHistoryInfoVo>();
        this._betInfo = new Object();
        this._resultInfo = new Object();
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
        console.log("系统：" + egret.Capabilities.os);
        console.log("设备：" + egret.Capabilities.isMobile);
        console.log("语言：" + egret.Capabilities.language);
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

    public setBetInfo(data: any) {
        if (!this._lastBetInfo) {
            var vo: MatchInfoVo = new MatchInfoVo();
            this._lastBetInfo = vo;
        }
        this._lastBetInfo.setData(data);
        this._gameTime = this._lastBetInfo.info.leftTime;
        // console.log("收到draw返回数据,gameTime:" + this._gameTime + "\t" + TimeUtils.printTime);
        GameDispatcher.send(BaseEvent.MATCH_INFO_CHANGE);
    }

    public get gameTime(): number {
        return this._gameTime;
    }

    public set gameTime(v: number) {
        this._gameTime = v;
    }

    public set gameInfo(value: Object) {
        // this._gameInfo.setData(value);
        if (!this._lastBetInfo) {
            var vo: MatchInfoVo = new MatchInfoVo(value);
            this._lastBetInfo = vo;
        }
        this.user.money = this._lastBetInfo.info.acctAmount;
        this._gameTime = this._lastBetInfo.info.leftTime;

        GameDispatcher.send(BaseEvent.GAME_STATE_INFO);
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
                okFun = InterfaceManager.instance.native.recharge;
                break;
            case 2:
                txt = LanguageConfig.instance.getLanguage("您已断开连接，请刷新");
                okFun = InterfaceManager.instance.native.closeApp;
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

    public closeAlert(key: boolean = false): void {
        WindowManager.instance.close(Alert);
        GameDispatcher.send(GameEvent.WINDOW_EVENT);
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

    public initGameSprite(drawid: number): Array<any> {
        //create a temperary seq of horses in state instead of server supply
        var stateArr: Array<number> = [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        var stateIndexArr: Array<number> = [];
        var temp: number;
        this._phaseList = [];
        let str: string = new md5().hex_md5(this.lastBetInfo.info.drawId);
        for (var i: number = 0; i < 5; i++) {
            // console.log("id:" + this.lastBetInfo.horseInfoList[i].id + "\t rank:" + this.lastBetInfo.horseInfoList[i].rank);

            if (this.lastBetInfo.horseInfoList[i].rank == 1) {
                temp = 9;   //设置第一名的到达为0
            } else {
                let key: number = parseInt(str.substr(i, 1));
                if (key > 5) {
                    temp += 1;
                } else {
                    temp += 2;
                }
            }
            stateIndexArr.push(stateArr[temp]);
            let arr = RoadMethod.instance.creatRoad(drawid, this.horseList[this.lastBetInfo.horseInfoList[i].id - 1].getDataVo<HorseVo>(HorseVo), stateArr[temp])
            this._phaseList.push(arr);
            // stateArr.splice(temp, 1);
            this.horseList[this.lastBetInfo.horseInfoList[i].id - 1].roadList = arr;
            // console.log("id:" + this.horseList[this.lastBetInfo.horseInfoList[i].id - 1].getDataVo<HorseVo>(HorseVo).id + "\t rank:" + stateArr[temp]);
        }
        return this._phaseList;
    }

    public testIndex(): void {
        var testIndexArr: Array<number> = [4, 1, 5, 2, 3];
        var stateArr: Array<number> = [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        var stateIndexArr: Array<number> = [0, 0, 0, 0, 0];
        var temp: number;
        //名次从1到5循环
        for (var i: number = 1; i <= 5; i++) {
            //马依次找对应名次状态
            for (var j: number = 1; j <= 5; j++) {
                if (testIndexArr[j - 1] != i) {
                    continue;
                }
                console.log("enter index:" + j);
                //第一名及第二名的速度必须要在前9个状态中找,保证固定时间，前两名结果展示出来
                if (i == 1 || i == 2) {
                    temp = Math.floor(Math.random() * 4.5);
                }
                //后面名次只需保证状态比前一个的状态值靠后即可
                else {
                    temp = Math.floor(Math.random() * (stateArr.length - 1.5 * (5 - i)));
                }
                console.log("      enter value:" + temp);
                stateIndexArr[j - 1] = stateArr[temp];
                stateArr.splice(0, temp + 1);
                console.log("stateArr:");
                for (var mm: number = 0; mm < stateArr.length; mm++) {
                    console.log("index:" + mm + "value:" + stateArr[mm]);
                }
            }
        }
        console.log(stateIndexArr);
        for (var i: number = 0; i < stateIndexArr.length; i++) {
            console.log("stateIndexArr:" + (i + 1).toString() + "value is:" + stateIndexArr[i]);
        }
    }

    public set enterStateTime(value: number) {
        this._enterStateTime = value;
    }

    public get enterStateTime(): number {
        return this._enterStateTime;
    }

    public get phaseList(): Array<Array<RoadVo>> {
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

    public resetRoadPastLenth(): void {
        this._roadPastLength = 0;
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

    public setBetReslut(data: any): void {
        if (data.acctAmount) {
            this.user.money = data.acctAmount;
        }
        if (data.rtnCode == 0) {
            // console.log("下注成功");
        }
        this._betOperation = data;
        GameDispatcher.send(BaseEvent.BET_OPERATION_RESULT);
    }

    public setCancelResult(data: any): void {
        this.user.money = data.acctAmount;
        GameDispatcher.send(BaseEvent.BET_OPERATION_RESULT);
        this._betCancel = data;
        GameDispatcher.send(BaseEvent.BET_CANCEL);
    }

    public get betOperation(): any {
        return this._betOperation;
    }

    public get betCancel(): any {
        return this._betCancel;
    }


    public set first(v: HorseEntity) {
        this._first = v;
        if (v != null) {
            GameDispatcher.send(BaseEvent.REACH_END_LINE);
        }
    }

    public get first(): HorseEntity {
        return this._first;
    }

    public setDrawHistory(data: any): void {
        // this._awardMoney = data;
        // GameDispatcher.send(BaseEvent.DRAW_RESULT)
    }

    public setBethistory(data: any): void {
        this._betHistory = [];
        data.betList.forEach(element => {
            this._betHistory.push(new BetHistoryInfoVo(element));
        });
        GameDispatcher.send(BaseEvent.BET_HISTORY)
    }

    public setResult(data: any): void {
        this._resultInfo = data;
        GameDispatcher.send(BaseEvent.DRAW_RESULT)
    }

    public setHorseInfo(data: any): void {
        data.matchInfo.forEach(element => {
            this._horseInfo.push(new MatchPlayerVo(element));
        });
        GameDispatcher.send(BaseEvent.HORSE_INFO_EVENT);
    }

    public get horseInfo(): Array<MatchPlayerVo> {
        return this._horseInfo;
    }

    public get betHistory(): Array<BetHistoryInfoVo> {
        return this._betHistory;
    }

    public get resultInfo(): any {
        return this._resultInfo;
    }
}
