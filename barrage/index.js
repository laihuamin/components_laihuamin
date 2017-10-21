
const defaultBarrage = {
    bottom: 0,   // 距离底部的高度
    speed: 8   // 弹幕滚动的速度
};

const barrage = (container, content, config) => {
    // 弹幕的一些配置
    const cf = $.extend({}, defaultBarrage, config);
    // 弹幕的内容
    cf.content = content || '';
    // 一些初始化的变量
    const time = new Date().getTime();
    let barrage_class = `barrage_${time}`,     // 根据上面的时间来确定id
        window_width = $(window).width(),
        window_height = $(window).height() - 100,
        this_width = container.width() > window_width ? window_width : container.width(),
        this_height = container.height() > window_height ? window_height : container.height(),
        bottom = (cf.bottom === 0) ? Math.floor(Math.random() * this_height + 40) : cf.bottom;
        // 初始化一些html
    const div_barrage_container = container,
        $content = $('<div></div>', {
            'class': `${barrage_class} barrage`
        });
    div_barrage_container.append($content);
    $content.html(cf.content);
    $(`.${barrage_class}`).css({
        'position': 'absolute',
        'bottom': `${bottom}px`,
        'z-index': 999,
        'margin-right': '0',
        'right': '0'
    });
    console.log(cf.speed);
    $(`.${barrage_class}`).animate({right: this_width},
        (cf.speed * 1000), 'linear', () => {
            $(`.${barrage_class}`).remove();
        });
};

// 整个弹幕的开关

barrage.close = (isClose) => {
    if (isClose) {
        $('.barrage').css({
            'opacity': 0
        });
    } else {
        $('.barrage').css({
            'opacity': 1
        });
    }
};

// 屏幕弹幕清除
barrage.removeAll = () => {
    $('.barrage').remove();
};

module.exports = barrage;
