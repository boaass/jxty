// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Scores: {
            default: null,
            type: cc.Label
        },
    },
    disScore: function(){
        this.score = cc.sys.localStorage.getItem('ScoreDis');
        this.Scores.string = 'Score: ' + this.score.toString();
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.disScore();
    },

    start () {

    },

    // update (dt) {},
});
