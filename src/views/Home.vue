<template>
  <div>
    <Drawer/>
    <CoreView/>
    <Snackbar/>
  </div>
</template>

<script>
// @ is an alias to /src
import Drawer from '@/components/commons/Drawer.vue'
import CoreView from '@/components/commons/View.vue'
import Snackbar from '@/components/commons/Snackbar.vue'

export default {
  name: 'Home',
  components: {
    Drawer,
    CoreView,
    Snackbar
  }
}
</script>
