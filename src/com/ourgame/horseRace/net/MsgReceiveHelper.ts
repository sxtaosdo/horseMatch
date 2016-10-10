/**
* @author  sxt
*/
class MsgReceiveHelper extends egret.HashObject {
    public name: string = "MsgReceiveHelper";
    private static instance: MsgReceiveHelper;

    private clientModel: ClientModel;
    private userModel: UserModel;
    private _message: any;
    private _sender: any;

    public constructor(message: any) {
        super();
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
        // console.log("in onMessage:\ntype:" + type + "\nbody:" + body + "\t" + TimeUtils.printTime);
        var msg: any = MsgReceiveHelper.instance.msg;
        var cls: any;

        if ((body.rtnCode == 0) || (body.rtnCode == -301)) {//正常返回
            switch (type) {
                case "login":
                    if (body.rtnCode == 0) {
                        GameDispatcher.send(BaseEvent.LOGIN_RESULT_EVENT);
                        console.log("收到登陆成功消息：" + egret.getTimer());
                        ConnectionManager.instance.sendHelper.gameInfo();
                    }
                    break;
                case "init":
                    ClientModel.instance.gameInfo = body;
                    break;
                case "draw":
                    ClientModel.instance.setBetInfo(body);
                    break;
                case "drawHist":
                    ClientModel.instance.setHistory(body);
                    break;
                case "bet":
                    ClientModel.instance.setBetReslut(body);
                    break;
                case "cancel":
                    ClientModel.instance.setCancelResult(body);
                    break;
                case "drawHist":
                    ClientModel.instance.setDrawHistory(body);
                    break;
                case "betHist":
                    ClientModel.instance.setBethistory(body);
                    break;
            }
        } else {    //异常返回
            ClientModel.instance.openAlert(body.rtnMsg + "(ERROR CDOE:" + body.rtnCode + ")");
        }
        // console.log(body + "\t\n=========================>" + egret.getTimer());
    }
}
