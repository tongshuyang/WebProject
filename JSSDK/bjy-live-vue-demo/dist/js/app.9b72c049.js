(function(e){function t(t){for(var a,s,o=t[0],c=t[1],u=t[2],d=0,f=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&f.push(i[s][0]),i[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);l&&l(t);while(f.length)f.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,o=1;o<n.length;o++){var c=n[o];0!==i[c]&&(a=!1)}a&&(r.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},i={app:0},r=[];function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=c;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0694":function(e,t,n){},"0abc":function(e,t,n){"use strict";n("b395")},"0ee1":function(e,t,n){},"1ca4":function(e,t,n){"use strict";n("8720")},"1e23":function(e,t,n){"use strict";n("602f")},"1eb3":function(e,t,n){},"1fce":function(e,t,n){},"20d6":function(e,t,n){"use strict";n("5475")},"237e":function(e,t,n){"use strict";n("0ee1")},"2ace":function(e,t,n){"use strict";n("0694")},"3b72":function(e,t,n){},"451f":function(e,t,n){"use strict";n("7a98")},"4b0e":function(e,t,n){"use strict";n("6758")},5475:function(e,t,n){},5515:function(e,t,n){"use strict";n("1fce")},"56d7":function(e,t,n){"use strict";n.r(t);n("139e"),n("fae9"),n("3ff7"),n("d6dc");var a=n("a593"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Loading"),e.loaded?n("div",{ref:"main",attrs:{id:"main"}},[n("HorseLamp"),n("div",{staticClass:"class-panel"},[n("WhiteBorad")],1),n("div",{staticClass:"media-panel"},[n("div",{staticClass:"live-teacher-player"},[n("TeacherPlayer")],1),n("div",{staticClass:"interaction-panel"},[n("InteractionPanel")],1)]),n("div",{staticClass:"footer"},[n("SettingPanel"),n("FunctionPanel")],1),n("ModalPanel")],1):e._e()],1)},r=[],s=(n("72b3"),n("c726"),n("d0bf"),n("0bd5"),n("b784"),n("5a4c"),n("79a8"),n("270f"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"loading"}})}),o=[],c={components:{},data:function(){return{}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){var e=BJY.Loading.create({element:$("#loading"),logoUrl:"http://img.baijiayun.com/0baijiacloud/logo/ydzb/v5/www-loading.png"}),t=BJY.eventEmitter;t.one(t.LOADING_PANEL_START,(function(e,t){})).one(t.LOADING_PANEL_END,(function(t,n){e.destroy()})).one(t.VIEW_RENDER_TRIGGER,(function(e,t){}))},beforeDestroy:function(){}},u=c,l=(n("4b0e"),n("5d22")),d=Object(l["a"])(u,s,o,!1,null,"622ba3c5",null),f=d.exports,_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"whiteboard"}},[n("div",{staticClass:"placeholder"}),n("div",{staticClass:"pre-page"},[n("span",{staticClass:"icon-chevron-left",class:{forbid:e.forbidChange||!e.canPrePage}},[e._v("<")])]),n("div",{staticClass:"next-page"},[n("span",{staticClass:"icon-chevron-right",class:{forbid:e.forbidChange||!e.canNextPage}},[e._v(">")])])])},p=[],h=(n("13cf"),{components:{},data:function(){return{canPrePage:!1,canNextPage:!1,pageData:null,forbidChange:!1}},computed:{},watch:{},methods:{setPageAuth:function(){var e=$(".icon-chevron-left"),t=$(".icon-chevron-right");this.canPrePage?e.addClass("has-page"):e.removeClass("has-page"),this.canNextPage?t.addClass("has-page"):t.removeClass("has-page")}},created:function(){this.pageData=BJY.data.page,this.canPrePage=this.pageData.getClientPage()>0,this.canNextPage=this.pageData.getClientPage()<this.pageData.getMaxPage},mounted:function(){var e=this,t=BJY.eventEmitter,n=$("#whiteboard");BJY.Whiteboard.create({element:n.find(".placeholder"),fit:1}),this.setPageAuth(),n.find(".pre-page").on("click",(function(){e.canPrePage&&!e.forbidChange&&t.trigger(t.PAGE_PREV_TRIGGER)})),n.find(".next-page").on("click",(function(){e.canNextPage&&!e.forbidChange&&t.trigger(t.PAGE_NEXT_TRIGGER)})),t.on(t.WHITEBOARD_LAYOUT_CHANGE,(function(e,t){})).on(t.CLIENT_PAGE_CHANGE,(function(){console.log("客户端翻页")})).on(t.PAGE_CHANGE_END,(function(t,n){var a=e.pageData.getClientPage(),i=e.pageData.getMaxPage();e.canPrePage=a>0,e.canNextPage=a<i,e.setPageAuth()})).on(t.STUDENT_PPT_AUTH_CHANGE,(function(t,n){console.log(n.forbid),e.forbidChange=n.forbid}))},beforeDestroy:function(){}}),m=h,E=(n("5515"),Object(l["a"])(m,_,p,!1,null,null,null)),T=E.exports,g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"setting"}},[n("CameraMenu"),n("MicMenu"),n("SpeakerMenu")],1)},v=[],S=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"menu-mic"}})},C=[],b=n("f091"),A=b,L=A,R=BJY.store,O=BJY.config,P={components:{},data:function(){return{}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){var e=this;BJY.MicMenu.create({element:$("#menu-mic"),maxVolume:100,canSelectDevice:!0,canAdjustVolume:!0,onSwitcherClick:function(){if(R.get("class.started"))if(R.get("class.speakState")!=O.SPEAK_STATE_LIMIT){var t=BJY.Player.instances[BJY.store.get("user.id")];BJY.userPublish.setDevice(t,null,!t.audioOn)}else e.$Toast(L.TIP_SPEAK_LIMIT);else e.$Toast(L.TIP_CLASS_NOT_START)}})},beforeDestroy:function(){}},y=P,I=(n("1e23"),Object(l["a"])(y,S,C,!1,null,"6d409ea0",null)),w=I.exports,N=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"menu-speaker"}})},B=[],Y={components:{},data:function(){return{}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){BJY.SpeakerMenu.create({element:$("#menu-speaker"),canAdjustVolume:!0,maxVolume:100})},beforeDestroy:function(){}},D=Y,J=(n("ba08"),Object(l["a"])(D,N,B,!1,null,"7a14fc06",null)),x=J.exports,M=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"menu-camera"}})},U=[],k=BJY.store,G=BJY.config,j={components:{},data:function(){return{}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){var e=this;BJY.CameraMenu.create({element:$("#menu-camera"),canSelectDevice:!0,onSwitcherClick:function(){if(k.get("class.started"))if(k.get("class.speakState")!=G.SPEAK_STATE_LIMIT){var t=BJY.Player.instances[BJY.store.get("user.id")];BJY.userPublish.setDevice(t,!t.videoOn)}else e.$Toast(L.TIP_SPEAK_LIMIT);else e.$Toast(L.TIP_CLASS_NOT_START)}})},beforeDestroy:function(){}},H=j,F=(n("bfc2"),Object(l["a"])(H,M,U,!1,null,"5533454a",null)),W=F.exports,K={components:{MicMenu:w,SpeakerMenu:x,CameraMenu:W},data:function(){return{}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){},beforeDestroy:function(){}},Q=K,V=(n("bd9d"),Object(l["a"])(Q,g,v,!1,null,"4492e2eb",null)),q=V.exports,z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"interaction"},[n("div",{staticClass:"list-wrap"},[n("div",{staticClass:"tab-title"},[n("span",{staticClass:"tab-list",class:{active:e.checkActive("user")},attrs:{id:"btn-user-list"},on:{click:function(t){return e.setTab("user")}}},[e._v(" 用户列表 "),n("label",{attrs:{id:"user-count"}},[e._v("(1)")])]),n("span",{staticClass:"tab-list",class:{active:e.checkActive("message")},attrs:{id:"btn-message-list"},on:{click:function(t){return e.setTab("message")}}},[e._v(" 聊天列表 ")]),n("span",{staticClass:"tab-list",class:{active:e.checkActive("action")},attrs:{id:"btn-action-list"},on:{click:function(t){return e.setTab("action")}}},[e._v(" 发言列表 ")])]),n("div",{staticClass:"tab-container"},[n("div",{staticClass:"user-list",class:{active:e.checkActive("user")}},[n("UserList")],1),n("div",{staticClass:"message-list",class:{active:e.checkActive("message")}},[n("MessageList")],1),n("div",{staticClass:"action-list",class:{active:e.checkActive("action")}},[n("ActiveList")],1),n("div",{staticClass:"question-answer fold"},[n("QuestionAnswer")],1)])])])},X=[],Z=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},ee=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"message-panel"}},[n("div",{staticClass:"notice"}),n("div",{staticClass:"message-list"}),n("div",{staticClass:"message-sender"})])}],te=(n("1d7a"),{}),ne=BJY.config;te[ne.ROLE_TYPE_TEACHER]={en:"teacher",cn:"老师"},te[ne.ROLE_TYPE_ASSISTANT]={en:"assistant",cn:"助教"},te[ne.ROLE_TYPE_STUDENT]={en:"student",cn:"学生"},te[ne.ROLE_TYPE_GUEST]={en:"guest",cn:"游客"};var ae=te,ie={components:{},data:function(){return{}},computed:{},watch:{},methods:{},created:function(){var e=BJY.eventEmitter;e.on(e.MESSAGE_RECEIVE,(function(e,t){var n=$("#btn-message-list");n.hasClass("active")||n.addClass("has-new")}))},mounted:function(){BJY.Notice.create({element:$("#message-panel .notice"),replace:!1,defaultContent:"这里空空如也..."});BJY.MessageList.create({element:$("#message-panel .message-list"),renderEmoji:function(e,t){return BJY.isAlicloudImage(t)?'<img ondragstart="return false" src="'+t+'@100w_1e_1l.png" srcset="'+t+'@200w_1e_1l.png 2x">':'<img ondragstart="return false" src="'+t+'">'},renderImage:function(e){return BJY.isAlicloudImage(e)?'<img ondragstart="return false" src="'+e+'@100w_1e_1l.png" srcset="'+e+'@200w_1e_1l.png 2x">':'<img ondragstart="return false" src="'+e+'">'},renderUser:function(e,t,n){return{id:e.id,name:e.name,number:e.number,avatar:BJY.compressImage({url:e.avatar,width:t,height:n}),avatar2x:BJY.compressImage({url:e.avatar,width:2*t,height:2*n}),role:ae[e.type].en,localRole:ae[e.type].cn,type:e.type}},loadDistance:0});BJY.MessageSender.create({element:$("#message-panel .message-sender"),canSendEmoji:!0,canSendImage:!0,multiline:!0,messageMaxLength:140,placeholder:"请输入...",emotionList:{emotionPerRow:6,rowPerPage:4}})},beforeDestroy:function(){}},re=ie,se=(n("8027"),Object(l["a"])(re,Z,ee,!1,null,null,null)),oe=se.exports,ce=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"user-list"}})},ue=[],le=BJY.auth,de=BJY.config,fe={components:{},data:function(){return{userLayerInstance:null,lastUser:null}},computed:{},watch:{},methods:{setLayer:function(e,t){var n=$(".bjy-user-layer");if(!this.userLayerInstance||this.userLayerInstance&&!n[0]){this.userLayerInstance&&!n[0]&&this.userLayerInstance.destroy();var a=document.createElement("div");$("#app").append(a),this.userLayerInstance=BJY.UserLayer.create({user:this.lastUser,element:$(a),renderUser:function(e,t,n){return{id:e.id,name:e.name,number:e.number,avatar:BJY.compressImage({url:e.avatar,width:t,height:n}),avatar2x:BJY.compressImage({url:e.avatar,width:2*t,height:2*n}),role:ae[e.type].en,localRole:ae[e.type].cn}},useParameterUser:e,speakInviteTimeout:1e4,setMediaTimeout:1e4,hasSwitchPaint:function(e){return!(!le.isTeacher()&&!le.isAssistant()||!le.isStudent(e.type))&&(e.endType!==de.END_TYPE_MOBILE_BROWSER&&e.endType!==de.END_TYPE_XIAOCHENGXU&&!(!e.videoOn&&!e.audioOn))},hasSwitchDocumentControl:function(e){return!1}})}else this.userLayerInstance.set("useParameterUser",e),this.userLayerInstance.set("user",this.lastUser);$(".bjy-user-layer").css({top:t.originalEvent.clientY+10+"px",left:t.originalEvent.clientX-150+"px"}),$(".bjy-user-layer").toggle()}},created:function(){var e=BJY.eventEmitter;e.on(e.USER_COUNT_CHANGE,(function(e,t){$("#user-count").text("("+t.userCount+")")}))},mounted:function(){var e=BJY.eventEmitter,t=this;if(BJY.UserList.create({element:$("#user-list"),renderUser:function(e,t,n){return{id:e.id,name:e.name,number:e.number,avatar:BJY.compressImage({url:e.avatar,width:t,height:n}),avatar2x:BJY.compressImage({url:e.avatar,width:2*t,height:2*n}),role:ae[e.type].en,localRole:ae[e.type].cn}}}),BJY.auth.isTeacher())BJY.auth.canSpeakInvite=function(e){return BJY.auth.isTeacher()&&(!e||!e.group)},BJY.auth.canSpeakForce=function(e){return!1},$(".user-list").delegate(".bjy-user-item","click",(function(n){event.stopPropagation();var a=n.currentTarget.dataset.number,i=BJY.data.user.findByNumber(a);i?(t.lastUser=i,t.setLayer(!1,n)):(e.one(e.USER_SEARCH_RES,(function(e,a){a.result&&a.result.length>0&&(i=a.result[0],BJY.data.user.add(i),t.lastUser=i,t.setLayer(!1,n))})),e.trigger(e.USER_SEARCH_REQ,{query:userNumber,field:"number"}))})),$("#app").delegate(".bjy-user-layer","click",(function(e){e.stopPropagation()})),$("#app").click((function(){$(".bjy-user-layer")&&$(".bjy-user-layer").hide()}));else{var n=BJY.userSpeak;e.on(e.SPEAK_INVITE_CONFIRM,(function(){var e=confirm("老师邀请你上麦发言");e?n.processInvite(!0):n.processInvite(!1)}))}},beforeDestroy:function(){}},_e=fe,pe=(n("dd6a"),Object(l["a"])(_e,ce,ue,!1,null,null,null)),he=pe.exports,me=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{empty:e.noOneSpeaking},attrs:{id:"active"}},[e._m(0),n("div",{staticClass:"live-self-player"},[n("SelfPlayer")],1)])},Ee=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"active-list"}},[n("div",{staticClass:"placeholder"})])}],Te=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"live-self-player"}})},ge=[],ve=BJY.store,Se=BJY.eventEmitter,Ce={components:{},data:function(){return{player:null}},computed:{},watch:{},methods:{createMyPlayer:function(e){this.player=BJY.DefaultThemePlayer.create({element:$("#live-self-player"),replace:!1,user:ve.get("user"),extension:BJY.getExtension(),canFold:!0,canSwitchCamera:!0,canSwitchMic:!0,onComplete:function(){Se.trigger(Se.MEDIA_SWITCH_TRIGGER,{videoOn:!1,audioOn:!1})}})}},created:function(){},mounted:function(){this.createMyPlayer(),Se.on(Se.MEDIA_SWITCH_TRIGGER,(function(e,t){var n=BJY.Player.instances[ve.get("user.id")];n&&BJY.userPublish.setDevice(n,t.videoOn,t.audioOn)})),this.player&&this.player.watch("isFolded",(function(e){var t=$(".live-self-player");e?t.addClass("hide"):t.removeClass("hide")}))},beforeDestroy:function(){}},be=Ce,Ae=(n("7705"),Object(l["a"])(be,Te,ge,!1,null,null,null)),Le=Ae.exports,Re={name:"activeList",components:{SelfPlayer:Le},data:function(){return{activeList:null,noOneSpeaking:!0}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){var e=this,t=BJY.eventEmitter,n=BJY.ActiveList.create({element:$("#active-list .placeholder"),extension:BJY.getExtension(),width:260,replace:!1});t.on(t.ACTIVE_LIST_PRESENTER_CHANGE_TRIGGER,(function(e,t){n.changePresenter(t.newPresenter,t.oldPresenter)})),n.watch("userList.length",(function(t,n){e.noOneSpeaking=0===t}))},beforeDestroy:function(){}},Oe=Re,Pe=(n("237e"),Object(l["a"])(Oe,me,Ee,!1,null,null,null)),ye=Pe.exports,Ie=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"question-answer"}},[n("div",{staticClass:"question-answer-bar"},[e._m(0),n("span",{staticClass:"toggle",on:{click:function(t){return e.toggleQuestionAnswer()}}},[e._v(" "+e._s(e.status)+" ")])]),n("div",{staticClass:"placeholder"})])},we=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticStyle:{display:"flex","align-items":"center"}},[n("i",{staticClass:"icon icon-answer-machine"}),e._v(" 问答 ")])}],Ne={components:{},data:function(){return{status:"展开"}},computed:{},watch:{},methods:{toggleQuestionAnswer:function(){var e=$(".question-answer");e.hasClass("fold")?(e.removeClass("fold"),this.status="折叠"):(e.addClass("fold"),this.status="展开")}},created:function(){},mounted:function(){BJY.QuestionAnswer.create({element:$("#question-answer .placeholder"),replace:!0,canManageQuestion:!1,limitPerMinute:100,countPerPage:50,inputMaxLength:140,pageBySwipe:!1,onCopyFinish:function(){}})},beforeDestroy:function(){}},Be=Ne,Ye=(n("d456"),Object(l["a"])(Be,Ie,we,!1,null,null,null)),De=Ye.exports,Je={components:{MessageList:oe,UserList:he,ActiveList:ye,QuestionAnswer:De},data:function(){return{activeTab:"user"}},computed:{},watch:{},methods:{setTab:function(e){this.activeTab=e},checkActive:function(e){return e===this.activeTab}},created:function(){var e=this;BJY.eventEmitter.on(BJY.eventEmitter.SPEAK_APPLY_RESULT_ACCEPT,(function(t,n){e.activeTab="action"}))},mounted:function(){},beforeDestroy:function(){}},$e=Je,xe=(n("84d9"),Object(l["a"])($e,z,X,!1,null,"ab57dfd6",null)),Me=xe.exports,Ue=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"live-teacher-player"}})},ke=[],Ge=BJY.store,je=BJY.auth,He=BJY.eventEmitter,Fe=BJY.data.user,We={components:{},data:function(){return{player:null}},computed:{},watch:{},methods:{createTeacherPlayer:function(){this.player=BJY.DefaultThemePlayer.create({element:$("#live-teacher-player"),replace:!1,user:je.isWebRTC()?Ge.get("webrtcMixUser"):Ge.get("presenter")||Ge.get("teacher"),extension:BJY.getExtension(),canSwitchCamera:je.isSelf(Ge.get("teacher.id")),canSwitchMic:je.isSelf(Ge.get("teacher.id")),isWebRTCMix:je.isWebRTC()})}},created:function(){},mounted:function(){var e=this;He.on(He.TEACHER_MEDIA_ON,(function(){e.player&&e.player.destroy(),e.createTeacherPlayer()})),this.createTeacherPlayer(),Ge.watch("presenterId",(function(t,n){var a=Fe.find(t),i=Fe.find(n);He.ACTIVE_LIST_PRESENTER_CHANGE_TRIGGER="active_list_presenter_change_trigger",He.trigger(He.ACTIVE_LIST_PRESENTER_CHANGE_TRIGGER,{newPresenter:a,oldPresenter:i}),a&&e.player&&(e.player.destroy(),e.player=null,e.createTeacherPlayer())}))},beforeDestroy:function(){}},Ke=We,Qe=(n("c056"),Object(l["a"])(Ke,Ue,ke,!1,null,null,null)),Ve=Qe.exports,qe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"function-panel"},[n("div",{staticClass:"btn-wrap"},[n("SpeakApplyMenu")],1),n("div",{staticClass:"btn-wrap"},[n("ShareScreenMenu")],1),n("div",{staticClass:"btn-wrap",on:{click:function(t){return e.toggleBarrage()}}},[e.isBarrageOn?n("i",{staticClass:"icon icon-barrage-on"}):n("i",{staticClass:"icon icon-barrage-off"}),e._v(" "+e._s(e.barrageState)+" ")]),e.cdnList.length>1&&e.canSwitchCdn?n("select",{directives:[{name:"model",rawName:"v-model",value:e.currentNode,expression:"currentNode"}],staticClass:"cdn-node-list",attrs:{name:"cdn",id:"cdn-list"},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.currentNode=t.target.multiple?n:n[0]}}},e._l(e.cdnList.length,(function(t){return n("option",{key:t,domProps:{value:t}},[e._v(e._s(e._f("cdnListFilter")(t)))])})),0):e._e()])},ze=[],Xe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"menu-speak-apply"}})},Ze=[],et=BJY.store,tt=BJY.eventEmitter,nt={components:{},data:function(){return{player:null}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){var e=this;tt.STOP_SPEAK_TRIGGER="stop_speak_trigger",tt.on(tt.SPEAK_APPLY_RESULT_TIMEOUT,(function(t,n){console.log("timeout"),e.$Toast(L.TIP_SPEAK_APPLY_TIMEOUT)})).on(tt.SPEAK_APPLY_RESULT_REJECT,(function(t,n){console.log("reject"),e.$Toast(L.TIP_SPEAK_APPLY_REJECT)})).on(tt.SPEAK_APPLY_RESULT_ACCEPT,(function(t,n){console.log("accept"),e.$Toast(L.TIP_SPEAK_APPLY_ACCEPT),tt.trigger(tt.MEDIA_SWITCH_TRIGGER,{videoOn:!1,audioOn:!0})})),BJY.SpeakApplyMenu.create({element:$("#menu-speak-apply"),replace:!1,onApplyClick:function(){et.get("class.started")?BJY.userSpeak.startApply(1e4):e.$Toast(L.TIP_CLASS_NOT_START)},onCancelClick:function(){BJY.userSpeak.cancelApply()},onStopClick:function(){BJY.userSpeak.stopSpeak(BJY.store.get("user.id")),tt.trigger(tt.STOP_SPEAK_TRIGGER),tt.trigger(tt.MEDIA_SWITCH_TRIGGER,{videoOn:!1,audioOn:!1})}})},beforeDestroy:function(){}},at=nt,it=(n("451f"),Object(l["a"])(at,Xe,Ze,!1,null,"30fe662e",null)),rt=it.exports,st=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"show",rawName:"v-show",value:e.canShareScreen,expression:"canShareScreen"}],attrs:{id:"menu-share-screen"}},[n("i",{staticClass:"icon icon-share"}),n("span",{staticClass:"bjy-screen-share"})])},ot=[],ct=BJY.auth,ut=BJY.store,lt=BJY.eventEmitter,dt=BJY.config;ct.isClassStarted=function(){return ut.get("class.started")},ct.canShareScreen=function(){return ut.get("class.mediaType")!==dt.MEDIA_TYPE_AUDIO&&(ct.inClient()||ct.isWebRTC())},ct.inClient=function(){return"undefined"!==typeof window.cefQuery},ct.canSpeak=function(){return ut.get("class.speakState")!==dt.SPEAK_STATE_LIMIT},ct.canProgramShareDesktop=function(){return ct.inClient()&&ut.get("cefVersion")>="6.3.0"};var ft={components:{},data:function(){return{canSpeak:!1,canShareScreen:ct.canShareScreen()}},computed:{},watch:{},methods:{checkCondition:function(){return ct.isClassStarted()&&ct.canShareScreen()?!!ct.canSpeak()||(this.$Toast(L.TIP_SPEAK_LIMIT),!1):(this.$Toast(L.TIP_CLASS_NOT_START),!1)}},created:function(){var e=this;BJY.eventEmitter.on(BJY.eventEmitter.SPEAK_APPLY_RESULT_ACCEPT,(function(){e.canSpeak=!0})).on(lt.STOP_SPEAK_TRIGGER,(function(){e.canSpeak=!1}))},mounted:function(){var e=this,t=$(".bjy-screen-share");if(t.text(L.BUTTON_SCREEN_START),ct.isWebRTC()){var n=!1;lt.on(lt.ASSIST_MEDIA_PUBLISH,(function(e,a){BJY.is.mediaMainScreenShare(a.mediaId)&&(a.videoOn?(n=!0,t.text(L.BUTTON_SCREEN_STOP)):(n=!1,t.text(L.BUTTON_SCREEN_START)))})),t.click((function(){if(n)lt.trigger(lt.SCREEN_SHARE_STOP_TRIGGER);else{if(!e.canSpeak)return void e.$Toast("请先举手");e.checkCondition()&&BJY.ScreenShareExtensionWebrtc.start((function(t){e.$Toast(t.msg)}))}}))}},beforeDestroy:function(){}},_t=ft,pt=(n("ec3c"),Object(l["a"])(_t,st,ot,!1,null,"c3c4b80e",null)),ht=pt.exports,mt=BJY.store,Et=BJY.eventEmitter,Tt=BJY.auth,gt={components:{SpeakApplyMenu:rt,ShareScreenMenu:ht,MessageList:MessageList},data:function(){return{status:"",language:L,isStudent:Tt.isStudent(),barrage:null,isBarrageOn:!1,cdnList:[],currentNode:1,canSwitchCdn:!BJY.auth.isWebRTC()}},computed:{barrageState:function(){return this.isBarrageOn?L.BARRAGE_ON:L.BARRAGE_OFF}},watch:{currentNode:function(e,t){console.log(e),Et.trigger(Et.DOWNLINK_SERVER_NODE_CHANGE_TRIGGER,{index:e-1})}},filters:{cdnListFilter:function(e){return"线路"+e}},methods:{handleStart:function(){mt.get("class.started")?Et.trigger(Et.CLASS_END_TRIGGER):Et.trigger(Et.CLASS_START_TRIGGER)},toggleBarrage:function(){var e=this.barrage.isOpened();e?(this.barrage.close(),this.isBarrageOn=!1):(this.barrage.open(),this.isBarrageOn=!0)}},created:function(){var e=this;mt.get("class.started")?this.status=L.CLASS_END:this.status=L.CLASS_START,Et.on(Et.CLASS_START,(function(){e.status=L.CLASS_END,e.$Toast(L.TIP_CLASS_START)})).on(Et.CLASS_END,(function(){e.status=L.CLASS_START,e.$Toast(L.TIP_CLASS_END)})),this.cdnList=BJY.data.server.getLiveServerList()},mounted:function(){this.barrage=new BJY.Barrage({container:$(".class-panel"),speed:100,maxLength:20,top:30,bottom:30,trackHeight:30,textOnly:!1,renderContent:function(e){return console.log(messageList.format(e.content)),e.content}})},beforeDestroy:function(){}},vt=gt,St=(n("fb16"),Object(l["a"])(vt,qe,ze,!1,null,"cd89f71e",null)),Ct=St.exports,bt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"modal-panel"},[n("RollCall"),n("AnswerMachine"),n("Quiz")],1)},At=[],Lt=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},Rt=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"answer-machine"}},[n("div",{staticClass:"placeholder"})])}],Ot=BJY.eventEmitter,Pt={components:{},data:function(){return{language:L}},computed:{},watch:{},methods:{open:function(e,t){$("#answer-machine .placeholder").show(),BJY.AnswerStudent.open($.extend({element:$("#answer-machine .placeholder")[0],autoCloseAfterSubmit:!1,onClose:function(){$("#answer-machine .placeholder").hide()},replace:!1,showResult:t,autoShowResultAfterEnd:!!e.isShowCorrectAnswer},e))}},created:function(){var e=this;Ot.on(Ot.START_ANSWER,(function(t,n){console.log(n),e.open(n,!1)})).on(Ot.END_ANSWER,(function(){e.showAnswer=!1})).on(Ot.ANSER_RESULT_SHOW,(function(t,n){e.open(n,!0)}))},mounted:function(){BJY.AnswerStudent.init(),$("#answer-machine .placeholder").hide()},beforeDestroy:function(){}},yt=Pt,It=(n("1ca4"),Object(l["a"])(yt,Lt,Rt,!1,null,null,null)),wt=It.exports,Nt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"roll-call-dialog"}})},Bt=[],Yt=BJY.auth,Dt=BJY.eventEmitter,Jt={components:{},data:function(){return{language:L,status:0,isStudent:Yt.isStudent(),applyTimer:null,timeLeft:"",result:""}},computed:{},watch:{},methods:{},created:function(){var e=this;Dt.on(Dt.ROLL_CALL,(function(t,n){e.timeLeft=n.duration,e.$Dialog.show({title:"点名",content:'请在<span id="roll-call-time-left">'.concat(n.duration,"</span>秒内响应"),confirmText:"答到"}).then((function(){Dt.trigger(Dt.ROLL_CALL_RES)})).catch((function(e){console.log(e)})),e.applyTimer=setInterval((function(){0===e.timeLeft&&(clearInterval(e.applyTimer),e.$Dialog.hide()),$("#roll-call-time-left").text(e.timeLeft),e.timeLeft--}),1e3)}))},mounted:function(){},beforeDestroy:function(){}},$t=Jt,xt=(n("2ace"),Object(l["a"])($t,Nt,Bt,!1,null,"1d19764e",null)),Mt=xt.exports,Ut=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"show",rawName:"v-show",value:e.showDialog,expression:"showDialog"}],attrs:{id:"quiz-student"}},[n("div",{staticClass:"title-bar"},[n("span",{staticClass:"text"},[e._v("测验")]),n("span",{staticClass:"close",on:{click:function(t){return e.closeDialog()}}},[e._v("X")])]),n("div",{staticClass:"placeholder"})])},kt=[],Gt=BJY.eventEmitter,jt=BJY.quizStudent,Ht={components:{},data:function(){return{showDialog:!1}},computed:{},watch:{},methods:{open:function(e){this.showDialog=!0,this.$nextTick((function(){jt.open({element:$("#quiz-student .placeholder")[0],replace:!1,forceJoin:e.forceJoin,quizId:e.quizId,solution:e.solution,onReady:function(){},onError:function(){}})}))},closeDialog:function(){this.showDialog=!1}},created:function(){var e=this;jt.init(),Gt.on(Gt.QUIZ_START,(function(t,n){console.log(n),e.open(n)})).on(Gt.QUIZ_END,(function(t,n){e.closeDialog()})).on(Gt.QUIZ_SOLUTION,(function(t,n){e.open(n)})).on(Gt.QUIZ_SUBMIT,(function(t,n){console.log("submit:"+n),e.closeDialog()})),Gt.trigger(Gt.QUIZ_REQ)},mounted:function(){},beforeDestroy:function(){}},Ft=Ht,Wt=(n("0abc"),Object(l["a"])(Ft,Ut,kt,!1,null,"32078695",null)),Kt=Wt.exports,Qt={components:{AnswerMachine:wt,RollCall:Mt,Quiz:Kt},data:function(){return{}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){},beforeDestroy:function(){}},Vt=Qt,qt=(n("7632"),Object(l["a"])(Vt,bt,At,!1,null,"29f63fbd",null)),zt=qt.exports,Xt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"horselamp-fake"})},Zt=[],en={components:{},data:function(){return{content:""}},created:function(){this.content="我是跑马灯";var e="font-size: 18px;color: #fff;opacity: 0.5;",t=new BJY.HorseLamp({container:$("#main"),timeout:10,interval:5,trackCount:8,speed:30,count:5,mode:0,top:0,bottom:0,content:this.content,additionalStyle:e});t.start()},mounted:function(){}},tn=en,nn=(n("20d6"),Object(l["a"])(tn,Xt,Zt,!1,null,"7007c8d0",null)),an=nn.exports,rn={name:"app",components:{Loading:f,WhiteBorad:T,SettingPanel:q,InteractionPanel:Me,TeacherPlayer:Ve,FunctionPanel:Ct,HorseLamp:an,ModalPanel:zt},data:function(){return{loaded:!1,webrtc:1}},mounted:function(){var e="//live-cdn.baijiayun.com/js-sdk/1.15.0/player/extension/flash.swf",t=BJY.createSWF("temp","",e),n=$(t);$("body").prepend(n),n.css({position:"absolute",top:0,width:398,height:298,opacity:0}),this.supportFlash()||this.webrtc||this.$Dialog.show({title:"提示",content:'网页Flash插件加载不成功，请重新<a class="opt-button"\n            href="http://www.adobe.com/go/getflashplayer">启用flash</a>',confirmText:"关闭"}).then((function(){console.log("flash启用")})).catch((function(e){console.log(e)})),this.webrtc&&this.$Dialog.show({title:"提示",content:"正在进入教室。。。",confirmText:"确认"}).then((function(){console.log("教室内首次交互完成")})).catch((function(e){console.log(e)}))},created:function(){var e=this,t=BJY.eventEmitter,n=BJY.auth,a=$("body");t.one(t.CLASSROOM_CONNECT_TRIGGER,(function(e,n){var a=BJY.getExtension();return a.init().then((function(){t.trigger(t.CLASSROOM_CONNECT_TRIGGER,n)})),!1})).on(t.CLASSROOM_CONNECT_FAIL,(function(){alert(L.ROOM_SERVER_CONNECT_FAIL)})).on(t.LOGIN_CONFLICT,(function(){alert(L.LOGIN_CONFLICT)})).one(t.VIEW_RENDER_TRIGGER,(function(){e.loaded=!0,t.trigger(t.DOC_ALL_REQ),n.isStudent()&&a.addClass("student"),n.isWebRTC()&&BJY.ScreenShareExtensionWebrtc.init()})).one(t.LOADING_PANEL_END,(function(){$("#main").css("opacity",1)})).on(t.CLASS_START,(function(){n.isTeacher()&&t.trigger(t.MEDIA_SWITCH_TRIGGER,{audioOn:!0,videoOn:!0})})).on(t.CLASS_END,(function(){t.trigger(t.MEDIA_SWITCH_TRIGGER,{audioOn:!1,videoOn:!1})})).on(t.CLASSROOM_CONNECT_SUCCESS,(function(e,t){})),this.init()},methods:{init:function(){console.log("******************************************************************************"),console.log("*   欢迎使用 BJY JS SDK - 百家云直播 - "+BJY.version),console.log("*   API 文档：https://www.baijiayun.com/js-sdk/doc/#/README"),console.log("*   版本更新日志：https://www.baijiayun.com/js-sdk/doc/#/change-log"),console.log("*   常见问题：https://www.baijiayun.com/js-sdk/doc/#/live?id=%e5%b8%b8%e8%a7%81%e9%97%ae%e9%a2%98"),console.log("*   注意事项：自己创建教室测试时，注意非webrtc类型教室传入webrtc: 0"),console.log("*   sign签名规则：https://dev.baijiayun.com/wiki/detail/1"),console.log("******************************************************************************");var e={prefixName:"e70655665",env:"production",room_id:"20121042083339",user_number:"187",user_avatar:"https://img.baijiayun.com/0bjcloud/live/avatar/v2/103.jpg",user_name:"student",user_role:0,sign:"6ba34a2e6a08e4baeb4e957b4fcec31d",webrtc:1};if(location.href.includes("debug=1")){var t=prompt("输入教室链接进入教室");e=Object.assign(e,this.urlParser(t)),console.log(e)}var n={id:e.room_id,speakState:BJY.config.SPEAK_STATE_LIMIT};Number(e.webrtc)&&(n.webrtcType=Number(e.webrtc)),this.webrtc=n.webrtcType,BJY.init({env:e.env,privateDomainPrefix:e.prefixName,class:n,user:{number:e.user_number,avatar:decodeURIComponent(e.user_avatar),name:decodeURIComponent(e.user_name),type:Number(e.user_role)},teacher:{type:1},sign:e.sign})},urlParser:function(e){var t={};if(e)try{var n=e.split("?")[1],a=n.split("&");a.forEach((function(e){var n=e.split("=");t[n[0]]=n[1]})),t.env=this.getEnv(e),t.prefixName=e.split(".")[0].split("//")[1]}catch(i){alert("url格式错误，已进入默认教室")}return t},getEnv:function(e){var t=e.match(/\/\/(.*)\./)[1];return/test/.test(t)||/localhost/.test(t)||/\d{1,3}\.\d{1,3}\.\d{1,3}/.test(t)?"test":/beta/.test(t)?"beta":(/www/.test(t),"")},supportFlash:function(){var e,t=navigator.plugins;return t&&t.length>0?e=t["Shockwave Flash"]:document.all&&(e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")),!!e}}},sn=rn,on=(n("5c0b"),Object(l["a"])(sn,i,r,!1,null,null,null)),cn=on.exports,un=(n("402f"),n("3e83")),ln=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"fade"}},[e.visible?n("div",{staticClass:"dialog-wrap",on:{click:function(t){return e.cancel()}}},[n("div",{staticClass:"dialog",on:{click:function(e){e.stopPropagation()}}},[e.title?n("h3",{staticClass:"title"},[e._v(e._s(e.title))]):e._e(),n("div",{staticClass:"content",domProps:{innerHTML:e._s(e.content)}}),n("p",{staticClass:"btn-wrap"},[e.cancelText?n("button",{staticClass:"btn cancel-btn",on:{click:function(t){return e.cancel()}}},[e._v(e._s(e.cancelText))]):e._e(),e.confirmText?n("button",{staticClass:"btn confirm-btn",on:{click:function(t){return e.confirm()}}},[e._v(e._s(e.confirmText))]):e._e()])])]):e._e()])},dn=[],fn={name:"Dialog",props:{title:{type:String,default:"提示"},content:{type:String,default:"确定要执行该操作吗？"},cancelText:{type:String},confirmText:{type:String}},data:function(){return{visible:!1,resolve:"",reject:"",promise:""}},methods:{confirm:function(){this.visible=!1,this.resolve("confirm"),this.remove()},cancel:function(){this.visible=!1,this.reject("cancel"),this.remove()},show:function(){var e=this;return this.visible=!0,this.promise=new Promise((function(t,n){e.resolve=t,e.reject=n})),this.promise},remove:function(){var e=this;setTimeout((function(){e.$destroy()}),100)}}},_n=fn,pn=(n("bb57"),Object(l["a"])(_n,ln,dn,!1,null,null,null)),hn=pn.exports,mn={install:function(e,t){var n,a=e.extend(hn),i=function(){n=new a;var e=n.$mount().$el;document.body.appendChild(e)};e.prototype.$Dialog={show:function(e){return n||i(),"string"===typeof e?n.content=e:"object"===Object(un["a"])(e)&&Object.assign(n,e),n.show().then((function(e){return n=null,Promise.resolve(e)})).catch((function(e){return n=null,Promise.reject(e)}))},hide:function(){if(n)return n.cancel()}}}},En=mn,Tn=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"fade"}},[e.visible?n("div",{staticClass:"toast-wrap"},[n("p",{staticClass:"content"},[e._v(e._s(e.content))])]):e._e()])},gn=[],vn={components:{},props:{content:{type:String,default:"Toast"},duration:{type:Number,default:2e3}},data:function(){return{visible:!1,hideTimer:null}},computed:{},watch:{},methods:{show:function(){var e=this;this.visible=!0,this.hideTimer&&clearTimeout(this.hideTimer),this.hideTimer=setTimeout((function(){e.visible=!1}),this.duration)}},created:function(){},mounted:function(){},beforeDestroy:function(){}},Sn=vn,Cn=(n("a45c"),Object(l["a"])(Sn,Tn,gn,!1,null,"675e1ad0",null)),bn=Cn.exports,An={install:function(e,t){var n,a=e.extend(bn),i=function(){n=new a;var e=n.$mount().$el;document.body.appendChild(e)};e.prototype.$Toast=function(e){return n||i(),"string"===typeof e?n.content=e:"object"===Object(un["a"])(e)&&Object.assign(n,e),n.show()}}},Ln=An;a["a"].use(En),a["a"].use(Ln),a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(cn)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("ac27")},"602f":function(e,t,n){},6606:function(e,t,n){},6758:function(e,t,n){},"69e3":function(e,t,n){},"6e58":function(e,t,n){},7632:function(e,t,n){"use strict";n("6606")},7705:function(e,t,n){"use strict";n("3b72")},"7a98":function(e,t,n){},8027:function(e,t,n){"use strict";n("69e3")},"84d9":function(e,t,n){"use strict";n("d0a6")},8720:function(e,t,n){},"8a51":function(e,t,n){},"91bf":function(e,t,n){},9372:function(e,t,n){},"95c7":function(e,t,n){},a45c:function(e,t,n){"use strict";n("1eb3")},ac27:function(e,t,n){},b395:function(e,t,n){},ba08:function(e,t,n){"use strict";n("95c7")},bb57:function(e,t,n){"use strict";n("6e58")},bd9d:function(e,t,n){"use strict";n("ee95")},bfc2:function(e,t,n){"use strict";n("9372")},c056:function(e,t,n){"use strict";n("e526")},d0a6:function(e,t,n){},d456:function(e,t,n){"use strict";n("8a51")},d694:function(e,t,n){},dd6a:function(e,t,n){"use strict";n("d694")},e4c0:function(e,t,n){},e526:function(e,t,n){},ec3c:function(e,t,n){"use strict";n("91bf")},ee95:function(e,t,n){},f091:function(e,t,n){"use strict";t.LABEL_CONFIRM="确定",t.TIME_SECONED="秒",t.USER_ROLE_TEACHER="老师",t.USER_ROLE_STUDENT="学生",t.USER_ROLE_GUEST="游客",t.USER_ROLE_ASSISTANT="助教",t.MAIN_MENU_CLASS_START="上课",t.MAIN_MENU_CLASS_END="下课",t.BUTTON_CONTENT_FULLSCREEN="全屏",t.BUTTON_CONTENT_FULLSCREEN_EXIT="退出全屏",t.BUTTON_ROLL_CALL="点名",t.BUTTON_SCREEN_START="屏幕分享",t.BUTTON_SCREEN_STOP="结束分享",t.BUTTON_ANSWER_MACHINE="答题器",t.CLASS_START="上课",t.CLASS_END="下课",t.DIALOG_TITLE_DOCUMENT="课件管理",t.DIALOG_TITLE_PROGRAM="选择分享的程序",t.BUTTON_CONTENT_DOCUMENT="课件管理",t.BUTTON_CONTENT_MY_DOCUMENT="我的课件",t.BUTTON_CONTENT_FULLSCREEN="全屏",t.BUTTON_CONTENT_FULLSCREEN_EXIT="退出全屏",t.BUTTON_ROLL_CALL="点名",t.ROLL_CALL_STUDENT_TIME="请输入学生响应时间: ",t.ROLL_CALL_TEACHER_TIME="秒后查看点名结果",t.ROLL_CALL_STUDENT_RES="老师发起了点名，请点击确定，剩余: ",t.ROLL_CALL_SUCCESS="已签到",t.ROLL_CALL_FINISH="点名结束",t.ROLL_CALL_RESULT="查看结果",t.ROLL_CALL_AGAIN="再来一次",t.TITLE_ROLL_CALL_RESULT="点名结果",t.ROLL_CALL_YES="已签到",t.ROLL_CALL_NO="未签到",t.ROOM_SERVER_CONNECT_FAIL="网络已断开，请检查网络连接或者刷新页面重新进入房间",t.LOGIN_CONFLICT="你已被踢，请确认用户 number 是否唯一或者刷新页面重新进入房间",t.CLOUD_RECORD_START_NEW="是否开始新的录制？",t.CLOUD_RECORD_GENERATE_PLAYBACK_NOW="是否立即生成回放？",t.TIP_CLASS_START="已上课",t.TIP_CLASS_END="已下课",t.TIP_CLASS_NOT_START="课程未开始",t.TIP_SPEAK_LIMIT="发言请先举手",t.TIP_SPEAK_APPLY_TIMEOUT="老师未做响应，已自动取消申请发言",t.TIP_SPEAK_APPLY_REJECT="老师拒绝了你的发言申请",t.TIP_SPEAK_APPLY_ACCEPT="老师已允许你发言",t.TIP_CLOUD_RECORD_OVERTIME="已过直播结束时间，不可开启云端录制",t.TIP_CLOUD_RECORD_END_PLAYBACK_START="正在生成回放，无法继续使用云端录制",t.TIP_NET_DISK_POOR="存储空间不足",t.TIP_HTTP_REQUEST_ERROR="网络请求失败, 请检查网络",t.TIP_LOCAL_RECORD_PATH_NULL="请选择本地存放视频路径",t.BARRAGE_ON="弹幕开",t.BARRAGE_OFF="弹幕关"},fb16:function(e,t,n){"use strict";n("e4c0")}});
//# sourceMappingURL=app.9b72c049.js.map