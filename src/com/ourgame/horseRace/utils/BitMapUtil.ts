/**
 *
 * @author 
 *sxt
 */
class BitMapUtil {

    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
    */
    public static createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}

class MovieclipUtils {
    public static createMc(pngName: string, jsonName: string, key?: string): egret.MovieClip {
        var mc: egret.MovieClip;
        var js: any = RES.getRes(jsonName);
        var tx: any = RES.getRes(pngName);
        var data: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(js, tx);
        mc = new egret.MovieClip(data.generateMovieClipData(key));
        mc.stop();
        mc.play(-1);
        mc.touchEnabled = false;
        return mc;
    }

    public static getFactory(pngName: string, jsonName: string): egret.MovieClipDataFactory {
        var js: any = RES.getRes(jsonName);
        var tx: any = RES.getRes(pngName);
        var factory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(js, tx);
        return factory;
    }
}
