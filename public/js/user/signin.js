function signin(){

    // 获取表单数据并实现序列化
    let data = $("#signinForm").serialize();
    // 发送ajax请求实现登录
    $.ajax({
        url: "http://localhost:8001/user/signin",
        method: "POST",
        dataType: 'json',
        data: data,

        // 请求成功
        success: function(data){
            if(data.result === true){
                $.cookie("username", data.data.username);
                // 隐藏登录窗口
                $('#signinModal').modal('hide');
                // 设置显示样式
				$("#isSignin").css("display", "none");
				$("#isSignout").css("display", "inline");
                $('.price').css("display", "block");

                // 显示欢迎语
				$("#welcom").html(`你好，${$.cookie('username')}`);
            }else{
                // 密码或用户名出错
                let text = data.reason;
                $("#addPromote").html(text);
                $("#addPromote").css("display", "block");
            } 
        },
        // 请求错误
        error: function(jqXHR, textStatus, errorThrown){
            alert("登录错误，请重试");
        }
    });
}