/**
 * 本地测试
 * @author sxt
 */
class LocalHandler implements ISocket {
    private static MAX_CARDS: number = 5;
    public static that: LocalHandler;
    private message: any;
    private tempCls: any;
    private callback: Function;

    //================================
    private userMoney: number = 888999777;
    private baseAnte: number = 0;
    private batTimes: number = 0;
    private pool: number = 9589000001;
    private awardMoney: number = 0;
    private name: string = "";

    //====================================

    public constructor(callback?: Function) {
        LocalHandler.that = this;
        this.callback = callback;

        this.initInfo();
    }

    private initInfo(): void {
    }

    public isConnected(): boolean {
        return true;
    }

    public close(): void {

    }

    public send(type: number, body: any): void {
        var callback: Function;
        switch (type) {
            case MsgType.GLFS_AddSbsLeftTimesACK:
                callback = this.login;
                break;
            case MsgType.GLFS_Ping:
                // callback = this.onDiceGo;
                break;
            case MsgType.R_DICE_INFO:
                // callback = this.onDiceInfo;
                break;
            case MsgType.R_LOGIN:LoginView
                callback = this.login;
                break;
        }
        // try {
        callback.apply(this, [type, body]);
        // } catch (e) {
        //     console.error("Local本地处理失败" + e);
        // }
    }

    public conn(ip: string, port: number): void {

    }

    private returnMsg(type: number, body: any): void {
        if (LocalHandler.that.callback != null) {
            var temp: egret.ByteArray = new egret.ByteArray();
            temp.buffer = body.toArrayBuffer();
            LocalHandler.that.callback(type, temp);
        }
    }

    private returnMsg2(type: number, body: any): void {
        if (LocalHandler.that.callback != null) {
            LocalHandler.that.callback(type, body);
        }
    }

    private login(type: number, body: any): void {
        // LocalHandler.that.tempCls = LocalHandler.that.message.build("ReqLogin");
        // var login = LocalHandler.that.tempCls.decode(body);

        // var reqCls: any = LocalHandler.that.message.build("AckLogin");
        // var req = new reqCls({
        //     "result": 0,
        //     "reason": 0,
        //     "userMoney": LocalHandler.that.userMoney,
        //     "username": login.userName,
        //     "rolename": login.userName,
        //     "freeInfo": LocalHandler.that.getFreeHit()
        // });
        this.name = body.name;
        this.returnMsg2(MsgType.A_LOGIN, { success: 0 });
        this.jpPool();
        TimerManager.instance.doLoop(1500, this.jpPool, this);
    }

    private jpPool(): void {
        this.pool += RandomUtil.randInt(5, 99);
        this.returnMsg2(MsgType.A_GAME_POOL, { value: this.pool });
    }

}
