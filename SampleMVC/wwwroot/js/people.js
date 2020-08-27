

//MVCのControllersを使用しPOSTでJSONファイルを読み込む
$(function () {
    $('#postButton').click(
        function () {
            //var param = { names: ["a", "b", "c"] }//配列渡し
            var param = {
                id: 10,
                name: "大野具之",
                age: 45
            };
            $.ajax({
                //url: '@Url.Action("PostTest", "People")',
                url: '/People/AjaxTest',        //外部ファイルにするとURLが変わるので固定
                type: "POST",                   //"POST"か"GET"を指定
                data: JSON.stringify(param),    //サーバに送信するフォームデータ
                dataType: 'json',               //サーバから返されるデータの型を指定
                contentType: 'application/json'//初期値は"application/x-www-form-urlencoded; charset=UTF-8"で、殆どの場合はこの設定のままで問題ない
            }).done(function(o, status, xhr) {
                // 正常
                //JSON形式のファイルを展開
                $("#maminData").empty();
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

//MVCのControllersを使用しGETでJSONファイルを読み込む
$(function () {
    $('#getButton').click(
        function () {
            $.get('/People/GetTest',
                function (data) {
                    alert(JSON.stringify(data));
                }
            );
        });
});

//本番はdoneで記述(Query1.8～非推奨)
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

//MVCのControllersを介さずGETでJSONファイルを読み込む
$(function () {
    $("#btnJson").click(
        function () {
            alert(location.pathname);
            $.getJSON("https://localhost:44308/js/sample.json",
                function (json) {
                    var len = json.length;
                    for (var i = 0; i < len; i++) {
                        $("#maminData").append('<br>' + json[i].last_name + ' ' + json[i].first_name + '<br>');
                    }
                })
        })
})

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
