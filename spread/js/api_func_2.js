var http_url = "http://localhost:8090/ema-platform-extend/";


// 获取必要info
$(document).ready(function() {



});

//显示index页面在的列表
function get_app_list_new(id) {
    var html_str = '';
    html_str += '<li>';
    html_str += '<span class="ig"><a href="codeShow.html?app_id=20015&app_name=次元大作战"><img src="' + './images/icon-png/icon_20015.png' + '"></a></span>';
    html_str += '<span class="info"><p>' + '次元大作战' + '</p></span>';
    html_str += '<span class="enter"><a href="codeShow.html?app_id=20015&app_name=次元大作战"><span class="btn_tg">我要推广</span></a></span>';
    html_str += '</li>';

    html_str += '<li>';
    html_str += '<span class="ig"><a href=""><img src="' + './images/icon-png/icon_20007.png' + '"></a></span>';
    html_str += '<span class="info"><p>' + '无尽远征' + '</p></span>';
    html_str += '<span class="enter"><a href=""><span class="btn_tg jqqd">敬请期待</span></a></span>';
    html_str += '</li>';

    html_str += '<li>';
    html_str += '<span class="ig"><a href=""><img src="' + './images/icon-png/icon_20012.png' + '"></a></span>';
    html_str += '<span class="info"><p>' + '英灵召唤师' + '</p></span>';
    html_str += '<span class="enter"><a href=""><span class="btn_tg jqqd">敬请期待</span></a></span>';
    html_str += '</li>';

    html_str += '<li>';
    html_str += '<span class="ig"><a href=""><img src="' + './images/icon-png/icon_20016.png' + '"></a></span>';
    html_str += '<span class="info"><p>' + '小鱼传奇' + '</p></span>';
    html_str += '<span class="enter"><a href=""><span class="btn_tg jqqd">敬请期待</span></a></span>';
    html_str += '</li>';

    $("#" + id).html(html_str);
}


//获取相应推广用户的推广码
// http://localhost:8090/ema-platform-extend/invite/beInvite?uid=10001&appId=20015
function is_create_code_new(appid, id) {
    try {
        window.uuid = getCookie("uid");
    } catch (e) {
        layer.msg("getCookie失败");
    }
    window.uuid = 10003;
    $.ajax({
        url: http_url + "invite/showInviteCode?uid=" + window.uuid + "&appId=" + appid,
        type: "get",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            $("#" + id).html(data.data.inviteCode);
            // $(".btn_get").hide();
            $(".lived").show();
        }
    });
}

//推广员奖励
function promoter(appid) {
    $.ajax({
        url: http_url + "invite/selectAppRewardInfo?appId=" + appid,
        type: "get",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            var jsondata = JSON.parse(data.data);
            console.log(jsondata);
            var html_str = '';
            for (var i = 0; i < jsondata.length; i++) {
                var temp = jsondata[i];

                html_str += ' <div class="gz-box">';
                html_str += ' <div class="dengji"><span class="bg-cl">等级' + temp.id + '</span><span class="mg-lf">推广数量：' + temp.inviteCount + '</span></div>';
                html_str += '<span>奖励：</span><span>' + temp.inviteRewordComment + '</span>';
                html_str += '</div>';

            }
            $(".guizeinfoshow").html(html_str);
        }
    });

}

function get_my_spread_new(id) {
    try {
        window.uuid = getCookie("uid");
    } catch (e) {
        layer.msg("getCookie失败");
    }
    window.uuid = 100001;
    $.ajax({
        url: http_url + "invite/showAllAppByUid?uid=" + window.uuid,
        type: "get",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            console.log(data);
            var html_str = "";
            for (var i = 0; i < data.data.length; i++) {
                html_str += '<li>';
                html_str += '<span class="ig"><a><img src="./images/icon-png/icon_' + data.data[i].appId + '.png"></a></span>';
                html_str += '<span class="info1"><a><p>' + swichname(data.data[i].appId) + '</p> <p class="c-txt-1">我的推广码：' + data.data[i].inviteCode + '</p></a></span>';
                html_str += '<div class="two-btn"><div class="my-yeji"><a href="my_player_list.html?appid=' + data.data[i].appId + '&title=我的玩家">我的玩家</a></div><div class="my-wanjia"><a href="my_ach.html">我的奖励</a></div></div>'
                html_str += '</li>';
            }
            $("#" + id).html(html_str);
        }
    });
}

function my_player_list(appid) {
    try {
        window.uuid = getCookie("uid");
    } catch (e) {
        layer.msg("getCookie失败");
    }
    window.uuid = 200001;
    $.ajax({
        url: http_url + "invite/selectTgRewardInfo?uid=" + window.uuid + "&appId=" + appid,
        type: "get",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            console.log(data);
            var html_str = "";
            for (var i = 0; i < data.data.length; i++) {
                html_str += '<li>';
                html_str += '<p class="c-txt-1"><span>邀请量：'+ data.data[i].inviteCount +'</span><span>等级：'+data.data[i].inviteLevel+'</span></p>';
                if (data.data[i].exchangeCode) {
                    html_str += '<p class="c-txt-1">我的推广码：'+data.data[i].exchangeCode+'</p>';
                }else{
                     html_str += '<p class="c-txt-1">我的推广码：未达成</p>';
                }
                
                html_str += '<p class="c-txt-1">我的奖励：'+data.data[i].inviteRewordComment+'</p>';
                html_str += '</li>';
            }
            $(".my_player_list").html(html_str);
        }
    });
}

function swichname(appid) {
    appid = appid.toString();
    switch (appid) {
        case "20015":
            return "次元大作战";
        case "20007":
            return "无尽远征";
        case "20012":
            return "英灵召唤师";
        case "20016":
            return "小鱼传奇";
    }
}
