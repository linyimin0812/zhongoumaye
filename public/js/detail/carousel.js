// 上翻页
function turnUp(){
    let i = 1;
    for(i = 1; i < 10; i++){
        let text = $(`#img-responsive${i}`).attr("style");
        if(text.indexOf("block") > 0){
            if(i > 6){
                alert("已经到顶啦！！！");
                break;
            }
            $(`#img-responsive${i}`).attr("style", "padding-bottom:2px; display: none");
            $(`#img-responsive${i+3}`).attr("style", "padding-bottom:2px; display: block");
            break;
        }
    }
}

// 下翻页
function turnBottom(){
    let i = 9;
    for(i = 9; i > 0; i--){
        let text = $(`#img-responsive${i}`).attr("style");
        if(text.indexOf("block") > 0){
            if(i < 4){
                alert("已经到底啦！！！")
                break;
            }
            $(`#img-responsive${i}`).attr("style", "padding-bottom:2px; display: none");
            $(`#img-responsive${i-3}`).attr("style", "padding-bottom:2px; display: block;");
            break;
        }
    }
}