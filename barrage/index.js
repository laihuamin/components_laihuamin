const defaultBarrage = {
    close:true,   //单条弹幕的开关
    bottom: 0,   //距离底部的高度
    speed: 8,   //弹幕滚动的速度
    color: '#fff',  //弹幕的颜色
    old_ie_color : '#000000'    //弹幕的背景色
}

const barrage = (container, content, config) => {
    // 弹幕的一些配置
    const cf = $.extend({}, defaultBarrage, config);
    // 弹幕的内容
    cf.content = content || '';
    // 一些初始化的变量
    const time = new Date().getTime();
    let barrage_id = `barrage_${time}`;
    let id = `#${barrage_id}`;
    const div_barrage = ``
}

// 整个弹幕的开关

// 屏幕弹幕清除


