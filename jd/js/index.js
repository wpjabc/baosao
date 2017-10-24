
window.onload = function() {
    slide();
    rem();
    haul();
    // showSpot();
     $('.fh').on('click',function(){
        
        window.history.back()
    })
}

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

        if(int == 1){

        }else{

            clearInterval(int);
        }

    //手指移动事件
    this.addEventListener("touchmove", function(event) {
        
            clearInterval(int);

            x = event.changedTouches[0].pageX;  //手指移动的位置

            over = w + (x - e);
            //图片跟随手指移动的距离

            bannerImgs.style.left = over + 'px';
           
        })
    })


    //手指离开事件
    bannerImgs.addEventListener("touchend", function(event) {

       b = event.changedTouches[0].pageX;
       
       a = e - b;

       if(a < 0){

            if(w == 0 & e != b){

                if(a > (screenWidth * 0.4)){
                	
                    document.getElementsByClassName('banner_imgs')[0].style.left = 5*screenWidth +'px';

                    animation(a,200);

                }else if(a < (screenWidth*0.4)){

                    document.getElementsByClassName('banner_imgs')[0].style.left = 5*screenWidth +'px';
                    
                    animation(-screenWidth,500);
                }

            }else{

                if( a > (screenWidth*0.4)){
                //移动距离不大于40%的距离
                    
                    animation(a,200);

                }else if(a < (screenWidth*0.4)){
                //移动距离大于40%的距离
                
                    animation(-screenWidth + a,200);
                    // document.getElementsByClassName('banner_imgs')[0].style.left = w +'px';
                }
            }
       }else if( a > 0){

            if(w < 4*screenWidth){
            //如果图片位置为最后一张
            
                document.getElementsByClassName('banner_imgs')[0].style.left = 0 +'px';
               
                animation(screenWidth);
            
            }else{
                
                if(a < (-(screenWidth*0.4))){
                //移动距离不大于40%的距离
                   
                    animation(a,200);
              
                }else if(a > (-(screenWidth*0.4))){
                //移动距离大于40%的距离
                
                    animation(screenWidth+a,200);
                    // document.getElementsByClassName('banner_imgs')[0].style.left = w +'px';
                }
            }

        }

        //手指离开后继续执行定时器
        int = setInterval(function (){

        // console.log(parseFloat(bannerImgs.style.left))

        if( parseFloat(bannerImgs.style.left) < 4 * screenWidth){

            document.getElementsByClassName('banner_imgs')[0].style.left = 0 +'px';

            animation(screenWidth,1000);

        }else{

            animation(screenWidth,1000);
        }
        
    },2000);     

    })

    //定时器，重复执行动画
    var int = setInterval(function (){

        // console.log(parseFloat(bannerImgs.style.left))

        if( parseFloat(bannerImgs.style.left) < 4*screenWidth){

            document.getElementsByClassName('banner_imgs')[0].style.left = 0 +'px';

            animation(screenWidth,1000);

        }else{
        	
            animation(screenWidth,1000);
        }
        
    },3000);   

    function animation(screenWidth,time){

        var newLeft = parseInt(bannerImgs.style.left) + screenWidth;
        // 移动的终点值
        
        // var time = 500;                         // 位移总时长；

        var interval = 10;                      // 位移间隔时间

        var speed = screenWidth/(time/interval);     // 每次位移的距离；

        //time/interval 得到每次位移一小段的时间，再被screenWidth除，得到每次位移一小段的距离
        console.log(a)
        console.log(newLeft);
        
        go();
        function go(){

            var left = parseInt(bannerImgs.style.left);
            
            tempLeft = left + speed;
            //每次要位移到的位置

            if( speed < 0 && tempLeft > newLeft || speed > 0 && tempLeft < newLeft){
            	
                        bannerImgs.style.left = tempLeft+'px';

                        setTimeout(function(){go()}, interval);
            }else{

                 bannerImgs.style.left = newLeft + 'px';

                // showDot();
                // animat = false;     // 动画结束把动画的状态改为false;
            }
        }
    }
}

function showSpot(){

        for(var i=0;i < spot.length; i++){

            spot[i].className = '';

        }

        spot[index - 1].className = 'current';

}

//拖拽事件

function haul(){
    
    var o;  //获取按下位置

    var u;  //获取每次移动的位置

    var tz = document.getElementById('haul_ul');

    var sign;

    tz.addEventListener("touchstart", function(event) { 

        sign = document.getElementById('haul_ul').style.left;  
      
        o = event.changedTouches[0].pageX;  //获取按下位置

        // console.log("o:"+o)
        this.addEventListener("touchmove", function(event) {

            u = event.changedTouches[0].pageX;  //获取每次移动的位置
            // console.log("u:"+u)

            if( parseInt(tz.style.left) > 0){

                   return false;

                }else{

                    tz.style.left = parseInt(sign) + (u - o) + 'px';
                    //-(o - u)
                }
         });

        this.addEventListener("touchend", function(event) {

            if((-parseInt(tz.style.left)) < 0){

                tz.style.left = 0 + 'px';
                
            }else if((-parseInt(tz.style.left)) > 1600){

                tz.style.left = -1600 + 'px';

            }
        })
    });
    
    
}


//滚动监听事件
window.onscroll = function(){

    var input = document.getElementsByClassName('login')[0];

    var height = parseInt(getComputedStyle(input,false)['height']);
    //获取搜素框的高度

    var don = document.body.scrollTop || document.documentElement.scrollTop;

    //获取body到浏览器顶部的距离
    // console.log(don)

    if(don > 2 * height){

        document.getElementsByClassName('login')[0].style.background = 'rgba(208, 0, 0, 0.72)';

        document.getElementsByClassName('login')[0].style.opacity = '0.9';

    }else{

        document.getElementsByClassName('login')[0].style.background = '';

        document.getElementsByClassName('login')[0].style.opacity = '';
    }
   
}


