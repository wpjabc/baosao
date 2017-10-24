$(function(){

	var a = 0;

	var top_home = document.getElementById('top_home');

	top_home.addEventListener('touchstart', show);

	function show(){

		if(a == 0){

			$('.content_home').css('display', 'block');

			a = 1;

		}else{

			$('.content_home').css('display', 'none');
			
			a = 0;
		}
	}


    var input = document.getElementsByClassName('nav')[0];

    var li = $('.nav ul li');

    var licolor = $('.nav ul .li_color');

    console.log(li)

    // var height = parseInt(getComputedStyle(licolor, false)['height']);

    //获取搜素框的高度

    var don = document.body.scrollTop || document.documentElement.scrollTop;

    //获取body到浏览器顶部的距离
    // console.log(don)

  haul();

  function haul(){
    
    var o;  //获取按下位置

    var u;  //获取每次移动的位置

    var tz = document.getElementById('haul_ul');

    var sign;

    tz.addEventListener("touchstart", function(event) { 

        sign = document.getElementById('haul_ul').style.top;  
      
        o = event.changedTouches[0].pageY;  //获取按下位置

        // console.log("o:"+o)
        this.addEventListener("touchmove", function(event) {

            u = event.changedTouches[0].pageY;  //获取每次移动的位置
            // console.log("u:"+u)

            if( parseInt(tz.style.top) > 100){

                   tz.style.top = 100 + 'px'

                }else{

                    tz.style.top = parseInt(sign) + (u - o) + 'px';
                }
         });

        this.addEventListener("touchend", function(event) {

            if((-parseInt(tz.style.top)) < 100){

                tz.style.top = 100 + 'px';

            }else if((-parseInt(tz.style.top)) > 1300){

                tz.style.top = -1300 + 'px';

            }
        })
    });
    
    
}


 
})