/**
* @author sxt
*/
class UserModel {

    private static _instance: UserModel;

    private _userName: string = "";
    private _roleName: string = "";
    private _nickName: string = "";
    private _money: number = 0;
    private _token: string = "";
    private _isAnteVoChange: boolean = false;
    private _JSESSIONID: string;

    public constructor() {
    }

    public static get instance(): UserModel {
        if (this._instance == null) {
            this._instance = new UserModel();
        }
        return this._instance;
    }

    public get token(): string {
        return this._token;
    }

    public set token(value: string) {
        this._token = value;
    }

    public get userName(): string {
        return this._userName;
    }

    public set userName(value: string) {
        this._userName = value;
    }

    public get roleName(): string {
        return this._roleName;
    }

    public set roleName(value: string) {
        this._roleName = value;
    }

    public get nickName(): string {
        return this._nickName;
    }

    public set nickName(value: string) {
        this._nickName = value;
    }

    public get JSESSIONID(): string {
        return this._JSESSIONID;
    }

    public set JSESSIONID(value: string) {
        this._JSESSIONID = value;
    }

    public get money(): number {
        return this._money;
    }

    public set money(value: number) {
        this._money = value;
        GameDispatcher.send(BaseEvent.USER_MOENY_CHANGE);
    }

    public isEnough(moeny: number): boolean {
        if (this.money < moeny) {
            return false;
        }
        return true;
    }


}
