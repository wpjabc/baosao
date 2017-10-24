/*
	创建一个初始化牌抽象类（函数）
 */
function PlayGame($all_poker,  all_poker_data, all_play){
	this.$all_poker =  $all_poker;
	this.all_poker_data =  all_poker_data;
	this.all_play = all_play;
	console.log(this.all_poker_data);

	// 初始化数据
	this.num1 = 0;		//定义玩家1按钮是否被点击
	this.num2 = 0;		//定义玩家2按钮是否被点击
	this.num3 = 0;		//定义玩家3按钮是否被点击

	//玩家准备出的牌详细内容。poker选牌具体数据，type是牌型类型，max是该牌型用于判断大小的判断值
	this.ready_poker = {poker:[], type:0, max:0};

	this.desktop_poker = {poker:[], type:0, max:0}	// 初始化玩家桌面上的牌型

	this.game_status = {boss:-1, player:-1, cancle:0}	//初始化当游戏的状态	
	// this.initElements();	//初始化元素
	// this.initEvents();		//初始化事件
	
	this.onclickflag = 0;   //标志位

	this.flag = 0;		  //标志位
}

// 添加对应对象属性或方法
PlayGame.prototype = {
	constructor:PlayGame,	// 定义构造函数来自哪里


	/*
		初始化页面元素的方法
	 */
	initElements:function(){
		// 玩家一数据
		this.play_1 = this.all_play.play_1;
		this.play_1_poker = this.play_1.poker;
		// 玩家二数据
		this.play_2 = this.all_play.play_2;
		this.play_2_poker = this.play_2.poker;
		// 玩家三数据
		this.play_3 = this.all_play.play_3;
		this.play_3_poker = this.play_3.poker;

		this.allPlay = [];
		this.allPlay.push(this.play_1);
		this.allPlay.push(this.play_2);
		this.allPlay.push(this.play_3);
		console.log(this.allPlay);

		this.play_1_btn_land = $('.play_1 .btn .btn_land');
		this.play_1_btn_no = $('.play_1 .btn .btn_no');

		/**初始化页面牌堆**/
		this.$all_poker_li = $('.all_poker li');
		this.$all_poker_li_last = $('.all_poker li:last');

		/**初始化页面玩家一**/
		this.$play_1 = $('.play_1');
		this.$play_1_li_list = $('.play_1 li:last');


		this.landlord();
	},

	/*
		随机产生叫地主玩家方法
	*/
	landlord:function (){
		var that = this;		// 通过重新生成操作的元素，防止作用域污染

		var landlord_num = Math.round(Math.random()*2+1);
		// var landlord_num = 1;
		// console.log(landlord_num);
		$(".play_"+landlord_num+" .btn").show();		//显示随机第一位叫地主的玩家

		$('body').on('click', '.play_1 .btn .btn_land', function(){		//玩家一叫地主
			that.num1++;				//点击了一次叫/抢地主
			that.click1(that.num1);		//调用玩家一叫/抢地主方法方法

		});
		$('body').on('click', '.play_1 .btn .btn_no', function(){
			that.num1--;				//点击了一次不叫/抢地主
			that.click1(that.num1);

		});
		$('body').on('click', '.play_2 .btn .btn_land', function(){
			that.num2++;
			that.click2(that.num2);

		});
		$('body').on('click', '.play_2 .btn .btn_no', function(){
			that.num2--;
			that.click2(that.num2);

		});
		$('body').on('click', '.play_3 .btn .btn_land', function(){
			that.num3++;
			that.click3(that.num3);

		});
		$('body').on('click', '.play_3 .btn .btn_no', function(){
			that.num3--;
			that.click3(that.num3);

		});
	},

	/*
		定义玩家一叫地主点击函数
	*/
	click1:function (num1){
		var that = this;		// 通过重新生成操作的元素，防止作用域污染
		console.log(that.num1);
		console.log(that.num2);
		console.log(that.num3);

		setTimeout(function(){
			if(that.num1 == 1){
				if(that.num2==0 && that.num3==0 || that.num2==1 && that.num3==1 || that.num2==1 && that.num3==-1 || that.num3==1 && that.num2==0 || that.num3==-1 && that.num2==0){
					$(".play_1 .btn").hide();
					$(".play_2 .btn").show();
					$(".play_2 .btn_land").html('抢地主');
					$(".play_2 .btn_no").html('不抢');

				}else if(that.num2==-1 && that.num3==1){
					$(".play_1 .btn").hide();
					$(".play_3 .btn").show();
					$(".play_3 .btn_land").html('抢地主');
					$(".play_3 .btn_no").html('不抢');

				}else if(that.num2==-1 && that.num3==-1){
					console.log('玩家一为地主');
					var text = '玩家一为地主';
					that.Alert(text,0);
					$('.play_1 .playerPic1').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
					$('.play_1 .playerPic1').css({transform:'scale(1)'});
					$(".play_3 .btn").hide();
					$(".play_1 .btn").hide();

					console.log(that.play_1.role);
					that.play_1.role = 1;
					that.play_1.poker = that.play_1.poker.concat(that.all_poker_data);
					that.landPoker(1);
				}
			}else if(that.num1==2){
				console.log('玩家一为地主');
				var text = '玩家一为地主';
				that.Alert(text,0);

				$('.play_1 .playerPic1').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
				$('.play_1 .playerPic1').css({transform:'scale(1)'});
				$(".play_1 .btn").hide();
				that.play_1.role = 1;
				that.play_1.poker = that.play_1.poker.concat(that.all_poker_data);
				that.landPoker(1);

			}else if(that.num1 == -1){
				if(that.num2==0 && that.num3==0 || that.num3==-1 && that.num2==0){
					$(".play_1 .btn").hide();
					$(".play_2 .btn").show();

				}else if(that.num2==1 && that.num3==1 || that.num3==1 && that.num2==0){
					$(".play_1 .btn").hide();
					$(".play_2 .btn").show();
					$(".play_2 .btn_land").html('抢地主');
					$(".play_2 .btn_no").html('不抢');
				}else if(that.num2==1 && that.num3==-1){

					console.log('玩家二为地主');
					var text = '玩家二为地主';
					that.Alert(text,0);
					$('.play_2 .playerPic2').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
					$('.play_2 .playerPic2').css({transform:'scale(1)'});
					$(".play_3 .btn").hide();
					$(".play_1 .btn").hide();
					that.play_2.role = 1;
					that.play_2.poker = that.play_2.poker.concat(that.all_poker_data);
					that.landPoker(2);

				}else if(that.num2==-1 && that.num3==1){
					console.log('玩家三为地主');
					var text = '玩家三为地主';
					that.Alert(text,0);
					$('.play_3 .playerPic3').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
					$('.play_3 .playerPic3').css({transform:'scale(1)'});
					$(".play_3 .btn").hide();
					$(".play_1 .btn").hide();
					that.play_3.role = 1;
					that.play_3.poker = that.play_3.poker.concat(that.all_poker_data);
					that.landPoker(3);

				}else if(that.num2==-1 && that.num3==-1){
					console.log('重新发牌！');
					var text = '重新发牌！';
					that.Alert(text,0);
					$(".btn").hide();

					$('.all_poker li').remove();		//1、删除原牌堆
					$('.play_1 li').remove();		//1、删除玩家一牌堆
					$('.play_2 li').remove();		//1、删除玩家二牌堆
					$('.play_3 li').remove();		//1、删除玩家三牌堆

					that.resetPoker();			//调用重新发牌方法

					// for(var i=1;i<4; i++){
					// 	$('.play_'+i+' li').remove();
					// }
					// // $('.all_poker li').remove();

					// var url = window.location.href;
					// window.location.href = url;
					
					// $('body').off('click', '.all_poker li'); //移除click绑定事件
					// setTimeout(function(){
					// 	deal(0);		//调用发牌方法
					// 	setTimeout(function(){			//调用随机叫地主的玩家的方法
					// 		that.landlord();					//调用选地主方法
					// 	},500);
					// });
					
				}	
			}else if(that.num1==0){
				if(that.num3==1){
					console.log('玩家三为地主');
					var text = '玩家三为地主';
					that.Alert(text,0);
					$('.play_3 .playerPic3').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
					$('.play_3 .playerPic3').css({transform:'scale(1)'});
					$(".play_1 .btn").hide();
					that.play_3.role = 1;
					that.play_3.poker = that.play_3.poker.concat(that.all_poker_data);
					that.landPoker(3);

				}else if(that.num3==-1){
					console.log('玩家二为地主');
					var text = '玩家二为地主';
					that.Alert(text,0);
					$('.play_2 .playerPic2').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
					$('.play_2 .playerPic2').css({transform:'scale(1)'});
					$(".play_1 .btn").hide();
					that.play_2.role = 1;
					that.play_2.poker = that.play_2.poker.concat(that.all_poker_data);
					that.landPoker(2);
				}
			}
		},0);
	},

	/*
		定义玩家二叫地主点击函数
	*/
	click2:function (num2){
		var that = this;		// 通过重新生成操作的元素，防止作用域污染
		console.log(that.num1);
		console.log(that.num2);
		console.log(that.num3);

		setTimeout(function(){
			if(that.num2 == 1){
				if(that.num1==0 && that.num3==0 || that.num1==1 && that.num3==0 || that.num3==1 && that.num1==1 || that.num3==1 && that.num1==-1 || that.num1==-1 && that.num3==0){
					$(".play_2 .btn").hide();
					$(".play_3 .btn").show();
					$(".play_3 .btn_land").html('抢地主');
					$(".play_3 .btn_no").html('不抢');

				}else if(that.num3==-1 && that.num1==1){
					$(".play_2 .btn").hide();
					$(".play_1 .btn").show();
					$(".play_1 .btn_land").html('抢地主');
					$(".play_1 .btn_no").html('不抢');

				}else if(that.num3==-1 && that.num1==-1){
					console.log('玩家二为地主');
					var text = '玩家二为地主';
					that.Alert(text,0);
					$('.play_2 .playerPic2').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
					$('.play_2 .playerPic2').css({transform:'scale(1)'});
					$(".play_2 .btn").hide();
					that.play_2.role = 1;
					that.play_2.poker = that.play_2.poker.concat(that.all_poker_data);
					that.landPoker(2);
				}
			}else if(that.num2 == 2){
				console.log('玩家二为地主');
				var text = '玩家二为地主';
				that.Alert(text,0);
				$('.play_2 .playerPic2').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
				$('.play_2 .playerPic2').css({transform:'scale(1)'});
				$(".play_2 .btn").hide();
				that.play_2.role = 1;
				that.play_2.poker = that.play_2.poker.concat(that.all_poker_data);
				that.landPoker(2);

			}else if(that.num2 == -1){
				if(that.num1==1 && that.num3==0 || that.num3==1 && that.num1==1){
					$(".play_2 .btn").hide();
					$(".play_3 .btn").show();
					$(".play_3 .btn_land").html('抢地主');
					$(".play_3 .btn_no").html('不抢');

				}else if(that.num1==-1 && that.num3==0 || that.num1==0 && that.num3==0){
					$(".play_2 .btn").hide();
					$(".play_3 .btn").show();

				}else if(that.num3==1 && that.num1==-1){
					console.log('玩家三为地主');
					var text = '玩家三为地主';
					that.Alert(text,0);

					$('.play_3 .playerPic3').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
					$('.play_3 .playerPic3').css({transform:'scale(1)'});
					$(".play_1 .btn").hide();
					$(".play_2 .btn").hide();
					that.play_3.role = 1;
					that.play_3.poker = that.play_3.poker.concat(that.all_poker_data);
					that.landPoker(3);

				}else if(that.num3==-1 && that.num1==1){
					console.log('玩家一为地主');
					var text = '玩家一为地主';
					that.Alert(text,0);

					$('.play_1 .playerPic1').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
					$('.play_1 .playerPic1').css({transform:'scale(1)'});
					$(".play_1 .btn").hide();
					$(".play_2 .btn").hide();
					that.play_1.role = 1;
					that.play_1.poker = that.play_1.poker.concat(that.all_poker_data);
					that.landPoker(1);

				}else if(that.num3==-1 && that.num1==-1){
					console.log('重新发牌');
					$(".btn").hide();

					$('.all_poker li').remove();		//1、删除原牌堆
					$('.play_1 li').remove();		//1、删除玩家一牌堆
					$('.play_2 li').remove();		//1、删除玩家二牌堆
					$('.play_3 li').remove();		//1、删除玩家三牌堆

					that.resetPoker();			//调用重新发牌方法
				}
			}else if(that.num2==0){
				if(that.num1==1){
					console.log('玩家一为地主');
					var text = '玩家一为地主';
					that.Alert(text,0);

					$('.play_1 .playerPic1').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(1.2)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
					$('.play_1 .playerPic1').css({transform:'scale(1)'});
					$(".play_2 .btn").hide();
					that.play_1.role = 1;
					that.play_1.poker = that.play_1.poker.concat(that.all_poker_data);
					that.landPoker(1);

				}else if(that.num1==-1){
					console.log('玩家三为地主');
					var text = '玩家三为地主';
					that.Alert(text,0);

					$('.play_3 .playerPic3').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
					$('.play_3 .playerPic3').css({transform:'scale(1)'});
					$(".play_2 .btn").hide();
					that.play_3.role = 1;
					that.play_3.poker = that.play_3.poker.concat(that.all_poker_data);
					that.landPoker(3);
				}
			}
		},0);
	},

	/*
		定义玩家三叫地主点击函数
	*/
	click3:function (num3){
		var that = this;		// 通过重新生成操作的元素，防止作用域污染
		console.log(that.num1);
		console.log(that.num2);
		console.log(that.num3);

		setTimeout(function(){
			if(that.num3 == 1){
				if(that.num1==1 && that.num2==1 || that.num1==1 && that.num2==-1 || that.num1==0 && that.num2==1 || that.num1==0 && that.num2==-1 || that.num1==0 && that.num2==0){
					$(".play_3 .btn").hide();
					$(".play_1 .btn").show();
					$(".play_1 .btn_land").html('抢地主');
					$(".play_1 .btn_no").html('不抢');

				}else if(that.num1==-1 && that.num2==1){
					$(".play_3 .btn").hide();
					$(".play_2 .btn").show();
					$(".play_2 .btn_land").html('抢地主');
					$(".play_2 .btn_no").html('不抢');

				}else if(that.num1==-1 && that.num2==-1){
					console.log('玩家三为地主');
					var text = '玩家三为地主';
					that.Alert(text,0);

					$('.play_3 .playerPic3').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
					$('.play_3 .playerPic3').css({transform:'scale(1)'});
					$(".play_3 .btn").hide();
					that.play_3.role = 1;
					that.play_3.poker = that.play_3.poker.concat(that.all_poker_data);
					that.landPoker(3);

				}
			}else if(that.num3 == -1){
				if(that.num1==1 && that.num2==1 || that.num2==1 && that.num1==0){
					$(".play_3 .btn").hide();
					$(".play_1 .btn").show();
					$(".play_1 .btn_land").html('抢地主');
					$(".play_1 .btn_no").html('不抢');

				}else if(that.num1==1 && that.num2==-1){
					console.log('玩家一为地主');
					var text = '玩家一为地主';
					that.Alert(text,0);

					$('.play_1 .playerPic1').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
					$('.play_1 .playerPic1').css({transform:'scale(1)'});
					$(".play_2 .btn").hide();
					$(".play_3 .btn").hide();
					that.play_1.role = 1;
					that.play_1.poker = that.play_1.poker.concat(that.all_poker_data);
					console.log(that.play_1.poker);
					that.landPoker(1);

				}else if(that.num1==-1 && that.num2==1){
					console.log('玩家二为地主');
					var text = '玩家二为地主';
					that.Alert(text,0);

					$('.play_2 .playerPic2').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
					$('.play_2 .playerPic2').css({transform:'scale(1)'});
					$(".play_3 .btn").hide();
					that.play_2.role = 1;
					that.play_2.poker = that.play_2.poker.concat(that.all_poker_data);
					that.landPoker(2);

				}else if(that.num2==-1 && that.num1==-1){
					console.log('重新发牌');
					$(".btn").hide();

					$('.all_poker li').remove();		//1、删除原牌堆
					$('.play_1 li').remove();		//1、删除玩家一牌堆
					$('.play_2 li').remove();		//1、删除玩家二牌堆
					$('.play_3 li').remove();		//1、删除玩家三牌堆

					that.resetPoker();			//调用重新发牌方法
				}else if(that.num2==-1 && that.num1==0 || that.num1==0 && that.num2==0){
					$(".play_3 .btn").hide();
					$(".play_1 .btn").show();
				}
			}else if(that.num3 == 2){
				console.log('玩家三为地主');
				var text = '玩家三为地主';
				that.Alert(text,0);

				$('.play_3 .playerPic3').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
				$('.play_3 .playerPic3').css({transform:'scale(1)'});
				$(".play_3 .btn").hide();
				that.play_3.role = 1;
				that.play_3.poker = that.play_3.poker.concat(that.all_poker_data);
				that.landPoker(3)

			}else if(that.num3==0){
				if(that.num2==1){
					console.log('玩家二为地主');
					var text = '玩家二为地主';
					that.Alert(text,0);

					$('.play_2 .playerPic2').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
					$('.play_2 .playerPic2').css({transform:'scale(1)'});
					$(".play_3 .btn").hide();
					that.play_2.role = 1;
					that.play_2.poker = that.play_2.poker.concat(that.all_poker_data);
					that.landPoker(2);

				}else if(that.num2==-1){
					console.log('玩家一为地主');
					var text = '玩家一为地主';
					that.Alert(text,0);

					$('.play_1 .playerPic1').css({transition:'all 0.5s ease-in',transition:'all 0.5s ease-in',transform:'scale(0.8)',background:'url(./images/ico_nongmin3.png) no-repeat 0px 0px'});
					$('.play_1 .playerPic1').css({transform:'scale(1)'});
					$(".play_3 .btn").hide();
					that.play_1.role = 1;
					that.play_1.poker = that.play_1.poker.concat(that.all_poker_data);
					that.landPoker(1);
				}
			}
		},0);
	},

	/*
		提示文字
	*/
	Alert:function (text,num){
		if(num == 1){			//出牌有误的提示，字体红色
			$('.alertNotice').css({color:'red',lineHeight: '41px',transform:'scale(0.8)',transition:'all 0.1s ease'});
			$('.alertNotice').html(text);

			shake(20);
			function shake(m){
				//抖动
				var i = 0;
				i = ++i > 5 ? 0 : i;
				
				var j = Math.round(Math.random()-0.5);
				$('.alertNotice').css({left:'50%',marginLeft: -180+i*0.1*j+'px',top:'1%',marginTop: i*2*j+'px',transition:'all 0.1s ease'});
				setTimeout(function(){

					$('.alertNotice').css({left:'50%',marginLeft: -200+i*0.1*j+'px',top:'1%',marginTop: i*2*j+'px',transition:'all 0.1s ease'});

				},400);

				if(m > 0){
					setTimeout(function(){
						shake(m-1);
					},300);
					
				}else{
					$('.alertNotice').css({left:'50%',marginLeft: -200+'px',top:'1%',marginTop: 0+'px',transition:'all 0.1s ease'});
					return;
				}
				
			}

			setTimeout(function(){
				$('.alertNotice').css({transform:'scale(0)',transition:'all 0s'});
			},2000);

		}else{					//玩家为地主的提示，字体绿色

			$('.alertNotice').css({color:'green',lineHeight: '41px',transform:'scale(0.8)',transition:'all 0.1s ease'});
			$('.alertNotice').html(text);

			setTimeout(function(){
				$('.alertNotice').css({transform:'scale(0)',transition:'all 0s'});
			},2000);
		}
		return;
	},


	//把剩余的地主牌翻开(动画)  并且交给地主
	//pNum   玩家序号
	landPoker:function (pNum){
		var that = this;		// 通过重新生成操作的元素，防止作用域污染

		$('.all_poker li').remove();

		for(var i=0; i<3; i++){
			var temp_li = that.makePoker(that.all_poker_data[i]);
			$('.all_poker').append(temp_li);
			//把地主牌交给地主玩家
			$('.play_'+pNum).append(temp_li);

			// console.log(all_play[pNum-1].poker);
			if(pNum == 2){
				if(screen.width < 1400 && screen.width > 1300){
					$('.play_'+pNum+' li:last').css({left:(i*30+540)+ 'px',bottom:'10px',transition:'all 0.5s ease-in'});
				}else if(screen.width < 1300){
					$('.play_'+pNum+' li:last').css({left:(i*36+540)+ 'px',bottom:'10px',transition:'all 0.5s ease-in'});
				}else{
					if(screen.width < 1400){
						$('.play_'+pNum+' li:last').css({left:(i*30+540)+ 'px',transition:'all 0.5s ease-in'});
					}else{
						$('.play_'+pNum+' li:last').css({left:(i*36+630)+ 'px',transition:'all 0.5s ease-in'});
					}
					
				}
				
			}else if(pNum==1){
				$('.play_'+pNum+' li:last').css({top:(i*30+510)+'px'});
			}else{
				if(screen.width < 1400){
					$('.play_'+pNum+' li:last').css({top:(i*36+510)+'px',right:'80px'});
				}else{
					$('.play_'+pNum+' li:last').css({top:(i*36)+'px'});
				}
				
			}
			
		}

		$('.all_poker li').css({transform:'scale(0.6)',border:'1px solid #999',borderRadius:'7px'});

		if(screen.width > 1500){
			$('.all_poker li').eq(0).animate({transform:'scale(0.6)',left:'-270px'},200).animate({transform:'scale(0.6)',left:'-270px', top:'-377px'},100);
			$('.all_poker li').eq(1).animate({transform:'scale(0.6)',left:'-150px'},200).animate({transform:'scale(0.6)',left:'-150px', top:'-377px'},100);
			$('.all_poker li').eq(2).animate({transform:'scale(0.6)',left:'-30px'},200).animate({transform:'scale(0.6)',left:'-30px', top:'-377px'},100);

		}else if(screen.width > 1400 && screen.width < 1500){
			$('.all_poker li').eq(0).animate({transform:'scale(0.6)',left:'-270px'},200).animate({transform:'scale(0.6)',left:'-270px', top:'-377px'},100);
			$('.all_poker li').eq(1).animate({transform:'scale(0.6)',left:'-150px'},200).animate({transform:'scale(0.6)',left:'-150px', top:'-377px'},100);
			$('.all_poker li').eq(2).animate({transform:'scale(0.6)',left:'-30px'},200).animate({transform:'scale(0.6)',left:'-30px', top:'-377px'},100);

		}else if(screen.width <= 1400){
			$('.all_poker li').eq(0).animate({transform:'scale(0.6)',left:'-220px'},200).animate({transform:'scale(0.6)',left:'-220px', top:'-290px'},100);
			$('.all_poker li').eq(1).animate({transform:'scale(0.6)',left:'-120px'},200).animate({transform:'scale(0.6)',left:'-120px', top:'-290px'},100);
			$('.all_poker li').eq(2).animate({transform:'scale(0.6)',left:'-20px'},200).animate({transform:'scale(0.6)',left:'-20px', top:'-290px'},100);
		}else{
			$('.all_poker li').eq(0).animate({transform:'scale(0.6)',left:'-220px'},200).animate({transform:'scale(0.6)',left:'-220px', top:'-290px'},100);
			$('.all_poker li').eq(1).animate({transform:'scale(0.6)',left:'-120px'},200).animate({transform:'scale(0.6)',left:'-120px', top:'-290px'},100);
			$('.all_poker li').eq(2).animate({transform:'scale(0.6)',left:'-20px'},200).animate({transform:'scale(0.6)',left:'-20px', top:'-290px'},100);
		}

		// 显示积分榜
		$('.platform').css({display:'block',transition:'all 0.4s ease'});
		$('.integral').css({display:'block',transition:'all 0.4s ease'});

		//由于地主牌发给了地主，所以需要重新排序一次。进行多一次排序动画
		setTimeout(function(){

			// 把地主牌的牌面改成牌背
			$('.play_'+pNum+' li').css({background:'',border:'1px solid #999',borderRadius:'7px'}).attr('class','back');
			
			console.log(that.allPlay[pNum-1].poker);
			that.allPlay[pNum-1].poker = that.sortPoker1(that.allPlay[pNum-1].poker);
			
			setTimeout(function(){
				$('.play_'+pNum+' li').remove();

				for(var i=0; i<that.allPlay[pNum-1].poker.length; i++){
					var temp_li = that.makePoker(that.allPlay[pNum-1].poker[i]);
					$('.play_'+pNum).append(temp_li);

					if(pNum == 2){
						if(screen.width < 1400){
							$('.play_'+pNum+' li:last').css({left:(i*30+30)+ 'px',bottom:'10px',border:'1px solid #999',borderRadius:'7px'});
						}else{
							$('.play_'+pNum+' li:last').css({left:(i*36)+ 'px',border:'1px solid #999',borderRadius:'7px'});
						}
						$('.play_'+pNum).css({left:-18*i+ 'px'});

					}else if(pNum==1){
						if(screen.width < 1400){
							$('.play_'+pNum+' li:last').css({top:i*30+'px',left:'96px',border:'1px solid #999',borderRadius:'7px'});
						}else{
							$('.play_'+pNum+' li:last').css({top:i*36+'px',left:'0px',border:'1px solid #999',borderRadius:'7px'});
						}
						
						$('.play_'+pNum).css({top:-40+ 'px'});
					}else{
						if(screen.width < 1400){
							$('.play_'+pNum+' li:last').css({top:i*30+'px',right:'80px',border:'1px solid #999',borderRadius:'7px'});
						}else{
							$('.play_'+pNum+' li:last').css({top:i*36+'px',border:'1px solid #999',borderRadius:'7px'});
						}
						
						$('.play_'+pNum).css({top:-40+ 'px'});
					}
				}

				// 已经结束抢地主阶段，进入开始游戏阶段 （AI逻辑）
				that.startGame(pNum-1);


			}, 400);
		}, 400);

			//绑定玩家1选牌的事件
		$('.play_1').on('click', 'li', function(){
			var left = $(this).css('left');

			if(screen.width < 1400){
				if(left != '106px'){
					$(this).css({left:'106px'});
					that.ready_poker.poker.push($(this).attr('data-value'));
				}else{
					$(this).css({left:'96px'});
					var index = that.ready_poker.poker.indexOf($(this).attr('data-value'));
					that.ready_poker.poker.splice(index, 1);
				}
				console.log(that.ready_poker.poker)
				// console.log(ready_poker);
				
			}else{
				if(left != '10px'){
					$(this).css({left:'10px'});
					that.ready_poker.poker.push($(this).attr('data-value'));
				}else{
					$(this).css({left:'0px'});
					var index = that.ready_poker.poker.indexOf($(this).attr('data-value'));
					that.ready_poker.poker.splice(index, 1);
				}
				console.log(that.ready_poker.poker)
				// console.log(ready_poker);
			}
				
			// var index = ready_poker.poker.indexOf($(this).attr('data-value'));
			// ready_poker.poker.splice(index, 1);
			// console.log(ready_poker);
		});

		//绑定玩家2选牌的事件
		$('.play_2').on('click', 'li', function(){
			var top = $(this).css('top');
			var bottom = $(this).css('bottom');

			if(screen.width < 1400){
				if(bottom != '20px'){
					$(this).css({bottom:'20px'});
					that.ready_poker.poker.push($(this).attr('data-value'));
				}else{
					$(this).css({bottom:'10px'});
					var index = that.ready_poker.poker.indexOf($(this).attr('data-value'));
					that.ready_poker.poker.splice(index, 1);
				}

				// var index = ready_poker.poker.indexOf($(this).attr('data-value'));
				// ready_poker.poker.splice(index, 1);
				// console.log(ready_poker);
				
			}else{
				if(top != '-10px'){
					$(this).css({top:'-10px'});
					that.ready_poker.poker.push($(this).attr('data-value'));
				}else{
					$(this).css({top:'0px'});
					var index = that.ready_poker.poker.indexOf($(this).attr('data-value'));
					that.ready_poker.poker.splice(index, 1);
				}

				
				// console.log(ready_poker);
			}

			// var index = ready_poker.poker.indexOf($(this).attr('data-value'));
			// ready_poker.poker.splice(index, 1);
			// console.log(ready_poker);
		
		});

		//绑定玩家3选牌的事件
		$('.play_3').on('click', 'li', function(){
			var left = $(this).css('left');
			var right = $(this).css('right');

			if(screen.width < 1400){
				if(right != '100px'){
					$(this).css({right: '100px'});
					that.ready_poker.poker.push($(this).attr('data-value'));
					// right != '90px';
				}else{
					$(this).css({right: '90px'});
					var index = that.ready_poker.poker.indexOf($(this).attr('data-value'));
					that.ready_poker.poker.splice(index, 1);
					// right != '80px';
				}
				// console.log(ready_poker);
				
			}else{
				if(left != '-10px'){
					$(this).css({left: '-10px'});
					that.ready_poker.poker.push($(this).attr('data-value'));
					// left != '-10px';
				}else{
					$(this).css({left: '0px'});
					var index = that.ready_poker.poker.indexOf($(this).attr('data-value'));
					that.ready_poker.poker.splice(index, 1);
					// left != '0px';
				}
				// console.log(ready_poker);
			}

			// var index = ready_poker.poker.indexOf($(this).attr('data-value'));
			// ready_poker.poker.splice(index, 1);
			// console.log(ready_poker);
			
		});
	},

	/*
		生成牌面HTML代码的方法
	*/
	makePoker:function (poker){
		var poker_arr = poker.split('_');

		// console.log('screen.width: '+screen.width);
		// 小号图标100*140,屏幕分辨率小于1500px时使用
		if(screen.width < 1400){
			var color_arr = [
				[-12,-177],			//方块花色的坐标
				[-12,-3],			//梅花花色的坐标
				[-127,-3],			//红桃花色的坐标
				[-127,-177]		//黑桃花色的坐标
			];

			if(poker_arr[0] != 14){
				var x = color_arr[poker_arr[1]][0];
				var y = color_arr[poker_arr[1]][1];
			}else{
				if(poker_arr[1] ==0){
					var x = -127;
					var y = -3;
				}else{
					var x = -12;
					var y = -3;
				}
			}

			// 扑克牌加圆角，边框
			this.$all_poker_li.css({border:'1px solid #999',borderRadius:'7px',margin:'0 auto'});
			//返回组装完成的牌面HTML代码
			return '<li style="width:100px; height:140px;border:1px solid #999;borderRadius:7px;background: url(./images/'+poker_arr[0]+'_small'+'.png) '+x+'px '+y+'px;" data-value="'+poker+'"></li>';
			
		}else{
			var color_arr = [
				[-17,-224],	
				[-17,-5],
				[-162,-5],
				[-162,-224]
			];

			if(poker_arr[0] != 14){
				var x = color_arr[poker_arr[1]][0];
				var y = color_arr[poker_arr[1]][1];
			}else{
				if(poker_arr[1] ==0){
					var x = -162;
					var y = -5;
				}else{
					var x = -17;
					var y = -5;
				}
			}

			//返回组装完成的牌面HTML代码 	
			return '<li style="width:125px; height:175px;border:1px solid #999;borderRadius:7px; background: url(./images/'+poker_arr[0]+'.png) '+x+'px '+y+'px;" data-value="'+poker+'"></li>';
		}
	},

	/*
		排序地主牌(当前出牌者)方法
	*/
	sortPoker1:function (arr){
		var that = this;		// 通过重新生成操作的元素，防止作用域污染

		var sort_arr = [];
		for(var i=0; i<arr.length; i++){
			sort_arr.push(arr[i]);
		}
		// console.log(sort_arr);
		// console.log(sort_arr[0]);
			
		// 排序：把所有点数，花色，由大到小进行排序；
		sort_arr.sort(function(x, y){
			var value1 = x.split('_');
			var value2 = y.split('_');

			if(value1[0] != value2[0]){
				return value2[0] - value1[0];		//点数从大到小排列

			}else{
				return value2[1] - value1[1];		//点数相同排序花色

			}
		});
		return sort_arr;
	},

	/*
		 开始斗地主游戏方法	
	*/
	startGame:function (pNum){
		var that = this;		// 通过重新生成操作的元素，防止作用域污染

		$('.action').hide();
		$('.action').eq(pNum).show();			//显示地主玩家第一个出牌
		$('.second_show').hide();

		$('.second_show').eq(pNum).show(function(){
			var intDiff = parseInt(15); //倒计时总秒数量
			that.timer(intDiff);
		});

		if(that.desktop_poker.type == 0){		//地主不能点击不出牌
			console.log('你必打牌出去');
			$('.action').find('input').eq(0).unbind();
			console.log('当前是玩家'+(parseInt(that.game_status.player)+1));
		}

		//************************开启点击事件*****************************//
		$('.play_2').mousedown(that.mouseDown);			//调用鼠标按下牌事件
	    $("body").dblclick(that.dblClick);				//当鼠标双击元素时事件处理（点击两次）
		
		//*****************玩家1（序号为0）点击事件************//
		$('.action').eq(0).find('input').eq(1).click(function(){
			that.game_status.player = 0;
			that.onPlay(1);		//调用玩家1出牌方法
		});

		$('.action').eq(0).find('input').eq(0).click(function(){	
			that.game_status.player = 0;
			that.notPlay(1);		//调用玩家1不出牌方法

			//点击‘不要’语音提示不要，
			var notcall_boss = $('.notcall_boss')[0];
			notcall_boss.play();	
			that.dblClick();

			// 玩家1，点击‘不要’弹框
			$('.pass_remind1').css({transform:'scale(0.8)',transition:'all 0.1s ease'});

			setTimeout(function(){
				$('.pass_remind1').css({transform:'scale(0)',transition:'all 0s'});
			},1000);

		});		

		$('.action').eq(0).find('input').eq(2).click(function(){	
			
			new Hint(1, that.desktop_poker);		//调用出牌提示方法

			this.onclickflag++;
		});	

		//*****************玩家2（序号为1）点击事件************//
		$('.action').eq(1).find('input').eq(1).click(function(){
			that.game_status.player = 1;
			that.onPlay(2);		//调用玩家出牌方法

		});

		$('.action').eq(1).find('input').eq(0).click(function(){
			that.game_status.player = 1;	
			that.notPlay(2);		//调用玩家不出牌方法

			//点击‘不要’语音提示不要，
			var notcall_boss = $('.notcall_boss')[0];
			notcall_boss.play();	
			that.dblClick();


			// 玩家2，点击‘不要’弹框
			$('.pass_remind2').css({transform:'scale(0.8)',transition:'all 0.1s ease'});

			setTimeout(function(){
				$('.pass_remind2').css({transform:'scale(0)',transition:'all 0s'});
			},1000);
		});	

		$('.action').eq(1).find('input').eq(2).click(function(){	
			
			new Hint(2, that.desktop_poker);		//调用出牌提示方法

			this.onclickflag++;
		});	

		//*****************玩家3（序号为2）点击事件************//
		$('.action').eq(2).find('input').eq(1).click(function(){
			that.game_status.player = 2;
			that.onPlay(3);		//调用玩家出牌方法
		});

		$('.action').eq(2).find('input').eq(0).click(function(){
			that.game_status.player = 2;
			that.notPlay(3);		//调用玩家不出牌方法

			//点击‘不要’语音提示不要，
			var notcall_boss = $('.notcall_boss')[0];
			notcall_boss.play();	
			that.dblClick();


			// 玩家3，点击‘不要’弹框
			$('.pass_remind3').css({transform:'scale(0.8)',transition:'all 0.1s ease'});

			setTimeout(function(){
				$('.pass_remind3').css({transform:'scale(0)',transition:'all 0s'});
			},1000);

		});	

		$('.action').eq(2).find('input').eq(2).click(function(){	
			
			new Hint(3, that.desktop_poker);		//调用出牌提示方法
			
			this.onclickflag++;
		});	
	},

	/*
		当鼠标双击元素时事件处理（点击两次）
	 */
	dblClick:function (){

		if(screen.width < 1400){
			$('.play_2 li').css({bottom:'10px'});
			$('.play_1 li').css({left:'96px'});
			$('.play_3 li').css({right:'90px'});
		}else{
			$('.play_2 li').css({top:'0px'});
			$('.play_1 li').css({left:'0px'});
			$('.play_3 li').css({left:'0px'});
		}
		// 玩家出牌后出牌数据初始化
		this.ready_poker = {poker:[], type:0, max:0};
	},

	/*
		给该玩家的牌（li）绑定鼠标右键按下事件
	 */
	mouseDown:function (e) {
		var that = this;		// 通过重新生成操作的元素，防止作用域污染

		var e = e || event;
		// console.log('eWhich'+e.which);	
		if(e.which == 3){			// 3 代表鼠标右键按下事件
			// that.game_status.player = 1;	
	        that.onPlay(2); 
	    }
	    if(e.which == 1){												// 1 代表鼠标左键按下事件
	    		var num = 2;
				$('.play_'+num).find('li').mouseout(function(e){			//给该玩家的牌（li）绑定鼠标移出事件
					if(num == 2){											//玩家2绑定拖动出牌事件
						var top = $(this).css('top');
						var bottom = $(this).css('bottom');

						if(screen.width < 1400){
							if(bottom != '20px'){
								$(this).css({bottom:'20px'});
								that.ready_poker.poker.push($(this).attr('data-value'));

							}else{
								$(this).css({bottom:'10px'});
								var index = that.ready_poker.poker.indexOf($(this).attr('data-value'));
								that.ready_poker.poker.splice(index, 1);
							}

							
						}else{
							if(top != '-10px'){
								$(this).css({top:'-10px'});
								that.ready_poker.poker.push($(this).attr('data-value'));

							}else{
								$(this).css({top:'0px'});
								var index = that.ready_poker.poker.indexOf($(this).attr('data-value'));
								that.ready_poker.poker.splice(index, 1);
							}
						}
					

						// if(top != '-10px'){
						// 	if(screen.width < 1400){
						// 		$(this).css({bottom:'-10px'});
						// 	}else{
						// 		$(this).css({top:'-10px'});
						// 	}
						// 	// $(this).css({top:'-10px'});
						// 	ready_poker.poker.push($(this).attr('data-value'));
						// 	// console.log($(this).attr('data-value'));
						// }else{
						// 	$(this).css({top:'0px'});
						// 	var index = ready_poker.poker.indexOf($(this).attr('data-value'));
						// 	ready_poker.poker.splice(index, 1);
						// 	// console.log(ready_poker);
						// }
					}else if(num == 1){										//玩家1绑定拖动出牌事件
						var left = $(this).css('left');
						if(screen.width < 1400){
							if(left != '106px'){
								$(this).css({left:'106px'});
								that.ready_poker.poker.push($(this).attr('data-value'));
							}else{
								$(this).css({left:'96px'});
								var index = that.ready_poker.poker.indexOf($(this).attr('data-value'));
								that.ready_poker.poker.splice(index, 1);
							}
						}else{
							if(left != '10px'){
								$(this).css({left:'10px'});
								that.ready_poker.poker.push($(this).attr('data-value'));
							}else{
								$(this).css({left:'0px'});
								var index = that.ready_poker.poker.indexOf($(this).attr('data-value'));
								that.ready_poker.poker.splice(index, 1);
							}

						}
						
						// if(left != '10px'){
						// 	if(screen.width < 1400){
						// 		$(this).css({marginLeft:'10px'});
						// 	}else{
						// 		$(this).css({left:'10px'});
						// 	}
						// 	// $(this).css({left:'10px'});
						// 	ready_poker.poker.push($(this).attr('data-value'));
						// 	// console.log($(this).attr('data-value'));
						// }else{
						// 	$(this).css({left:'0px'});
						// 	var index = ready_poker.poker.indexOf($(this).attr('data-value'));
						// 	ready_poker.poker.splice(index, 1);
						// 	// console.log(ready_poker);
						// }	
					}else if(num == 3){										//玩家3绑定拖动出牌事件
						var left = $(this).css('left');
						var right = $(this).css('right');
						if(screen.width < 1400){
							if(right != '100px'){
								$(this).css({right:'100px'});
								that.ready_poker.poker.push($(this).attr('data-value'));
							}else{
								$(this).css({right:'90px'});
								var index = that.ready_poker.poker.indexOf($(this).attr('data-value'));
								that.ready_poker.poker.splice(index, 1);
							}
						}else{
							if(left != '-10px'){
								$(this).css({left:'-10px'});
								that.ready_poker.poker.push($(this).attr('data-value'));
							}else{
								$(this).css({left:'0px'});
								var index = that.ready_poker.poker.indexOf($(this).attr('data-value'));
								that.ready_poker.poker.splice(index, 1);
							}
						}

						// if(left != '-10px'){
						// 	if(screen.width < 1400){
						// 		$(this).css({marginTop:'-10px'});
						// 	}else{
						// 		$(this).css({top:'-10px'});
						// 	}
						// 	// $(this).css({left:'-10px'});
						// 	ready_poker.poker.push($(this).attr('data-value'));
						// 	// console.log($(this).attr('data-value'));
						// }else{
						// 	$(this).css({left:'0px'});
						// 	var index = ready_poker.poker.indexOf($(this).attr('data-value'));
						// 	ready_poker.poker.splice(index, 1);
						// 	// console.log(ready_poker);
						// }
					}	
			       
			    })
		    	$('body').mouseup(function(){
		            $('.play_'+num).find('li').unbind('mouseout');
		       })
		    }
	    return false;			//一定要return返回值，不然一直存在该事件
	},

	/*
		定时器(倒计时)
	*/
	timer:function (intDiff) {
		var that = this;		// 通过重新生成操作的元素，防止作用域污染

		daojiTime();
		int = setInterval(daojiTime,1000);
		function daojiTime() {
			var second; //时间默认值
			if (intDiff > 0) {
			   	second = Math.floor(intDiff);
			    intDiff--;
			}else if(intDiff == 0){
			   	clearInterval(int);
			    second = 0;
			    that.notPlay(that.game_status.player);	
				that.dblClick();
			    // console.log('现在的：' + game_status.player);
			    // return false;
			}
			if (second <= 9 && second != 0 && second != null) second = '0' + second;
			$('.second_show').html(second + '秒');    
		}
	},

	/*
		当前玩家出牌
	*/
	onPlay:function (num2){
		var that = this;		// 通过重新生成操作的元素，防止作用域污染

		//在判断牌型前需要进行数据排序
		that.ready_poker.poker = that.sortPoker1(that.ready_poker.poker);

		
		console.log('准备出的牌：' +that.ready_poker.poker);
		
		

		// var type = new CheckPokers(that.ready_poker.poker, that.ready_poker);
		// console.log(!type.initEvents());

		if(!that.checkPokers(that.ready_poker.poker)){
			console.log('你出的牌不符合规则，请重新出牌');
			return false;

		}else if(!that.pokerVs()){
			console.log('桌面的牌：' +that.desktop_poker.poker);
			// alert('你打出的牌型无法打过对方，请重新出牌');
			var text = '你打出的牌型无法打过对方,'+'<br />'+'请重新出牌';
			that.Alert(text,1);
			return false;

		}else{
			// 出牌完成的流程
			// 1、把桌面的牌换玩家选择出的牌
			that.desktop_poker.type = that.ready_poker.type;		
			that.desktop_poker.max = that.ready_poker.max;
			that.desktop_poker.poker = [];

			for(var i=0; i<that.ready_poker.poker.length; i++){
				that.desktop_poker.poker.push(that.ready_poker.poker[i]);
				// console.log('桌面的牌：' +desktop_poker.poker);
					
				// 玩出牌后把玩家牌中的数据进行删除
				var index = that.allPlay[that.game_status.player].poker.indexOf(that.ready_poker.poker[i]);
				that.allPlay[that.game_status.player].poker.splice(index, 1);

				if(that.allPlay[that.game_status.player].poker == 0){
					that.won();
				}
			}
			console.log('该玩家剩余的牌：'+that.allPlay[that.game_status.player].poker);

			// 玩家出牌后出牌数据初始化
			that.ready_poker = {poker:[], type:0, max:0};
				
			// 2、重新更新桌面的牌（HTML操作）
			//当前玩家出牌位置
			
			if(that.game_status.player == 0){									// 当前,玩家1出牌

				$('.desktop_poker1 li').remove();							//清空当前玩家桌面

				for(var i=0; i<that.desktop_poker.poker.length; i++){			//当前玩家桌面重新生成打出的牌
					var temp_li = that.makePoker(this.desktop_poker.poker[i]);
					$('.desktop_poker1').append(temp_li);

					if(that.desktop_poker.poker.length <= 6){
						$('.desktop_poker1 li:last').css({top:30*(i+0.5)+'px',display:'inline-block',position:'relative',marginTop:'-220px',borderRadius:'7px',border:'1px solid #999'});
					}else{
						$('.desktop_poker1 li:last').css({top:20*(i+0.5)+'px',display:'inline-block',position:'relative',marginTop:'-280px',borderRadius:'7px',border:'1px solid #999'});
					}

					// 扑克牌加圆角，边框
					$('.desktop_poker1 li').css({borderRadius:'7px',border:'1px solid #999'});
				}
				
			}else if(that.game_status.player == 1){								//玩家2出牌
				
				$('.desktop_poker li').remove();							//清空当前玩家桌面

				for(var i=0; i<that.desktop_poker.poker.length; i++){			//当前玩家桌面重新生成打出的牌
					var temp_li = that.makePoker(that.desktop_poker.poker[i]);
					$('.desktop_poker').append(temp_li);

					if(screen.width > 1500){
						if(that.desktop_poker.poker.length > 3 && that.desktop_poker.poker.length <= 6){

							$('.desktop_poker li:last').css({left:450*(i+1)+'px',display:'inline-block',position:'relative',marginLeft:'-500px',borderRadius:'7px',border:'1px solid #999'});

						}else if(that.desktop_poker.poker.length <= 3){

							$('.desktop_poker li:last').css({left:600*(i+1)+'px',display:'inline-block',position:'relative',marginLeft:'-650px',borderRadius:'7px',border:'1px solid #999'});

						}else{

							$('.desktop_poker li:last').css({left:310*(i+1)+'px',display:'inline-block',position:'relative',marginLeft:'-400px',borderRadius:'7px',border:'1px solid #999'});
						}
					}else{
						if(that.desktop_poker.poker.length > 3 && that.desktop_poker.poker.length <= 6){

							$('.desktop_poker li:last').css({left:450*(i+1)+'px',display:'inline-block',position:'relative',marginLeft:'-500px',borderRadius:'7px',border:'1px solid #999'});

						}else if(that.desktop_poker.poker.length <= 3){

							$('.desktop_poker li:last').css({left:600*(i+1)+'px',display:'inline-block',position:'relative',marginLeft:'-650px',borderRadius:'7px',border:'1px solid #999'});

						}else{

							$('.desktop_poker li:last').css({left:310*(i+1)+'px',display:'inline-block',position:'relative',marginLeft:'-390px',borderRadius:'7px',border:'1px solid #999'});
						}
					
					}
					

					// 扑克牌加圆角，边框
					$('.desktop_poker li').css({borderRadius:'7px',border:'1px solid #999'});
				}
				
			}else if(that.game_status.player == 2){								//玩家3出牌	
				
				$('.desktop_poker3 li').remove();							//清空当前玩家桌面

				for(var i=0; i<that.desktop_poker.poker.length; i++){			//当前玩家桌面重新生成打出的牌

					var temp_li = that.makePoker(that.desktop_poker.poker[i]);
					$('.desktop_poker3').append(temp_li);

					if(that.desktop_poker.poker.length <= 6){
						$('.desktop_poker3 li:last').css({top:30*(i+0.5)+'px',display:'inline-block',position:'relative',marginTop:'-220px',borderRadius:'7px',border:'1px solid #999'});
					}else{
						$('.desktop_poker3 li:last').css({top:20*(i+0.5)+'px',display:'inline-block',position:'relative',marginTop:'-280px',borderRadius:'7px',border:'1px solid #999'});
					}

					// 扑克牌加圆角，边框
					$('.desktop_poker3 li').css({borderRadius:'7px',border:'1px solid #999'});
				}

			}else{

			}
				
			
			// 3、把出完牌的玩家牌组重新生成
			$('.play_'+(num2)+' li').remove();
			for(var i=0; i<that.allPlay[num2-1].poker.length; i++){

				that.allPlay[num2-1].poker = that.sortPoker1(that.allPlay[num2-1].poker);		//将牌堆重新排序

				var temp_li = that.makePoker(that.allPlay[num2-1].poker[i]);
				$('.play_'+num2).append(temp_li);

				if(num2 == 2){
					if(screen.width < 1400){
						$('.play_'+num2+' li:last').css({left:36*i+30+'px',borderRadius:'7px',border:'1px solid #999'});
					}else{
						$('.play_'+num2+' li:last').css({left:36*i+'px',borderRadius:'7px',border:'1px solid #999'});
					}
					
					$('.play_'+num2).css({left:-18*i+ 'px'});
				}else if(num2==1 || num2==3){

					if(screen.width < 1400){
						$('.play_'+num2+' li:last').css({top:i*30+'px',borderRadius:'7px',border:'1px solid #999'});

					}else{
						$('.play_'+num2+' li:last').css({top:i*36+'px',borderRadius:'7px',border:'1px solid #999'});

					}

					// $('.play_'+num2+' li:last').css({top:i*36+'px',borderRadius:'7px',border:'1px solid #999'});
					$('.play_'+num2).css({top:-18*3+ 'px',borderRadius:'7px',border:'1px solid #999'});
				}
			}

			// 4、自调自己
			if(that.allPlay[num2-1].poker.length == 0){
				$(".play_1 .action").hide();
				$(".play_2 .action").hide();
				$(".play_3 .action").hide();
				clearInterval(int);			//清除定时器减少内存
				var text = '你赢了';
				that.Alert(text,0);
				that.integral();
				that.won();			//烟花函数 

				return false;
			}
			that.game_status.cancle = 0;			
			that.game_status.player = ++that.game_status.player<3 ? that.game_status.player : 0;
			num2 = ++num2<4 ? num2 : 1;
		}

		$('.action').hide();					
		$('.action').eq(that.game_status.player).show();	

		//设置倒计时
		$('.second_show').html('15秒');   
		$('.second_show').hide();
		$('.second_show').eq(that.game_status.player).show(function(){

			clearInterval(int);
			var intDiff = parseInt(15); //倒计时总秒数量
			that.timer(intDiff);
		});						

		// console.log('当前：'+game_status.player);
		console.log('桌面的牌：' + that.desktop_poker.poker);

		//飞机牌型判断33,331,332
		var reg = /^(33)[1-2]{0,1}$/;


		// 以下调用的函数在最下面
		console.log('底分： '+ $('.score td').eq(0).html());

		if(that.desktop_poker.type == 66){
			that.straight();						// 顺子 						//可以

		}else if(reg.exec(that.desktop_poker.type)){		//33,331,332			//可以
			that.airPlane();						//飞机

		}else if(that.desktop_poker.type == 88){
			that.straightPair();					//连对 								//可以

		}else if(that.desktop_poker.type == 999){
			that.boomBtn();						//炸弹 								//可以

			// 底分翻倍
			$('.score td').eq(0).html($('.score td').eq(0).html()*2);  			//可以

		}else if(that.desktop_poker.type == 110){
			that.kBoom();						//王炸
			 								//可以
			// 底分四倍
			$('.score td').eq(0).html($('.score td').eq(0).html()*4);			//可以
		}
	},

	/*
		当前玩家不出牌
	*/
	notPlay:function (num2){
		var that = this;		// 通过重新生成操作的元素，防止作用域污染

		if(that.desktop_poker.type == 0){
			// alert('你必打牌出去');
			var text = '你必须打牌出去';
			that.Alert(text,1);

		}else{
			
			//点击‘不要’语音提示不要，
			$('.action .pass').on('click',function(){
				var notcall_boss = $('.notcall_boss')[0];
				notcall_boss.play();	
				that.dblClick();

			});

			// 每不出一次就取消次数加1
			that.game_status.cancle += 1;
			// 取消出牌当前出牌玩家位置设置
			that.game_status.player = ++that.game_status.player<3 ? that.game_status.player : 0;
			num2 = ++num2<4 ? num2 : 1;
			$('.action').hide();
			$('.action').eq(that.game_status.player).show();

			//设置倒计时
			$('.second_show').html('15秒');   
			$('.second_show').hide();
			$('.second_show').eq(that.game_status.player).show(function(){
				clearInterval(int);
				var intDiff = parseInt(15); //倒计时总秒数量
				that.timer(intDiff);
			});	

			// 当取消次数累到2时，清空桌面的牌
			if(that.game_status.cancle == 2){
				that.desktop_poker = {type:0, max:0, poker:[]};
				that.game_status.cancle = 0;	
			}
		}
		console.log('当前desktop_poker牌型：'+that.desktop_poker.poker);
		console.log('当前desktop_poker牌：'+that.desktop_poker.type);
		console.log('当前cancle：'+that.game_status.cancle);
		console.log('当前玩家序号：'+that.game_status.player);
	},

	/*
		牌型对决的方法
	*/
	pokerVs:function (){
		var that = this;		// 通过重新生成操作的元素，防止作用域污染

		// 桌面上没有牌，任间牌型都可以出
		if(that.desktop_poker.type == 0){

			return true;

		}else if( that.ready_poker.type==110){	// 出牌的是王炸可以直接出

			return true;
		}else if(that.desktop_poker.type!=999 && that.desktop_poker.type!=110 && that.ready_poker.type==999){		// 桌面的牌不是炸弹跟王炸，那玩家的牌只要是炸就可以出
			return true;
		}else if(that.desktop_poker.type==that.ready_poker.type && that.ready_poker.poker.length==that.desktop_poker.poker.length && that.ready_poker.max>that.desktop_poker.max){	// 普能牌型大小的判断
			return true;
		}else{
			return false;
		}
	},

	/*
		`积分
	*/
	integral:function (){
		var that = this;		// 通过重新生成操作的元素，防止作用域污染

		console.log(that.play_1.role);
		console.log(that.play_2.role);
		console.log(that.play_3.role);
		//当玩家一为地主时
		if(that.play_1.role==1 && that.play_1.poker.length == 0){		//玩家一出完牌，地主赢
			that.play_1.integral = 1000  + parseInt($('.score td').eq(0).html()) * 2;
			that.play_2.integral = 1000  - parseInt($('.score td').eq(0).html());
			that.play_3.integral = 1000  - parseInt($('.score td').eq(0).html());
			$('.score td').eq(1).html(that.play_1.integral);
			$('.score td').eq(2).html(that.play_2.integral);
			$('.score td').eq(3).html(that.play_3.integral);
		}else if(play_1.role==1 && play_2.poker.length == 0 || play_1.role==1 && play_3.poker.length == 0){		//玩家二或者玩家三出完牌，地主输
			that.play_1.integral = 1000  - parseInt($('.score td').eq(0).html()) * 2;
			that.play_2.integral = 1000  + parseInt($('.score td').eq(0).html());
			that.play_3.integral = 1000  + parseInt($('.score td').eq(0).html());
			$('.score td').eq(1).html(that.play_1.integral);
			$('.score td').eq(2).html(that.play_2.integral);
			$('.score td').eq(3).html(that.play_3.integral);
		}

		//当玩家二为地主时
		if(that.play_2.role==1 && that.play_2.poker.length == 0){			//玩家二出完牌，地主赢
			that.play_1.integral = 1000  - parseInt($('.score td').eq(0).html());
			that.play_2.integral = 1000  + parseInt($('.score td').eq(0).html()) * 2;
			that.play_3.integral = 1000  - parseInt($('.score td').eq(0).html());
			$('.score td').eq(1).html(that.play_1.integral);
			$('.score td').eq(2).html(that.play_2.integral);
			$('.score td').eq(3).html(that.play_3.integral);
		}else if(that.play_2.role==1 && that.play_1.poker.length == 0 || that.play_2.role==1 && that.play_3.poker.length == 0){		//玩家一或者玩家三出完牌，地主输
			that.play_1.integral = 1000  + parseInt($('.score td').eq(0).html());
			that.play_2.integral = 1000  - parseInt($('.score td').eq(0).html()) * 2;
			that.play_3.integral = 1000  + parseInt($('.score td').eq(0).html());
			$('.score td').eq(1).html(that.play_1.integral);
			$('.score td').eq(2).html(that.play_2.integral);
			$('.score td').eq(3).html(that.play_3.integral);
		}

		//当玩家三为地主时
		if(that.play_3.role==1 && that.play_3.poker.length == 0){		//玩家三出完牌，地主赢
			that.play_1.integral = 1000  - parseInt($('.score td').eq(0).html());
			that.play_2.integral = 1000  - parseInt($('.score td').eq(0).html());
			that.play_3.integral = 1000  + parseInt($('.score td').eq(0).html()) * 2;
			$('.score td').eq(1).html(that.play_1.integral);
			$('.score td').eq(2).html(that.play_2.integral);
			$('.score td').eq(3).html(that.play_3.integral);
		}else if(that.play_3.role==1 && that.play_1.poker.length == 0 || that.play_3.role==1 && that.play_2.poker.length == 0){		//玩家一或者玩家三出完牌，地主输
			that.play_1.integral = 1000  + parseInt($('.score td').eq(0).html());
			that.play_2.integral = 1000  + parseInt($('.score td').eq(0).html());
			that.play_3.integral = 1000  - parseInt($('.score td').eq(0).html()) * 2;
			$('.score td').eq(1).html(that.play_1.integral);
			$('.score td').eq(2).html(that.play_2.integral);
			$('.score td').eq(3).html(that.play_3.integral);
		}
	},
	
	/*
		重新发牌函数
	*/
	resetPoker:function (){
		var that = this;		// 通过重新生成操作的元素，防止作用域污染

		// $('.all_poker li').remove();		//1、删除原牌堆
		// $('.play_1 li').remove();		//1、删除玩家一牌堆
		// $('.play_2 li').remove();		//1、删除玩家二牌堆
		// $('.play_3 li').remove();		//1、删除玩家三牌堆

		that.all_poker_data = [];
		// that.all_poker_data = ['14_0', '15_1'];
		// for(i=1; i<14; i++){
		// 	for(var j=0; j<4; j++){
		// 		that.all_poker_data.push(i+ '_' +j);
		// 	}
		// }

		that.play_1.poker = [];
		that.play_2.poker = [];
		that.play_3.poker = [];

		that.play_1.role = 0;
		that.play_2.role = 0;
		that.play_3.role = 0;

		//玩家准备出的牌详细内容。poker选牌具体数据，type是牌型类型，max是该牌型用于判断大小的判断值
		that.ready_poker = {poker:[], type:0, max:0};
		that.desktop_poker1 = {poker:[], type:0, max:0}	// 初始化玩家1桌面上的牌型
		that.desktop_poker = {poker:[], type:0, max:0}	// 初始化玩家2桌面上的牌型
		that.desktop_poker3 = {poker:[], type:0, max:0}	// 初始化玩家3桌面上的牌型

		that.num1 = 0;		//定义玩家1按钮是否被点击
		that.num2 = 0;		//定义玩家2按钮是否被点击
		that.num3 = 0;		//定义玩家3按钮是否被点击
		that.game_status = {boss:-1, player:-1, cancle:0}		//初始化当游戏的状态

		// playGame();	
		console.log(that.all_poker_data);
		console.log($('all_poker'));
		console.log(that.all_play);

		// var initialize  = new Initialize($('all_poker'), that.all_poker_data, that.all_play);

		console.log(this.$all_poker);
	
	},


/****************************** 判断牌型的方法 ****************************************/
	// 	牌型代号说明：
	// 	0 		无效牌型
	// 	1 		单张
	// 	2 		对子
	// 	3 		三张
	// 	31  	三带一
	// 	32  	三带二
	// 	66		顺子
	// 	88		连对
	// 	33 		飞机
	// 	331  	飞机带单
	// 	332  	飞机带对
	// 	42      普通炸弹带单
	// 	422  	普通炸弹带对
	// 	999 	普通炸弹	
	// 	110		王炸
		
	checkPokers:function (poker){

		var that = this;		// 通过重新生成操作的元素，防止作用域污染

		var length = poker.length;
		/*
			[2_1, 3_2, 5_1]
			[[2,1],[3,2],[5,1]]
		 */
		var poker_data = [];

		var poker_a = [];

		for(var i = 0; i < that.ready_poker.poker.length; i++){	// 清除空值

			if(that.ready_poker.poker[i] == null){

				that.ready_poker.poker.pop();
			}

		}

		for(var i=0; i<length; i++){

			poker_a.push(poker[i].split('_'));		//把牌点和花色分割开		

				/*
					[2_1, 3_2, 5_1]
					[2,3,5,]
				*/
					
			poker_data.push(poker_a[i][0])		//把数组转为单维数组
					
		}

		//  出牌				
		switch(length){
			// 牌的数量为1的牌型判断
			case 1:

				that.ready_poker.type = 1;					// 设置出牌类型为单张

				that.ready_poker.max = parseInt(poker_data[0]);		// 设置该牌型的判断值

				return true;
			break;
			// 牌的数量为2的牌型判断
			case 2:
				if (that.aa(poker_data)){

					that.ready_poker.max = parseInt(poker_data[0]);

					that.ready_poker.type = 2;

					return true;

				}else if(that.ZZ(poker_data)){

					that.ready_poker.max = parseInt(poker_data[0]);

					that.ready_poker.type = 110;

					return true;

				}else{

					return null;
				}
            	
			break;

			case 3:
				if (that.aaa(poker_data)){

					that.ready_poker.max = parseInt(poker_data[1]);

					that.ready_poker.type = 3;

					return true;

				}else{

					return null;
				}
			break;

			case 4:
				if (that.aaab (poker_data)){

					that.ready_poker.max = parseInt(poker_data[2]);

					that.ready_poker.type = 31;

					return true;
			
				}else if(that.zz(poker_data)){

					that.ready_poker.max = parseInt(poker_data[1]);

					that.ready_poker.type = 999;

					return true;

				}else{

					return null;
				}
			default:

			 	if(that.aaabb(poker_data)){

			 		that.ready_poker.max = parseInt(poker_data[2]);

					that.ready_poker.type = 32;

			 		return true;

			 	}
			 	else if(that.abcde(poker_data)){

			 		that.ready_poker.max = parseInt(poker_data[poker_data.length - 1]);

					that.ready_poker.type = 66;

			 		return true;

			 	}
			 	else if(that.aabbcc(poker_data)){

			 		that.ready_poker.max = parseInt(poker_data[poker_data.length - 1]);

					that.ready_poker.type = 88;

			 		return true;

			 	}
			 	else if(that.aaabbb(poker_data)){

			 		that.ready_poker.max = parseInt(poker_data[0]);

					that.ready_poker.type = 33;

			 		return true;

			 	}
			 	else if(that.aaabbbcd(poker_data)){

					that.ready_poker.max = parseInt(poker_data[poker_data / 2 ]);

					that.ready_poker.type = 331;

			 		return true;

			 	}
			 	else if(that.aaabbbccdd(poker_data)){

			 		that.ready_poker.max = parseInt(poker_data[poker_data / 2 ]);

					that.ready_poker.type = 332;
			 		
			 		return true;

			 	}
			 	else if(that.aaaabc(poker_data)){

			 		that.ready_poker.max = parseInt(poker_data[i + 2]);

					that.ready_poker.type = 42;

			 		return true;

			 	}
			 	else if(that.aaaabbcc(poker_data)){

			 		that.ready_poker.max = parseInt(poker_data[4]);

					that.ready_poker.type = 422;

			 		return true;
			 	}
			}

	},

	// 找出相同牌点的下标
	searchKeys:function (needle, haystack){

	    var result = [];

	    for (i in haystack){

			if (haystack[i] == needle){

			    result.push(i);
			}
		}
	    return result;
	},

	//	去重
	uniq:function (array){

	  var r = [];

	  for(var i = 0, l = array.length; i < l; i++) {

	    for(var j = i + 1; j < l; j++)

	      if (array[i] === array[j]) j = ++i;

	    r.push(array[i]);

	  }
	  return r;
	},	

	//是否是对子		
	aa:function (cards) {

		if( cards.length == 2 && parseInt(cards[0]) == parseInt(cards[1])){

			return true; 

		}
	    
	},

	//是否是三根
	aaa:function (cards) {

		if(cards.length != 3 ){

			return false;
		}
	    if (cards.length == 3 && cards[0] == cards[1] && cards[1] == cards[2]){

			return true;

	    }
	},

	//是否是三带一
	aaab:function (cards) {

	    if(cards.length != 4) {

	    	return false;
	    }
	     
	   	var arr = searchKeys(cards[2], cards)
	    
	    if (arr.length != 3){
	    
	    	return false;	
		}

		return true;
	},

	//是否是三带一对
	aaabb:function (cards) {

	    if(cards.length != 5) {

	    	return false;
	    }

	    var arr = searchKeys(cards[2], cards);

	    var brr = searchKeys(cards[0], cards);

	    var crr = searchKeys(cards[4], cards);
	    
	    if (arr.length == 3 && (brr.length == 2 || crr.length == 2)){
	    
			return true;
		}
	},

	//是否是顺子
	abcde:function (cards) {

	    if(cards.length < 5 || parseInt(cards[0]) > 12 ) {
	    	console.log(cards)
	    	return false;

	    }

	    for (var i = 0; i < cards.length - 1; i++) {

	        if(parseInt(cards[i]) - 1 !== parseInt(cards[i + 1])){
				console.log(cards)
				return false;
				}
			}
			return true;

			//动画声音
			straight();					//调用顺子效果函数
	},
	
	//是否是连对
	aabbcc:function (cards) {

		if(cards.length < 6 || cards.length % 2 != 0 || cards[0] > 12){

			return false;
		}

	   for(var i = 0; i < cards.length - 3; i += 2){

			if(parseInt(cards[i]) != parseInt(cards[i + 1]) || parseInt(cards[i]) - 1 != parseInt(cards[i + 2])){

				return false
			}
		}
		return true;

		straightPair();				//调用连对效果函数
	},

	//是否是飞机
	aaabbb:function (cards) {

		var arr = [];

	    if(cards.length < 6 || cards.length % 3 != 0 || cards[length - 1] > 12) {

	    	return false;
	    }

	    arr = uniq(cards);

	    if(arr.length != cards.length / 3){

	    	return false;
	    }

	   	for(var i = 0; i < arr.length - 1; i++ ){
	   		
			if(parseInt(arr[i]) - 1 != parseInt(arr[i + 1])){

				return false;
			}
		}
		return true;

		//飞机效果
		airPlane();
	},

	//是否是飞机带单
	aaabbbcd:function (cards) {

		var arr = [];

		var brr = [];

		var crr = [];

	    if(cards.length < 8 || cards.length % 4 != 0) {

	    	return false;
	    }

	   	arr =  uniq(cards)

			for(var i = 0; i < arr.length; i++){

			brr = searchKeys(arr[i], cards);
		    console.log(brr)
		    if (brr.length == 3){
		    	
		    	crr.push(brr)
			}
		}
		if(crr.length != cards.length / 4 ){

			return false;
		}
		for (var i = 0; i < crr.length - 1; i++) {

	        if(parseInt(cards[parseInt(crr[i][2])]) - 1 != parseInt(cards[parseInt(crr[i + 1][0])]) || parseInt(cards[parseInt(crr[0][0])]) > 12){
	
				return false;
				}	
			}
			return crr[i][2];
	    return true;
	   
	},

	//是否是飞机带对
	aaabbbccdd:function (cards) {

		var arr = [];

		var brr = [];

		var crr = [];

		var drr = [];

	     if(cards.length < 10 || cards.length % 5 != 0) {

	    	return false;
	    }

	    arr =  uniq(cards);

			for(var i = 0; i < arr.length; i++){

			brr = searchKeys(arr[i], cards);

			if(brr.length == 3){

				crr.push(brr);
				console.log(crr);

			}else if(brr.length == 2){

				drr.push(brr);

			}else{

				return false;
			}					    
		}

		if(crr.length != cards.length / 5 || drr.length != cards.length / 5 ){

			return false;
		}

		for (var i = 0; i < crr.length - 1; i++) {

	        if(parseInt(cards[parseInt(crr[i][2])]) - 1 != parseInt(cards[parseInt(crr[i + 1][0])]) || parseInt(cards[parseInt(crr[0][0])]) > 12){
	
				return false;
				}
			}
			return crr[i][2];
	    return true;

	},

	//是否是四带二
	aaaabc:function (cards) {

	    if(cards.length != 6) {

	    	return false;
	   	}

			var arr = searchKeys(cards[2], cards)
		    
		if (arr.length != 4){
		    
		    return false;

		}

		return true;

	},

	//是否是四带两个对			
	aaaabbcc:function (cards) {
		
		var crr = [];

		var arr =  uniq(cards);

		var brr = [];

	    if(cards.length != 8 || arr.length != 3) {

	    	return false;
	    }
		    
			for(var i = 0; i < arr.length; i++){	

			brr = searchKeys(arr[i], cards);
			
		    if (brr.length == 2){
		    	
		    	crr.push(brr[i])
			}
		}
		if(crr.length != 2){

			return false;
		}

	    return true;
	},

	//是否是普通炸弹
	zz:function (cards) {

		var arr =  uniq(cards);

		if(arr.length != 1 || cards.length != 4){

			return false;
		}

	    return true;

	},

	//是否是王炸
	ZZ:function (cards) {

	   if(cards.length != 2 || cards[1] < 14 ){

	   		return false;
	   }

	   return true;

	},


/********************************* 出牌特效 *******************************************/
	/*
		 顺子开始 
	*/
	straight:function(){

		// 暂停背景音乐
		// $('.bgm').attr('src','0');

		//语音提示‘顺子’
		$('.boom').append('<audio src="./audio/straight.wav" autoplay="true">');
	},

	/* 
		连对开始 
	*/
	straightPair:function(){

		// 暂停背景音乐
		// $('.bgm').attr('src','0');

		//语音提示‘连对’
		$('.boom').append('<audio src="./audio/straightpair.wav" autoplay="true">');
	},


	/* 
		炸弹效果开始	
	*/
	boomBtn:function(){

		// 暂停背景音乐
		// $('.bgm').attr('src','0');

		//语音提示‘炸弹’
		$('.boom').append('<audio src="./audio/boom.wav" autoplay="true">');

		for(var i=0; i<3; i++){
			$('body').css({left:'-2%',top:'-1%'});
			setTimeout(function(){
				$('body').css({left:'-2%',top:'1%'});
			},200);
		}
		//分时间降落
		setTimeout(function(){
			if(screen.width < 1400){
				$('.boom0').css({left:'20%',top:'288%',transition:'all 0.5s ease'});

					// 1400毫秒后消失到原来位置
					setTimeout(function(){
						$('.boom0').css({left:'95%',top:'0%',transition:'all 0s'});
					},1400);

				setTimeout(function(){
					$('.boom1').css({left:'40%',top:'288%',transition:'all 0.5s ease'});

					// 1000毫秒后消失到原来位置
					setTimeout(function(){
						$('.boom1').css({left:'115%',top:'0%',transition:'all 0s'});
					},1000);
				},500);

				setTimeout(function(){
					$('.boom2').css({left:'60%',top:'288%',transition:'all 0.5s ease'});

					// 500毫秒后消失到原来位置
					setTimeout(function(){
						$('.boom2').css({left:'135%',top:'0%',transition:'all 0s'});
					},500);
				},1000);

				$('.audioBoom').append('<audio src="./audio/boom1.mp3" autoplay="true">');
				setTimeout(function(){
					$('.kboom').css({transform:'scale(1)',transition:'all 1s ease'});

					// 1000毫秒后消失到原来位置
					setTimeout(function(){
						$('.kboom').css({transform:'scale(0)',transition:'all 0s'});
					},1000);
				},1500);

			}else{
				$('.boom0').css({left:'20%',top:'388%',transition:'all 0.5s ease'});

					// 1400毫秒后消失到原来位置
					setTimeout(function(){
						$('.boom0').css({left:'95%',top:'0%',transition:'all 0s'});
					},1400);

				setTimeout(function(){
					$('.boom1').css({left:'40%',top:'388%',transition:'all 0.5s ease'});

					// 1000毫秒后消失到原来位置
					setTimeout(function(){
						$('.boom1').css({left:'115%',top:'0%',transition:'all 0s'});
					},1000);
				},500);

				setTimeout(function(){
					$('.boom2').css({left:'60%',top:'388%',transition:'all 0.5s ease'});

					// 500毫秒后消失到原来位置
					setTimeout(function(){
						$('.boom2').css({left:'135%',top:'0%',transition:'all 0s'});
					},500);
				},1000);

				$('.audioBoom').append('<audio src="./audio/boom1.mp3" autoplay="true">');
				setTimeout(function(){
					$('.kboom').css({transform:'scale(1)',transition:'all 1s ease'});

					// 1000毫秒后消失到原来位置
					setTimeout(function(){
						$('.kboom').css({transform:'scale(0)',transition:'all 0s'});
					},1000);
				},1500);
			}

		},600);
		
	},

	/* 
		王炸开始	
	*/
	kBoom:function(){

		// 暂停背景音乐
		// $('.bgm').attr('src','0');

		//语音提示王炸’
		$('.boom').append('<audio src="./audio/kboom.wav" autoplay="true">');

		//分时间降落
		setTimeout(function(){

			if(screen.width < 1400){
				$('.boom0').css({left:'20%',top:'288%',transition:'all 0.5s ease'});

					// 1400毫秒后消失到原来位置
					setTimeout(function(){
						$('.boom0').css({left:'95%',top:'0%',transition:'all 0s'});
					},1400);

				setTimeout(function(){
					$('.boom1').css({left:'40%',top:'288%',transition:'all 0.5s ease'});

					// 1000毫秒后消失到原来位置
					setTimeout(function(){
						$('.boom1').css({left:'115%',top:'0%',transition:'all 0s'});
					},1000);
				},500);

				setTimeout(function(){
					$('.boom2').css({left:'60%',top:'288%',transition:'all 0.5s ease'});

					// 500毫秒后消失到原来位置
					setTimeout(function(){
						$('.boom2').css({left:'135%',top:'0%',transition:'all 0s'});
					},500);
				},1000);

				$('.audioBoom').append('<audio src="./audio/boom1.mp3" autoplay="true">');
				setTimeout(function(){
					$('.kboom').css({transform:'scale(1)',transition:'all 1s ease'});

					// 1000毫秒后消失到原来位置
					setTimeout(function(){
						$('.kboom').css({transform:'scale(0)',transition:'all 0s'});
					},1000);
				},1500);

			}else{
				$('.boom0').css({left:'20%',top:'388%',transition:'all 0.5s ease'});

					// 1400毫秒后消失到原来位置
					setTimeout(function(){
						$('.boom0').css({left:'95%',top:'0%',transition:'all 0s'});
					},1400);

				setTimeout(function(){
					$('.boom1').css({left:'40%',top:'388%',transition:'all 0.5s ease'});

					// 1000毫秒后消失到原来位置
					setTimeout(function(){
						$('.boom1').css({left:'115%',top:'0%',transition:'all 0s'});
					},1000);
				},500);

				setTimeout(function(){
					$('.boom2').css({left:'60%',top:'388%',transition:'all 0.5s ease'});

					// 500毫秒后消失到原来位置
					setTimeout(function(){
						$('.boom2').css({left:'135%',top:'0%',transition:'all 0s'});
					},500);
				},1000);

				$('.audioBoom').append('<audio src="./audio/boom1.mp3" autoplay="true">');
				setTimeout(function(){
					$('.kboom').css({transform:'scale(1)',transition:'all 1s ease'});

					// 1000毫秒后消失到原来位置
					setTimeout(function(){
						$('.kboom').css({transform:'scale(0)',transition:'all 0s'});
					},1000);
				},1500);

			}
		},600);
	},

	/*  
		飞机效果开始  
	*/
	airPlane:function(){

		// 暂停背景音乐
		// $('.bgm').attr('src','0');

		//语音提示‘飞机’
		$('.aircraft').append('<audio src="./audio/airplane.mp3" autoplay="true">');
		setTimeout(function(){
			$('.aircraft').append('<audio src="./audio/aircraft.mp3" autoplay="true">');
			$('.aircraft img').css({left:'-100%',transition:'all 3s ease'});
			setTimeout(function(){
				$('.aircraft img').css({top:'10%',left:'100%',transition:'all 0s'});
			},2000);
		},1000);
	},

	
	/* 
		赢了效果开始 
	*/
	won:function(){
		// 暂停背景音乐
		$('.bgm').attr('src','0');

		var won = $('.win1')[0];
		won.play();

		$('.firework0').css({transform:'scale(0.8)',transition:'all 0.5s ease'});

		setTimeout(function(){
			$('.firework0').css({transform:'scale(0)',transition:'all 0.5s ease'});
		},1300);

		setTimeout(function(){
			$('.firework1').css({transform:'scale(0.8)',transition:'all 0.5s ease'});
			setTimeout(function(){
				$('.firework1').css({transform:'scale(0)',transition:'all 0.5s ease'});
			},500);
		},500);

		setTimeout(function(){
			$('.firework2').css({transform:'scale(0.8)',transition:'all 0.5s ease'});
			setTimeout(function(){
				$('.firework2').css({transform:'scale(0)',transition:'all 0.5s ease'});
			},800);
		},1000);

		setTimeout(function(){
			$('.firework3').css({transform:'scale(0.8)',transition:'all 0.5s ease'});
			setTimeout(function(){
				$('.firework3').css({transform:'scale(0)',transition:'all 0.5s ease'});
			},800);
		},1000);

		setTimeout(function(){
			$('.win').css({transform:'scale(1)'});
		},2500);
	}

}
