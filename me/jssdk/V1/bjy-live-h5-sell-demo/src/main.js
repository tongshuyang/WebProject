import Vue from "vue";
import App from "./App.vue";
import "./common/common.scss";
import Confirm from "./components/common/Confirm/confirm.js";

Vue.use(Confirm);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
