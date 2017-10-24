$(document).ready(function(){

	var uname=getCookie("loginname");
    var nkname=getCookie("nickname");
    //var load=layer.load(1);
    if(uname)
    {
		$.ajax({
	        url:"https://passport."+weburl+"/bind/is_bind_phone",
	        type:"get",
	        dataType:"jsonp",
	        error: function(){layer.msg("请求失败！")},
	        success: function(data){
	            
	                	$("#fpwd_step2").show().siblings().hide();
	                    $("#userbindphone").html(data.mobile);
	                
	        	layer.close(load);
	        }
	    });
    }

	$("#getmsgyzm").live("click",function(){
		var phone=$("#userbindphone").html();
		var uname=$("#txt_account").val();
		var load=layer.load(1);
		if(!uname)
		{
			uname=getCookie("loginname");
		}
		var t,i=120;
		clearInterval(t);
		$.ajax({		
			url:"https://passport."+weburl+"/paysecure/findpwd_mobile",
			type:"get",
			dataType:"jsonp",
			async:false,
			error:function(){
				layer.msg("请求失败");
			},
			success:function(data){
				if(data.is_true==true)		//帐号存在
				{
					layer.msg('验证码已发往手机'+phone+'，十分钟内有效');
					$("#getmsgyzm").after('<em class="btn_dxyzm" id="ungetmsgyzm">免费验证</em>');
					$("#getmsgyzm").remove();
					t=setInterval(function(){
						$("#ungetmsgyzm").html("免费验证（"+i+"）");
						i--;
						if(i==0)
						{
							clearInterval(t);
							$("#ungetmsgyzm").after('<em class="btn_dxyzm" id="getmsgyzm">免费验证</em>');
							$("#ungetmsgyzm").remove();
						}
					},1000);
				}
				else
				{
					layer.msg(data.retmsg);
				}
				layer.close(load);
			}
		});
	});

	$("#btn_forgetpwdnext2").live("click",function(){
		var phone=$("#userbindphone").html();
		var phoneyzm=$("#phoneyzm").val();
		var load=layer.load(1);
		$.ajax({		
			url:"https://passport."+weburl+"/paysecure/check_phone_code?code="+encodeURIComponent(phoneyzm),
			type:"get",
			dataType:"jsonp",
			async:false,
			error:function(){
				layer.msg("请求失败");
			},
			success:function(data){
				if(data.is_true==true)
				{
					$("#fpwd_step3").show().siblings().hide();
					$("#phonetoken").val(data.token);
				}
				else
				{
					layer.msg(data.retmsg);
				}
				layer.close(load);
			}
		});
	});

	$("#btn_forgetpwdnext3").click(function(){
		var upwd=$("#txt_fpwd").val();
		var token=$("#phonetoken").val();
		if(userpwdblur(upwd))
		{
			var load=layer.load(1);
			$.ajax({		
				url:"https://passport."+weburl+"/paysecure/reset_paypwd?token="+token+"&passwd="+encodeURIComponent(upwd)+"&type=mobile",
				type:"get",
				dataType:"jsonp",
				async:false,
				error:function(){
					layer.msg("请求失败");
				},
				success:function(data){
					if(data.is_true==true)
					{
						layer.msg("钱包密码修改成功！");
					}
					else
					{
						layer.msg(data.retmsg);
					}
					layer.close(load);
				}
			});
		}
	});
});
function checkuname(uname)		//验证用户帐号 issubmit=0是提交，否则只检测用户名
{
	var load=layer.load(1);
	if(uname=="")
	{
		layer.msg('帐号不能为空！');
		layer.close(load);
		return false;
	}
	$.ajax({		
		url:"https://passport."+weburl+"/index.php/register/check_loginname?loginname="+encodeURIComponent(uname),
		type:"get",
		dataType:"jsonp",
		async:false,
		error:function(){
			layer.msg("请求失败");
		},
		success:function(data){
			if(data.is_true==1)		//帐号存在
			{
				$.ajax({
		            url:"https://passport."+weburl+"/findpwd/is_bind_phone?username="+uname,
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
		                    if(data.is_true==true)
		                    {
		                    	$("#fpwd_step2").show().siblings().hide();
		                        $("#userbindphone").html(data.mobile);
		                    }
		                    else
		                    {
		                        $("#fpwd_step_none").show().siblings().hide();
		                    }
		                }
		            }
		        });
			}
			else
			{
				layer.msg("帐号不存在！");
				flag=false;
			}
			layer.close(load);
		}
	});
}