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
        this._token = "080110F1AD83BF051A013022F00398533BCCCA089DE3E277E0EA4BE17F6E303A3F3DCA30E5C85AE2FAB93911B8DC46E0248968A044F2AA4C9DF736EC5F645D529598C06AD48AEF4D9C4B512DF7649C2B31F9C196AAFB4ECE9F08E232146CD487C6E82F5AB4444B0903CD2C34DB4DED3A61CCD080F3FE745216CB4CF55AA8BD63FB8C085D85B4DA03425E1E29EAA3D33BE341169EF1F77596C501631FA3D80A12E0F398DD80F677EB86BB80D71DE421EB7D9C3FE72125EF4D9C4B512DF7649C2B31F9C196AAFB4ECE9F08E232146C49A524253034A802EE2A9C7871C5DC408CB3FFB85E62452BF5DC95A4ED9117299B03776C99DB5002CA5DA5E0C98DC816603F284EC6997DB085C379A0B95CEC797711F4832A563AA5B5C7943D133D1DAA25A58E612EF9379BB327D9FE803D95883517A8F426DEE45297364AAD5CE5F8C2AFC3E0E341017F32E5AAEAF4AECB3703AF09DBE6E93E5AA40177C9BA103977E2BB3B90ACDEB2839296BF21E9DB9849F4425AA559598F69B7DE01B69D5E2E67746DEA5E6E6B07776DCA59624F738C7B15F4E47050ED29FB8DBF758B13FE8D7ACDFA95A22F98B7B88C67711985227B86D83D73754A0F2C785CDBBED3813B0DF31DFD7625D357831B143D5F6E10EB3F4EC26DFEA04041D29004546D1BF246177ABFFB097EBB2DF59BA708318256CF54CAB4638A65F56DFB2351602E256056A0F13D";
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
