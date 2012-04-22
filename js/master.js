/* 怪物类 */
Laro.register('PD', function (La) {
<<<<<<< HEAD
	//Boss第二形态
    this.Boss2_Skill_Extracting=La.BaseState.extend(function(){}).methods(
		{
			enter:function (msg, fromState) {
                this.anim = this.host.getAnimation('boss_2_skill');
                this.anim.play();
				this.anim2 = this.host.getAnimation('stone_fall');
				this.anim2.play();
                this._t = 0;
            },
            leave:function(){},
			update:function (dt) {
                this._t += dt;
                this.anim.renderMirrored = (this.host.x < this.host.targetrole.x);
                this.anim.update(dt);
				this.anim2.update(dt);
            },
            draw:function (render) {
				this.anim2.draw(render, this.host.x, this.host.y-20, 0, 1, null);
                this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
				
            },
            transition:function () {
                if(this._t>=this.anim2.getLength()*2){
                    for(var i = 0,role;role = PD.$roles[i++];){
						if(Math.abs(role.x-this.host.x)<250&&Math.abs(role.x-this.host.x)<70)
                       role.fsm.setState(2, {
                              attack:300,
                              roleFace:(this.host.x > role.x) // 为true时，人面向右
                        });
                    }
    				this.host.setState(0);
				}
            }
	}
	);
	//Boss大招1
	this.Boss_Skill_Extracting=La.BaseState.extend(
        function () {

        }).methods(
			{
			enter:function(msg, fromState){
				this.anim = this.host.getAnimation('boss_skill1');
				this.anim2 =new Array(6);
				for(var i=0;i<6;i++){
				 this.anim2[i] = this.host.getAnimation('light');
				 this.anim2[i].play();
				}
				for(var j = 0,role;role = PD.$roles[j++];){
                   		role.fsm.setState(2, {
                          attack:300,
                          roleFace:(this.host.x > role.x) // 为true时，人面向右
                    });
                }
                this.anim.play();
                this._t = 0;
			},
			leave:function(){},
			update:function (dt) {
                this._t += dt;
                this.anim.renderMirrored = (this.host.x < this.host.targetrole.x);
                this.anim.update(dt);
				for(var i=0;i<6;i++){
					this.anim2[i].update(dt);
				}
            },
            draw:function (render) {
				for(var i=0;i<3;i++){
				this.anim2[i].draw(render, Math.random()*960, Math.random()*640, 0, 1, null);}
				this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
				for(var j=3;j<6;j++){
				this.anim2[j].draw(render, Math.random()*960, Math.random()*640, 0, 1, null);}
            },
            transition:function () {
                if(this._t>2){
					this.host.setState(0);
				}
            }
			}
		);
	    //Boss大招2
	this.Boss_Skill2_Extracting=La.BaseState.extend(
        function () {

        }).methods(
			{
			enter:function (msg, fromState) {
                this.anim = this.host.getAnimation('boss_skill2');
                this.anim.play();
				this.anim2 = this.host.getAnimation('buff');
				this.anim2.play();
                this._t = 0;
            },
            leave:function(){},
			update:function (dt) {
                this._t += dt;
                this.anim.renderMirrored = (this.host.x < this.host.targetrole.x);
                this.anim.update(dt);
				this.anim2.update(dt);
            },
            draw:function (render) {
                this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
				this.anim2.draw(render, this.host.targetrole.x, this.host.targetrole.y-100, 0, 1, null);
            },
            transition:function () {
                if(this._t>2){
				this.host.targetrole.fsm.setState(2, {
                      attack:200,
                      roleFace:(this.host.x > this.host.targetrole.x) // 为true时，人面向右
                });
				this.host.setState(0);
				}
            }
			}
		);
	
    this.M_Wait = La.BaseState.extend(
        function () {

        }).methods({
            enter:function (msg, fromState) {
                this.anim = this.host.getAnimation(this.host.id);
                this.anim.play();
                this._t = 0;
            },
            leave:function () {

            },
            update:function (dt) {
                this._t += dt;
                this.anim.renderMirrored = (this.host.x < this.host.targetrole.x);
                this.anim.update(dt);
            },
            draw:function (render) {
                this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
            },
            transition:function () {
                
                if (this.host.heath <= 0 || this.host.dead) {
                    this.host.setState(4)
                }
				//选择攻击距离自己最近的人物
				//var role = PD.$roles;
				//;
                var dis = 999;
                for(var i = 0,role;role = PD.$roles[i++];){
                    this.dis = Math.sqrt(Math.pow(role.x - this.host.x, 2) + Math.pow(role.y - this.host.y, 2));
                    if(this.dis < dis){
                        dis = this.dis;
                        this.host.targetrole = role;
                    }
                }

				if (this.dis - this.host.r_attack <= 0) {
                    this.host.fsm.setState(2);
                } else if (this.dis - this.host.r_run <= 0) {
                    this.host.fsm.setState(1);
                } else {
                    this.host.fsm.setState(0);
                }
            }
        });

    this.M_Run = La.BaseState.extend(
        function () {

        }).methods({
            enter:function (msg, fromState) {
                this.anim = this.host.getAnimation(this.host.id);
                this.anim.play();
                this._t = 0;
                this.speed = this.host.speed;
                this.dis = 0;
            },
            leave:function () {

            },
            update:function (dt) {
                this.anim.renderMirrored = (this.host.x < this.host.targetrole.x);
                this.anim.update(dt);
                this.speed = 100 * dt;

                var role = this.host.targetrole;
                this.dis = Math.sqrt(Math.pow(role.x - this.host.x, 2) + Math.pow(role.y - this.host.y, 2));

                //var angle = Math.atan((PD.MOUSEDOWN_X - this.host.x)/(PD.MOUSEDOWN_Y - this.host.y));
                var spy = this.speed * (role.y - this.host.y) / this.dis;
                var spx = this.speed * (role.x - this.host.x) / this.dis;

                this.host.x += spx;
                this.host.y += spy;

                if (this._t >= this.anim.getLength()) {
                    this.animationEnd = true;
                }
            },
            draw:function (render) {
                this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
            },
            transition:function () {
                if (this.dis - this.host.r_attack <= 0) {
                    this.host.fsm.setState(2);
                } else if (this.animationEnd) {
                    this.host.fsm.setState(0);
                }
            }
        });

    this.M_Attacked = La.BaseState.extend(
        function () {

        }).methods({
            enter:function (msg, fromState) {
                this.anim = this.host.getAnimation(this.host.id);
                this.anim.play();
                this._t = 0;
                this.speed = this.host.speed;
                this.dis = 0;
                this.animationEnd = false;

            },
            leave:function () {

            },
            update:function (dt) {
                this._t += dt;
                this.anim.renderMirrored = (this.host.x < this.host.targetrole.x);
                this.anim.update(dt);

                if (this._t >= this.anim.getLength()) {
                    this.animationEnd = true;
					this.host.targetrole.nowLife -= this.host.attack||15 ;
			        this.host.targetrole.nowLife = this.host.targetrole.nowLife >=0 ? this.host.targetrole.nowLife : 0;
			this.host.targetrole.roleFaceRight = this.host.x > this.host.targetrole.x;
			if(this.host.targetrole.nowLife<=0){
			this.host.targetrole.fsm.setState(7);}		
					//普通攻击不进入晕眩状态
                    //this.host.targetrole.fsm.setState(2, {
                        //attack:15,
                        //roleFace:(this.host.x > this.host.targetrole.x) // 为true时，人面向右
                    //});
                }
            },
            draw:function (render) {
                this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
            },
            transition:function () {
                if (this.animationEnd) {
                    this.host.fsm.setState(0);
                }
            }
        });
	
    //被攻击
    this.M_Beattacked = La.BaseState.extend(
        function () {

        }).methods({
            enter:function (msg, fromState) {
                this.anim = this.host.getAnimation(this.host.id);
                this.anim.play();
                this._t = 0;
                this.speed = this.host.speed;
                this.dis = 0;
                this.animationEnd = false;
                this.msg = msg;
                this.host.heath -= this.msg.attack;
                if (this.msg.offset) {
                    this.host.x += this.msg.offset;
                }
            },
            leave:function () {

            },
            update:function (dt) {
                this._t += dt;
                this.anim.renderMirrored = (this.host.x < this.host.targetrole.x);
                this.anim.update(dt);


                if (this._t >= this.anim.getLength()) {
                    var role = this.host.targetrole;

                    this.animationEnd = true;
                }
            },
            draw:function (render) {
                this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
            },
            transition:function () {
                if (this.animationEnd) {
                    this.host.fsm.setState(0);
                }
            }
        });
	this.Boss1_Beattacked=this.M_Beattacked.extend(function(){}).methods({
		 enter:function (msg, fromState) {
                this.anim = this.host.getAnimation('boss_atttacked');
                this.anim.play();
                this._t = 0;
                this.speed = this.host.speed;
                this.dis = 0;
                this.animationEnd = false;
                this.msg = msg;
                this.host.heath -= this.msg.attack;
                if (this.msg.offset) {
                    this.host.x += this.msg.offset;
                }
            },
	});
	this.Boss2_Beattacked=this.M_Beattacked.extend(function(){}).methods({
		 enter:function (msg, fromState) {
                this.anim = this.host.getAnimation('boss_2_attacked');
                this.anim.play();
                this._t = 0;
                this.speed = this.host.speed;
                this.dis = 0;
                this.animationEnd = false;
                this.msg = msg;
                this.host.heath -= this.msg.attack;
                if (this.msg.offset) {
                    this.host.x += this.msg.offset;
                }
            },
	});
    this.M_Dead = La.BaseState.extend(
        function () {

        }).methods({
            enter:function (msg, fromState) {
                console.log('dead');
                //this.anim = this.host.getAnimation(this.host.id);
                //this.anim.play();
                this._t = 0;
                this.a = 1;
                for (var i = 0; i < PD.$monsters.length; i++) {
                    var mo = PD.$monsters[i];
                    if (mo.heath <= 0 || mo.dead) {
                        PD.$monsters.splice(i, 1);
                        i--;
                    }
                }
                if (PD.$monsters.length == 0) {
                    //this.showGo();
                    //this.host.setState(5);
                    PD.$fsm.$.setState(6);
                }
            },
            leave:function () {

            },
            update:function (dt) {
               // this._t += dt;
               // this.anim.update(dt);
                //this.a = Math.max(1-this._t/2, 0);

            },
            draw:function (render) {
               // this.anim.draw(render, this.host.x, this.host.y, 0, this.a, null);
            },
            transition:function () {
                console.log(PD.$monsters)
                //if (this.a == 0) {
                for (var i = 0; i < PD.$monsters.length; i++) {
                    var mo = PD.$monsters[i];
                    if (mo.heath <= 0 || mo.dead) {
                        PD.$monsters.splice(i, 1);
                        i--;
                    }
                }
                //	}

            }
        });

    this.GoNext = La.BaseState.extend().methods({
        enter:function (msg, fromState) {
            console.log('goNext');
            this._t = 0;
        },
        leave:function () {

        },
        update:function (dt) {
            this._t += dt;


        },
        draw:function (render) {
            render.drawImage(PD.textures['GO'], 0, render.getHeight() / 2 - 50, 0, 1, 1, false, false);
        },
        transition:function () {

        }
    });

    // 怪物 statesList
    var statesList = [
        0, this.M_Wait,
        1, this.M_Run,
        2, this.M_Attacked,
        3, this.M_Beattacked,
        4, this.M_Dead,
        5, this.GoNext
    ];
	
	var statesList2=[
		0, this.M_Wait,
        1, this.M_Run,
        2, this.M_Attacked,
        3, this.Boss1_Beattacked,
        4, this.M_Dead,
        5, this.GoNext,
		6, this.Boss_Skill_Extracting,
		7, this.Boss_Skill2_Extracting
	];
	//BOSS第二形态的状态列表
	var statesList3=[
		0, this.M_Wait,
        1, this.M_Run,
        2, this.M_Attacked,
        3, this.Boss2_Beattacked,
        4, this.M_Dead,
        5, this.GoNext,
		6, this.Boss2_Skill_Extracting
	];
    //怪物的随机种类
    var masterCat = 0;
    var getMasterCatId = function(){
        return masterCat++;
    }
    this.Master = La.Class(
        function (x, y, width, height) {
            this.x = x;
            this.y = y;

            this.id = 'monster_'+ getMasterCatId()%2;

            this.width = width || 98;
            this.height = height || 110;
            this.heath = this.fullHeath = 500;
            this.dead = false;
            this.speed = 0.1;

            this.attack = 15;

            this.bloodBarW = 80;
            this.bloodBarH = 6;
            this.bloodBarOffset = 0;

            //cfg
            this.r_attack = 40;
            this.r_run = 1000;

            this.animHash = {};
			// 设定一开始的默认攻击人物为大侠
			this.targetrole=PD.$roles[0];

            this.fsm = new La.AppFSM(this, statesList);
            this.setState(0);
            //this.fsm.setState(0)
        }).methods({
            setState:function (state, msg) {
                this.fsm.setState(state, msg);
            },
            update:function (dt) {
                this.fsm.update(dt);
                this.checkLife(dt);
            },
            checkLife:function (dt) {
                if (this.heath <= 0) {
                    this.heath = 0;
                    this.dead = true;
                }
            },
            chkrun:function () {

            },
            chkAttack:function () {

            },
            draw:function (render) {
                this.fsm.draw(render);
                this.drawBloodBar(render);
            },
            drawBloodBar:function (render) {
                var ctx = render.context;
                var x = this.x - this.bloodBarW / 2;
                var y = this.y - this.height + this.bloodBarOffset;
                var border = 1;
                ctx.save();
                ctx.globalAlpha = 0.7;
                ctx.lineCap = "round";


                ctx.beginPath();
                ctx.lineWidth = this.bloodBarH+border*2;
                ctx.strokeStyle = '#000';
                ctx.moveTo(x-border,y);
                ctx.lineTo(x+border+this.bloodBarW,y);
                ctx.stroke();
                ctx.closePath();

                ctx.beginPath();
                ctx.lineWidth = this.bloodBarH ;
                ctx.strokeStyle = 'green';
                ctx.moveTo(x,y);
                ctx.lineTo(x+this.bloodBarW * this.heath / this.fullHeath ,y);
                ctx.stroke();
                ctx.closePath();
				
                ctx.restore();
            },
            getAnimation:function (id) {
                if (this.animHash[id]) {
                    return this.animHash[id];
                }
                var stInfo = g_data.imageW[id],
                    info = stInfo.info,
                    data = stInfo.data,
                    image = PD.loader.loadedImages[stInfo.filename];

                var frames = [];
                for (var i = 0; i < data.length; i++) {
                    var source = data[i];

                    var width = source[2] - source[0];
                    var height = source[3] - source[1];

                    var xOffset = source[0] - source[4];
                    var yOffset = source[1] - source[5];

                    var textureWidth = xOffset + width + source[6] - source[2];
                    var textureHeight = yOffset + height + source[7] - source[3];

                    frames.push(new Laro.ImageRegion(image, source[0], source[1], width, height, xOffset, yOffset, textureWidth, textureHeight));
                }
                ;

                var anim = new Laro.Animation(info, frames);
                this.animHash[id] = new La.AnimationHandle(anim);
                return this.animHash[id];
            }
        });
		//Boss的类
		this.Boss=this.Master.extend(function(){
			this.fsm = new La.AppFSM(this, statesList2);
            this.speed = 0.5;
		});
		
		this.Boss2=this.Boss.extend(function(){this.fsm = new La.AppFSM(this, statesList3);});
=======

	// 怪物state Class
	this.M_Wait = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			this.anim = this.host.getAnimation(this.host.id);
			this.anim.play();
			this._t = 0;
		},
		leave: function () {
		
		},
		update: function (dt) {
			this._t += dt;
			this.anim.update(dt);
		},
		draw: function (render) {
			this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
		},
		transition: function () {
			var role = PD.$role;

			if (this.host.heath <= 0 || this.host.dead) {
				this.host.setState(4)
			}

			this.dis = Math.sqrt(Math.pow(role.x - this.host.x, 2) + Math.pow(role.y - this.host.y, 2));

			if(this.dis - this.host.r_attack <= 0){
                this.host.fsm.setState(2);
			}else if(this.dis - this.host.r_run <= 0){
                this.host.fsm.setState(1);
			}else{
                this.host.fsm.setState(0);
			}
		}
	});
	
	this.M_Run = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			this.anim = this.host.getAnimation(this.host.id);
			this.anim.play();
			this._t = 0;
			this.speed = 1;
			this.dis = 0;
		},
		leave: function () {
		
		},
		update: function (dt) {
			this.anim.update(dt);
			this.speed = 100*dt;
			
			var role = PD.$role;
			this.dis = Math.sqrt(Math.pow(role.x - this.host.x, 2) + Math.pow(role.y - this.host.y, 2));
			
			//var angle = Math.atan((PD.MOUSEDOWN_X - this.host.x)/(PD.MOUSEDOWN_Y - this.host.y));
			var spy = this.speed*(role.y - this.host.y)/this.dis;
			var spx = this.speed*(role.x - this.host.x)/this.dis;
			
			this.host.x += spx;
			this.host.y += spy;

			if (this._t >= this.anim.getLength()) {
                this.animationEnd = true;
            }
		},
		draw: function (render) {
			this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
		},
		transition: function () {
			if(this.dis - this.host.r_attack <= 0){
                this.host.fsm.setState(2);
			}else if(this.animationEnd){
                this.host.fsm.setState(0);
			}
		}
	});
	
	this.M_Attacked = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			this.anim = this.host.getAnimation(this.host.id);
			this.anim.play();
			this._t = 0;
			this.speed = 1;
			this.dis = 0;
			this.animationEnd = false;

		},
		leave: function () {
		
		},
		update: function (dt) {
			this._t += dt;
			this.anim.update(dt);

			if (this._t >= this.anim.getLength()) {
                this.animationEnd = true;
				PD.$role.fsm.setState(2, {
					attack: 15,
					roleFace: (this.host.x > PD.$role.x) // 为true时，人面向右
				}); 
            }
		},
		draw: function (render) {
			this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
		},
		transition: function () {
			if (this.animationEnd) {
                this.host.fsm.setState(0);
            }
		}
	});

	//被攻击
	this.M_Beattacked = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			this.anim = this.host.getAnimation(this.host.id);
			this.anim.play();
			this._t = 0;
			this.speed = 1;
			this.dis = 0;
			this.animationEnd = false;
			this.msg = msg;
			this.host.heath -= this.msg.attack;
			if (this.msg.offset) {
				this.host.x += this.msg.offset;
			}
		},
		leave: function () {
		
		},
		update: function (dt) {
			this._t += dt;
			this.anim.update(dt);
			


			if (this._t >= this.anim.getLength()) {
				var role = PD.$role;
				
                this.animationEnd = true;
            }
		},
		draw: function (render) {
			this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
		},
		transition: function () {
			if (this.animationEnd) {
                this.host.fsm.setState(0);
            }
		}
	});
	
	this.M_Dead = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) { console.log('dead')
			this.anim = this.host.getAnimation(this.host.id);
			this.anim.play();
			this._t = 0;
			this.a = 1;
			for (var i = 0; i < PD.$monsters.length; i ++) {
					var mo = PD.$monsters[i];
					if (mo.heath <= 0 || mo.dead) {
						PD.$monsters.splice(i, 1);
						i --;
					}
				}
			if (PD.$monsters.length == 0) {
				//this.showGo();
				//this.host.setState(5);
				PD.$fsm.$.setState(6)
			}
		},
		leave: function () {
		
		},
		update: function (dt) {
			this._t += dt;
			this.anim.update(dt);
			//this.a = Math.max(1-this._t/2, 0);
			
		},
		draw: function (render) {
			this.anim.draw(render, this.host.x, this.host.y, 0, this.a, null);
		},
		transition: function () { console.log(PD.$monsters)
			//if (this.a == 0) {
				for (var i = 0; i < PD.$monsters.length; i ++) {
					var mo = PD.$monsters[i];
					if (mo.heath <= 0 || mo.dead) {
						PD.$monsters.splice(i, 1);
						i --;
					}
				}
		//	}
			
		}	
	});
	
	this.GoNext = La.BaseState.extend().methods({
		enter: function (msg, fromState) { 
			console.log('goNext');
			this._t = 0;
		},
		leave: function () {
			
		},
		update: function (dt) {
			this._t += dt;
			

		},
		draw: function (render) {
			render.drawImage(PD.textures['GO'], 0, render.getHeight()/2-50, 0, 1, 1, false, false);
		},
		transition: function () {

		}	
	});
	
	// 怪物 statesList
	var statesList = [
		0, this.M_Wait,
		1, this.M_Run,
		2, this.M_Attacked,
		3, this.M_Beattacked,
		4, this.M_Dead,
		5, this.GoNext
	]
	
	this.Master = La.Class(function (x, y, width, height) {
		this.x = x;
		this.y = y;
		
		this.id = 'monster';

		this.width = width || 98;
		this.height = height || 110;
		this.heath = this.fullHeath = 500;
		this.dead = false;

		this.attack = 15;

		this.bloodBarW = 80;
		this.bloodBarH = 6;

		//cfg
		this.r_attack = 40;
		this.r_run = 300;

		this.animHash = {};
		
		this.fsm = new La.AppFSM(this, statesList);
		this.setState(0);
		//this.fsm.setState(0)
	}).methods({
		setState: function (state, msg) {
			this.fsm.setState(state, msg);
		},
		update: function (dt) {
			this.fsm.update(dt);
			this.checkLife(dt);
		},
		checkLife: function (dt) {
			if (this.heath <=0) {
				this.heath = 0;
				this.dead = true;
			}
		},
		chkrun : function(){

		},
		chkAttack : function(){

		},
		draw: function (render) {
			this.fsm.draw(render);
			this.drawBloodBar(render);
		},
		drawBloodBar: function (render) {
			var ctx = render.context;
			ctx.save();
			ctx.globalAlpha = 0.7;
			ctx.fillStyle = '#000';
			ctx.fillRect(this.x - this.bloodBarW/2-2, this.y-this.height-2, this.bloodBarW+4, this.bloodBarH+4);
			
			ctx.fillStyle = 'green';
			ctx.fillRect(this.x - this.bloodBarW/2, this.y-this.height, this.bloodBarW*this.heath/this.fullHeath, this.bloodBarH)
			ctx.restore();
		},
		getAnimation: function (id) {
			if (this.animHash[id]) {
				return this.animHash[id];
			}
			var stInfo = g_data.imageW[id],
				info = stInfo.info,
				data = stInfo.data,
				image = PD.loader.loadedImages[stInfo.filename];
				
			var frames = [];
			for (var i = 0; i < data.length; i ++) {
				var source = data[i];
				
				var width = source[2] - source[0];
				var height = source[3] - source[1];
		 
				var xOffset = source[0] - source[4];
				var yOffset = source[1] - source[5];
		 
				var textureWidth = xOffset + width + source[6] - source[2];
				var textureHeight = yOffset + height + source[7] - source[3];

				frames.push(new Laro.ImageRegion(image, source[0], source[1], width, height, xOffset, yOffset, textureWidth, textureHeight));
			};
			
			var anim = new Laro.Animation(info, frames);
			this.animHash[id] = new La.AnimationHandle(anim);
			return this.animHash[id]; 
		}
	});
	
	this.Boss = this.Master.extend();
>>>>>>> 2f79a095800447d3b514a8de6ee2d39c59409f90
});