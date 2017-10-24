/**
 * @author shuaishuai.niu
 */
var http_url = "https://passport.lemonade-game.com/";
$(document).ready(function() {
    $(".list_icon").click(function() {
        var dsp = $(".menu_list").css("display");
        if (dsp == "none") {
            $(".menu_list").show();
        } else {
            $(".menu_list").hide();
        }
    });
    $(".loginout").click(function() {
        loginout();
    });

});

function isTgUser() {
    //判断是否是已经成为推广用户	
    $.ajax({
        url: http_url + "tg/user/isTgUser",
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.retcode != 0) {
                layer.msg("您还没推广游戏", { time: 2000 }, function() {
                    location.href = "index.html";
                    return false;
                });
            }

        }
    });
}

function get_ad_list() {
    $.ajax({
        url: http_url + "tg/app/Adlist",
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.retcode == 1000) {
                layer.msg("您还未登录！", function() {
                    location.href = "login.html";
                });
            } else {
                if (data.retcode == 0 && data.retmsg == "success") {
                    var html_str = '';
                    if (data.data.length == 0) {
                        html_str += '<div>没有数据可以显示</div>';
                    } else {
                        html_str += '<div class="swiper-wrapper">';
                        for (var i = 0; i < data.data.length; i++) {
                            html_str += '<div class="swiper-slide" style="overflow:hidden;">';
                            html_str += '<a href="' + data.data[i].link + '" style="width:100%;height:8rem;display:block"><img src="http://static.lemonade-game.com/' + data.data[i].img_name + '" style="width;100%;"/></a>';
                            html_str += '</div>';
                        }
                    }
                    html_str += ' </div> <div class="pagination"></div>';
                    $(".swiper-container").html(html_str);
                    var mySwiper = new Swiper('.swiper-container', {
                        pagination: '.pagination',
                        paginationClickable: true
                    });
                }
            }
            //layer.close(load);
        }
    });
}


//获取相应推广用户的推广码
function get_code(appid, id) {
    $.ajax({
        url: http_url + "tg/app/getcode?appid=" + appid,
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.retcode == 1000) {
                layer.msg("您还未登录！", function() {
                    location.href = "login.html";
                });
            } else {
                if (data.retcode == 0 && data.retmsg == "success") {
                    $("#" + id).html(data.data.code);
                    $(".btn_get").hide();
                    $(".lived").show();
                } else {
                    layer.msg("领取推广码失败");
                }
            }
        }
    });
}

function get_my_spread(id) {
    isTgUser();
    $.ajax({
        url: http_url + "tg/user/myCodeList",
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.retcode == 1000) {
                layer.msg("您还未登录！", function() {
                    location.href = "login.html";
                });
            } else {
                if (data.retcode == 0 && data.retmsg == "success") {
                    var html_str = '';
                    if (data.data.length == 0) {

                        html_str += '<li>没有数据可以显示</li>';
                    } else {
                        for (var i = 0; i < data.data.length; i++) {
                            html_str += '<li>';
                            html_str += '<span class="ig"><a href="my_ach_list.html?app_id=' + data.data[i].app_id + '&app_name=' + data.data[i].app_name + '"><img src="' + data.data[i].app_icon_1 + '"></a></span>';
                            html_str += '<span class="info1"><a href="my_ach_list.html?app_id=' + data.data[i].app_id + '&app_name=' + data.data[i].app_name + '"><p>' + data.data[i].app_name + '</p> <p class="c-txt-1">我的推广码：' + data.data[i].code + '</p></a></span>';
                            html_str += '<span class="enter"><a href="my_ach_list.html?app_id=' + data.data[i].app_id + '&app_name=' + data.data[i].app_name + '">查看业绩</a></span>';
                            html_str += '</li>';
                        }
                    }
                    $("#" + id).html(html_str);
                } else {
                    layer.msg("");
                }
            }
        }
    });
}

