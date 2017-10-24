/*
	创建一个初始化牌抽象类（函数）
 */
function Initialize($all_poker,  all_poker_data, all_play){
	this.$all_poker =  $all_poker;
	this.all_poker_data =  all_poker_data;
	this.all_play = all_play;
	
	this.init_poker();		//初始化牌堆
	// this.initElements();	//初始化元素
	// this.initEvents();		//初始化事件
}

// 添加对应对象属性或方法
Initialize.prototype = {
	constructor:Initialize,	// 定义构造函数来自哪里

	/*
		初始化牌堆
	*/
	init_poker:function () {

		$('body').css({backgroundPosition:'0 0'});

		// 生成数据
		this.all_poker_data = ['14_0', '15_1'];
		for(i=1; i<14; i++){
			for(var j=0; j<4; j++){
				this.all_poker_data.push(i+ '_' +j);
			}
		}
		console.log(this.all_poker_data);

		// 初始化牌堆，页面显示
		for(var i=0; i<54; i++){
			this.$all_poker_li = $('<li class="back" style="top:-'+i+'px; left:-'+i+'px"></li>');
			this.$all_poker.append(this.$all_poker_li);
			
		}


		// 扑克牌加圆角，边框
		$('.all_poker li').css({border:'1px solid #999',borderRadius:'7px'});
	},

	/*
		洗牌方法
	 */
	clearPoker:function (){

		/*洗牌时候阻止点击的蒙层*/
		$('.noClick').css({height:'100%'});
		$('.noClick').attr('class','noClick alerthide');

		// 背景音乐音量调为20%
		document.getElementsByClassName('bgm')[0].volume = 0.2;
			
		// 洗牌声音
		var clearPokerSound = $('.clearPokerSound')[0];
		// clearPokerSound.play();

		//洗牌对于电脑来说就是把堆数据顺序打乱
		for(var i=0; i<2; i++){
			this.all_poker_data.sort(function(){
				return 0.5-Math.random();
			});
		}
		console.log(this.all_poker_data);

		var all_poker = $('.mid_top').html();		//先保存原来的HTML代码，方便后面的调用
		this.$all_poker.remove();		//1、删除原牌堆

		for(var i=0; i<1; i++){
			this.$ul = $('<ul />').attr('class', 'all_poker').css({top:-i*275+'px',position:'absolute',left:'50%',marginLeft:'-62px'});
			//通过JQ生成一页面ul元素对象
			
			for(var j=0; j<54; j++){
				this.$li = $('<li />').attr('class', 'back').css({top:-j+ 'px'});
				this.$ul.append(this.$li);
			}
			// console.log($ul);
			$('.mid_top').append(this.$ul);
		}

		// 扑克牌加圆角，边框
		this.$all_poker_li.css({border:'1px solid #999',borderRadius:'7px'});

		//洗牌动画
		for(var i=0; i<30; i++){
			for(var k=15; k>0; k--){
				var j = 10*(Math.random()-0.5);
				// console.log('j:' + j);
				$('.all_poker li').eq(k).animate({top:5*k*j+'px',transform:'rotateX('+k*j+'px)'},100)
				.animate({left:j*k*3+'px',top:'0px',transform:'rotateX('+k*j+'px)',zIndex:'999'},200);
			}

			for(var k=15; k>0; k--){
				var j = 10*(Math.random()-0.5);
				// console.log('j:' + j);
				$('.all_poker li:last').eq(k).animate({left:5*k*j+'px',transform:'rotateY('+k*j+'px)'},200)
				.animate({top:j*k*5+'px',left:'0px',transform:'rotateX('+k*j*i+'px)',zIndex:'999'},500);
			}
		}

		//把牌堆还原
		setTimeout(function(){
			$('.mid_top').html(all_poker);
				
		},1300);
	},

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

		/**初始化页面牌堆**/
		this.$all_poker_li = $('.all_poker li');
		this.$all_poker_li_last = $('.all_poker li:last');

		/**初始化页面玩家一**/
		this.$play_1 = $('.play_1');
		this.$play_1_li_list = $('.play_1 li:last');

		this.deal(0);
	},


	/*
		发牌方法
	 */
	deal:function (number){
		var that = this;		// 通过重新生成操作的元素，防止作用域污染
		// 洗牌声音
		var dealPokerSound = $('.dealPokerSound')[0];
		dealPokerSound.play();

		//发牌给左边玩家
		// 扑克牌加圆角，边框
		that.$all_poker_li.css({border:'1px solid #999',borderRadius:'7px'});



		$('.all_poker li:last').animate({
			left:'-650px', top:'-100px'
		},20);

		//发牌给左边的玩家一
		setTimeout(function(){
			$('.all_poker li:last').remove();
			(that.play_1_poker).push(that.all_poker_data.pop());

			//通过调用makerPoker()这个方法并且传入数据中，最新那张牌的数据得到该数据牌面的HTML代码
			var poker_html = that.makePoker(that.play_1_poker[that.play_1_poker.length-1]);

			$('.play_1').append(poker_html);
			$('.play_1 li:last').css({top:-number*30+450+'px',transform:'rotate('+number*45+'deg)',background: 'url(./images/back.jpg)'});
			
		},50);
		

		//发牌给中间的玩家二
		setTimeout(function(){


			$('.all_poker li:last').animate({
				top:'480px'
			},20);

			setTimeout(function(){
				$('.all_poker li:last').remove();

				//把牌堆中最后一张牌数据添加到玩家2的手牌数据中，并且删除掉改数据
				(that.play_2_poker).push(that.all_poker_data.pop());

				//通过调用makerPoker()这个方法并且传入数据中，最新那张牌的数据得到该数据牌面的HTML代码
				var poker_html = that.makePoker(that.play_2_poker[that.play_2_poker.length-1]);
				// console.log(poker_html);
				$('.play_2').append(poker_html);

				if(screen.width < 1400){
					$('.play_2 li:last').css({left:(30+number*30)+'px',transform:'rotate('+number*45+'deg)',background: 'url(./images/back.jpg)'});
				}else{
					$('.play_2 li:last').css({left:number*30+'px',transform:'rotate('+number*45+'deg)',background: 'url(./images/back.jpg)'});
				}
				
				$('.play_2').css({left:-18*number+ 'px'});

			},50);
		},70);


		//发牌给右边玩家三
		setTimeout(function(){
			$('.all_poker li:last').animate({
				left:'650px', top:'-100px'
			},20);

			setTimeout(function(){
				$('.all_poker li:last').remove();
				//把牌堆中最后一张牌数据添加到玩家3的手牌数据中，并且删除掉改数据
				(that.play_3_poker).push(that.all_poker_data.pop());
				//通过调用makerPoker()这个方法并且传入数据中，最新那张牌的数据得到该数据牌面的HTML代码
				var poker_html = that.makePoker(that.play_3_poker[that.play_3_poker.length-1]);

				$('.play_3').append(poker_html);
				
				if(screen.width < 1400){
					$('.play_3 li:last').css({top:number*30+'px',right:'90px',transform:'rotate('+number*45+'deg)',background: 'url(./images/back.jpg)'});

				}else{
					$('.play_3 li:last').css({top:number*30+30+'px',transform:'rotate('+number*45+'deg)',background: 'url(./images/back.jpg)'});

				}

				number++;
				if(number < 17){
					that.deal(number);

				}else{
					console.log('最后三张牌：'+that.all_poker_data);
					
					// 扑克牌加圆角，边框
					$('.all_poker li').css({transform:'scale(0.7)',border:'1px solid #999',borderRadius:'7px'});

					//最后三张牌动画
					if(screen.width > 1500){
						$('.all_poker li').eq(0).animate({transform:'scale(0.7)',left:'-270px'},200).animate({transform:'scale(0.7)',left:'-270px', top:'-340px'},100);
						$('.all_poker li').eq(1).animate({transform:'scale(0.7)',left:'-150px'},200).animate({transform:'scale(0.7)',left:'-150px', top:'-340px'},100);
						$('.all_poker li').eq(2).animate({transform:'scale(0.7)',left:'-30px'},200).animate({transform:'scale(0.7)',left:'-30px', top:'-340px'},100);

					}else if(screen.width > 1400 && screen.width < 1500){
						$('.all_poker li').eq(0).animate({transform:'scale(0.7)',left:'-270px'},200).animate({transform:'scale(0.7)',left:'-270px', top:'-340px'},100);
						$('.all_poker li').eq(1).animate({transform:'scale(0.7)',left:'-150px'},200).animate({transform:'scale(0.7)',left:'-150px', top:'-340px'},100);
						$('.all_poker li').eq(2).animate({transform:'scale(0.7)',left:'-30px'},200).animate({transform:'scale(0.7)',left:'-30px', top:'-340px'},100);

					}else if(screen.width <= 1400){
						$('.all_poker li').eq(0).animate({transform:'scale(0.7)',left:'-220px'},200).animate({transform:'scale(0.7)',left:'-220px', top:'-290px'},100);
						$('.all_poker li').eq(1).animate({transform:'scale(0.7)',left:'-120px'},200).animate({transform:'scale(0.7)',left:'-120px', top:'-290px'},100);
						$('.all_poker li').eq(2).animate({transform:'scale(0.7)',left:'-20px'},200).animate({transform:'scale(0.7)',left:'-20px', top:'-290px'},100);
					}else{
						$('.all_poker li').eq(0).animate({transform:'scale(0.7)',left:'-220px'},200).animate({transform:'scale(0.7)',left:'-220px', top:'-290px'},100);
						$('.all_poker li').eq(1).animate({transform:'scale(0.7)',left:'-120px'},200).animate({transform:'scale(0.7)',left:'-120px', top:'-290px'},100);
						$('.all_poker li').eq(2).animate({transform:'scale(0.7)',left:'-20px'},200).animate({transform:'scale(0.7)',left:'-20px', top:'-290px'},100);
					}
					$('.all_poker li').eq(3).remove();


					$('.play_1 .player').css({transform:'scale(1)'});
					$('.play_2 .player').css({transform:'scale(1)'});
					$('.play_3 .player').css({transform:'scale(1)'});


					// 显示积分榜
					$('.platform').css({transform:'scale(1)',transition:'all 0.4s ease'});
					$('.integral').css({transform:'scale(1)',transition:'all 0.4s ease'});
					

					that.sortPoker(that.play_1_poker);		//调用排序方法,参数为玩家1手中的牌
					that.sortPoker(that.play_2_poker);		//调用排序方法,参数为玩家2手中的牌
					that.sortPoker(that.play_3_poker);		//调用排序方法,参数为玩家3手中的牌

					// setTimeout(function(){			//调用随机叫地主的玩家的方法
					// 	landlord();						//调用选地主方法
					// },3000);
					
					//发牌结束后进行玩家手牌数据调整动画
					setTimeout(function(){

						//等1秒的时间吧玩家手牌变成背面
						//玩家1（左边）
						$('.play_1 li').attr('class','back').css({background:'',transition:'all 0.5s ease',transform:'scale(0.8)'});
						setTimeout(function(){
							$('.play_1 li').attr('class','back').css({transition:'all 0.5s ease',transform:'scale(1)'});
						},200);

						//再等0.5秒后把已经排序好的牌面显示
						setTimeout(function(){
							$('.play_1 li').remove();

							for(var i=0; i<that.play_1_poker.length; i++){
								var temp_li = that.makePoker(that.play_1_poker[i]);
								$('.play_1').append(temp_li);
								$('.play_1 li:last').css({border:'1px solid #999',borderRadius:'5px',top:30*i+'px'});
							}
						},300);

						//玩家2（中间）
						$('.play_2 li').attr('class','back').css({background:'',transition:'all 0.5s ease',transform:'scale(0.8)'});

						setTimeout(function(){
							$('.play_2 li').attr('class','back').css({transition:'all 0.5s ease',transform:'scale(1)'});
						},200);

						//再等0.5秒后把已经排序好的牌面显示
						var arr = [-40,-35,-30,-25,-20,-15,-10,-5,0,5,10,15,20,25,30,35,40];

						setTimeout(function(){
							$('.play_2 li').remove();
							for(var i=0; i<that.play_2_poker.length; i++){
								// console.log('arr['+i+']:'+arr[i]);
								var temp_li = that.makePoker(that.play_2_poker[i]);
								$('.play_2').append(temp_li);
								if(screen.width < 1400){
									$('.play_2 li:last').css({left:30*i+30+'px',border:'1px solid #999',borderRadius:'5px'});
								}else{
									$('.play_2 li:last').css({left:30*i+'px',border:'1px solid #999',borderRadius:'5px'});
								}
								
							}
						},300);

						//玩家3（右边）
						$('.play_3 li').attr('class','back').css({background:'',transition:'all 0.5s ease',transform:'scale(0.8)'});

						setTimeout(function(){
							$('.play_3 li').attr('class','back').css({transition:'all 0.5s ease',transform:'scale(1)'});
						},200);

						//再等0.5秒后把已经排序好的牌面显示
						setTimeout(function(){
							$('.play_3 li').remove();

							for(var i=0; i<that.play_3_poker.length; i++){
								var temp_li = that.makePoker(that.play_3_poker[i]);
								$('.play_3').append(temp_li);
								if(screen.width < 1400){
									$('.play_3 li:last').css({border:'1px solid #999',borderRadius:'5px',top:30*i+'px',right:'90px'});
								}else{
									$('.play_3 li:last').css({border:'1px solid #999',borderRadius:'5px',top:30*i+'px',});
								}
							}
						},300);
					},500);

					that.saveData();	//保存当前牌堆数据 all_poker_data
				}
			},50);
		},160);
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
		排序生成牌面的方法
	*/
	sortPoker:function (arr){
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
		// console.log(sort_arr);

		//判断应该执行的玩家排序页面
		if(arr===that.play_2_poker){
			that.play_2_poker = sort_arr;
			sortPlay_2(that.play_2_poker);

		}else if(arr===that.play_1_poker){
			that.play_1_poker = sort_arr;
			sortPlay_1(that.play_1_poker);

		}else if(arr===that.play_3_poker){
			that.play_3_poker = sort_arr;
			sortPlay_3(that.play_3_poker);
		}

		//生成玩家二页面
		function sortPlay_2(poker){
			console.log(that.play_2_poker);
			$('.play_2 li').attr('class', 'back').css({background:'',border:'1px solid #999',borderRadius:'7px'});
			// $('.play_2 li').animate({left:0+'px'}, 1000);
			// $('.play_2').animate({left:0+ 'px'},1000);
		
			setTimeout(function(){
				$('.play_2 li').remove();		//1、删除原牌堆
			} , 1500);

			setTimeout(function(){
				//通过调用makerPoker()这个方法并且传入数据中，最新那张牌的数据得到该数据牌面的HTML代码
				
				for(i=0; i<17; i++){
					var poker_html = that.makePoker(that.play_2_poker[i]);
					$('.play_2').append(poker_html);
					if(screen.width < 1400){
						$('.play_2 li:last').css({left:(30+i*30)+ 'px',border:'1px solid #999',borderRadius:'7px'});
					}else{
						$('.play_2 li:last').css({left:i*36+ 'px',border:'1px solid #999',borderRadius:'7px'});
					}
				
					$('.play_2').css({left:-18*i+ 'px'});
				}
			} , 1500);	
		}

		//生成玩家1页面(play_1)
		function sortPlay_1(poker){
			console.log(that.play_1_poker);
			$('.play_1 li').attr('class', 'back').css({background:'',border:'1px solid #999',borderRadius:'7px'});
			// $('.play_1 li').animate({top:0+'px'}, 1000);
			
			setTimeout(function(){
				$('.play_1 li').remove();		//1、删除原牌堆
			} , 1500);

			setTimeout(function(){
				//通过调用makerPoker()这个方法并且传入数据中，最新那张牌的数据得到该数据牌面的HTML代码
				for(i=0; i<17; i++){
					var poker_html = that.makePoker(that.play_1_poker[i]);
					$('.play_1').append(poker_html);
					$('.play_1 li:last').css({top:i*36+ 'px',border:'1px solid #999',borderRadius:'7px'});
				}
			} , 1500);	
		}

		//生成玩家3页面(play_3)
		function sortPlay_3(poker){
			console.log(that.play_3_poker);
			$('.play_3 li').attr('class', 'back').css({background:''});
			// $('.play_3 li').animate({top:0+'px'}, 1000);
			
			setTimeout(function(){
				$('.play_3 li').remove();		//1、删除原牌堆
			} , 1500);

			setTimeout(function(){
				//通过调用makerPoker()这个方法并且传入数据中，最新那张牌的数据得到该数据牌面的HTML代码
				for(i=0; i<17; i++){
					var poker_html = that.makePoker(that.play_3_poker[i]);
					$('.play_3').append(poker_html);
					if(screen.width < 1400){
						$('.play_3 li:last').css({top:i*36+ 'px',right:'90px',border:'1px solid #999',borderRadius:'7px'});
					}else{
						$('.play_3 li:last').css({top:i*36+ 'px',border:'1px solid #999',borderRadius:'7px'});
					}
					
				}
			} , 1500);	
		}
	},

	/*
		保存当前牌堆数据 all_poker_data
	*/
	saveData:function(){
		var data = this.all_poker_data;
		// console.log(data);
		return(data);
	}

}