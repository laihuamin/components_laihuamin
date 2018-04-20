class Barrage {
    constructor (config) {
        if (!config.container) {
            console.log('请传入弹幕容器DOM');
            return;
        }
        this.defaultConfig = {
            container: null,  // 弹幕容器
            speed: 8          // 弹幕滚动的速度
        };
        this.config = $.extend({}, this.defaultConfig, config);

        this.createDom();
    }
    createDom () {
        this.content = $('<div class="barrage-wrap"></div>');
        // 如果想外部修改content的样式，可以通过barrage-wrap，设置important属性
        this.content.css({
            'position': 'absolute',
            'left': 0,
            'top': 0,
            'width': '100%',
            'height': '100%',
            'z-index': 10,
            'overflow': 'hidden',
            'background': 'rgba( 47, 52, 61, 0)'   
        });
        this.config.container.append(this.content);
    }
    append (itemHTML, top, right, speed, cb) {
        const barrageItemWrap = $(`<div class="barrage-item">${itemHTML}</div>`);
        this.content.append(barrageItemWrap);
        barrageItemWrap.css({
            'position': 'absolute',
            'top': `${top}px`,
            'z-index': 999,
            'right': '-7.68rem',
            'text-align': 'center'
        });
        barrageItemWrap.animate({right},
            (speed || this.config.speed) * 1000, () => {
                barrageItemWrap.remove();
            });
        typeof cb === 'function' && cb();
    }
    close () {
        this.content.css({
            'opacity': 0,
            'transition': 'opacity linear 1s'
        });
    }
    show () {
        this.content.css({
            'opacity': 1,
            'transition': 'opacity linear 1s'
        });
    }
    removeAll () {
        this.config.container.html('');
    }
}

export default Barrage;
