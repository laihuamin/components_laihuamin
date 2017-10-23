
## barrage

* barrage(config)
	* config.container - 所要生成弹幕的主容器
	* config.speed - 弹幕的速度

* barrage.createDom() - 初始化一个内容块层

## barrage实力方法

* append(itemHTML, top, right, speed, cb) - 插入弹幕内容
    * itemHTML - 弹幕内容，可以自己定义
    * top - 弹幕基于容器的定位
    * right - 弹幕滑动的终止位置
    * speed - 传入的弹幕速度，可以个性化，上面的速度是全部的
    * cb - 弹幕播放完的回调

* close() - 关闭弹幕层

* show() - 打开弹幕层

* removeAll() - 清除现有的弹幕

