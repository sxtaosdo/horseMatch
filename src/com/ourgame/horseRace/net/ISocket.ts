/**
 *
 * @author 
 *
 */
interface ISocket {
    conn(ip: string, port: number): void;

    send(type: any, byts?: any): void;

    isConnected(): boolean;

    close(): void;

}
