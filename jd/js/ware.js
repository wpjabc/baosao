$(function() {
    var wangzhujie = {

        type: "GET", //相当于method的类型

        url: "data.json", //req请求的地址

        //请求成功后回调的函数

        //注意success函数的type跟AJAX对象里面的data是不同的东西 AJAX里面的data属性指的是 你需要传输的数据

        //success函数里面的参数data指的是responseText(调用成功后 后端返回的数据 访问JSON文件的话 直接返回里面的内容 不需要后端语言)
        success: function(data) {

            iPhone(data);

            // console.log(data.iPhone[1].name);
            // Json.parse(data)
            // eval()
        },
        // 请求错误后的回调函数
        err: function(data) {

            console.log(1)
        }
    }

    $.ajax(wangzhujie);

    var a = 0;

    var show = document.getElementById('show');

    show.addEventListener('touchstart', show1);

    function show1() {
        if (a == 0) {

            $('.jd_bar').css('display', 'block');

            a = 1;

        } else {

            $('.jd_bar').css('display', 'none');

            a = 0;
        }
    }
    var b = 0;

    var category = document.getElementsByClassName('category')[0];

    category.addEventListener('touchstart', show2);

    function show2() {

        if (b == 0) {

            $('#content li').removeClass("alter");

            $('#content li .goodA').removeClass("good");

            $('#content li .img_height').removeClass("img_width");

            b = 1;

        } else {

            $('#content li').addClass("alter");

            $('#content li .goodA').addClass("good");

            $('#content li .img_height').addClass("img_width");

            b = 0;
        }
    }

    // var obj = {composite[], sales[], price[], review[]}

    var compositeO = document.getElementById('composite');

    compositeO.addEventListener('touchstart', show3);

    var c = 0;

    function show3() {

        if (c == 0) {

            $('.synthesize').css('display', 'block');

            // $('#touchstart').css('color', 'red')

            c = 1;

        } else {

            $('.synthesize').css('display', 'none');

            c = 0;
        }
    }

    var sort = $('.sort li');

    // sort.addEventListener('touchstart',show4)

    function show4() {

        for (var i; i < sort.length; i++) {

            sort.removeClass("composite")
        }

        $('.sort li').addClass("composite");
    }

    var flag = 0;

    function iPhone(data) {

        for (let i = 0; i < data.iPhone.length; i++) {

            $('#content').append('<li data="'+i+'" class="alter row"><img class="img_width img_height" src="' + data.iPhone[i].img + '" alt=""><div class="good goodA"><p>' + data.iPhone[i].name + '</p><div class="describe"></div><span class = "jg">￥<i>' + data.iPhone[i].money + '</i>.00</span><div class="comment"><span>0评论</span><span>好评100%</span></div></div></li>')
        }

        var is = $('.jg i');

        $('#price').on('touchstart', function() {

            if (flag == 0) {

                data.iPhone.sort(function(x, y) {

                    return x.money - y.money;
                })

                for (let i = 0; i < data.iPhone.length; i++) {

                    is.eq(i).html(data.iPhone[i].money);

                }

                flag = 1;

            } else if (flag == 1) {

                data.iPhone.sort(function(x, y) {

                    return y.money - x.money;
                })

                for (let i = 0; i < data.iPhone.length; i++) {

                    is.eq(i).html(data.iPhone[i].money);

                }

                flag = 0;
            }
        })
    }

    $('body').on('click','#content li',function(){

        // console.log(this.getAttribute('data'));

        var data =  this.getAttribute('data');

        location.href="product.html?"+"id="+encodeURI(data);
            //encodeURI():对指定的字符串进行URL编码
    })

    $('.fh').on('click', function() {

        window.history.back()
    })

  
})