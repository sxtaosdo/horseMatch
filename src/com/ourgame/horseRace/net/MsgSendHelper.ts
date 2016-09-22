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

    public constructor(message: any) {
        MsgSendHelper.instance = this;
        this._message = message;
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

    public drawMatch(data?: number): void {
        ConnectionManager.instance.send("/hrb/draw");
    }

    public history(data?: any): void {
        ConnectionManager.instance.send("/hrb/drawResult");
    }
}
