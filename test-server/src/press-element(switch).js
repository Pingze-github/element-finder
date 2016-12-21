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
dragable($('#switch'));

window.switch_on = false;

function unbindAllClickEvents(){
    $('*:not(#switch)').each(function(){
        if ($._data($(this)[0],'events')){
            var events_backup_click = $._data($(this)[0],'events').click;
            $(this).data('events_backup_click',events_backup_click);
            delete $._data($(this)[0],'events').click;
        }
    });
}

function rebindAllClickEvents(){
    $('*:not(#switch)').each(function(){
        if ($(this).data('events_backup_click')){
            var events_backup_click = $(this).data('events_backup_click');
            $._data($(this)[0],'events').click=events_backup_click;
        }
    }); 
}

function unbindAllUserClickEvents(){
    $('*:not(#switch)').each(function(){
        var events_backup_click = $._data($(this)[0],'events').click;
        $(this).data('events_backup_click',events_backup_click);
        //if (events_backup_click[0].){
        var events_backup_click_default = events_backup_click.slice(0,1);
        //}
        $._data($(this)[0],'events').click = events_backup_click_default;
    });
}

function rebindAllUserClickEvents(){
    $('*:not(#switch)').each(function(){
        var events_backup_click = $(this).data('events_backup_click');
        $._data($(this)[0],'events').click=events_backup_click;
    }); 
}

function reloadClick(ele){
    var downpos = [0,0];
    var downing = false;
    ele.mousedown(function(event){
        downpos = [event.pageX,event.pageY];
        downing = true;
    });
    ele.mouseup(function(event){
        var uppos = [event.pageX,event.pageY];
        if (downing){
            if(uppos.toString()==downpos.toString()){//click
                console.log('on')
                ele.css('pointer-events','none');
                ele.css('background','red');
                window.switch_on = true;
                unbindAllClickEvents();
                bindClickShow();
            }else{//drag
                ;
            }
            downing = false;
        }
    });
}

reloadClick($('#switch'));

function posOnEle(pos,ele){
    var posx = pos[0];
    var posy = pos[1];
    var ele_top = ele.offset().top;
    var ele_bottom = ele_top + ele.height();
    var ele_left = ele.offset().left;
    var ele_right = ele_left + ele.width();
    if (ele_left<=posx && posx<=ele_right && ele_top<=posy && posy<=ele_bottom){
        return true;
    }else{
        return false;
    }
}

function bindClickShow(){
    $('*:not(#switch)').click(function(event){
        event.stopPropagation(); //阻止事件传播
        event.preventDefault(); //阻止默认事件
        if (window.switch_on && $(this)[0]!=$('#switch').parent()[0]){
            pos = [event.pageX,event.pageY];
            if (posOnEle(pos,$('#switch')) ){
                $('#switch').css('pointer-events','auto');
                $('#switch').css('background','green');
                window.switch_on = false;
                rebindAllClickEvents()
                //return false;
            }else{
                console.log($(this).prop('outerHTML').replace(/\n/g,'').replace(/\s+/g,' ').substr(0,50));
                $('#switch').css('pointer-events','auto');
                $('#switch').css('background','green');
                window.switch_on = false;
                rebindAllClickEvents()
                //return false;
            }
            console.log('off')
        }
    });
}

$('#switch').unbind('click');

/*

// for one
var eb = $._data($('#submit')[0],'events');
$._data($('#submit')[0],'events',{});
$._data($('#submit')[0],'events',eb);

ebc = $._data($('#submit')[0],'events').click;
$._data($('#submit')[0],'events',{});
$._data($('#submit')[0],'events',ebc);

// for all

$('*').each(function(){
    var events_backup = $._data($(this)[0],'events');
    $(this).data('events_backup',events_backup);
    $._data($(this)[0],'events',{});
});

$('*').each(function(){
    var events_backup = $(this).data('events_backup');
    $._data($(this)[0],'events',events_backup);
});

//click

$('*').each(function(){
    var events_backup_click = $._data($(this)[0],'events').click;
    $(this).data('events_backup_click',events_backup_click);
    $._data($(this)[0],'events').click={};
});

$('*').each(function(){
    var events_backup_click = $(this).data('events_backup_click');
    $._data($(this)[0],'events').click=events_backup_click;
});

*/

//XXX如何实现再点一下关闭?(检测点击位置是否在switch内部)
//XXX如何实现拖动不开启开关？(重定义click)
//    switch不可点击,会使其父元素click()，应排除
//return false 阻止了a的跳转，不能阻止js跳转。

/*$("a").click(function(){ //此法可中止元素点击事件，但不能率先屏蔽
    console.log('a.click')
    return false;
});*/

/*$("body").bind("beforeunload",function(){ //仅阻止跳转事件
    alert('unload')
});

$(window).unload(function(){
    alert('unload')
});*/


/*            function detect(ele){
    ele.click(){
        $('*').click(function(event){
            event.stopPropagation();
            console.log($(this).prop('outerHTML').replace(/\n/g,'').replace(/\s+/g,' '));
        });
    }
}*/

/**/

/*
1.做成开关式，打开开关后，封闭事件，点击任意位置，显示NODE，同时开关关闭，恢复事件。
    不可能恢复解除绑定的事件。需要彻底失效所有click事件。
2.做成拖动式，只检查探测器位置的NODE，利用mouseup。
    按下 - 穿透 - 弹起 ,监听弹起事件
    这个可行！
*/
