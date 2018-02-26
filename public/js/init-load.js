/**
 * 初始加载cookie中的用户数据
 */
if ($.cookie('username')) {
    // 设置显示样式
    $("#isSignin").css("display", "none");
    $("#isSignout").css("display", "inline");
    $('.price').css("display", "inline");

    // 显示欢迎语
    $("#welcom").html(`你好，${$.cookie('username')}`);
}
