/**
 *
 * @author 
 *
 */
interface ISocket {
    conn(ip: string,port: number): void;
    
    send(type: number,byts: any): void;
    
    isConnected():boolean;
    
    close():void;

}
