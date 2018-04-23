$(function () {

    //banner部分动画
    // showTitle();
    // showList();

    // function showTitle() {
    //     contTitle = setTimeout(function () {
    //         $(".free-banner h2").addClass("freeLeft");
    //     }, 500)
    // }

    // function showList() {
    //     contList = setTimeout(function () {
    //         $(".free-banner p").addClass("freeLeft")
    //     }, 800)
    // }
    // // 刷新验证码
    // $("#applyForm img").on("click", function () {
    //     var newSrc = $("#applyForm img").attr("src");
    //     $("#applyForm img").attr("src", newSrc + "?v=" + Math.random())
    // })

    getCode()
    submit();
    // 获取验证码
    function getCode() {
        var code_sending = false, //正在请求，不能重复请求，初始值为false
            count_down = false; //验证码发送成功后，进入倒计时，初始值为false
        $('#getVerify').click(function () {
            if (code_sending || count_down) return;
            var name = $("#js-name").val();
            var phone = $("#js-phone").val();
            var img = $("#js-img").val();
            if (!name) {
                $(".error").show().children("span").text("姓名不能为空");
                timeout()
                return;
            } else if (!phone) {
                $(".error").show().children("span").text("手机号码不能为空");
                timeout()
                return;
            } else if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(phone))) {
                $(".error").show().children("span").text("手机号码格式错误");
                timeout()
                return
            } else if (!img) {
                $(".error").show().children("span").text("请输入图形验证码");
                timeout()
                return;
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
                        $(".error").hide();
                        var code_btn = $("#getVerify");
                        code_sending = true;
                        $.ajax({
                            url: '/audition/sendmsg',
                            type: "post",
                            dataType: "json",
                            data: {
                                mobile: phone
                            },
                            success: function (data) {
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
                                    $(".error").show().children("span").text(
                                        '"' +
                                        data.info + '"');
                                        timeout()
                                }
                            }
                        })
                    } else {
                        $(".error").show().children("span").text('"' + data.info + '"');
                        timeout()
                    }

                }

            })

        })


    }
    //领取免费课程
    function timeout(){
        setTimeout(function(){
            $(".error").hide();
        },3000)
    }
    function submit() {
        $(".sub-btn").on("click", function () {
            var name = $("#js-name").val();
            var phone = $("#js-phone").val();
            var img = $("#js-img").val();
            var verify = $("#js-yanzheng").val();

            if (!name) {
                $(".error").show().children("span").text("姓名不能为空");
                timeout()
                return;
            } else if (!phone) {
                $(".error").show().children("span").text("手机号码不能为空");
                timeout()
                return;
            } else if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(phone))) {
                $(".error").show().children("span").text("手机号码格式错误");
                timeout()
                return
            } else if (!img) {
                $(".error").show().children("span").text("请输入图形验证码");
                timeout()
                return;
            } else if (!verify) {
                $(".error").show().children("span").text("请输入验证码");
                timeout()
                return;
            }
            $.ajax({
                url: "/home/audition/apply",
                type: "post",
                dataType: "json",
                data: {
                    name: name,
                    mobile: phone,
                    verify: verify
                },
                success: function (data) {
                    if (data.status === 1) {
                        alert("领取成功")
                        $(".free-form").hide();
                    } else {
                        $(".error").show().children("span").text('"' + data.info + '"');
                        timeout()
                    }

                }

            })

        })


    }

    // 遍历生成tab
    createTabLi(0, 10)

    function createTabLi(first, last) {
        var tabs = document.querySelector("#tabs");
        var new_li = document.createElement('ul');
        for (var i = first; i < last; i++) {
            new_li.innerHTML += '<li><a href="javascript:;" title="tab' + (i + 1) + '">TASK ' + (i + 1) +
                '</a></li>';
            tabs.appendChild(new_li);
        }
        var liNode = document.querySelectorAll("#tabs li");
        $("#tabs li:first").addClass("current");
    }
    // 右上角箭头切换
    var flag = true;
    $('#tabs i').click(function (e) {
        e.preventDefault();
        if (flag) {
            $(this).addClass("on");
            $(".generalize").show();
            flag = !flag;
        } else {
            $(this).removeClass("on");
            $(".generalize").hide();
            flag = !flag;
        }
    });
    // 点击右侧更换题目序列；
    var allTabs = document.querySelectorAll(".generalize div")
    $(".generalize div").on("click", function () {
        $("#tabs ul").remove();
        var i = $(this).index();
        createTabLi((i * 10), (i + 1) + "0");
        $(".generalize").hide();
        $("#tabs i").removeClass("on");
        tabConHide(i);
        flag = true;
    })

    // tab切换
    $('body').on("click", "#tabs a", function (e) {
        e.preventDefault();
        $('#tabs li').removeClass("current")
        $(this).parent().addClass("current");
        $("#content div").removeClass("show");
        $('#' + $(this).attr('title')).addClass('show');
        console.log($('#' + $(this).attr('title')))
    });
    // 下方内容默认显示第一个
    tabConHide(0);

    function tabConHide(ind) {
        $("#content>div").removeClass("show");
        $("#content>div:eq(" + (ind * 10) + ")").addClass('show');
    }
    // 根据完成的数值使进度条更新
    completed()

    function completed() {
        var ind;
        for (var i = 0; i < 3; i++) {
            ind = $(".tab-con-right>li:eq(" + i + ") .js-completed").text();
            for (var j = 0; j < ind; j++) {
                $(".tab-con-right>li:eq(" + i + ") .progress-bar div:eq(" + j + ")").addClass("on");
            }
        }
    }
    // 正在学习区域自动滑动

    var t = $('#marquee-con').html();
    var h = $('#marquee-con>ul').height();
    $('#marquee-con').html(t + t);
    var st = 0,
        step = 1;

    function marquee() {
        st += step;
        if (st >= (h)) st = 0;
        $('#marquee-con .rolling-list').scrollTop(st);
    }
    var timer = setInterval(marquee, 50);
    $('#marquee-con').on({
        'touchstart': function () {
            clearInterval(timer)
        },
        'touchend': function () {
            timer = setInterval(marquee, 50);
        }
    });
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


})