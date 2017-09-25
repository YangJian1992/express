var router = require('express').Router();
router.get('/', function (req, res, next) {
    //返回登录页面
    res.redirect('/login.html')
})

router.get('/login', function (req, res, next) {
    //返回登录页面
    res.redirect('/login.html')
})
//处理登录逻辑
router.post('/login', function (req, res, next) {
    var userName = req.body.userName
    var password = req.body.password

})

router.get('/register', function (req, res, next) {
    //返回注册页面
    res.redirect('/register.html')
})


router.post('/register', function (req, res, next) {
    //post方法提交注册表单的信息
    var userName = req.body.userName
    var password = req.body.password
    var passwordConfirm = req.body.passwordConfirm
    var email = req.body.email
    // if(用户名不空){
    //     if(两次密码不相同){
    //         if(用户名不存在)
    //     }
    // }

})

module.exports= router;
