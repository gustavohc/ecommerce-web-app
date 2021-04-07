<template>
  <v-row class="fill-height" :class="$vuetify.breakpoint.xsOnly ? 'white' : 'grey lighten-2'" align="center" >
    <v-col align="center" class="mx-auto">
      <div class="display-3"></div>
    <router-view/>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name:"Auth"
}
</script>
<style scoped>
.row {
  margin: 0;
}
</style>
