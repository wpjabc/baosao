$(function(){

	$('.fh').on('click',function(){
		window.history.back()
	})

	var a = 0;

	var top = document.getElementById('top');

	top.addEventListener('touchstart', show);

	function show(){

		if(a == 0){

			$('.top_bar').css('display', 'block');

			a = 1;

		}else{

			$('.top_bar').css('display', 'none');

			a = 0;
			
		}
	}

})