function get_my_ach(id) {
    isTgUser();
    $.ajax({
        url: http_url + "tg/user/myCodeList",
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.retcode == 1000) {
                layer.msg("您还未登录！", function() {
                    location.href = "login.html";
                });
            } else {
                if (data.retcode == 0 && data.retmsg == "success") {
                    var html_str = status = '';
                    if (data.data.length == 0) {

                        html_str += '<li>没有数据可以显示</li>';
                    } else {
                        for (var i = 0; i < data.data.length; i++) {
                            html_str += '<li>';
                            html_str += '<span class="ig"><a href="my_ach_list.html?app_id=' + data.data[i].app_id + '&app_name=' + data.data[i].app_name + '"><img src="' + data.data[i].app_icon_1 + '"></a></span>';
                            html_str += '<span class="info1"><a href="my_ach_list.html?app_id=' + data.data[i].app_id + '&app_name=' + data.data[i].app_name + '"><p>' + data.data[i].app_name + '</p> <p class="c-txt-1">我的推广码：' + data.data[i].code + '</p></a></span>';
                            if (data.data[i].balance_status == 1) {
                                status = '<p class="stated">可结算</p>';
                            } else if (data.data[i].balance_status == 2) {
                                status = '<p class="stat">已结算</p>';
                            } else {
                                status = '<p class="stat">不可结算</p>';
                            }
                            html_str += '<a href="my_ach_list.html?app_id=' + data.data[i].app_id + '&app_name=' + data.data[i].app_name + '" class="a-href"><span class="enter-1">' + status;
                            html_str += '	<p class="arrow">	<img src="images/arrow.png" />	</p></span>';
                            html_str += '</a></li>';
                        }
                    }
                    $("#" + id).html(html_str);
                } else {
                    layer.msg("");
                }
            }
        }
    });
}


//获取推广信息
function get_tg_info(appid) {
    $.ajax({
        url: http_url + "tg/app/get_config_info?appid=" + appid,
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.retcode == 1000) {
                layer.msg("您还未登录！", 2, 0, function() {
                    location.href = "login.html";
                });

            } else {
                if (data.retcode == 0 && data.data != "") {
                    $("#tg_award").html(data.data.tg_award);
                    $("#player_award").html(data.data.player_award);
                    $("#tg_rules").html(data.data.tg_rules);
                    if (data.data.sep_cycle != 0) {
                        $("#recyle").html("分成周期：" + data.data.sep_cycle + "个月");
                    } else {
                        $("#recyle").html("分成周期：不限时间");
                    }
                    var balance_arr = new Array();
                    balance_arr[1] = "月结";
                    balance_arr[2] = "季度结";
                    balance_arr[3] = "半年结";
                    balance_arr[4] = "年结";
                    $("#balance_style").html("结算方式：" + balance_arr[data.data.balance_style]);

                }
            }
        }
    });
}
//获取我的业绩页面的数据number
function get_ach_num(appid, ach_id, newuser_id, payuser_id, year, month) {
    isTgUser();
    $.ajax({
        url: http_url + "tg/user/getMonthData?appid=" + appid + "&year=" + year + '&month=' + month,
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.retcode == 1000) {
                layer.msg("您还未登录！", function() {
                    location.href = "login.html";
                });
            } else {
                if (data.retcode == 0) {
                    $("#" + ach_id).html(data.data.ach);
                    $("#" + newuser_id).html(data.data.newuser);
                    $("#" + payuser_id).html(data.data.payuser);
                }
            }
        }
    });
}
//获取用户个人信息
function get_userinfo() {
    isTgUser();
    $.ajax({
        url: http_url + "tg/user/getinfo",
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.errno == 1000) {
                layer.msg("您还未登录！", function() {
                    location.href = "login.html";
                });
            } else {
                if (data.errno == 0) {
                    if (data.status.cert_id == 6) {
                        $("#realname").html("已认证");
                        $("#realname2").html("已认证");
                        $("#realname2").attr('class', 'm-3-1');
                    } else {
                        $("#realname").html("未认证");
                        $("#realname2").html("立即认证");
                        $("#realname2").attr('class', 'm-3-2');
                    }
                    if (data.info.gender == 1) {
                        $("#gender").html("男");
                    } else if (data.info.gender == 0) {
                        $("#gender").html("女");
                    } else {
                        $("#gender").html("未知");
                    }
                    if (data.info.mobile) {
                        $("#mobile").html(data.info.mobile);
                        $("#mobile").attr('class', 'm-3-1');
                    } else {
                        $("#mobile").html("立即绑定");
                        $("#mobile").attr('class', 'm-3-2');
                    }
                    $("#qq").html(data.info.qq);
                    $("#alipay").html(data.info.alipay_account);
                    $("#gender_url").attr("href", "my_gender.html?v=" + data.info.gender);
                    $("#user_account").html(data.info.loginname);
                    $("#tg_account").html("tg_" + data.info.tg_account);
                }
            }
        }
    });
}

function edit_user_info(val, type) {
    var query_str = "";
    switch (type) {
        case 'gender':
            query_str = "gender=" + val;
            break;
        case 'mobile':
            query_str = "mobile=" + val;
            break;
        case 'qq':
            query_str = "qq=" + val;
            break;
        case 'address':
            query_str = "address=" + val;
            break;
    };
    isTgUser();
    $.ajax({
        url: http_url + "tg/user/user_submit?" + query_str,
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.errno == 1000) {
                layer.msg("您还未登录！", function() {
                    location.href = "login.html";
                });
            } else {
                if (data.is_true) {
                    location.href = "my_info_list.html";
                } else {
                    layer.msg(data.retmsg);
                    return false;
                }
            }
        }
    });
}

