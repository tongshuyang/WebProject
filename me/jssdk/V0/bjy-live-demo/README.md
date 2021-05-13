# 百家云直播Demo

## 快速开始

1. 在本机下载安装[Node.js LTS版本](https://nodejs.org/en/)，如已安装可跳过
2. 运行`npm start`
3. 在浏览器中输入`localhost:8080/?type={user_type}&number={user_number}&name={user_name}`进入，其中user_type为0，1，0为学生，1为老师， number和name自定义

# 入口文件

此Demo的静态资源入口文件为`/index.html`，主入口函数为`/src/main.js`。在`index.html`中的`main.init()`中传入了进入教室的数据，在具体生产环境中，请使用`sign`的方式进入教室，具体联系百家云技术支持。

## 目录结构

```
├── dep 依赖文件目录
├── index.html 主入口文件
└── src
    ├── main.js 主入口函数
    ├── auth.js 教室内权限控制，可在BJY.auth下访问
    ├── config.js 教室内常量，可在BJY.config下访问
    ├── eventEmitter.js 教室内事件，可在BJY.eventEmitter下访问
    ├── documentPanel.js 课件管理面板
    ├── function
    │   ├── createAnswerMachine.js 创建答题器
    │   ├── createDialog.js 创建基础对话框
    │   ├── createProgramSelectDialog.js 创建应用程序共享选择对话框（仅客户端下支持此功能）
    │   ├── createRecord.js 创建录制入口
    │   ├── createShareScreen.js 创建屏幕分享入口
    │   ├── createStartButton.js 创建上下课按钮
    │   ├── rollCallStudent.js 创建学生端点名弹框
    │   └── rollCallTeacher.js 创建老师端点名入口
    ├── loading.js 进入教室的载入进度条
    ├── messagePanel.js 聊天列表
    ├── playerPanel.js 播放器列表
    ├── roleMap.js 用户角色定义
    ├── settingPanel.js 底部主菜单栏
    ├── userPanel.js 用户列表
    ├── whiteboard.js 白板
    ├── ui.js 基础UI组件
    ├── img 图片资源
    ├── css
    │   ├── base.css 页面基础样式
    │   └── style.css 组件布局样式
    ├── language
    │   ├── chinese.js 中文版话术
    │   ├── english.js 英文版话术
    │   └── main.js 话术入口文件，根据浏览器语言选择不同的话术

```

