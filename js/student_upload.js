    document.getElementById('fujian').onclick = function(){
        var morefile1 = document.getElementById('morefile1');
        var morefile2 = document.getElementById('morefile2');
        var morefile3 = document.getElementById('morefile3');
        if(morefile1.value == ""){
            morefile1.click();
        }else if(morefile1.value && morefile2.value==""){
            morefile2.click();
        }else if(morefile2.value && morefile3.value==""){
            morefile3.click();
        }else if(morefile3.value){
            layer.msg('最多只能传3个文件');
        }         
    };
        var morefile1 = document.getElementById('morefile1');
        var morefile2 = document.getElementById('morefile2');
        var morefile3 = document.getElementById('morefile3');
        var del1 = document.getElementById('del1');
        var del2 = document.getElementById('del2');
        var del3 = document.getElementById('del3');
        morefile1.onchange = function(){
            var name1 = document.getElementById('morefile1').files[0]['name'];
            var namediv1 = document.getElementById('filename1');
            if (name1) {
                namediv1.innerHTML = name1;
            }else{
                namediv1.innerHTML = '';
            }        
            if (name1) {
                del1.style.display = 'inline'; 
            }else{
                del1.style.display = 'none'; 
            }
           
        }
        morefile2.onchange = function(){
            var name2 = document.getElementById('morefile2').files[0]['name'];
            var namediv2 = document.getElementById('filename2');
            if (name2) {
                namediv2.innerHTML = name2;
            }else{
                namediv2.innerHTML = '';
            } 
            if (name2) {
                del2.style.display = 'inline'; 
            }else{
                del2.style.display = 'none'; 
            }
        }
        morefile3.onchange = function(){
            var name3 = document.getElementById('morefile3').files[0]['name'];
            var namediv3 = document.getElementById('filename3');
            if (name3) {
                namediv3.innerHTML = name3;
            }else{
                namediv3.innerHTML = '';
            } 
            if (name3) {
                del3.style.display = 'inline'; 
            }else{
                del3.style.display = 'none'; 
            }
        }
        del1.onclick = function(){
            var namediv1 = document.getElementById('filename1');
            namediv1.innerHTML = "";
            var file1 = document.getElementById('morefile1');
            file1.value = ""; 
            this.style.display = 'none';
        }
        del2.onclick = function(){
            var namediv2 = document.getElementById('filename2');
            namediv2.innerHTML = "";
            var file2 = document.getElementById('morefile2');
            file2.value = ""; 
            this.style.display = 'none';
        }
        del3.onclick = function(){
            var namediv3 = document.getElementById('filename3');
            namediv3.innerHTML = "";
            var file3 = document.getElementById('morefile3');
            file3.value = ""; 
            this.style.display = 'none';
        }

    var courseid = "{$course_id}";
    var uploaddom = document.getElementById('upload');
    uploaddom.onclick = function(){
        upload();  
    };
    var scheduleid = document.getElementById('hiddenid').value;
    //console.log(scheduleid);
    function upload() { 
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