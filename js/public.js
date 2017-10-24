var localurl="testing-platform.lemonade-game.com:8443";

function setCookie ( name, value )
{
    expires = new Date();
    expires.setTime(expires.getTime() + (1000 * 86400 * 365));
    document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString() + "; path=/; domain=.lemonade-game.com;";
}

// function to delete a cookie
function delCookie(name)  
{  
    var exp = new Date();  
    exp.setTime(exp.getTime() - 1);  
    var cval=getCookie(name);  
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+"; path=/; domain=.lemonade-game.com;";
}   

function getCookie (name)
{
    cookie_name = name + "=";
    cookie_length = document.cookie.length;
    cookie_begin = 0;
    while (cookie_begin < cookie_length)
    {
        value_begin = cookie_begin + cookie_name.length;
        if (document.cookie.substring(cookie_begin, value_begin) == cookie_name)
        {
            var value_end = document.cookie.indexOf (";", value_begin);
            if (value_end == -1)
            {
                value_end = cookie_length;
            }
            return decodeURIComponent(document.cookie.substring(value_begin, value_end));
        }
        cookie_begin = document.cookie.indexOf(" ", cookie_begin) + 1;
        if (cookie_begin == 0)
        {
            break;
        }
    }
    return null;
}

function userpwdblur(upwd)     //密码验证
{
    if(upwd == ''){
        layer.msg("还没有输入密码哦！");
        return false;
    }
    
    if (upwd.length<6||upwd.length>16){
        layer.msg("密码位数不对哦！");
        return false;
    }
    
    /*var uname = $("#useraccount").val();
    if(uname == upwd){
        showtips("userpwd","密码不能和用户名相同哦！","errtips");
        return false;
    }*/
    if (isContinuousChar(upwd) || isSameChar(upwd))
    {
        layer.msg("密码太简单啦！");
        return false;
    }
    if(!ckpwd(upwd))
    {
        layer.msg("不能有空格,逗号,单双引号和中文");
        return false;
    }
    return true;
}

//密码不能包含空格,逗号,单双引号
 function ckpwd(str)
 {
     var reg= /^[^\s,'\"\u4e00-\u9fa5]{6,16}$/;
     if(!reg.test(str))
     {
         return false;
     }
     return true;
 }
 
//连续字符
function isContinuousChar(str){
    var str = str.toLowerCase();
    var flag = 0;
    for(var i=0;i<str.length;i++){
        if(str.charCodeAt(i) != flag+1 && flag!=0)
            return false;
        else
            flag = str.charCodeAt(i);
    }
    return true;
}

//重复字符
function isSameChar(str){
    var str = str.toLowerCase();
    var flag = 0;
    for(var i=0;i<str.length;i++){
        if(str.charCodeAt(i) != flag && flag!=0)
            return false;
        else
            flag = str.charCodeAt(i);
    }
    return true;
}


getUrlParam = function(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = decodeURI(window.location.search).substr(1).match(reg);
    return r!=null ? unescape(r[2]) : null;
}