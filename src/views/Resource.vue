<template>
  <v-row class="fill-height" :class="$vuetify.breakpoint.xsOnly ? 'white' : 'grey lighten-2'" align=center >
    <v-col align="center" class="mx-auto" cols=12>
      <div class="display-3"></div>
      <router-view/>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Resource',
}
</script>

<style>

</style>