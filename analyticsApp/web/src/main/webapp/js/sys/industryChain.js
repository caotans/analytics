var priceSource=[];//价格
var findFuturesPriceSource=[];//期货价格
var capacityRateSource=[];//开工率
/**
 * Created by Administrator on 2016/11/9.
 */
var whiteTypeColor='#fff';
var greenTypeColor='#00c65d';
var redTypeColor='#ed4c38';
var clareTypeColor='#e83d7d';
var grassGreenTypeColor='#1bbc9b';
var blueTypeColor='#5389d2';
var yellowTypeColor='#fdbd1f';
var yellowAlphaColor='rgba(255,255,0,0.2)';
var greenAlphaColro='rgba(255 ,235 ,101,0.5)';
var blackTypeColor='#000';
var boderColor="rgba(255,255,0,1)";
var lineWidth=2;
var lineWidth2=1;
var browserType=0;//浏览器类型是不是ie
//x2绿色和红色用第一个width+第二个的width，y2用第一个height
//品目
var data=[
    //{xh:1,type:'whiteType',x:230,y:140,x2:112,y2:35,data:[ 230,140,112,35, 5,5,5,285,163]},
    //{xh:2,type:'greenType',x:30,y:40,x2:112,y2:32,data:[ 30,  40,  72,  32, 5,5,0, 102,  40,  40,  32, 5,0,5,70,63,122,63]},
    //{xh:3,type:'redType',x:230,y:40,x2:112,y2:32,data:[ 230,  40,  72,  32, 5,5,0, 302,  40,  40,  32, 5,0,5,270,63,322,63]},
    //{xh:4,type:'clareType',x:30,y:240,x2:48,y2:54,data:[ 30,  240,  48,  54, 5,5,5,52,263,52,280]},
    //{xh:5,type:'grassGreenType',x:230,y:240,x2:48,y2:54,data:[ 230,240,48,54, 5,5,5,252,263,252,280]},
    //{xh:6,type:'blueType',x:130,y:240,x2:48,y2:54,data:[ 130,  240,  48,  54, 5,5,5,152,263,152,280]},
    //{xh:7,type:'yellowType',x:130,y:340,x2:48,y2:106,data:[ 130,  340,  48,  106, 5,5,5,152,363,152,380,152,400,152,420,152,440]}
    //原油
    {whiteType:{x:30,y:490,x2:116,y2:35,data:[ 30,490,116,35, 5,5,5,89,512]},
        redType:{x:30,y:490,x2:116,y2:35,data:[ 30,  490,  72,  35, 5,5,0, 103,  490,  44,  35, 5,0,5,67,512,123,512]},
        greenType:{x:30,y:490,x2:116,y2:35,data:[ 30,  490,  72,  35, 5,5,0, 103,  490,  44,  35, 5,0,5,67,512,123,512]}      },


    //石脑油
    {whiteType:{x:195,y:490,x2:116,y2:35,data:[ 195,490,116,35, 5,5,5,250,512]},
        redType:{x:195,y:490,x2:116,y2:35,data:[ 195,  490,  72,  35, 5,5,0, 268,  490,  44,  35, 5,0,5,230,512,288,512]},
        greenType:{x:195,y:490,x2:116,y2:35,data:[ 195,  490,  72,  35, 5,5,0, 268,  490,  44,  35, 5,0,5,230,512,288,512]}    },


    //丁二烯
    {whiteType:{x:505,y:21,x2:116,y2:35,data:[ 505,21,116,35, 5,5,5,562,43]},
        redType:{x:505,y:21,x2:116,y2:35,data:[ 505,  21,  72,  35, 5,5,0, 578,  21,  44,  35, 5,0,5,542,43,598,43]},
        greenType:{x:505,y:21,x2:116,y2:35,data:[ 505,  21,  72,  35, 5,5,0, 578,  21,  44,  35, 5,0,5,542,43,598,43]}    },


    //丁苯橡胶
    {whiteType:{x:703,y:21,x2:116,y2:35,data:[ 703,21,116,35, 5,5,5,762,43]},
        redType:{x:703,y:21,x2:116,y2:35,data:[ 703,  21,  72,  35, 5,5,0, 776,  21,  44,  35, 5,0,5,742,43,798,43]},
        greenType:{x:703,y:21,x2:116,y2:35,data:[ 705,  21,  72,  35, 5,5,0, 776,  21,  44,  35, 5,0,5,742,43,798,43]}    },



    //顺丁橡胶
    {whiteType:{x:703,y:75,x2:116,y2:35,data:[ 703,75,116,35, 5,5,5,762,97]},
        redType:{x:703,y:75,x2:116,y2:35,data:[ 703,  75,  72,  35, 5,5,0, 776,  75,  44,  35, 5,0,5,742,97,798,97]},
        greenType:{x:703,y:75,x2:116,y2:35,data:[ 703,  75,  72,  35, 5,5,0, 776,  75,  44,  35, 5,0,5,742,97,798,97]}    },


    //丙烯
    {whiteType:{x:505,y:128,x2:116,y2:35,data:[ 505,128,116,35, 5,5,5,562,150]},
        redType:{x:505,y:128,x2:116,y2:35,data:[ 505,  128,  72,  35, 5,5,0, 578, 128,  44,  35, 5,0,5,542,150,598,150]},
        greenType:{x:505,y:128,x2:116,y2:35,data:[ 505,  128,  72,  35, 5,5,0, 578, 128,  44,  35, 5,0,5,542,150,598,150]}    },


    //丙烯酸
    {whiteType:{x:703,y:128,x2:116,y2:35,data:[ 703,128,116,35, 5,5,5,760,150]},
        redType:{x:703,y:128,x2:116,y2:35,data:[ 703,  128,  72,  35, 5,5,0, 776, 128,  44,  35, 5,0,5,742,150,798,150]},
        greenType:{x:703,y:128,x2:116,y2:35,data:[ 703,  128,  72,  35, 5,5,0, 776, 128,  44,  35, 5,0,5,742,150,798,150]}    },


    //丙烯腈
    {whiteType:{x:703,y:181,x2:116,y2:35,data:[ 703,181,116,35, 5,5,5,761,203]},
        redType:{x:703,y:181,x2:116,y2:35,data:[ 703,  181,  72,  35, 5,5,0, 776, 181,  44,  35, 5,0,5,742,203,798,203]},
        greenType:{x:703,y:181,x2:116,y2:35,data:[ 703,  181,  72,  35, 5,5,0, 776, 181,  44,  35, 5,0,5,742,203,798,203]}   },


    //丁醇
    {whiteType:{x:703,y:234,x2:116,y2:35,data:[ 703,234,116,35, 5,5,5,761,256]},
        redType:{x:703,y:234,x2:116,y2:35,data:[ 703,  234,  72,  35, 5,5,0, 776, 234,  44,  35, 5,0,5,742,256,798,256]},
        greenType:{x:703,y:234,x2:116,y2:35,data:[ 703,  234,  72,  35, 5,5,0, 776, 234,  44,  35, 5,0,5,742,256,798,256]}   },


    //辛醇
    {whiteType:{x:703,y:287,x2:116,y2:35,data:[ 703,287,116,35, 5,5,5,764,309]},
        redType:{x:703,y:287,x2:116,y2:35,data:[703,287,  72,  35, 5,5,0, 776, 287,  44,  35, 5,0,5,740,309,798,309]},
        greenType:{x:703,y:287,x2:116,y2:35,data:[703,287,  72,  35, 5,5,0,776, 287,  44,  35, 5,0,5,740,309,798,309]}   },

    //PP
    {whiteType:{x:703,y:340,x2:116,y2:35,data:[ 703,340,116,35, 5,5,5,762,362]},
        redType:{x:703,y:340,x2:116,y2:35,data:[ 703,  340,  72,  35, 5,5,0, 776, 340,  44,  35, 5,0,5,740,362,798,362]},
        greenType:{x:703,y:340,x2:116,y2:35,data:[ 703,  340,  72,  35, 5,5,0, 776, 340,  44,  35, 5,0,5,740,362,798,362]}   },


    //乙烯
    {whiteType:{x:505,y:393,x2:116,y2:35,data:[ 505,393,116,35, 5,5,5,562,415]},
        redType:{x:505,y:393,x2:116,y2:35,data:[ 505,  393,  72,  35, 5,5,0, 578, 393,  44,  35, 5,0,5,542,415,598,415]},
        greenType:{x:505,y:393,x2:116,y2:35,data:[ 505,  393,  72,  35, 5,5,0, 578, 393,  44,  35, 5,0,5,542,415,598,415]}   },


    //pe
    {whiteType:{x:705,y:393,x2:116,y2:35,data:[ 705,393,116,35, 5,5,5,762,415]},
        redType:{x:705,y:393,x2:116,y2:35,data:[ 705,  393,  72,  35, 5,5,0, 776, 393,  44,  35, 5,0,5,740,415,798,415]},
        greenType:{x:705,y:393,x2:116,y2:35,data:[ 705,  393,  72,  35, 5,5,0, 776, 393,  44,  35, 5,0,5,740,415,798,415]}   },


    //乙二醇
    {whiteType:{x:703,y:446,x2:116,y2:35,data:[ 703,446,116,35, 5,5,5,762,468]},
        redType:{x:703,y:446,x2:116,y2:35,data:[ 703,446,  72,  35, 5,5,0, 776,446,  44,  35, 5,0,5,740,468,798,468]},
        greenType:{x:703,y:446,x2:116,y2:35,data:[ 703,446,  72,  35, 5,5,0, 776,446,  44,  35, 5,0,5,740,468,798,468]}   },



    //二乙二醇
    {whiteType:{x:703,y:499,x2:116,y2:35,data:[ 703,499,116,35, 5,5,5,762,522]},
        redType:{x:703,y:499,x2:116,y2:35,data:[ 703,499,  72,  35, 5,5,0, 776,499,  44,  35, 5,0,5,740,522,798,522]},
        greenType:{x:703,y:499,x2:116,y2:35,data:[ 703,499,  72,  35, 5,5,0, 776,499,  44,  35, 5,0,5,740,522,798,522]}    },


    //混合二甲苯
    {whiteType:{x:505,y:552,x2:116,y2:35,data:[ 505,552,116,35, 5,5,5,562,574]},
        redType:{x:505,y:552,x2:116,y2:35,data:[ 505,  552,  72,  35, 5,5,0, 578, 552,  44,  35, 5,0,5,542,574,598,574]},
        greenType:{x:505,y:552,x2:116,y2:35,data:[505,  552,  72,  35, 5,5,0, 578, 552,  44,  35, 5,0,5,542,574,598,574]}    },


    //甲苯
    {whiteType:{x:505,y:605,x2:116,y2:35,data:[ 505,605,116,35, 5,5,5,562,627]},
        redType:{x:505,y:605,x2:116,y2:35,data:[ 505,  605,  72,  35, 5,5,0, 578, 605,  44,  35, 5,0,5,542,628,598,628]},
        greenType:{x:505,y:605,x2:116,y2:35,data:[ 505,  605,  72,  35, 5,5,0, 578, 605,  44,  35, 5,0,5,542,628,598,628]}   },

    //苯
    {whiteType:{x:505,y:658,x2:116,y2:35,data:[ 505,658,116,35, 5,5,5,562,680]},
        redType:{x:505,y:658,x2:116,y2:35,data:[ 505,  658,  72,  35, 5,5,0, 578, 658,  44,  35, 5,0,5,542,680,598,680]},
        greenType:{x:505,y:658,x2:116,y2:35,data:[ 505,  658,  72,  35, 5,5,0, 578, 658,  44,  35, 5,0,5,542,680,598,680]}   },


    //PX
    {whiteType:{x:703,y:552,x2:116,y2:35,data:[ 703,552,116,35, 5,5,5,760,574]},
        redType:{x:703,y:552,x2:116,y2:35,data:[ 703,  552,  72,  35, 5,5,0, 776, 552,  44,  35, 5,0,5,740,574,798,574]},
        greenType:{x:703,y:552,x2:116,y2:35,data:[ 703,  552,  72,  35, 5,5,0, 776, 552,  44,  35, 5,0,5,740,574,798,574]}    },


    //PTA
    {whiteType:{x:893,y:552,x2:116,y2:35,data:[ 893,552,116,35, 5,5,5,952,574]},
        redType:{x:893,y:552,x2:116,y2:35,data:[ 893,  552,  72,  35, 5,5,0, 966, 552,  44,  35, 5,0,5,928,574,988,574]},
        greenType:{x:893,y:552,x2:116,y2:35,data:[ 893,  552,  72,  35, 5,5,0, 966, 552,  44,  35, 5,0,5,928,574,988,574]}   },


    //苯乙烯
    {whiteType:{x:703,y:658,x2:116,y2:35,data:[ 703,658,116,35, 5,5,5,760,680]},
        redType:{x:703,y:658,x2:116,y2:35,data:[ 703,  658,  72,  35, 5,5,0, 776, 658,  44,  35, 5,0,5,742,680,798,680]},
        greenType:{x:703,y:658,x2:116,y2:35,data:[ 703,  658,  72,  35, 5,5,0, 776, 658,  44,  35, 5,0,5,742,680,798,680]}  },


    //ABS
    {whiteType:{x:893,y:658,x2:116,y2:35,data:[ 893,658,116,35, 5,5,5,952,680]},
        redType:{x:893,y:658,x2:116,y2:35,data:[ 893,  658,  72,  35, 5,5,0, 966, 658,  44,  35, 5,0,5,928,680,988,680]},
        greenType:{x:893,y:658,x2:116,y2:35,data:[ 893,  658,  72,  35, 5,5,0, 966, 658,  44,  35, 5,0,5,928,680,988,680]}  },



    //EPS
    {whiteType:{x:893,y:711,x2:116,y2:35,data:[ 893,711,116,35, 5,5,5,952,734]},
        redType:{x:893,y:711,x2:116,y2:35,data:[ 893, 711,  72,  35, 5,5,0, 966, 711,  44,  35, 5,0,5,935,734,988,734]},
        greenType:{x:893,y:711,x2:116,y2:35,data:[ 893, 711,  72,  35, 5,5,0, 966, 711,  44,  35, 5,0,5,935,734,988,734]}  },



    //PS？？？
    {whiteType:{x:893,y:764,x2:116,y2:35,data:[ 893,764,116,35, 5,5,5,952,787]},
        redType:{x:893,y:764,x2:116,y2:35,data:[ 893,  764,  72,  35, 5,5,0, 966, 764,  44,  35, 5,0,5,928,787,988,787]},
        greenType:{x:893,y:764,x2:116,y2:35,data:[ 893,  764,  72,  35, 5,5,0, 966, 764,  44,  35, 5,0,5,928,787,988,787]}  },


    //苯酚
    {whiteType:{x:703,y:817,x2:116,y2:35,data:[ 703,817,116,35, 5,5,5,760,840]},
        redType:{x:703,y:817,x2:116,y2:35,data:[ 703,  817,  72,  35, 5,5,0, 776, 817,  44,  35, 5,0,5,742,839,798,839]},
        greenType:{x:703,y:817,x2:116,y2:35,data:[ 703,  817,  72,  35, 5,5,0, 776, 817,  44,  35, 5,0,5,742,839,798,839]}  },


    //丙酮
    {whiteType:{x:703,y:870,x2:116,y2:35,data:[ 703,870,116,35, 5,5,5,760,893]},
        redType:{x:703,y:870,x2:116,y2:35,data:[ 703,  870,  72,  35, 5,5,0, 776, 870,  44,  35, 5,0,5,742,893,798,893]},
        greenType:{x:703,y:870,x2:116,y2:35,data:[ 703,  870,  72,  35, 5,5,0, 776, 870,  44,  35, 5,0,5,742,893,798,893]}  },


    //MMA
    {whiteType:{x:893,y:817,x2:116,y2:35,data:[ 893,817,116,35, 5,5,5,952,840]},
        redType:{x:893,y:817,x2:116,y2:35,data:[ 893,  817,  72,  35, 5,5,0, 966, 817,  44,  35, 5,0,5,928,839,988,839]},
        greenType:{x:893,y:817,x2:116,y2:35,data:[ 893,  817,  72,  35, 5,5,0, 966, 817,  44,  35, 5,0,5,928,839,988,839]}  },


    //BPA
    {whiteType:{x:893,y:870,x2:116,y2:35,data:[ 893,870,116,35, 5,5,5,952,893]},
        redType:{x:893,y:870,x2:116,y2:35,data:[ 893,  870,  72,  35, 5,5,0, 966, 870,  44,  35, 5,0,5,928,893,988,893]},
        greenType:{x:893,y:870,x2:116,y2:35,data:[ 893,  870,  72,  35, 5,5,0, 966, 870,  44,  35, 5,0,5,928,893,988,893]}  },



    //煤
    {whiteType:{x:30,y:1050,x2:116,y2:35,data:[ 30,1050,116,35, 5,5,5,89,1072]},
        redType:{x:30,y:1050,x2:116,y2:35,data:[ 30, 1050,  72,  35, 5,5,0,103, 1050,  44,  35, 5,0,5,68,1072,123,1072]},
        greenType:{x:30,y:1050,x2:116,y2:35,data:[ 30, 1050,  72,  35, 5,5,0,103, 1050,  44,  35, 5,0,5,68,1072,123,1072]}  },


    //甲醇
    {whiteType:{x:195,y:1050,x2:116,y2:35,data:[195,1050,116,35, 5,5,5,250,1072]},
        redType:{x:195,y:1050,x2:116,y2:35,data:[ 195, 1050,  72,  35, 5,5,0,268, 1050,  44,  35, 5,0,5,230,1072,288,1072]},
        greenType:{x:195,y:1050,x2:116,y2:35,data:[ 195, 1050,  72,  35, 5,5,0,268, 1050,  44,  35, 5,0,5,230,1072,288,1072]} },

];
//线条
var data2=[
    {type:'drawArrow',data:[140.5,507.5,190.5,507.5,0,'#fff']},
    {type:'drawLine',data:[310.5,507.5,350.5,507.5,'#fff']},
    {type:'drawLine',data:[350.5,507.5,350.5,37.5,'#fff']},
    {type:'drawArrow',data:[350.5,37.5,385.5,37.5,0,'#fff']},
    {type:'drawText',data:['烯烃',410.5,42,'#fff']},
    {type:'drawArrow',data:[430.5,37.5,500.5,37.5,0,'#fff']},
    {type:'drawLine',data:[620.5,37.5,690.5,37.5,'#fff']},
    {type:'drawArrow',data:[689.5,37.5,700.5,37.5,0,'#fff']},

    //橡胶制品前的线
    {type:'drawArrow',data:[820.5,37.5,1106.5,37.5,0,'#e83d7d']},
    //橡胶制品框
    {type:'clareType',data:[1110, 10,  48,  54, 5,5,5,1135,33,1135,50]},

    //丁苯橡胶前的横线
    {type:'drawLine',data:[655.5,92.5,690.5,92.5,'#fff']},
    {type:'drawArrow',data:[689.5,92.5,700.5,92.5,0,'#fff']},
    {type:'drawLine',data:[655.5,92.5,655.5,37.5,'#fff']},

    //丁苯橡胶后的线
    {type:'drawLine',data:[820.5,92.5,1136.5,92.5,'#e83d7d']},
    {type:'drawArrow',data:[1136.5,69.5,1138.5,92.5,5,'#e83d7d']},

    //丙烯前的横线
    {type:'drawLine',data:[458.5,145.5,495.5,145.5,'#fff']},
    {type:'drawArrow',data:[495.5,145.5,500.5,145.5,0,'#fff']},
    //丙烯前的竖线
    {type:'drawLine',data:[458.5,409.5,458.5,37.5,'#fff']},

    //丙烯酸前的横线
    {type:'drawLine',data:[620.5,145.5,690.5,145.5,'#fff']},
    {type:'drawArrow',data:[689.5,145.5,700.5,145.5,0,'#fff']},

    //丙烯晴前横线
    {type:'drawLine',data:[655.5,197.5,690.5,197.5,'#fff']},
    {type:'drawArrow',data:[689.5,197.5,700.5,197.5,0,'#fff']},

    //丁醇前横线
    {type:'drawLine',data:[655.5,250.5,690.5,250.5,'#fff']},
    {type:'drawArrow',data:[689.5,250.5,700.5,250.5,0,'#fff']},

    //辛醇前横线
    {type:'drawLine',data:[655.5,303.5,690.5,303.5,'#fff']},
    {type:'drawArrow',data:[689.5,303.5,700.5,303.5,0,'#fff']},

    //PP前横线
    {type:'drawLine',data:[655.5,356.5,690.5,356.5,'#fff']},
    {type:'drawArrow',data:[689.5,356.5,700.5,356.5,0,'#fff']},
    //丙烯酸前的竖线
    {type:'drawLine',data:[655.5,145.5,655.5,356.5,'#fff']},

    //乙烯前的横线
    {type:'drawLine',data:[458.5,409.5,495.5,409.5,'#fff']},
    {type:'drawArrow',data:[495.5,409.5,500.5,409.5,0,'#fff']},

    //PE前横线
    {type:'drawLine',data:[620.5,409.5,690.5,409.5,'#fff']},
    {type:'drawArrow',data:[689.5,409.5,700.5,409.5,0,'#fff']},


    //乙二醇前
    {type:'drawLine',data:[655.5,462.5,690.5,462.5,'#fff']},
    {type:'drawArrow',data:[689.5,462.5,700.5,462.5,0,'#fff']},

    //二乙二醇
    {type:'drawLine',data:[655.5,515.5,690.5,515.5,'#fff']},
    {type:'drawArrow',data:[689.5,515.5,700.5,515.5,0,'#fff']},
    //PE前的竖线
    {type:'drawLine',data:[655.5,409.5,655.5,515.5,'#fff']},

    //芳烃前线
    {type:'drawLine',data:[350.5,507.5,350.5,568.5,'#fff']},
    {type:'drawArrow',data:[350.5,568.5,385.5,568.5,0,'#fff']},
    {type:'drawText',data:['芳烃',410.5,574,'#fff']},

    //混合二甲苯前横线
    {type:'drawArrow',data:[430.5,568.5,500.5,568.5,0,'#fff']},

    //甲苯前的竖线
    {type:'drawLine',data:[458.5,568.5,458.5,674.5,'#fff']},
    //甲苯前横线
    {type:'drawArrow',data:[458.5,621.5,500.5,621.5,0,'#fff']},
    //苯前横线
    {type:'drawArrow',data:[458.5,674.5,500.5,674.5,0,'#fff']},
    //PX前的横线
    {type:'drawLine',data:[620.5,568.5,690.5,568.5,'#fff']},
    {type:'drawArrow',data:[689.5,568.5,700.5,568.5,0,'#fff']},
    //PTA前的横线
    {type:'drawLine',data:[818.5,568.5,880.5,568.5,'#fff']},
    {type:'drawArrow',data:[880.5,568.5,891.5,568.5,0,'#fff']},

    //苯乙烯前横线
    {type:'drawLine',data:[620.5,674.5,690.5,674.5,'#fff']},
    {type:'drawArrow',data:[689.5,674.5,700.5,674.5,0,'#fff']},
    //ABS前的横线
    {type:'drawLine',data:[818.5,674.5,880.5,674.5,'#fff']},
    {type:'drawArrow',data:[880.5,674.5,891.5,674.5,0,'#fff']},
    //EPS前的横线
    {type:'drawLine',data:[850.5,728.5,880.5,728.5,'#fff']},
    {type:'drawArrow',data:[880.5,728.5,891.5,728.5,0,'#fff']},

    //PS前的横线
    {type:'drawLine',data:[850.5,781.5,880.5,781.5,'#fff']},
    {type:'drawArrow',data:[880.5,781.5,891.5,781.5,0,'#fff']},
    //ABS前竖线
    {type:'drawLine',data:[850.5,674.5,850.5,782.5,'#fff']},



    //苯乙烯前竖线
    {type:'drawLine',data:[655.5,674.5,655.5,887.5,'#fff']},

    //丙酮前的横线
    {type:'drawLine',data:[655.5,887.5,690.5,887.5,'#fff']},
    {type:'drawArrow',data:[655.5,887.5,700.5,887.5,0,'#fff']},

    //苯酚前的横线
    {type:'drawLine',data:[655.5,834.5,690.5,834.5,'#fff']},
    {type:'drawArrow',data:[655.5,834.5,700.5,834.5,0,'#fff']},

    //BPA前的横线
    {type:'drawLine',data:[818.5,887.5,880.5,887.5,'#fff']},
    {type:'drawArrow',data:[880.5,887.5,891.5,887.5,0,'#fff']},

    //MMA前的横线
    {type:'drawLine',data:[818.5,834.5,880.5,834.5,'#fff']},
    {type:'drawArrow',data:[880.5,834.5,891.5,834.5,0,'#fff']},
    //MMA前的竖线
    {type:'drawLine',data:[840.5,834.5,840.5,884.5,'#fff']},
    {type:'drawArrow',data:[841.5,884.5,841.5,884.5,4,'#fff']},
    {type:'drawLine',data:[860.5,834.5,860.5,887.5,'#fff']},
    {type:'drawArrow',data:[861.5,838.5,861.5,838.5,5,'#fff']},

    //MMA后的横线
    {type:'drawLine',data:[1011.5,834.5,1085.5,834.5,'#5389d2']},
    //BPA后的横线
    {type:'drawLine',data:[1011.5,887.5,1085.5,887.5,'#5389d2']},

    //PS后的横线
    {type:'drawLine',data:[1011.5,781.5,1085.5,781.5,'#5389d2']},
    //EPS后的横线
    {type:'drawLine',data:[1011.5,728.5,1085.5,728.5,'#5389d2']},

    //纤维制品框
    {type:'grassGreenType',data:[1110, 280,  48,  54, 5,5,5,1135,305,1135,320]},
    //塑料制品框
    {type:'blueType',data:[1110, 550,  48,  54, 5,5,5,1135,575,1135,591]},
    //有机制品框
    {type:'yellowType',data:[1110, 880,  48,  90, 5,5,5,1135,900,1135,915,1135,930,1135,945,1135,960]},
    //煤后横线
    {type:'drawArrow',data:[140.5,1066.5,190.5,1066.5,0,'#fff']},
    //甲醇下竖横线
    {type:'drawLine',data:[250.5,1086.5,250.5,1106.5,'#1bbc9b']},
    {type:'drawLine',data:[250.5,1106.5,1190.5,1106.5,'#1bbc9b']},
    {type:'drawLine',data:[1190.5,580.5,1190.5,1106.5,'#1bbc9b']},
    //{type:'drawCircle',data:[0,0,0,0,1190.5,616.5,1190.5,568.5,5,-1.5,1.5,grassGreenTypeColor]},
    {type:'drawLine',data:[1190.5,305.5,1190.5,580.5,'#1bbc9b']},
    {type:'drawArrow',data:[1163.5,305.5,1192.5,305.5,3,'#1bbc9b']},
    //甲醇上竖横线
    {type:'drawLine',data:[250.5,1028.5,250.5,1048.5,'#fdbd1f']},
    {type:'drawLine',data:[250.5,1028.5,1080.5,1028.5,'#fdbd1f']},
    {type:'drawCircle',data:[0,0,0,0,1137.5,1028.5,1085.5,1028.5,5,0,1,yellowTypeColor]},//半圆
    {type:'drawLine',data:[1137.5,980.5,1137.5,1028.5,'#fdbd1f']},
    {type:'drawArrow',data:[1138.5,978.5,1138.5,978.5,5,'#fdbd1f']},

    //丙烯酸后的横线
    {type:'drawLine',data:[822.5,145.5,845.5,145.5,'#e83d7d']},
    {type:'drawCircle',data:[0,0,0,0,859.5,145.5,850.5,145.5,5,0,1,'#e83d7d']},//半圆
    {type:'drawLine',data:[858.5,145.5,1025.5,145.5,'#e83d7d']},

    //丙烯腈后的横线
    {type:'drawLine',data:[822.5,197.5,845.5,197.5,'#e83d7d']},
    {type:'drawCircle',data:[0,0,0,0,859.5,197.5,850.5,197.5,5,0,1,'#e83d7d']},//半圆
    {type:'drawLine',data:[858.5,197.5,1025.5,197.5,'#e83d7d']},
    //丙烯腈后的竖线
    {type:'drawLine',data:[1025.5,92.5,1025.5,166.5,'#e83d7d']},
    {type:'drawCircle',data:[0,0,0,0,1025.5,197.5,1025.5,171.5,5,-1.5,1.5,clareTypeColor]},
    //丙烯酸下的横竖线蓝色
    {type:'drawLine',data:[760.5,170.5,845.5,170.5,'#5389d2']},
    {type:'drawCircle',data:[0,0,0,0,859.5,170.5,850.5,170.5,5,0,1,'#5389d2']},//半圆
    {type:'drawLine',data:[858.5,170.5,1085.5,170.5,'#5389d2']},
    {type:'drawLine',data:[760.5,164.5,760.5,170.5,'#5389d2']},
    {type:'drawLine',data:[1085.5,170.5,1085.5,511.5,'#5389d2']},
    {type:'drawCircle',data:[0,0,0,0,1085.5,1066.5,1085.5,516.5,5,-1.5,1.5,blueTypeColor]},
    {type:'drawLine',data:[312.5,1066.5,1085.5,1066.5,'#5389d2']},

    //丁醇后的横线
    {type:'drawLine',data:[822.5,250.5,845.5,250.5,'#5389d2']},
    {type:'drawCircle',data:[0,0,0,0,859.5,250.5,850.5,250.5,5,0,1,blueTypeColor]},//半圆
    {type:'drawLine',data:[858.5,250.5,1085.5,250.5,'#5389d2']},

    //辛醇后的横线
    {type:'drawLine',data:[822.5,303.5,845.5,303.5,'#5389d2']},
    {type:'drawCircle',data:[0,0,0,0,859.5,303.5,850.5,303.5,5,0,1,blueTypeColor]},//半圆
    {type:'drawLine',data:[858.5,303.5,1085.5,303.5,'#5389d2']},

    //PP后的横线
    {type:'drawLine',data:[822.5,356.5,845.5,356.5,'#5389d2']},
    {type:'drawCircle',data:[0,0,0,0,859.5,356.5,850.5,356.5,5,0,1,blueTypeColor]},//半圆
    {type:'drawLine',data:[858.5,356.5,1025.5,356.5,'#5389d2']},

    //PP后的竖线
    {type:'drawLine',data:[1025.5,356.5,1025.5,515.5,'#5389d2']},

    //PE后的横线
    {type:'drawLine',data:[822.5,409.5,845.5,409.5,'#5389d2']},
    {type:'drawCircle',data:[0,0,0,0,859.5,409.5,850.5,409.5,5,0,1,blueTypeColor]},//半圆
    {type:'drawLine',data:[858.5,409.5,1025.5,409.5,'#5389d2']},

    //乙二醇后的横线
    {type:'drawLine',data:[822.5,462.5,845.5,462.5,'#5389d2']},
    {type:'drawCircle',data:[0,0,0,0,859.5,462.5,850.5,462.5,5,0,1,blueTypeColor]},//半圆
    {type:'drawLine',data:[858.5,462.5,1025.5,462.5,'#5389d2']},

    //二乙二醇后的横线
    {type:'drawLine',data:[822.5,515.5,845.5,515.5,'#5389d2']},
    {type:'drawCircle',data:[0,0,0,0,859.5,515.5,850.5,515.5,5,0,1,blueTypeColor]},//半圆
    {type:'drawLine',data:[858.5,515.5,1130.5,515.5,'#5389d2']},
    {type:'drawLine',data:[1130.5,515.5,1130.5,563.5,'#5389d2']},
    {type:'drawArrow',data:[1131.5,546.5,1131.5,546.5,4,'#5389d2']},

    //PTA后横线
    {type:'drawLine',data:[1011.5,568.5,1085.5,568.5,'#5389d2']},

    //苯乙烯上的竖线
    {type:'drawLine',data:[780.5,657.5,780.5,605.5,'#fff']},
    {type:'drawLine',data:[780.5,605.5,850.5,605.5,'#fff']},
    {type:'drawLine',data:[850.5,580.5,850.5,605.5,'#fff']},
    {type:'drawCircle',data:[0,0,0,0,850.5,580.5,850.5,568.5,5,-1.5,1.5,'#fff']},
    {type:'drawLine',data:[850.5,122.5,850.5,564.5,'#fff']},
    {type:'drawLine',data:[780.5,122.5,850.5,122.5,'#fff']},
    {type:'drawArrow',data:[780.5,112.5,782.5,122.5,5,'#fff']},
    //甲苯后横线
    {type:'drawLine',data:[622.5,621.5,625.5,621.5,'#5389d2']},
    {type:'drawCircle',data:[0,0,0,0,715.5,621.5,630.5,621.5,5,0,1,blueTypeColor]},//半圆
    {type:'drawCircle',data:[0,0,0,0,775.5,621.5,720.5,621.5,5,0,1,blueTypeColor]},//半圆
    {type:'drawCircle',data:[0,0,0,0,1085.5,621.5,780.5,621.5,5,0,1,blueTypeColor]},//半圆

    //丙烯下的竖线
    {type:'drawLine',data:[600.5,158.5,600.5,376.5,'#fff']},
    {type:'drawLine',data:[600.5,376.5,630.5,376.5,'#fff']},
    {type:'drawLine',data:[630.5,376.5,630.5,406.5,'#fff']},
    {type:'drawCircle',data:[0,0,0,0,630.5,564.5,630.5,410.5,5,-1.5,1.5,'#fff']},
    {type:'drawCircle',data:[0,0,0,0,630.5,670.5,630.5,568.5,5,-1.5,1.5,'#fff']},
    {type:'drawLine',data:[655.5,409.5,655.5,515.5,'#fff']},
    {type:'drawLine',data:[655.5,409.5,655.5,515.5,'#fff']},
    {type:'drawCircle',data:[0,0,0,0,630.5,856.5,630.5,673.5,5,-1.5,1.5,'#fff']},//半圆
    {type:'drawLine',data:[630.5,856.5,652.5,856.5,'#fff']},
    {type:'drawCircle',data:[0,0,0,0,720.5,856.5,656.5,856.5,5,0,1,'#fff']},//半圆
    {type:'drawArrow',data:[720.5,865.5,721.5,856.5,4,'#fff']},

    {type:'drawLine',data:[630.5,806.5,652.5,806.5,'#fff']},
    {type:'drawCircle',data:[0,0,0,0,720.5,806.5,656.5,806.5,5,0,1,'#fff']},//半圆
    {type:'drawArrow',data:[720.5,813.5,721.5,806.5,4,'#fff']},

    //乙烯下竖线
    {type:'drawLine',data:[600.5,409.5,600.5,535.5,'#fff']},
    {type:'drawLine',data:[600.5,535.5,625.5,535.5,'#fff']},
    {type:'drawCircle',data:[0,0,0,0,675.5,535.5,630.5,535.5,5,0,1,'#fff']},//半圆
    {type:'drawLine',data:[675.5,535.5,675.5,565.5,'#fff']},
    {type:'drawCircle',data:[0,0,0,0,675.5,604.5,675.5,568.5,5,-1.5,1.5,'#fff']},
    {type:'drawLine',data:[675.5,604.5,720.5,604.5,'#fff']},
    {type:'drawLine',data:[720.5,653.5,720.5,604.5,'#fff']},
    {type:'drawArrow',data:[721.5,653.5,721.5,653.5,4,'#fff']},

    //乙二醇上的竖线
    {type:'drawLine',data:[780.5,444.5,780.5,438.5,'#1bbc9b']},
    {type:'drawLine',data:[780.5,438.5,846.5,438.5,'#1bbc9b']},
    {type:'drawCircle',data:[0,0,0,0,1020.5,438.5,850.5,438.5,5,0,1,'#1bbc9b']},//半圆
    {type:'drawCircle',data:[0,0,0,0,1055.5,438.5,1025.5,438.5,5,0,1,'#1bbc9b']},//半圆
    {type:'drawLine',data:[1055.5,438.5,1055.5,326.5,'#1bbc9b']},

    //PTA上的竖线
    {type:'drawLine',data:[950.5,550.5,950.5,520.5,'#1bbc9b']},
    {type:'drawCircle',data:[0,0,0,0,950.5,520.5,950.5,516.5,5,-1.5,1.5,'#1bbc9b']},
    {type:'drawCircle',data:[0,0,0,0,950.5,512.5,950.5,462.5,5,-1.5,1.5,'#1bbc9b']},
    {type:'drawCircle',data:[0,0,0,0,950.5,457.5,950.5,438.5,5,-1.5,1.5,'#1bbc9b']},
    {type:'drawCircle',data:[0,0,0,0,950.5,434.5,950.5,410.5,5,-1.5,1.5,'#1bbc9b']},
    {type:'drawCircle',data:[0,0,0,0,950.5,406.5,950.5,356.5,5,-1.5,1.5,'#1bbc9b']},
    {type:'drawLine',data:[950.5,326.5,950.5,352.5,'#1bbc9b']},
    {type:'drawLine',data:[950.5,326.5,1082.5,326.5,'#1bbc9b']},
    {type:'drawCircle',data:[0,0,0,0,1100.5,326.5,1085.5,326.5,5,0,1,'#1bbc9b']},//半圆
    {type:'drawArrow',data:[1089.5,326.5,1107.5,326.5,0,'#1bbc9b']},
    //{type:'drawCircle',data:[80.5,300.5,95.5,300.5,150.5,300.5,100.5,300.5,5,0]},
    //{type:'drawLine',data:[10.5,10.5,100.5,10.5]}
    //{type:'drawCircle',data:[0,0,0,0,150.5,300.5,150.5,294.5,5,-1.5,1.5,blueTypeColor]},
    //{type:'drawCircle',data:[0,0,0,0,150.5,400.5,145.5,400.5,5,0,1,blueTypeColor]},
];
//数据
//var data3=[
//    {type:'greenType',id:"1",name:"原油",value:"+13%"},
//    {type:'whiteType',id:"2",name:"石脑油",value:"-3%"},
//    {type:'whiteType',id:"3",name:"丁二烯",value:"-8%"},
//    {type:'whiteType',id:"4",name:"顺丁橡胶",value:"-4%"},
//    {type:'whiteType',id:"5",name:"丁苯橡胶",value:"-4%"},
//    {type:'greenType',id:"6",name:"丙烯",value:"+8%"},
//    {type:'redType',id:"7",name:"丙烯酸",value:"-8%"},
//    {type:'redType',id:"8",name:"丙烯腈",value:"-6%"},
//    {type:'redType',id:"11",name:"丁醇",value:"-6%"},
//    {type:'redType',id:"13",name:"辛醇",value:"+8%"},
//    {type:'redType',id:"14",name:"PP粒料",value:"+8%"},
//    {type:'whiteType',id:"15",name:"乙烯",value:"-2%"},
//    {type:'redType',id:"8",name:"PE",value:"-10%"},
//    {type:'whiteType',id:"9",name:"乙二醇",value:"-6%"},
//    {type:'redType',id:"10",name:"二乙二醇",value:"-6%"},
//    {type:'redType',id:"10",name:"混合二甲苯",value:"-6%"},
//    {type:'redType',id:"11",name:"甲苯",value:"-6%"},
//    {type:'whiteType',id:"12",name:"纯苯",value:"+8%"},
//    {type:'redType',id:"13",name:"PX",value:"+8%"},
//    {type:'redType',id:"14",name:"PTA",value:"+8%"},
//    {type:'whiteType',id:"15",name:"苯乙烯",value:"-2%"},
//    {type:'redType',id:"16",name:"ABS",value:"+8%"},
//    {type:'whiteType',id:"17",name:"EPS",value:"+2%"},
//    {type:'whiteType',id:"18",name:"PS",value:"-2%"},
//    {type:'whiteType',id:"19",name:"苯酚",value:"-2%"},
//    {type:'whiteType',id:"20",name:"丙酮",value:"+2%"},
//    {type:'redType',id:"21",name:"MMA",value:"+2%"},
//    {type:'whiteType',id:"22",name:"BPA",value:"+2%"},
//    {type:'whiteType',id:"30",name:"煤",value:"-3%"},
//    {type:'whiteType',id:"31",name:"甲醇",value:"+2%"}
//
//];


