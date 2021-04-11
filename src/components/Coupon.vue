<template>
  <v-row justify="center" class="full-height" align="center">
    <v-col cols="11">
      <v-card >
        <v-card-title>
          <v-row>
            <v-col class="text-center font-weight-bold">
              Cadastro de Cupons
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row class="fill-height pt-3" justify="center">
            <v-col cols=12 md=6 v-if="loading">
              <v-row>
                <v-col cols=12 class="subtitle-1 text-center">Buscando cupons...</v-col>
                <v-col cols=12>
                  <v-progress-linear color='primary' indeterminate rounded height="6"></v-progress-linear>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols=12 v-else>
              <v-data-table
                :headers="headers"
                :items="coupons.objects"
                :items-per-page="10"
                class="elevation-0 "
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
                  <template v-slot:[`header.description`]="{ header }">
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
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                      small
                      class="mr-2"
                      @click="editItem(item)"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon
                      small
                      @click="confirmDelete(item)"
                    >
                      mdi-delete
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
                      >Nenhum cupom encontrado</strong>
                    </v-layout>
                  </v-container>
                </template>

                <template v-slot:top>
                  <v-toolbar
                    flat
                  >
                    <v-toolbar-title>
                      <v-text-field
                        label="Filtro"/>
                    </v-toolbar-title>
                    <v-divider
                      class="mx-4"
                      inset
                      vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog
                      v-model="dialog"
                      max-width="500px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          Novo
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col
                                cols="12"
                              >
                                <v-text-field
                                  v-model="coupon.code"
                                  label="Código do desconsto"
                                  rounded
                                  filled
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="4"
                                md="6"
                              >
                                <v-text-field
                                  v-model="coupon.discount_percent"
                                  label="Porcentagem de desconto"
                                  type="number"
                                  rounded
                                  filled
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="4"
                                md="6"
                              >
                                <v-text-field
                                  v-model="coupon.discount_value"
                                  label="Valor do desconto"
                                  type="number"
                                  rounded
                                  filled
                                ></v-text-field>
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
                  </v-toolbar>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-dialog v-model="dialogDelete" persistent max-width="25vw" @keydown.esc="closeDelete">
        <v-card>
          <v-card-title class="headline">
            <v-row>
              <v-col cols="2"><v-icon left large color="red">mdi-alert</v-icon></v-col>
              <v-col cols="8" class="text-center"><span>Atenção</span></v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="text-center">
            <span class="text-h5">Deseja mesmo excluir o item?</span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="mx-1" color="warning" text @click="closeDelete">Cancelar</v-btn>
            <v-btn class="mx-1" text @click="remove()">Confirmar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; // mapState
import { couponService } from '@/services/coupon.service';

export default {
  data() {
    return {
      loading: false,
      dialog: false,
      dialogDelete: false,
      coupon: undefined,
      defaultCoupon: {
        code: undefined,
        discount_percent: undefined,
        discount_value: undefined
      },
      headers: [
        {
          text: "Código",
          tooltip: "Referência do descontro",
          align: "left",
          value: "code"
        },
        {
          text: "Porcentagem",
          tooltip: "Porcentagem de desconto",
          align: "center",
          value: "discount_percent"
        },
        {
          text: "Valor",
          tooltip: "Valor do desconto",
          align: "center",
          value: "discount_value"
        },
        {
          text: "Ações",
          align: "center",
          tooltip: "Modificar ou excluir",
          value: "actions",
          sortable: false
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      "loadAllCoupons",
    ]),
    async loadCoupons(){
      this.loading = true;
      await this.loadAllCoupons();
      this.loading = false;
    },
    editItem(item) {
      this.coupon = Object.assign({}, item)
      this.dialog = true
    },
    async save(){
      try {
        console.log(this.coupon);
        let response = await couponService.saveUpdate(this.coupon);
        if(response.status < 300) {
          this.$alertSuccess("Cupom inserido");
        }
        this.close();
        this.loadCoupons();
      }catch(err) {
        // catches errors both in fetch and response.json
        this.$alertError("Houve um problema ao inserir o cupom");
        console.log(err);
      }
    },
    confirmDelete(item){
      this.coupon = Object.assign({}, item)
      this.dialogDelete = true
    },
    async remove() {
      try{
        let response = await couponService.remove(this.coupon.id);
        if(response.status < 300) 
          this.$alertSuccess("Produto deletado");
        
        this.closeDelete();
        this.loadCoupons();
      }catch(err) {
        // catches errors both in fetch and response.json
        this.$alertError("Houve um problema ao deletar o produto");
        console.log(err);
      }
    },
    initialize() {
      this.coupon = Object.assign({}, this.defaultCoupon);
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.initialize();
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.initialize();
      })
    },
  },
  computed:{
    ...mapGetters(['coupons']),
    formTitle () {
      return this.coupon.id ? 'Editar item' : 'Novo item';
    },
  },
  created() {
    this.initialize();
    this.loadCoupons();
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
  }
}
</script>

<style>

</style>