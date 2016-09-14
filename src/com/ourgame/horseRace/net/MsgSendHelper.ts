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

    // /**步步为营go按钮 */
    // public diceGo(): void {
    //     ConnectionManager.instance.send(MsgType.GLFS_Ping, {});
    // }

    public gameInfo():void{
        ConnectionManager.instance.send(MsgType.GLFS_Ping, {});
    }
}
