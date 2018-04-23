$(function () {
	//显示老师简介
	$('td.my-teacher').hover(function () {  
		$(this).children('.teacher-intro').fadeIn(300);
	},function () {
		$(this).children('.teacher-intro').hide();
	});

	function popup_open (tit,cont) {
		$('.popup-container .popup-title').html(tit);
		$('.popup-container .popup-content').html(cont);
		$('.popup-container').show();
		var h = $('.popup-wrap').height();
		$('.popup-wrap').css('margin-top',-h/2 + 'px');
	}

	//课后作业
	$('.after-class a.work').click(function () {
		var tit = '课后作业';
		var html = '';
		var schedule_id = $(this).parent('td').attr('data-id');
		$.get('/home/student/ajaxGetHomework', {schedule_id:schedule_id}, function(rs) {
			if (rs.status == 1) {
				html = rs.data;
				popup_open(tit, html);
			}
		}, 'json');
	});

	//评价老师
	$('.after-class a.appraise').click(function () {
		var tit = '评价老师';
		var html = '';
		var schedule_id = $(this).parent('td').attr('data-id');
		$.get('/home/student/ajaxGetComment', {schedule_id:schedule_id}, function(rs) {
			if (rs.status == 1) {
				html = rs.data;
				popup_open(tit, html);
			}
		}, 'json');
	});

	//提交评价
	var comment_lock = false;
	$('body').on('click','#submit-comment',function () {	
		var satisficing = $('#comment-form input[name=satisficing]:checked').val();
		if(!satisficing){
			layer.msg('请选择满意度');return ;
		}
		var content = $('#comment-form textarea[name=content]').val();
		if(!content){
			layer.msg('请填写评价内容');return ;
		}
		if(content.length>500){
			layer.msg('请输入500字以内的评价');return ;
		}
		var schedule_id = $('#comment-form input[name=schedule_id]').val()
        	
    	if(comment_lock) return ;
		comment_lock = true;
    	
		$.post('/home/student/ajaxSaveComment', {schedule_id:schedule_id,satisficing:satisficing,content:content}, function(rs) {
			if (rs.status == 1) {
				layer.msg(rs.info);
				$('.popup-container').hide();
			} else {
				layer.msg(rs.info);
				comment_lock = false;
			}
		}, 'json');
	});
	
	//查看老师评语
	$('.after-class a.remark').click(function () {
		var tit = '老师评语';
		var html = '';
		var schedule_id = $(this).parent('td').attr('data-id');
		var teacher_id = $(this).parent('td').data('teacher');
		$.get('/home/student/ajaxGetTeacherComment', {schedule_id:schedule_id,teacher_id:teacher_id}, function(rs) {
			if (rs.status == 1) {
				html = rs.data;
				popup_open(tit, html);
			}
		}, 'json');
	});

	//下载课件
	$('.after-class a.download').click(function () {
		var tit = '下载课件';
		var html = '';
		var schedule_id = $(this).parent('td').attr('data-id');
		$.get('/home/student/ajaxDownloadHomework', {schedule_id:schedule_id}, function(rs) {
			if (rs.status == 1) {
				html = rs.data;
				popup_open(tit, html);
			}
		}, 'json');
	});


	//输入字数提示
	$('.popup-wrap').on('input propertychange','textarea',function () {
		var l = $(this).val().length;  //已输入字数
		var el = $(this).parents('.answer-con').find('.word-num');
		if(l>=500) {  
			el.addClass('oversize');
		}else {
			el.removeClass('oversize');
		}
		el.children('.word-count').html(l);
	});
});