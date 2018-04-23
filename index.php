<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>国际课程在线课堂_在线国际课程培训_IEduChina在线课堂中心</title>
    <meta name="keywords" content="在线国际课程,雅思在线课程,托福在线课程,IB在线课程,A-Level在线课程,在线国际课程培训" />
    <meta name="description" content="IEduChina中国国际教育网旗下在线课堂提供专业的托福、雅思、IBDP、A-Level、IGCSE、SAT、SAT2、AP等一系列的在线培训课程;精英海归教学团队,全程监督,让每一位学员精准提分,国际课程培训选IEduChina在线课堂！" />
	<link rel="stylesheet" href="__PUBLIC__/Home/css/reset.css">
    <link rel="stylesheet" href="__PUBLIC__/Home/css/header.css">
    <link rel="stylesheet" href="__PUBLIC__/Home/css/font.css">
    <link rel="stylesheet" href="__PUBLIC__/Home/css/main.css">
</head>
<!-- 在线课堂首页 -->
<body>
    <div>
        <!-- 头部 -->
        <include file="Public/header" />
        
        <!-- banner -->
       
        <div class="banner">
            <div class="wrap">
                <h2>学习雅思·托福·SAT就来我们这吧！</h2>
                <p class="fs14">我们专注于出国留学考试，我们坚信任何能力的习得，如果只有停留在口头上，不去“刻意练习”的话，就会很难取得优异的成绩。</p>
                <p class="fs14">我们的研发教师系统化、模块化、精细化每个可能的考点，之后通过计算机技术来 最大化测量每个学员的薄弱点，最后查补缺漏，从而做到最为个性化的学习，从根本上提升学习者的综合能力。</p>
            </div>
        </div>

        <!-- 登录注册 -->
        <div class="first-login">
            <div class="wrap">
                <div class="fl first-login-left">
        
                    <if condition="$loginInfo['info']['online_role'] eq '1'">
                    <!-- 个人中心 -->
                    <div class="personal-center">
                        <div class="personal-title">
                            <div class="fl">
                                <img src="__PUBLIC__/Home/images/head1.png" alt="">
                            </div>
                            <div class="fl">
                                <p>{$loginInfo['info']['truename']}</p>
                                <p>{$loginInfo['info']['mobile']}</p>
                            </div>
                        </div>
                        <div class="personal-main">
                            <table>
                                <thead>
                                    <tr>
                                        <td width="258">今日排课</td>
                                        <td width="258">在读课程</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{$todayCourse|default=0}</td>
                                        <td>{$onlineCourse|default=0}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <else />
                    <!--  注册 -->
                    <form action="" id="register" autocomplete="off">
                        <h3>快速注册</h3>
                        <a href="javascript:;" class="login-toggle">已有账号，直接登录</a>
                        <div>
                            <span>请输入手机号码</span>
                            <input type="text" name="mobile" class="phone">
                            <p class="phone-error error hid">请输入手机号码</p>
                        </div>
                        <div>
                            <span>请输入图片验证码</span>
                            <img src="/Home/Api/getVerify" alt="图形验证码" class="img-yanzheng">
                            <input type="text" class="img">
                            <p class="img-error error hid">请输入图片验证码</p>
                        </div>
                        <div>
                            <span>请输入手机验证码</span>
                            <a href="javascript:;" class="get-code" id="register-code">发送验证码</a>
                            <input type="text" name="verify"  class="code">
                            <p class="code-error error hid">请输入手机验证码</p>
                        </div>
                        <div>
                            <span>请输入密码</span>
                            <input type="password" name="password" class="password" autocomplete="off">
                            <p class="password-error error hid">请输入密码</p>
                        </div>
                        <div>
                            <span>确认密码</span>
                            <input type="password" name="password_conf"  class="confirm-paddword">
                            <p class="confirm-password-error error hid">请再次输入密码</p>
                        </div>

                        <div class="deal">
                            <i class="iconfont">&#xe610;</i>
                            <a href="javascript:;">阅读并同意《中国国际教育网注册协议》</a>
                        </div>
                        <a href="javascript:;" id="register-btn" class="btn">注册</a>
                    </form>
                    <!-- 手机快捷登录 -->
                    <form action="" id="phone-login" class="hid"  autocomplete="off">
                        <h3>手机快捷登录</h3>
                        <a href="javascript:;" class="login-toggle">密码登录</a>
                        <div>
                            <span>请输入手机号码</span>
                            <input type="text" name="mobile">
                            <p class="phone-error error hid">请输入手机号码</p>
                        </div>
                        <div>
                            <span>请输入图片验证码</span>
                            <img src="/Home/Api/getVerify" alt="图形验证码" class="img-yanzheng">
                            <input type="text" class="img-code">
                            <p class="img-error error hid">请输入图片验证码</p>
                        </div>
                        <div>
                            <span>请输入手机验证码</span>
                            <a href="javascript:;" class="get-code">发送验证码</a>
                            <input type="text" name="verify">
                            <p class="code-error error hid">请输入手机验证码</p>
                        </div>
                        <a href="javascript:;" id="phone-login-btn" class="btn">登录</a>
                        <a href="javascript:;" class="a-style register-now">立即注册</a>
                    </form>
                    <!-- 密码登录 -->
                    <form action="" id="acc-login" class="hid" autocomplete="off">
                        <h3>密码登录</h3>
                        <a href="javascript:;" class="login-toggle">手机快捷登录</a>
                        <div>
                            <span>请输入手机号码/邮箱</span>
                            <input type="text" name="username">
                            <p class="phone-error error hid">请输入手机号码/邮箱</p>
                        </div>
                        <div>
                            <span>请输入密码</span>
                            <input type="password" name="password">
                            <p class="password-error error hid">请输入密码</p>
                        </div>
                        <a href="http://www.ieduchina.com/index.php?m=member&c=index&a=public_forget_password" class="a-style">忘记密码</a>
                        <a href="javascript:;" id="acc-loginr-btn" class="btn">登录</a>
                        <a href="javascript:;" class="a-style register-now">立即注册</a>
                    </form>
                    </if>
                    
                </div>
                <div class="fr first-login-right">
                    <p>方法论模型+刻意练习，我们把考试能力种到你的脑子里; 多位教学专家教学研发，覆盖标准化考试所有能力点，精准测量学员所缺的考试能力，个性化精准提高。专家老师持续跟进答疑、跟踪，助你取得好成绩。</p>
                </div>
            </div>
        </div>
        <!-- 中国国际教育网教学特色 -->
        <div class="feature">
            <div class="wrap">
                <h3>中国国际教育网教学特色</h3>
                <div>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <a href="#" class="yuyue">预约课程 ></a>
            </div>
        </div>
        <!-- 雅思托福报名页 -->
        <div class="first-apply">
            <ul class="wrap">
                <li>
                    <img src="__PUBLIC__/Home/images/yets.jpg" alt="">
                    <p>雅思一对一</p>
                    <a href="/index/ielts.html">进入</a>
                </li>
                <li>
                    <img src="__PUBLIC__/Home/images/yets.jpg" alt="">
                    <p>托福一对一</p>
                    <a href="/index/toeft.html">进入</a>
                </li>
                <li>
                    <img src="__PUBLIC__/Home/images/yets.jpg" alt="">
                    <p>SAT一对一</p>
                    <a href="/index/sat.html">进入</a>
                </li>
            </ul>
        </div>
        <!-- 名师风采 -->
        <div class="first-teacher">
            <div class="wrap">
                <h3>名师风采</h3>
                <div class="teacher-list">
                    <ul class="teacher-name">
                        <li class="fl on">William郑</li>
                        <li class="fl">Daniel 蒋</li>
                        <li class="fl">Hank 王</li>
                        <li class="fl">华辉</li>
                    </ul>
                    <div class="teacher-img">
                        <div class="teacher-left fl">
                            <div class="teacher-bor">
                                <img src="__PUBLIC__/Home/images/timg1.jpg" alt="" class="js-tab-img" data-index="0">
                            </div>
                            <div class="teacher-bor">
                                <img src="__PUBLIC__/Home/images/timg2.jpg" alt="" class="js-tab-img" data-index="1">
                            </div>
                        </div>
                        <div class="big-img">
                            <img src="__PUBLIC__/Home/images/timg1.jpg" alt="" class="js-big-img">
                        </div>
                        <div class="teacher-right fr">
                            <div class="teacher-bor">
                                <img src="__PUBLIC__/Home/images/timg3.jpg" alt="" class="js-tab-img" data-index="2">
                            </div>
                            <div class="teacher-bor">
                                <img src="__PUBLIC__/Home/images/timg4.jpg" alt="" class="js-tab-img" data-index="3">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 关于我们 -->
        <div class="About">
            <div class="wrap">
                <h3>关于我们</h3>
                <p>深圳市互联港湾网络技术有限公司旗下</p>
                <p>IEduChina中国国际教育网出国考试中心为所有有着进入世界一流的大学教育抱负的学生，</p>
                <p>提供专业的 托福、雅思、IBDP、A Level、 IGCSE、 SAT、 SAT2、 AP 等一系列的培训课程。个性化定制课程，</p>
                <p>为日后孩子的留学道路扫除一切障碍，打造全方位的国际教学环境</p>
            </div>
        </div>
        <!-- 底部 -->
        <div class="footer">
            <div class="wrap">
                <div>
                    <span>友情链接</span>
                    <a href="http://ieduchina.com/" target="_blank">国际教育网</a>
                    <a href="https://www.chinaielts.org/" target="_blank">雅思报名入口</a>
                    <a href="https://toefl.etest.net.cn/" target="_blank">托福报名入口</a>
                </div>
                <div>
                    <span>联系我们</span>
                    <a href="javascript:;">0755-86309669</a>
                    <a href="javascript:;">南山校区：深圳市南山区海德2道288号茂业时代广场19E</a>
                </div>
                <div>
                    <a href="javascript:;" style="margin-left: 257px;">福田校区：广东省深圳市福田区深南大道3018号世纪汇2501F</a>
                </div>
            </div>
        </div>
    </div>
    <script src="__PUBLIC__/Home/js/jquery.min.js"></script>
    <script src="__PUBLIC__/Home/js/main.js"></script>
	<div style="display: none;">
	   <script type="text/javascript"> var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://"); document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fa99a5b80f3e4ab682290fb90cad861f2' type='text/javascript'%3E%3C/script%3E")) </script></body>
    </div>
    <script>
        window.onload = function () {
            // 名师风采切换
            $(".js-tab-img").on("click", function () {
                var newSrc = $(this).attr("src");
                var newIndex = $(this).attr("data-index");
                $(".js-big-img").attr("src", newSrc);
                $(".teacher-name li").removeClass("on");
                $(".teacher-name li").eq(newIndex).addClass("on");
            })
            $(".teacher-name li").on("click", function () {
                var newIndex = $(this).index();
                $(".teacher-name li").removeClass("on");
                $(".teacher-name li").eq(newIndex).addClass("on");
                $(".js-big-img").attr("src", "__PUBLIC__/Home/images/timg" + (newIndex + 1) + ".jpg")
            })
        }
    </script>
	</body>
</html>