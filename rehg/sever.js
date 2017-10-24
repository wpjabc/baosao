var http = require('http');
var fs = require('fs');
var url = require("url");
var path = require("path");
// var my = require('./js/register');
// my.getuser();process.cwd()process.chdir()

var sever = http.createServer(function(req, res) {

    var pathname = url.parse(req.url).pathname;

    var extname = path.extname(pathname); //返回path路径文件扩展名

    if (req.url == '/' && req.method == 'GET') {

        server(__dirname + "/index.html", "text/html; charset=utf-8");

    } else {
        fs.stat(__dirname + req.url, function(err, stat) {
            //判断是否出错或者路径并不是文件
            if (err || !stat.isFile()) {
                res.writeHead(404);
                res.end("Not Found");
                return;
            }
            // console.log(pathname);
            // console.log(__dirname);
            // console.log(req.url);
            getFormat(req.url, function(mime) { //函数里的参数，自调函数
                server(__dirname + req.url, mime);

            })

        })
    }

    function server(path, type) {

        res.writeHead(200, { "Content-Type": type });

        fs.createReadStream(path).pipe(res);

    }

    function getFormat(file, callback) {
        //file为客户请求的路径

        // var str = /\.[^\.]+$/.exec(file);   //exec() 方法用于检索字符串中的正则表达式的匹配。

        fs.readFile(__dirname + '/mime.json', 'utf8', function(err, data) {


            var mimeJSON = JSON.parse(data); //JSON.parse(data):解析成json对象

            var mime = mimeJSON[extname] || "text/plain";

            callback(mime); //调用自调函数

        });

    }
});

sever.listen(8888, function() {
    console.log('   服务器已打开，端口号为8888');
})




var sever2 = http.createServer(function(req, res) {

    var pathname = url.parse(req.url).pathname;

    var extname = path.extname(pathname); //返回path路径文件扩展名

    process.chdir('../LOL');

    if (req.url == '/' && req.method == 'GET') {

        server(process.cwd() + "/index.html", "text/html; charset=utf-8");

    } else {
        fs.stat(process.cwd() + req.url, function(err, stat) {
            //判断是否出错或者路径并不是文件
            if (err || !stat.isFile()) {
                res.writeHead(404);
                res.end("Not Found");
                return;
            }
            // console.log(pathname);
            // console.log(__dirname);
            // console.log(req.url);
            getFormat(req.url, function(mime) { //函数里的参数，自调函数
                server(process.cwd() + req.url, mime);

            })

        })
    }

    function server(path, type) {

        res.writeHead(200, { "Content-Type": type });

        fs.createReadStream(path).pipe(res);

    }

    function getFormat(file, callback) {
        //file为客户请求的路径

        // var str = /\.[^\.]+$/.exec(file);   //exec() 方法用于检索字符串中的正则表达式的匹配。

        fs.readFile(__dirname + '/mime.json', 'utf8', function(err, data) {


            var mimeJSON = JSON.parse(data); //JSON.parse(data):解析成json对象

            var mime = mimeJSON[extname] || "text/plain";

            callback(mime); //调用自调函数

        });

    }
});

sever2.listen(8080, function() {
    console.log('   服务器已打开，端口号为8080');
})



var sever3 = http.createServer(function(req, res) {

    var pathname = url.parse(req.url).pathname;

    var extname = path.extname(pathname); //返回path路径文件扩展名

    process.chdir('../jd');

    if (req.url == '/' && req.method == 'GET') {

        server(process.cwd() + "/index.html", "text/html; charset=utf-8");

    } else {
        fs.stat(process.cwd() + req.url, function(err, stat) {
            //判断是否出错或者路径并不是文件
            if (err || !stat.isFile()) {
                res.writeHead(404);
                res.end("Not Found");
                return;
            }
            // console.log(pathname);
            // console.log(__dirname);
            // console.log(req.url);
            getFormat(req.url, function(mime) { //函数里的参数，自调函数
                server(process.cwd() + req.url, mime);

            })

        })
    }

    function server(path, type) {

        res.writeHead(200, { "Content-Type": type });

        fs.createReadStream(path).pipe(res);

    }

    function getFormat(file, callback) {
        //file为客户请求的路径

        // var str = /\.[^\.]+$/.exec(file);   //exec() 方法用于检索字符串中的正则表达式的匹配。

        fs.readFile(__dirname + '/mime.json', 'utf8', function(err, data) {


            var mimeJSON = JSON.parse(data); //JSON.parse(data):解析成json对象

            var mime = mimeJSON[extname] || "text/plain";

            callback(mime); //调用自调函数

        });

    }
});

sever3.listen(3000, function() {
    console.log('   服务器已打开，端口号为3000');
})


var sever4 = http.createServer(function(req, res) {

    var pathname = url.parse(req.url).pathname;

    var extname = path.extname(pathname); //返回path路径文件扩展名

    process.chdir('../boostrap');

    if (req.url == '/' && req.method == 'GET') {

        server(process.cwd() + "/gitify.html", "text/html; charset=utf-8");

    } else {
        fs.stat(process.cwd() + req.url, function(err, stat) {
            //判断是否出错或者路径并不是文件
            if (err || !stat.isFile()) {
                res.writeHead(404);
                res.end("Not Found");
                return;
            }
            // console.log(pathname);
            // console.log(__dirname);
            // console.log(req.url);
            getFormat(req.url, function(mime) { //函数里的参数，自调函数
                server(process.cwd() + req.url, mime);

            })

        })
    }

    function server(path, type) {

        res.writeHead(200, { "Content-Type": type });

        fs.createReadStream(path).pipe(res);

    }

    function getFormat(file, callback) {
        //file为客户请求的路径

        // var str = /\.[^\.]+$/.exec(file);   //exec() 方法用于检索字符串中的正则表达式的匹配。

        fs.readFile(__dirname + '/mime.json', 'utf8', function(err, data) {


            var mimeJSON = JSON.parse(data); //JSON.parse(data):解析成json对象

            var mime = mimeJSON[extname] || "text/plain";

            callback(mime); //调用自调函数

        });

    }
});

sever4.listen(3030, function() {
    console.log('   服务器已打开，端口号为3030');
})


var sever5 = http.createServer(function(req, res) {

    var pathname = url.parse(req.url).pathname;

    var extname = path.extname(pathname); //返回path路径文件扩展名

    process.chdir('../Landlords');

    if (req.url == '/' && req.method == 'GET') {

        server(process.cwd() + "/index1011.html", "text/html; charset=utf-8");

    } else {
        fs.stat(process.cwd() + req.url, function(err, stat) {
            //判断是否出错或者路径并不是文件
            if (err || !stat.isFile()) {
                res.writeHead(404);
                res.end("Not Found");
                return;
            }
            // console.log(pathname);
            // console.log(__dirname);
            // console.log(req.url);
            getFormat(req.url, function(mime) { //函数里的参数，自调函数
                server(process.cwd() + req.url, mime);

            })

        })
    }

    function server(path, type) {

        res.writeHead(200, { "Content-Type": type });

        fs.createReadStream(path).pipe(res);

    }

    function getFormat(file, callback) {
        //file为客户请求的路径

        // var str = /\.[^\.]+$/.exec(file);   //exec() 方法用于检索字符串中的正则表达式的匹配。

        fs.readFile(__dirname + '/mime.json', 'utf8', function(err, data) {


            var mimeJSON = JSON.parse(data); //JSON.parse(data):解析成json对象

            var mime = mimeJSON[extname] || "text/plain";

            callback(mime); //调用自调函数

        });

    }
});

sever5.listen(2323, function() {

    console.log('   服务器已打开，端口号为2323');
})