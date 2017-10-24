var limit=10;
$(document).ready(function(){
	var curDate = new Date();
	var start_date=getdate(1);
	curDate=curDate.Format("yyyy-MM-dd");
	getpaylist(start_date,curDate,1);

	$("#btn_search").click(function(){			//历史记录查询
		getpaylist(1);
	});

	$("#beginTime").change(function(){
		start_date=getdate($(this).val());
		getpaylist(start_date,curDate,1);
	});
})

function getpaylist(start_date,end_date,page)			//查询历史记录
{
	var appid=getCookie("appid");
	var load=layer.load(1);
	limit=20;
	$.ajax({
		url:"https://passport."+weburl+"/orders/history?page="+page+"&limit="+limit+"appid"+appid,
		type:"get",
		data:"start_date="+encodeURIComponent(start_date)+"&end_date="+encodeURIComponent(end_date),
		dataType:"jsonp",
		error: function(){layer.msg("请求失败！")},
		success: function(data){
			if(data.retcode==1000)
			{
				layer.msg("您还未登录！");
			}
			else
			{
				var paylisthtml="";
				if(data.order_list.length==0)
				{
					paylisthtml+='<li>';
					paylisthtml+='<span class="lineform">没有充值记录！</span>';
					paylisthtml+='</li>';
				}
				else
				{
					$.each(data.order_list,function(i,v){
						paylisthtml+='<li><span class="lineform">充值'+data.order_list[i].amount+'马币<span id="" class="rightinfo rightdate">'+data.order_list[i].operate_ts+'</span><i class="icoin tb_pullright"></i></span></li>';
					});
				}
				$("#orderlist").html(paylisthtml);
			}
			layer.close(load);
		}
	});
}

function getdate(num)
{
	var curDate = new Date(); 
	var preDate = new Date(curDate.getTime() - num*24*60*60*1000); 
	return preDate.Format("yyyy-MM-dd");
}

Date.prototype.Format = function(formatStr)   
{   
    var str = formatStr;   
    var Week = ['日','一','二','三','四','五','六'];  
  	var gmonth=this.getMonth()+1;
    str=str.replace(/yyyy|YYYY/,this.getFullYear());   
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
  
    str=str.replace(/MM/,gmonth>9?gmonth.toString():'0' + gmonth);   
    str=str.replace(/M/g,gmonth);   
  
    str=str.replace(/w|W/g,Week[this.getDay()]);   
  
    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
    str=str.replace(/d|D/g,this.getDate());   
  
    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
    str=str.replace(/h|H/g,this.getHours());   
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
    str=str.replace(/m/g,this.getMinutes());   
  
    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
    str=str.replace(/s|S/g,this.getSeconds());   
  
    return str;   
}   