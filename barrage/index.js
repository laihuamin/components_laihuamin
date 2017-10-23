
const defaultConfig = {
    top: 0,   // 距离底部的高度
    speed: 8,   // 弹幕滚动的速度
    overlay: true,   //蒙版层
    hasOverlay: true,   //是否显示模版
    height: '100%',
    width: '100%'
};

const barrage = (container, config) => {
    const cf = $.extend({}, defaultConfig, config);
    if(cf.overlay) {
        const $overlay = $('<div></div>').addClass('overlay');
        container.append($overlay);
        $overlay.css({
            'position': 'absolute',
            'left': 0,
            'top': 0,
            'width': cf.width,
            'height': cf.height,
            'z-index': 10,
            'overflow': 'hidden'
        });
        if(cf.hasOverlay) {
            $overlay.css({
                'background': 'rgba( 47, 52, 61,.4)'            
            })
        } else {
            $overlay.css({
                'background': 'rgba( 47, 52, 61, 0)'            
            })
        }
    }
}

barrage.item = (content, config) => {
    // 弹幕的一些配置
    const cf = $.extend({}, defaultConfig, config);
    const container = $('.overlay');
    // 弹幕的内容
    cf.content = content || '';
    // 一些初始化的变量
    let this_width = container.width(),
        this_height = container.height(),
        top = 0,
        conHeight = 0;
        // 初始化一些html
    const div_barrage_container = container,
        $content = $('<div></div>', {
            'class': `barrage`
        });
    div_barrage_container.append($content);
    $content.html(cf.content);
    conHeight = $content.height();
    if (cf.top + conHeight > this_height) {
        top = cf.top - conHeight;
    } else if (cf.top <= 0) {
        top = 40 * Math.random();
    } else {
        top = cf.top;
    }
    $content.css({
        'position': 'absolute',
        'top': `${top}px`,
        'z-index': 999,
        'right': '-7.68rem',
        'text-align': 'center'
    });
    $content.animate({right: this_width},
        (cf.speed * 1000), () => {
            $content.remove();
        });
};

// 整个弹幕的开关

barrage.close = () => {
    $('.overlay').css({
        'opacity': 0,
        'transition': 'opacity linear 1s'
    });
};

barrage.show = () => {
    $('.overlay').css({
        'opacity': 1,
        'transition': 'opacity linear 1s'
    });
}

// 屏幕弹幕清除
barrage.removeAll = () => {
    $('.barrage').remove();
};
module.exports = barrage;
