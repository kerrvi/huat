/**
 *
 * Created by ASUS on 2018/5/7.
 */
// service
(function(){

})();

$(document).ready(function(){
    $('#login').click(function(){
        var loginCode = $('#loginCode').val();
        var pwd = $('#pwd').val();
        if(loginCode==''||pwd==''){
            alert('用户名或密码不能为空');
            return;
        }
        var user = {
            loginCode: loginCode,
            loginPwd: pwd
        };

        $.ajax({
            url:'http://www.wskj020.com:9179//App/UserLogin.ashx',
            data:user,
            success:function(result){
                var info = JSON.parse(result);
                console.log('ajax...........');
                console.log(info);

                if(info.success == true){
                    window.localStorage.setItem('user',JSON.stringify(info.user));
                    window.location.href='home.html';
                }else {
                    alert(JSON.stringify(info.message))
                }
            },
            error:function(error){
                alert(JSON.stringify(error));
            }
        });

        //$.get("http://www.wskj020.com:9179//App/UserLogin.ashx",
        //    user,
        //    function(data){
        //        var info = JSON.parse(data);
        //        console.log('get...........');
        //        console.log(data);
        //        console.log(info);
        //
        //        if(info.success == true){
        //            window.localStorage.setItem('user',JSON.stringify(info.user));
        //            //window.location.href='index.html';
        //        }else {
        //            alert(JSON.stringify(info.message))
        //        }
        //    });

        //$.post("http://www.wskj020.com:9179//App/UserLogin.ashx",
        //    user,
        //    function(data){
        //        var info = JSON.parse(data);
        //        console.log('post...........');
        //        console.log(data);
        //        console.log(info);
        //
        //        if(info.success == true){
        //            window.localStorage.setItem('user',JSON.stringify(info.user));
        //            //window.location.href='index.html';
        //        }else {
        //            alert(JSON.stringify(info.message))
        //        }
        //    });

    });
});
