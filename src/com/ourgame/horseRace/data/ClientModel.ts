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
     * 用户渠道
     */
    private _channel: string;
    /**
     * 客户端类型(0:web,1:phone)
     */
    private _clientType: number;

    public constructor() {
        this.user = UserModel.instance;
        this.moneyType = "0";
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
        if (egret.Capabilities.isMobile) {
            console.log("native support版本：" + egret.Capabilities.supportVersion);
        }
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {//WEB环境
            var url = window.document.location.href.toString();
            console.log("浏览器地址：" + url);
            UserModel.instance.userName = decodeURI(egret.getOption("userName").toString());
            UserModel.instance.roleName = decodeURI(egret.getOption("roleName"));
            UserModel.instance.nickName = decodeURI(egret.getOption("nickName"));
            UserModel.instance.ticket = (egret.getOption("ticket"));
            this.channel = egret.getOption("channel");
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

    public get channel(): string {
        return this._channel;
    }

    public set channel(value: string) {
        this._channel = value;
    }

    public get language(): string {
        return this._language;
    }

    public set language(value: string) {
        this._language = value;
    }

    public get clientType(): number {
        return this._clientType;
    }

    public set clientType(value: number) {
        this._clientType = value;
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

}
