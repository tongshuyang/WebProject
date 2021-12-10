# bjy-live-h5-vue-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## change log
> ###### 2021-11-05

-   demo支持Bplayer低延时播放器
> ###### 2021-11-05

_bugfix_

-   直播模板读取后台配置（BJY.store.get('partner.mTemplate')）
-   以视频为主模板白板课件全屏兼容 iOS
-   主屏为视频时，主讲未开麦不允许全屏
-   支持单页面应用集成直播间，直播间销毁时 BJY.dispose(BJY.config.BJY_DISPOSE_TYPE_OUT_ROOM）销毁直播间，BJY.eventEmitter.off('your-namespace')) 解绑事件监听 (namespace 是以 . 开头的字符串)
