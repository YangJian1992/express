
var http = require('http');
var url = require('url');
var fs = require('fs');
var db = require('./db.js'); //引入数据库模块



//创建服务器
http.createServer(function (req, res) {
    //获得url
    var urlStr = req.url;
    console.log(urlStr);

    //获得 文件路径
    var urlObj = url.parse(urlStr, true); //解析出 url obj
    var pathName = urlObj.pathname; //文件路径
    // 路由   每一个文件路径对应一个资源

    var filePath = './login.html'; //磁盘文件路径

    //路由
    switch (pathName){
        case '/':   //返回 form表单页面
            fs.readFile(filePath, function (err, data) {
                if(err){
                    console.error(err);
                    res.end('error');
                }else {
                    res.end(data); // 发送给浏览器
                }
            });
            break;
        case '/login': //处理登录逻辑
            /*
             复杂问题分解为小问题，分别解决
                1.获得输入的信息
                2.处理信息
                3.返回信息
            */
            // 1.获得输入的信息
            var userName = urlObj.query.userName;
            var password = urlObj.query.password;

            // 2.处理信息
            //查找
            db.getUser(userName, callback);
            function callback(err, doc) {
                //须要考虑error的情况，否则一旦出错，前台没有收到响应。
                if(err){
                    res.end('error');
                }else{
                    console.log('数据：', doc);
                    //用户名是否存在
                    if(null !== doc ){
                        //密码是否正确
                        if(doc.password === password){
                            res.setHeader('content-type', 'text/html;charset=utf8');
                            res.end('恭喜 '+userName+' 登录成功');
                        }else{
                            res.setHeader('content-type', 'text/html;charset=utf8');
                            res.end('密码不正确'+userName+','+password);
                        }
                    }else {
                        res.setHeader('content-type', 'text/html;charset=utf8');
                        res.end('用户名密码不正确'+userName+','+password);
                    }
                }
            }

/*
            //伪代码   降低思考的难度
            if(数据库中有数据){
                if(密码正确){
                    返回：登录成功过
                }else{
                    返回：密码不正确
                }
            }else {
                返回：用户名密码不正确
            }
*/





            break;
        default:
            res.end('sorry, 404 not found');
    }
})
.listen(3000, function () {
    console.log('server setup');
});






function logic(password, doc, res) {
    //用户名是否存在
    if(null !== doc ){
        //密码是否正确
        if(doc.password === password){
            res.setHeader('content-type', 'text/html;charset=utf8');
            res.end('登录成功');
        }else{
            res.setHeader('content-type', 'text/html;charset=utf8');
            res.end('密码不正确');
        }
    }else {
        res.setHeader('content-type', 'text/html;charset=utf8');
        res.end('用户名密码不正确');
    }
}




