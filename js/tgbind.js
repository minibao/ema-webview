$(document).ready(function(){
		//判断是否是已经绑定过的
		var uuid = getCookie("uuid")?getCookie("uuid"):'';
		query_str = "uuid="+uuid;
		$.ajax({
			url:"https://passport."+weburl+"/tg/app/check_bind?"+query_str,
			type:"get",
			dataType:"jsonp",
			error: function(){layer.msg("请求失败！")},
			success: function(data){
				if(data.retcode==1000)
				{
					layer.msg("您还未登录！");
					return false;
				}
				else
				{
					if(data.retcode==1)
					{
						$("#code-2").html(data.code);
						$("#code_text").hide();
						$("#succtip").hide();
						$("#bindedtip").show();
						return false;
					}else{
						$("#code_text").show();
						$("#succtip").hide();
						$("#bindedtip").hide();
						return false;
					}
				}
			}
		});
	
	/********推广用户兑换激活码：**********/
	$("#btn_bind_tg").click(function(){
	//code partition_id  server_id 	//role_name
	//role_id     //role_level     //uuid     //loginname
		var code = $("#txt_code").val();
		var loginname = getCookie("loginname")?getCookie("loginname"):'';
		var partition_name = getCookie("serverName")?getCookie("serverName"):"";
		var partition_id = getCookie("serverId")?getCookie("serverId"):0;
		var rolename = getCookie("roleName")?getCookie("roleName"):'';
		var rolelevel = getCookie("roleLevel")?getCookie("roleLevel"):0;
		var roleid = getCookie("roleId")?getCookie("roleId"):1001;
		var uuid = getCookie("uuid")?getCookie("uuid"):'';
		if(code==""){
			layer.msg("兑换码不能为空！");
			return  false;
		}
		var query_str  = "code="+encodeURIComponent(code);
			  query_str += "&partition_name="+partition_name+"&partition_id="+partition_id;
			  query_str += "&role_name="+encodeURIComponent(rolename)+"&role_level="+rolelevel;
			  query_str += "&role_id="+roleid+"&uuid="+uuid+"&loginname="+loginname;
		$.ajax({
			url:"https://passport."+weburl+"/tg/app/binduser?"+query_str,
			type:"get",
			dataType:"jsonp",
			error: function(){layer.msg("请求失败！")},
			success: function(data){
				if(data.retcode==1000)
				{
					layer.msg("您还未登录！");
					return false;
				}
				else
				{
					if(data.retcode==1)
					{
						$("#code-2").html(data.code);
						$("#code_text").hide();
						$("#succtip").hide();
						$("#bindedtip").show();
						return false;
					}
					else if(data.retcode==0)
					{
						$("#code-1").html(data.code);
						$("#code_text").hide();
						$("#succtip").show();
						$("#bindedtip").hide();
						return false;
					}else{
						layer.msg(data.retmsg);
						return false;
					}
				}
			}
		});
	});
		});