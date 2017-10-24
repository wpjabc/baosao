$(function(){

	var a = 0;

	var show = document.getElementById('show');

	show.addEventListener('touchstart',show1);

	function show1(){
		if(a == 0){

			$('.jd_bar').css('display', 'block');

			a = 1;

		}else{

			$('.jd_bar').css('display', 'none');

			a = 0;	
		}
	}
	var b = 0;

	var category = document.getElementsByClassName('category')[0];

	category.addEventListener('touchstart',show2);

	function show2(){

		if(b == 0){

			$('#content li').removeClass("alter");
			
			$('#content li .goodA').removeClass("good");

			$('#content li .img_height').removeClass("img_width");

			b = 1;

		}else{

			$('#content li').addClass("alter");
			
			$('#content li .goodA').addClass("good");

			$('#content li .img_height').addClass("img_width");

			b = 0;
		}
	}

	// var obj = {composite[], sales[], price[], review[]}

	var compositeO = document.getElementById('composite');

	compositeO.addEventListener('touchstart',show3);

	var c = 0;

	function show3(){

		if(c == 0){

			$('.synthesize').css('display', 'block');

			// $('#touchstart').css('color', 'red')

			c = 1;

		}else{

			$('.synthesize').css('display', 'none');

			c = 0;	
		}
	}

	var sort = $('#sort li');

	sort.addEventListener('touchstart',show4)

	function show4(){
 
		for(var i; i < sort.length; i++){

			sort.removeClass("composite")
		}

		$('.sort li').addClass("composite");
	}

})