(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45fde930"],{1276:function(e,t,n){"use strict";var r=n("d784"),i=n("44e7"),o=n("825a"),a=n("1d80"),s=n("4840"),c=n("8aa5"),l=n("50c4"),u=n("14c3"),d=n("9263"),f=n("d039"),h=[].push,p=Math.min,g=4294967295,m=!f((function(){return!RegExp(g,"y")}));r("split",2,(function(e,t,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,n){var r=String(a(this)),o=void 0===n?g:n>>>0;if(0===o)return[];if(void 0===e)return[r];if(!i(e))return t.call(r,e,o);var s,c,l,u=[],f=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),p=0,m=new RegExp(e.source,f+"g");while(s=d.call(m,r)){if(c=m.lastIndex,c>p&&(u.push(r.slice(p,s.index)),s.length>1&&s.index<r.length&&h.apply(u,s.slice(1)),l=s[0].length,p=c,u.length>=o))break;m.lastIndex===s.index&&m.lastIndex++}return p===r.length?!l&&m.test("")||u.push(""):u.push(r.slice(p)),u.length>o?u.slice(0,o):u}:"0".split(void 0,0).length?function(e,n){return void 0===e&&0===n?[]:t.call(this,e,n)}:t,[function(t,n){var i=a(this),o=void 0==t?void 0:t[e];return void 0!==o?o.call(t,i,n):r.call(String(i),t,n)},function(e,i){var a=n(r,e,this,i,r!==t);if(a.done)return a.value;var d=o(e),f=String(this),h=s(d,RegExp),v=d.unicode,b=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(m?"y":"g"),w=new h(m?d:"^(?:"+d.source+")",b),E=void 0===i?g:i>>>0;if(0===E)return[];if(0===f.length)return null===u(w,f)?[f]:[];var C=0,_=0,x=[];while(_<f.length){w.lastIndex=m?_:0;var y,R=u(w,m?f:f.slice(_));if(null===R||(y=p(l(w.lastIndex+(m?0:_)),f.length))===C)_=c(f,_,v);else{if(x.push(f.slice(C,_)),x.length===E)return x;for(var S=1;S<=R.length-1;S++)if(x.push(R[S]),x.length===E)return x;_=C=y}}return x.push(f.slice(C)),x}]}),!m)},"14c3":function(e,t,n){var r=n("c6b6"),i=n("9263");e.exports=function(e,t){var n=e.exec;if("function"===typeof n){var o=n.call(e,t);if("object"!==typeof o)throw TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==r(e))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(e,t)}},"159b":function(e,t,n){var r=n("da84"),i=n("fdbc"),o=n("17c2"),a=n("9112");for(var s in i){var c=r[s],l=c&&c.prototype;if(l&&l.forEach!==o)try{a(l,"forEach",o)}catch(u){l.forEach=o}}},"17c2":function(e,t,n){"use strict";var r=n("b727").forEach,i=n("a640"),o=n("ae40"),a=i("forEach"),s=o("forEach");e.exports=a&&s?[].forEach:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}},"1cb3":function(e,t,n){},2280:function(e,t,n){},2532:function(e,t,n){"use strict";var r=n("23e7"),i=n("5a34"),o=n("1d80"),a=n("ab13");r({target:"String",proto:!0,forced:!a("includes")},{includes:function(e){return!!~String(o(this)).indexOf(i(e),arguments.length>1?arguments[1]:void 0)}})},"26c0":function(e,t,n){},3046:function(e,t,n){"use strict";var r=n("26c0"),i=n.n(r);i.a},3540:function(e,t,n){"use strict";var r=n("3e38"),i=n.n(r);i.a},"3e38":function(e,t,n){},4160:function(e,t,n){"use strict";var r=n("23e7"),i=n("17c2");r({target:"Array",proto:!0,forced:[].forEach!=i},{forEach:i})},"44e7":function(e,t,n){var r=n("861d"),i=n("c6b6"),o=n("b622"),a=o("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[a])?!!t:"RegExp"==i(e))}},"466d":function(e,t,n){"use strict";var r=n("d784"),i=n("825a"),o=n("50c4"),a=n("1d80"),s=n("8aa5"),c=n("14c3");r("match",1,(function(e,t,n){return[function(t){var n=a(this),r=void 0==t?void 0:t[e];return void 0!==r?r.call(t,n):new RegExp(t)[e](String(n))},function(e){var r=n(t,e,this);if(r.done)return r.value;var a=i(e),l=String(this);if(!a.global)return c(a,l);var u=a.unicode;a.lastIndex=0;var d,f=[],h=0;while(null!==(d=c(a,l))){var p=String(d[0]);f[h]=p,""===p&&(a.lastIndex=s(l,o(a.lastIndex),u)),h++}return 0===h?null:f}]}))},"5a34":function(e,t,n){var r=n("44e7");e.exports=function(e){if(r(e))throw TypeError("The method doesn't accept regular expressions");return e}},6678:function(e,t,n){},"6fee":function(e,t,n){},"74c9":function(e,t,n){"use strict";var r=n("9fd8"),i=n.n(r);i.a},"7db0":function(e,t,n){"use strict";var r=n("23e7"),i=n("b727").find,o=n("44d2"),a=n("ae40"),s="find",c=!0,l=a(s);s in[]&&Array(1)[s]((function(){c=!1})),r({target:"Array",proto:!0,forced:c||!l},{find:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),o(s)},8027:function(e,t,n){"use strict";var r=n("1cb3"),i=n.n(r);i.a},"81b9":function(e,t,n){"use strict";var r=n("fac9"),i=n.n(r);i.a},"85d7":function(e,t,n){},"8aa5":function(e,t,n){"use strict";var r=n("6547").charAt;e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},"8fbd":function(e,t,n){"use strict";var r=n("85d7"),i=n.n(r);i.a},9263:function(e,t,n){"use strict";var r=n("ad6d"),i=n("9f7f"),o=RegExp.prototype.exec,a=String.prototype.replace,s=o,c=function(){var e=/a/,t=/b*/g;return o.call(e,"a"),o.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),l=i.UNSUPPORTED_Y||i.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],d=c||u||l;d&&(s=function(e){var t,n,i,s,d=this,f=l&&d.sticky,h=r.call(d),p=d.source,g=0,m=e;return f&&(h=h.replace("y",""),-1===h.indexOf("g")&&(h+="g"),m=String(e).slice(d.lastIndex),d.lastIndex>0&&(!d.multiline||d.multiline&&"\n"!==e[d.lastIndex-1])&&(p="(?: "+p+")",m=" "+m,g++),n=new RegExp("^(?:"+p+")",h)),u&&(n=new RegExp("^"+p+"$(?!\\s)",h)),c&&(t=d.lastIndex),i=o.call(f?n:d,m),f?i?(i.input=i.input.slice(g),i[0]=i[0].slice(g),i.index=d.lastIndex,d.lastIndex+=i[0].length):d.lastIndex=0:c&&i&&(d.lastIndex=d.global?i.index+i[0].length:t),u&&i&&i.length>1&&a.call(i[0],n,(function(){for(s=1;s<arguments.length-2;s++)void 0===arguments[s]&&(i[s]=void 0)})),i}),e.exports=s},"9cd7":function(e,t,n){},"9f7f":function(e,t,n){"use strict";var r=n("d039");function i(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=r((function(){var e=i("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=r((function(){var e=i("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},"9fd8":function(e,t,n){},a640:function(e,t,n){"use strict";var r=n("d039");e.exports=function(e,t){var n=[][e];return!!n&&r((function(){n.call(null,t||function(){throw 1},1)}))}},ab13:function(e,t,n){var r=n("b622"),i=r("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[i]=!1,"/./"[e](t)}catch(r){}}return!1}},ac1f:function(e,t,n){"use strict";var r=n("23e7"),i=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},ad6d:function(e,t,n){"use strict";var r=n("825a");e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},ae40:function(e,t,n){var r=n("83ab"),i=n("d039"),o=n("5135"),a=Object.defineProperty,s={},c=function(e){throw e};e.exports=function(e,t){if(o(s,e))return s[e];t||(t={});var n=[][e],l=!!o(t,"ACCESSORS")&&t.ACCESSORS,u=o(t,0)?t[0]:c,d=o(t,1)?t[1]:void 0;return s[e]=!!n&&!i((function(){if(l&&!r)return!0;var e={length:-1};l?a(e,1,{enumerable:!0,get:c}):e[1]=1,n.call(e,u,d)}))}},b0c0:function(e,t,n){var r=n("83ab"),i=n("9bf2").f,o=Function.prototype,a=o.toString,s=/^\s*function ([^ (]*)/,c="name";!r||c in o||i(o,c,{configurable:!0,get:function(){try{return a.call(this).match(s)[1]}catch(e){return""}}})},c22e:function(e,t,n){"use strict";var r=n("2280"),i=n.n(r);i.a},c60a:function(e,t,n){"use strict";var r=n("9cd7"),i=n.n(r);i.a},c975:function(e,t,n){"use strict";var r=n("23e7"),i=n("4d64").indexOf,o=n("a640"),a=n("ae40"),s=[].indexOf,c=!!s&&1/[1].indexOf(1,-0)<0,l=o("indexOf"),u=a("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:c||!l||!u},{indexOf:function(e){return c?s.apply(this,arguments)||0:i(this,e,arguments.length>1?arguments[1]:void 0)}})},caad:function(e,t,n){"use strict";var r=n("23e7"),i=n("4d64").includes,o=n("44d2"),a=n("ae40"),s=a("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:!s},{includes:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),o("includes")},d456:function(e,t,n){"use strict";var r=n("6fee"),i=n.n(r);i.a},d784:function(e,t,n){"use strict";n("ac1f");var r=n("6eeb"),i=n("d039"),o=n("b622"),a=n("9263"),s=n("9112"),c=o("species"),l=!i((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),d=o("replace"),f=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),h=!i((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));e.exports=function(e,t,n,d){var p=o(e),g=!i((function(){var t={};return t[p]=function(){return 7},7!=""[e](t)})),m=g&&!i((function(){var t=!1,n=/a/;return"split"===e&&(n={},n.constructor={},n.constructor[c]=function(){return n},n.flags="",n[p]=/./[p]),n.exec=function(){return t=!0,null},n[p](""),!t}));if(!g||!m||"replace"===e&&(!l||!u||f)||"split"===e&&!h){var v=/./[p],b=n(p,""[e],(function(e,t,n,r,i){return t.exec===a?g&&!i?{done:!0,value:v.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:f}),w=b[0],E=b[1];r(String.prototype,e,w),r(RegExp.prototype,p,2==t?function(e,t){return E.call(e,this,t)}:function(e){return E.call(e,this)})}d&&s(RegExp.prototype[p],"sham",!0)}},e3c4:function(e,t,n){"use strict";var r=n("ed17"),i=n.n(r);i.a},e79e:function(e,t,n){"use strict";var r=n("6678"),i=n.n(r);i.a},ed17:function(e,t,n){},eea6:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"apps"}},[n("Loading"),e.loaded?n("div",{attrs:{id:"main"}},[n("div",{class:["video-wrap",e.isCssFull?"css-full":""]},[e.isPptAsMain&&e.isBB?n("WhiteBoard",{ref:"whiteboard",attrs:{isPptAsMain:e.isPptAsMain}}):n("div"),e.isCssFull?n("button",{staticStyle:{position:"absolute"},on:{click:function(t){e.isCssFull=!1}}},[e._v("退出全屏")]):e._e()],1),n("Menu",{ref:"menu",attrs:{isPptAsMain:e.isPptAsMain},on:{buttonPress:function(t){return e.handleBottomPress(t)}}}),n("div",{staticClass:"media-panel"},[n("div",{staticClass:"notice",class:{"notice-show":e.showNotice}},[n("Notice",e._b({},"Notice",e.noticeProps,!1))],1),n("InteractionPanel",{attrs:{isPptAsMain:e.isPptAsMain}})],1),n("ModalPanel"),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isRollCalling,expression:"isRollCalling"}],staticClass:"roll-call"},[n("p",{staticClass:"roll-call-tip"},[e._v("老师要求你在"+e._s(e.rollCallCountDown)+"秒内响应点名")]),n("span",{staticClass:"roll-call-btn",on:{click:function(t){return e.answerRollCall()}}},[e._v("答到")])]),n("div",{attrs:{id:"interaction-placeholder"}},[n("div",{staticClass:"redpacket"},[n("RedPacket",e._b({},"RedPacket",e.redpacketProps,!1))],1),n("LotteryHit")],1),n("div",{staticStyle:{display:"none"},attrs:{id:"attention-detection-container"}})],1):e._e()],1)},i=[],o=(n("7db0"),n("4160"),n("caad"),n("c975"),n("a9e3"),n("ac1f"),n("2532"),n("466d"),n("1276"),n("159b"),function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)}),a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"loading"}},[n("div",{staticClass:"placeholder"})])}],s={components:{},data:function(){return{}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){var e=BJY.Loading.create({element:$("#loading .placeholder"),logoUrl:"http://img.baijiayun.com/0baijiacloud/logo/ydzb/v5/www-loading.png"}),t=BJY.eventEmitter;t.one(t.LOADING_PANEL_START,(function(e,t){})).one(t.LOADING_PANEL_END,(function(t,n){e.destroy()})).one(t.VIEW_RENDER_TRIGGER,(function(e,t){}))},beforeDestroy:function(){}},c=s,l=(n("8fbd"),n("2877")),u=Object(l["a"])(c,o,a,!1,null,"fd10f2fe",null),d=u.exports,f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"h5-player"}})},h=[],p={data:function(){return{started:!1}},mounted:function(){window.player=BJY.H5Player.create({element:$("#h5-player"),showControls:!1,poster:""})}},g=p,m=(n("74c9"),Object(l["a"])(g,f,h,!1,null,null,null)),v=m.exports,b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"barrage-wrap"})},w=[],E={components:{},data:function(){return{barrage:null}},computed:{},watch:{},methods:{open:function(){this.barrage.open()},close:function(){this.barrage.close()},isBarrageOn:function(){return this.barrage.isOpened()},toggle:function(){this.isBarrageOn()?(this.close(),this.$Toast("弹幕关")):(this.open(),this.$Toast("弹幕开"))}},created:function(){},mounted:function(){this.barrage=new BJY.Barrage({container:$(".video-wrap"),speed:100,maxLength:20,top:30,bottom:30,trackHeight:30,textOnly:!1,renderContent:function(e){return e.content}})},beforeDestroy:function(){}},C=E,_=(n("3540"),Object(l["a"])(C,b,w,!1,null,"34dbd4a1",null)),x=_.exports,y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"menu"},[n("span",{staticClass:"user-count"},[e._v(e._s(e.userCount)+"人在线")]),n("span",{staticClass:"btn-wrap"},[e.cdnList.length>1&&e.canSwitchCdn?n("select",{directives:[{name:"model",rawName:"v-model",value:e.currentNode,expression:"currentNode"}],staticClass:"cdn-node-list",attrs:{name:"cdn",id:"cdn-list"},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.currentNode=t.target.multiple?n:n[0]}}},e._l(e.cdnList.length,(function(t){return n("option",{key:t,domProps:{value:t}},[e._v(e._s(e._f("cdnListFilter")(t)))])})),0):e._e(),e.isPptAsMain?n("i",{staticClass:"icon icon-teacher",on:{click:function(t){return e.swap()}}}):e._e(),n("i",{staticClass:"icon icon-notice-btn",on:{click:function(t){return e.noticeToggle()}}}),e.isBarrageOn?n("i",{staticClass:"icon icon-barrage-on",on:{click:function(t){return e.barrageToggle()}}}):n("i",{staticClass:"icon icon-barrage-off",on:{click:function(t){return e.barrageToggle()}}}),n("i",{staticClass:"icon icon-refresh",on:{click:function(t){return e.refresh()}}}),n("i",{staticClass:"icon icon-full-screen",on:{click:function(t){return e.fullScreen()}}})])])},R=[],S=BJY.eventEmitter,T={components:{},props:["isPptAsMain"],data:function(){return{userCount:1,isBarrageOn:!1,cdnList:[],currentNode:1,canSwitchCdn:!BJY.auth.isWebRTC()}},watch:{currentNode:function(e,t){console.log(e),S.trigger(S.DOWNLINK_SERVER_NODE_CHANGE_TRIGGER,{index:e-1})}},filters:{cdnListFilter:function(e){return"线路"+e}},methods:{swap:function(){this.$emit("buttonPress","swap")},noticeToggle:function(){this.$emit("buttonPress","notice")},barrageToggle:function(){this.$emit("buttonPress","barrage")},refresh:function(){this.$emit("buttonPress","refresh")},fullScreen:function(){this.$emit("buttonPress","fullscreen")},toggleIcon:function(e){this.isBarrageOn=e}},created:function(){var e=this;S.on(S.USER_COUNT_CHANGE,(function(t,n){e.userCount=n.userCount})),this.cdnList=BJY.data.server.getLiveServerList()},mounted:function(){},beforeDestroy:function(){}},O=T,A=(n("3046"),Object(l["a"])(O,y,R,!1,null,"ed64cd92",null)),N=A.exports,P=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"bjy-custom-interaction"},[n("div",{staticClass:"tab-header"},[n("span",{staticClass:"tab-message",class:{active:e.getCurrentTab("message")},on:{click:function(t){return e.setTab("message")}}},[e._v("聊天")]),n("span",{staticClass:"tab-question",class:{active:e.getCurrentTab("question")},on:{click:function(t){return e.setTab("question")}}},[e._v("问答")]),e.isPptAsMain?e._e():n("span",{staticClass:"tab-board",class:{active:e.getCurrentTab("board")},on:{click:function(t){return e.setTab("board")}}},[e._v("白板")])]),n("div",{staticClass:"tab-body",class:{"can-switch":e.isPptAsMain}},[n("MessageList",{directives:[{name:"show",rawName:"v-show",value:e.getCurrentTab("message"),expression:"getCurrentTab('message')"}]}),n("QuestionAnswer",{directives:[{name:"show",rawName:"v-show",value:e.getCurrentTab("question"),expression:"getCurrentTab('question')"}]}),e.isPptAsMain?n("Player"):n("WhiteBoard",{directives:[{name:"show",rawName:"v-show",value:e.getCurrentTab("board"),expression:"getCurrentTab('board')"}]})],1)])},B=[],I=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},k=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"message-panel"}},[n("div",{staticClass:"message-list"}),n("div",{staticClass:"message-sender"})])}],L=(n("b0c0"),{}),M=BJY.config;L[M.ROLE_TYPE_TEACHER]={en:"teacher",cn:"老师"},L[M.ROLE_TYPE_ASSISTANT]={en:"assistant",cn:"助教"},L[M.ROLE_TYPE_STUDENT]={en:"student",cn:"学生"},L[M.ROLE_TYPE_GUEST]={en:"guest",cn:"游客"};var Y=L,F=BJY.eventEmitter,D={components:{},data:function(){return{}},computed:{},watch:{},methods:{},created:function(){F.on(F.MESSAGE_RECEIVE,(function(e,t){var n=$(".tab-message");n.hasClass("active")||n.addClass("has-new")}))},mounted:function(){BJY.MessageList.create({element:$("#message-panel .message-list"),replace:!1,renderEmoji:function(e,t){return BJY.isAlicloudImage(t)?'<img ondragstart="return false" src="'+t+'@100w_1e_1l.png" srcset="'+t+'@200w_1e_1l.png 2x">':'<img ondragstart="return false" src="'+t+'">'},renderImage:function(e){return BJY.isAlicloudImage(e)?'<img ondragstart="return false" src="'+e+'@100w_1e_1l.png" srcset="'+e+'@200w_1e_1l.png 2x">':'<img ondragstart="return false" src="'+e+'">'},renderUser:function(e,t,n){return{id:e.id,name:e.name,number:e.number,avatar:BJY.compressImage({url:e.avatar,width:t,height:n}),avatar2x:BJY.compressImage({url:e.avatar,width:2*t,height:2*n}),role:Y[e.type].en,localRole:Y[e.type].cn}},loadDistance:0}),BJY.MessageSender.create({element:$("#message-panel .message-sender"),replace:!1,canSendEmoji:!0,multiline:!0,messageMaxLength:140,placeholder:"请输入...",emotionList:{emotionPerRow:6,rowPerPage:4}})},beforeDestroy:function(){}},J=D,j=(n("8027"),Object(l["a"])(J,I,k,!1,null,null,null)),q=j.exports,U=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},z=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"question-answer"}},[n("div",{staticClass:"placeholder"})])}],G=BJY.store,H={components:{},data:function(){return{user:G.get("user")}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){BJY.QuestionAnswer.create({element:$("#question-answer .placeholder"),replace:!0,canManageQuestion:!1,limitPerMinute:100,countPerPage:8,inputMaxLength:140,pageBySwipe:!0,onCopyFinish:function(){}})},beforeDestroy:function(){}},Q=H,W=(n("d456"),Object(l["a"])(Q,U,z,!1,null,null,null)),V=W.exports,Z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"whiteboard"}},[e.isPptAsMain?e._e():n("button",{staticClass:"btn",on:{click:function(t){return e.toggleWhiteboardFull()}}},[e._v(" "+e._s(e.isFull?"退出全屏":"全屏")+" ")]),n("div",{staticClass:"placeholder"})])},K=[],X={components:{},props:["isPptAsMain"],data:function(){return{whiteboard:null,isFull:!1}},computed:{},watch:{},methods:{refresh:function(){this.whiteboard.refresh()},toggleWhiteboardFull:function(){var e=document.getElementById("whiteboard");this.isFull?this.exitFullScreen():this.fullScreen(e),this.isFull=!this.isFull},fullScreen:function(e){return e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullScreen?e.webkitRequestFullScreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.msRequestFullscreen()},exitFullScreen:function(){var e=document;if(!e.exitFullscreen)return e.webkitExitFullscreen?e.webkitExitFullScreen():e.mozRequestFullscreen?e.mozExitFullscreen():e.msExitFullscreen();e.exitFullscreen()}},created:function(){},mounted:function(){this.whiteboard=BJY.Whiteboard.create({element:$("#whiteboard .placeholder"),fit:1,keepSize:!1,watermark:{text:"text",opacity:8,size:36,rotate:20,fill:1}}),console.log("加载白板")},beforeDestroy:function(){this.whiteboard&&this.whiteboard.destroy()}},ee=X,te=(n("81b9"),Object(l["a"])(ee,Z,K,!1,null,null,null)),ne=te.exports,re={components:{MessageList:q,QuestionAnswer:V,WhiteBoard:ne,Player:v},props:["isPptAsMain"],data:function(){return{currentTab:this.isPptAsMain?"message":"board"}},computed:{},watch:{},methods:{getCurrentTab:function(e){return this.currentTab===e},setTab:function(e){this.currentTab=e}},created:function(){},mounted:function(){},beforeDestroy:function(){}},ie=re,oe=(n("c60a"),Object(l["a"])(ie,P,B,!1,null,null,null)),ae=oe.exports,se=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"pop"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.showModal,expression:"showModal"}],staticClass:"modal"},[e.showQuizClose?n("span",{staticClass:"quiz-close",on:{click:function(t){return e.closeModal()}}},[e._v("X")]):e._e(),n("div",{staticClass:"container"})])])},ce=[],le=BJY.eventEmitter,ue={components:{},data:function(){return{showModal:!1,showQuizClose:!1}},computed:{},watch:{showModal:function(e,t){e?$("#h5-player").css("transform","translateX(10000px)"):$("#h5-player").css("transform","")}},methods:{quizOpen:function(e){BJY.quizStudent.open({element:$(".modal .container")[0],replace:!1,forceJoin:e.forceJoin,quizId:e.quizId,solution:e.solution,onReady:function(){},onError:function(e){console.log(e)}})},questionOpen:function(e,t){var n=this;this.showModal=!0,this.showQuizClose=!1,BJY.AnswerStudent.open($.extend({element:$(".modal .container")[0],autoCloseAfterSubmit:!1,onClose:function(){n.showModal=!1},replace:!1,showResult:t,autoShowResultAfterEnd:!!e.isShowCorrectAnswer},e))},closeModal:function(){this.showModal=!1,this.showQuizClose=!1}},created:function(){var e=this;BJY.AnswerStudent.init(),BJY.quizStudent.init(),le.on(le.START_ANSWER,(function(t,n){e.questionOpen(n,!1)})).on(le.ANSER_RESULT_SHOW,(function(t,n){e.questionOpen(n,!0)})).on(le.QUIZ_START,(function(t,n){e.showModal=!0,e.showQuizClose=!n.forceJoin,e.quizOpen(n)})).on(le.QUIZ_SOLUTION,(function(t,n){e.showModal=!0,e.showQuizClose=!0,e.quizOpen(n)})).on(le.QUIZ_SUBMIT,(function(){e.closeModal()})).on(le.QUIZ_END,(function(t,n){e.closeModal()})),le.trigger(le.QUIZ_REQ)},mounted:function(){},beforeDestroy:function(){}},de=ue,fe=(n("e3c4"),Object(l["a"])(de,se,ce,!1,null,null,null)),he=fe.exports,pe=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},ge=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"lottery-container"},[n("div",{staticClass:"lottery-hit"})])}],me={components:{},data:function(){return{}},computed:{},watch:{},methods:{destoryHitComp:function(){this.lotteryHitComp&&this.lotteryHitComp.destroy()},createLotteryHit:function(e){var t=this;BJY.store;t.destoryHitComp(),t.lotteryHitComp=BJY.LotteryHit.create({element:$(".lottery-hit"),list:e.hitList,lotteryName:e.lotteryName,replace:!1,skin:"h5-red",onSubmit:function(e,t){},onClose:function(){t.destoryHitComp()}})}},created:function(){},mounted:function(){var e=BJY.eventEmitter,t=this;BJY.Lottery.init({needAnimation:!0}),e.on(e.STANDARD_LOTTERY_END,(function(e,n){t.createLotteryHit(n)})).on(e.COMMAND_LOTTERY_ABORT,(function(e,n){t.createLotteryHit(n)})).on(e.COMMAND_LOTTERY_BEIGIN,(function(e,t){t.command}))},beforeDestroy:function(){}},ve=me,be=(n("c22e"),Object(l["a"])(ve,pe,ge,!1,null,null,null)),we=be.exports,Ee=BJY.eventEmitter,Ce={name:"Apps",components:{Loading:d,Player:v,Menu:N,Barrage:x,WhiteBoard:ne,Notice:Yox.transformOptions(BJY.Notice),InteractionPanel:ae,ModalPanel:he,RedPacket:Yox.transformOptions(BJY.Interaction),LotteryHit:we},data:function(){return{loaded:!1,noticeProps:{element:$(".media-panel .notice")[0],replace:!1,defaultContent:"这里空空如也...",foldDefault:!0},redpacketProps:{element:$(".interaction-placeholder .redpacket")[0],needRedPacket:!0,canGetRedPacket:!0,canSendRedPacket:!1,redPacketOptions:{skin:"bjy",hasRankingList:!0}},isCssFull:!1,showNotice:!1,isPptAsMain:!0,isRollCalling:!1,rollCallCountDown:10,rollCallTimer:null,isBB:!1}},created:function(){var e=this;console.log("******************************************************************************"),console.log("*   欢迎使用 BJY JS SDK - 百家云直播 - "+BJY.version),console.log("*   API 文档：https://www.baijiayun.com/js-sdk/doc/#/README"),console.log("*   版本更新日志：https://www.baijiayun.com/js-sdk/doc/#/change-log"),console.log("*   常见问题：https://www.baijiayun.com/js-sdk/doc/#/live?id=%e5%b8%b8%e8%a7%81%e9%97%ae%e9%a2%98"),console.log("*   注意事项：H5 Demo 需要在真机上预览，PC上不支持m3u8流类型， 自己创建教室测试时，注意非webrtc类型教室传入webrtc: 0"),console.log("*   sign签名规则：https://dev.baijiayun.com/wiki/detail/1"),console.log("******************************************************************************");var t={prefixName:"e74839313",env:"production",room_id:"21030980034604",user_number:18700,user_avatar:"https://img.baijiayun.com/0bjcloud/live/avatar/v2/121.jpg",user_name:"test001",user_role:0,sign:"f6264e2128cea5800d1e22b37a2a8c30",webrtc:0};if(location.href.includes("debug=1")){var n=prompt("输入传送门链接进入教室,webrtc课程请在链接后加上&webrtc=1");t=Object.assign(t,this.urlParser(n)),console.log(t)}var r={id:t.room_id};Number(t.webrtc)&&(r.webrtcType=Number(t.webrtc)),BJY.init({env:t.env,privateDomainPrefix:t.prefixName,class:r,user:{number:t.user_number,avatar:decodeURIComponent(t.user_avatar),name:decodeURIComponent(t.user_name),type:Number(t.user_role)},teacher:{type:1},sign:t.sign}),Ee.on(Ee.CLASSROOM_CONNECT_TRIGGER,(function(e,t){})).on(Ee.VIEW_RENDER_TRIGGER,(function(t,n){e.loaded=!0,e.isBB=!0,console.log(BJY.MessageSender),e.$nextTick((function(){BJY.AttentionDetection.create({element:$("#attention-detection-container"),replace:!1,skin:"light"})}))})).on(Ee.CLASS_END,(function(){console.log("老师下课了"),e.isBB=!1})).on(Ee.CLASS_START,(function(){console.log("老师开始上课了"),e.isBB=!0})).one(Ee.LOADING_PANEL_END,(function(e,t){$("#main").css({top:0,bottom:0})})).on(Ee.LOGIN_CONFLICT,(function(){alert("你已被踢，请确保user_number唯一")})).on(Ee.ROLL_CALL,(function(t,n){e.rollCallCountDown=n.duration,e.isRollCalling=!0,e.rollCallTimer=setInterval((function(){0===e.rollCallCountDown&&(clearInterval(e.rollCallTimer),e.isRollCalling=!1),e.rollCallCountDown--}),1e3)})).on(Ee.NOTICE_CHANGE,(function(t,n){console.log(n),setTimeout((function(){e.checkNeedScroll()}),500)})).on(Ee.NOTICE_RES,(function(e,t){console.log(t)})).on(Ee.ATTENTION_DETECTION_ALERT,(function(e,t){t.content&&alert(t.content)}))},beforeDestroy:function(){BJY.dispose(BJY.config.BJY_DISPOSE_TYPE_OUT_ROOM)},methods:{checkNeedScroll:function(){var e=$(".bjy-content-container .bjy-content").width(),t=$(".bjy-content-container .bjy-content").children().width();t>=e?$(".media-panel .bjy-notice").addClass("need-scroll"):$(".media-panel .bjy-notice").removeClass("need-scroll")},answerRollCall:function(){Ee.trigger(Ee.ROLL_CALL_RES),this.isRollCalling=!1,clearInterval(this.rollCallTimer)},urlParser:function(e){var t={};if(e)try{var n=e.split("?")[1],r=n.split("&");r.forEach((function(e){var n=e.split("=");t[n[0]]=n[1]})),t.prefixName=e.split(".")[0].split("//")[1],t.env=this.getEnv(e)}catch(i){console.log(i)}return t},getEnv:function(e){var t=e.match(/\/\/(.*)\./)[1];return/test/.test(t)||/localhost/.test(t)||/\d{1,3}\.\d{1,3}\.\d{1,3}/.test(t)?"test":/beta/.test(t)?"beta":(/www/.test(t),"")},handleBottomPress:function(e){switch(e){case"notice":this.noticeToggle();break;case"barrage":this.barrageToggle();break;case"refresh":this.refresh();break;case"fullscreen":this.fullScreen();break;case"swap":this.swapPptVideo(),Ee.trigger(Ee.WINDOW_RESIZE)}},swapPptVideo:function(){var e=document.getElementById("h5-player"),t=document.getElementById("whiteboard"),n=e.parentNode,r=t.parentNode,i=document.createElement("span"),o=document.createElement("span");n.insertBefore(i,e),r.insertBefore(o,t),t&&n.insertBefore(t,i),e&&r.insertBefore(e,o),n.removeChild(i),r.removeChild(o)},noticeToggle:function(){this.showNotice=!this.showNotice,this.checkNeedScroll()},barrageToggle:function(){this.$refs.barrage.toggle();var e=this.$refs.barrage.isBarrageOn();this.$refs.menu.toggleIcon(e)},refresh:function(){window.player&&window.player.play()},fullScreen:function(){var e=document.getElementsByClassName("video-wrap")[0].firstElementChild;this.toFullVideo(e)},toFullVideo:function(e){if($(e).find("video").length)e=$(e).find("video")[0];else if(-1!==navigator.userAgent.indexOf("iPhone")&&$(e).find(".bjy-whiteboard").length)return void this.handleCssFull(e);return e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullScreen?e.webkitRequestFullScreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitEnterFullscreen?e.webkitEnterFullscreen():e.msRequestFullscreen()},handleCssFull:function(e){this.isCssFull=!0}}},_e=Ce,xe=(n("e79e"),Object(l["a"])(_e,r,i,!1,null,null,null));t["default"]=xe.exports},fac9:function(e,t,n){}}]);
//# sourceMappingURL=chunk-45fde930.7eea1b50.js.map