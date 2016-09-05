/**
* @author  sxt
*/
class MsgReceiveHelper {
    private static instance: MsgReceiveHelper;

    private clientModel: ClientModel;
    private userModel: UserModel;
    private _message: any;
    private _sender: any;

    public constructor(message: any) {
        MsgReceiveHelper.instance = this;
        this._message = message;
        this.userModel = UserModel.instance;
        this.clientModel = ClientModel.instance;
    }

    public get msg(): any {
        return this._message;
    }
    public sender(value: any): void {
        this._sender = value;
    }

    /**
     * 数据处理，反序列化
     */
    public onMessage(type: number, body?: any): void {
        var msg: any = MsgReceiveHelper.instance.msg;
        var cls: any;
        switch (type) {
            case 1:
                //心跳
                cls = msg.build("DuxLiveTick");
                var tick = cls.decode(body.buffer);
                var temp: number = parseInt(tick.time);
                break;
            case MsgType.GLFS_PeriodChangeACK:
                // HallClientModel.instance.onGoResult(body);
                break;
            case MsgType.A_DICE_INFO:
                // HallClientModel.instance.onDiceInfo(body);
                break;
            case MsgType.A_LOGIN:
                GameDispatcher.send(BaseEvent.LOGIN_RESULT_EVENT);
                break;
            case MsgType.A_GAME_POOL:
            // HallClientModel.instance.onPool(body.value);
        }
    }
}
