$(function () {

	function popup_open (tit,cont) {
		$('.popup-container .popup-title').html(tit);
		$('.popup-container .popup-content').html(cont);
		$('.popup-container').show();
		var h = $('.popup-wrap').height();
		$('.popup-wrap').css('margin-top',-h/2 + 'px');
	}
	//批阅作业
	$('.after-class .remark').click(function () {
		var title = '课后作业内容';
		var html = '';
		var schedule_id = $(this).parent('td').attr('data-id');
		$.get('/home/Homework/ajaxGetHomework', {schedule_id:schedule_id}, function(rs) {
			if (rs.status == 1) {
				html = rs.data;
				popup_open(title, html);
			}
		}, 'json');
	});

	//评价学生
	$('.after-class .comment').click(function () {
		var title = '评价学生';
		var html = '';
		var schedule_id = $(this).parent('td').attr('data-id');
		$.get('/home/teacher/ajaxGetComment', {schedule_id:schedule_id}, function(rs) {
			if (rs.status == 1) {
				html = rs.data;
				popup_open(title, html);
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
    	
		$.post('/home/teacher/ajaxSaveComment', {schedule_id:schedule_id,satisficing:satisficing,content:content}, function(rs) {
			if (rs.status == 1) {
				layer.msg(rs.info);
				$('.popup-container').hide();
			} else {
				layer.msg(rs.info);
				comment_lock = false;
			}
		}, 'json');
	});
	
	//查看学生评价
	$('.after-class .appraise').click(function () {
		var title = '学生对本节课的评价';
		var html = '';
		var schedule_id = $(this).parent('td').attr('data-id');
		var student_id = $(this).parent('td').data('student');
		$.get('/home/teacher/ajaxGetStudentComment', {schedule_id:schedule_id,student_id:student_id}, function(rs) {
			if (rs.status == 1) {
				html = rs.data;
				popup_open(title, html);
			}
		}, 'json');
	});


	//老师对一节课添加课件
	$('#add-ware').click(function () {
		$('.popup-container').show();
		var h = $('.popup-wrap').height();
		$('.popup-wrap').css('margin-top',-h/2 + 'px');
	});
	//选择课件-加载课件列表
	$('#add-ware').click(function(){
		var title = '选择课件';
		var html = '';
		var schedule_id = $(this).attr('data-id');
		$.get('/home/courseware/get_courseware',{schedule_id:schedule_id},function(rs){
			if (rs.status == 1) {
				html = rs.data; 
				popup_open(title, html);
			}
		},'json');
	});
    
	//添加课件-选择课件提交保存
	var flag = false;
	$('body').on('click','#add-courseware',function () {	
		var schedule_id = $(this).attr('data-id');
        
		var _obj = $('.courseware-lists').find("input[name=ids]:checked");
		var length = _obj.length;
		if(length==0){
			layer.msg('请选择要添加的课件'); return ;
		}
		
		var string = '';
		for(var i=0;i<length;i++){
			string += _obj.eq(i).val()+',';
		}
		var ids = string.substring(0,string.length-1);

    	if(flag) return ;
		flag = true;
    	
		$.post('/home/courseware/add_courseware', {schedule_id:schedule_id,ids:ids}, function(rs) {
			if (rs.status == 1) {
				$('.popup-container').hide();
				layer.msg(rs.info);
				setTimeout(function(){
					location.reload();
				},'2000');
			} else {
				layer.msg(rs.info);
				flag = false;
			}
		}, 'json');
	});
	
	//删除课件-课件管理
	var del_flag = false;
	$('body').on('click','.courseware-delete',function () {	
		var id = $(this).attr('data-id');
        layer.confirm('确定删除吗？', {icon: 3, title:'提示'}, function(index){

        	if(del_flag) return ;
        	del_flag = true;
        	
    		$.post('/home/courseware/manage_del', {id:id}, function(rs) {
    			if (rs.status == 1) {
    				layer.msg(rs.info);
    				setTimeout(function(){
    					location.reload();
    				},'2000');
    			} else {
    				layer.msg(rs.info);
    				del_flag = false;
    			}
    		}, 'json');
        },function(index){
            layer.close(index);
        });
        return false;
	});
    //老师对一节课添加作业
    $('#add-homework').click(function () {
        var homeworktitle = $('.homeworktitle').html();
        if(homeworktitle){
            layer.msg('一节课只能添加一份作业'); 
            return ;
        }
        $('.popup-container').show();
        var h = $('.popup-wrap').height();
        $('.popup-wrap').css('margin-top',-h/2 + 'px');
    });
    //选择作业-加载作业列表
    $('#add-homework').click(function(){
        var homeworktitle = $('.homeworktitle').html();
        if(homeworktitle){
            //layer.msg('一节课只能添加一个作业'); 
            return ;
        }
        var title = '选择作业';
        var html = '';
        var schedule_id = $(this).attr('data-id');
        $.get('/Home/Homework/ajaxChooseHomework',{schedule_id:schedule_id},function(rs){
            if (rs.status == 1) {
                html = rs.data; 
                popup_open(title, html);
            }
        },'json');
    });
    //添加课件-选择课件提交保存
    var flag = false;
    $('body').on('click','#add-homeworkmanage',function () {    
        var schedule_id = $(this).attr('data-id');
        var _obj = $('.courseware-lists').find("input[name=ids]:checked");
        var length = _obj.length;
        if(length==0){
            layer.msg('请选择要添加的作业'); return ;
        }
        if (length>1) {
            layer.msg('只能添加一份作业'); return ;
        }
        
        var string = '';
        for(var i=0;i<length;i++){
            string += _obj.eq(i).val()+',';
        }
        var ids = string.substring(0,string.length-1);

        if(flag) return ;
        flag = true;
        
        $.post('/home/Homework/ajaxChooseHomework', {schedule_id:schedule_id,ids:ids}, function(rs) {
            if (rs.status == 1) {
                $('.popup-container').hide();
                layer.msg(rs.info);
                setTimeout(function(){
                    location.reload();
                },'2000');
            } else {
                layer.msg(rs.info);
                flag = false;
            }
        }, 'json');
    });
	//删除作业-作业管理
	var del_flag = false;
	$('body').on('click','.homework-delete',function () {	
		var id = $(this).attr('data-id');
        layer.confirm('确定删除吗？', {icon: 3, title:'提示'}, function(index){

        	if(del_flag) return ;
        	del_flag = true;
        	
    		$.post('/home/homework/homeworkdel', {id:id}, function(rs) {
    			if (rs.status == 1) {
    				layer.msg(rs.info);
    				setTimeout(function(){
    					location.reload();
    				},'2000');
    			} else {
    				layer.msg(rs.info);
    				del_flag = false;
    			}
    		}, 'json');
        },function(index){
            layer.close(index);
        });
        return false;
	});
    //删除作业-布置作业-我的课程
    var del_flag = false;
    $('body').on('click','.del-homeworkmanage',function () {   
        var id = $(this).attr('data-id');	
        layer.confirm('确定删除吗？', {icon: 3, title:'提示'}, function(index){

            if(del_flag) return ;
            del_flag = true;
            
            $.post('/home/homework/delhomeworkmanage', {id:id}, function(rs) {
                if (rs.status == 1) {
                    layer.msg(rs.info);
                    setTimeout(function(){
                        location.reload();
                    },'2000');
                } else {
                    layer.msg(rs.info);
                    del_flag = false;
                }
            }, 'json');
        },function(index){
            layer.close(index);
        });
        return false;
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