/**
* @author sxt
*/
class UserModel {

    private static _instance: UserModel;

    private _userName: string = "";
    private _roleName: string = "";
    private _nickName: string = "";
    private _money: number = 0;
    private _ticket: string;
    private _isAnteVoChange: boolean = false;

    public constructor() {
    }

    public static get instance(): UserModel {
        if (this._instance == null) {
            this._instance = new UserModel();
        }
        return this._instance;
    }

    public get ticket(): string {
        return this._ticket;
    }

    public set ticket(value: string) {
        this._ticket = value;
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

}
