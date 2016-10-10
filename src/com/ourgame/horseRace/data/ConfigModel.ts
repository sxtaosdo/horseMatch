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
    /**准备时间 */
    private _prepareTime: number;
    /**奔跑时间 */
    private _runTime: number;
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
        this._nextTime = data.nextTime;
        this._betTime = data.betTime;
        this._runTime = data.runTime;
        this._showTest = data.showTest;
        console.log("配置文件:" + this._version);
        if (data.debug) {
            this._debug = data.debug;
            UserModel.instance.token = "080110F2DC9DBF051A013022F003F34275EE31D8DFE622750128FA6CF4EB7142520ADECEB3A547FA78FB5975330B9A60E7BA76D2A60C28815F3D64ECA6A25D62F6EE0F31748384D193240EBED672C51FBC9090B6226B743BF03CF1920467D28E1E7414AB5148131BE02B5E67F5CBB800A584B43A8E704BCA590FA0DAD8C2E539C809D38598C583C5474E905846ED22C4E0CBF22837C73743DE1AA7CF38B20263FD27BF8CEE023BFC85A1D0F8C22D7B60D5717314427E84D193240EBED672C51FBC9090B6226B743BF03CF19204670D36A4438D6D45D7EC54BD165144C6674DCE13F39DBC11455EBBF168421A64917CBAE3B13D04A8EF0AAFD301C1713D0480594270407660A541249EE03A143E5131A3450CC0103EE15692F6367C681AAB0830D9F071D5EC338EF88D9628A1EDE4ADD75F4ACE7BCF4791F142F15C620F087C72F0C4F0A332609920A1D829CB913ABB7A6A46735E706B6E86C26B9376B4731D561F4333B7716D00EEFE5E150CB866C334589F482597C2B51CC049B17FD7831833F19345C49ED853C0F2F0C9DAA8C9EC9C82FD9EE467802DB6471150808421305A1F5CA8FE970385CC58459E25D4D8DB3B44CB9721CC71C037264535F9AAC8E4B2DD9E5620AAED69D572916725E2E64081335C09405295014CA3BB019CD09A7C136E0615A0F564B3A441781C22A08C8542EB6DA43FDE97A93AE4E4E0721B8D";
            if (this._debug) {
                this._isShowLogin = true;
            }
            console.log("debug模式:" + this._debug);
        }
        this.horseData(RES.getRes("horse_json"));
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

    public get runTime(): number {
        return this._runTime;
    }

    public get nextTime(): number {
        return this._nextTime;
    }

    public get horseList(): Array<HorseVo> {
        return this._horseList;
    }

}
