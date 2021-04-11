<template>
  <v-app>
    <Drawer/>
    <CoreView/>
    <Snackbar/>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations }  from 'vuex';

import Drawer from '@/components/commons/Drawer.vue'
import CoreView from '@/components/commons/View.vue'
import Snackbar from '@/components/commons/Snackbar.vue'

export default {
  name: 'App',
  components: {
    Drawer,
    CoreView,
    Snackbar
  },
  methods: {
    ...mapMutations(['SET_USER'])
  },
  computed: { ...mapGetters(['authenticated'])},
  created() {
    console.log('Version:', this.$store.getters.appVersion);

    if (!this.authenticated && localStorage.getItem("user")) {
      this.SET_USER(localStorage.getItem("user"));
    }else{
      this.$router.push('/login').catch(()=>{});
    }
  }
};
</script>
<style>
  html {
    overflow-y: scroll !important;
  }
  .v-navigation-drawer__content {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .v-main__wrap {
    margin: 0;
    overflow: hidden !important;
  }
</style>