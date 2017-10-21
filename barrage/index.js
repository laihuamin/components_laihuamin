const defaultBarrage = {
    // close:true,   //单条弹幕的开关
    bottom: 0,   //距离底部的高度
    speed: 8,   //弹幕滚动的速度
    // color: '#fff',  //弹幕的颜色
    // old_ie_color : '#000000'    //弹幕的背景色
}

const barrage = (container, content, config) => {
    // 弹幕的一些配置
    const cf = $.extend({}, defaultBarrage, config);
    // 弹幕的内容
    cf.content = content || '';
    // 一些初始化的变量
    const time = new Date().getTime();
    let barrage_class = `barrage_${time}`,     //根据上面的时间来确定id
        window_width = $(window).width(),
        window_height = $(window).height() - 100,
        this_width = container.width() > window_width ? window_width : container.width(),
        this_height = container.height() > window_height ? window_height : container.height(),
        bottom = (cf.bottom == 0) ? Math.floor(Math.random() * this_height + 40) : barrage.bottom;
    // 初始化一些html
    const div_barrage_container = container;
    cf.content.appendTo(div_barrage_container);
    cf.content.addClass(`${barrage_class} ${barrage}`);
    $(`.${barrage_class}`).css({
        'position': 'absolute',
        'bottom': `${bottom}px`
    })
    $(`.${barrage_class}`).animate({right: this_width}, cf.speed*1000, () => {
        $(`.${barrage_class}`).remove();
    });
}

// 整个弹幕的开关

barrage.prototype.close = (isClose) => {
    if(isClose) {
        $('.barrage').css({
            'opacity': 0
        })
    } else {
        $('.barrage').css({
            'opacity': 1
        })
    }
}

// 屏幕弹幕清除
barrage.prototype.removeAll = () => {
    $('.barrage').remove();
}

module.exports = barrage;