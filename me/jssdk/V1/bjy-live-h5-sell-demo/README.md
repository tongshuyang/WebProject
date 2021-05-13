# H5直播带货模板Demo - bjy-live-h5-sell-demo
直播带货模板Demo 基于百家云jssdk 1.32.2+ 开发，使用了jssdk 提供的 Loading,MessageList,MessageSender,Player组件。    

Demo中的购物车组件CustomShop是通过jssdk提供的自定义信令方式实现，自定义信令客户可以根据业务需要自己定义。

Demo是基于Vue 2.6实现

## 兼容性
因为手机端H5网页video可能被原生播放器替换，导致页面组件不能正常覆盖在视频上，部分浏览器暂时无法支持    

* 支持的浏览器：微信、qq浏览器、chrom浏览器、360浏览器、猎豹、火狐、三星自带浏览器、小米自带浏览器    

* 不支持的浏览器：钉钉浏览器、UC浏览器、搜狗浏览器、魅族自带浏览器    

目前已知的腾讯X5内核支持使用x5-video-player-type：h5-page属性申明可在视频上方显示html元素 [参考](https://docs.qq.com/doc/DTUxGdWZic0RLR29B)     


**以上浏览器可能会随着版本升级逐步支持这种视频上方显示html元素的方式**


## 项目结构
```
src
├── App.vue  
├── assets                         资源文件
├── common                        通用的样式文件及全局变量
│   ├── common.scss               通用样式及icon
│   └── roleMap.js                直播间角色映射
├── components                    组件
│   ├── CustomShop.vue            购物车 （客户通过自定义信令实现，也可以考虑iframe嵌套第三方页面配合自定义信令实现）
│   ├── ExitLive.vue              退出直播间
│   ├── Loading.vue               进直播间加载进度条（可根据需要配置自定义logo或去掉）
│   ├── MessageList.vue           聊天列表
│   ├── Player.vue                竖屏全屏播放器
│   ├── Presenter.vue             主播状态
│   └── common                    共用组件
│       └── Confirm
│           ├── Confirm.vue
│           └── confirm.js
└── main.js                       入口文件
```

## 运行和构建
```
#install
npm install

#run
npm run serve

#build
npm run build

#lint
npm run lint
npm run lint --fix
```