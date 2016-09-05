interface IBaseGameEntity {
    sid:string;

	entityType:number;

    isDestroy:boolean;

    update(): void;
    
    handleMessage(msg: Telegram): boolean;

    getFSM(): StateMachine;

	getDisplayObject():egret.DisplayObject;

    getDataVo<T>(clazz:any);
}