/**
 * 根据宠物不同状态生成路径信息的方法
 * @author anj
 */
class RoadMethod {

    private static _instance: RoadMethod;
    /**将每秒钟分成多少个分隔数 */
    private static secondInterval:number=100;
    /**比赛秒数 */
    private static competeSeconds:number=23;
    /**暂时将比赛路段平均分为100段（暂定，可以更多或者更少） */
    private static roadIntervals:number=100;
    /**
     * 不同状态（-9~9）宠物不同的到达时间差异数（秒数），宠物的总共通过赛段时间为比赛时间+状态时间
     * 前二的状态时间必须为负值，保证通过之后再结束（包含动画时间实际比赛时间约24秒）
     */
    private static statusArr:Array<Array<number>>=[[-0.9,-0.8,-0.7,-0.6,-0.5,-0.4,-0.3,-0.2,-0.1,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9],
                                                   [-0.9,-0.8,-0.7,-0.6,-0.5,-0.4,-0.3,-0.2,-0.1,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9],
                                                   [-0.9,-0.8,-0.7,-0.6,-0.5,-0.4,-0.3,-0.2,-0.1,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9],
                                                   [-0.9,-0.8,-0.7,-0.6,-0.5,-0.4,-0.3,-0.2,-0.1,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9],
                                                   [-0.9,-0.8,-0.7,-0.6,-0.5,-0.4,-0.3,-0.2,-0.1,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9]];
    /**
     * 五匹马的数据
     */
    private horseList:Array<HorseVo>=[];
    public constructor() {
    }

    public static get instance(): RoadMethod {
        if (this._instance == null) {
            this._instance = new RoadMethod();
        }
        return this._instance;
    }
    /**根据马匹及状态，生成不同的道路 */
    public creatRoad(horse:HorseVo,state:number):void{
        var i:number;
        //通过状态及随机数，获得一个路障，并随机是否通过，及障碍位置(路段总数的中间三分之一)
        var obsVo:ObstacleVo=new ObstacleVo();
        var isPass:boolean=false;
        var obsPostion:number=10;
        //道路的总长度获取
        var totalRoadLength:number=GameWorld.DEADLINE_LENGTH-GameWorld.LEFT_LINE;
        var singleRoadLength:number=totalRoadLength/RoadMethod.roadIntervals;
        //生成列表，将道路分成平均长度的份数
        var roadList:Array<RoadVo>=[];
        for(i=0;i<RoadMethod.roadIntervals;i++){
            var vo:RoadVo=new RoadVo();
            //路障放置位置，需要分裂成两个道路，其中第一个放置路障
            if(i==obsPostion){
                //为路障赋初始值
                var vo1:RoadVo=new RoadVo();
                vo1.startX=singleRoadLength;
                vo1.throughLength=obsVo.length;
                vo1.obstacleType=obsVo.type;
                //如果未通过，则先设定为一个中间时间，稍后如果时间有欠缺再进行调整
                if(isPass){
                    vo1.state=4
                    vo1.throughTime=obsVo.passTime;
                }
                else{
                    vo1.state=5;
                    vo1.throughTime=(obsVo.notPassMinTime+obsVo.notPassMaxTime)/2;
                }
                roadList.push(vo1);
                vo.startX=vo1.startX+vo1.throughLength;
                vo.throughLength=singleRoadLength-vo1.throughLength;
                roadList.push(vo);
            }
            else{
                vo.startX=singleRoadLength*i;
                vo.throughLength=singleRoadLength;
                roadList.push(vo);
            }
        }
        //模拟运动，为道路每一段进行速度等的赋值
        var acceleration:number=horse.acceleration;
        var endurance=horse.endurance;       //耐力越高，热情减少越慢
        var recovery=horse.recovery;         //热情消耗后，重燃热情的速度
        var maximumSpeed=horse.maximumSpeed; //热情时的最大速度，达到此速度及以上时消耗热情
        var usualSpeed=horse.speed;          //无热情时的速度，达到此速度及以下时增长热情
        var totalPassion=100;                //热情满槽值，热情不能超过这些
        var currentSpeed:number=0;
        var currentPassion:number=100;
        for(i=0;i<roadList.length;i++){
            var vo:RoadVo=roadList[i];
            var passionDirection:number=0;
            //障碍物的路段跳过
            if(vo.state!=1){
                continue;
            }
            //如果当前热情等于0且速度大于普通速度则速度直接变成普通速度
            else if(currentSpeed>usualSpeed && currentPassion==0){
                currentSpeed=usualSpeed;
            }
            //如果当前热情>80且速度小于最大值则进行加速
            else if(currentSpeed<maximumSpeed && currentPassion>80){
                vo.acceleration=acceleration;
            }
            //否则为匀速运动
            else{
                if(currentSpeed<=usualSpeed){
                    passionDirection=1;
                }
                else if(currentSpeed>=maximumSpeed){
                    passionDirection=-1;
                    currentSpeed=maximumSpeed;
                }
            }
            vo.startSpeed=currentSpeed;
            var passRoad:number=0;
            var passTime:number=0;
            //计算获得该路段的消耗时间
            while(passRoad<vo.throughLength){
                passRoad+=currentSpeed;
                currentSpeed+=vo.acceleration;
                passTime+=RoadMethod.competeSeconds/RoadMethod.secondInterval;
            }
            //超过部分转移到下一路段（如果下一路段为障碍物路段则转移到下二路段→_→,如果为最后一段则不需改变）
            if(passRoad>vo.throughLength){
                //剩余未分配多余路程
                var lastLength=passRoad-vo.throughLength;
                //已分配路程
                var subLength=0;
                var currentIndex=i;
                while(lastLength>0){
                    currentIndex++;
                    //已经在末尾的退出
                    if(currentIndex>=roadList.length){
                        break;
                    }
                    roadList[currentIndex].startX+=lastLength;
                    if(roadList[currentIndex].state==1){
                        roadList[currentIndex].startX+=lastLength;
                        if(roadList[currentIndex].throughLength>lastLength){
                            roadList[currentIndex].throughLength-=lastLength;
                            lastLength=0;
                        }
                        else{
                            lastLength-=roadList[currentIndex].throughLength;
                            roadList[currentIndex].throughLength=0;
                        }
                    }
                }
                //走过全程还是没有分完的，则把尾部路程为0的去掉，对有效路段中的时间进行调节，并把尾部路程加入该部分
                if(lastLength!=0){

                }
            }
        }
        //将所有的无效路段（时间为0）进行清理
        //根据状态及期数随机愤怒的时间
        //累加所有的路段时间，与目标时间进行比较，进行分层，

    }
}
