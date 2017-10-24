$(document).ready(function(){
	$("#btn_chgpwd").click(function(){		//修改密码提交
		var cur_passwd=$("#cur_passwd").val(),
		new_passwd=$("#new_passwd").val();
		var token = getCookie("token");
		if(!userpwdblur(new_passwd))
		{
			return false;
		}
		var load=layer.load(1);
		$.ajax({
			url:"https://"+localurl+"/ema-platform/member/modifyPwd",
			type:"post",
			dataType:"json",
			data:{
				token:token,
				oldPwd:encodeURIComponent(cur_passwd),
				pwd:encodeURIComponent(new_passwd)
			},
			
			success: function(data){
				
				layer.msg(data.message);
				layer.close(load);
				
			},
			error: function(){
			layer.msg("tommy -请求失败！")
			layer.close(load);
			},
			
		});
	});
});