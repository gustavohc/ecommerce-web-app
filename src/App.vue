<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import { mapGetters, mapMutations }  from 'vuex';

export default {
  name: 'App',
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
