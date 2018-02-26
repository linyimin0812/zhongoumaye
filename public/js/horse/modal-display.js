function displayPicture(a){
    let id = "display" + a;
    // 获取相关的id的图片url，并交由图片模态框显示
    $(`#${id}`).attr("src", function(i, value){
        let src = value;
        // 设置图片模态框的src值
        $("#pictureModal").modal("show");
        $("#modalPicture").attr("src", function(){
            return value;
        });
    })
}