// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var hero2 = require('HeroPlayer');

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    moveRight: function(){
        var times = Math.random();
        if (times<0.5) {
            times += 0.5;
        }
        
        var seq = cc.repeatForever(
            cc.sequence(
                cc.moveBy(times, cc.p(240, 0)), cc.moveBy(times, cc.p(-240, 0))
            ));
        this.node.runAction(seq);
    },

    noteBox: function(){
        return this.node.getBoundingBoxToWorld();
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.moveRight();
    },

    start () {

    },

    update (dt) {
        var _label = cc.find('Canvas/hero').getComponent(hero2);
        if (cc.rectIntersectsRect(_label.node.getBoundingBoxToWorld(), this.noteBox())) {
            this.node.parent.parent.emit('BarrierLeftBreak');
            // cc.eventManager.removeAllListeners();
        }
    },
});
