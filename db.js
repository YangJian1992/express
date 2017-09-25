
var mongoose = require('./yangDemo/node_modules/mongoose');
//连接数据库
mongoose.connect("mongodb://localhost/yang",{
    useMongoClient: true,
    /* other options */
});
//获得连接对象，进行监听
var connection = mongoose.connection;
connection.on('error', function (err) {
    console.error(err);
});
connection.on('open', function () {
    console.log('opened');
});
//schema
var UserSchema = new mongoose.Schema({
    userName: String,
    password: String
});
//model
var UserModel = mongoose.model('yj', UserSchema);
//注意此外的集合名称是'yj'，但数据库中对应的集合名称是'yjs'。
//如果数据库中对应的集合yj，而不是集合yjs，则无法找到数据。所以一定要注意集合的名称。尽量不要通过命令行手动添加集合。

var yj = {
    userName: 'yj',
    password: '123'
}

UserModel.create(yj, function (err, data ) {
    if(err){
        console.error(err);
    }else {
        console.log(data);
    }
})
//封装函数
//要在回调函数中传入一个函数callback，这样根据callback就能判断异步的回调函数是否已经执行。
function getUser(userName, callback) {
    //找个一个符合条件的元素
    UserModel.findOne({userName: userName}, function (err, doc) {
        if(err){
            console.error(err);//错误也要返回
            callback(err);
        }else {
            console.log(doc);
            callback(null, doc);//需要把null传给callback中的，这样不用返回error
        }
    });
}
//暴露
exports.getUser = getUser;