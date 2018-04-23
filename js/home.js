$(function () {  //申请免费试听课程
	//自定义validator验证方法
    jQuery.validator.addMethod("isName", function(value, element) {  //检验姓名是否正确
        return this.optional(element) || (/^[(\u4E00-\u9FA5)a-zA-Z\s]{2,20}$/.test(value));
    });

    jQuery.validator.addMethod('isMobile',function (value,element) {  //检验手机号的有效性
		return this.optional(element) || (/^1[3|4|5|7|8][0-9]{9}$/.test(value));
	});

    jQuery.validator.addMethod('isPassword',function (value,element) {  //检验密码
		return this.optional(element) || (/^[(\u4E00-\u9FA5)a-zA-Z0-9]{6,20}$/.test(value));
	});


	$('#applyForm').validate({
		onkeyup:false,
		focusInvalid:false,
		focusCleanup:true,
        onfocusout:false,
        submitHandler: function(){  //验证通过后进行异步提交
              var data = $('#applyForm').serialize(),
              url = '/audition/apply';
              $.post(url,data,function (res) {
              	if(res.status==1) {  //申请成功
                    layer.msg(res.info);
                    setTimeout(function(){ location.reload(); },2000);
              	}else{
                    layer.msg(res.info);
                    setTimeout(function(){ location.reload(); },2000);
                }
              },'json');
        },
        errorElement:'span',
        errorPlacement:function(error,element) {  
        	element.parent().after(error);
   		},
        rules:{
        	name:{
        		required:true,
        		isName:true
        	},
        	mobile:{
        		required:true,
        		isMobile:true,
        	},
        	verify:{
        		required:true,
        	}
        },
        messages:{
        	name:{
        		required:'请输入姓名',
        		isName:'请输入2-20字'
        	},
        	mobile:{
        		required:'请输入手机号',
        		isMobile:'请输入正确的手机号'
        	},
        	verify:{
        		required:'请输入验证码'
        	}
        }
	});



	function code_left_time(el,t){ //发送验证码成功进入倒计时功能
		el.html(t+'s后重新发送').addClass('disabled');
		var timer = setInterval(function(){
			t--;
			if(t==0){
				el.html('重新发送').removeClass('disabled');
				count_down = false; //倒计时结束 
				clearInterval(timer);
			}else{
				el.html(t+'s后重新发送');
			}
		},1000);
	}

    function code_error_state(el,msg){  //验证码获取失败，显示错误信息
        el.parent().siblings('.hint').remove();
        var hint = $('<span class="hint"><span>').html(msg);
        el.parent().after(hint);
        el.off('focus').on('focus',function(){
            hint.hide();
        });
    }

	var code_sending = false,  //正在请求，不能重复请求，初始值为false
		count_down = false;    //验证码发送成功后，进入倒计时，初始值为false			
	
	$('#getVerify').click(function(){  // 获取验证码
		if(code_sending || count_down) return;
		var code_btn = $(this);	
		var mobile_filed = $('[name=mobile]');

		if(mobile_filed.valid()){ //手机号通过验证才能发送验证码
			code_sending = true;		
			var url = '/audition/sendmsg',  //后台发送验证码接口
			data = {mobile:mobile_filed.val()};

			$.post(url,data,function(res){
				code_sending = false;
				if(res.status==1){  //后台发送验证码成功
					count_down = true;  //进入倒计时，60s可以重新发送验证码
					code_left_time(code_btn,60);
				}
				else{
					code_error_state(mobile_filed,res.info); //发送失败，显示错误信息
				} 				
			},'json');
		}														
	});

	$('.sub-btn').click(function () {  //按钮提交
		$('#applyForm').submit();
	});
	$('#applyForm input').on('keyup',function (ev) {  //enter键提交
		var e = ev || window.event;
		if(e.keyCode==13) {
			$('#applyForm').submit();
		}
	});
});


