# bjy-live-vue-demo

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

### 百家云js-sdk demo(vue版本)

#### 说明
> 使用vue-cli3构建

1.在public/index.html里面按需引入所需要的使用的组件依赖，注意，依赖顺序不要随意改变。

2.demo的默认教室是普通大班课，非webrtc大班课。

3.demo的默认教室老师端链接：https://tiansujing.at.baijiayun.com/web/room/prepare?room_id=20031462297090&code=9z3acy&urlType=36cltcfmv4.

4.demo支持输入传送门链接进入教室，在url后加上&debug=1，在弹出的prompt中输入传送门链接即可。

5.webrtc大班课需要在传送门链接后拼上&webrtc=1。普通大班课直接输入传送门链接进入。

6.eventEmitter触发的事件回调中，this指向回调执行环境，如有在回调中涉及到操作当前vue实例的数据，建议使用箭头函数，本demo中所有事件回调统一使用箭头函数。

7. 老师端链接：https://tiansujing.at.baijiayun.com/web/room/quickenter?code=9z3acy&user_name=%E7%94%A8%E6%88%B78572
