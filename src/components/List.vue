<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="7" class="text-h2 blue-grey lighten-4 text-center rounded-lg">
        Produtos ecommerce
      </v-col>
    </v-row>
    <v-divider class="my-9"/>
    <v-row justify="center">
      <v-data-table
        :headers="headers"
        :items="products.objects"
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
        <template v-slot:[`header.actions`]="{ header }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ header.text }}</span>
            </template>
            <span>{{ header.tooltip }}</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.coupons`]="{ item }">
          <v-chip small class="mx-1" color="warning" v-for="coupon in item.coupons" :key="coupon.id"><span>{{ coupon.code }}</span></v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-ticket-percent
          </v-icon>
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
    <v-dialog
      v-model="dialog"
      max-width="40vw"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Adicionar descontos no produto</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-banner class="mb-5">
              <v-icon
                slot="icon"
                color="warning"
                size="36"
              >
                mdi-devices
              </v-icon>
              <v-row>
                <v-col><span>{{ product.name }}</span></v-col>
              </v-row>
              <v-row>
                <v-col><span>{{ product.description }}</span></v-col>
              </v-row>
            </v-banner>
            <v-row>
              <v-col
                cols="12"
              >
                <v-autocomplete
                  v-model="product.coupons"
                  :items="coupons.objects"
                  item-text="code"
                  filled
                  rounded
                  hide-details
                  chips
                  deletable-chips
                  label="Descontos"
                  full-width
                  multiple
                  return-object
                  single-line/>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="warning"
            text
            @click="close"
          >
            Cancelar
          </v-btn>
          <v-btn
            text
            @click="save"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; // mapState
import { productService } from '@/services/products.service';

export default {
  data() {
    return {
      loading: false,
      dialog: false,
      product: undefined,
      defaultProduct: {
        name: undefined,
        description: undefined
      },
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
        {
          text: "Ações",
          align: "center",
          tooltip: "Adicionar descontos",
          value: "actions",
          sortable: false
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      "loadAllProducts",
      "loadAllCoupons"
    ]),
    async load(){
      this.loading = true;
      await this.loadAllProducts();
      this.loading = false;
      this.loadAllCoupons();
    },
    editItem(item) {
      this.product = Object.assign({}, item)
      this.dialog = true
    },
    initialize() {
      this.product = Object.assign({}, this.defaultProduct);
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.initialize();
      })
    },
    async save(){
      try {
        let coupons = this.product.coupons;
        this.product.coupons = [];
        let payload = {
          product: this.product,
          coupons: coupons
        }

        let response = await productService.attachCoupons(payload);
        if(response.status < 300)
          this.$alertSuccess("Descontos atrelados ao produto");
        
        this.close();
        this.load();
      }catch(err) {
        // catches errors both in fetch and response.json
        this.$alertError("Houve um problema ao configurar os descontos");
        console.log(err);
      }
    },
  },
  computed:{
    ...mapGetters(['products', 'coupons']),
  },
  created() {
    this.initialize();
    this.load();
  },
}
</script>

<style>

</style>