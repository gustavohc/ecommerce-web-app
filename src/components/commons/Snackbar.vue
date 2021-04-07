<template>
  <v-snackbar
    v-if="snack"
    v-model="snack"
    top
    right
    :color="customColor(snack.color)"
    >
    <div class="snackbar">
      {{ snack.message }}
    </div>

    <template v-slot:action="{ attrs }">
      <v-btn
        text
        icon
        dark
        v-bind="attrs"
        @click.stop="snack.show = false">
          <v-icon >mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Snackbar",
  computed: {
    ...mapGetters(['snack']),
  },
  methods: {
    customColor(color) {
      if(color === 'success') {
        return "#8BC34A"
      } else {
        return color
      }
    }
  }
}
</script>

<style lang="sass">
  .snackbar
    font-size: 18px !important
    font-weight: 600 !important
</style>