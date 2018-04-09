function showImgList() {
    // var imgList=['static/images/images1.jpg','static/images/images1.jpg','static/images/images1.jpg','static/images/images1.jpg'];
    // for(var i=0;i<imgList.length;i++){
    //     var temp = '<div class="post"><a class="example-image-link" href= "images/images1.jpg" data-lightbox="example-set"><img src="static/images/images1.jpg" alt="" /></a></div>';
    //     $("#listing").append(temp);
    // }
    var imgList;
    $.ajax({
            url: '/getAllImage',
            type: 'post',
            async: false, //同步
            dataType: 'json',
            success: function (data) {
                console.log(data.url_list);
                // var imgJson = $.parseJSON(data);
                // console.log(imgJson);
                imgList=data.url_list;
            },
            error: function () {
                alert("Fail to connect the server！");
            }
        });

        for(var i=0;i<imgList.length;i++){
            var str=imgList[i];
            var temp = '<div class="post"><a class="example-image-link" href= "images/images1.jpg" data-lightbox="example-set"><img src="'+str+'" alt="" /></a></div>';
            $("#listing").append(temp);
    }
}