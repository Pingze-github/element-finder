function dragable(ele){
    var clicked = false;
    var mausx = "0";
    var mausy = "0";
    var winx = "0";
    var winy = "0";
    var difx = "0";
    var dify = "0";
    if (ele.css('position')!='absolute'){
        ele.css('position','absolute');
    }
    $("html").mousemove(function (event) {
        mausx = event.pageX;
        mausy = event.pageY;
        winx = ele.offset().left;
        winy = ele.offset().top;
        if (clicked == false) {
            difx = mausx - winx;
            dify = mausy - winy;
        }
        var newx = event.pageX - difx - ele.css("marginLeft").replace('px', '');
        var newy = event.pageY - dify - ele.css("marginTop").replace('px', '');
        ele.css({ top: newy, left: newx });
    });

    ele.mousedown(function (event) {
        clicked = true;
    });
    ele.mouseup(function (event) {
        clicked = false;
    });
}
dragable($('#drag'));

/*$('#drag').click(function(){ //检测不到finding状态的#drag.click，因为正在穿透
    var ele = $(this);
    setTimeout(function(){
        ele.css('pointer-events','none');
        ele.css('background','red');
    },100);
    setTimeout(function(){
        ele.css('pointer-events','auto');
        ele.css('background','green');
    },1000);
});*/

$('*').mouseup(function(event){
    event.stopPropagation();
    console.log('mouseup')
    console.log($(this).prop('outerHTML').replace(/\n/g,'').replace(/\s+/g,' ').substr(0,50));
    //$('#drag').mouseup()
    //alert($(this).prop('outerHTML').replace(/\n/g,'').replace(/\s+/g,' ').substr(0,50));
});

$('#drag').mousedown(function(){
    $(this).css('pointer-events','none');
    $('#drag').css('background','red');
});

$('#drag').mouseup(function(){
    $('#drag').css('pointer-events','auto');
    $('#drag').css('background','green');
});

/*            function detect(ele){
    ele.click(){
        $('*').click(function(event){
            event.stopPropagation();
            console.log($(this).prop('outerHTML').replace(/\n/g,'').replace(/\s+/g,' '));
        });
    }
}*/
/*
1.做成开关式，打开开关后，封闭事件，点击任意位置，显示NODE，同时开关关闭，恢复事件。
    不可能恢复解除绑定的事件。需要彻底失效所有click事件。
2.做成拖动式，只检查探测器位置的NODE，利用mouseup。
    按下 - 穿透 - 弹起 ,监听弹起事件
    这个可行！
*/
/*
1. 按下后穿透，这时拖动会产生选中效果。
2. 检测不到#drag的mouseup，会无法放下。
3. mouseup 和 mousedown 形成死循环。
*/
