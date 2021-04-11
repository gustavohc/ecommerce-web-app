<template>
  <v-navigation-drawer
  v-if="authenticated"
    :permanent="$vuetify.breakpoint.smAndUp"
    width="5vw"
    class="primary"
    app
    dark>
    <v-list flat>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.route"
        >
        <v-list-item-content class="text-center">
          <v-icon
            v-html="item.icon"
            :class="$route.path === item.route ? 'white--text' : 'text--gray'"
            ></v-icon>
          <small class="mt-1" v-if="$route.path === item.route" :class="$route.path === item.route ? 'font-weight-black': ''">
            {{ item.title }}
          </small>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div v-if="authenticated">
        <v-list-item @click.stop="logoff">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-list-item-content>
                <v-icon size="20" v-on="on">mdi-power</v-icon>
              </v-list-item-content>
            </template>
            <span> Sair </span>
          </v-tooltip>
        </v-list-item>
      </div>
      <v-list-item :to="'/login'" v-else>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-content>
              <v-icon v-bind="attrs" v-on="on">mdi-exit-to-app</v-icon>
            </v-list-item-content>
          </template>
          <span>Entrar</span>
        </v-tooltip>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions} from "vuex";

export default {
  name: "Drawer",

  data() {
    return {
      items: [
        {title: `Home`, route: '/', icon: 'mdi-view-dashboard',},
        {title: `Produtos`, route: '/resource/product', icon: 'mdi-devices',},
        {title: `Cupons`, route: '/resource/coupon', icon: 'mdi-ticket-percent',},
      ]
    }
  },
  methods: {
    ...mapActions(['logoff'])
  },
  computed:{
    ...mapGetters(["authenticated"]),
  },
}
</script>

<style>

</style>