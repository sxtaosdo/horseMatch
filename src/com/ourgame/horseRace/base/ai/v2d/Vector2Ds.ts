class Vector2Ds {
	public static clockwise: number = 1;
	public static anticlockwise: number = -1;

	public x: number;
	public y: number;


	public constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	public zero(): void {
		this.x = 0;
		this.y = 0;
	}

	/**
	 * 返回向量的长度
	 */
	public length(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y)
	}

	public lengthSq(): number {
		return (this.x * this.x + this.y * this.y);
	}

	public dot(v: Vector2Ds): number {
		return this.x * v.x + this.y * v.y;
	}

	/**
	 * 返回正如果v2是顺时针这个向量,
	 * 负如果逆时针(这里假定的坐标系如平时所见为X轴是指向右侧，Y轴指向下方)
	 */
	public sign(v2: Vector2Ds): number {
		if (this.y * v2.x > this.x * v2.y) {
			return Vector2Ds.anticlockwise;
		}
		else {
			return Vector2Ds.clockwise;
		}
	}

	/**
	 * 返回垂直于该向量的向量
	 */
	public perp(): Vector2Ds {
		return new Vector2Ds(-this.y, this.x);
	}

	public distance(v2: Vector2Ds): number {
		var ySeparation: number = v2.y - this.y;
		var xSeparation: number = v2.x - this.x;
		return Math.sqrt(ySeparation * ySeparation + xSeparation * xSeparation);
	}

	public distanceSq(v2: Vector2Ds): number {
		var ySeparation: number = v2.y - this.y;
		var xSeparation: number = v2.x - this.x;
		return ySeparation * ySeparation + xSeparation * xSeparation;
	}

	/**将向量使其长度不超过最大 */
	public truncate(max: number): void {
		if (this.length() > max) {
			this.normalize();
			Vector2DOperator.vectorByNum(this, max);
		}
	}

	/**给定一个归一化的向量，该方法反映了它是经营的载体？。（就像一个从墙上跳下来的球的轨迹） */
	public reflect(norm: Vector2Ds): Vector2Ds {
		return Vector2DOperator.operatorAdd(this, Vector2DOperator.numByVector(2.0 * this.dot(norm), norm.getReverse()));
	}

	/**返回此向量的逆的向量 */
	public getReverse(): Vector2Ds {
		return new Vector2Ds(-this.x, -this.y);
	}

	/**归一化向量？ 将当前向量转化成单位向量?*/
	public normalize(): void {
		var vector_length: number = this.length();

		if (vector_length > Vector2DOperator.epsilon)// 1值和最接近1值的差距
		{
			this.x /= vector_length;
			this.y /= vector_length;
		}
	}

	public vec2DNormalize(v: Vector2Ds): Vector2Ds {
		var vec: Vector2Ds = v;

		var vector_length: number = vec.length();

		if (vector_length > Vector2DOperator.epsilon)// 1值和最接近1值的差距
		{
			vec.x /= vector_length;
			vec.y /= vector_length;
		}

		return vec;
	}

	public vec2DDistance(v1: Vector2Ds, v2: Vector2Ds): number {
		var ySeparation: number = v2.y - v1.y;
		var xSeparation: number = v2.x - v1.x;
		return Math.sqrt(ySeparation * ySeparation + xSeparation * xSeparation);
	}

	public vec2DDistanceSq(v1: Vector2Ds, v2: Vector2Ds) {
		var ySeparation = v2.y - v1.y;
		var xSeparation = v2.x - v1.x;
		return ySeparation * ySeparation + xSeparation * xSeparation;
	}

	public vec2DLength(v: Vector2Ds): number {
		return Math.sqrt(v.x * v.x + v.y * v.y);
	}

	public vec2DLengthSq(v: Vector2Ds): number {
		return (v.x * v.x + v.y * v.y);
	}


	public POINTStoVector(p: egret.Point): Vector2Ds {
		return new Vector2Ds(p.x, p.y);
	}

	public POINTtoVector(p: egret.Point) {
		return new Vector2Ds(p.x, p.y);
	}

	public vectorToPOINTS(v: Vector2Ds) {
		var p: egret.Point;
		p.x = v.x;
		p.y = v.y;
		return p;
	}

	public vectorToPOINT(v: Vector2Ds) {
		var p: egret.Point;
		p.x = v.x;
		p.y = v.y;
		return p;
	}

	//------------------------------------------------------------------------operator overloads
	// inline Vector2Ds operator*(const Vector2Ds &lhs, double rhs)
	// {
	//   Vector2Ds result(lhs);
	//   result *= rhs;
	//   return result;
	// }

	// inline Vector2Ds operator*(double lhs, const Vector2Ds &rhs)
	// {
	//   Vector2Ds result(rhs);
	//   result *= lhs;
	//   return result;
	// }

	// //overload the - operator
	// inline Vector2Ds operator-(const Vector2Ds &lhs, const Vector2Ds &rhs)
	// {
	//   Vector2Ds result(lhs);
	//   result.x -= rhs.x;
	//   result.y -= rhs.y;

	//   return result;
	// }

	// //overload the + operator
	// inline Vector2Ds operator+(const Vector2Ds &lhs, const Vector2Ds &rhs)
	// {
	//   Vector2Ds result(lhs);
	//   result.x += rhs.x;
	//   result.y += rhs.y;

	//   return result;
	// }

	// //overload the / operator
	// inline Vector2Ds operator/(const Vector2Ds &lhs, double val)
	// {
	//   Vector2Ds result(lhs);
	//   result.x /= val;
	//   result.y /= val;

	//   return result;
	// }

	/**对待一个窗口为环形 */
	public wrapAround(pos: Vector2Ds, MaxX, MaxY) {
		if (pos.x > MaxX) { pos.x = 0.0; }
		if (pos.x < 0) { pos.x = MaxX; }
		if (pos.y < 0) { pos.y = MaxY; }
		if (pos.y > MaxY) { pos.y = 0.0; }
	}

	/**
	 * 返回true如果点P不在定义的top_left区域
	 */
	//and bot_rgt
	public notInsideRegion(p: Vector2Ds, top_left: Vector2Ds, bot_rgt: Vector2Ds): boolean {
		return (p.x < top_left.x) || (p.x > bot_rgt.x) ||
			(p.y < top_left.y) || (p.y > bot_rgt.y);
	}

	public insideRegion3(p: Vector2Ds, top_left: Vector2Ds, bot_rgt: Vector2Ds) {
		return !((p.x < top_left.x) || (p.x > bot_rgt.x) ||
			(p.y < top_left.y) || (p.y > bot_rgt.y));
	}

	public insideRegion5(p: Vector2Ds, left: number, top: number, right: number, bottom: number) {
		return !((p.x < left) || (p.x > right) || (p.y < top) || (p.y > bottom));
	}

	//------------------ isSecondInFOVOfFirst -------------------------------------
	//
	//  如果目标位置在实体的视图字段中，则返回真
	//  positioned at posFirst facing in facingFirst
	//-----------------------------------------------------------------------------
	public isSecondInFOVOfFirst(posFirst: Vector2Ds, facingFirst: Vector2Ds, posSecond: Vector2Ds, fov: number): boolean {
		var toTarget: Vector2Ds = this.vec2DNormalize(Vector2DOperator.operatorMinus(posSecond, posFirst));
		return facingFirst.dot(toTarget) >= Math.cos(fov / 2.0);
	}

	/**
    * 拷贝向量
    */
    public clone():Vector2Ds{
        return new Vector2Ds(this.x, this.y);
    }
}

class Vector2DOperator {

	/**+ */
	public static operatorAdd(lhs: Vector2Ds, rhs: Vector2Ds): Vector2Ds {
		lhs.x += rhs.x;
		lhs.y += rhs.y;
		return lhs;
	}

	/**- */
	public static operatorMinus(lhs: Vector2Ds, rhs: Vector2Ds): Vector2Ds {
		lhs.x -= rhs.x;
		lhs.y -= rhs.y;
		return lhs;
	}

	/** */
	public static get epsilon(): number {
		var n1: number = Number.MAX_VALUE - 1;
		var n2: number = Math.abs(1 + Number.MIN_VALUE);
		return Math.max(n1, n2);
	}

	/**数字*向量 */
	public static numByVector(lhs: number, rhs: Vector2Ds): Vector2Ds {
		rhs.x = rhs.x * lhs;
		rhs.y = rhs.y * lhs;
		return rhs;
	}

	/**向量*数字 */
	public static vectorByNum(lhs: Vector2Ds, rhs: number): Vector2Ds {
		lhs.x = lhs.x * rhs;
		lhs.y = lhs.y * rhs;
		return lhs;
	}
}