function drawRoundedRect(context, strokeStyle, fillStyle, cornerX, cornerY, width, height, cornerRadius, left, right) {
    context.lineWidth = lineWidth;
    context.beginPath();
    if (width > 0) context.moveTo(cornerX + cornerRadius, cornerY);
    else  context.moveTo(cornerX - cornerRadius, cornerY);
    context.arcTo(cornerX + width, cornerY, cornerX + width, cornerY + height, right);
    context.arcTo(cornerX + width, cornerY + height, cornerX, cornerY + height, right);
    context.arcTo(cornerX, cornerY + height, cornerX, cornerY, left);
    if (width > 0) {
        context.arcTo(cornerX, cornerY, cornerX + cornerRadius, cornerY, left);
    }
    else {
        context.arcTo(cornerX, cornerY, cornerX - cornerRadius, cornerY, cornerRadius);
    }
    context.strokeStyle = strokeStyle;
    context.fillStyle = fillStyle;
    context.stroke();
    context.fill();
}
function drawRoundedRect2(context, strokeStyle, fillStyle, cornerX, cornerY, width, height, cornerRadius, left, right) {
    context.lineWidth = lineWidth;
    context.beginPath();
    if (width > 0) context.moveTo(cornerX - 1, cornerY);
    else  context.moveTo(cornerX - cornerRadius, cornerY);
    context.arcTo(cornerX + width, cornerY, cornerX + width, cornerY + height, right);
    context.arcTo(cornerX + width, cornerY + height, cornerX, cornerY + height, right);
    context.arcTo(cornerX, cornerY + height, cornerX, cornerY, left);
    if (width > 0) {
        //context.arcTo(cornerX,cornerY,cornerX,cornerY,left);
    }
    else {
        context.arcTo(cornerX, cornerY, cornerX - cornerRadius, cornerY, cornerRadius);
    }
    context.strokeStyle = strokeStyle;
    context.fillStyle = fillStyle;
    context.stroke();
    context.fill();
}

