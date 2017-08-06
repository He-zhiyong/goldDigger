/**
 * 游戏开始菜单
 **/ 
var Menu = function(contex){
	this.ctx =contex;
	/**
	 * 画菜单
	 */
	this.drawMenu = function(menuNum){
		this.cleanMenu();
		this.ctx.beginPath();		
		this.ctx.fillStyle = "#2E41FF";
		this.ctx.fillRect(0,0,1260,690);//画背景
		this.ctx.drawImage(fontImage,0,0,660,120,300,60,660,120);//画“淘金者”
		for(var i=0;i<11;i++){//画砖墙框
			this.ctx.drawImage(wallImage,0,1,60,58,300+i*60,240,60,60);
			this.ctx.drawImage(wallImage,0,1,60,58,300+i*60,539,60,60);
		}
		for(var j=0;j<4;j++){
			this.ctx.drawImage(wallImage,0,1,60,58,300,300+j*60-1,60,60);
			this.ctx.drawImage(wallImage,0,1,60,58,900,300+j*60-1,60,60);
		}
		this.ctx.drawImage(fontImage,(menuNum-1)*220,120,220,240,520,300,220,240);
		this.ctx.closePath();
	};
	this.cleanMenu = function(){
		this.ctx.clearRect(0,0,1260,690);
	}
};