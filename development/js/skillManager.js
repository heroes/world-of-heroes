/**
 * 技能类
 */
Laro.register('PD', function (La) {
    var pkg = this;

    this.$skillManager = {

    };

    /**
     * 技能状态： 释放中
     * @return {[type]} [description]
     */
    this.Sill_active = La.BaseState.extend(
        function () {

        }).methods({
            enter:function (msg, fromState) {

            },
            leave:function () {

            },
            update:function (dt) {

            },
            draw:function (render) {

            },
            transition:function () {

            }
        });

    /**
     * 技能状态：等待中
     * @return {[type]} [description]
     */
    this.Sill_await = La.BaseState.extend(
        function () {

        }).methods({
            enter:function (msg, fromState) {

            },
            leave:function () {

            },
            update:function (dt) {

            },
            draw:function (render) {
                render.drawImage(imgW, 20 + i * 100, 20, 0, 0, 1, false, false);
                render.drawImage(PD.textures['skill_hl'], 20 + i * 100, 20, 0, 0, 1, false, false);

            },
            transition:function () {

            }
        });

    /**
     * 技能状态：冷却中
     * @return {[type]} [description]
     */
    this.Sill_reload = La.BaseState.extend(
        function () {

        }).methods({
            enter:function (msg, fromState) {

            },
            leave:function () {

            },
            update:function (dt) {

            },
            draw:function (render) {

            },
            transition:function () {

            }
        });
    // 状态表
    var statesList = [
        0, this.Sill_await,
        1, this.Sill_active,
        2, this.Sill_reload
    ];

    var statesHash = {
        'await':0,
        'active':1,
        'reload':2
    }
    /**
     * 技能类
     * @param  {[type]} x      [description]
     * @param  {[type]} y      [description]
     * @param  {[type]} width  [description]
     * @param  {[type]} height [description]
     * @return {[type]}        [description]
     */
    this.Skill = La.Class(
        function (cfg) {

            this.fsm = new La.AppFSM(this, statesList);

            // 生成一个 标识 人物范围的 sprite
            this.checkSprite = new La.$sprite(PD.stage.ctx, function () {
                this.type = 'skillIcon';
                this.belongTo = this.curRole;
                this.x = 20 + i * 100;
                this.y = 20;
                this.width = 80;
                this.height = 80;

            });
            PD.stage.addChild(this.checkSprite);
            this.checkSprite.addEventListener('mousedown', function (x, y) {
                //判断当前技能状态
                if (this.getState != 'await')return;
                this.setState('acitve');
            });
            this.checkSprite.addEventListener('touchstart', function (x, y) {
                //判断当前技能状态
                if (this.getState != 'await')return;
                this.setState('acitve');
            });

        }).methods({
            //获取技能状态
            getState:function () {
                return statesHash[this.fsm.getCurrentState()];
            },
            //状态切换
            setState:function (state, msg) {
                this.fsm.setState(statesHash[state], msg);
            },
            update:function (dt) {
                this.fsm.update(dt);
            },
            draw:function (render) {
                this.fsm.draw(render);
            }

        });
});