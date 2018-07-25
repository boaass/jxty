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
        jumpHeight: 0,
        jumpTimers: 0,
        maxMoveSpeed: 0
    },

    jumpUpAction: function(){
        var jumpUp = cc.moveBy(this.jumpTimers, cc.p(0, this.jumpHeight));
        return jumpUp;
    },

    jumpDownAction: function(){
        var jumpDown = cc.moveBy(this.jumpTimers, cc.p(0, -this.maxMoveSpeed));
        return jumpDown;
    },

    jumpRunAction: function(){
        this.jumpUp = this.jumpUpAction();
        this.jumpDown = this.jumpDownAction();
        var seq = cc.sequence(this.jumpUp, this.jumpDown);
        this.node.runAction(seq);
    },

    heroDownMove: function(){
        var heroDown = cc.moveBy(0.8, cc.p(0, -5));
        return heroDown;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.jumpRunAction();
    },

    start () {

    },

    update (dt) {
        this.node.runAction(this.heroDownMove());
    },
});
