//获取被点击的元素
$('*').click(function(event){
    //event.stopPropagation();
    console.log($(this).prop('outerHTML').replace(/\n/g,'').replace(/\s+/g,' '));
});

//可拖动的组件
clicked = false;
mausx = "0";
mausy = "0";
winx = "0";
winy = "0";
difx = mausx - winx;
dify = mausy - winy;

$("html").mousemove(function (event) {
    mausx = event.pageX;
    mausy = event.pageY;
    winx = $("#drag").offset().left;
    winy = $("#drag").offset().top;
    if (clicked == false) {
        difx = mausx - winx;
        dify = mausy - winy;
    }
    var newx = event.pageX - difx - $("#drag").css("marginLeft").replace('px', '');
    var newy = event.pageY - dify - $("#drag").css("marginTop").replace('px', '');
    $("#drag").css({ top: newy, left: newx });
});

$("#drag").mousedown(function (event) {
    clicked = true;
    console.log('down');
});

$("#drag").mouseup(function (event) {
    clicked = false;
    console.log('up');
});
