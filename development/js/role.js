/* 人物Role */
Laro.register('PD', function (La) {
	//定义死亡状态	
	this.R_Dead=La.BaseState.extend(function(){}).methods({
		enter:function (msg, fromState) {
                console.log('dead');
                this._t = 0;
				
				//大侠死亡则游戏结束
                if (PD.$roles[0].nowLife <= 0) {
					//清除技能列表
					for (var i = 0; i < PD.stage.children.length; i++) {
                    var child = PD.stage.children[i];
                    if (child.type == 'skillIcon') {
                        PD.stage.children.splice(i, 1);
                        i--;
                    }
                    }
                    PD.$fsm.$.setState(4);
                    return;
                }
                //去掉目标
           		for(var n = 0, master;master = PD.$monsters[n++];){
           			if(this.host == master.targetrole){
               			master.targetrole = PD.$roles[0];
           			}
           		}
           		//去掉点击绑定对象
           		for (var i = 0; i < PD.stage.children.length; i++) {
                    var child = PD.stage.children[i];
                    if (child == this.host.checkSprite) {
                        PD.stage.children.splice(i, 1);
                        i--;
                    }
                }

           		delete PD.$roles[this.host.index];
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

            }
	});
	// 人物state Class
	this.R_Wait = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			this.anim = this.host.getAnimation('role_wait');
			this.anim.play();
			this._t = 0;
			this.length = this.anim.getLength();
		},
		leave: function () {
		
		},
		update: function (dt) {
			this._t += dt;
			this.anim.renderMirrored = !this.host.roleFaceRight;
			this.anim.update(dt);
			if (this._t > this.length) {
				this.checkNearMonster();
			}	
		},
		checkNearMonster: function () {
			var hasNear = false;
			var mm = null;
			for (var i = 0; i < PD.$monsters.length; i ++) {
				var mo = PD.$monsters[i];
				if (mo.dead) {
					break;
				}
				var dis = Math.sqrt(Math.pow(this.host.x - mo.x, 2) + Math.pow(this.host.y - mo.y, 2));
				if (dis < 100) {
					mo.setState(3, {
						attack: 20
					});
					//mo.x += ((this.host.x > mo.x) ? -40 : 40);
					hasNear = true;
					mm = mo;
				}
			}
			if (hasNear) {
				this.host.roleFaceRight = (this.host.x < mm.x);
				this.host.setState(3, mm);
			}
		},
		draw: function (render) {
			this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
		},
		transition: function () {
			PD.currentRole == this.host.index && this.host.startMove && this.host.setState(1);
		}
	});
	//人物2等待状态
	this.R2_Wait = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			this.anim = this.host.getAnimation('role2_wait');
			this.anim.play();
			this._t = 0;
			this.length = this.anim.getLength();
		},
		leave: function () {
		
		},
		update: function (dt) {
			this._t += dt;
			this.anim.renderMirrored = !this.host.roleFaceRight;
			this.anim.update(dt);
			if (this._t > this.length) {
				this.checkNearMonster();
			}
			
		},
		checkNearMonster: function () {
			var hasNear = false;
			var mm = null;
			for (var i = 0; i < PD.$monsters.length; i ++) {
				var mo = PD.$monsters[i];
				if (mo.dead) {
					break;
				}
				var dis = Math.sqrt(Math.pow(this.host.x - mo.x, 2) + Math.pow(this.host.y - mo.y, 2));
				if (dis < 100) {
					mo.setState(3, {
						attack: 30
					});
					//mo.x += ((this.host.x > mo.x) ? -40 : 40);
					hasNear = true;
					mm = mo;
				}
			}
			if (hasNear) {
				this.host.roleFaceRight = (this.host.x < mm.x);
				this.host.setState(3, mm);
			}
		},
		draw: function (render) {
			this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
		},
		transition: function () {
			PD.currentRole == this.host.index && this.host.startMove && this.host.setState(1);
		}
	});
	//人物1行走状态
	this.R_Run = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			this.anim = this.host.getAnimation('role_run');
			this.anim.play();
			this._t = 0;
			this.speed = 10;
			this.dis = 0;
		},
		leave: function () {
		
		},
		update: function (dt) {
			this.speed = 200*dt;
			this.anim.renderMirrored = !this.host.roleFaceRight;
			this.anim.update(dt);
			
			this.dis = Math.sqrt(Math.pow(this.host.pieX - this.host.x, 2) + Math.pow(this.host.pieY - this.host.y, 2));
			
			//var angle = Math.atan((PD.MOUSEDOWN_X - this.host.x)/(PD.MOUSEDOWN_Y - this.host.y));
			var spy = this.speed*(this.host.pieY - this.host.y)/this.dis;
			var spx = this.speed*(this.host.pieX - this.host.x)/this.dis;
			
			this.host.x += spx;
			if (this.host.y + spy < 168) {
				this.host.y = 168;
			} else {
				this.host.y += spy;
			}
			this.host.checkSprite.setPos(this.host.x, this.host.y);
		},
		draw: function (render) {
			this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
		},
		transition: function () {
			if (this.dis <= 4 || Math.abs(this.host.x-this.host.pieX) <= 2) {
				this.host.setState(0);
				this.host.startMove = false;
				this.host.showCircle = false;
			}
		}
	});
	this.R2_Run = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			this.anim = this.host.getAnimation('role2_run');
			this.anim.play();
			this._t = 0;
			this.speed = 5;
			this.dis = 0;
		},
		leave: function () {
		
		},
		update: function (dt) {
			this.speed = 200*dt;
			this.anim.renderMirrored = !this.host.roleFaceRight;
			this.anim.update(dt);
			
			this.dis = Math.sqrt(Math.pow(this.host.pieX - this.host.x, 2) + Math.pow(this.host.pieY - this.host.y, 2));
			
			//var angle = Math.atan((PD.MOUSEDOWN_X - this.host.x)/(PD.MOUSEDOWN_Y - this.host.y));
			var spy = this.speed*(this.host.pieY - this.host.y)/this.dis;
			var spx = this.speed*(this.host.pieX - this.host.x)/this.dis;
			
			this.host.x += spx;
			if (this.host.y + spy < 168) {
				this.host.y = 168;
			} else {
				this.host.y += spy;
			}
			this.host.checkSprite.setPos(this.host.x, this.host.y);
		},
		draw: function (render) {
			this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
		},
		transition: function () {
			if (this.dis <= 4 || Math.abs(this.host.x-this.host.pieX) <= 2) {
				this.host.setState(0);
				this.host.startMove = false;
				this.host.showCircle = false;
			}
		}
	});
	this.R_Attacked = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			this.anim = this.host.getAnimation('role_attacked');
			this.anim.play(false);
			this.length = this.anim.getLength();
			this._t = 0;
			this.host.nowLife -= msg.attack * (typeof this.host.hurtParam == 'number' ? this.host.hurtParam : 1);
			this.host.nowLife = this.host.nowLife >=0 ? this.host.nowLife : 0;
			this.host.roleFaceRight = msg.roleFace;
		},
		leave: function () {
		
		},
		update: function (dt) {
			this._t += dt;
			this.anim.renderMirrored = !this.host.roleFaceRight;
			this.anim.update(dt);
		},
		draw: function (render) {
			this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
		},
		transition: function () {
			if(!this.host.nowLife){
				this.host.setState(7);
			}
			else if (this._t > this.length) {
				this.host.setState(0);
			}
		}
	});
	this.R2_Attacked = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			this.anim = this.host.getAnimation('role2_attacked');
			this.anim.play(false);
			this.length = this.anim.getLength();
			this._t = 0;
			this.host.nowLife -= msg.attack * (typeof this.host.hurtParam == 'number' ? this.host.hurtParam : 1);
			this.host.nowLife = this.host.nowLife >=0 ? this.host.nowLife : 0;
			this.host.roleFaceRight = msg.roleFace;
		},
		leave: function () {
		
		},
		update: function (dt) {
			this._t += dt;
			this.anim.renderMirrored = !this.host.roleFaceRight;
			this.anim.update(dt);
		},
		draw: function (render) {
			this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
		},
		transition: function () {
			if (this._t > this.length) {
				this.host.setState(0);
			}
		}
	});
	// 普通攻击
	this.R_Attack = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) { 
			this.anim = this.host.getAnimation('role_attack');
			this.anim.play(false);
			this._t = 0;
			this.length = this.anim.getLength();
			this.msg = msg;

			this.music = PD.$res.getSound('OGG/role_attack.ogg');
			this.music.setVolume(0.2);
            this.music.play('default', false);

		},
		leave: function () {
			this.music.pause();
		},
		update: function (dt) {
			this._t += dt;
			this.anim.renderMirrored = !this.host.roleFaceRight;
			this.anim.update(dt);
			if (this.anim.currentFrame == 2) {
				this.msg.x += ((this.host.x > this.msg.x) ? -5 : 5);
			}
		},
		draw: function (render) {
			this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
		},
		transition: function () {
			if (this._t > this.length) {
				this.host.setState(0);
			}
		}
	});
		// 普通攻击
	this.R2_Attack = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) { 
			this.anim = this.host.getAnimation('role2_attack');
			this.anim.play(false);
			this._t = 0;
			this.length = this.anim.getLength();
			this.msg = msg;

			this.music = PD.$res.getSound('OGG/role_attack.ogg');
			this.music.setVolume(0.2);
            this.music.play('default', false);

		},
		leave: function () {
			this.music.pause();
		},
		update: function (dt) {
			this._t += dt;
			this.anim.renderMirrored = !this.host.roleFaceRight;
			this.anim.update(dt);
			if (this.anim.currentFrame == 2) {
				this.msg.x += ((this.host.x > this.msg.x) ? -5 : 5);
			}
		},
		draw: function (render) {
			this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
		},
		transition: function () {
			if (this._t > this.length) {
				this.host.setState(0);
			}
		}
	});
	//人物2施展技能状态
	// 技能1
	this.R_Skill1 = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			console.log('skill1');
			if(this._t){return};
			this.anim = this.host.getAnimation('skillAnim1');
			this.anim.play(false);
			this.length = this.anim.getLength();
			this._t = 0;

			this.music = PD.$res.getSound('OGG/role_skill1.ogg');
			this.music.setVolume(0.3);
            this.music.play('default', false);
		},
		checkNear: function () {
			var mm = null;
			for (var i = 0; i < PD.$monsters.length; i ++) {
				var mo = PD.$monsters[i];
				if (mo.dead) {
					break;
				}
				var dis = Math.sqrt(Math.pow(this.host.x - mo.x, 2) + Math.pow(this.host.y - mo.y, 2));
				if (dis < 100) {
					mo.setState(3, {
						attack: 130,
						offset: ((this.host.x > mo.x) ? -200 : 200)
					});
					//mo.x += ((this.host.x > mo.x) ? -40 : 40);
					hasNear = true;
					mm = mo;
				}
			}
		},
		leave: function () {
			this.music.pause();
		},
		update: function (dt) {
			this._t += dt;
			this.anim.renderMirrored = !this.host.roleFaceRight;
			this.anim.update(dt);
			
		},
		draw: function (render) {
			this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
		},
		transition: function () {
			if (this._t >= this.length) {
				this._t = 0;
				this.checkNear();
				this.host.setState(0);
			}
		}
	});	

	//  技能2
	this.R_Skill2 = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			if(this._t){return};
			console.log('skill2');
			this.anim = this.host.getAnimation('skillAnim2');
			this.anim.play(false);
			this.length = this.anim.getLength();
			this._t = 0;

			this.music = PD.$res.getSound('OGG/role_skill2.ogg');
			this.music.setVolume(0.3);
            this.music.play('default', false);
		},
		checkNear: function () {
			var mm = null;
			for (var i = 0; i < PD.$monsters.length; i ++) {
				var mo = PD.$monsters[i];
				if (mo.dead) {
					break;
				}
				var dis = Math.sqrt(Math.pow(this.host.x - mo.x, 2) + Math.pow(this.host.y - mo.y, 2));
				if (dis < 100) {
					mo.setState(3, {
						attack: 130,
						offset: ((this.host.x > mo.x) ? 50 : 50)
					});
					//mo.x += ((this.host.x > mo.x) ? -40 : 40);
					hasNear = true;
					mm = mo;

					//补血
					this.host.nowLife += 80;
					if (this.host.nowLife >= this.host.life) {
						this.host.nowLife = this.host.life;
					}
				}
			}
		},
		leave: function () {
			this.music.pause();
		},
		update: function (dt) {
			this._t += dt;
			this.anim.renderMirrored = !this.host.roleFaceRight;
			this.anim.update(dt);

			if(this.anim.currentFrame == 3){
				this.checkNear();
			}
		},
		draw: function (render) {
			this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
		},
		transition: function () {
			if (this._t >= this.length) {
				this._t = 0;
				this.host.setState(0);
			}
		}
	});
    var bigSkillLock = false;
	this.R_BigSkill = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			console.log(msg);
            if(bigSkillLock){
                //alert("大招有20秒cd的，别那么快放！");
                console.log("bigSkill is locked!");
                return;
            }
            bigSkillLock = true;
			this.music = PD.$res.getSound('OGG/star_fall.ogg');
			this.music.setVolume(0.2);
            this.music.play('default', false);
			this.anim = this.host.getAnimation('role_sskill');
            if(msg == 'v'){
                this.anim2=this.host.getAnimation('skill_rain_1');
                //document.getElementById("big_skill_1").className="big_skill fall_2";
            }else{
                this.anim2=this.host.getAnimation('skill_rain');
               // document.getElementById("big_skill_1").className="big_skill fall_1";
            }

