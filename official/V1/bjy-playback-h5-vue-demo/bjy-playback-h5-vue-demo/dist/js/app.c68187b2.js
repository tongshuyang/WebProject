(function(e){function t(t){for(var a,i,s=t[0],c=t[1],u=t[2],d=0,f=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&f.push(o[i][0]),o[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);l&&l(t);while(f.length)f.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(a=!1)}a&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},o={app:0},r=[];function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var l=c;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"313f":function(e,t,n){"use strict";var a=n("38b6"),o=n.n(a);o.a},"38b6":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("a133"),n("ed0d"),n("f09c"),n("e117");var a=n("0261"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Loading",{on:{loaded:function(t){return e.loadEnd()}}}),e.loaded?n("div",{attrs:{id:"main"}},[n("div",{staticClass:"video-wrap"},[n("Player",{ref:"player",attrs:{videoData:e.videoData}})],1),n("div",{staticClass:"media-panel"},[n("div",{staticClass:"notice"},[n("Notice")],1),e.lineList.length>1?n("select",{directives:[{name:"model",rawName:"v-model",value:e.currentLine,expression:"currentLine"}],attrs:{name:"line",id:"line-control",title:"线路"},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.currentLine=t.target.multiple?n:n[0]}}},e._l(e.lineList,(function(t,a){return n("option",{key:a,domProps:{selected:a===e.currentLine,value:a}},[e._v(e._s(e._f("lineFilter")(a)))])})),0):e._e(),n("InteractionPanel")],1),n("ModalPanel")],1):e._e()],1)},r=[],i=(n("fe59"),n("b130"),n("513c"),n("e35a"),n("90aa"),n("0d7a"),n("08ba"),function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)}),s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"loading"}},[n("div",{staticClass:"placeholder"})])}],c={components:{},data:function(){return{}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){var e=this,t=BJY.playback.Loading.create({element:$("#loading .placeholder"),logoUrl:"http://img.baijiayun.com/0baijiacloud/logo/ydzb/v5/www-loading.png",onComplete:function(){e.$emit("loaded"),t.destroy()}})},beforeDestroy:function(){}},u=c,l=(n("ca79"),n("4023")),d=Object(l["a"])(u,i,s,!1,null,"f40794b4",null),f=d.exports,p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("video",{attrs:{id:"bjy-player-teacher","x5-playsinline":"true","x-webkit-airplay":"allow","webkit-playsinline":"true",playsinline:"true",controls:""}})},m=[],v=(n("ecb4"),n("5e9f"),{props:["videoData"],components:{},data:function(){return{tip:"",started:!1,video:null}},computed:{},watch:{videoData:{deep:!0,handler:function(e,t){this.attachVideo(e)}}},methods:{onPlaying:function(){BJY.playback.play()},onPause:function(){console.log("onpause"),BJY.playback.pause()},onSeeked:function(){console.log("onseeked"),BJY.playback.seek(this.video.currentTime),BJY.playback.play(),console.log(this.video.currentTime)},onTimeUpdate:function(){BJY.playback.timeupdate(this.video.currentTime)},attachVideo:function(e){var t=e.url;if(t=t.replace("https:","").replace("http:",""),t.indexOf("ev1")>-1&&flvjs){var n=flvjs.createPlayer({type:"ev1",url:t,cors:!0},{stashInitialSize:1024});n.attachMediaElement(this.video),n.load()}else this.video.src=t}},mounted:function(){var e=this.video=document.getElementById("bjy-player-teacher"),t=this.videoData,n=this;BJY.playback.start(),t&&(this.attachVideo(t),e.addEventListener("play",(function(){n.onPlaying()})),e.addEventListener("pause",(function(){n.onPause()})),e.addEventListener("seeked",(function(){n.onSeeked()})),e.addEventListener("timeupdate",(function(){n.onTimeUpdate()})))},beforeDestroy:function(){}}),h=v,b=(n("f51d"),Object(l["a"])(h,p,m,!1,null,"3ace1ac2",null)),g=b.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"interaction"},[n("div",{staticClass:"tab-header"},[n("span",{staticClass:"tab-message",class:{active:e.getCurrentTab("message")},on:{click:function(t){return e.setTab("message")}}},[e._v("聊天")]),n("span",{staticClass:"tab-question",class:{active:e.getCurrentTab("question")},on:{click:function(t){return e.setTab("question")}}},[e._v("问答")]),n("span",{staticClass:"tab-board",class:{active:e.getCurrentTab("board")},on:{click:function(t){return e.setTab("board")}}},[e._v("白板")])]),n("div",{staticClass:"tab-body"},[n("MessageList",{directives:[{name:"show",rawName:"v-show",value:e.getCurrentTab("message"),expression:"getCurrentTab('message')"}]}),n("QuestionAnswer",{directives:[{name:"show",rawName:"v-show",value:e.getCurrentTab("question"),expression:"getCurrentTab('question')"}]}),n("WhiteBoard",{directives:[{name:"show",rawName:"v-show",value:e.getCurrentTab("board"),expression:"getCurrentTab('board')"}]})],1)])},y=[],_=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},E=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"message-panel"}},[n("div",{staticClass:"message-list"})])}],x=(n("053b"),{}),T=BJY.config;x[T.ROLE_TYPE_TEACHER]={en:"teacher",cn:"老师"},x[T.ROLE_TYPE_ASSISTANT]={en:"assistant",cn:"助教"},x[T.ROLE_TYPE_STUDENT]={en:"student",cn:"学生"},x[T.ROLE_TYPE_GUEST]={en:"guest",cn:"游客"};var C=x,S=(BJY.eventEmitter,{components:{},data:function(){return{}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){BJY.MessageList.create({element:$("#message-panel .message-list"),replace:!1,renderEmoji:function(e,t){return BJY.isAlicloudImage(t)?'<img ondragstart="return false" src="'+t+'@100w_1e_1l.png" srcset="'+t+'@200w_1e_1l.png 2x">':'<img ondragstart="return false" src="'+t+'">'},renderImage:function(e){return BJY.isAlicloudImage(e)?'<img ondragstart="return false" src="'+e+'@100w_1e_1l.png" srcset="'+e+'@200w_1e_1l.png 2x">':'<img ondragstart="return false" src="'+e+'">'},renderUser:function(e,t,n){return{id:e.id,name:e.name,number:e.number,avatar:BJY.compressImage({url:e.avatar,width:t,height:n}),avatar2x:BJY.compressImage({url:e.avatar,width:2*t,height:2*n}),role:C[e.type].en,localRole:C[e.type].cn}},loadDistance:0})},beforeDestroy:function(){}}),k=S,O=(n("8027"),Object(l["a"])(k,_,E,!1,null,null,null)),L=O.exports,B=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},J=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"question-answer"}},[n("div",{staticClass:"placeholder"})])}],P=BJY.store,Y={components:{},data:function(){return{user:P.get("user")}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){BJY.QuestionAnswer.create({element:$("#question-answer .placeholder"),replace:!0,canManageQuestion:!1,limitPerMinute:100,countPerPage:8,inputMaxLength:140,pageBySwipe:!0,onCopyFinish:function(){}})},beforeDestroy:function(){}},j=Y,q=(n("d456"),Object(l["a"])(j,B,J,!1,null,null,null)),F=q.exports,I=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"whiteboard"}},[n("button",{staticClass:"btn",on:{click:function(t){return e.toggleWhiteboardFull()}}},[e._v(" "+e._s(e.isFull?"退出全屏":"全屏")+" ")]),n("div",{staticClass:"placeholder"})])},M=[],z={components:{},data:function(){return{isFull:!1}},computed:{},watch:{},methods:{toggleWhiteboardFull:function(){var e=document.getElementById("whiteboard");this.isFull?this.exitFullScreen():this.fullScreen(e),this.isFull=!this.isFull},fullScreen:function(e){return e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullScreen?e.webkitRequestFullScreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.msRequestFullscreen()},exitFullScreen:function(){var e=document;if(!e.exitFullscreen)return e.webkitExitFullscreen?e.webkitExitFullScreen():e.mozRequestFullscreen?e.mozExitFullscreen():e.msExitFullscreen();e.exitFullscreen()}},created:function(){},mounted:function(){BJY.Whiteboard.create({element:$("#whiteboard .placeholder")})},beforeDestroy:function(){}},N=z,D=(n("e474"),Object(l["a"])(N,I,M,!1,null,"d30f1e90",null)),R=D.exports,A={components:{MessageList:L,QuestionAnswer:F,WhiteBoard:R},data:function(){return{currentTab:"board"}},computed:{},watch:{},methods:{getCurrentTab:function(e){return this.currentTab===e},setTab:function(e){this.currentTab=e}},created:function(){},mounted:function(){},beforeDestroy:function(){}},Q=A,U=(n("313f"),Object(l["a"])(Q,w,y,!1,null,"05b64b80",null)),W=U.exports,V=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"pop"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.showModal,expression:"showModal"}],staticClass:"modal"},[n("span",{directives:[{name:"show",rawName:"v-show",value:e.showQuizClose,expression:"showQuizClose"}],staticClass:"quiz-close",on:{click:function(t){return e.closeModal()}}},[e._v("X")]),n("div",{staticClass:"container"})])])},H=[],G=BJY.eventEmitter,K={components:{},data:function(){return{showModal:!1,showQuizClose:!1}},computed:{},watch:{},methods:{quizOpen:function(e){BJY.quizStudent.open({element:$(".modal .container")[0],replace:!1,forceJoin:e.forceJoin,quizId:e.quizId,solution:e.solution,onReady:function(){},onError:function(){}})},questionOpen:function(e,t){var n=this;this.showModal=!0,this.showQuizClose=!1,BJY.AnswerStudent.open($.extend({element:$(".modal .container")[0],replace:!1,autoCloseAfterSubmit:!0,onClose:function(){n.showModal=!1},showResult:t,autoShowResultAfterEnd:!!e.isShowCorrectAnswer},e))},closeModal:function(){this.showModal=!1,this.showQuizClose=!1}},created:function(){var e=this;BJY.AnswerStudent.init(),BJY.quizStudent.init(),G.on(G.START_ANSWER,(function(t,n){e.questionOpen(n,!1)})).on(G.ANSER_RESULT_SHOW,(function(t,n){e.questionOpen(n,!0)})).on(G.QUIZ_START,(function(t,n){e.showModal=!0,e.showQuizClose=!0,e.quizOpen(n)})).on(G.QUIZ_SOLUTION,(function(t,n){e.showModal=!0,e.showQuizClose=!0,e.quizOpen(n)}))},mounted:function(){},beforeDestroy:function(){}},X=K,Z=(n("e3c4"),Object(l["a"])(X,V,H,!1,null,null,null)),ee=Z.exports,te=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"bjy-playback-notice"}})},ne=[],ae={components:{},data:function(){return{}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){BJY.Notice.create({element:$("#bjy-playback-notice"),replace:!1,defaultContent:"这里空空如也..."})},beforeDestroy:function(){}},oe=ae,re=(n("77e5"),Object(l["a"])(oe,te,ne,!1,null,null,null)),ie=re.exports,se=(BJY.eventEmitter,{name:"App",components:{Loading:f,Player:g,Notice:ie,InteractionPanel:W,ModalPanel:ee},data:function(){return{loaded:!1,videoData:null,currentLine:0,lineList:[]}},filters:{lineFilter:function(e){return"线路"+ ++e}},watch:{currentLine:{deep:!0,handler:function(e,t){this.videoData=this.lineList[e]}}},created:function(){var e=this,t={token:"T4Ivx-DIWjgmvvoNNdcydzf3LcMMPzYEc4GNHnOv-QuVbTLv8dzJe_eqCFuUfaIw0nPLBgfsrQMKp0fXMnVKLQ",classId:"18070683424562",sessionId:201807200,prefixName:""};if(location.href.includes("debug=1")){var n=prompt("输入回放url以测试");if(n){var a=this.getQuery(n);t.token=a.token,t.classId=a.classid,t.sessionId=Number(a.session_id),t.prefixName=a.prefixName}console.log(t)}BJY.playback.init({env:"production",privateDomainPrefix:t.prefixName,token:t.token,class:{id:t.classId,sessionId:t.sessionId},useEncrypt:!0,user:{number:"13147056",avatar:"http://static.sunlands.com/newUserImagePath/13147056/40_40/13147056.jpg",name:"xxx",type:0}}).then((function(t){e.loaded=!0;var n=t.defaultDefinition;e.videoData=t.videos[n][e.currentLine],e.lineList=t.videos[n]}))},methods:{loadEnd:function(){$("#main").css("top",0)},getQuery:function(e){var t=e.split("?")[1],n=e.split(".")[0].split("//")[1],a=t.split("&"),o={prefixName:n};return a.forEach((function(e){var t=e.split("=");o[t[0]]=t[1]})),o}},mounted:function(){}}),ce=se,ue=(n("5c0b"),Object(l["a"])(ce,o,r,!1,null,null,null)),le=ue.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(le)}}).$mount("#app")},"5a92":function(e,t,n){},"5c0b":function(e,t,n){"use strict";var a=n("aa69"),o=n.n(a);o.a},"640b":function(e,t,n){},"77e5":function(e,t,n){"use strict";var a=n("ed22"),o=n.n(a);o.a},8027:function(e,t,n){"use strict";var a=n("9cb4"),o=n.n(a);o.a},"81d8":function(e,t,n){},"860b":function(e,t,n){},"9cb4":function(e,t,n){},aa69:function(e,t,n){},c860:function(e,t,n){},ca79:function(e,t,n){"use strict";var a=n("5a92"),o=n.n(a);o.a},d456:function(e,t,n){"use strict";var a=n("640b"),o=n.n(a);o.a},e3c4:function(e,t,n){"use strict";var a=n("81d8"),o=n.n(a);o.a},e474:function(e,t,n){"use strict";var a=n("860b"),o=n.n(a);o.a},ed22:function(e,t,n){},f51d:function(e,t,n){"use strict";var a=n("c860"),o=n.n(a);o.a}});
//# sourceMappingURL=app.c68187b2.js.map