$(function () {　
    //banner图动画
    showTitle();
    showList();

    function showTitle() {
        contTitle = setTimeout(function () {
            $(".banner h2").addClass("fadeInLeft");
        }, 500)
    }

    function showList() {
        contList = setTimeout(function () {
            $(".banner p").addClass("fadeInLeft")
        }, 800)
    }

    // 免费课程 切换
    course_btn();

    function course_btn() {
      
        $("#course-wrap").on("mouseover", function () {
          
                $(".course-nav").show();

        })
        $("#course-wrap").on("mouseout", function () {
            
                $(".course-nav").hide();

        })
        $(".course-nav").on("click", function () {
            $(".course-nav").hide();
            
        })
    }　
    // 点击刷新验证码
    $(".img-yanzheng").on("click", function () {
        var newSrc = $(this).attr("src");
        $(this).attr("src", newSrc + "?v=" + Math.random());
    })
    //登录注册

    // 注册

    register();
    acc_login();
    phone_login();

    function register() {
        var code_sending = false, //正在请求，不能重复请求，初始值为false
            count_down = false; //验证码发送成功后，进入倒计时，初始值为false
        // 注册页获取验证码
        $("#register-code").on("click", function () {
            if (code_sending || count_down) return;
            var phone = $("#register .phone").val();
            var img = $("#register .img").val();
            // 获取验证码
            if (!phone) {
                $(".phone-error").show().text("手机号码不能为空");

            } else if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(phone))) {
                $(".phone-error").show().text("手机号码格式错误");
            }
            if (!img) {
                $(".img-error").show().text("请输入图形验证码");

            }
            $.ajax({
                url: "/Home/Api/ajaxCheckVerify",
                type: "post",
                dataType: "json",
                data: {
                    verify: img
                },
                success: function (data) {
                    if (data.status === 1) {
                        $(".img-error").hide();
                        var code_btn = $("#register-code");
                        code_sending = true;
                        $.ajax({
                            url: '/audition/sendmsg',
                            type: "post",
                            dataType: "json",
                            data: {
                                mobile: phone
                            },
                            success: function (data) {
                                $(".phone-error").hide();
                                code_sending = false
                                if (data.status == 1) { //后台发送验证码成功
                                    count_down = true; //进入倒计时，60s可以重新发送验证码
                                    code_left_time(code_btn, 60);

                                    function code_left_time(el, t) { //发送验证码成功进入倒计时功能
                                        el.html(t + 's后重新发送')
                                        var timer = setInterval(function () {
                                            t--;
                                            if (t == 0) {
                                                el.html('重新发送').removeClass(
                                                    'disabled');
                                                count_down = false; //倒计时结束 
                                                clearInterval(timer);
                                            } else {
                                                el.html(t +
                                                    's后重新发送');
                                            }
                                        }, 1000);
                                    }
                                } else {
                                    $(".phone-error").show().text('"' + data.info + '"');
                                }
                            }
                        })
                    } else {
                        $(".img-error").show().text('"' + data.info + '"');
                    }
                }
            })

        })
        // 点击注册
        $("#register-btn").on("click", function () {
            var phone = $("#register .phone").val();
            var img = $("#register .img").val();
            var code = $("#register .code").val();
            var password = $("#register .password").val();
            var confirmPassword = $("#register .confirm-paddword").val();
            var obj = $("#register").serialize();
            if (!phone) {
                $(".phone-error").show().text("手机号码不能为空");

            } else if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(phone))) {
                $(".phone-error").show().text("手机号码格式错误");
            }
            if (!img) {
                $(".img-error").show().text("请输入图形验证码");
            }
            if (!code) {
                $(".code-error").show().text("请输入验证码");
            }
            if (!password) {
                $(".password-error").show().text("请输入密码");
            }
            if (!confirmPassword) {
                $(".confirm-password-error").show().text("请再次输入密码");
            }
            if (password !== confirmPassword) {
                $(".confirm-password-error").show().text("两次密码不一致");
            }
            if (phone && img && code && password && confirmPassword) {
                $.ajax({
                    type: "POST",
                    url: "/home/Register/ajaxRegister",
                    data: obj, // 要提交的表单
                    success: function (data) {
                        if (data.status == 1) {
                            $("input").text("");
                            $(".error").hide();
                            $("#register").hide();
                            $("#acc-login").show();
                            
                            location.reload();
                        } else {
                            alert(data.info);
                        }
                    },
                    error: function (error) {
                        alert("提交失败")
                    }
                });
            }

        })
        //获取到焦点时，对应的错误提示消失
        $("#register input").on("focus",function(){
            var fla = $(this).attr("class");
            $("."+fla+"-error").hide();
        })
        // 再次输入密码添加事件
        $(".confirm-paddword").on("input",function(){
            var password = $("#register .password").val();
            var confirmPassword = $("#register .confirm-paddword").val();
            if(password !== confirmPassword){
                $(".confirm-password-error").show().text("密码不一致");
            }else{
                $(".confirm-password-error").hide();
            }
        })
    }
    //密码登录
    function acc_login() {
        $("#acc-loginr-btn").on("click", function () {
            var username = $("#acc-login input[name='username']").val();
            var password = $("#acc-login input[name='password']").val();
            var obj = $("#acc-login").serialize();
            if (!password) {
                $("#acc-login .password-error").show().text("请输入密码");
            }
            if (!username) {
                $("#acc-login .phone-error").show().text("请输入手机号码/邮箱");
            } else if ((/^1[3|4|5|7|8][0-9]{9}$/.test(username)) || (/^[A-Za-z0-9-_\.]+\@([A-Za-z0-9-_]+\.)+[A-Za-z0-9]{2,6}$/.test(username))) {
                $("#acc-login .phone-error").hide()
            } else {
                $("#acc-login .phone-error").show().text("请输入正确的账号");
                return
            }
            if (username && password) {
                $.ajax({
                    type: "POST",
                    url: "/home/Login/accountLogin",
                    data: obj, // 要提交的表单
                    success: function (data) {
                        if (data.status == 1) {
                            $("input").text("");
                            $(".error").hide();
                            $("#acc-login").hide();
                            $(".personal-center").show();
                            
                            location.reload();
                        } else {
                            $("#acc-login .password-error").show().text('"' + data.info + '"');
                        }
                    },
                    error: function (error) {
                        alert("提交失败")
                    }
                });
            }
        })
    }
    // 手机快捷登录
    function phone_login() {
        var code_sending = false, //正在请求，不能重复请求，初始值为false
            count_down = false; //验证码发送成功后，进入倒计时，初始值为false
        // 获取验证码
        $("#phone-login .get-code").on("click", function () {
            if (code_sending || count_down) return;
            var mobile = $("#phone-login input[name='mobile']").val();
            var img = $("#phone-login .img-code").val();
            // 获取验证码
            if (!mobile) {
                $(".phone-error").show().text("手机号码不能为空");

            } else if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(mobile))) {
                $(".phone-error").show().text("手机号码格式错误");
            }
            if (!img) {
                $(".img-error").show().text("请输入图形验证码");

            }
            $.ajax({
                url: "/Home/Api/ajaxCheckVerify",
                type: "post",
                dataType: "json",
                data: {
                    verify: img
                },
                success: function (data) {
                    if (data.status === 1) {
                        $(".img-error").hide();
                        var code_btn = $("#phone-login .get-code");
                        code_sending = true;
                        $.ajax({
                            url: '/audition/sendmsg',
                            type: "post",
                            dataType: "json",
                            data: {
                                mobile: mobile
                            },
                            success: function (data) {
                                $(".phone-error").hide();
                                code_sending = false
                                if (data.status == 1) { //后台发送验证码成功
                                    count_down = true; //进入倒计时，60s可以重新发送验证码
                                    code_left_time(code_btn, 60);

                                    function code_left_time(el, t) { //发送验证码成功进入倒计时功能
                                        el.html(t + 's后重新发送')
                                        var timer = setInterval(function () {
                                            t--;
                                            if (t == 0) {
                                                el.html('重新发送').removeClass(
                                                    'disabled');
                                                count_down = false; //倒计时结束 
                                                clearInterval(timer);
                                            } else {
                                                el.html(t +
                                                    's后重新发送');
                                            }
                                        }, 1000);
                                    }
                                } else {
                                    $(".phone-error").show().text('"' + data.info + '"');
                                }
                            }
                        })
                    } else {
                        $(".img-error").show().text('"' + data.info + '"');
                    }
                }
            })

        })
        //点击快捷登录
        $("#phone-login-btn").on("click", function () {
            var mobile = $("#phone-login input[name='mobile']").val();
            var img = $("#phone-login .img-code").val();
            var code = $("#phone-login input[name='verify']").val();
            var obj = $("#phone-login").serialize();
            if (!mobile) {
                $("#phone-login .phone-error").show().text("请输入手机号码");
            } else if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(mobile))) {
                $("#phone-login .phone-error").show().text("请输入正确的手机号码");
            }
            if (!img) {
                $("#phone-login .img-error").show().text("请输入图形验证码");
            }
            if (!code) {
                $("#phone-login .code-error").show().text("请输入手机验证码");
            }
            if (mobile && img && code) {
                $.ajax({
                    type: "POST",
                    url: "/home/Login/mobileLogin",
                    data: obj, // 要提交的表单
                    success: function (data) {
                        if (data.status == 1) {
                            $("input").text("");
                            $(".error").hide();
                            $("#phone-login").hide();
                            $(".personal-center").show();
                            
                            location.reload();
                        } else {
                            alert(data.info);
                        }
                    },
                    error: function (error) {
                        alert("提交失败")
                    }
                });
            }
        })
    }


    // 已有账号直接登录
    $("#register .login-toggle").on("click", function () {
        $("#register").hide();
        $("#acc-login").show();
        $(".error").hide();
        $("input").text("");
    })
    $("#phone-login .login-toggle").on("click", function () {
        $("#phone-login").hide();
        $("#acc-login").show();
        $(".error").hide();
        $("input").text("");
    })
    $("#acc-login .login-toggle").on("click", function () {
        $("#acc-login").hide();
        $("#phone-login").show();
        $(".error").hide();
        $("input").text("");
    })
    $(".register-now").on("click", function () {
        $("#acc-login").hide();
        $("#phone-login").hide();
        $("#register").show();
        $(".error").hide();
        $("input").text("");
    })

});