//            setTimeout(function(){document.getElementById("big_skill_1").className="big_skill";},3000);
           setTimeout(function(){bigSkillLock = false;},20000);
			this.anim.play(false);
			this.anim2.play(false);
			this.length = this.anim.getLength();
			this._t = 0;
			this.pos = 0;
			
			for (var i = 0; i < PD.$monsters.length; i ++) {
				var mo = PD.$monsters[i];
				mo.setState(3, {
					attack: 300,
					offset: ((this.host.x > mo.x) ? -200 : 200)
				})
			}
		},

		leave: function () {
		
		},
		update: function (dt) {
			this._t += dt;
		//	this.anim.renderMirrored = !PD.roleFaceRight;
			this.anim.update(dt);
			this.anim2.update(dt);
			this.pos += 200*dt;
		},
		draw: function (render) {
			this.anim.draw(render, this.host.x, this.host.y, 0, 1, null);
//            for(var i=0;i<2;i++){
//                var pos = Math.random()*960;
//                this.anim2.draw(render, this.host.x+pos, this.host.y+124, 0, 1, null);
//            }
			this.anim2.draw(render, 400, this.host.y+124, 0, 1, null);
            this.anim2.draw(render, 800, this.host.y+124, 0, 1, null);
            this.anim2.draw(render, 1200, this.host.y+124, 0, 1, null);
			//render.drawImage(PD.textures['skill_rain'], this.host.x - 100, this.host.y - 250 + this.pos, 0,1,1, false, false);
		},
		transition: function () {
			if (this._t > 3) {
				this.host.setState(0);
			}
		}
	})
	
	// 人物 statesList
	var statesList = [
		0, this.R_Wait,
		1, this.R_Run,
		2, this.R_Attacked,
		3, this.R_Attack,
		4, this.R_Skill1,
		5, this.R_Skill2,
		6, this.R_BigSkill,
		7, this.R_Dead
	]
	var statesList2 = [
		0, this.R2_Wait,
		1, this.R2_Run,
		2, this.R2_Attacked,
		3, this.R2_Attack,
		4, this.R2_Wait,
		5, this.R2_Wait,
		6, this.R2_Wait,
		7, this.R_Dead
	]
	this.Role = La.Class(function (id, x, y, s_id,index,width, height) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.width = width || 106;
		this.height = height || 128;
		this.bloodBarW = 150;
		this.bloodBarH = 10;
		this.index = index;


		this.life = 500;
		this.nowLife = 500;
		//人物方向
		this.roleFaceRight = 1;

		this.animHash = {};
		this.aroundAnimHash = {
			'recover': this.getAnimation('role_recover'),
			'defense': this.getAnimation('role_defense')
		};
		
		this.fsm = new La.AppFSM(this, statesList);
		
		// 生成一个 标识 人物范围的 sprite
		this.checkSprite = new La.$sprite(PD.stage.ctx, function () {
			this.x = x - 53;
			this.y = y-128;
			this.width = 106;
			this.height = 128;
			this.draw = function () {
			/*	this.ctx.beginPath();
				this.ctx.rect(0, 0, this.width, this.height);
				this.ctx.closePath();
				this.ctx.strokeStyle = 'black';
				this.ctx.stroke(); */
			};
			this.setPos = function (x, y) {
				this.x = x - 53;
				this.y = y-128;
			}
		});
		PD.stage.addChild(this.checkSprite);
		this.checkSprite.addEventListener('mousedown', function (x, y) {
			if (PD.mouseOnIcon) {return}
			PD.roleMousedown = true;
			PD.currentRole = index;
			PD.curRole = s_id;
			PD.$roles[PD.currentRole].showCircle = true;
		});
		this.checkSprite.addEventListener('touchstart', function (x, y) {
			if (PD.mouseOnIcon) {return }
			PD.roleMousedown = true;
			PD.curRole = s_id;
			PD.currentRole = index;
			PD.$roles[PD.currentRole].showCircle = true;
		});
		//this.checkSprite.addEventListener('mouseup', function () { PD.roleMousedown = false });
		//this.checkSprite.addEventListener('touchend', function () { PD.roleMousedown = false });
		

	}).methods({
		setState: function (state, msg) {
			this.fsm.setState(state, msg);
		},
		update: function (dt) {
			this.fsm.update(dt);
			this.updateSkillAnim(dt);
		},
		draw: function (render) {
			PD.currentRole == this.index && this.showCircle && this.drawCircle(render);
			this.fsm.draw(render);
			this.drawBloodBar(render);
			this.drawSkillAnim(render);
		},
		// 技能效果
		updateSkillAnim: function (dt) {
			for (var a in this.aroundAnimHash) {
				var anim = this.aroundAnimHash[a];
				anim.update(dt);
			}
		},
		drawSkillAnim: function (render) {
			for (var a in this.aroundAnimHash) {
				var anim = this.aroundAnimHash[a];
				var oy = a == 'recover' ? 60 : 30;
				anim.playing && anim.draw(render, this.x, this.y-oy, 0, 1, false);
			}
		},
		drawBloodBar: function (render) {
            var ctx = render.context;
            var x = this.x - this.bloodBarW / 2 ;
            var y = this.y - this.height-20;
            var border = 2;
            ctx.save();
            ctx.globalAlpha = 0.7;
            ctx.lineCap = "round";


            ctx.beginPath();
            ctx.lineWidth = this.bloodBarH+border*2;
            ctx.strokeStyle = '#000';
            ctx.moveTo(x - border,y );
            ctx.lineTo(x+border+this.bloodBarW,y);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.lineWidth = this.bloodBarH ;
            ctx.strokeStyle = 'green';
            ctx.moveTo(x,y);
            ctx.lineTo(x+ this.bloodBarW*this.nowLife/this.life ,y);
            ctx.stroke();
            ctx.closePath();

            ctx.restore();
		},
		drawCircle: function (render) {
			render.drawImage(PD.textures['circle'], this.x-this.width/2, this.y-30, 0, 0, 1, false, false)
		},
		getAnimation: function (id) {
			if (this.animHash[id]) {
				return this.animHash[id];
			}
			var stInfo = g_data.imageW[id],
				info = stInfo.info,
				data = stInfo.data,
				filename = stInfo.filename;
				
			var frames = [];
			var image = PD.loader.loadedImages[filename];
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
	
	this.Role2 =this.Role.extend(function(){this.fsm = new La.AppFSM(this, statesList2);}).methods({});
});
