/**
 * 加载进度
 */
class LoadingUI extends BaseComponent implements IBase {

    private static _instance: LoadingUI;
    private static tipList: Array<string> = ["抵制不良游戏，拒绝盗版游戏", "注意自我保护，谨防受骗上当", "适度游戏益脑，沉迷游戏伤身", "合理安排时间，享受健康生活"];
    /**基本资源 */
    public static assets1: Array<any> = ["config", "alert", "top", "betView", "main", "fish1", "db", "bg", "window", "font"];
    /**主场景 */
    // public static assets2: Array<any> = ["fish", "player", "bg", "bgPlant", "fish1", "jpBar", "shell", "path", "main"];
    /**步步为营 */
    // public static assets3: Array<any> = ["dice", "diceWindow"];

    private versionText: eui.Label;
    private bar: eui.ProgressBar;
    private tipText: eui.Label;
    private tempText: eui.Label;
    private current: number = 0;
    private callBack: Function;

    private total: number = 0;
    private assetsList: Array<any>;

    private spBg: egret.Sprite;
    private spMask: egret.Sprite;
    private headImage: egret.Bitmap;
    private headMask: egret.Sprite;

    public constructor() {
        super();

        this.spBg = new egret.Sprite();
        this.spBg.graphics.beginFill(0x00ff00)
        this.spBg.graphics.drawCircle(100, 100, 100);
        this.spBg.graphics.endFill();
        this.spBg.width = 200;
        this.spBg.height = 200;
        this.addChild(this.spBg);

        this.headMask = new egret.Sprite();
        this.headMask.graphics.beginFill(0x00ff00)
        this.headMask.graphics.drawCircle(100, 100, 100);
        this.headMask.graphics.endFill();
        this.headMask.width = 200;
        this.headMask.height = 200;
        this.addChild(this.headMask);

        this.spMask = new egret.Sprite();
        this.spMask.graphics.beginFill(0x00ff00)
        this.spMask.graphics.drawRect(0, 0, 200, 200);
        this.spMask.graphics.endFill();
        this.spMask.width = 200;
        this.spMask.height = 200;
        this.addChild(this.spMask);
        this.spBg.mask = this.spMask;

        RES.getResAsync("loaderHead_png", this.headComplete, this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.onSkinComplete, this);
        this.enter("resource/game_skins/LoadSkin.exml");
    }

    private headComplete(): void {
        this.headImage = BitMapUtil.createBitmapByName("loaderHead_png");
        // this.headImage.x = (this.width = this.headImage.width) >> 1;
        // this.headImage.y = (this.height = this.headImage.height) >> 1;
        this.spBg.addChild(this.headImage);
        this.addChild(this.headImage);
        if (this.spBg) {
            this.headImage.x = this.spBg.x;
            this.headImage.y = this.spBg.y;
            this.headImage.mask = this.headMask;
        }
    }

    protected createChildren() {
        super.createChildren();
    }

    public onSkinComplete(e): void {
        // LoadingUI.instance.removeEventListener(eui.UIEvent.COMPLETE, this.onSkinComplete, this);
        // super.onSkinComplete(e);
        this.skinLoaded = true;
        this.onConfigComplete();
        this.tempText.text = "当前加载进度：\n总进度：";
        this.spBg.x = (this.width - this.spBg.width) >> 1
        this.spBg.y = (this.height - this.spBg.height) >> 1

        this.headMask.x = this.spBg.x;
        this.headMask.y = this.spBg.y;

        if (this.headImage) {
            this.headImage.x = this.spBg.x;
            this.headImage.y = this.spBg.y;
            this.headImage.mask = this.headMask;
        }

        this.spMask.x = this.spBg.x;
        this.spMask.y = this.spBg.y + this.spBg.height;
    }

    public static get instance(): LoadingUI {
        if (LoadingUI._instance == null) {
            LoadingUI._instance = new LoadingUI();
        }
        return LoadingUI._instance;
    }

    /**
     * 统一加载所有的资源
     */
    public loadAssets(callBack: Function, list: Array<string>): void {
        if (callBack != null) {
            this.callBack = callBack;
            this.total = list.length;
            this.assetsList = list;
        }
        this.load();

    }

    private load(): void {
        if (LoadingUI.instance.assetsList.length > 0) {
            var groupName: string = LoadingUI.instance.assetsList.shift();
            // console.log("开始加载资源:" + groupName);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup(groupName);
            LoadingUI.instance.current++;
        } else {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            if (this.tempText) {
                this.tempText.text = "资源加载完毕！";
            }
            if (this.callBack != null) {
                this.callBack();
            }
            this.exit();
            ClientModel.instance.onAssetsComplete();
            // TimerManager.instance.doOnce(500, ClientModel.instance.onAssetsComplete, [this]);
        }
    }

    private onComplete(event: RES.ResourceEvent): void {
        LoadingUI.instance.load();
        if (event.groupName == "config") {
            ConfigModel.instance.parse(RES.getRes("game_json"));
        }
    }

    private onError(event: RES.ResourceEvent): void {
        console.error("加载资源遇到错误");
    }

    private onResourceProgress(event: RES.ResourceEvent): void {
        LoadingUI.instance.setProgress(event.itemsLoaded, event.itemsTotal);
    }

    public setProgress(current, total): void {
        if (LoadingUI.instance.tempText != null) {
            LoadingUI.instance.tempText.text = "当前加载进度：[" + Math.floor((current / total) * 100) + "/100]" + "\n总进度：" + "[" + LoadingUI.instance.current + "/" + LoadingUI.instance.total + "]";
        }
        if (LoadingUI.instance.bar) {
            LoadingUI.instance.bar.value = current;
            LoadingUI.instance.bar.maximum = total;
        }
        // this.spMask.y = -(this.spMask.height * (LoadingUI.instance.current / LoadingUI.instance.total));
        egret.Tween.removeTweens(this.spMask);
        egret.Tween.get(this.spMask).to({ y: (this.spBg.y + this.spBg.height) - (this.spMask.height * (LoadingUI.instance.current / LoadingUI.instance.total)) }, 500);
        // console.log(LoadingUI.instance.current + "/" + LoadingUI.instance.total + "=" + (LoadingUI.instance.current / LoadingUI.instance.total) + "\t" + this.spMask.y);

    }

    private onConfigComplete(evt?: any): void {
        if (this.versionText != null) {
            this.versionText.text = "程序版本：" + Main.VERSION + "\n配置文件：" + ConfigModel.instance.version;
        }
    }

    private changTip(target: LoadingUI): void {
        // if (target.tipText != null) {
        //     target.tipText.text = LoadingUI.tipList[parseInt((Math.random() * LoadingUI.tipList.length) + "")];
        // }
    }

    public enter(data?: any): void {
        // LoadingUI.instance.skinLoaded = false;
        this.skinName = data;
        GameDispatcher.addEventListener(GameEvent.CONFIG_INIT_COMPLETE_EVENT, this.onConfigComplete, this);
        this.changTip(this);
        TimerManager.instance.doLoop(2000, this.changTip, this);
    }

    public exit(data?: any): void {
        TimerManager.instance.clearTimer(this.changTip);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        GameDispatcher.instance.removeEventListener(GameEvent.CONFIG_INIT_COMPLETE_EVENT, this.onConfigComplete, this);
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }

    public execute(data?: any): void {

    }

}
