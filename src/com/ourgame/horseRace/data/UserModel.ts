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
        // this._token = "080110EF95D9BE051A013022B002CF18E1E6D6981DC79249724F8FEE8E07EBAEC5CA5724A05CFF657A7CE4C2EED9A0FD856F821CA7E281969A51331D544C91E254D2B6F8CCED6C499D59D5A9D484F32656B39FCCD4BCFE96C6D9A215F7F3D19A3870935B86BD3371088ED3CCCEF336036AE8C4FAB23EF0966061205EF2E28E9A13BA580337BCC26712A060044E7F6E0096C310D88200F5446344AA0763FC57BF6C479339C9EFDDD48F406854D2E845D9104C31797761C9C934491C08A5C36AA728528A8611C602AFC7C0C162037D625F70CF6C8C8A40376C3E12CF866F90F5959301848A8AE4B3450E49DAD29430E05B0149353873DC18D902876694D7011896377C6B40878756E63710AE2FA631716C86B625736C3891208753F0DEEF315F42BA1273A32D3F932EFC3A86D777892668A4A023E4A5C80F3F14C11EC76DC7";
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


}
