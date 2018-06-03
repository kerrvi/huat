/**
 * Created by ASUS on 2018/5/12.
 */
$(function(){

    var currentUser = JSON.parse(window.localStorage.getItem('user')) ;
    !currentUser ? window.location.href = './' : null ;
    var params = {
        doctorId:'',
        userId:currentUser.id,
        begDay:'',
        endDay:'',
        bookDate:'',
        bookTime:''
    };

    $('#begDay').on('change',function(){
        getBookList();
    });
    $('#endDay').on('change',function(){
        getBookList();
    });

    (function dateInit(weekNum){
        var date = new Date();

        var day = date.getDay() || 7;
        var begDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1+(7*weekNum) - day);
        var begDay7 = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7+(7*weekNum) - day);
        beginDate1 = formatDate(begDay,"yyyy-MM-dd");
        beginDate7 = formatDate(begDay7,"yyyy-MM-dd");
        params.begDay = beginDate1;
        params.endDay = beginDate7;
        $('#begDay').val(beginDate1);
        $('#endDay').val(beginDate7);
    })(0);

    function getBookList(){
        var bookList;
        params.begDay = $('#begDay').val();
        params.endDay = $('#endDay').val();
        console.log(params);
        console.log($('#begDay').val());
        $.ajax({
            url: 'http://www.wskj020.com:9179//App/BookList.ashx',
            data: params,
            success: function (result) {
                var info = JSON.parse(result);
                console.log('ajax...........');

                if (info.success == true) {
                    bookList = info.list;
                    console.log(bookList);
                    var html = '';
                    var stateTitle =  '';
                    for(var i = 0;i < bookList.length;i++){
                        switch (bookList[i].state) {
                            case 0:
                                stateTitle = '已预约';
                                break;
                            case 1:
                                stateTitle = '已就诊';
                                break;
                            case 2:
                                stateTitle = '已取消';
                                break;
                            case 3:
                                stateTitle = '已失约';
                                break;
                        }

                        html += '<a href="#" class="list-group-item demo" data-toggle="modal" data-target=".bs-example-modal-lg" data-itemid="'+bookList[i].id+'">' +
                            '<h4 class="list-group-item-heading">预约时间：'+bookList[i].bookDate+'  '+bookList[i].bookTime+' </h4>' +
                            '<p class="list-group-item-text"><span>治疗医生：'+bookList[i].doctorName+'</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>诊所：'+bookList[i].shopTitle+'</span></p>' +
                            '<p class="list-group-item-text">预约状态：'+stateTitle+'</p>' +
                            '<p class="list-group-item-text">预约备注：'+bookList[i].remark+'</p></a>';
                    }
                    $('#box2').html(html);
                } else {
                    alert(JSON.stringify(info.message))
                }
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    }

    // 预约更改
    BookUpdate = {
        id:'',
        state:0,
        remark:''
    };
    $('#box2').on('click','a',function(){
        BookUpdate.id = $(this).attr('data-itemid');
    });
    $('#btn-send').click(function(){
        BookUpdate.remark =  $('#message-text').val();
        $('input[type="radio"]').each(function(){
            if(this.checked){
                BookUpdate.state = this.value;
            }
        });
        console.log(BookUpdate);
        $.ajax({
            url: 'http://www.wskj020.com:9179//App/BookUpdate.ashx',
            data: BookUpdate,
            success: function (result) {
                var info = JSON.parse(result);
                console.log('ajax...........');
                console.log(info);

                if (info.success == true) {
                    //alert('提交评价成功');
                    $('.bs-example-modal-lg').modal('hide');
                    getBookList();
                    //showData();
                } else {
                    alert(JSON.stringify(info.message))
                }
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    });


    // 预约医生
    $('#doctor-wrap').on('change','input[type="radio"]',function(){
        params.doctorId = this.value;
        getBookList();
    });

    getDoctorList();
    function getDoctorList(shopId){
        var doctors;
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