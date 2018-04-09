/*global Qiniu */
/*global plupload */
/*global FileProgress */
/*global hljs */
var firstUrl;
function generate() {
    $.ajax({
        type:"POST",
        url:"/improveImage",
        async:false,
        data:{"img_url":firstUrl},
        // dataType: 'json',
        success:function (data) {
            console.log(data);
            // var secondUrlJson = JSON.parse(data);
            // console.log(secondUrlJson.processed_img_url);
            $('#processedImg').attr('src', data);
        }
    });
}
function getToken() {
    var token;
    $.ajax({
        type: "POST",
        url: "/upload_token",
        async: false,
        //data:"name="+$("[name=name]").val()+"&pwd="+$("[name=pwd]").val(),
        success: function(data){
            token = data;
        },
        error: function(){
        }
    });
    return token;
}

$(function() {
    // console.log(getToken())
    var uptoken = getToken();
    console.log(uptoken);
    var uploader = Qiniu.uploader({
        disable_statistics_report: true,
        makeLogFunc: 1,
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles',
        container: 'container',
        drop_element: 'container',
        max_file_size: '10000mb',
        //flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
        dragdrop: true,
        chunk_size: '4mb',
        multi_selection: !(moxie.core.utils.Env.OS.toLowerCase()==="ios"),
        // uptoken:$('#uptoken_url').val(),
        uptoken: uptoken,
        //uptoken_url : 'http://app.yscase.com/qiniu/upload/upload_token.php?1501661704642',
        unique_names: true,
        max_retries: 7,                     // 上传失败最大重试次数
        // uptoken_func: function(){
        //     var ajax = new XMLHttpRequest();
        //     ajax.open('GET', $('#uptoken_url').val(), false);
        //     ajax.setRequestHeader("If-Modified-Since", "0");
        //     ajax.send();
        //     if (ajax.status === 200) {
        //         var res = JSON.parse(ajax.responseText);
        //         console.log('custom uptoken_func:' + res.uptoken);
        //         return res.uptoken;
        //     } else {
        //         console.log('custom uptoken_func err');
        //         return '';
        //     }
        // },
        domain: $('#domain').val(),
        get_new_uptoken: false,
        // downtoken_url: '/downtoken',
         //unique_names: true,
         //save_key: true,
        // x_vars: {
        //     'id': '1234',
        //     'time': function(up, file) {
        //         var time = (new Date()).getTime();
        //         // do something with 'time'
        //         return time;
        //     },
        // },
        auto_start: true,
        log_level: 5,
        init: {
            'BeforeChunkUpload':function (up,file) {
                console.log("before chunk upload:",file.name);
            },
            'FilesAdded': function(up, files) {
                // $('table').show();
                // $('#success').hide();
                plupload.each(files, function(file) {
                    console.log('filetype: ' + file.type);
                    if(file.type=='image/bmp' || file.type=='image/jpeg'||file.type=='image/jpg'||file.type=='image/png'||file.type=='image/gif' || file.type=='video/x-matroska' || file.type=='video/mp4'){
                        console.log('type:' + file.type);
                        isUpload =true;
                        // file.album_name=album_name;
                        // var progress = new FileProgress(file, 'fsUploadProgress');
                        // progress.setStatus("等待...");
                        // progress.bindUploadCancel(up);
                    }else {
                        isUpload = false;
                        up.removeFile(file);
                        console.log('上传类型只能是.jpg,.png,.gif,.mkv');
                        return false;
                    }});
            },
            'BeforeUpload': function(up, file) {
                console.log("this is a beforeupload function from init");
                // var progress = new FileProgress(file, 'fsUploadProgress');
                // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                // if (up.runtime === 'html5' && chunk_size) {
                //     progress.setChunkProgess(chunk_size);
                // }
            },
            'UploadProgress': function(up, file) {
                // var progress = new FileProgress(file, 'fsUploadProgress');
                // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                // progress.setProgress(file.percent + "%", file.speed, chunk_size);
            },
            'UploadComplete': function() {
                // $('#success').show();
            },
            'FileUploaded': function(up, file, info) {
                // var progress = new FileProgress(file, 'fsUploadProgress');
                // progress.setComplete(up, info);
                var res = $.parseJSON(info.response);
                firstUrl=$('#domain').val()+res.key;
                // alert(firstUrl);
                $('#img-container').attr('src', firstUrl);

            },
            'Error': function(up, err, errTip) {
                // $('table').show();
                // var progress = new FileProgress(err.file, 'fsUploadProgress');
                // progress.setError();
                // progress.setStatus(errTip);
            }

            // ,
            // 'Key': function(up, file) {
            //     var key = "";
            //     // do something with key
            //     return key
            // }
        }
    });
    // uploader.bind('FilesAdded', function() {
    //     console.log("hello man, a file added");
    // });
    // uploader.bind('BeforeUpload', function () {
    //     console.log("hello man, i am going to upload a file");
    // });
    // uploader.bind('FileUploaded', function () {
    //     console.log('hello man,a file is uploaded');
    // });
    // $('#up_load').on('click', function(){
    //     uploader.start();
    // });
    // $('#stop_load').on('click', function(){
    //     uploader.stop();
    // });
    // $('#retry').on('click', function(){
    //     uploader.stop();
    //     uploader.start();
    // });
    $('#container').on(
        'dragenter',
        function(e) {
            e.preventDefault();
            $('#container').addClass('draging');
            e.stopPropagation();
        }
    ).on('drop', function(e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
    }).on('dragleave', function(e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
    }).on('dragover', function(e) {
        e.preventDefault();
        $('#container').addClass('draging');
        e.stopPropagation();
    });



    // $('#show_code').on('click', function() {
    //     $('#myModal-code').modal();
    //     $('pre code').each(function(i, e) {
    //         hljs.highlightBlock(e);
    //     });
    // });


    // $('body').on('click', 'table button.btn', function() {
    //     $(this).parents('tr').next().toggle();
    // });


    // var getRotate = function(url) {
    //     if (!url) {
    //         return 0;
    //     }
    //     var arr = url.split('/');
    //     for (var i = 0, len = arr.length; i < len; i++) {
    //         if (arr[i] === 'rotate') {
    //             return parseInt(arr[i + 1], 10);
    //         }
    //     }
    //     return 0;
    // };
    //
    // $('#myModal-img .modal-body-footer').find('a').on('click', function() {
    //     var img = $('#myModal-img').find('.modal-body img');
    //     var key = img.data('key');
    //     var oldUrl = img.attr('src');
    //     var originHeight = parseInt(img.data('h'), 10);
    //     var fopArr = [];
    //     var rotate = getRotate(oldUrl);
    //     if (!$(this).hasClass('no-disable-click')) {
    //         $(this).addClass('disabled').siblings().removeClass('disabled');
    //         if ($(this).data('imagemogr') !== 'no-rotate') {
    //             fopArr.push({
    //                 'fop': 'imageMogr2',
    //                 'auto-orient': true,
    //                 'strip': true,
    //                 'rotate': rotate,
    //                 'format': 'png'
    //             });
    //         }
    //     } else {
    //         $(this).siblings().removeClass('disabled');
    //         var imageMogr = $(this).data('imagemogr');
    //         if (imageMogr === 'left') {
    //             rotate = rotate - 90 < 0 ? rotate + 270 : rotate - 90;
    //         } else if (imageMogr === 'right') {
    //             rotate = rotate + 90 > 360 ? rotate - 270 : rotate + 90;
    //         }
    //         fopArr.push({
    //             'fop': 'imageMogr2',
    //             'auto-orient': true,
    //             'strip': true,
    //             'rotate': rotate,
    //             'format': 'png'
    //         });
    //     }
    //
    //     $('#myModal-img .modal-body-footer').find('a.disabled').each(function() {
    //
    //         var watermark = $(this).data('watermark');
    //         var imageView = $(this).data('imageview');
    //         var imageMogr = $(this).data('imagemogr');
    //
    //         if (watermark) {
    //             fopArr.push({
    //                 fop: 'watermark',
    //                 mode: 1,
    //                 image: 'http://www.b1.qiniudn.com/images/logo-2.png',
    //                 dissolve: 100,
    //                 gravity: watermark,
    //                 dx: 100,
    //                 dy: 100
    //             });
    //         }
    //
    //         if (imageView) {
    //             var height;
    //             switch (imageView) {
    //                 case 'large':
    //                     height = originHeight;
    //                     break;
    //                 case 'middle':
    //                     height = originHeight * 0.5;
    //                     break;
    //                 case 'small':
    //                     height = originHeight * 0.1;
    //                     break;
    //                 default:
    //                     height = originHeight;
    //                     break;
    //             }
    //             fopArr.push({
    //                 fop: 'imageView2',
    //                 mode: 3,
    //                 h: parseInt(height, 10),
    //                 q: 100,
    //                 format: 'png'
    //             });
    //         }
    //
    //         if (imageMogr === 'no-rotate') {
    //             fopArr.push({
    //                 'fop': 'imageMogr2',
    //                 'auto-orient': true,
    //                 'strip': true,
    //                 'rotate': 0,
    //                 'format': 'png'
    //             });
    //         }
    //     });
    //
    //     var newUrl = Qiniu.pipeline(fopArr, key);
    //
    //     var newImg = new Image();
    //     img.attr('src', 'images/loading.gif');
    //     newImg.onload = function() {
    //         img.attr('src', newUrl);
    //         img.parent('a').attr('href', newUrl);
    //     };
    //     newImg.src = newUrl;
    //     return false;
    // });

});

