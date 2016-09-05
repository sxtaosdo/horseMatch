class HitTestUtils {

	/**基于矩形的碰撞检测*/
	public static hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject, exact: boolean = false): boolean {
		var rect1: egret.Rectangle = obj1.getBounds();
		var rect2: egret.Rectangle = obj2.getBounds();
		var key: boolean = false;
		rect1.x = obj1.x - obj1.anchorOffsetX;
		rect1.y = obj1.y - obj1.anchorOffsetY;
		rect2.x = obj2.x;
		rect2.y = obj2.y;
		egret.Rectangle.release(rect1);
		egret.Rectangle.release(rect2);

		if (obj2.parent) {
			(<egret.Sprite>obj2.parent).graphics.clear();
			(<egret.Sprite>obj2.parent).graphics.beginFill(0x000000, 0.5);
			(<egret.Sprite>obj2.parent).graphics.drawRect(rect2.x, rect2.y, rect2.width, rect2.height);
			(<egret.Sprite>obj2.parent).graphics.endFill();
		}
		if (obj1.parent) {
			(<egret.Sprite>obj2.parent).graphics.clear();
			(<egret.Sprite>obj2.parent).graphics.beginFill(0x000000, 0.5);
			(<egret.Sprite>obj2.parent).graphics.drawRect(rect1.x, rect1.y, rect1.width, rect1.height);
			(<egret.Sprite>obj2.parent).graphics.endFill();
		}

		key = rect1.intersects(rect2);
		if (exact) {

		} else {
			return key;
		}
	}

	public static hitTestByRec(r1: egret.Rectangle, r2: egret.Rectangle): boolean {
		return r1.intersects(r2);
	}



}