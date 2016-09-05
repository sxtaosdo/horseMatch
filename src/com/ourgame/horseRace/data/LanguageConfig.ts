/**
 *
 * @author sxt
 *
 */
class LanguageConfig {
    private static _instance: LanguageConfig;
    private dic:Object;
    
    public static get instance(): LanguageConfig{
        if(this._instance==null){
            this._instance=new LanguageConfig();
        }
        return this._instance;
    }
    
	public constructor() {
        this.dic=new Object();
	}
	
    public parse(lang: string): void {
        var temp: Array<string> = lang.split("\r\n");
        var data: string;
        var temp2:Array<string>;
        for(data in temp){
            if(temp[data]!=""){
                temp2 = temp[data].split("\t");
                this.dic[temp2[0]] = temp2[1];
            }
        }
        GameDispatcher.send(GameEvent.LANGUAGE_INIT_COMPLETE_EVENT);
    }
    
    /**
     * 获得本地语言，否则返回中文
     */ 
    public getLanguage(key:string):string{
        if(this.dic[key]!=null){
            return this.dic[key];
        }
        return key;
    }
}
