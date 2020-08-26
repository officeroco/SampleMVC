//import { Alert } from "../lib/bootstrap/dist/js/bootstrap.bundle";

$(document).ready(function () {
    $('#button9').click(function () {
        $.ajax({
            url: '@Url.Action("","People")',
            type: 'POST',
            cache: false,
            dataType: 'json',
            success: function (o) {
                $('#text1').html(
                    o.FirstName + ' ' + o.LastName
                    + ' (' + o.EmployeeID + ')'
                );
            }
        });
    });
});

$(function () {
    $('#postButton').click(
        function () {
            var param = {
                id: 10,
                name: "大野具之",
                age: 45
            };

            $.ajax({
                //data: { names: ["a", "b", "c"] }//配列渡し

                url: '/People/AjaxTest',//外部ファイルにするとURLが変わるので固定
                //url: '@Url.Action("PostTest", "People")',
                type: "POST",
                data: param
                //以下は指定するとサーバー側でうまく受け取れない
                //contentType: "application/json",
                //dataType: "json",
                //data: JSON.stringfiy(param)
            }).done(function(o, status, xhr) {
                // 正常
                //JSON形式のファイルを展開
                $.each(o, function (index, val) {
                    $("#maminData").append('<br>' + val.id + ' ' + val.name + ' ' + val.age + '<br>');
                });

            }).fail(function(xhr, status, error) {
                // 異常
                alert("通信エラー");
            }).always(function(o, status, xhr) {
                // 常に
            });
        });
});

//$(function () {
//    $('#getButton').click(function () {
//        $.get('/People/GetTest',
//            { text: $('#textbox').val() },
//            function (data) {
//                console.log(JSON.stringify(data));
//                $('#text').text(data['returnText']);
//            }
//        );
//    });
//});

$(function () {
    $("#button1").click(
        function () {
            $.ajax({
                type: 'GET',
                url: 'https://iwb.jp/s/js/data.jsonp',
                dataType: 'jsonp',
                jsonpCallback: 'android',
                success: function (json) {


                    var len = json.length;
                    for (var i = 0; i < len; i++) {
                        $("#maminData").append('<br>' + json[i].version + ' ' + json[i].codename + '<br>');
                    }
                }
            });

        });
});

// ボタンを押すと、ブロック内のプログラムが実行される
$(function () {
    $("#btn1").click(
        function () {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let message = `今日は${year}年${month}月${day}日です`
            // jQueryを使って画面にメッセージを表示する
            $("#tBox").val(message);
        });
});




