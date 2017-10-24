//加载文件操作模块
//fs是node内置的文件操作模块，不需要下载
var fs = require('fs');
//加载颜色模块
var colors = require('colors');


/* 
    readdir()是fs读取文件夹信息的方法
    它第二个参数为回调函数,其中第一个参数是错误信息，
    第二个参数就是文件夹中的文件信息

    __dirname是node内置的超级变量,值为当前文件的文件夹路径
*/
fs.readdir(__dirname,function(err,files){

    //判断路径的文件夹中是否有文件或文件夹
    if(files.length == 0){

        console.log('   目标文件夹中没有文件' .red);

        return false;

    }

    console.log('   请选择需要查看的文件或文件夹');

    var stats = [];     //用于保存stat对象

    for(var i=0; i<files.length; i++){

        file(i)
        
    }

    function file(i){

        var filename = files[i];

        read(fs.statSync(__dirname+'\\'+filename));

        function read(stat){

            //获取文件或者文件夹的元信息
            stats[i] = stat;

            //判断是否为文件夹
            if(stat.isDirectory()){

                console.log('   '+i+filename .red);

            }else{

                console.log('   '+i+filename .green);

            }

        }

        //参数为文件或者文件夹的路径path
      

    }

})
