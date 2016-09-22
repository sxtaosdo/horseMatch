/**
 * 配置文件
 * @author sxt
 */
class ConfigModel {
    private static _instance: ConfigModel;

    private _version: string = "";
    private _debug: boolean = false;
    private _isShowLogin: boolean = false;
    private _showTest: boolean = false;

    /**下注时间 */
    private _betTime: number;
    /**结果时间 */
    // private _resultTime: number;
    /**准备时间 */
    private _prepareTime: number;
    /**距下一场比赛 */
    private _nextTime: number;
    /**url */
    private _url: string;

    private _horseList: Array<HorseVo>;

    public constructor() {
        this._horseList = new Array<HorseVo>();
    }

    public static get instance(): ConfigModel {
        if (this._instance == null) {
            this._instance = new ConfigModel();
        }
        return this._instance;
    }

    public parse(data: any): void {
        var value: any;
        this._version = data.version;
        this._url = data.url;
        this._prepareTime = data.prepareTime;
        this._showTest = data.showTest;
        this._betTime = data.betTime;
        // this._resultTime = data.resultTime;
        this._nextTime = data.nextTime;
        console.log("配置文件:" + this._version);
        if (data.debug) {
            this._debug = data.debug;
            if (this._debug) {
                this._isShowLogin = true;
            }
            console.log("debug模式:" + this._debug);
        }
        this.horseData(RES.getRes("horse_json"));
        ClientModel.instance.prepareTime = this._prepareTime;
        ClientModel.instance.betTime = this._betTime;
        // ClientModel.instance.resultTime = this._resultTime;
        ClientModel.instance.nextTime = this._nextTime;
        GameDispatcher.send(GameEvent.CONFIG_INIT_COMPLETE_EVENT);
    }

    private horseData(data: any): void {
        var key: any;
        for (key in data) {
            var vo: HorseVo = new HorseVo();
            vo.analysis(data[key]);
            this._horseList.push(vo);
        }
    }

    public get version(): string {
        return this._version;
    }
    public get url(): string {
        return this._url;
    }

    public get debug(): boolean {
        return this._debug;
    }

    public get isShowLogin(): boolean {
        return this._isShowLogin;
    }

    public get showTest(): boolean {
        return this._showTest;
    }

    public get betTime(): number {
        return this._betTime;
    }

    public get prepareTime(): number {
        return this._prepareTime;
    }

    public get nextTime(): number {
        return this._nextTime;
    }

    public get horseList(): Array<HorseVo> {
        return this._horseList;
    }

}
