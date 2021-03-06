import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme:{
    themes: {
      dark: {
        primary: '#21CFF3',
        accent: '#FF4081',
        secondary: '#ffe18d',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252'
      },
      light: {
        primary: '#000000',
        accent: '#006064',
        secondary: '#B0BEC5',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252'
      }
    },
    icons: {
      iconfont: 'mdiSvg',
    }
  },
});