function true_name_auth(truename, idcard) {
    query_str = "real_name=" + truename + "&cert_id=" + idcard;
    isTgUser();
    $.ajax({
        url: http_url + "bind/check_real_name_auth?" + query_str,
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.errno == 1000) {
                layer.msg("您还未登录！", function() {
                    location.href = "login.html";
                });
            } else {
                if (data.is_true) {
                    layer.msg("实名认证成功！");
                    location.href = "my_info_list.html";
                    return false;
                } else {
                    layer.msg(data.retmsg);
                    return false;
                }
            }
        }
    });

}

function tg_info_edit(val, type) {
    var query_str = "";
    switch (type) {
        case 'alipay':
            query_str = "alipay_account=" + val;
            break;
        case 'address':
            query_str = "receive_addr=" + val;
            break;
    };
    isTgUser();
    $.ajax({
        url: http_url + "tg/user/tgInfoSave?" + query_str,
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.errno == 1000) {
                layer.msg("您还未登录！", function() {
                    location.href = "login.html";
                });
            } else {
                if (data.is_true) {
                    location.href = "my_info_list.html";
                } else {
                    layer.msg(data.retmsg);
                    return false;
                }
            }
        }
    });
}

function get_data_total(type, day_id, month_id, total_id, year, month) {
    isTgUser();
    $.ajax({
        url: http_url + "tg/income/getcount/" + type + "?year=" + year + "&month=" + month,
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.retcode == 1000) {
                layer.msg("您还未登录！", function() {
                    location.href = "login.html";
                });
            } else {
                if (data.retcode == 0) {
                    if (day_id) {
                        $("#" + day_id).html(data.data.day_data);
                    }
                    if (month_id) {
                        $("#" + month_id).html(data.data.month_data);
                    }
                    if (total_id) {
                        $("#" + total_id).html(data.data.total_data);
                    }

                }
            }
        }
    });
}

