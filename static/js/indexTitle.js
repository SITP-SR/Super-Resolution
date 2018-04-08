/**
 * Created by zayy on 2016/8/12.
 */
$(function(){
    $('#title').addClass('animated bounceIn');
    // $('#title2').addClass('animated fadeOut');
    // $('#title3').addClass('animated fadeOut');
    $('.sub-text').addClass('animated fadeInUp');
    // Circle();
});
// function Circle(){
//     // setTimeout(function(){
//     //     $('#background1').addClass('animated fadeOut');
//     // }, 5000);
//     // setTimeout(function(){
//     //     $('.sub-text').addClass('animated fadeOut');
//     //     $('.sub-text').removeClass('fadeInUp');
//     //     $('#title').addClass('animated fadeOut');
//     //     $('#title2').removeClass('animated fadeOut');
//     //     $('#title2').addClass('animated flipInX');
//     // }, 6000);
//     // setTimeout(function(){
//     //     $('#background2').addClass('animated fadeOut');
//     // }, 11000);
//     // setTimeout(function(){
//     //     $('#title2').addClass('animated fadeOut');
//     //     $('#title2').removeClass('flipInX');
//     //     $('#title3').removeClass('animated fadeOut');
//     //     $('#title3').addClass('animated fadeInUp');
//     // }, 12000);
//     // setTimeout(function(){
//     //     $('#background3').addClass('animated fadeOut');
//     //     $('#title3').addClass('animated fadeOut');
//     //     $('#background1').removeClass('animated fadeOut');
//     //     $('#background1').addClass('animated fadeIn');
//     // }, 17000);
//     // setTimeout(function(){
//     //     $('#title').removeClass('animated fadeOut');
//     //     $('#title').addClass('animated bounceIn');
//     //     $('#background2').removeClass('animated fadeOut');
//     //     $('#background2').addClass('animated fadeIn');
//     //     $('#background3').removeClass('animated fadeOut');
//     //     $('#background3').addClass('animated fadeIn');
//     // }, 18000);
//
//     setTimeout(function(){
//         $('.sub-text').removeClass('animated fadeOut');
//         $('.sub-text').addClass('animated fadeInUp');
//     }, 18000);
//     setTimeout('Circle()',17000);
// }

//判断浏览器是否支持FileReader接口
// if (typeof FileReader == 'undefined') {
//     document.getElementById("imgWarning").InnerHTML = "<h1>当前浏览器不支持FileReader接口</h1>";
//     //使选择控件不可操作
//     document.getElementById("img-container").setAttribute("disabled", "disabled");
// }

//选择图片，马上预览
function UploadImg(obj) {
    var file = obj.files[0];

    console.log(obj);console.log(file);
    console.log("file.size = " + file.size);  //file.size 单位为byte

    var reader = new FileReader();

    //读取文件过程方法
    reader.onloadstart = function (e) {
        console.log("开始读取....");
    }
    reader.onprogress = function (e) {
        console.log("正在读取中....");
    }
    reader.onabort = function (e) {
        console.log("中断读取....");
    }
    reader.onerror = function (e) {
        console.log("读取异常....");
    }
    reader.onload = function (e) {
        console.log("成功读取....");

        var img = document.getElementById("img-container");
        img.src = e.target.result;
        //或者 img.src = this.result;  //e.target == this
    }

    reader.readAsDataURL(file)
}