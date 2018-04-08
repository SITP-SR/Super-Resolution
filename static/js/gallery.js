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
            success: function (data) {
                var imgList = data;
            },
            error: function () {
                alert("Fail to connect the server！");
            }
        });
        for(var i=0;i<imgList.length;i++){
        var temp = '<div class="post"><a class="example-image-link" href= "images/images1.jpg" data-lightbox="example-set"><img src="static/images/images1.jpg" alt="" /></a></div>';
        $("#listing").append(temp);
    }
}