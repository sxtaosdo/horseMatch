/**
 * socket.oi 的实现
 * @author sxt
 *
 */
class SocketIoHandler implements ISocket{
    
    private socket: SocketIOClient.Socket
    private message: any;
    private callback: Function;
    private manager: any;
    
    public constructor(callback?: Function,manager?: any) {
        this.callback = callback;
        this.manager = manager;
	}
	
    public conn(ip: string,port: number): void {
        console.log("配置文件中服务器ip与端口：" + ip + ":" + port);
//        this.socket.connectByUrl("ws://172.28.26.138:7777/websocket");//        this.socket.connect(ip,port);
        this.socket = io.connect("ws://172.28.26.138:7777/websocket");
        this.init();
    }

    public send(type: number,byts: any): void {
        this.socket.emit("message",byts);
    }
    
    private init():void{
        this.socket.on("news",this.newMessage);
    }
    
    private newMessage(data?:any):void{
        console.log(data);
    }
    
    public isConnected(): boolean {
        return true;
    }

    public close(): void {

    }
}
