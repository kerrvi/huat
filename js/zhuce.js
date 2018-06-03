/**
 * Created by ASUS on 2018/5/19.
 */
$(document).ready(function () {
    var isRead = false;
    var params = {
        referraCode: '',
        userName: '',
        loginCode: '',
        loginPwd: ''
    };


    // 注册
    $('#btn-send').on('click', function () {


        params.userName = $('#userName').val();
        params.loginCode = $('#loginCode').val();
        params.loginPwd = $('#loginPwd').val();
        params.referraCode = $('#referraCode').val();
        isRead = $('#reader2').prop('checked');
        if (!isRead) {
            alert('请先阅读注册协议！');
            return;
        }
        if (!params.loginCode || !params.loginPwd) {
            alert('用户名或密码不能为空');
            return;
        }
        console.log(params);
        $.ajax({
            url: 'http://www.wskj020.com:9179//App/UserRegister.ashx',
            data: params,
            success: function (result) {
                var info = JSON.parse(result);
                console.log('ajax...........');
                console.log(info);
                if (info.success == true) {
                    $('#big-show').show();
                    window.localStorage.setItem('user', JSON.stringify(info.user));
                    setTimeout(function(){
                        $('#title').text('注册成功！正在为您跳转..');
                        setTimeout(function(){
                            $('#title').text('注册成功！正在为您跳转...');
                            setTimeout(function(){
                                window.location.href='home.html';
                            },1200)

                        },1200);
                    },1200);

                } else {
                    alert(info.message);
                }
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    });

});