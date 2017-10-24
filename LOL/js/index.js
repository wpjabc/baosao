window.onload = function(){

    var container = document.getElementById('container');
        
    var next = document.getElementById('next');

    var pre = document.getElementById('pre');

    var list = document.getElementById('list');

    var dot = document.getElementById('dot');

    var img = list.getElementsByTagName('img');

    var open = document.getElementById('open');

    var VideoContent = document.getElementById('VideoContent');

    var popclose = document.getElementsByClassName('popclose')[0];

    var arr = [1,2,3,4,5,1];

    var index = 1;

    var onNum = 0;

    var new_index;

    var stop= 0;
    
    open.onclick = function(){
        
        VideoContent.style.display = 'block';
    }

    popclose.onclick = function(){

        VideoContent.style.display = 'none';
    }

    showDot();

    function repic(){

        for(var i=0;i<img.length;i++){
            
            img[i].src = './images/' + arr[i]+'.jpg';
        }  
    }
    repic();

    next.onclick = function (){

       toNext();
    }

    function toNext(){

         if(stop == 1){

            return;
        }
        index = ++index > 5 ? 1 : index;

        if(parseInt(list.style.left) == -4000){

            list.style.left = 0+'px';
        }
        
        animation(-800);
    }

    pre.onclick = function (){

        toPre()
    }

    function toPre(){

        if(stop == 1){

            return;
        }
        index = --index < 1 ? 5 : index;

        if(parseInt(list.style.left) == 0){

            list.style.left = -4000+'px';

        }           

        animation(800);
    }


    for(var i=0; i<dot.length; i++){

        dot[i].onclick = function (){

            onNum = 1;

            new_index = this.getAttribute('index');


            var math = new_index - index;

            if(math > 0){

                img[index].src = './images/' + arr[new_index-1]+'.jpg';

                math = -800;

            }else if(math < 0){

                img[index-2].src = './images/' + arr[new_index-1]+'.jpg';

                math = 800;
                
            }

            index = new_index;

            animation(math);
        }
    }

    var int = setInterval(next.onclick,3000);

    container.onmouseover = function (){

        clearInterval(int);
    }
    container.onmouseout = function(){

        int = setInterval(function(){toNext()},3000)
    }


    function animation(offset){

        stop = 1;

        var time = 500    //位移总时长；
        
        var newLeft = parseInt(list.style.left) + offset;   //移动的终点值

        var interval = 10;  //位移间隔时间

        var speed = offset/(time/interval);  //每次位移的距离；

        go();

        function go(){

            var left = parseInt(list.style.left);


            tempLeft = left + speed;

            if(tempLeft>newLeft && speed<0 || tempLeft<newLeft && speed>0){

                list.style.left = tempLeft + 'px';

                setTimeout(function(){go()},interval);

            }else{
                
                list.style.left = newLeft + 'px';

                showDot();

                stop = 0;

                if(onNum == 1){

                    repic();

                    list.style.left = -800*Number(index-1)+'px';
                }
            }
        }
    }

    function showDot(){

        for(var i=0; i<dot.length; i++){

            dot[i].className = '';
        }
        dot[index - 1].className = 'a1';

    }
    // alert(dot[1])
}