// $(function () {   //弹窗登录，表单验证
// 	var dia = $('.dialog-container');
// 	function switch_method(mode) {  //切换登录方式
// 		dia.hide().find('input').val('');  //清空输入
// 		$('.error-container').find('.hint').remove();
// 		$('.error-place').empty();
// 		if(mode =='verify') {
// 			dia.find('.verify-btn').show();  //显示获取验证码
// 			dia.find('dl').hide().eq(0).show();
// 			dia.find('.form-item').show().eq(2).hide();
// 			$('#signIn').attr('login-method','verify');
// 		}
// 		else if(mode == 'password') {
// 			dia.find('.verify-btn').hide();
// 			dia.find('dl').hide().eq(1).show();
// 			dia.find('.form-item').show().eq(1).hide();
// 			$('#signIn').attr('login-method','password');
// 		}
// 		dia.show();
// 	}
// 	function show_hint(msg) {  //显示错误信息，错误统一放在.error-place容器里
// 		$('.error-container').find('.hint').remove();
// 		var hint = '<span class="hint">'+msg+'</span>';
// 		$('.error-container').append(hint);
// 	}
// 	$('#loginForm input').on('focus',function () {
// 		$('.error-container').find('.hint').remove();
// 	});
// 	$('#loginForm input').on('keyup',function (ev) {
// 		var event = ev || window.event;
// 		if(event.keyCode == 13) {
// 			$('#signIn').click();
// 		}
// 	});
// 	//显示、隐藏登录弹窗
// 	$('.topbar .sign,#byVerify').on('click',function () {
// 		switch_method('verify');
// 	});
// 	$('#byPassword').on('click',function () {
// 		switch_method('password');
// 	});
// 	$('.dialog-bg').on('click',function () {
// 		dia.hide();
// 	});

// 	$('#loginForm').validate({
// 		ignore: [],
// 		onkeyup:false,
// 		focusInvalid:false,
// 		focusCleanup:true,
//         onfocusout:false,
//         errorLabelContainer:'.error-place', //把错误统一放在这里
//         submitHandler: function(form){
//               // form.submit();
//         },
//         errorElement:'span',   
//         rules:{
//         	phone:{
//         		required:true,
//         		isMobile:true,
//         	},
//         	checkcode:{
//         		required:true,        		
//         	},
//         	password:{
//         		required:true,
//         	}
//         },
//         messages:{        
//         	phone:{
//         		required:'请输入手机号码',
//         		isMobile:'请输入正确手机号码'
//         	},
//         	checkcode:{
//         		required:'请输入验证码',
//         	},
//         	password:{
//         		required:'请输入密码',
        		
//         	}
//         }
// 	});



// 	//登录，先判断登录方式--验证码或密码登录
// 	$('#signIn').click(function () {
// 		var mode = $(this).attr('login-method');  //切换登录方式会对自定义属性login-method赋值
// 		if(mode == 'verify') {  //使用验证码登录
// 			if($('[name=phone]').valid() && $('[name=checkcode]').valid()) {
	
// 				var data = {
// 					phone:$('[name=phone]').val(),
// 					checkcode:$('[name=checkcode]').val()
// 				}
// 				var url = '';  //验证码登录接口
// 				$.post(url,data,function (res) {
// 					if(res.status == 1) {  //登录成功

// 					}else {  //验证码错误
// 						show_hint(res.info);  
// 					}
// 				},'json');
// 			}
// 		}
// 		else {   //使用密码登录
// 			if($('[name=phone]').valid() && $('[name=password]').valid()) {
		
// 				var data = {
// 					phone:$('[name=phone]').val(),
// 					password:$('[name=password]').val()
// 				}
// 				var url = '';  //密码登录接口
// 				$.post(url,data,function (res) {					
// 					if(res.status == 1) {  //成功

// 					}else {  //未注册或密码错误
// 						show_hint(res.info);
// 					}
// 				},'json');
// 			}
// 		}
// 	});


// 	function code_left_time(el,t){ //发送验证码成功进入倒计时功能
// 		el.html(t+'s后重新发送').addClass('disabled');
// 		var timer = setInterval(function(){
// 			t--;
// 			if(t==0){
// 				el.html('重新发送').removeClass('disabled');
// 				count_down = false; //倒计时结束 
// 				clearInterval(timer);
// 			}else{
// 				el.html(t+'s后重新发送');
// 			}
// 		},1000);
// 	}
    
// 	//获取验证码
// 	var code_sending = false,  //正在请求，不能重复请求，初始值为false
// 		count_down = false;    //验证码发送成功后，进入倒计时，初始值为false			
	
// 	$('#getCheckcode').click(function(){  // 获取验证码
// 		if(code_sending || count_down) return;
// 		var code_btn = $(this);	
// 		var mobile_filed = $('[name=phone]');
// 		if(mobile_filed.valid()){ //手机号通过验证才能发送验证码
// 			code_sending = true;	
// 			var url = '',  //后台发送验证码接口
// 			data = {mobile:mobile_filed.val()};
// 			$.post(url,data,function(res){
// 				code_sending = false;
// 				if(res.status==1){  //后台发送验证码成功
// 					count_down = true;  //进入倒计时，60s可以重新发送验证码
// 					code_left_time(code_btn,60);
// 				}
// 				else{
// 					show_hint(res.info); //发送失败，显示错误信息
// 				} 				
// 			},'json');
// 		}														
// 	});
// });