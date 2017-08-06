/**
 * 游戏选关界面
 **/ 
var Stage = function(contex){
	this.ctx =contex;
	this.drawLevel = function(){
		this.cleanStage();
		this.ctx.beginPath();
	    this.ctx.font = "50px 黑体";
	    this.ctx.lineWidth = 5;
	    this.ctx.strokeStyle = "#784000";
	    this.ctx.strokeText("地 图 难 度",494,185); 
	   	this.ctx.fillStyle = "#C07000";
	    this.ctx.fillText("地 图 难 度",494,185);				
		this.ctx.strokeRect(495,350,40,5);
		this.ctx.strokeRect(725,350,40,5);
		this.ctx.strokeRect(742,332,5,40);			
		this.ctx.fillRect(495,350,40,5);
		this.ctx.fillRect(725,350,40,5);
		this.ctx.fillRect(742,332,5,40);
		if(Level<10){
	    	this.ctx.strokeText("0"+Level,610,370);
	    	this.ctx.fillText("0"+Level,610,370);
		}else{
			this.ctx.strokeText(Level,610,370);
	    	this.ctx.fillText(Level,610,370);
		}
		this.ctx.lineWidth = 3;			
		this.ctx.strokeRect(570,515,120,40);			
		this.ctx.fillRect(572,517,116,36);
		this.ctx.font = "30px 黑体";
	    this.ctx.strokeText("ENTER",595,545);
	    this.ctx.closePath();
	};
	this.drawGameover = function(){
		this.cleanStage();
		this.ctx.beginPath();
	    this.ctx.font = "80px 黑体";
	    this.ctx.lineWidth = 5;
	    this.ctx.strokeStyle = "#784000";
	    this.ctx.strokeText("游 戏 结 束",405,185); 
	   	this.ctx.fillStyle = "#C07000";
	    this.ctx.fillText("游 戏 结 束",405,185);
	    this.ctx.font = "40px 黑体";
	    this.ctx.strokeText("总 分 ：",490,360); 
	    this.ctx.fillText("总 分 ：",490,360);
	    if(player.points === 0){
	    	this.ctx.strokeText("000000"+player.points,650,363);
	    	this.ctx.fillText("000000"+player.points,650,363);
		}else if(player.points<1000){
	    	this.ctx.strokeText("000"+player.points,650,363);
	    	this.ctx.fillText("000"+player.points,650,363);
		}else{
			this.ctx.strokeText("00"+player.points,650,363);
	    	this.ctx.fillText("00"+player.points,650,363);
		}
	    this.ctx.strokeText("继 续 努 力 ！",510,550); 
	    this.ctx.fillText("继 续 努 力 ！",510,550);				
	    this.ctx.closePath();
	};
	this.drawGamewin = function(){
		this.cleanStage();
		this.ctx.beginPath();
	    this.ctx.font = "80px 黑体";
	    this.ctx.lineWidth = 5;
	    this.ctx.strokeStyle = "#784000";
	    this.ctx.strokeText("恭 喜 过 关",405,185); 
	   	this.ctx.fillStyle = "#C07000";
	    this.ctx.fillText("恭 喜 过 关",405,185);
	    this.ctx.font = "40px 黑体";
	    this.ctx.strokeText("下 一 关",550,320); 
	    this.ctx.fillText("下 一 关",550,320);
	     if(Level<10){
	    	this.ctx.strokeText("0"+Level,610,420);
	    	this.ctx.fillText("0"+Level,610,420);
		}else{
			this.ctx.strokeText(Level,610,420);
	    	this.ctx.fillText(Level,610,420);
		}				    
	    this.ctx.strokeText("总 分 ：",490,550); 
	    this.ctx.fillText("总 分 ：",490,550);
	    if(player.points === 0){
	    	this.ctx.strokeText("000000"+player.points,650,553);
	    	this.ctx.fillText("000000"+player.points,650,553);
		}else if(player.points<1000){
	    	this.ctx.strokeText("000"+player.points,650,553);
	    	this.ctx.fillText("000"+player.points,650,553);
		}else{
			this.ctx.strokeText("00"+player.points,650,553);
	    	this.ctx.fillText("00"+player.points,650,553);
		}
	    this.ctx.closePath();
	};
	this.drawNewmaps = function(){
		this.cleanStage();
		this.ctx.beginPath();
	    this.ctx.font = "50px 黑体";
	    this.ctx.lineWidth = 5;
	    this.ctx.strokeStyle = "#784000";
	    this.ctx.strokeText("编 辑 地 图",494,185); 
	   	this.ctx.fillStyle = "#C07000";
	    this.ctx.fillText("编 辑 地 图",494,185);				
		if(Level<10){
	    	this.ctx.strokeText("0"+Level,610,370);
	    	this.ctx.fillText("0"+Level,610,370);
		}else{
			this.ctx.strokeText(Level,610,370);
	    	this.ctx.fillText(Level,610,370);
		}
		this.ctx.lineWidth = 3;			
		this.ctx.strokeRect(570,515,120,40);			
		this.ctx.fillRect(572,517,116,36);
		this.ctx.font = "30px 黑体";
	    this.ctx.strokeText("ENTER",595,545);
	    this.ctx.closePath();
	};
	this.drawSaveMap = function(s){
		this.cleanStage();
		if(s === "save"){	
			this.ctx.beginPath();
		    this.ctx.font = "50px 黑体";
		    this.ctx.lineWidth = 5;
		    this.ctx.strokeStyle = "#784000";
		    this.ctx.strokeText("保 存 地 图",494,185); 
		   	this.ctx.fillStyle = "#C07000";
		    this.ctx.fillText("保 存 地 图",494,185);				
			if(Level<10){
		    	this.ctx.strokeText("0"+Level,610,370);
		    	this.ctx.fillText("0"+Level,610,370);
			}else{
				this.ctx.strokeText(Level,610,370);
		    	this.ctx.fillText(Level,610,370);
			}
			this.ctx.lineWidth = 3;			
			this.ctx.strokeRect(500,515,60,40);			
			this.ctx.fillRect(502,517,56,36);
			this.ctx.strokeRect(698,515,60,40);			
			this.ctx.fillRect(700,517,56,36);
			this.ctx.font = "25px 黑体";
		    this.ctx.strokeText("YES",512,543);
		    this.ctx.strokeText("NO",718,543);
		    this.ctx.closePath();
		}else if(s === "yes"){
			this.ctx.beginPath();
			this.ctx.font = "50px 黑体";
		    this.ctx.lineWidth = 5;
		    this.ctx.strokeStyle = "#784000";
		    this.ctx.strokeText("创 建 成 功",494,330); 
		   	this.ctx.fillStyle = "#C07000";
		    this.ctx.fillText("创 建 成 功",494,330);
		    this.ctx.closePath();
		}if(s === "no"){
			this.ctx.beginPath();
			this.ctx.font = "50px 黑体";
		    this.ctx.lineWidth = 5;
		    this.ctx.strokeStyle = "#784000";
		    this.ctx.strokeText("创 建 失 败",494,330); 
		   	this.ctx.fillStyle = "#C07000";
		    this.ctx.fillText("创 建 失 败",494,330);
		    this.ctx.closePath();
		}

	};
	this.drawAbout = function(a){
		this.cleanStage();
		if(a === "m"){
			this.ctx.beginPath();
		    this.ctx.font = "50px 黑体";
		    this.ctx.lineWidth = 5;
		    this.ctx.strokeStyle = "#784000";
		    this.ctx.strokeText("关 于 游 戏",494,185); 
		   	this.ctx.fillStyle = "#C07000";
		    this.ctx.fillText("关 于 游 戏",494,185);
		    this.ctx.lineWidth = 2;
		    this.ctx.font = "30px 黑体";
		    this.ctx.strokeStyle = "#784000";
		    this.ctx.strokeText("按 键:",550,320);
		    this.ctx.strokeText("作 者:",550,400);
		    this.ctx.strokeRect(660,290,40,40);
		    this.ctx.strokeRect(660,370,40,40); 
		   	this.ctx.fillStyle = "#C07000";
		    this.ctx.fillText("按 键:",550,320);
		    this.ctx.fillText("作 者:",550,400);
		    this.ctx.fillRect(661,291,38,38);
		    this.ctx.fillRect(661,371,38,38);				
			this.ctx.lineWidth = 3;			
			this.ctx.strokeRect(570,515,120,40);			
			this.ctx.fillRect(571,516,118,38);
			this.ctx.font = "30px 黑体";
		    this.ctx.strokeText("ESC",610,545);
		    this.ctx.font = "35px 黑体";
		    this.ctx.strokeText("w",672,318);
		    this.ctx.strokeText("s",672,398);
		    this.ctx.closePath();
		}else if(a === "w"){
			this.ctx.beginPath();
		    this.ctx.font = "50px 黑体";
		    this.ctx.lineWidth = 5;
		    this.ctx.strokeStyle = "#784000";
		    this.ctx.strokeText("按 键 控 制",494,185); 
		   	this.ctx.fillStyle = "#C07000";
		    this.ctx.fillText("按 键 控 制",494,185);
		    this.ctx.lineWidth = 2;
		    this.ctx.font = "23px 黑体";
		    this.ctx.strokeStyle = "#784000";
		    this.ctx.strokeRect(490,350,120,40);
		    this.ctx.strokeRect(360,350,120,40);
		    this.ctx.strokeRect(360,300,120,40);
		    this.ctx.strokeRect(230,350,120,40);
		    this.ctx.strokeRect(650,350,120,40);
		    this.ctx.strokeRect(780,350,120,40);
		    this.ctx.strokeRect(490,515,120,40);
		    this.ctx.strokeRect(650,515,120,40);
		   	this.ctx.fillStyle = "#C07000";
		    this.ctx.fillRect(491,351,118,38);
		    this.ctx.fillRect(361,351,118,38);
		    this.ctx.fillRect(361,301,118,38);
		    this.ctx.fillRect(231,351,118,38);
		    this.ctx.fillRect(651,351,118,38);
		    this.ctx.fillRect(781,351,118,38);	
		    this.ctx.fillRect(491,516,118,38);
			this.ctx.fillRect(651,516,118,38);
			this.ctx.strokeText("W/向上/+",375,330);
			this.ctx.strokeText(" A/向左    S/向下/-    D/向右",248,378);
			this.ctx.strokeText(" J/左挖坑   K/右挖坑",655,378);
		    this.ctx.strokeText("ENTER/确认     ESC/退出",492,545);
		    this.ctx.closePath();
		}else if(a === "s"){
			this.ctx.beginPath();
		    this.ctx.font = "50px 黑体";
		    this.ctx.lineWidth = 5;
		    this.ctx.strokeStyle = "#784000";
		    this.ctx.strokeText("关 于 作 者",494,185); 
		   	this.ctx.fillStyle = "#C07000";
		    this.ctx.fillText("关 于 作 者",494,185);
		    this.ctx.lineWidth = 2;
		    this.ctx.font = "30px 黑体";
		    this.ctx.strokeStyle = "#784000";
		    this.ctx.strokeText("作 者: 何 志 勇",520,300);
		    this.ctx.strokeText("电 话: 15988134176",520,340);
		    this.ctx.strokeText("邮 箱: 15988134176@163.com",520,380);
		    this.ctx.strokeText(" Q Q : 1327740181",520,420);
		   	this.ctx.fillStyle = "#C07000";
		    this.ctx.fillText("作 者: 何 志 勇",520,300);
		    this.ctx.fillText("电 话: 15988134176",520,340);
		    this.ctx.fillText("邮 箱: 15988134176@163.com",520,380);
		    this.ctx.fillText(" Q Q : 1327740181",520,420);
			this.ctx.lineWidth = 3;			
			this.ctx.strokeRect(570,515,120,40);			
			this.ctx.fillRect(571,516,118,38);
			this.ctx.font = "30px 黑体";
		    this.ctx.strokeText("ESC",610,545);
		    this.ctx.closePath();
		}
	};
	this.cleanStage = function(){
		this.ctx.clearRect(0,0,1260,690);
	}
};