
this.onclickflag = 0; 	//标志位

this.flag = 0;	//标志位

// play = 玩家几（1,2,3）
// poker = 准备出的牌（）;
function Hint(play,desktop_poker, ready_poker){

	this.play = play;

	this.ready_poker = ready_poker;

	this.desktop_poker = desktop_poker;

	this.type = this.desktop_poker.type;

	this.max = this.desktop_poker.max;

	this.play_1 = [];

	this.play_2 = [];

	this.play_3 = [];

	this.npc();

}

Hint.prototype = {

	constructor:Hint,

	npc: function(){

		
		var that = this;

		if(this.play == 1){

			var opt = left;

		}else if(this.play == 2){

			var opt = top;

		}else{

			var opt = rigth;
		}

		var length = that.poker;

		/*
			[2_1, 3_2, 5_1]
			[[2,1],[3,2],[5,1]]
		*/
		
		var poker_data = [];

		var poker_a = [];

		var uniqs = [];

		var sub = [];

		var one = [];

		var a = [];

		var aa =[];

		var aaa = [];

		var aaaa = [];

		var abcde = [];

		var aaabbb = [];

		var aabbcc = [];

		var zz = [];

		var ZZ = [];

		var bigmax = [];

		for(var i=0; i<length; i++){

			poker_a.push(poker[i].split('_'));		//把牌点和花色分割开		

			/*
				[2_1, 3_2, 5_1]
				[2,3,5,]
			*/
						
			poker_data.push(poker_a[i][0])		//把数组转为单维数组
						
		}

		// 找出相同牌点的下标
		function searchKeys(needle, haystack){

		    var result = [];

		    for (i in haystack){

				if (haystack[i] == needle){

				    result.push(i);
				}
			}
		    return result;
		}

		//	去重
		function uniq(array){

		  var r = [];

		  for(var i = 0, l = array.length; i < l; i++) {

		    for(var j = i + 1; j < l; j++)

		      if (array[i] === array[j]) j = ++i;

		    r.push(array[i]);

		  }
		  return r;
		}

		uniqs = uniq(poker_data);

		for(var k = 0; k < uniqs.length; k++){

			sub = searchKeys(uniqs[k],poker_data);

			// console.log(sub,uniqs,k)

			if (uniqs[k] > 13){

				ZZ.push(searchKeys(uniqs[k],poker_data));		 // 大小王
			}

			if(sub.length == 1){

				a.push(sub);		// 单支

			}else if(sub.length == 2){

				aa.push(sub);		// 对子

			}else if(sub.length == 3){

				aaa.push(sub);		// 三张

			}else if(sub.length == 4){

				aaaa.push(sub);		// 四张
			}
		}

		for(var i = 0; i < poker_data.length; i++) {

			if(poker_data[a[i]] < 13){

				one.push(poker_data[a[i]]); 	// 2以下的牌
			}
		}

		function getSum(total, num) {

    		return total + num;
		}

		for(var i = 0; i < one.length - 5; i++){

			if(one.slice(i , i + 6).reduce(getSum) == parseInt(one[i + 2]) * 5){

				abcde.push(one.slice(i , i + 6)); 		// 顺子
			}
		}
		console.log(one+'顺子'+abcde)

		for(var i = 0; i < aa.length - 5; i+=2){

			if ( parseInt(aa[i][1]) - 1 == parseInt(aa[i + 1][0]) && parseInt(aa[i + 1][1]) - 1 == parseInt(aa[i + 2][0]) &&  parseInt(aa[0]) > 12){

				aabbcc.push(aa.slice(i , i + 3))		// 连对
			}
		}

		for(var i = 0; i < aaa.length - 4; i+=3){

			if ( parseInt(aaa[i][2]) - 1 == parseInt(aaa[i + 1][0]) &&  parseInt(aaa[0][0]) < 12){

				aaabbb.push(aaa.slice(i , i + 2))		// 飞机
			}
		}	
		console.log(a,aa,aaa,aaaa+'连对：'+aabbcc+'飞机：'+aaabbb+'顺子：'+abcde+'最大值：'+this.max+'点击'+this.onclickflag);

		for(var i = 0; i < this.ready_poker.poker.length; i++){		//	把牌初始化

			var le = $('.play_'+ play +' li').eq(i).css(opt);

			if(le == "-10px"){

				$('.play_'+ play +' li').eq(i).css({opt: "-10px"});

				var index = this.ready_poker.poker.indexOf($('.play_'+ play +'  li').eq(i).attr('data-value'));

				this.ready_poker.poker.splice(index, 1);

			}
		}

		// var opt = $('.play_'+ play +' li').eq(parseInt(a[this.onclickflag])).css(opt);

		if(this.type == 110){

			console.log('不出')
		
		}else if(this.type == 0){

			if(this.flag < 2 && a.length > 0){

				this.flag = 1;

				if(this.onclickflag > a.length - 1){

					this.onclickflag = 0;

					this.flag = 2;

				}else{
					
					this.onclickflag = this.onclickflag;
				}

				$('.play_'+ play +' li').eq(a[a.length - this.onclickflag - 1]).css({opt: "-10px"});

				this.ready_poker.poker.push($('.play_'+ play +' li').eq(a[a.length - this.onclickflag - 1]).attr('data-value'));


			}else if(this.flag < 3 && aa.length > 0){

				this.flag = 2;

				if(this.onclickflag > aa.length - 1){

					this.onclickflag = 0;

					this.flag++

				}else{

					this.onclickflag = this.onclickflag;
				}

				$('.play_'+ play +'  li').eq(parseInt(aa[aa.length - this.onclickflag - 1][0])).css({opt: "-10px"});

				$('.play_'+ play +'  li').eq(parseInt(aa[aa.length - this.onclickflag - 1][1])).css({opt: "-10px"});

				this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aa[aa.length - this.onclickflag - 1][0])).attr('data-value'));

				this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aa[aa.length - this.onclickflag - 1][1])).attr('data-value'));

			}else if(this.flag < 4 && aaa.length > 0){

				this.flag = 3;

				if(this.onclickflag > aaa.length - 1){

					this.onclickflag = 0;

					this.flag++;
					

				}else{

					this.onclickflag = this.onclickflag;
				}
					$('.play_'+ play +'  li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][0])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][1])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][2])).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][0])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][1])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][2])).attr('data-value'));

				
			}else if(this.flag < 5 && aaa.length > 0 && a.length > 0){

				this.flag = 4;

				if(this.onclickflag > aaa.length - 1){

					this.onclickflag = 0;

					this.flag++;

				}else{

					$('.play_'+ play +'  li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][0])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][1])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][2])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(a[a.length - 1])).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][0])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][1])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][2])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(a[a.length - 1])).attr('data-value'));

				}
			}else if(this.flag < 6 && aaa.length > 0 && aa.length > 0){

				this.flag = 5;

				if(this.onclickflag > aaa.length - 1){

					this.onclickflag = 0;

					this.flag++;

				}else{

					$('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][0])).css({opt: "-10px"});

					$('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][1])).css({opt: "-10px"});

					$('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][2])).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][0])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][1])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][2])).attr('data-value'));

					$('.play_'+ play +'  li').eq(parseInt(aa[aa.length  - 1][0])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aa[aa.length  - 1][1])).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aa[aa.length  - 1][0])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aa[aa.length  - 1][1])).attr('data-value'));
				}	
			}else if(this.flag < 7 && aaaa.length > 0){

				this.flag = 6;

				if(this.onclickflag > aaaa.length - 1){

					this.onclickflag = 0;

					this.flag++;

				}else{

					$('.play_1 li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 1])).css({opt: "-10px"});

					$('.play_1 li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 2])).css({opt: "-10px"});

					$('.play_1 li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 3])).css({opt: "-10px"});

					$('.play_1 li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 4])).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 1])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 2])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 3])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 4])).attr('data-value'));
				}

			}else if(this.flag < 8 && aaaa.length > 0 && a.length > 1){

				this.flag = 7;

				if(this.onclickflag > aaaa.length - 1){

					this.onclickflag = 0;

					this.flag++;

				}else{

					$('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 1])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 2])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 3])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 4])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(a[a.length - 1])).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 1])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 2])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 3])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 4])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(a[a.length - 1])).attr('data-value'));		

				}
			}else if(this.flag < 9 && aaaa.length > 0 && aa.length > 1){

				this.flag = 8;

				if(this.onclickflag > aaaa.length - 1){

					this.onclickflag = 0;

					this.flag++;

				}else{

					$('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 1])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 2])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 3])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 4])).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 1])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 2])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 3])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 4])).attr('data-value'));

					$('.play_'+ play +'  li').eq(parseInt(aa[aa.length  - 1][0])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aa[aa.length  - 1][1])).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aa[aa.length - 1][0])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aa[aa.length - 1][0])).attr('data-value'));
				}

			}else if(this.flag < 10 && abcde.length > 0){

				this.flag = 9;

				if(this.onclickflag > abcde.length - 1){

					this.onclickflag = 0;

					this.flag++;

				}else{
			
					$('.play_'+ play +'  li').eq(parseInt(abcde[abcde.length - this.onclickflag - 1])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(abcde[abcde.length - this.onclickflag - 2])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(abcde[abcde.length - this.onclickflag - 3])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(abcde[abcde.length - this.onclickflag - 4])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(abcde[abcde.length - this.onclickflag - 5])).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(abcde[abcde.length - this.onclickflag - 1])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(abcde[abcde.length - this.onclickflag - 2])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(abcde[abcde.length - this.onclickflag - 3])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(abcde[abcde.length - this.onclickflag - 4])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(abcde[abcde.length - this.onclickflag - 5])).attr('data-value'));
				}
			}else if(this.flag < 11 && aaabbb.length > 0 && a.length > 1){

				this.flag = 10;

				if(this.onclickflag > aaabbb.length - 1){

					this.onclickflag = 0;

					this.flag++;

				}else{

					$('.play_'+ play +'  li').eq(parseInt(aaabbb[0][0])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaabbb[0][1])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaabbb[0][2])).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaabbb[0][0])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaabbb[0][1])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaabbb[0][2])).attr('data-value'));

					$('.play_'+ play +'  li').eq(parseInt(aaabbb[1][0])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaabbb[1][1])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaabbb[1][2])).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaabbb[1][0])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaabbb[1][1])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaabbb[1][2])).attr('data-value'));

					$('.play_1 li').eq(a[a.length - 1]).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(a[a.length - 1]).attr('data-value'));

					$('.play_1 li').eq(a[a.length - 2]).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(a[a.length - 2]).attr('data-value'));
				}
			}else if(this.flag < 12 && aaabbb.length > 0 && aa.length > 1){

				this.flag = 11;

				if(this.onclickflag > aaabbb.length - 1){

					this.onclickflag = 0;

					this.flag++;

				}else{

					$('.play_'+ play +'  li').eq(parseInt(aaabbb[0][0])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaabbb[0][1])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaabbb[0][2])).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaabbb[0][0])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaabbb[0][1])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaabbb[0][2])).attr('data-value'));

					$('.play_'+ play +'  li').eq(parseInt(aaabbb[1][0])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaabbb[1][1])).css({opt: "-10px"});

					$('.play_'+ play +'  li').eq(parseInt(aaabbb[1][2])).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaabbb[1][0])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaabbb[1][1])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(parseInt(aaabbb[1][2])).attr('data-value'));

					$('.play_1 li').eq(aa[aa.length - 1][0]).css({opt: "-10px"});

					$('.play_1 li').eq(aa[aa.length - 1][1]).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(aa[aa.length  - 1][0]).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +'  li').eq(aa[aa.length  - 1][1]).attr('data-value'));

					$('.play_1 li').eq(aa[aa.length  - 2][0]).css({opt: "-10px"});
					
					$('.play_1 li').eq(aa[aa.length  - 2][1]).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +' li').eq(aa[aa.length  - 2][0]).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +' li').eq(aa[aa.length  - 2][1]).attr('data-value'));
				}

			}else if(this.flag < 13 && ZZ.length > 1){

				this.flag = 11;

				if(this.onclickflag > 1){

					this.onclickflag = 0;		

				}else{

					$('.play_'+ play +' li').eq(parseInt(ZZ[0])).css({opt: "-10px"});

					$('.play_'+ play +' li').eq(parseInt(ZZ[1])).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(ZZ[0])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(ZZ[1])).attr('data-value'));}
			}else{

				this.flag = 1;
			}

		}else if(this.type == 1 && a.length > 0 && this.max < poker_data[a[0]]){

			for(var i = 0; i < a.length; i++){

				if(this.max >= poker_data[parseInt(a[i])]){

					a.pop();
				}
			}
			console.log(a)

			if(this.onclickflag > a.length - 1){

					this.onclickflag = 0;			 	

				}else{

					this.onclickflag = this.onclickflag;
				}

				$('.play_'+ play +' li').eq(a[a.length - this.onclickflag - 1]).css({opt: "-10px"});

				this.ready_poker.poker.push($('.play_'+ play +' li').eq(a[a.length - this.onclickflag - 1]).attr('data-value'));
								
		}else if(this.type == 2 && aa.length > 0 && this.max < poker_data[aa[0][0]]){
			
			for(var i = 0; i < aa.length; i++){

				if(this.max >= poker_data[parseInt(aa[i][0])]){

					aa.pop();
				}
			}
			if(this.onclickflag >= aa.length - 1){

			 	this.onclickflag = 0;

			}else{

				this.onclickflag = this.onclickflag;
			}

				$('.play_'+ play +' li').eq(parseInt(aa[aa.length - this.onclickflag - 1][0])).css({opt: "-10px"});

				$('.play_'+ play +' li').eq(parseInt(aa[aa.length - this.onclickflag - 1][1])).css({opt: "-10px"});

				this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aa[aa.length - this.onclickflag - 1][0])).attr('data-value'));

				this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aa[aa.length - this.onclickflag - 1][1])).attr('data-value'));

		}else if(this.type == 3 && aaa.length > 0 && aaa.length > 0 && this.max < poker_data[aaa[0][0]]){

			for (var i = 0; i < aaa.length; i++){
				
				if(this.max >= poker_data[aaa[i][0]]){

					aaa.pop();
				}
			}
			if(this.onclickflag > aaa.length - 1){

			 	this.onclickflag = 0;

				if(aaaa.length > 0){

					if(this.onclickflag > aaaa.length - 1){

				 		this.onclickflag = 0;

					}else{

						this.onclickflag = this.onclickflag;
					}

					$('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 1])).css({opt: "-10px"});

					$('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 2])).css({opt: "-10px"});

					$('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 3])).css({opt: "-10px"});

					$('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 4])).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 1])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 2])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 3])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 4])).attr('data-value'));			


				}else if(ZZ.length > 0){

					$('.play_'+ play +' li').eq(parseInt(ZZ[0])).css({opt: "-10px"});

					$('.play_'+ play +' li').eq(parseInt(ZZ[1])).css({opt: "-10px"});

					this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(ZZ[0])).attr('data-value'));

					this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(ZZ[1])).attr('data-value'));
				}			 	
				
			}else{

				this.onclickflag = this.onclickflag;

				$('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][0])).css({opt: "-10px"});

				$('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][1])).css({opt: "-10px"});

				$('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][2])).css({opt: "-10px"});

				this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][0])).attr('data-value'));

				this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][1])).attr('data-value'));

				this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][2])).attr('data-value'));
								
			}

		}else if(this.type == 31 && aaa.length > 0 && aaa.length > 0 && this.max < poker_data[aaa[0][0]] && poker_data.length > 1){

			for (var i = 0; i < aaa.length; i++){
				
				if(this.max > poker_data[parseInt(aaa[i][0])]){

					aaa.pop();
				}
			}
			if(this.onclickflag > aaa.length - 1){

			 	this.onclickflag = 0;

			}
			$('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][0])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][1])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][2])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(a[a.length - this.onclickflag - 1])).css({opt: "-10px"});

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][0])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][1])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][2])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(a[a.length - this.onclickflag - 1])).attr('data-value'));

		}else if(this.type == 32 && aaa.length > 0 && aaa.length > 0 && this.max < poker_data[aaa[0][0]] && aa.length > 1){

			for (var i = 0; i < aaa.length; i++){
				
				if(this.max >= poker_data[aaa[i][0]]){

					aaa.pop();
				}
			}
			if(this.onclickflag > aaa.length - 1){

			 	this.onclickflag = 0;
			 }

			$('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][0])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][1])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][2])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aa[aa.length - this.onclickflag - 1][0])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aa[aa.length - this.onclickflag - 1][1])).css({opt: "-10px"});

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][0])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][1])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaa[aaa.length - this.onclickflag - 1][2])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aa[aa.length - this.onclickflag - 1][0])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aa[aa.length - this.onclickflag - 1][1])).attr('data-value'));

		}else if(this.type == 999 && aaaa.length > 0 && this.max < poker_data[aaaa[0]]){

			for(var i = 0; i < aaaa.length; i++){

				if(this.max >= poker_data[aaaa[i][0]]){

					aaaa.pop();
				}
			}

			if(this.onclickflag > aaaa.length - 1){

			 	this.onclickflag = 0;

			}

			$('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 1])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 2])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 3])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 4])).css({opt: "-10px"});

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 1])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 2])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 3])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 4][3])).attr('data-value'));		
			
		}else if(this.type == 42 && aaaa.length > 0 && this.max < poker_data[aaaa[0]] && poker_data.length > 5){

			for(var i = 0; i < aaaa.length; i++){

				if(this.max >= poker_data[aaaa[i][0]]){

					aaaa.pop();
				}
			}
			if(this.onclickflag > aaaa.length - 1){

			 	this.onclickflag = 0;
			 }

			$('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 1])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 2])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 3])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 4])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(a[a.length - this.onclickflag - 1])).css({opt: "-10px"});

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 1])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 2])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 3])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 4])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(a[a.length - this.onclickflag - 1])).attr('data-value'));		

		}else if(this.type == 422 && aaaa.length > 0 && this.max < poker_data[aaaa[0]] && poker_data.length > 5){

			for(var i = 0; i < aaaa.length; i++){

				if(this.max >= poker_data[aaaa[i][0]]){

					aaaa.pop();
				}
			}
			if(this.onclickflag > aaaa.length - 1){

			 	this.onclickflag = 0;
			}
			$('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 1])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 2])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 3])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 4])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aa[aa.length - this.onclickflag - 1][0])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aa[aa.length - this.onclickflag - 1][1])).css({opt: "-10px"});

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 1])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 2])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 3])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaaa[aaaa.length - this.onclickflag - 4])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aa[aa.length - this.onclickflag - 1][0])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aa[aa.length - this.onclickflag - 1][0])).attr('data-value'));

		}else if(this.type == 33 && aaabbb.length > 0 && this.max < poker_data[aaabbb[0][0]] && a.length > 1){

			for(var i = 0; i < aaabbb.length; i++){

				if(this.max >= poker_data[aaabbb[i][0]]){

					aaabbb.shift();
				}
			}
			if(this.onclickflag > aaabbb.length - 1){

			 	this.onclickflag = 0;
			}
			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1][0])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1][1])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1][2])).css({opt: "-10px"});

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1][0])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1][1])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1][2])).attr('data-value'));

			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][0])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][1])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][2])).css({opt: "-10px"});

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][0])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][1])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][2])).attr('data-value'));

		}else if(this.type == 331 && aaa.length > 0 && a.length > 0 && this.max < poker_data[aaa[0][0]] && poker_data > 7){

			for(var i = 0; i < aaabbb.length; i++){

				if(this.max >= poker_data[aaabbb[i][0]]){

					aaabbb.shift();
				}
			}
			if(this.onclickflag > aaabbb.length - 1){

			 	this.onclickflag = 0;
			}

			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1][0])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1][1])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1 ][2])).css({opt: "-10px"});

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1][0])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1][1])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1][2])).attr('data-value'));

			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][0])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][1])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][2])).css({opt: "-10px"});

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][0])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][1])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][2])).attr('data-value'));

			$('.play_'+ play +' li').eq(a[a.length - 1]).css({opt: "-10px"});

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(a[a.length - 1]).attr('data-value'));

			$('.play_'+ play +' li').eq(a[a.length - 1]).css({opt: "-10px"});

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(a[a.length - 1]).attr('data-value'));

		}else if(this.type == 332 && aaa.length > 0 && a.length > 0 && this.max < poker_data[aaa[0][0]] && poker_data > 9){

			for(var i = 0; i < aaabbb.length; i++){

				if(this.max >= poker_data[aaabbb[i][0]]){

					aaabbb.shift();
				}
			}
			if(this.onclickflag > aaabbb.length - 1){

			 	this.onclickflag = 0;
			}
			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1][0])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1][1])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1 ][2])).css({opt: "-10px"});

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1][0])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1][1])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 1][2])).attr('data-value'));

			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][0])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][1])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][2])).css({opt: "-10px"});

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][0])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][1])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aaabbb[aaabbb.length - this.onclickflag - 2][2])).attr('data-value'));

			$('.play_'+ play +' li').eq(aa[aa.length - this.onclickflag - 1][0]).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(aa[aa.length - this.onclickflag - 1][1]).css({opt: "-10px"});

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(aa[aa.length - this.onclickflag - 1][0]).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(aa[aa.length - this.onclickflag - 1][1]).attr('data-value'));

			$('.play_'+ play +' li').eq(aa[aa.length - this.onclickflag - 2][0]).css({opt: "-10px"});
			
			$('.play_'+ play +' li').eq(aa[aa.length - this.onclickflag - 2][1]).css({opt: "-10px"});

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(aa[aa.length - this.onclickflag - 2][0]).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(aa[aa.length - this.onclickflag - 2][0]).attr('data-value'));

		}else if(this.type == 66 && abcde.length > 0 && abcde.length > 0 && this.max < poker_data[abcde[0][0]] && poker_data > 6){

			for(var i = 0; i < abcde.length; i++){

				if(this.max >= poker_data[abcde[i][0]]){

					abcde.shift();
				}
			}
			if(this.onclickflag > abcde.length - 1){

			 	this.onclickflag = 0;
			}

			$('.play_'+ play +' li').eq(parseInt(abcde[abcde.length - this.onclickflag - 1][0])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(abcde[abcde.length - this.onclickflag - 1][1])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(abcde[abcde.length - this.onclickflag - 1][2])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(abcde[abcde.length - this.onclickflag - 1][3])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(abcde[abcde.length - this.onclickflag - 1][4])).css({opt: "-10px"});

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(abcde[abcde.length - this.onclickflag - 1][0])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(abcde[abcde.length - this.onclickflag - 1][1])).attr('data-value'));	

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(abcde[abcde.length - this.onclickflag - 1][2])).attr('data-value'));	

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(abcde[abcde.length - this.onclickflag - 1][3])).attr('data-value'));	

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(abcde[abcde.length - this.onclickflag - 1][4])).attr('data-value'));		

		}else if(this.type == 88 && aabbcc.length > 0 && aabbcc.length > 0 && this.max < poker_data[aabbcc[0][0]]){

			for(var i = 0; i < aabbcc.length; i++){

				if(this.max >= poker_data[aabbcc[i][0]]){

					aabbcc.shift();
				}
			}
			if(this.onclickflag > aabbcc.length - 1){

			 	this.onclickflag = 0;
			}

			$('.play_'+ play +' li').eq(parseInt(aabbcc[aabbcc.length - this.onclickflag - 1][0])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aabbcc[aabbcc.length - this.onclickflag - 1][1])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aabbcc[aabbcc.length - this.onclickflag - 1][2])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aabbcc[aabbcc.length - this.onclickflag - 1][3])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aabbcc[aabbcc.length - this.onclickflag - 1][4])).css({opt: "-10px"});

			$('.play_'+ play +' li').eq(parseInt(aabbcc[aabbcc.length - this.onclickflag - 1][5])).css({opt: "-10px"});


			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aabbcc[aabbcc.length - this.onclickflag - 1][0])).attr('data-value'));

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aabbcc[aabbcc.length - this.onclickflag - 1][1])).attr('data-value'));	

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aabbcc[aabbcc.length - this.onclickflag - 1][2])).attr('data-value'));	

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aabbcc[aabbcc.length - this.onclickflag - 1][3])).attr('data-value'));	

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aabbcc[aabbcc.length - this.onclickflag - 1][4])).attr('data-value'));	

			this.ready_poker.poker.push($('.play_'+ play +' li').eq(parseInt(aabbcc[aabbcc.length - this.onclickflag - 1][5])).attr('data-value'));
		}
		
		for(var i = 0; i < this.ready_poker.poker.length; i++){	// 清除空值

			if(this.ready_poker.poker[i] == null){

				this.ready_poker.poker.pop();
			}

		}
		console.log("准备出的牌的长度："+this.ready_poker.poker.length+'flag:'+flag)

		}

	}