function get_myach_list(appid, year, month, type, page, pagesize) {
    isTgUser();
    $.ajax({
        url: http_url + "tg/income/my_achlist?type=" + type + "&app_id=" + appid + "&year=" + year + "&month=" + month + "&page=" + page + "&pagesize=" + pagesize,
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.retcode == 1000) {
                layer.msg("您还未登录！", function() {
                    location.href = "login.html";
                });
            } else {
                if (data.retcode == 0) {
                    list_str = '';
                    $("#pages").attr("data-pages", data.pages);
                    if (data.data.length > 0) {
                        if (page == 1) {
                            if (type == "myach") {
                                //list_str += '<div class="item-list bg_white" style="font-size:1rem;"><span style="width:10%">日期</span><span style="width:25%">帐号</span><span style="width:25%">游戏</span><span style="width:25%">角色/等级</span><span style="width:10%">充值</span></div>';
                                list_str += '<div class="item-list bg_white" style="font-size:1rem;"><span style="width:10%">日期</span><span style="width:30%">帐号</span><span style="width:25%">游戏</span><span style="width:20%">充值</span></div>';
                            } else if (type == "newuser") {
                                //	list_str += '<div class="item-list bg_white" style="font-size:1rem;"><span style="width:10%">日期</span><span style="width:15%">角色名</span><span style="width:22%">帐号</span><span style="width:22%">游戏</span><span style="width:22%">注册时间</span></div>';
                                list_str += '<div class="item-list bg_white" style="font-size:1rem;"><span style="width:10%">日期</span><span style="width:30%">帐号</span><span style="width:22%">游戏</span><span style="width:30%">注册时间</span></div>';
                            } else if (type == "payuser") {
                                list_str += '<div class="item-list bg_white" style="font-size:1rem;"><span style="width:10%">日期</span><span style="width:22%">帐号</span><span style="width:22%">来源</span><span style="width:22%">游戏</span><span style="width:22%">充值</span></div>';
                            }
                        }
                        for (var i = 0; i < data.data.length; i++) {
                            list_str += '<div class="item-list bg_white">';
                            if (type == "myach") {
                                list_str += '<span style="width:10%"><a href="my_ach_list_show.html?title=我的业绩&type=1&id=' + data.data[i].tg_day_id + '">' + data.data[i].day + '日</a>	</span>';
                                list_str += '<span style="width:30%"><a href="my_ach_list_show.html?title=我的业绩&type=1&id=' + data.data[i].tg_day_id + '">' + data.data[i].user_account + '</a>	</span>';
                                list_str += '<span style="width:25%"><a href="my_ach_list_show.html?title=我的业绩&type=1&id=' + data.data[i].tg_day_id + '">' + data.data[i].app_name + '</a>	</span>';
                                //list_str += '<span style="width:25%"><a href="my_ach_list_show.html?title=我的业绩&type=1&id='+data.data[i].tg_day_id+'">'+data.data[i].role_name+'/'+data.data[i].role_level+'级</a>	</span>';		
                                list_str += '<span style="width:20%"><a href="my_ach_list_show.html?title=我的业绩&type=1&id=' + data.data[i].tg_day_id + '">' + data.data[i].day_spend + '</a>	</span>';

                            } else if (type == "newuser") {

                                list_str += '<span  style="width:10%"><a href="my_ach_list_show.html?title=新增玩家&type=2&id=' + data.data[i].tg_bind_id + '">' + data.data[i].day + '日</a>	</span>';
                                //list_str += '<span  style="width:15%"><a href="my_ach_list_show.html?title=新增玩家&type=2&id='+data.data[i].tg_bind_id+'">'+data.data[i].role_name+'</a>	</span>';
                                list_str += '<span  style="width:30%"><a href="my_ach_list_show.html?title=新增玩家&type=2&id=' + data.data[i].tg_bind_id + '">' + data.data[i].user_account + '</a>	</span>';
                                list_str += '<span  style="width:22%"><a href="my_ach_list_show.html?title=新增玩家&type=2&id=' + data.data[i].tg_bind_id + '">' + data.data[i].app_name + '</a>	</span>';
                                list_str += '<span  style="width:30%"><a href="my_ach_list_show.html?title=新增玩家&type=2&id=' + data.data[i].tg_bind_id + '">' + data.data[i].time + '</a>	</span>';

                            } else if (type == "payuser") {
                                list_str += '<span style="width:10%"><a href="my_ach_list_show.html?title=付费玩家&type=3&id=' + data.data[i].tg_day_id + '">' + data.data[i].day + '日</a>	</span>';
                                list_str += '<span style="width:22%"><a href="my_ach_list_show.html?title=付费玩家&type=3&id=' + data.data[i].tg_day_id + '">' + data.data[i].user_account + '</a>	</span>';
                                list_str += '<span style="width:22%"><a href="my_ach_list_show.html?title=付费玩家&type=3&id=' + data.data[i].tg_day_id + '">普通注册</a>	</span>';
                                list_str += '<span style="width:22%"><a href="my_ach_list_show.html?title=付费玩家&type=3&id=' + data.data[i].tg_day_id + '">' + data.data[i].app_name + '</a>	</span>';
                                list_str += '<span style="width:22%"><a href="my_ach_list_show.html?title=付费玩家&type=3&id=' + data.data[i].tg_day_id + '">' + data.data[i].day_spend + '</a>	</span>';
                            }
                            list_str += '</div>';
                        }
                    } else {
                        list_str += '<div class="item-list bg_white" >暂无数据显示</div>';
                    }
                    $("#all_list").append(list_str);
                }
            }
        }
    });
}
//获取详细信息
function get_tg_content(id, type) {
    isTgUser();
    $.ajax({
        url: http_url + "tg/income/get_ach_show/" + id + "?type=" + type,
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.retcode == 1000) {
                layer.msg("您还未登录！", function() {
                    location.href = "login.html";
                });
            } else {
                if (data.retcode == 0) {
                    content_str = '';
                    if (data.data) {
                        var date_str = data.data.date_s + "  <span>星期" + data.data.week + "</span>";
                        $(".date-s").html(date_str);
                        if (type == "myach") {
                            content_str += '<li>' + data.data.role_name + '</li>';
                            content_str += '<li>' + data.data.user_account + '</li>';
                            content_str += '<li>' + data.data.app_name + '</li>';
                            content_str += '<li>' + data.data.role_level + '级</li>';
                            content_str += '<li>充值游戏  ' + data.data.day_spend + '元</li>';
                            content_str += '<li>分成比例  ' + data.data.rate + '%</li>';
                            content_str += '<li>获得业绩  ' + data.data.my_arch + '元</li>';
                            $("#d_num").html(data.data.day_spend);

                        } else if (type == "newuser") {
                            content_str += '<li>' + data.data.role_name + '</li>';
                            content_str += '<li>' + data.data.user_account + '</li>';
                            content_str += '<li>' + data.data.app_name + '</li>';
                            content_str += '<li>手机注册 18657193154</li>';
                            content_str += '<li>绑定手机  18657193154</li>';
                            $("#d_num").html(data.data.time);
                            $("#d_num").css('color', '#333');
                        } else if (type == "payuser") {
                            content_str += '<li>' + data.data.user_account + '</li>';
                            content_str += '<li>帐号注册</li>';
                            content_str += '<li>KOM测试服</li>';
                            content_str += '<li>' + data.data.app_name + '</li>';
                            content_str += '<li>绑定手机  未绑定</li>';
                            content_str += '<li>充值游戏   ' + data.data.day_spend + '元</li>';
                            $("#d_num").html('');
                        }
                    } else {
                        content_str += '<div class="item-list bg_white">暂无数据显示</div>';
                    }

                    $("#show_content").html(content_str);
                }
            }
        }
    });
}
//获取我的玩家
function get_player_list(year, month, page, pagesize) {
    isTgUser();
    $.ajax({
        url: http_url + "tg/income/my_player?&year=" + year + "&month=" + month + "&page=" + page + "&pagesize=" + pagesize,
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.retcode == 1000) {
                layer.msg("您还未登录！", function() {
                    location.href = "login.html";
                });
            } else {
                if (data.retcode == 0) {
                    list_str = '';
                    $("#pages").attr("data-pages", data.pages);
                    if (data.data.length > 0) {
                        list_str += '<div class="item-list bg_white" style="font-size:1rem;"><span style="width:10%">日期</span><span style="width:25%">角色</span><span style="width:22%">帐号</span><span style="width:25%">游戏</span><span style="width:10%">等级</span></div>';
                        for (var i = 0; i < data.data.length; i++) {
                            list_str += '<div class="item-list bg_white">';
                            list_str += '<span style="width:10%"><a href="my_ach_list_show.html?title=我的玩家&type=2&id=' + data.data[i].tg_bind_id + '">' + data.data[i].day + '日</a>	</span>';
                            list_str += '<span style="width:25%"><a href="my_ach_list_show.html?title=我的玩家&type=2&id=' + data.data[i].tg_bind_id + '">' + data.data[i].role_name + '</a>	</span>';
                            list_str += '<span style="width:22%"><a href="my_ach_list_show.html?title=我的玩家&type=2&id=' + data.data[i].tg_bind_id + '">' + data.data[i].user_account + '</a>	</span>';
                            list_str += '<span style="width:25%"><a href="my_ach_list_show.html?title=我的玩家&type=2&id=' + data.data[i].tg_bind_id + '">' + data.data[i].app_name + '</a>	</span>';
                            list_str += '<span style="width:10%"><a href="my_ach_list_show.html?title=我的玩家&type=2&id=' + data.data[i].tg_bind_id + '">' + data.data[i].role_level + '级</a>	</span>';
                            list_str += '</div>';
                        }
                    } else {
                        list_str += '<div class="item-list bg_white">暂无数据显示</div>';
                    }

                    $("#all_list").append(list_str);
                }
            }
        }
    });
}

