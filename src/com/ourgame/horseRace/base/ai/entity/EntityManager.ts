/**
 *
 * @author 
 *
 */
class EntityManager {
    private static _instance: EntityManager;
    private _entityMap: Object;
    private _length: number = 0;

    public constructor() {
        this._entityMap = {};
    }

    public static get instance(): EntityManager {
        if (this._instance == null) {
            this._instance = new EntityManager();
        }
        return this._instance;
    }

    //this method stores a pointer to the entity in the std::vector
    //m_Entities at the index position indicated by the entity's ID
    //(makes for faster access)
    public registerEntity(newEntity: IBaseGameEntity): void {
        this._entityMap[newEntity.sid] = newEntity;
        // this.index++;
    }

    //returns a pointer to the entity with the ID given as a parameter
    public getEntityFromID(id: string): IBaseGameEntity {
        return this._entityMap[id];
    }

    //this method removes the entity from the list
    public removeEntity(entity: IBaseGameEntity): void {
        var key: any;
        for (key in this._entityMap) {
            if (this._entityMap[key] == entity) {
                delete this._entityMap[key];
            }
        }
    }

    /**
     * 获取所有智体
     */
    public getAllEntity(): Object {
        return this._entityMap;
    }

    /**
     * 获取一个可用的智体
     */
    public getAvailableEntity<T extends IBaseGameEntity>(clazz: any): T {
        var key: any;
        var availableEntity: T
        for (key in this._entityMap) {
            var entity: T = this._entityMap[key];
            // console.log(entity instanceof clazz);
            if (entity instanceof clazz) {
                if (entity != null) {
                    if (entity.isDestroy == true) {
                        availableEntity = entity;
                        return availableEntity;
                    }
                }
            }
        }
        availableEntity = this.createEntity<T>(clazz);
        return availableEntity;
    }

    /**
     * new一个智体
     */
    private createEntity<T extends IBaseGameEntity>(clazz: { new (): T }): T {
        var entity: T = new clazz();
        (<IBaseGameEntity>entity).isDestroy = false;
        // (<IBaseGameEntity>entity).entityType = EntityType.FISH;
        this.registerEntity(entity);
        this._length++;
        return entity;
    }

    /**
     * get length
     */
    public get length(): number {
        return this._length
    }
}
