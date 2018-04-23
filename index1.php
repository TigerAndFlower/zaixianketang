<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <title>国际课程在线课堂_在线国际课程培训_IEduChina在线课堂中心</title>
    <meta name="keywords" content="在线国际课程,雅思在线课程,托福在线课程,IB在线课程,A-Level在线课程,在线国际课程培训" />
    <meta name="description" content="IEduChina中国国际教育网旗下在线课堂提供专业的托福、雅思、IBDP、A-Level、IGCSE、SAT、SAT2、AP等一系列的在线培训课程;精英海归教学团队,全程监督,让每一位学员精准提分,国际课程培训选IEduChina在线课堂！" />
	<link rel="stylesheet" href="__PUBLIC__/Home/css/reset.css">
	<link rel="stylesheet" href="__PUBLIC__/Home/css/home.css">
	<link rel="stylesheet" href="__PUBLIC__/Home/iconfont/iconfont.css">
</head>
<!-- 在线课堂首页 -->
<body>
	<div class="topbar">
		<div class="wrap clearfix">
			<div class="fl logo">
				<a href="/"><i class="iconfont icon-logo"></i>在线课堂</a>
			</div>
	        <!-- 用户登录情况 -->
			<div class="fr login">
				<span class="tel"><i class="iconfont icon-call"></i>0755-92912094</span>
	            <if condition="$loginInfo['isLogin'] eq '1'">
    				<span class="sign"><a href="{$loginInfo['info']['url']}" target="_blank">欢迎您，{$loginInfo['info']['username']}</a></span>
    				<a href="http://www.ieduchina.com/index.php?m=member&c=index&a=logout&forward={$forward}&siteid=1" class="btn reg transit">退出</a>
	            <else />
    				<a href="http://www.ieduchina.com/login.html?forward={$forward}" class="sign transit">登录</a>
    				<a href="http://www.ieduchina.com/register.html?forward={$forward}" class="btn reg transit">注册</a>
		       </if>
		    </div>	
		</div>
	</div>

	<div class="banner" style="background: url(__PUBLIC__/Home/images/Bitmap.jpg) no-repeat center top;">
		<div class="wrap">
			<h2>学习雅思，就来我们这吧！</h2>
			<h4>面授1/3的价格 双倍的服务 53套独家正版TPO未达目标分数免费重读100%课时</h4>
			<p><a href="#audition" class="btn transit">免费领取试听课程</a></p>
		</div>
	</div>


	<div class="content">
		<div class="wrap">
			<h2 class="subject">我们的课程</h2>
			<ul class="course clearfix">
				<foreach name="course" item="vo">
					<li>
						<img src="{$vo.thumb}" alt="">
						<span>{$vo.name|default=''}</span>
					</li>
				</foreach>
			</ul>
		</div>
	</div>


	<div class="content advantage">
		<div class="wrap">			
			<h2 class="subject">我们的优势</h2>

			<div class="ad-item clearfix">
				<img src="__PUBLIC__/Home/images/Group.png"  class="fl" style="margin-right: 40px;">
				<dl>
					<dt><i class="iconfont icon-text"></i></dt>
					<dd>
						优秀的老师才能教出优秀的孩子<br>
						深入了解国际教育和留学考试的我们<br>
						只选择最优秀的老师，精英海归教学团队
					</dd>
				</dl>
			</div>
			<div class="ad-item clearfix">
				<img src="__PUBLIC__/Home/images/Group.png"  class="fr" style="margin-left: 40px;">
				<dl>
					<dt><i class="iconfont icon-text"></i></dt>
					<dd>
						教学全程把控：从入学Day 1到课程结束，全程无缝隙监督，把控
					</dd>
				</dl>
			</div>

			<div class="note">
				拥有平均5年以上教授留学语言考试的经验，严格把控每一个教学环节。<br>
				高分被录取并毕业于国外知名大学，经过我们的严格甄选并定期接受培训考核，他们的每个教案都经过反复斟酌、精益求精。
			</div>			
		</div>
	</div>


	<div class="content">
		<div class="wrap">
			<h2 class="subject">名师风采</h2>
            <notempty name="teacher">
			<div class="slideBox" id="slideBox">
				<div class="slide-con">
					<ul class="slide-wrap clearfix" style="width:10000px;">
						<foreach name="teacher" item="vo">
							<li class="slide-item">
								<div>
									<img src="{$vo.user_image}" alt="">
									<a href="javascript:void(0);" class="transit transit2">预约试听</a>
								</div>
								<h6>{$vo.truename}</h6>
								<p>{$vo.teacher_describe}</p>
							</li>
						</foreach>
					</ul>
				</div>
				<div class="prev-btn"><i class="iconfont icon-left"></i></div>
				<div class="next-btn"><i class="iconfont icon-right"></i></div>
			</div>
			</notempty>
		</div>
	</div>

	<div class="form-con">
		<div class="wrap">
			<a name="audition"><p class="fl">免费领取试听课程</p></a>
			<div class="apply-form">
				<form id="applyForm">
					<ul class="clearfix">
						<li class="form-item" style="width: 160px;">
							<label >姓名</label>
							<div><input type="text" name="name" autocomplete="off"></div>
						</li>
						<li class="form-item" style="width: 200px;">
							<label >电话号码</label>
							<div><input type="text" name="mobile" autocomplete="off"></div>
							<a href="javascript:;" class="verify-btn" id="getVerify">发送验证码</a>
						</li>
						<li class="form-item" style="width: 140px;margin-right: 48px;">
							<label >验证码</label>
							<div><input type="text" name="verify" autocomplete="off"></div>
						</li>
						<li class="form-item" style="margin-right: 0;">
							<a href="javascript:;" class="sub-btn btn transit">立即领取</a>
						</li>
					</ul>
				</form>
			</div>
		</div>
	</div>

	<!-- <div class="about-us">
		<div>
			<a href="" class="btn">关于我们</a>
		</div>		
	</div> -->
	
	<!-- 关于我们 -->
	<div class="footer">
	    <div class="w1000">
	        <div class="aboutus-icon"><i class="iconfont icon-aboutusicon"></i></div>
	        <div class="footer-title">
	            <h3>关于我们</h3></div>
	        <p>
	            深圳市互联港湾网络技术有限公司旗下<br>
	            IEduChina中国国际教育网旗下在线课堂为所有有着进入世界一流的大学教育抱负的学生，<br>
				提供专业的 <strong>托福、雅思、IBDP、A Level、 IGCSE、 SAT、 SAT2、 AP</strong> 等一系列的培训课程。<br>
				通过智能自动化的计算机技术为每个学员提供个性化定制课程，并搭配细致到位的练习系统，让每一位学员精准提分，为日后孩子的留学道路扫除一切障碍	   
	        </p>
	    </div>
	</div>

	<!-- 底部 -->
	<div class="iedu-footer">
	 	<div class="wrap"> 	               
	       <div class="copyright">
	       	  <p class="mt25"><a target="_blank" href="http://www.miitbeian.gov.cn" rel="nofollow">中国国际教育网 (粤ICP备06087881号-19)</a><span> Copyright © <label id="siteyear"></label>, All Rights Reserved.</span> </p>
	          <p>中文版权所有,网站所有图片、文字未经许可不得拷贝、复制。</p>
	       </div>
	       <div class="g-footer-record">
		<p>
			<span class="fl"><a rel="nofollow" target="_blank" href="http://61.144.227.239:9002/"><img width="36" height="43" border="0" src="//www.ieduchina.com/statics/images/816587.gif" alt="深圳网络警察报警平台"></a></span>
			<span class="fr"><a rel="nofollow" target="_blank" href="http://61.144.227.239:9002/">深圳网络警<br>
			察报警平台</a></span>
		</p>
		<p>
			<span class="fl"><a rel="nofollow" target="_blank" href="http://61.144.227.239:9003/webrecord/form_query.jsp"><img width="36" height="42" border="0" src="//www.ieduchina.com/statics/images/6743671.jpg" alt="公共信息安全网络监察"></a></span>
			<span class="fr"><a rel="nofollow" target="_blank" href="http://61.144.227.239:9003/webrecord/form_query.jsp">公共信息安<br>全网络监察</a></span>
		</p>
		<p>
			<span class="fl" style="width:44px;"><a rel="nofollow" target="_blank" href="http://www.12377.cn/"><img width="44" height="44" border="0" src="//www.ieduchina.com/statics/images/home_b.gif" alt="不良信息举报中心"></a></span>
			<span class="fr" style="width:64px;"><a rel="nofollow" target="_blank" href="http://www.12377.cn/" class="lcblack">不良信息<br>举报中心</a></span>
		</p>
	    <p style="border:none;">
	       <script charset="utf-8" type="text/javascript" src="http://szcert.ebs.org.cn/govicon.js?id=9822308f-c3cf-4c02-851d-6bac920e6898&amp;width=120&amp;height=50&amp;type=2" id="ebsgovicon"></script><a href="http://szcert.ebs.org.cn/9822308f-c3cf-4c02-851d-6bac920e6898" target="_blank"><img src="http://szcert.ebs.org.cn/Images/newGovIcon.gif" title="深圳市市场监督管理局企业主体身份公示" alt="深圳市市场监督管理局企业主体身份公示" width="120" height="50" border="0" style="border-width:0px;border:hidden; border:none;"></a><script type="text/javascript" src="http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js"></script><a target="_blank" href="http://szcert.ebs.org.cn/9822308f-c3cf-4c02-851d-6bac920e6898"><img width="120" height="50" border="0" style="border-width:0px;border:hidden; border:none;" alt="深圳市市场监督管理局企业主体身份公示" title="深圳市市场监督管理局企业主体身份公示" src="//www.ieduchina.com/statics/images/newGovIcon.gif"></a><script src="http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js" type="text/javascript"></script>
		</p>
	    </div>
	    
	    </div>
	</div>

	<script>
		(function() {
			var d = new Date();
			var y = d.getFullYear();
			document.getElementById('siteyear').innerText = y;
		})();
	</script>

	<!-- <div class="fulan">
		<a href="" class="share"><i class="iconfont icon-share"></i>分享</a>
		<a href="" class="concat"><i class="iconfont icon-contact"></i>在线咨询</a>
	</div> -->


	<script src="__PUBLIC__/Home/js/jquery.min.js"></script>
	<script src="__PUBLIC__/Home/js/validate.min.js"></script>
	<script src="__PUBLIC__/layer/layer.js"></script>
	<script src="__PUBLIC__/Home/js/home.js"></script>
	<script type="text/javascript"> var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://"); document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fa536101773cd2154782eba19058fdb44' type='text/javascript'%3E%3C/script%3E")) </script>
</body>
</html>