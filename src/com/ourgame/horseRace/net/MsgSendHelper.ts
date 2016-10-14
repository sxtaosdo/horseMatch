/**
 * @author  sxt
 */
class MsgSendHelper {
    private static _instance: MsgSendHelper;

    private clientModel: ClientModel = ClientModel.instance;
    private userModel: UserModel = UserModel.instance;
    private _message: any;
    private _sender: any;
    private static instance: MsgSendHelper;
    private sendTime: any;
    private requestInterval: number = 0;

    public constructor(message: any) {
        MsgSendHelper.instance = this;
        this._message = message;
        this.sendTime = {};
    }

    public sender(value: any): void {
        this._sender = value;
    }

    public get msg(): any {
        return this._message;
    }

    public login(): void {
        // ConnectionManager.instance.send(MsgType.R_DICE_INFO, {});
    }

    public gameInfo(): void {//这个消息感觉有点不合理，仅作请求用户金币消息，待该消息返回再请求一次/hrb/draw
        ConnectionManager.instance.send("/hrb/init");
    }

    private isCanSend(key: string): boolean {
        if (this.sendTime[key]) {
            if (egret.getTimer() - this.sendTime[key] > this.requestInterval) {
                ConnectionManager.instance.send(key, null);
            }
        }
        return true;
    }

    public drawMatch(data?: any): void {
        if (this.isCanSend("/hrb/draw")) {
            ConnectionManager.instance.send("/hrb/draw");
        }
    }

    public history(data?: any): void {
        ConnectionManager.instance.send("/hrb/drawHist");
    }

    public bet(data: string): void {
        var jsondata = "{\"drawId\" : \"" + ClientModel.instance.lastBetInfo.info.drawId + "\",\"playId\" : \"1\",\"betInfo\" : \"" + data + "\"}"
        ConnectionManager.instance.send("/hrb/bet", jsondata);
    }

    public cancel(): void {
        var jsondata = "{\"drawId\" : \"" + ClientModel.instance.lastBetInfo.info.drawId + "\",\"playId\" : \"1\"}";
        ConnectionManager.instance.send("/hrb/cancel", jsondata);
    }

    public myBetHistory(): void {
        ConnectionManager.instance.send("/hrb/betHist");
    }

    public matchResult(): void {
        ConnectionManager.instance.send("/hrb/drawResult");
    }
}
