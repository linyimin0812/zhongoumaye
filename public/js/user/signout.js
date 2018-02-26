/**
 * 用户退出
 */
function signout(){
    // 调用退出登录接口，删除后台session数据
    $.ajax({
        url: "http://localhost:8001/user/signout",
        method: 'POST',
        success: function(data){
            // 删除浏览器cookie数据
            $.removeCookie('username');

            // 设置显示样式
            $("#isSignin").css("display", "inline");
            $("#isSignout").css("display", "none");
            $('.price').css("display", "none");
            
            alert(data.data);
        },
        error: function(jqHXR, textStatus, errorThrown){
            alert(errorThrown);
        }
    });
}