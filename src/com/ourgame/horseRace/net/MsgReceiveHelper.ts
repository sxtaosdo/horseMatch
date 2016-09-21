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
    public onMessage(type: any, body?: any): void {
        var msg: any = MsgReceiveHelper.instance.msg;
        var cls: any;
        if (body.rtnCode == 0) {//正常返回
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
                case "login":
                    if (body.rtnCode == 0) {
                        GameDispatcher.send(BaseEvent.LOGIN_RESULT_EVENT);
                        ConnectionManager.instance.sendHelper.gameInfo();
                    } else {
                        ClientModel.instance.openAlert("登陆失败，请重试");
                    }
                    break;
                case "init":
                    ClientModel.instance.gameInfo = body;
                    break;
                case "draw":
                    ClientModel.instance.setBetInfo(body.drawId, body);
                    break;
                case "drawResult":
                    ClientModel.instance.setHistory(body);
                    break;
            }
        } else {    //异常返回
            ClientModel.instance.openAlert(body.rtnMsg + "(ERROR CDOE:" + body.rtnCode + ")");
            console.log(body);
        }
    }
}