function drawFont(ctx, text, x, y, color,size) {
    if(size){
        ctx.font = size;  // 字体大小，样式
    } else{
        ctx.font = "14px 微软雅黑";  // 字体大小，样式
    }

    ctx.fillStyle = color;  // 颜色
    ctx.textAlign = 'center';  // 位置
    ctx.fillText(text, x, y);
}
/**
 * 白色
 */
function whiteType(ctx, data, data2) {
    drawRoundedRect(ctx, whiteTypeColor, whiteTypeColor, data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
    drawFont(ctx, data2.name, data[7], data[8], blackTypeColor);
}
/**
 * 绿色
 */
function greenType(ctx, data, data2) {
    drawRoundedRect(ctx, whiteTypeColor, greenTypeColor, data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
    drawRoundedRect2(ctx, whiteTypeColor, whiteTypeColor, data[7], data[8], data[9], data[10], data[11], data[12], data[13]);
    drawFont(ctx, data2.name, data[14], data[15], whiteTypeColor);
    drawFont(ctx, data2.value, data[16], data[17], greenTypeColor,"bold 10px 微软雅黑");
}
/**
 * 红色
 */
function redType(ctx, data, data2) {
    drawRoundedRect(ctx, whiteTypeColor, redTypeColor, data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
    drawRoundedRect2(ctx, whiteTypeColor, whiteTypeColor, data[7], data[8], data[9], data[10], data[11], data[12], data[13]);
    drawFont(ctx, data2.name, data[14], data[15], whiteTypeColor);
    drawFont(ctx, data2.value, data[16], data[17], redTypeColor,"bold 10px 微软雅黑");
}
/**
 * 酒红色
 */
function clareType(ctx, data) {
    drawRoundedRect(ctx, clareTypeColor, clareTypeColor, data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
    drawFont(ctx, "橡胶", data[7], data[8], whiteTypeColor);
    drawFont(ctx, "制品", data[9], data[10], whiteTypeColor);
}
/**
 * 草绿色
 */
function grassGreenType(ctx, data) {
    drawRoundedRect(ctx, grassGreenTypeColor, grassGreenTypeColor, data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
    drawFont(ctx, "纤维", data[7], data[8], whiteTypeColor);
    drawFont(ctx, "制品", data[9], data[10], whiteTypeColor);
}
/**
 * 蓝色
 */
function blueType(ctx, data) {
    drawRoundedRect(ctx, blueTypeColor, blueTypeColor, data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
    drawFont(ctx, "塑料", data[7], data[8], whiteTypeColor);
    drawFont(ctx, "制品", data[9], data[10], whiteTypeColor);
}
/**
 * 黄色
 */
function yellowType(ctx, data) {
    drawRoundedRect(ctx, yellowTypeColor, yellowTypeColor, data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
    drawFont(ctx, "有机", data[7], data[8], whiteTypeColor);
    drawFont(ctx, "和精", data[9], data[10], whiteTypeColor);
    drawFont(ctx, "细化", data[11], data[12], whiteTypeColor);
    drawFont(ctx, "工产", data[13], data[14], whiteTypeColor);
    drawFont(ctx, "品", data[15], data[16], whiteTypeColor);


}
//得到点击的坐标
function getEventPosition(ev) {
    var x, y;
    if (browserType==false) {
        x = ev.layerX;
        y = ev.layerY;
    } else if (browserType==true) { // Opera
        x = ev.offsetX;
        y = ev.offsetY;
    }
    return {x: x, y: y};
}
function drawLine(ctx, data) {
    ctx.beginPath() //清空子路径
    ctx.lineWidth = lineWidth2;
    ctx.strokeStyle =  data[4];
    //ctx.fillStyle = "#fff"//设置填充颜色
    ctx.moveTo(data[0], data[1]);
    ctx.lineTo(data[2], data[3]);
    ctx.fill();//填充
    ctx.stroke();//画线
}
/**
 * 写字
 */

function drawText(ctx, data) {
    drawFont(ctx, data[0], data[1], data[2]);
}
/**
 * 画圆圈
 */

function drawCircle(ctx, data) {
    ctx.beginPath();
    ctx.moveTo(data[0], data[1]);
    ctx.lineTo(data[2], data[3]);
    ctx.moveTo(data[4], data[5]);
    ctx.arc(data[6], data[7], data[8], data[9]*Math.PI, data[10]*Math.PI, 1);
    ctx.strokeStyle =  data[11];
    ctx.lineWidth = lineWidth2;
    ctx.stroke();
    ctx.closePath();
}

/**
 * 画箭头
 * @param ctx
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 */
function drawArrow(ctx, data) {
    var x1 = data[0];
    var y1 = data[1];
    var x2 = data[2];
    var y2 = data[3];
    var leftOrRight = data[4];

    // arbitrary styling
    ctx.strokeStyle = data[5];
    ctx.fillStyle = data[5];
    ctx.lineWidth = lineWidth2;

    // draw the line
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2 - 2, y2);
    ctx.stroke();

//        // draw the starting arrowhead
    if (leftOrRight == 1) {//左箭头
        var startRadians = Math.atan((y2 - y1) / (x2 - x1));
        startRadians += ((x2 > x1) ? -90 : 90) * Math.PI / 180;
        drawArrowhead(ctx, x1 - 2, y1, startRadians);
    }  else if (leftOrRight == 3) {//左箭头
        drawArrowhead(ctx, x1 - 2, y1, 1.5*Math.PI);
    } else if (leftOrRight == 4) {//下箭头
        drawArrowhead(ctx, x1-1, y1+3.5, 1*Math.PI);
    } else if (leftOrRight == 5) {//上箭头
        drawArrowhead(ctx, x1-1, y1-3.5, 2*Math.PI);
    } else {//右箭头
        // draw the ending arrowhead
        var endRadians = Math.atan((y2 - y1) / (x2 - x1));
        endRadians += ((x2 > x1) ? 90 : -90) * Math.PI / 180;
        drawArrowhead(ctx, x2, y2, endRadians);
    }


}
function drawArrowhead(ctx, x, y, radians) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(radians);
    ctx.moveTo(0, 0);
    ctx.lineTo(4, 8);
    ctx.lineTo(-4, 8);
    ctx.closePath();
    ctx.restore();
    ctx.fill();
}
/**
 * 下载
 */
function downLoadIndustryChain ()
{
    var type = 'jpg';
    var imgData = document.getElementById("tutorial").toDataURL(type);
    imgData = imgData.replace("image/"+type,'image/octet-stream');
    var filename = 'industryChain_' + (new Date()).getTime() + '.' + type;
    $("#imageDataFileName").val(filename);
    $("#imageDataUrl").val(imgData.split(",")[1]);
    $("#imageType").val("industryChain");
    $("#exportEchartsImg").submit();
}
/**
 * 下载
 */
function exportIndustryChain ()
{
    var type=$("#industryChainCheck").val();
    if(type=="price"){
        var array=[priceSource,findFuturesPriceSource];
        var titleName=[["产品","涨幅","产品","跌幅"],["产品","涨幅","产品","跌幅"]];
        var sheetName=["价格涨跌","期货价格涨跌"];
        var keyName=[["name1","increase1","name2","increase2"],["name1","increase1","name2","increase2"]];
        $("#titleName").val(JSON.stringify(titleName));
        $("#sheetName").val(JSON.stringify(sheetName));
        $("#keyName").val(JSON.stringify(keyName));
        $("#excelArray").val(JSON.stringify(array));
        $('#industryChainExport').submit() ;
    }else if(type=="capacityRate"){
        var array=[capacityRateSource];
        var titleName=[["产品","涨幅","产品","跌幅"]];
        var keyName=[["name1","increase1","name2","increase2"]];
        var sheetName=["开工率涨跌"];
        $("#titleName").val(JSON.stringify(titleName));
        $("#sheetName").val(JSON.stringify(sheetName));
        $("#keyName").val(JSON.stringify(keyName));
        $("#excelArray").val(JSON.stringify(array));
        $('#industryChainExport').submit() ;
    }
}
/**
 * 点击canvas事件
 * @param e
 * @returns {boolean}
 */
function clickCanvas(e){
    //当click时运行
    var p = getEventPosition(e);
    // alert("品目ID===" + p.x +"==="+ e.clientX +"==品目名称==" + p.y+"==="+ e.clientY+"===");
    var menuCache = window.localStorage;
    var flag = false;
    var isBlank=true;
    for (var i = 0; i < data.length; i++) {
        if (p.x > data[i][data3[i].type].x && p.x <= data[i][data3[i].type].x2 + data[i][data3[i].type].x && p.y > data[i][data3[i].type].y && p.y <= data[i][data3[i].type].y2 + data[i][data3[i].type].y) {
            isBlank=false;//肯定不是点了空的地方
            for(var j=0;j<obj.length;j++){
                if(obj[j].productCode==data3[i].id){
                    flag=true;
                    break;
                }
            }
            if(flag){
                window.location.href="login?productCode="+data3[i].id;
                var secondMenu=menuCache.getItem("secondMenu");
                menuCache.setItem("secondMenu","login");
                menuCache.setItem("firstMenu",data3[i].id);
                break;
            }


        }

    }
    if(!flag){
        if(!isBlank){
            alert("您还未开通此品目的权限!");
        }


    }
    return false;
}

var copyData, copyData2, isExist = 0;
/**
 * 画流程图
 * @param type
 */
function drawShape(type) {
    if(type){
        $("#industryChainCheck").val(type);
    }
    $.ajax({
        type:'POST',
        dataType:'json',
        url:'industryChainLoad?type='+type+"&ssid="+$("#industryChain_ssid").val(),
        async:false,
        success:function(data){
            data3=data;
        }
    });
    var canvas = document.getElementById('tutorial');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        //重置一些东西
        ctx.clearRect(0,0,canvas.width,canvas.height);
        canvas.removeEventListener('click',clickCanvas,true);
        copyData=[], copyData2=[], isExist = 0;

        canvas.addEventListener('click', clickCanvas, true);

        canvas.addEventListener('mousemove', function (e) {
//          //当click时运行
            var p = getEventPosition(e);
            var flag = false;
            if(data3){
            for (var i = 0; i < data.length; i++) {
              //  if(data3[i].id!=$("#industryChainCode").val()){ //默认的不需要去除背景色
                    //alert(data3[i].id);
                    if (p.x > data[i][data3[i].type].x && p.x <= parseInt(data[i][data3[i].type].x2)+parseInt(data[i][data3[i].type].x)&& p.y > data[i][data3[i].type].y && p.y <= parseInt(data[i][data3[i].type].y2)+parseInt(data[i][data3[i].type].y)) {
                        //alert(data[i].type);
                        if (isExist == 0) {
                            drawRoundedRect(ctx,yellowAlphaColor,yellowAlphaColor, data[i][data3[i].type].x - 1, data[i][data3[i].type].y - 1, data[i][data3[i].type].x2 + 1, data[i][data3[i].type].y2 + 1, 5, 5, 5);
                            copyData = data[i][data3[i].type];
                            copyData2 = data3[i];
                        }
                        isExist++;
                        flag = true; //选中的话一直是true
                        break;
                    }
                }
            }

           // }

            if (!flag && copyData != undefined) { //离开选中的目标就会执行

                isExist = 0;
                //ctx.clearRect(copyData.x - 2, copyData.y - 2, copyData.x2 + 3, copyData.y2 + 3);
                if (copyData2.type == "whiteType") {
                    whiteType(ctx, copyData.data, copyData2);
                } else if (copyData2.type == "greenType") {
                    greenType(ctx, copyData.data, copyData2)
                } else if (copyData2.type == "redType") {
                    redType(ctx, copyData.data, copyData2)
                }
            }
            return false;
        }, true);



        //设置画笔颜色
        drawRoundedRect(ctx, "#1d2a3a", "#1d2a3a", 0, 0,canvas.width, canvas.height, 5, 5, 5);
        for (var i = 0; i < data.length; i++) {

            if(data3[i].type=="whiteType"){

                whiteType(ctx, data[i][data3[i].type].data, data3[i]);
            }
            if(data3[i].type=="greenType"){
                greenType(ctx, data[i][data3[i].type].data, data3[i]);
            }
            if(data3[i].type=="redType"){
                //console.log(data[i][data3[i].type].data);
                redType(ctx, data[i][data3[i].type].data, data3[i]);
            }

            //默认选中产品分析选中的品目ID
            if(data3[i].id==$("#industryChainCode").val()){
                 drawRoundedRect(ctx,boderColor,"rgba(255 ,255 ,255,0)", data[i][data3[i].type].x - 1, data[i][data3[i].type].y-1, data[i][data3[i].type].x2 + 2, data[i][data3[i].type].y2+1, 5, 5, 5);
                 drawRoundedRect(ctx,boderColor,"rgba(255 ,255 ,255,0)", data[i][data3[i].type].x - 2, data[i][data3[i].type].y-1, data[i][data3[i].type].x2 + 4, data[i][data3[i].type].y2+2, 5, 5, 5);
//                drawLine(ctx,[data[i][data3[i].type].x-1,data[i][data3[i].type].y-1,data[i][data3[i].type].x+data[i][data3[i].type].x2+2,data[i][data3[i].type].y-1,'#eb8a00']);
//                drawLine(ctx,[data[i][data3[i].type].x-1,data[i][data3[i].type].y,data[i][data3[i].type].x,data[i][data3[i].type].y+data[i][data3[i].type].y2,data[i][data3[i].type].y2,'#eb8a00']);
//                drawLine(ctx,[data[i][data3[i].type].x-1,data[i][data3[i].type].y+data[i][data3[i].type].y2+1,data[i][data3[i].type].x+data[i][data3[i].type].x2+2,data[i][data3[i].type].y+data[i][data3[i].type].y2+1,'#eb8a00']);
//                drawLine(ctx,[data[i][data3[i].type].x+data[i][data3[i].type].x2+2,data[i][data3[i].type].y,data[i][data3[i].type].x+data[i][data3[i].type].x2+2,data[i][data3[i].type].y+data[i][data3[i].type].y2+1,'#eb8a00']);

            }
        }
        for (var j = 0; j < data2.length; j++) {
            if (data2[j].type == "drawArrow") {
                drawArrow(ctx, data2[j].data);
            } else if (data2[j].type == "drawCircle") {
                drawCircle(ctx, data2[j].data);
            } else if (data2[j].type == "drawLine") {
                drawLine(ctx, data2[j].data);
            } else if (data2[j].type == "drawText") {
                drawText(ctx, data2[j].data);
            } else if (data2[j].type == "clareType") {
                clareType(ctx, data2[j].data);
            } else if (data2[j].type == "grassGreenType") {
                grassGreenType(ctx, data2[j].data);
            } else if (data2[j].type == "blueType") {
                blueType(ctx, data2[j].data);
            } else if (data2[j].type == "yellowType") {
                yellowType(ctx, data2[j].data);
            }

        }


    } else {
        alert('您的浏览器版本过低,请更换高版本!');
    }
    //加载表格
    $.ajax({
        type:'POST',
        url:"industryChainTable?type="+type+"&ssid="+$("#industryChain_ssid").val(),
        success:function(data){
            $("#industryChain").html(data);
        }
    });

}
/**
 * 将数组组装成价格、期货价格、开工率数组
 */
function industryChainToArray(type,array1,array2){
    var temp=[];
    var arrayLength=0;
    if(type=="futuresPrice"){
        array1=sortArray(array1,"increase","asc");
        array1=array1.slice(0,10);
        array2=sortArray(array2,"increase","desc");
        array2=array2.slice(0,10);
        var temp1=[];
        var temp2=[];
        if(array1.length<10){
               for(var i=0;i<(10-array1.length);i++){
                   temp1.push({"name":"——","increase":"——"});
               }
            array1=array1.concat( temp1 );
        }
        if(array2.length<10){
            for(var i=0;i<10-array2.length;i++){
                temp2.push({"name":"——","increase":"——"});
            }
            array2=array2.concat( temp2 );
        }
    }


   // console.log(array1);
   // console.log(array2);
    if(array1.length-array2.length>0){
        arrayLength=array1.length;
    } else{
        arrayLength=array2.length;
    }
    for(var i=0;i<arrayLength;i++){
        var obj={};
        if(array1[i]&&array1[i].name&&array1[i].increase){
              obj.name1= array1[i].name;
              obj.increase1= array1[i].increase;
        } else{
            obj.name1= "";
            obj.increase1= "";
        }
        if(array2[i]&&array2[i].name&&array2[i].increase){
            obj.name2= array2[i].name;
            obj.increase2= array2[i].increase;
        } else{
            obj.name2="";
            obj.increase2= "";
        }
        temp.push(obj);
    }

    if(type=="price"){
        priceSource=temp;//价格
    }else if(type=="futuresPrice"){
        findFuturesPriceSource=temp;//期货价格
    }else if(type=="capacityRate"){
        capacityRateSource=temp;//开工率
    }
      //console.log(temp);
}

/**
 *
 */
function createIndustryChainTable(id,type){
    $("#"+id).next().remove();
    var temp=[];
    if(type=="price"){
        temp=priceSource;//价格
    }else if(type=="futuresPrice"){
        temp=findFuturesPriceSource;//期货价格
    }else if(type=="capacityRate"){
        temp=capacityRateSource;//开工率
    }
    var html="";
    for(var i=0;i<temp.length;i++){
        if(i%2==0){
            html+='<tr> ';
        }else{
            html+='<tr class="zf_box"> ';
        }
        if(temp[i]&&temp[i].name1&&temp[i].increase1){
            html+='  <td>'+temp[i].name1+'</td>   ';
            html+=' <td class="yb_xt"><span class="hs_box">'+temp[i].increase1+'</span></td> ';
        } else{
            html+='  <td></td>   ';
            html+=' <td class="yb_xt"><span class="hs_box"></span></td> ';
        }
        if(temp[i]&&temp[i].name2&&temp[i].increase2){
            html+='  <td>'+temp[i].name2+'</td>     ';
            html+='   <td><span class="ls_box">'+temp[i].increase2+'</span></td> ';
        } else{
            html+='  <td></td>   ';
            html+=' <td class="yb_xt"><span class="hs_box"></span></td> ';
        }


        html+='</tr> ';
    }
    $("#"+id).after(html);

}