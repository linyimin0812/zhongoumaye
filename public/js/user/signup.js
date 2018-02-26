$.validator.setDefaults({
	submitHandler: function () {
		// 获取表单数据
		let data = $("#signupForm").serialize();
		// 提交注册数据
		$.ajax({
			url: "http://localhost:8001/user/signup",
			method: "POST",
			dataType: "json",
			data: data,
			success: function(data){
				// 成功注册
				if(data.result === true){
					// 注册窗口隐藏
					$('#signupModal').modal('hide')
					// 将用户数据保存在cookie中
					$.cookie("username", data.data.username	);

					//  设置显示样式
					$("#isSignin").css("display", "none");
					$("#isSignout").css("display", "inline");
					$('.price').css("display", "block");
					
					// 显示欢迎语
					$("#welcom").html(`你好，${$.cookie('username')}`);
				}else{
					alert("注册失败，请重试");
				}

			},
			error: function(jqXHR, textStatus,errorThrown){
				alert(errorThrown);
			}
		});
	}
});
$().ready(function () {
	// 在键盘按下并释放及提交后验证提交表单
	$("#signupForm").validate({
		rules: {
			username: {
				required: true,
				minlength: 2,
				remote: {
					url: "http://localhost:8001/user/isExist",
					type: "post",
					dataType: "json",
					data: {
						username: function () {
							return $("#username").val();
						}
					},
					dataFilter: function (type) {
						if (type === "true") {
							return false;
						}
						return true;
					}
				}
			},
			password: {
				required: true,
				minlength: 3
			},
			repeatPassword: {
				required: true,
				equalTo: "#password"
			},
			tel: {
				required: true,
				digits: true,
				minlength: 11,
				maxlength: 11,
			}
		},
		messages: {
			username: {
				required: "请输入用户名",
				minlength: "用户名必需由两个字母组成",
				remote: "用户名已经存在"
			},
			password: {
				required: "请输入密码",
				minlength: "密码长度不能小于 3 个字母"
			},
			repeatPassword: {
				required: "请输入密码",
				equalTo: "两次密码输入不一致"
			},
			tel: {
				required: "请输入手机号码",
				digits: "请输入手机号码",
				minlength: "请输入手机号码",
				maxlength: "请输入手机号码"
			}
		}
	});
});