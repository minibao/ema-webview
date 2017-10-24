var flag = false;
$(document).ready(function() {
    var isbind = getCookie("isbind");
    //alert("isbind="+isbind)


    /*----------绑定手机---------*/
    $("#btn_bind_phone").click(function() {
        var phone = $("#txt_mobile").val(),
            code = $("#txt_code").val();
        cookieDeviceType = getCookie("deviceType");
        cookieDeviceKey = getCookie("deviceKey");

        var reg = /(1[3|4|5|7|8]\d{9})/;
        var load = layer.load(1);
        if (!checkmobile(phone)) {
            layer.close(load);
            return false;
        }
        $.ajax({
            url: "https://" + localurl + "/ema-platform/member/bindAccount",
            type: "post",
            dataType: "json",
            data: {
                accountType: 1,
                mobile: phone,
                deviceType: cookieDeviceType,
                deviceKey: cookieDeviceKey,
                captcha: code
            },
            error: function() {
                layer.msg("请求失败！")
            },
            success: function(data) {
                layer.msg(data.message);
                layer.close(load);
            }
        });
    });

    $("#getmsgyzm").click(function() {
        var phone = $("#txt_mobile").val();
        var load = layer.load(1);
        if (isbind == "1") {
            $.ajax({
                url: "https://" + localurl + "/ema-platform/notice/sendCaptcha",
                type: "post",
                dataType: "json",
                data: {
                    mobile: phone
                },
                error: function() { layer.msg("请求失败！") },
                success: function(data) {
                    layer.msg(data.message);
                    layer.close(load);
                }
            });
        } else {
            $.ajax({
                url: "https://" + localurl + "/ema-platform/notice/sendCaptcha",
                type: "post",
                dataType: "json",
                data: {
                    mobile: phone
                },
                error: function() { layer.msg("请求失败！") },
                success: function(data) {
                    layer.msg(data.message);
                    layer.close(load);
                }
            });
        }
    });
    /*$("#txt_mobile").keyup(function(){
    	if($(this).val().length==11)
    	{
    		checkphone($(this).val());
    	}
    })

    var t0;
	

    -----------更换手机绑定------------
    var t1;
    $("#getmsgyzm1").live("click",function(){
    	var load=layer.load(1);
    	clearInterval(t1);
    	var i=120;
    	$(this).after('<em class="btn_dxyzm" id="ungetmsgyzm1">免费验证</em>');
    	$(this).remove();
    	t1=setInterval(function(){
    		$("#ungetmsgyzm1").html("免费验证（"+i+"）"); 
    		i--;
    		if(i==0)
    		{
    			clearInterval(t1);
    			$("#ungetmsgyzm1").after('<em class="btn_dxyzm" id="getmsgyzm1">免费验证</em>');
    			$("#ungetmsgyzm1").remove();
    		}
    	},1000);
    	$.ajax({
    		url:"https://passport."+weburl+"/bind/send_phone_code",
    		type:"get",
    		dataType:"jsonp",
    		error: function(){alert("请求失败！")},
    		success: function(data){
    			if(data.retcode==1000)
    			{
    				layer.msg("您还未登录！");
    			}
    			else
    			{
    				if(data.is_true==false)
    				{
    					layer.msg(data.retmsg);
    				}
    				else
    				{
    					layer.msg("短信已发送，请注意查收");
    				}
    			}
    			layer.close(load);
    		}
    	});
    });

    $("#checkoldmobile").click(function(){
    	var code=$("#txt_oldcode").val();
    	var load=layer.load(1);
    	$.ajax({
    		url:"https://passport."+weburl+"/bind/check_curr_phone?code="+encodeURIComponent(code),
    		type:"get",
    		dataType:"jsonp",
    		error: function(){layer.msg("请求失败！")},
    		success: function(data){
    			if(data.retcode==1000)
    			{
    				layer.msg("您还未登录！");
    			}
    			else
    			{
    				if(data.is_true==false)
    				{
    					layer.msg(data.retmsg);
    				}
    				else
    				{
    					$("#bindstep2").show().siblings("#bindstep1").hide();
    					$(".steppoint").eq(1).addClass("onstep").siblings(".steppoint").removeClass("onstep");
    				}
    			}
    			layer.close(load);
    		}
    	});
    });
	
    $("#txt_newmobile").blur(function(){
    	var mobile=$(this).val();
    	var load=layer.load(1);
    	if(!mobile)
    	{
    		layer.msg("请输入新手机号码");
    		layer.close(load);
    		return false;
    	}
    	$.ajax({
    		url:"https://passport."+weburl+"/index.php/register/check_loginname?loginname="+encodeURIComponent(mobile),
    		type:"get",
    		dataType:"jsonp",
    		error: function(){layer.msg("请求失败！")},
    		success: function(data){
    			if(data.retcode==1000)
    			{
    				layer.msg("您还未登录！");
    			}
    			else
    			{
    				if(data.is_true!=2)		//帐号已存在
    				{
    					layer.msg("该手机号码已被绑定！");
    				}
    				else
    				{
    					if(!checkmobile(mobile))
    					{
    						$("#getmsgyzm2").after('<em class="btn_dxyzm" id="ungetmsgyzm2">免费验证</em>');
    						$("#getmsgyzm2").remove();
    					}
    					else
    					{
    						$("#ungetmsgyzm2").after('<em class="btn_dxyzm" id="getmsgyzm2">免费验证</em>');
    						$("#ungetmsgyzm2").remove();
    					}
    				}
    			}
    			layer.close(load);
    		}
    	});
    });

    var t2;
    $("#getmsgyzm2").live("click",function(){
    	var load=layer.load(1);
    	clearInterval(t2);
    	if(!checkmobile($("#txt_newmobile").val()))
    	{
    		layer.close(load);
    		return false;
    	}
    	var i=120;
    	var mobile=$("#txt_newmobile").val();
    	$(this).after('<em class="btn_dxyzm" id="ungetmsgyzm2">免费验证</a>');
    	$(this).remove();
    	t2=setInterval(function(){
    		$("#ungetmsgyzm2").html("免费验证（"+i+"）"); 
    		i--;
    		if(i==0)
    		{
    			clearInterval(t2);
    			$("#ungetmsgyzm2").after('<em class="btn_dxyzm" id="getmsgyzm2">免费验证</a>');
    			$("#ungetmsgyzm2").remove();
    		}
    	},1000);
    	$.ajax({
    		url:"https://passport."+weburl+"/bind/send_phone_code?mobile="+encodeURIComponent(mobile),
    		type:"get",
    		dataType:"jsonp",
    		error: function(){layer.msg("请求失败！")},
    		success: function(data){
    			if(data.retcode==1000)
    			{
    				layer.msg("您还未登录！");
    			}
    			else
    			{
    				if(data.is_true==false)
    				{
    					layer.msg(data.retmsg);
    				}
    				else
    				{
    					layer.msg("短信已发送，请注意查收");
    				}
    			}
    			layer.close(load);
    		}
    	});
    	
    });
	
    $("#checknewmobile").click(function(){
    	var mobile=$("#txt_newmobile").val();
    	var code=$("#txt_newcode").val();
    	var reg = /(\d{3})\d{4}(\d{4})/;
    	var load=layer.load(1);
    	$.ajax({
    		url:"https://passport."+weburl+"/bind/check_new_phone?mobile="+encodeURIComponent(mobile)+"&code="+encodeURIComponent(code),
    		type:"get",
    		dataType:"jsonp",
    		error: function(){layer.msg("请求失败！")},
    		success: function(data){
    			if(data.retcode==1000)
    			{
    				layer.msg("您还未登录！");
    			}
    			else
    			{
    				if(data.is_true==false)
    				{
    					layer.msg(data.retmsg);
    				}
    				else
    				{
    					$("#succtip").show().siblings().hide();
    				}
    			}
    			layer.close(load);
    		}
    	});
    });*/

})

function checkmobile(phonenume) //验证手机号码
{
    if (phonenume == '') {
        layer.msg("请输入正确的手机号码");
        return false;
    }
    if (phonenume.length != 11) {
        layer.msg("请输入正确的手机号码");
        return false;
    }
    var tel = /^1\d{10}$/;
    if (!tel.test(phonenume)) {
        layer.msg("请输入正确的手机号码");
        return false;
    }
    return true;
}

function checkphone(mobile) {
    var load = layer.load(1);
    $.ajax({
        url: "https://passport." + weburl + "/index.php/register/check_loginname?loginname=" + encodeURIComponent(mobile),
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！") },
        success: function(data) {
            if (data.retcode == 1000) {
                layer.msg("您还未登录！");
            } else {
                if (data.is_true != 2) //帐号已存在
                {
                    layer.msg("该手机号码已被绑定！");
                } else {
                    flag = true;
                }
            }
            layer.close(load);
        }
    });
}
