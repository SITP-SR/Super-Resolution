console.log("hello")

$("#img").on("change", function() {
    console.log(`file name is ${this.value}`);
    let formData = new FormData(this.form);
    formData.append("fileName", this.value);
    // console.log(formData);
});

function send() {

}

$("#form").submit(function (e) {
    e.preventDefault();
    console.log($('#form').serializeArray());
    // $.post(
    //     "/sendImg",
    //     $("#form").serialize())
    //     .done(function (msg) {
    //         console.log(msg);
    //     })
    $.ajax({
        url: "/sendImg",
        type: "POST",
        // dataType: "JSON",
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function (data, status)
        {
            console.log('s');
        },
        error: function (xhr, desc, err)
        {
            console.log(err);

        }
    });
    return false;
})
