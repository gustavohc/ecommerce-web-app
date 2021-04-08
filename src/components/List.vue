<template>
  <v-container fluid>
    <v-row justify="center" class="my-2">
      <v-col cols="7" class="text-h1 blue-grey lighten-4 text-center rounded-lg">
        Produtos ecommerce
      </v-col>
    </v-row>
    <v-divider class="my-3"/>
    <v-row justify="center">
      <v-data-table
        :headers="headers"
        :items="products"
        :items-per-page="5"
        class="elevation-0 table-full-width"
        :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-arrow-left',
            nextIcon: 'mdi-arrow-right'
        }"
        height="60vh">
        <template v-slot:[`header.name`]="{ header }">
            <v-tooltip top>
            <template v-slot:activator="{ on }">
                <span v-on="on">{{ header.text }}</span>
            </template>
            <span>{{ header.tooltip }}</span>
            </v-tooltip>
        </template>
        <template v-slot:[`header.price`]="{ header }">
            <v-tooltip top>
            <template v-slot:activator="{ on }">
                <span v-on="on">{{ header.text }}</span>
            </template>
            <span>{{ header.tooltip }}</span>
            </v-tooltip>
        </template>
        <template v-slot:[`header.coupons`]="{ header }">
            <v-tooltip top>
            <template v-slot:activator="{ on }">
                <span v-on="on">{{ header.text }}</span>
            </template>
            <span>{{ header.tooltip }}</span>
            </v-tooltip>
        </template>
        <template v-slot:no-data>
          <v-container
            fluid
            fill-height
            style="background-color: rgba(255, 255, 255, 0.5);"
          >
            <v-layout justify-center align-center>
              <strong
                class="py-2"
              >Nenhum produto encontrado</strong>
            </v-layout>
          </v-container>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; // mapState

export default {
  data() {
    return {
      loading: false,
      dialog: false,
      headers: [
        {
          text: "Nome",
          tooltip: "Nome do prduto",
          align: "left",
          value: "name"
        },
        {
          text: "Preço",
          tooltip: "Preço do produto sem desconto",
          align: "center",
          value: "price"
        },
        {
          text: "Desconto",
          tooltip: "Descontro cadastrado nesse produto",
          align: "center",
          value: "coupons"
        },
      ]
    }
  },
  methods: {
    ...mapActions([
      "loadAll",
    ]),
    async loadProducts(){
      this.loading = true;
      this.products = await this.loadAll();
      this.loading = false;
    },
    edit() {}
  },
  computed:{
    ...mapGetters(['products']),
  },
  created() {
    this.loadProducts();
  },
}
</script>

<style>

</style>