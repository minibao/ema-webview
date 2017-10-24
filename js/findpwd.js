$(document).ready(function(){

	/*var uname=getCookie("loginname");
    var nkname=getCookie("nickname");
    if(uname)
    {
    	var load=layer.load(1);
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
	        	layer.close(load);
	        }
	    });
    }*/

	$("#btn_forgetpwdnext").click(function(){
		var account = $("#txt_account").val();//下一步
		var re = /^1\d{10}$/
	   if (re.test(account)) {
		   $.ajax({		
				url:"https://"+localurl+"/ema-platform/member/sendNewPwd",
				type:"post",
				dataType:"json",
				data:{
					mobile:account
				},
				async:false,
				error:function(){
					layer.msg("请求失败");
				},
				success:function(data){
					if(data.message == "新密码已发送")
					{
						closeWebview.close(account);
					}else{
						layer.msg(data.message);
					}
				}
			});
	   } else {
		   layer.msg("请输入正确的手机号");
	   }
		
	});

	/*$("#getmsgyzm").click(function(){
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
			url:"https://passport."+weburl+"/findpwd/send_phone_findpwd_code?user_name="+encodeURIComponent(uname),
			type:"get",
			dataType:"jsonp",
			async:false,
			error:function(){
				layer.msg("请求失败");
			},
			success:function(data){
				if(data.is_true==true)		
				{
					layer.msg('验证码已发往手机'+phone+'，十分钟内有效');
					$("#getmsgyzm").after('<em class="btn_dxyzm" id="ungetmsgyzm">免费验证</em>');
					$("#getmsgyzm").remove();
					t=setInterval(function(){
						$("#ungetmsgyzm").html("（"+i+"）验证");
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

	$("#btn_forgetpwdnext2").click(function(){
		var phone=$("#userbindphone").html();
		var uname=$("#txt_account").val();
		var load=layer.load(1);
		if(!uname)
		{
			uname=getCookie("loginname");
		}
		var phoneyzm=$("#phoneyzm").val();
		$.ajax({		
			url:"https://passport."+weburl+"/findpwd/check_phone_code?code="+encodeURIComponent(phoneyzm)+"&user_name="+encodeURIComponent(uname),
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
				url:"https://passport."+weburl+"/findpwd/resetpwd?token="+token+"&passwd="+encodeURIComponent(upwd)+"&type=mobile",
				type:"get",
				dataType:"jsonp",
				async:false,
				error:function(){
					layer.msg("请求失败");
				},
				success:function(data){
					if(data.is_true==true)
					{
						layer.msg("密码修改成功！");
						$("#fpwd_step4").show().siblings().hide();
					}
					else
					{
						layer.msg(data.retmsg);
					}
					layer.close(load);
				}
			});
		}
	});*/
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
						layer.close(load);
		            }
		        });
			}
			else
			{
				if(data.is_true==2){
						layer.msg("帐号不存在");
				}else{
					layer.msg(data.retmsg);
				}
				
				flag=false;
				layer.close(load);
			}
		}
	});
}
