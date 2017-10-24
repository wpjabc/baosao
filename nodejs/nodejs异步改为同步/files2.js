var fs = require('fs');	
fs.readdir(__dirname, function(err, files){
	var wenjianjia = [];		
	(function fileFun(i){
		if(i == files.length){
			console.log(wenjianjia);
			return;
		}
		fs.stat(__dirname+'\\'+files[i], function(err, stat){
			// 判断是否为文件夹
			if(stat.isDirectory()){
				wenjianjia.push(files[i]);
			}
			fileFun(i+1);

		});
	})(0)
});
