/* 
    加载模块
*/
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
const { URL } = require('url');
/* 
    创建服务器
*/

var flag = 1;

var server = http.createServer(function(req, res) {

    //判断用户访问的地址
    if (req.url == '/' && req.method == 'GET') {

        server(__dirname + "/list.html", "text/html; charset=utf-8");

    } else if(req.url.indexOf('?') != -1){

        server(__dirname + "/product.html","text/html; charset=utf-8");
        
    }else if (req.url.indexOf('url') != -1) {

        console.log(1)
        server(__dirname + "/url.html", "text/html; charset=utf-8");

    } else {
        fs.stat(__dirname + req.url, function(err, stat) {

            if (err || !stat.isFile()) {

                res.writeHead(404);

                res.end("<b style='font-size:30px'>Not Found</b>");

                return;

            } else {

                getFormat(req.url, function(format) {

                    server(__dirname + req.url, format);

                })
            }

        })

    }

    function server(path, type) {

        res.writeHead(200, { "Content-Type": type });

        fs.createReadStream(path).pipe(res);

    }

    function getFormat(file, callback) {

        var str = /\.[^\.]+$/.exec(file)[0];

        fs.readFile(__dirname + '/mime.json', 'utf8', function(err, data) {

            var obj = eval('(' + data + ')');

            var format = obj[str];

            callback(format);

        });

    }
})



/* 
    监听服务器
*/
server.listen(3000, function() {

    console.log('   WEB服务已开启,端口号为3000')

})