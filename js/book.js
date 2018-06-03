/**
 * Created by ASUS on 2018/5/8.
 */

$(document).ready(function(){
    var headerPath = 'http://www.wskj020.com:9179/UploadFile/Header/';
    var doctors = [];
    var nowTime = new Date().getTime() ;
    var selectTime;
    var weekNum = 0;
    var bookEdit = {
        id:guid(),
        userId:'',
        state:0,
        shopId:'',
        doctorId:'',
        bookDate:'',
        bookTime:'',
        remark:''
    };
    var currentUser = JSON.parse(window.localStorage.getItem('user')) ;
    !currentUser ? window.location.href = './' : null ;
    bookEdit.shopId = currentUser.shopId;
    bookEdit.userId = currentUser.id;

    /*提交*/
    $('#btn-submit').on('click',function(){
        if(!bookEdit.bookTime || !bookEdit.bookDate){
            alert('请选择预约时间');
            return;
        }
        if(selectTime - nowTime < 1000*60*60*3 ){
            alert('预约时间不能早于少于3小时');
            return;
        }

        bookEdit.remark =  $('#message-text').val();
        console.log(bookEdit);

        $.ajax({
            url: 'http://www.wskj020.com:9179//App/BookEdit.ashx',
            data: bookEdit,
            success: function (result) {
                var info = JSON.parse(result);
                console.log('ajax...........');
                // console.log(info);

                if (info.success == true) {
                    alert('预约成功！');
                    getBookUsed(bookEdit.doctorId);
                } else {
                    alert(JSON.stringify(info.message))
                }
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    });


    /*預約信息*/
    $('#used-wrap').on('click','.head',function(){
        $('#used-wrap .head').css('backgroundColor','');
        // console.log(this);
        this.style.backgroundColor = 'red';
        bookEdit.bookDate = $(this).attr('data-date');
        bookEdit.bookTime = $(this).attr('data-begTime');
        selectTime = Date.parse(bookEdit.bookDate +' '+ bookEdit.bookTime);
        if(selectTime - nowTime < 1000*60*60*3 ){
            alert('预约时间不能少于3小时');
        }
    });

    function getBookUsed(doctorId){
        var bookUsed;
        dateInit(weekNum);

        $.ajax({
            url: 'http://www.wskj020.com:9179//App/BookUsed.ashx',
            data: {
                doctorId:doctorId,
                begDay:beginDate1
            },
            success: function (result) {
                var info = JSON.parse(result);
                console.log('ajax...........');
                console.log(info);

                if (info.success == true) {
                    bookUsed = info.list;
                    showBookUsed(bookUsed);
                } else {
                    alert(JSON.stringify(info.message))
                }
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    }
    function showBookUsed(bookUsed){
    //
    //        9:00
    //
        var item = '';
        var item2 = '';
        for(var i = 0;i < bookUsed.length;i++){
            item += '<div class="head" >'+bookUsed[i].begTime+'</div>';

            var numDay1 = bookUsed[i].day1-bookUsed[i].day1Used;
            item2 += '<div class="head " data-begTime="'+bookUsed[i].begTime+'" data-date="'+beginDate1+'">'+ numDay1+'人</div>';
            var numDay2 = bookUsed[i].day2-bookUsed[i].day2Used;
            item2 += '<div class="head"  data-begTime="'+bookUsed[i].begTime+'" data-date="'+beginDate2+'">'+ numDay2+'人</div>';
            var numDay3 = bookUsed[i].day3-bookUsed[i].day3Used;
            item2 += '<div class="head"  data-begTime="'+bookUsed[i].begTime+'" data-date="'+beginDate3+'">'+ numDay3+'人</div>';
            var numDay4 = bookUsed[i].day4-bookUsed[i].day4Used;
            item2 += '<div class="head"  data-begTime="'+bookUsed[i].begTime+'" data-date="'+beginDate4+'">'+ numDay4+'人</div>';
            var numDay5 = bookUsed[i].day5-bookUsed[i].day5Used;
            item2 += '<div class="head"  data-begTime="'+bookUsed[i].begTime+'" data-date="'+beginDate5+'">'+ numDay5+'人</div>';
            var numDay6 = bookUsed[i].day6-bookUsed[i].day6Used;
            item2 += '<div class="head"  data-begTime="'+bookUsed[i].begTime+'" data-date="'+beginDate6+'">'+ numDay6+'人</div>';
            var numDay7 = bookUsed[i].day7-bookUsed[i].day7Used;
            item2 += '<div class="head"  data-begTime="'+bookUsed[i].begTime+'" data-date="'+beginDate7+'">'+ numDay7+'人</div>';
            //for(var key in bookUsed[i]){
            //
            //    if(key.substring(4) == 'Used'){
            //        var num = bookUsed[i].day1-bookUsed[i][key];
            //        console.log(num);
            //        item2 += '<div class="head" >'+ num+'人</div>';
            //    }
            //}
        }
        $('#new-wrap').html(item);
        $('#used-wrap').html(item2);

    }
    // 日期
    function dateInit(weekNum){
        var date = new Date();

        var day = date.getDay() || 7;
        var begDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1+(7*weekNum) - day);
        var begDay2 = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2+(7*weekNum) - day);
        var begDay3 = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3+(7*weekNum) - day);
        var begDay4 = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4+(7*weekNum) - day);
        var begDay5 = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5+(7*weekNum) - day);
        var begDay6 = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6+(7*weekNum) - day);
        var begDay7 = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7+(7*weekNum) - day);
        beginDate1 = formatDate(begDay,"yyyy-MM-dd");
        beginDate2 = formatDate(begDay2,"yyyy-MM-dd");
        beginDate3 = formatDate(begDay3,"yyyy-MM-dd");
        beginDate4 = formatDate(begDay4,"yyyy-MM-dd");
        beginDate5 = formatDate(begDay5,"yyyy-MM-dd");
        beginDate6 = formatDate(begDay6,"yyyy-MM-dd");
        beginDate7 = formatDate(begDay7,"yyyy-MM-dd");
        var html = '';
        html+='<div class="head">周一<br>'+beginDate1.substring(5)+'</div>' +
            '<div class="head">周二<br>'+beginDate2.substring(5)+'</div>' +
            '<div class="head">周三<br>'+beginDate3.substring(5)+'</div>' +
            '<div class="head">周四<br>'+beginDate4.substring(5)+'</div>' +
            '<div class="head">周五<br>'+beginDate5.substring(5)+'</div>' +
            '<div class="head">周六<br>'+beginDate6.substring(5)+'</div>' +
            '<div class="head">周日<br>'+beginDate7.substring(5)+'</div>';
        $('#day-wrap').html(html);
    }
    $('#next').on('click',function(){
        weekNum++;
        console.log(weekNum);
        getBookUsed(bookEdit.doctorId);
    });
    $('#current').on('click',function(){
        weekNum = 0;
        console.log(weekNum);
        getBookUsed(bookEdit.doctorId);
    });

    /*診所*/
    (function vipType(){
        var type = currentUser.type;
        if(type == 10){
            getShowLIst();
        }else if(type == 11){
            $('#shop-title').hide();
        }
    })();

    function getShowLIst(){
        var showList;
        $.ajax({
            url: 'http://www.wskj020.com:9179//App/ShopList.ashx',
            success: function (result) {
                var info = JSON.parse(result);
                console.log('ajax...........');
                console.log(info);

                if (info.success == true) {
                    showList = info.list;
                    showDoctor(showList);
                    var html = '';
                    for(var i = 1;i < showList.length;i++){
                        html+='<label class="radio-inline">' +
                            '<input type="radio" name="inlineRadioOptions" value="'+showList[i].id+'"> '+showList[i].title+'' +
                            '</label>'
                    }
                    $('#show-wrap').html(html);
                } else {
                    alert(JSON.stringify(info.message))
                }
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    }
    $('#show-wrap').on('change','input[type="radio"]',function(){
        bookEdit.shopId = this.value;
        getDoctorList(this.value);
    });

    /*醫師*/
    $('#doctor-wrap').on('change','input[type="radio"]',function(){
        bookEdit.bookDate = '';
        bookEdit.bookTime = '';
        bookEdit.doctorId = this.value;
        getBookUsed(this.value);
    });
    $('#doctor-wrap').on('click','input[type="radio"]',function(){
       $('#doctor-modal').modal('toggle');
       for(var i = 0; i < doctors.length;i++){
           if(doctors[i].id == this.value){
               // console.log(doctors[i]);
               var sex = doctors[i].sex ? '女' : '男';
               var html = '<img  src="'+ headerPath+doctors[i].headerName +'">' +
                   '<div class="caption"> <ul class="list-group">' +
                   '  <li class="list-group-item">姓名：'+ doctors[i].userName +'</li>' +
                   '<li class="list-group-item">年龄：'+ doctors[i].old +'</li>' +
                   '<li class="list-group-item">性别：'+ sex +'</li>' +
                   '<li class="list-group-item">诊所：'+ doctors[i].shopTitle +'</li>' +
                   '<li class="list-group-item">电话：'+ doctors[i].phone +'</li>' +
                   '<li class="list-group-item">微信：'+ doctors[i].wechat +'</li>' +
                   '<li class="list-group-item">邮箱：'+ doctors[i].email +'</li>' +
                   '<li class="list-group-item">备注：'+ doctors[i].remark +'</li>' +
                   '</ul> </div>';
               $('#mess-wrap').html(html);
           }
       }
    });

    getDoctorList();
    function getDoctorList(shopId){
        var params = {
            shopId:currentUser.shopId,
            type:23
        };
        if(shopId){
            params.shopId = shopId;
        }

        $.ajax({
            url: 'http://www.wskj020.com:9179//App/UserList.ashx',
            data: params,
            success: function (result) {
                var info = JSON.parse(result);
                console.log('ajax...........');
                console.log(info);

                if (info.success == true) {
                    doctors = info.list;
                    showDoctor(doctors);
                } else {
                    alert(JSON.stringify(info.message))
                }
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    }
    function showDoctor(doctors){
        var item = '';
        for(var i = 0;i < doctors.length;i++){
            item += '<label class="radio-inline">' +
                '<input type="radio" name="inlineRadioOptions" value="'+doctors[i].id+'"> '+doctors[i].userName+'' +
                '</label>';

        }
        $('#doctor-wrap').html(item);
    }

});

//格式化日期,
function formatDate(date,format){
    var paddNum = function(num){
        num += "";
        return num.replace(/^(\d)$/,"0$1");
    };
    //指定格式字符
    var cfg = {
        yyyy : date.getFullYear() //年 : 4位
        ,yy : date.getFullYear().toString().substring(2)//年 : 2位
        ,M  : date.getMonth() + 1  //月 : 如果1位的时候不补0
        ,MM : paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
        ,d  : date.getDate()   //日 : 如果1位的时候不补0
        ,dd : paddNum(date.getDate())//日 : 如果1位的时候补0
        ,hh : date.getHours()  //时
        ,mm : date.getMinutes() //分
        ,ss : date.getSeconds() //秒
    };
    format || (format = "yyyy-MM-dd hh:mm:ss");
    return format.replace(/([a-z])(\1)*/ig,function(m){return cfg[m];});
}

// 生成guId
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function guid() {
    return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
}