/**
 * @author 
 * sxt
 */
interface IState extends IBase {
    /**
     * 状态名称
     */
    // name:string;

    onMessage(entity: IBaseGameEntity, telegram: Telegram): boolean;

    enter(entity: IBaseGameEntity): void;

    execute(entity: IBaseGameEntity): void;

    exit(entity: IBaseGameEntity): void;


}


//  public onMessage(entity: IBaseGameEntity, telegram: Telegram): boolean{
//     return false;
// }

//     public enter(entity: IBaseGameEntity): void {

// }

//     public execute(entity: IBaseGameEntity): void {

// }

//     public exit(entity: IBaseGameEntity): void {

// }

