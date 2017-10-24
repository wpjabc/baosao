
/*
	点击‘看看’
*/
function look(GameInfoMore, gameInfo){

	this.GameInfoMore = GameInfoMore;
	this.gameInfo = gameInfo;

	this.initEvent();
}

look.prototype = {

	constrouctor:look,

	initEvent:function(){

		var that = this;
		$('.gameInfo').on('click',function(){

			that.openGameInfoMore();
		});

		$('.closePanel').on('click',function(){

			that.closeGameInfoMore();
		});


		$('.title').on('click',function(){

			that.closeGameInfoMore();
		});

	},


		// 点击‘看看’弹框‘游戏简介’
	openGameInfoMore:function(){

		this.GameInfoMore.css({right:'1%',bottom:'1%',transition:'all 0.2s ease'});

		this.GameInfoMore.css({height:'480px'});

		this.gameInfo.css({display:'none'});
	},

	// 关闭游戏简介
	closeGameInfoMore:function(){

		this.GameInfoMore.css({right:'-32%',bottom:'-60%',transition:'all 0.2s ease'});

		this.GameInfoMore.css({height:'0px'});

		this.gameInfo.css({display:'block'});
	}

}