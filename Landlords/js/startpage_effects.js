//启动页

function startPage(continueGame, newGame, aboutGame){

	this.continueGame = continueGame;
	this.newGame = newGame;
	this.aboutGame = aboutGame;

	this.initEvent();

}

startPage.prototype = {

	constructor:startPage,

	initEvent:function(){

		var that = this;

		setInterval(function(){
 
			$('.gameName .playerPic').css({transform:'rotateY(180deg)'});
			setTimeout(function(){
				$('gameName .playerPic').css({transform:'rotateY(360deg)'});
			},500);
		},1000);


		// 按钮‘继续游戏’
		this.continueGame.click(function(){

			that.continue_game();
		});


		// 按钮‘新游戏’
		this.newGame.click(function(){

			that.new_game();
		});

		// 显示‘关于游戏’弹框
		this.aboutGame.click(function(){
			$('.QA').css({transform:'scale(1)'});
			$('.QAofGame').css({transition:'all 0.5s ease',height:'35em',paddingBottom:'5%'});
		});

		//关闭‘关于游戏’弹框
		$('.hideQA,.closeQA').click(function(){
			$('.QAofGame').css({transition:'all 0.5s ease',height:'0em'});
			$('.QAPanel').css({opacity:'0'});
			setTimeout(function(){
				$('.QA').css({transform:'scale(0)'});
				$('.QAPanel').css({opacity:'1'});
			},260);
		});

		//点击关于游戏，也可以关闭弹框
		$('.title').click(function(){
			$('.QAofGame').css({transition:'all 0.5s ease',height:'0em'});
			$('.QAPanel').css({opacity:'0'});
			$('.closeQA').css({background:'#096009'});
			setTimeout(function(){
				$('.QA').css({transform:'scale(0)'});
				$('.QAPanel').css({opacity:'1'});
			},260);
		});
	},

	// 点击继续游戏按钮
	continue_game:function(){

		$('.continueCover').css({transform:'scale(1)'});
		$('.continue').css({width:'360px',transition:'all 0.5s ease'});
		//关闭提示框
		$('.closeRemind').click(function(){
			$('.continue').css({width:'400px',transition:'all 0.5s ease'});
			$('.continueCover').css({transform:'scale(0)'});
			window.location = './startpage.html';
		});

		//跳到游戏界面(按新游戏按钮)
		$('.confirmBtn').click(function(){

			// 背景音乐音量调为20%
			document.getElementsByClassName('bgm')[0].volume = 0.2;

			$('.continueCover').append('<audio src="./audio/startmusic.mp3" autoplay="true">');
			$('.continue').css({opacity:'0',transition:'all 0.5s ease'});

			// 创建进度条背景
			var counttime = $('<div />')
			.attr('class','counttime')
			.css({width:'590px',height: '20px',margin: '-170px auto',lineHeight:'18px',background: '#000',borderRadius: '10px',boxShadow:'0 1px 3px 3px rgba(6, 12, 27, 0.5)'});
			$('.continueCover').append(counttime);


			//创建百分比移动框
			var per = $('<div />')
			.attr('class','percent')
			.css({width:'65px',height: '30px',position:'relative',top:'10%',marginLeft:'33%',color:'#fff',textAlign:'center',lineHeight:'30px',background: '#000',borderRadius: '10px'});
			$('.continueCover').append(per);

			// $('.percent').html(1233);
			// 箭头
			var arrow = $('<div />')
			.attr('class','arrow')
			.css({
				width:'0px',
				height:'0px',
				position:'absolute',
				top:'-55px',
				marginTop:'-55px',
				borderTop:'20px solid green',
				borderRight:'20px solid transparent',
				borderBottom:'20px solid transparent',
				borderLeft:'20px solid transparent'
			});
			$('.percent').append(arrow);

			// 创建进度条
			var length = $('<div />')
			.attr('class','length')
			.css({
				width:'0px',
				height: '20px',
				display: 'inlineBlock',
				position:'absolute',
				transition: 'all 0.5s ease',
				paddingRight:'4px',
				color:'#fff',
				textAlign:'center',
				background: '-webkit-linear-gradient(45deg,#999 transparent 1%,green 50%,green 75%,transparent 75%,transparent)',
				borderRadius:' 10px'
			});

			$('.counttime').append(length);

			var i = 0;
			countTime();

			//进度条
			function countTime(){
				i = ++i > 21? 0 : i;
				$('.length').css({			//进度条
					width: i*30+'px',
					position:'absolute',
					transition: 'all 0.5s ease',

					left:'10px solid transparent',
					right:'10px solid transparent',
					backgroundSize: '30px 30px',
					backgroundImage: '-webkit-linear-gradient(45deg,#8BC34A 50%,transparent 50%,transparent 50%,green 50%,green 75%,transparent 75%,transparent)',

				}).animate({backgroundPosition:'0 0'},500).animate({backgroundPosition:'60px 30px'},500);

				$('.percent').css({left: i*30+'px',transition:'all 0.5s ease'});

				var j = Math.round(Math.random()*100)/100;
				$('.percent').html(				//百分比
					function(){
						var res = i*5-j > 100 ? 100 : i*5-j;
						return res+'%';
					});
				if(i < 21){
					var sett = setTimeout(function(){			//进度条自动滚动
						countTime();			
					},230);
				}else if(i >= 21){					//跳到游戏界面
					window.location = './index1007.html';
				}else{
					return;	
				}
			}
		});
	},

	// 点击新游戏按钮
	new_game:function(){

		//提示新游戏会删除之前的游戏记录
		$('.remindCover').css({
			transform:'scale(1)'
		});
		$('.remind').css({width:'360px',transition:'all 0.5s ease'});

		//关闭提示框
		$('.closeRemind').click(function(){
			$('.remind').css({width:'400px',transition:'all 0.5s ease'});
			$('.remindCover').css({transform:'scale(0)'});
			window.location = './startpage.html';
		});

		//跳到游戏主页面(按确定按钮)
		$('.confirmBtn').click(function(){

			// 背景音乐音量调为20%
			document.getElementsByClassName('bgm')[0].volume = 0.2;

			$('.remindCover').append('<audio src="./audio/startmusic.mp3" autoplay="true">');
			$('.remind').css({opacity:'0',transition:'all 0.5s ease'});

			// 创建进度条背景
			var counttime = $('<div />')
			.attr('class','counttime')
			.css({width:'590px',height: '22px',margin: '-170px auto',paddingTop:'1.5px',lineHeight:'18px',background: '#000',overflow:'hidden',borderRadius: '10px',boxShadow:'0 1px 3px 3px rgba(6, 12, 27, 0.5)'});
			$('.remindCover').append(counttime);

			//创建百分比移动框
			var per = $('<div />')
			.attr('class','percent')
			.css({width:'65px',height: '30px',position:'relative',top:'10%',marginLeft:'33%',color:'#fff',textAlign:'center',lineHeight:'30px',background: '#000',borderRadius: '10px'});
			$('.remindCover').append(per);

			// $('.percent').html(1233);
			// 箭头									//这里有问题
			var arrow = $('<div />')
			.attr('class','arrow')
			.css({
				width:'0px',
				height:'0px',
				display:'inline-block',
				position:'relative',
				top:'-15%',
				borderTop:'20px solid green',
				borderRight:'20px solid transparent',
				borderBottom:'20px solid transparent',
				borderLeft:'20px solid transparent'
			});
			$('.percent').append(arrow);

			// 创建进度条
			var length = $('<div />')
			.attr('class','length')
			.css({
				width:'0px',
				height: '20px',
				display: 'inlineBlock',
				position:'absolute',
				transition: 'all 0.5s ease',
				paddingRight:'4px',
				color:'#fff',
				textAlign:'center',
				background: '-webkit-linear-gradient(45deg,#999 transparent 1%,green 50%,green 75%,transparent 75%,transparent)',
				borderRadius:' 10px'
			});

			$('.counttime').append(length);

			var i = 0;
			countTime();

			//进度条
			function countTime(){
				i = ++i > 21? 0 : i;
				$('.length').css({			//进度条
					width: i*30+'px',
					position:'absolute',
					transition: 'all 0.5s ease',

					left:'10px solid transparent',
					right:'10px solid transparent',
					backgroundSize: '30px 30px',
					backgroundImage: '-webkit-linear-gradient(45deg,#8BC34A 50%,transparent 50%,transparent 50%,green 50%,green 75%,transparent 75%,transparent)',

				}).animate({backgroundPosition:'0 0'},500).animate({backgroundPosition:'60px 30px'},500);

				$('.percent').css({left: i*30+'px',transition:'all 0.5s ease'});

				var j = Math.round(Math.random()*100)/100;
				$('.percent').html(				//百分比
					function(){
						var res = i*5-j > 100 ? 100 : i*5-j;
						return res+'%';
					});
				if(i < 21){
					var sett = setTimeout(function(){			//进度条自动滚动
						countTime();			
					},230);
				}else if(i >= 21){					//跳到游戏界面
					window.location = './index1007.html';
				}else{
					return;	
				}
			}
		});
	}
	
}
//启动页结束