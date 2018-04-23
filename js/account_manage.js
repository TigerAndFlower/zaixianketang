$(function () {

    var headobj = document.getElementById('headimg');
    //var headimg = headobj.files;
    headobj.onchange = function(){
        var headimg = document.getElementById('headimg').files;
        var filestr = JSON.stringify(headimg);
        //console.log(fileObj);
        //创建xhr
        var xhr = new XMLHttpRequest();
        var url = "/Home/Teacher/ajaxHeadImg";
        //FormData对象
        var fd = new FormData();
        if (headimg) {
            fd.append("file0", headimg[0]); 
        }
        xhr.open("POST", url, true);
        //xhr.setRequestHeader('Content-type', 'multipart/form-data');
        xhr.send(fd);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = xhr.responseText;
                var json = eval('(' + result + ')');
                if(json.status==1){
                    layer.msg(json.info);
                    //setTimeout(function(){ location.reload(); },1000);
                    var imgshow = document.getElementById('imgshow');
                    var headerimgshow = document.getElementById('headerimgshow');
                    imgshow.src = json.data;
                    headerimgshow.src = json.data;
                }else{
                    layer.msg(json.data);
                }
            }
        }
    }
    

	
});