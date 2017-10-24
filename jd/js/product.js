$(function(){
	
	$('.fh').on('click',function(){

		window.history.back();

	})
	var loc = location.href;
    var n1 = loc.length;//地址的总长度
    var n2 = loc.indexOf("=");//取得=号的位置
    var id = decodeURI(loc.substr(n2+1, n1-n2));//从=号后面的内容
	var show = document.getElementById('show');

	show.addEventListener('touchstart', show1);

	var a = 0;

	function show1(){

		if(a == 0){

			$('.jd_bar').css('display','block');

			a = 1;
		}else{

			$('.jd_bar').css('display','none');

			a = 0;
		}
		
	}

	$.ajax(
		{
			type:"GET",

			url:"../json/product.json",

			async:false,

			success:function(data){
				// console.log(data)

				for(let i = 0; i < data.iPhone[id].img.length; i++){

					$('.banner_imgs').append('<li><img src="'+data.iPhone[id].img[i]+'" alt=""></li>')
				}
				$('#h1').html('<span>自营</span>'+data.iPhone[id].h1);
				$('#money').html(data.iPhone[id].money);
			},
			err:function(data){

		    	console.log(1)
		    }
		}
	)

    slide();
    rem();
    // haul();


	//轮播图
	function slide() {
	     // var bannerImgs = document.querySelector(".banner_imgs");		
	     //跟document.getElementsByClassName('')[]一样的用法
	     //加All就是获得所有的同样类名的元素
	     // var flag = 1;
	    var rahmen = document.getElementsByClassName('rahmen')[0];

	    var bannerImgs = document.getElementsByClassName('banner_imgs')[0];

	    //屏幕宽度
	    var screenWidth = -(document.body.offsetWidth);

	    var index = 1; 

	    var e;  //手指按下时的位置

	    var b;  //手指离开时的位置

	    var a;  //手指移动的距离

	    var w;  //轮播图移动的位置

	    //添加touch事件 
	    
	    //手指按下事件
	    bannerImgs.addEventListener("touchstart", function(event) {  

	        e = event.changedTouches[0].pageX;

	        w = parseInt(bannerImgs.style.left);

	        // clearInterval(int);
	    })

	    //手指移动事件
	    bannerImgs.addEventListener("touchmove", function(event) {
	        
	    })

	    //手指离开事件
	    bannerImgs.addEventListener("touchend", function(event) {

	       b = event.changedTouches[0].pageX;
	       
	       a = e - b;
	       
	       if(w==0 & e!=b){

	            if(a<0){
	                document.getElementsByClassName('banner_imgs')[0].style.left = 5*screenWidth +'px';

	                animation(-screenWidth);
	            }else{
	                animation(screenWidth);
	            }

	       }else if(w<4*screenWidth){

	            document.getElementsByClassName('banner_imgs')[0].style.left = 0 +'px';

	            animation(screenWidth);
	            
	       }else if( a > -(screenWidth*0.4) && e > b){

	            animation(screenWidth);

	        }else if(a < -(screenWidth*0.4) && e < b){

	            animation(-screenWidth);

	        }
	        //手指离开后继续执行定时器
	    //     int = setInterval(function (){

	    //     console.log(parseFloat(bannerImgs.style.left))

	    //     if( parseFloat(bannerImgs.style.left) < 4*screenWidth){

	    //         document.getElementsByClassName('banner_imgs')[0].style.left = 0 +'px';

	    //         animation(screenWidth);
	    //     }else{
	    //         animation(screenWidth);
	    //     }
	        
	    // },2000);     

	    })

	//定时器，重复执行动画
	// var int = setInterval(function (){

	//     console.log(parseFloat(bannerImgs.style.left))

	//     if( parseFloat(bannerImgs.style.left) < 4*screenWidth){

	//         document.getElementsByClassName('banner_imgs')[0].style.left = 0 +'px';

	//         animation(screenWidth);
	//     }else{
	//         animation(screenWidth);
	//     }
	    
	// },2000);   

	    function animation(screenWidth){

	        var newLeft = parseInt(bannerImgs.style.left) + screenWidth;
	        // 移动的终点值
	        
	        var time = 500;                         // 位移总时长；

	        var interval = 10;                      // 位移间隔时间

	        var speed = screenWidth/(time/interval);     // 每次位移的距离；

	        //time/interval 得到每次位移一小段的时间，再被screenWidth除，得到每次位移一小段的距离
	        // console.log(newLeft);
	        
	        go();
	        function go(){

	            var left = parseInt(bannerImgs.style.left);
	            
	            tempLeft = left + speed;
	            //每次要位移到的位置

	            if( speed < 0 && tempLeft > newLeft || speed > 0 && tempLeft < newLeft){
	            	
	                        bannerImgs.style.left = tempLeft+'px';

	                        setTimeout(function(){go()}, interval);
	            }else{
	                 bannerImgs.style.left = newLeft+'px';
	                        // showDot();
	                        // animat = false;     // 动画结束把动画的状态改为false;
	            }
	        }
	    }
	}

})