$(function(){

	var show2 = document.getElementById('show2');

	var a = document.getElementById('show1');

	var show = document.getElementById('show');

	var b = document.getElementsByClassName('content_nav')[0];

	var c = document.getElementsByClassName('content_img')[0];

	var d = document.getElementsByClassName('evaluation')[0];

	var nav1 = document.getElementsByClassName('nav1')[0];

	var nav2 = document.getElementsByClassName('nav2')[0];

	var nav3 = document.getElementsByClassName('nav3')[0];

	var content_text = document.getElementsByClassName('content_text')[0];

	var sale = document.getElementsByClassName('sale')[0];

	var first_li = document.getElementsByClassName('first_li')[0];

	var evaluation_opt = document.getElementsByClassName('evaluation_opt')[0];

	var jd_bar = document.getElementsByClassName('jd_bar')[0];

	var flag = 0;

	show.onclick = function(){

		if(flag == 0){

			jd_bar.style.display = 'block';

			flag = 1;

		}else{

			jd_bar.style.display = 'none';

			flag = 0;

		}
	}

	a.onclick = function (){

		b.style.display = 'block';

		c.style.display = 'block';

		d.style.display = 'none';

		a.setAttribute('class', 'first_li');

		$('#show2').removeClass('first_li');
	}

	show2.onclick = function (){

		b.style.display = 'none';

		c.style.display = 'none';

		// a.style.display = 'none';

		d.style.display = 'block';

		content_text.style.display = 'none';

		sale.style.display = 'none';

		show2.setAttribute('class', 'first_li');

		$('#show1').removeClass('first_li');

	}

	nav1.onclick = function(){

		// content_text.style.display = 'block';

		c.style.display = 'block';

		sale.style.display = 'none';

		content_text.style.display = 'none';

		nav1.style.color = 'red';
		
		nav2.style.color = '#999';

		nav3.style.color = '#999';
	}
	nav2.onclick = function(){

		content_text.style.display = 'block';

		c.style.display = 'none';

		sale.style.display = 'none';

		nav1.style.color = '#999';

		nav2.style.color = 'red';

		nav3.style.color = '#999';
	}

	nav3.onclick = function(){

		sale.style.display = 'block';

		c.style.display = 'none';

		content_text.style.display = 'none';

		nav1.style.color = '#999';

		nav2.style.color = '#999';

		nav3.style.color = 'red';

	}
	$('.fh').on('click',function(){
		window.history.back()
	})

	// first_li = first_li.concat(" first_li");

	// document.getElementById("id").setAttribute("class",classVal );

	// var li = $('.top_nav ul li');

	// console.log(li);

	// $('.top_nav ul li').eq(1).no('click',function(){

	// 	$(li).eq(1).addCalss('first_li')
	// })

	// $('.top_nav ul li').eq(2).no('click',function(){

	// 	$(li).eq(2).addCalss('first_li')
	// })
})