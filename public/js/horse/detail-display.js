function displayDetail(a) {
    let id = "picture" + a;
    let value = $("#" + id).attr("src");
    if (value.indexOf(".mp4") > 0) {
        $("#videoDisplay").attr("src", value);
        $("#pictureDisplay").css("display", "none");
        $("#videoDisplay").css("display", "block");
    } else {
        $("#pictureDisplay").attr("src", value);
        $("#videoDisplay").css("display", "none");
        $("#pictureDisplay").css("display", "block");
    }

}