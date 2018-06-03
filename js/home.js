/**
 * Created by ASUS on 2018/5/18.
 */
$(function(){
    var user = JSON.parse(window.localStorage.getItem('user'));
    !user ? window.location.href = './' : null ;


    // 显示界面
    (function () {
        console.log(user.type);
        if(user.type!=10 && user.type!=11){
            $('.isPatient').hide();
        }else {
            $('.isPatient').show();
        }
    })();

    $('#btn-pwd').on('click',function(){
        var orgPwd = $('#message-orgPwd').val();
        var newPwd = $('#message-pwd').val();
        if(orgPwd && newPwd){
            user.orgLoginPwd = orgPwd;
            user.newLoginPwd = newPwd;
            $.ajax({
                url:'http://www.wskj020.com:9179//App/UserEdit.ashx',
                data:user,
                success:function(result){
                    var info = JSON.parse(result);
                    console.log('ajax...........');
                    console.log(info);

                    if (info.success == true) {
                        alert('修改成功');
                        window.localStorage['user'] = JSON.stringify(info.user);
                        user = info.user;
                        $('.password').modal('hide');
                    } else {
                        alert(JSON.stringify(info.message))
                    }
                },
                error:function(error){
                    alert(JSON.stringify(error));
                }
            });
        }else {
            alert('输入不能为空');
        }
    });
    $('#btn-loginCode').on('click',function(){
        var newLoginCode = $('#message-loginCode').val();

        if(newLoginCode){
            user.loginCode = newLoginCode;
            $.ajax({
                url:'http://www.wskj020.com:9179//App/UserEdit.ashx',
                data:user,
                success:function(result){
                    var info = JSON.parse(result);
                    console.log('ajax...........');
                    console.log(info);

                    if (info.success == true) {
                        alert('修改成功');
                        window.localStorage['user'] = JSON.stringify(info.user);
                        user = info.user;
                        $('.loginCode').modal('hide');
                    } else {
                        alert(JSON.stringify(info.message))
                    }
                },
                error:function(error){
                    alert(JSON.stringify(error));
                }
            });
        }else {
            alert('输入不能为空');
        }
    });


});