function login(loginname, passwd, is_return) {
    var q_str = "loginname=" + loginname + "&passwd=" + passwd + "&is_return=" + is_return;
    $.ajax({
        url: http_url + "login/submit?" + q_str,
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.is_true) {
                layer.msg("登录成功！", { time: 2000 }, function() {
                    location.href = "d_spend2.html";
                });
            } else {
                layer.msg("登录失败！");
                return false;
            }
        }
    });
}

function register(loginname, passwd, passwd_two) {
    var q_str = "loginname=" + loginname + "&passwd=" + passwd + "&passwd_two=" + passwd_two + "&source=1&name_type=1";
    $.ajax({
        url: http_url + "register/submit?" + q_str,
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.is_true) {
                layer.msg("注册成功！", { time: 2000 }, function() {
                    location.href = "index.html";
                });
            } else {
                layer.msg("注册失败！");
                return false;
            }
        }
    });
}
//退出操作
function loginout() {
    $.ajax({
        url: http_url + "tg/user/loginout/",
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！"); },
        success: function(data) {
            if (data.retcode == 0) {
                layer.msg("退出成功！", { time: 2000 }, function() {
                    location.href = "login.html";
                });
            }

        }
    });
}
//切换操作
function tab_func(tab_btn_obj, tab_active, tab_content_obj) {
    $(tab_btn_obj).bind("click", function() {
        var ind = $(this).index();
        $(this).addClass(tab_active).siblings().removeClass(tab_active);
        $(tab_content_obj).eq(ind).show().siblings().hide();
    });
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    return r != null ? unescape(r[2]) : null;
}
