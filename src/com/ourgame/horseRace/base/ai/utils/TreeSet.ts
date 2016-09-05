/**
 *
 * @author 
 *
 */
class TreeSet<T> {
    private list: Array<T>;

    public constructor() {
        this.list = new Array<T>();
    }

    public add(e: T): boolean {
        if(this.list.indexOf(e) > -1) {
            return false;
        } else {
            this.addElement(e);
            return true;
        }
    }

    public get isEmpty(): boolean {
        return this.list.length > 0 ? false : true;
    }

    public get size(): number {
        return this.list.length;
    }

    private SortedSet(): void {
        this.list.sort(this.compareFunction);
    }

    private compareFunction(a: T | ICompositor,b: T | ICompositor): number {
        if((<ICompositor>a).sortSerial > (<ICompositor>b).sortSerial) {
            return 1;
        } else if((<ICompositor>a).sortSerial < (<ICompositor>b).sortSerial) {
            return -1;
        } else {
            return 0
        }
    }

    public remove(e: T): void {
        this.list.splice(this.list.indexOf(e),1);
        this.SortedSet();
    }

    public get first(): T {
        return this.list[0];
    }

    public get last(): T {
        return this.list[this.list.length - 1];
    }

    private addElement(e: T): void {
        this.list.push(e);
        this.SortedSet();
    }
}
