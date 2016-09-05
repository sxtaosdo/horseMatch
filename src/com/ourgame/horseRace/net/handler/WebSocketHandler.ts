/**
 *
 * @author  sxt
 *
 */
class WebSocketHandler implements ISocket {
    private socket: egret.WebSocket;
    private message: any;
    private callback: Function;
    private manager: any;

    public constructor(callback?: Function, manager?: any) {
        this.callback = callback;
        this.manager = manager;
        this.socket = new egret.WebSocket();
        //设置数据格式为二进制，默认为字符串
        this.socket.type = egret.WebSocket.TYPE_BINARY;
        //添加收到数据侦听，收到数据会调用此方法
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        //添加链接打开侦听，连接成功会调用此方法
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        //添加异常侦听，出现异常会调用此方法
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    }

    public conn(ip: string, port: number): void {
        console.log("配置文件中服务器ip与端口：" + ip);
        this.socket.connectByUrl(ip);//"ws://172.28.26.138:6001/websocket"
    }

    public send(type: number, byts: any): void {
        var data: egret.ByteArray = new egret.ByteArray();
        data.writeInt(type);
        data.writeInt(byts.byteLength);
        data.writeInt(0);
        data.writeBytes(new egret.ByteArray(byts));
        data.position = 0;
        this.socket.writeBytes(data, 0, data.bytesAvailable);
        this.socket.flush();
        // console.log("消息发送成功，type:" + type + ",消息体长度" + byts.byteLength);
    }

    private onReceiveMessage(data: ProgressEvent): void {
        //消息头
        var byte: egret.ByteArray = new egret.ByteArray();
        this.socket.readBytes(byte);

        if (byte.bytesAvailable > 0) {
            if (this.callback != null) {
                var id: number = byte.readInt();
                var len: number = byte.readInt();
                var temp: number = byte.readInt();
                //消息体
                var body: egret.ByteArray = new egret.ByteArray();
                body.writeBytes(byte, byte.position, len);
                body.position = 0;
                this.callback(id, body);
            }
        } else {
            console.error("非法消息。可用字节：" + byte.bytesAvailable + "/长度：" + byte.length + "/指针位置：" + byte.position);
        }
    }

    private onSocketOpen(data?: any): void {
        console.log("onSocketOpen");
        if (ConfigModel.instance.isShowLogin == false) {
            ClientModel.instance.onConn();
            ConnectionManager.instance.onConnSuccess();
        }
        var temp: egret.ByteArray = new egret.ByteArray();
        if (ConfigModel.instance.debug) {
            temp.writeUTF("172.28.14.209");
            temp.writeInt(7777);
            temp.writeBoolean(true);
            this.socket.writeBytes(temp, 0, temp.bytesAvailable);
            this.socket.flush();
        }
    }

    private onSocketClose(data?: any): void {
        console.warn("onSocketClose");
        this.manager.onClose("onSocketClose");
        if (ConnectionManager.instance.isActiveClose == false) {
            ConnectionManager.instance.autoConnction();
        }
    }

    private onSocketError(data?: any): void {
        console.error("onSocketError");
        this.manager.onClose("onSocketError");
    }

    public isConnected(): boolean {
        return this.socket.connected;
    }

    public close(): void {
        this.socket.close();
    }

}
