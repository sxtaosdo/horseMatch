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

	/**
	 * 请求登陆
	 */
    public login(): number {
        // if (ConnectionManager.CONN_TYPE == 2) {
        //     if (!ConnectionManager.instance.isConnected) {
        //         return 1;
        //     }
        // }
        // var login_class = MsgSendHelper.instance.msg.build("ReqLogin");
        // var userId: egret.ByteArray = new egret.ByteArray();
        // var login: any = new login_class({
        //     "roleName": UserModel.instance.roleName,
        //     "userName": UserModel.instance.userName,
        //     "nikeName": UserModel.instance.nickName,
        //     "ticket": UserModel.instance.ticket,
        //     "channel": ClientModel.instance.channel,
        //     "clientType": 0//ClientModel.instance.clientType
        // });

        // var byts: ArrayBuffer = login.toArrayBuffer();
        // ConnectionManager.instance.send(MsgType.REQ_LOGIN, byts);
        ConnectionManager.instance.send(MsgType.R_LOGIN, { name: UserModel.instance.userName });
        return 2;
    }

    public diceInfo(): void {
        ConnectionManager.instance.send(MsgType.R_DICE_INFO, {});
    }

    /**步步为营go按钮 */
    public diceGo(): void {
        ConnectionManager.instance.send(MsgType.GLFS_Ping, {});
    }
}
