/**
 * Created by ASUS on 2018/5/8.
 */
$(document).ready(function () {
    var treatList;
    var user = JSON.parse(window.localStorage.getItem('user')) ;
    !user ? window.location.href = './' : null ;
    console.log(user);
    loadInit(0);

    function loadInit(type){
        var params = {
            userId: user.id,
            evaluate:type
        };
        //if(type==0){
        //    params.evaluate = type;
        //
        //}
        console.log(params);
        $.ajax({
            url: 'http://www.wskj020.com:9179//App/TreatList.ashx',
            data: params,
            success: function (result) {
                var info = JSON.parse(result);
                console.log('ajax...........');
                console.log(info);

                if (info.success == true) {
                    treatList = info.list;
                    console.log(treatList);
                    showData(type);
                } else {
                    alert(JSON.stringify(info.message))
                }
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    }


    function showData(type){
        var item = '';
        var evaluate = '好评';
        for(var i = 0;i < treatList.length;i++){

            switch (treatList[i].evaluate) {
                case 0:
                    evaluate = '未评价';
                    break;
                case 1:
                    evaluate = '好评';
                    break;
                case 2:
                    evaluate = '中评';
                    break;
                case 3:
                    evaluate = '差评';
                    break;
            }
            if(type == 0){
                item += '<a href="#" class="list-group-item demo" data-toggle="modal" data-target=".bs-example-modal-lg" data-itemid="'+treatList[i].id+'">' +
                    '<h4 class="list-group-item-heading">第'+ treatList[i].courseIndex +'疗程第'+ treatList[i].treatTime +'次治疗（'+treatList[i].addTime+'）</h4>' +
                    '<p class="list-group-item-text"><span>治疗医生：'+treatList[i].doctorName+'</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>评价：'+evaluate+'</span></p>' +
                    '<p class="list-group-item-text">评价内容：'+treatList[i].evaluateRemark+'</p></a>';
            }else {
                item += '<a href="#" class="list-group-item demo"  data-itemid="'+treatList[i].id+'">' +
                    '<h4 class="list-group-item-heading">第'+ treatList[i].courseIndex +'疗程第'+ treatList[i].treatTime +'次治疗（'+treatList[i].addTime+'）</h4>' +
                    '<p class="list-group-item-text"><span>治疗医生：'+treatList[i].doctorName+'</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>评价：'+evaluate+'</span></p>' +
                    '<p class="list-group-item-text">评价内容：'+treatList[i].evaluateRemark+'</p></a>';
            }


        }

        if(type==0){
            $('#box').html(item);
        }else {
            $('#box2').html(item);
        }
    }

    $('#box').on('click','a',function(){
        TreatEvaluateEdit.id = $(this).attr('data-itemid');
    });


    var TreatEvaluateEdit = {
        id:'',
        userId:user.id,
        evaluate:1,
        remark:''
    };
    $('#btn-send').click(function(){
        TreatEvaluateEdit.remark =  $('#message-text').val();
        $('input[type="radio"]').each(function(){
            if(this.checked){
                TreatEvaluateEdit.evaluate = this.value;
            }
        });
        console.log(TreatEvaluateEdit);
        $.ajax({
            url: 'http://www.wskj020.com:9179//App/TreatEvaluate.ashx',
            data: TreatEvaluateEdit,
            success: function (result) {
                var info = JSON.parse(result);
                console.log('ajax...........');
                console.log(info);

                if (info.success == true) {
                    //alert('提交评价成功');
                    $('.bs-example-modal-lg').modal('hide');
                    loadInit();
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

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        console.log($(e.target).attr('href'));
        if($(e.target).attr('href') == '#home'){
            loadInit(0);
        }else if($(e.target).attr('href') == '#profile'){
            loadInit();
        }
    })

});