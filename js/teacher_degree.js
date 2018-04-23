    document.getElementById('submit-remark').onclick = function(){
        var comment_degree = document.getElementById('comment_degree');
        var comment_content = document.getElementById('comment_content');
        var scheduleid = document.getElementById('hiddenid').value;
        var content = comment_content.value;
        var degree = comment_degree.value;
        content = content.replace(/(^\s*)|(\s*$)/g, "");
        if(degree == ""){
            layer.msg('请给作业打分');return;
        }
        if (degree>100) {
            layer.msg('满分为100分');return;
        }
        if (degree<0) {
            layer.msg('分数不能小于0');return;
        }
        if(content == ""){
            layer.msg('请写评语');return;
        }   
        
        var fd = new FormData();
        fd.append("schedule_id", scheduleid);
        fd.append("content", content);
        fd.append("degree", degree);
        var xhr = new XMLHttpRequest();
        var url = "/Home/Homework/ajaxAddComment";
        xhr.open("POST", url, true);
        //xhr.setRequestHeader('Content-type', 'multipart/form-data');
        xhr.send(fd);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = xhr.responseText;
                var json = eval('(' + result + ')');
                if(json.status==1){
                    layer.msg(json.info);
                    setTimeout(function(){ location.reload(); },2000);
                }else{
                    layer.msg(json.info);
                }
            }
        }
    };
        
    
    
    
    function submit() { 
        //var titleinput = document.getElementById('homeworktitle');
        var contentinput = document.getElementById('requestcontent');
        //var title = titleinput.value;
        var content = contentinput.value;
        //title = title.replace(/(^\s*)|(\s*$)/g, "");
        content = content.replace(/(^\s*)|(\s*$)/g, "");
        /*if (title=="") {
            layer.msg('请输入标题');
            return;
        }*/
        if (content=="") {
            layer.msg('请输入内容');
            return;
        }
        
        //var fileObj = document.getElementById("file").files[0];
        var fileObj = document.querySelector('input[type="file"]').files;
        var filestr = JSON.stringify(fileObj);
        //console.log(fileObj);
        //创建xhr
        var xhr = new XMLHttpRequest();
        var url = "/Home/Student/ajaxResponseUpload";
        //FormData对象
        var fd = new FormData();
        var file1 = document.getElementById('morefile1').files;
        var file2 = document.getElementById('morefile2').files;
        var file3 = document.getElementById('morefile3').files;
        if (file1) {
            fd.append("file0", file1[0]); 
        }
        if (file2) {
            fd.append("file1", file2[0]); 
        }
        if (file3) {
            fd.append("file2", file3[0]); 
        }
        fd.append("courseid", courseid); 
        fd.append("schedule_id", scheduleid); 
        //fd.append("title", title); 
        fd.append("content", content); 
        fd.append("acttime",new Date().toString());
        console.log(fd);
        xhr.upload.onprogress = function (evt) {
            if (evt.lengthComputable) {
                //var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            }
        };
        xhr.open("POST", url, true);
        //xhr.setRequestHeader('Content-type', 'multipart/form-data');
        xhr.send(fd);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = xhr.responseText;
                var json = eval('(' + result + ')');
                if(json.status==1){
                    layer.msg(json.info);
                    setTimeout(function(){ location.reload(); },3000);
                }else{
                    layer.msg(json.info);
                }
            }
        }
    }