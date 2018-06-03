/**
 * Created by ASUS on 2018/5/19.
 */
$(function(){
    var user = JSON.parse(window.localStorage.getItem('user')) ;
    !user ? window.location.href = './' : null ;
    var moneyList;

    //提现
    $('#btn-send').on('click',function(){
        var params={
            amount:$('#message-amount').val(),
            //accountName:date.userName,
            userId:user.id,
            account:$('#message-weChat').val(),
            //token:this.appserver.gettoken(),
            way:1,
        }
        console.log(params);
        $.ajax({
            url: 'http://www.wskj020.com:9179//App/MoneyWithdraw.ashx',
            data: params,
            success: function (result) {
                var info = JSON.parse(result);
                console.log('ajax...........');
                console.log(info);
                if (info.success == true) {
                    alert('提交成功，请耐心等待');
                } else {
                    alert(JSON.stringify(info.message))
                }
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    });

    (function showAmount() {
        var html = '<span id="price" style="color: red">￥' + user.amount + '</span>';
        $('#header').append(html);
    })();

    getMoneyList();
    function getMoneyList(){
        var params = {
            no: -1,
            userId:user.id,
            token:user.token
        };
        console.log(params);
        $.ajax({
            url: 'http://www.wskj020.com:9179//App/MoneyList.ashx',
            data: params,
            success: function (result) {
                var info = JSON.parse(result);
                console.log('ajax...........');

                if (info.success == true) {
                    moneyList = info.list;
                    console.log(moneyList);
                    showMoneyList(moneyList);
                } else {
                    alert(JSON.stringify(info.message))
                }
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    }

    function showMoneyList(moneyList) {
        var html = '';
        for (var i = 0; i < moneyList.length; i++) {
            html += '<a href="#" class="list-group-item demo"  >' +
                '<h4 class="list-group-item-heading">' + moneyList[i].addTime + '</h4>' +
                '<p class="list-group-item-text"><span>支付：' + moneyList[i].typeTitle + '</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                '支付金额：<span class="" style="color: red">' + moneyList[i].amount + '</span></p>' +
                '<p class="list-group-item-text">状态：' + moneyList[i].stateTitle + '</p>' +
                '<p class="list-group-item-text">类型：' + moneyList[i].billType + '</p>' +
                '<p class="list-group-item-text">单号：' + moneyList[i].billCode + '</p>' +
                '<p class="list-group-item-text">备注：' + moneyList[i].remark + '</p></a>';
        }
        $('#box2').html(html);
    }

});