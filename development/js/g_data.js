/* g_data */
g_data = {
	'font': {
		'loading': {
			"outline_b": 0,
			"font": "Microsoft YaHei",
			"outline": 1.0,
			"base_b": 255,
			"base_g": 255,
			"outline_r": 0,
			"base_r": 255,
			"size": 80,
			"id": "loading",
			"outline_g": 0
		}
	},
	imageW: {
		map1: {
			data: [
				[0, 0, 1023, 767, 0, 0, 1023, 767]
			],
			filename: 'images/map.jpg'
		},
		map2: {
			data: [
				[0, 0, 1023, 767, 0, 0, 1023, 767]
			],
			filename: 'images/BG2.jpg'
		},
		map3: {
			data: [
				[0, 0, 1023, 767, 0, 0, 1023, 767]
			],
			filename: 'images/BG3.jpg'
		},
		circle: {
			data: [
				[0, 0, 109, 58, 0, 0, 109, 58]
			],
			filename: 'images/circle.png'
		},
		pie: {
			data: [
				[0, 0, 75, 45, 0, 0, 75, 45]
			],
			filename: 'images/pie.png'
		},
		"buff": {
    "info": {
        "nbrOfFrames": 2,
        "name": "buff",
        "type": "animation",
        "framerate": 4,
        "pivotx": 60,
        "pivoty": 75,
        "events": []
    },
    "data": [
        [0,0,119,149,0,0,119,149],
        [120,0,239,149,120,0,239,149]
    ],
    "filename": "images/monster/buff.png"
},
		//妖女第二形态放技能
		"boss_2_skill": {
        "info": {
        "nbrOfFrames": 2,
        "type": "animation",
        "framerate": 4,
        "pivotx": 125,
        "pivoty": 92,
        "events": []
        },
       "data": [
        [753,0,1003,183,753,0,1003,183],
        [1004,0,1254,183,1004,0,1254,183],
        //[1255,0,1505,183,1255,0,1505,183]
        ],
       "filename": "images/monster/boss_2.png"
},
		//妖女第二形态挨打
		"boss_2_attacked": {
        "info": {
        "nbrOfFrames": 2,
        "type": "animation",
        "framerate": 4,
        "pivotx": 125,
        "pivoty": 92,
        "events": []
        },
       "data": [
        [1255,0,1505,183,1255,0,1505,183],
		[1255,0,1505,183,1255,0,1505,183]
        ],
       "filename": "images/monster/boss_2.png"
},
		"boss_2": {
        "info": {
        "nbrOfFrames": 3,
        "type": "animation",
        "framerate": 4,
        "pivotx": 125,
        "pivoty": 92,
        "events": []
        },
       "data": [
        [0,0,250,183,0,0,250,183],
        [251,0,501,183,251,0,501,183],
        [502,0,752,183,502,0,752,183],
        //[753,0,1003,183,753,0,1003,183],
        //[1004,0,1254,183,1004,0,1254,183],
        //[1255,0,1505,183,1255,0,1505,183]
        ],
       "filename": "images/monster/boss_2.png"
},
		// 人物周围的法术效果
		"role_recover": {
			"info": {
				"nbrOfFrames": 11,
				"name": "role_recover",
				"type": "animation",
				"framerate": 10,
				"pivotx": 62,
				"pivoty": 75,
				"events": []
			},
			"data": [
				[0,0,124,150,0,0,124,150],
				[125,0,249,150,125,0,249,150],
				[250,0,374,150,250,0,374,150],
				[375,0,499,150,375,0,499,150],
				[500,0,624,150,500,0,624,150],
				[625,0,749,150,625,0,749,150],
				[750,0,874,150,750,0,874,150],
				[875,0,999,150,875,0,999,150],
				[1000,0,1124,150,1000,0,1124,150],
				[1125,0,1249,150,1125,0,1249,150],
				[1250,0,1374,150,1250,0,1374,150]
			],
			"filename": "images/skillanim/role_recover.png"
		},
		"role_defense": {
			"info": {
				"nbrOfFrames": 4,
				"name": "role_defense",
				"type": "animation",
				"framerate": 10,
				"pivotx": 46,
				"pivoty": 26,
				"events": []
			},
			"data": [
				[0,0,93,51,0,0,93,51],
       	 [94,0,187,51,94,0,187,51],
        [188,0,281,51,188,0,281,51],
        [282,0,375,51,282,0,375,51]
			],
			"filename": "images/skillanim/role_defense.png"
		},
		
		// role status
		role_wait: {
			info: {
				"nbrOfFrames": 2,
				"pivoty": 150,
				"framerate": 4,
				"pivotx": 136,
				"events": []
			},
			data: [
				[1212,0,1514,181,1212,0,1514,181],
				[1515,0,1817,181,1515,0,1817,181]
			],
			filename: 'images/role/role-right.png'
		},
		//人物2等待状态
		role2_wait: {
			info: {
				"nbrOfFrames": 3,
				"pivoty": 123,
				"framerate": 4,
				"pivotx": 80,
				"events": []
			},
			data: [
				[0,0,139,132,0,0,139,132],
				[140,0,279,132,140,0,279,132],
				[280,0,419,132,280,0,419,132]
			],
			filename: 'images/role/role2.png'
		},
		role2_run: {
			info: {
				"nbrOfFrames": 3,
				"pivoty": 123,
				"framerate": 8,
				"pivotx": 80,
				"events": []
			},
			data: [
				[0,0,139,132,0,0,139,132],
				[140,0,279,132,140,0,279,132],
				[280,0,419,132,280,0,419,132]
			],
			filename: 'images/role/role2.png'
		},
		//人物2技能施放状态
		role2_skill: {
    		info: {
        	"nbrOfFrames": 4,
        	"framerate": 4,
        	"pivotx": 80,
        	"pivoty": 123,
        	"events": []
    	},
    	"data": [
        	[0,0,139,133,0,0,139,133],
        	[140,0,279,133,140,0,279,133],
        	[280,0,419,133,280,0,419,133],
        	[420,0,559,133,420,0,559,133]        	
    	],
    	"filename": "images/role/role2_skill.png"
		},
		//人物2受攻击状态
		role2_attacked: {
    		info: {
        	"nbrOfFrames": 1,
        	"framerate": 4,
        	"pivotx": 80,
        	"pivoty": 123,
        	"events": []
    	},
    	"data": [
        	[560,0,699,133,560,0,699,133],
    	],
    	"filename": "images/role/role2_skill.png"
		},
		
		skill_rain: {
			info: {
				"nbrOfFrames": 12,
				"pivoty": 448,
				"framerate": 4,
				"pivotx": 639,
				"events": []
			},
			data: [
				[0,0,638,447,0,0,638,447],
				[0,448,638,895,0,448,638,895],
				[0,896,638,1343,0,896,638,1343],
				[0,1344,638,1791,0,1344,638,1791],
				[0,1792,638,2239,0,1792,638,2239],
				[0,2240,638,2687,0,2240,638,2687],
				[0,0,638,447,0,0,638,447],
				[0,448,638,895,0,448,638,895],
				[0,896,638,1343,0,896,638,1343],
				[0,1344,638,1791,0,1344,638,1791],
				[0,1792,638,2239,0,1792,638,2239],
				[0,2240,638,2687,0,2240,638,2687]
			],
			filename: 'images/s_skill.png'
		},
        skill_rain_1: {
            info: {
                "nbrOfFrames": 12,
                "pivoty": 448,
                "framerate": 4,
                "pivotx": 639,
                "events": []
            },
            data: [
                [0,0,638,447,0,0,638,447],
                [0,448,638,895,0,448,638,895],
                [0,896,638,1343,0,896,638,1343],
                [0,1344,638,1791,0,1344,638,1791],
                [0,1792,638,2239,0,1792,638,2239],
                [0,2240,638,2687,0,2240,638,2687],
                [0,0,638,447,0,0,638,447],
                [0,448,638,895,0,448,638,895],
                [0,896,638,1343,0,896,638,1343],
                [0,1344,638,1791,0,1344,638,1791],
                [0,1792,638,2239,0,1792,638,2239],
                [0,2240,638,2687,0,2240,638,2687]
            ],
            filename: 'images/s_skill_1.png'
        },
		role_sskill: {
			info: {
				"nbrOfFrames": 12,
				"pivoty": 150,
				"framerate": 4,
				"pivotx": 136,
				"events": []
			},
			data: [
				[1818,0,2120,181,1818,0,2120,181],
				[2121,0,2423,181,2121,0,2423,181],
				[2424,0,2726,181,2424,0,2726,181],
				[2727,0,3029,181,2727,0,3029,181],
				[1818,0,2120,181,1818,0,2120,181],
				[2121,0,2423,181,2121,0,2423,181],
				[2424,0,2726,181,2424,0,2726,181],
				[2727,0,3029,181,2727,0,3029,181],
				[1818,0,2120,181,1818,0,2120,181],
				[2121,0,2423,181,2121,0,2423,181],
				[2424,0,2726,181,2424,0,2726,181],
				[2727,0,3029,181,2727,0,3029,181]
			],
			filename: 'images/role/role-right.png'
		},
		boss: {
			info: {
				"nbrOfFrames": 4,
                "framerate": 4,
                "pivotx": 240,
                "pivoty": 157,
                "events": []
			},
			data: [
				  [0,0,362,254,0,0,362,254],
                  [363,0,725,254,363,0,725,254],
                  [726,0,1088,254,726,0,1088,254],
                  [1089,0,1451,254,1089,0,1451,254]
			],
			filename: 'images/monster/boss_left.png'
		},
		boss_skill1:{
		 info: {
				"nbrOfFrames": 3,
                "framerate": 4,
                "pivotx": 240,
                "pivoty": 157,
                "events": []
			},
			data: [
				      [1452,0,1814,254,1452,0,1814,254],
        			  [1815,0,2177,254,1815,0,2177,254],
                      [2178,0,2540,254,2178,0,2540,254]
			      ],
			filename: 'images/monster/boss_left.png'	
		},
	light: {
    "info": {
        "nbrOfFrames": 2,
        "framerate": 8,
        "pivotx": 32,
        "pivoty": 296,
        "events": []
    },
    "data": [
        [0,0,61,591,0,0,61,591],
        [61,0,108,591,61,0,10,591]
    ],
    "filename": "images/monster/boss_skill1.png"
    },
		boss_skill2: {
    info: {
        "nbrOfFrames": 5,
        "framerate": 2,
        "pivotx": 240,
        "pivoty": 157,
        "events": []
    },
    "data": [
        [0,0,362,254,0,0,362,254],
        [363,0,725,254,363,0,725,254],
        [726,0,1088,254,726,0,1088,254],
        [1089,0,1451,254,1089,0,1451,254],
        [1452,0,1814,254,1452,0,1814,254]
    ],
    "filename": 'images/monster/boss_lightning.png'
      },
		role_run: {
			info: {
				"nbrOfFrames": 4,
				"pivoty": 150,
				"framerate": 8,
				"pivotx": 136,
				"events": []
			},
			data: [
				[0,0,302,181,0,0,302,181],
				[303,0,605,181,303,0,605,181],
				[606,0,908,181,606,0,908,181],
				[909,0,1211,181,909,0,1211,181]
			],
			filename: 'images/role/role-right.png'
		},
		role_attack: {
			info: {
				"nbrOfFrames": 3,
				"pivoty": 150,
				"framerate": 8,
				"pivotx": 136,
				"events": []
			},
			data: [
				[3030,0,3332,181,3030,0,3332,181],
				[3333,0,3635,181,3333,0,3635,181],
				[3636,0,3938,181,3636,0,3938,181]
			],
			filename: 'images/role/role-right.png'
		},
		role2_attack: {
			info: {
				"nbrOfFrames": 3,
				"pivoty": 123,
				"framerate": 8,
				"pivotx": 80,
				"events": []
			},
			data: [
				[0,0,139,132,0,0,139,132],
				[140,0,279,132,140,0,279,132],
				[280,0,419,132,280,0,419,132]
			],
			filename: 'images/role/role2.png'
		},
		role_attacked: {
			info: {
				"nbrOfFrames": 2,
				"pivoty": 150,
				"framerate": 4,
				"pivotx": 136,
				"events": []
			},
			data: [
				[3939,0,4241,181,3939,0,4241,181],
				[4242,0,4544,181,4242,0,4544,181]
			],
			filename: 'images/role/role-right.png'
		},
		
		// monster
		monster_0: {
			info: {
				"nbrOfFrames": 4,
				"pivoty": 100,
				"framerate": 4,
				"pivotx": 60,
				"events": []
			},
			data: [
				[0,0,97,109,0,0,97,109],
				[98,0,195,109,98,0,195,109],
				[196,0,293,109,196,0,293,109],
				[294,0,391,109,294,0,391,109]
			],
			filename: 'images/monster/left.png'
		},
        monster_1: {
            info: {
                "nbrOfFrames":3,
                "pivoty": 100,
                "framerate": 4,
                "pivotx": 60,
                "events": []
            },
            data: [
                [0,0,97,109,0,0,97,109],
                [98,0,195,109,98,0,195,109],
                [196,0,293,109,196,0,293,109]
            ],
            filename: 'images/monster/monster.png'
        },
		
		// skill icon
		skill1: {
			data: [
				[0, 0, 79, 79, 0, 0, 79, 79]
			],
			filename: 'images/skillicon/1.png'
		},
		skill2: {
			data: [
				[0, 0, 79, 79, 0, 0, 79, 79]
			],
			filename: 'images/skillicon/2.png'
		},
		skill3: {
			data: [
				[0, 0, 79, 79, 0, 0, 79, 79]
			],
			filename: 'images/skillicon/3.png'
		},
		skill4: {
			data: [
				[0, 0, 79, 79, 0, 0, 79, 79]
			],
			filename: 'images/skillicon/4.png'
		},
		skill5: {
			data: [
				[0, 0, 79, 79, 0, 0, 79, 79]
			],
			filename: 'images/skillicon/5.png'
		},
		skill_hl: {
			data: [
				[0, 0, 79, 79, 0, 0, 79, 79]
			],
			filename: 'images/skillicon/highlight.png'
		},
				// GO
		GO: {
			data: [
				[0, 0, 220, 99, 0, 0, 220, 99]
			],
			filename: 'images/GO.png'
		},
		
		// skill anim
		skillAnim1: {
			info: {
				"nbrOfFrames": 3,
				"pivoty": 150,
				"framerate": 4,
				"pivotx": 136,
				"events": []
			},
			data: [
				[0,0,302,181,0,0,302,181],
				[303,0,605,181,303,0,605,181],
				[606,0,908,181,606,0,908,181]
			],
			filename: 'images/skillanim/skill1.png'
		},
		// skill anim 2 吸血
		skillAnim2: {
			info: {
				"nbrOfFrames": 7,
				"pivoty": 187,
				"framerate": 8,
				"pivotx": 136,
				"events": []
			},
			data: [
				[0,0,329,218,0,0,329,218],
				[330,0,659,218,330,0,659,218],
				[660,0,989,218,660,0,989,218],
				[990,0,1319,218,990,0,1319,218],
				[1320,0,1649,218,1320,0,1649,218],
				[1650,0,1979,218,1650,0,1979,218],
				[1980,0,2309,218,1980,0,2309,218],
				/*
				[2310,0,2639,218,2310,0,2639,218],
				[2640,0,2969,218,2640,0,2969,218],
				[2970,0,3299,218,2970,0,3299,218],
				[3300,0,3629,218,3300,0,3629,218]*/
			],
			filename: 'images/skillanim/skill2.png'
		}
	},
};