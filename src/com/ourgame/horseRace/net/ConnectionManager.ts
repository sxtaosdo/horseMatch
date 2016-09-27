/**
 * @author sxt
 * 具体那种实现写在这里，对外提供统一的接口
 */
class ConnectionManager {

    private static _instance: ConnectionManager;
    /**
     * 连接类型
     */
    public CONN_TYPE: number = 1;
    /**
     * 重连间隔
     */
    public static CONN_INTERVAL: number = 2000;
    private byteData: egret.ByteArray;
    private ip: string;
    private port: number;
    private proto: any;
    /**
     * 当前重连次数
     */
    private connCount: number = 0;
    /**
     * 是否主动关闭
     */
    public isActiveClose: boolean = false;

    private socket: ISocket;
    private message: dcodeIO.ProtoBuf;

    private _sendHelper: MsgSendHelper;
    private _receiveHelper: MsgReceiveHelper;

    public constructor() {
        this.byteData = new egret.ByteArray();

        var temp = RES.getRes("PokerSlotsMessage_proto");
        // console.log(temp);
        // this.message = dcodeIO.ProtoBuf.loadProto(temp);

        this._sendHelper = new MsgSendHelper(this.message);
        this._receiveHelper = new MsgReceiveHelper(this.message);

        if (ConfigModel.instance.debug) {
            this.CONN_TYPE = 1;
        } else {
            this.CONN_TYPE = 4;
        }
        console.log("conn type:" + this.CONN_TYPE);

        switch (this.CONN_TYPE) {
            case 1://本地调试
                // this.socket = new LocalHandler(this._receiveHelper.onMessage);
                this.socket = new HttpService(this._receiveHelper.onMessage, this);
                break;
            case 2://白鹭官方websocket
                this.socket = new WebSocketHandler(this._receiveHelper.onMessage, this);
                break;
            case 3://socket.io  发布移动端的时候屏蔽掉，native环境暂时不支持socket.io
                this.socket = new SocketIoHandler(this._receiveHelper.onMessage, this);
                break;
            case 4://Http
                this.socket = new HttpHandler(this._receiveHelper.onMessage, this);
                break;
            case 5://Http
                this.socket = new HttpHandlerLoader(this._receiveHelper.onMessage, this);
                break;
        }
    }

    public static get instance(): ConnectionManager {
        if (this._instance == null) {
            this._instance = new ConnectionManager();
        }
        return this._instance;
    }

    public send(type: any, body?: any): void {
        this.socket.send(type, body);
    }

	/**
	 * "21g.lianzhong.com",22410
	 */
    public initData(ip: string, port: number): void {
        this.ip = ip;
        this.port = port;
        this.conn();
    }

    public conn(): void {
        ConnectionManager._instance.socket.conn(ConnectionManager._instance.ip, ConnectionManager._instance.port);
    }
    public onClose(data?: any): void {
        InterfaceManager.instance.onSocketClose(data);
    }

    public close(data?: any): void {
        this.socket.close();
    }

    public get isConnected(): boolean {
        return this.socket.isConnected();
    }

    public get sendHelper(): MsgSendHelper {
        return this._sendHelper;
    }

    public get receiveHelper(): MsgReceiveHelper {
        return this._receiveHelper;
    }

    public onConnSuccess(): void {
        ConnectionManager.instance.sendHelper.login();
    }

    public autoConnction(): void {
        TimerManager.instance.doOnce(ConnectionManager.CONN_INTERVAL * Math.pow(2, ConnectionManager.instance.connCount), ConnectionManager.instance.conn);
        ConnectionManager.instance.connCount++;
        console.log("自动重连，第" + ConnectionManager.instance.connCount + "次，\t" + TimeUtils.formatDate(TimeUtils.timestampDate()));
    }
}
