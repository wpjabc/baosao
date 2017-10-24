$(function(){

    // event.preventDefault();

    $('.fh').on('click',function(){

        window.history.back();
    })
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

    // console.log(li)

    // var height = parseInt(getComputedStyle(licolor, false)['height']);

    //获取搜素框的高度

    var don = document.body.scrollTop || document.documentElement.scrollTop;

    // 获取body到浏览器顶部的距离
    // console.log(don);

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
            
            tz.addEventListener("touchmove", function(event) {

                u = event.changedTouches[0].pageY;  //获取每次移动的位置
                // console.log("u:"+u)

                if( parseInt(tz.style.top) > 0){

                       return false;

                    }else{

                        tz.style.top = parseInt(sign) + (u - o) + 'px';
                    }
             });

            tz.addEventListener("touchend", function(event) {

                if((-parseInt(tz.style.top)) < 0){

                    tz.style.top = 0 + 'px';

                }else if((-parseInt(tz.style.top)) > 1500){

                    tz.style.top = -1526 + 'px';

                }
            })
        });  
    }
})
window.onload = function(){

    var tz = document.getElementById('haul_ul');

    var hit = document.getElementById('hit');

    var list = hit.getElementsByTagName('li');

    for(var i=0;i<list.length;i++){

        list[i].addEventListener("touchstart", function(event) { 

            for(var i = 0; i < list.length; i++){

                list[i].style.color = "#000";

                list[i].style.background = "#fff";

            }

            this.style.color = 'red';
            
            this.style.background = '#fafafa';

            var liTop = this.offsetTop;

            var endLi = list[list.length - 1].offsetTop;

            var endTop = endLi - liTop;

            var topHeight = document.getElementById('top').clientHeight;

            var HTMLheight = parseInt(document.documentElement.clientHeight);

            console.log(endTop,HTMLheight,topHeight)

            if(parseInt(HTMLheight - topHeight * 3) < parseInt(endTop)){

                tz.style.top = -liTop + 'px';
            }
        })
    }
}