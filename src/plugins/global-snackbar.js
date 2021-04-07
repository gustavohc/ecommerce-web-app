import Vue from 'vue'
import store from '@/store/index';

const GlobalSnackbar = {
    install(Vue) {
        Vue.prototype.$alertSuccess = (msg, timeout=null) => {
            let snack = {
                message: msg,
                color: "success",
                timeout: timeout
            };

            store.dispatch('showSnack', snack);
        }
        
        Vue.prototype.$alertError = (msg, timeout=null) => {
            let snack = {
                message: msg,
                color: "error",
                timeout: timeout
            };

            store.dispatch('showSnack', snack);
        }
        
        Vue.prototype.$alertInfo = (msg, timeout=null) => {
            let snack = {
                message: msg,
                color: "info",
                timeout: timeout
            };

            store.dispatch('showSnack', snack);
        }
    }
}

Vue.use(GlobalSnackbar)