/**
 * 静态变量
 */

var SCREEN_WIDTH = 1200; //屏幕宽
var SCREEN_HEIGHT = 660;//屏幕高


/**************图片资源*****************/
var playerImage = new Image();
playerImage.src = "images/player.png";
var npcImage = new Image();
npcImage.src = "images/npc.png";
var wallImage = new Image();
wallImage.src = "images/wall.png";
var fontImage = new Image();
fontImage.src = "images/MenuFonts.png";

/**************声音资源*****************/
var MENU_AUDIO = new Audio("audio/menu.mp3");
var STAGE_AUDIO = new Audio("audio/stage.mp3");
var BGMUSIC_AUDIO = new Audio("audio/bgmusic.mp3");
var LRMOVE_AUDIO = new Audio("audio/LRmove.mp3");
var UDMOVE_AUDIO = new Audio("audio/UDmove.mp3");
var LRCLIMB_AUDIO = new Audio("audio/LRclimb.mp3");
var DIE_AUDIO = new Audio("audio/die.mp3");
var DROP_AUDIO = new Audio("audio/drop.mp3");
var GETGOLD_AUDIO = new Audio("audio/getGold.mp3");
var DIG_AUDIO = new Audio("audio/dig.mp3");
var PAUSE_AUDIO = new Audio("audio/pause.mp3");
var WIN_AUDIO = new Audio("audio/win.mp3");
var GETALLGOLD_AUDIO = new Audio("audio/getAllGold.mp3");

/**************游戏状态*****************/
var GAME_STATE_MENU = 0;
var GAME_STATE_INIT = 1;
var GAME_STATE_START = 2;
var GAME_STATE_GAME = 3;
var GAME_STATE_OVER = 4;
var GAME_STATE_WIN = 5;
var GAME_STATE_CREATEMAP = 6;
var GAME_STATE_ABOUT = 7;
var GAME_STATE_OTHER = 8;

/**************地图块*****************/
var WALL = 1;	//砖墙
var LADDER = 2; //梯子
var ROD = 3;	//横杆
var GOLD = 4;	//金块
var NULL = 0;	//空地

/**************按键常量*****************/
var UP = 87;
var DOWN = 83;
var LEFT = 65;
var RIGHT = 68;
var DROP = 40;
var CLIMB = 67;
var STARTCLIMB = 83;
var LEFTDIG = 74;
var RIGHTDIG = 75;
var DIE = 81;
var ENTER = 13;
var SPACE = 32;
var ESC = 27;
var YES = 89;
var NO = 78;



