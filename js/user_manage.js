$(function () {

	//自定义validator验证方法
    jQuery.validator.addMethod("isName", function(value, element) {  //检验姓名是否正确
        return this.optional(element) || (/^[(\u4E00-\u9FA5)a-zA-Z\s]{2,20}$/.test(value));
    });

	jQuery.validator.addMethod('isMobile',function (value,element) {  //检验手机号的有效性
		return this.optional(element) || (/^1[3|4|5|7|8][0-9]{9}$/.test(value));
	});

    jQuery.validator.addMethod('isPassword',function (value,element) {  //检验密码有效性
		return this.optional(element) || (/^[a-zA-Z0-9]{6,20}$/.test(value));
	});

    var student_lock = false;
	$('#student_account_form').validate({  //学生端，我的账户修改
		onkeyup:false,
		focusInvalid:false,
		focusCleanup:true,
        onfocusout:false,
        errorElement:'span',
        rules:{
        	name:{
        		required:true,
                isName:true
        	},
        	old_pass:{
        		required:true,
        		isPassword:true,
        	},
        	new_pass:{
        		required:true,
        		isPassword:true,
        	},
        	again_pass:{
        		required:true,
        		// isPassword:true,
        		equalTo:'[name=new_pass]'
        	}
        },
        messages:{
        	name:{
        		required:'请输入学生姓名！',
                isName:'请输入2-20位汉字，英文字符'
        	},
        	old_pass:{
        		required:'请输入原密码！',
        		isPassword:'密码不符规则！请输入6~20位密码，支持中英文数字及符号',
        	},
        	new_pass:{
        		required:'请输入新密码！',
        		isPassword:'密码不符规则！请输入6~20位密码，支持中英文数字及符号',
        	},
        	again_pass:{
        		required:'请再次输入新密码！',
        		// isPassword:'密码不符规则！请输入6~20位密码，支持中英文数字及符号',
        		equalTo:'两次密码输入不一致！'
        	}
        },
        submitHandler: function(form){
        	submit_student_account();
        }
	});
    function submit_student_account () {
        var data = $('#student_account_form').serializeArray();
            
            if(student_lock) return ;
            student_lock = true;
            
            var ajaxurl = '/home/student/account';
            $.post(ajaxurl,data,function(d){
                if(d.status == 1){
                    layer.msg(d.info);
                    setTimeout(function(){
                        location.reload();
                    },3000);
                }else{
                    layer.msg(d.info);
                    student_lock = false;
                };
            },'json');
    }
    $('#student_account_form .sub-btn').click(function () {
        var name = $('[name=name]').val();
        var old_psw = $('[name=old_pass]').val();
        var new_psw = $('[name=new_pass]').val();
        var again_psw = $('[name=again_pass]').val();
        if(old_psw=='' && new_psw=='' && again_psw==''){  //不修改密码时，三个密码域为空
            if($('[name=name]').valid()){
                submit_student_account();
            }
        }else {  //修改密码
            $('#student_account_form').submit();
        }
    });

    var teacher_lock = false;
	$('#teacher_account_form').validate({  //老师端，我的账户修改
		onkeyup:false,
		focusInvalid:false,
		focusCleanup:true,
        onfocusout:false,
        errorElement:'span',
        rules:{
        	name:{
        		required:true,
        		isName:true
        	},
        	old_pass:{
        		required:true,
        		isPassword:true,
        	},
        	email:{
        		required:true,
        		email:true
        	},
        	new_pass:{
        		required:true,
        		isPassword:true,
        	},
        	again_pass:{
        		required:true,
        		// isPassword:true,
        		equalTo:'[name=new_pass]'
        	}
        },
        messages:{
        	name:{
        		required:'请输入姓名！',
        		isName:'请输入正确的姓名！'
        	},
        	email:{
        		required:'请输入邮箱！',
        		email:'请输入正确的邮箱格式！'
        	},
        	old_pass:{
        		required:'请输入原密码！',
        		isPassword:'密码不符规则！请输入6~20位密码，支持中英文数字及符号',
        	},
        	new_pass:{
        		required:'请输入新密码！',
        		isPassword:'密码不符规则！请输入6~20位密码，支持中英文数字及符号',
        	},
        	again_pass:{
        		required:'请再次输入新密码！',
        		// isPassword:'密码不符规则！请输入6~20位密码，支持中英文数字及符号',
        		equalTo:'两次密码输入不一致！'
        	}
        },
        submitHandler: function(form){
            submit_teacher_account();
        }
	}); 

    function submit_teacher_account () {
    var data = $('#teacher_account_form').serializeArray();
            
        if(teacher_lock) return ;
        teacher_lock = true;
        
        var ajaxurl = '/home/teacher/account';
        $.post(ajaxurl,data,function(d){
            if(d.status == 1){
                layer.msg(d.info);
                setTimeout(function(){
                    location.reload();
                },1000);
            }else{
                layer.msg(d.info);
                teacher_lock = false;
            };
        },'json');
}
$('#teacher_account_form .sub-btn').click(function () {
    var old_psw = $('[name=old_pass]').val();
    var new_psw = $('[name=new_pass]').val();
    var again_psw = $('[name=again_pass]').val();
    if(old_psw=='' && new_psw=='' && again_psw==''){  //不修改密码时，三个密码域为空
        if($('[name=name]').valid() && $('[name=email]').valid()){
            submit_teacher_account();
        }
    }else {  //修改密码
        $('#teacher_account_form').submit();
    }
});  
});


$(function () {
     //老师，我的课表
    var currentId = 0;
    var pages = Math.ceil($('.schedule-wrapper th').size()/7);  //由一个月的天数得到总的滑动数量
    var per_step = $('.schedule-wrap').width();   //一次滑动的距离
    function sche_slide () {
        $('.schedule-wrapper').animate({
            right:currentId*per_step
        },500);
    }
    $('.my-schedule').on('click','.available,.choosed',function () {
        var html = $(this).html();
        $(this).html('可上课');
        $(this).toggleClass('available').toggleClass('choosed');
    });

    $('.schedule-wrap .prev-btn').on('click',function () {
        if(currentId == 0) return;
        currentId--;
        sche_slide();
    });

    $('.schedule-wrap .next-btn').on('click',function () {
        if(currentId == pages-1) return;
        currentId++;
        sche_slide();
    });

    $('#select-all').on('click',function () {
        if($(this).is(':checked')){
            $('.my-schedule .available').each(function () {
                $(this).html('可上课');
                $(this).toggleClass('available').toggleClass('choosed');
            });
        }else {
            $('.my-schedule .choosed').each(function () {
                $(this).html('可上课');
                $(this).toggleClass('choosed').toggleClass('available');
            });
        }
    });
});