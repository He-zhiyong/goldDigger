
var Map = function(MapCtx){
	this.level = 1;
	this.mapLevel = null; 
	this.mapCtx = MapCtx;
	this.wTileCount = 20; //主游戏区的宽度地图块数
	this.hTileCount = 11;//主游戏区的高度地图块数
	this.tileSize = 60;	//地图块的大小
	this.mapWidth = 1200;
	this.mapHeight = 660;
	this.goldNum = 0;
	this.setMapLevel = function(level){
		this.goldNum = 0;
		this.level = level;
		var tempMap = maps[this.level];
		this.mapLevel = new Array();
		for(var i=0;i<tempMap.length;i++){
			this.mapLevel[i] = new Array();
			for(var j=0;j<tempMap[i].length;j++){
				this.mapLevel[i][j] = tempMap[i][j];
				if(this.mapLevel[i][j] === GOLD){
					this.goldNum++;
				}
			}		
		}
		for(var k=0;k<tempMap[0].length;k++){//为地图最底层增加一行用于判断
			this.mapLevel[tempMap.length] = NULL;	
		}		
	};
	this.clean = function(tempX,tempY,width,height) {
        // 清除地图元素
      	mapCtx.clearRect(tempX,tempY,width,height);

    }
	/**
	 * 绘制地图
	 */
	this.draw = function(){
		for(var i=0;i<this.hTileCount;i++){
			for(var j=0;j<this.wTileCount;j++){
				if(this.mapLevel[i][j] == WALL ){//绘制砖墙
					this.mapCtx.beginPath();		
					this.mapCtx.fillStyle = "#C07000";
					this.mapCtx.fillRect(j*this.tileSize,i*this.tileSize+1,this.tileSize,this.tileSize-8);
					this.mapCtx.fillStyle = "#784000";
					this.mapCtx.fillRect(j*this.tileSize+40,i*this.tileSize+1,6,28);
					this.mapCtx.fillRect(j*this.tileSize+14,i*this.tileSize+26,6,29);
					this.mapCtx.fillRect(j*this.tileSize,i*this.tileSize+53,60,6);
					this.mapCtx.fillStyle = "#E16D27";
					this.mapCtx.fillRect(j*this.tileSize,i*this.tileSize+55.5,60,2.5);
					this.mapCtx.fillStyle = "#784000";
					this.mapCtx.fillRect(j*this.tileSize,i*this.tileSize+24,60,6);
					this.mapCtx.fillStyle = "#E16D27";
					this.mapCtx.fillRect(j*this.tileSize,i*this.tileSize+26,60,2);
					this.mapCtx.fillStyle = "#784000";
					this.mapCtx.fillRect(j*this.tileSize,i*this.tileSize+0.5,60,2);
					this.mapCtx.fillStyle = "#E16D27";
					this.mapCtx.fillRect(j*this.tileSize+42,i*this.tileSize+2,2,25);
					this.mapCtx.fillStyle = "#E16D27";
					this.mapCtx.fillRect(j*this.tileSize+16,i*this.tileSize+28,2,25);
					this.mapCtx.closePath();
				}else if(this.mapLevel[i][j] == LADDER){//绘制梯子
					this.mapCtx.beginPath();
					this.mapCtx.lineWidth = 3;
					this.mapCtx.strokeStyle = "#C0C0C0";		
					this.mapCtx.strokeRect(j*this.tileSize+1.5,i*this.tileSize+1.5,9,57);
					this.mapCtx.strokeRect(j*this.tileSize+49,i*this.tileSize+1.5,9,57);
					this.mapCtx.strokeRect(j*this.tileSize+10,i*this.tileSize+10,39,39);		
					this.mapCtx.fillStyle = "#EEEEEE";
					this.mapCtx.fillRect(j*this.tileSize+1.5,i*this.tileSize,9,60);
					this.mapCtx.fillRect(j*this.tileSize+49,i*this.tileSize,9,60);
					this.mapCtx.fillRect(j*this.tileSize+10,i*this.tileSize+10,40,40);
					this.mapCtx.fillStyle = "#000000";
					this.mapCtx.strokeRect(j*this.tileSize+12.5,i*this.tileSize+19,35,17.5);
					this.mapCtx.fillRect(j*this.tileSize+12.5,i*this.tileSize+19,35,17.5);
					this.mapCtx.fillStyle = "#A03000";
					this.mapCtx.fillRect(j*this.tileSize+3,i*this.tileSize+23,6,10);
					this.mapCtx.fillRect(j*this.tileSize+51,i*this.tileSize+23,6,10);
					this.mapCtx.closePath();
				}else if(this.mapLevel[i][j] == ROD){//绘制横杆
					this.mapCtx.lineWidth = 10;
					this.mapCtx.strokeStyle = "#dfdfdf";
					this.mapCtx.lineCap="round";
					this.mapCtx.beginPath();	
					this.mapCtx.moveTo(j*this.tileSize+2,i*this.tileSize+50);
					this.mapCtx.lineTo(j*this.tileSize+60,i*this.tileSize+50);
					this.mapCtx.stroke();
					this.mapCtx.lineWidth = 6;
					this.mapCtx.strokeStyle = "#FFFFFF";
					this.mapCtx.lineCap="round";
					this.mapCtx.beginPath();
					this.mapCtx.moveTo(j*this.tileSize,i*this.tileSize+50);
					this.mapCtx.lineTo(j*this.tileSize+60,i*this.tileSize+50);
					this.mapCtx.stroke();
				}else if(this.mapLevel[i][j] == GOLD){//绘制金块
					this.mapCtx.beginPath();
					this.mapCtx.moveTo(j*this.tileSize+26,i*this.tileSize+34);
					this.mapCtx.lineTo(j*this.tileSize+1,i*this.tileSize+58);
					this.mapCtx.lineTo(j*this.tileSize+59,i*this.tileSize+58);
					this.mapCtx.lineTo(j*this.tileSize+34,i*this.tileSize+34);
					this.mapCtx.arc(j*this.tileSize+30,i*this.tileSize+37,5,0,Math.PI ,true);
					var grd=this.mapCtx.createLinearGradient(j*this.tileSize,i*this.tileSize+30,j*this.tileSize+45,i*this.tileSize+45);
					grd.addColorStop(0.8,"#FFF047");	
					grd.addColorStop(0.4,"#DFAD0C");
					grd.addColorStop(0.4,"#EFAA0A");
					this.mapCtx.fillStyle=grd;
					this.mapCtx.fill();
					this.mapCtx.closePath();
				}
			}
		}
	this.DrawNoChange();
	};
	/**
	 * 画固定不变的部分
	 */
	this.DrawNoChange = function(){
		this.drawNoChange(0,0,0,690);
		this.drawNoChange(30,660,1200,0);
		this.drawNoChange(1230,0,0,690);
	}
	this.drawNoChange = function(XMin,YMin,XMax,YMax){
		if(XMax==0&&YMax!=0){
			XMin=XMin+0.5;
			while(YMin<=YMax){	
				ctx.beginPath();		
				ctx.lineWidth = 4;
				ctx.strokeStyle = "#784000";		
				ctx.strokeRect(XMin,YMin,28,54);					
				ctx.fillStyle = "#C07000";
				ctx.fillRect(XMin+1,YMin,27,53);						
				ctx.fillStyle = "#E16D27";
				ctx.fillRect(XMin-1,YMin+55.5,30,6);
				ctx.closePath();
				YMin+=60;
			}
		}else if(YMax==0&&XMax!=0){
			while(XMin<=XMax){
				ctx.beginPath();
				ctx.lineWidth = 3;
				ctx.strokeStyle = "#784000";			
				ctx.strokeRect(XMin,YMin-1,60,30);			
				ctx.fillStyle = "#C07000";
				ctx.fillRect(XMin+1,YMin,60,28);	
				ctx.closePath();
				XMin+=60;	
			}
		}
	};
	this.drawCursor = function(x,y){
		this.mapCtx.beginPath();
		this.mapCtx.globalAlpha=0.5;					
		this.mapCtx.fillStyle = "yellow";
		this.mapCtx.fillRect(x,y,60,60);
		this.mapCtx.globalAlpha=1;
		this.mapCtx.closePath();
	}
	/**
	 * 画挖填墙动画
	 */
	this.drawDigWall = function(i,j){
		var mapImgx =0;
		var time = 0;
		//挖坑动画
		setTimeout(function(){
			for (time=0,mapImgx=0;time < 6;time++){
				if(time*50 < 300){
				  (function(time){
				      setTimeout(function(){
				        drawWall(mapImgx);
				        mapImgx+=60;
				      },time*50);
				  })(time);
				}
				if(time*50 == 200){
					(function(time){
				      setTimeout(function(){
				        map.mapLevel[i][j] = NULL;
				      },time*50);
				  })(time);
				}
			}
		},0);
		setTimeout(function(){
			for (time=0,mapImgx=300;time < 6;time++){
				if(time*1000 < 6000){
				  (function(time){
				      setTimeout(function(){
				        drawWall(mapImgx);
				        mapImgx-=60;
				      },time*1000);
				  })(time);
				}
				if(time*1000 == 5000){
					(function(time){
				      setTimeout(function(){
				        map.mapLevel[i][j] = WALL;
				      },time*1000);
				  })(time);
				}
			}
		},2000);
		function drawWall(mapImgx){
			mapCtx.clearRect(j*60,i*60-1,60,60);
			mapCtx.drawImage(wallImage,mapImgx,0,60,60,j*60,i*60,60,60);
		}
	};
};







