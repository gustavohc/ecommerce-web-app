<template>
  <v-row justify="center" class="full-height" align="center">
    <v-col cols="11">
      <v-card >
        <v-card-title>
          <v-row>
            <v-col class="text-center font-weight-bold">
              Cadastro de produtos
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row class="fill-height pt-3" justify="center">
            <v-col cols=12 md=6 v-if="loading">
              <v-row>
                <v-col cols=12 class="subtitle-1 text-center">Buscando os ativos...</v-col>
                <v-col cols=12>
                  <v-progress-linear color='primary' indeterminate rounded height="6"></v-progress-linear>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols=12 v-else>
              <v-data-table
                :headers="headers"
                :items="products.objects"
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
                      @click="deleteItem(item)"
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
                      >Nenhum produto encontrado</strong>
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
                                sm="4"
                                md="6"
                              >
                                <v-text-field
                                  v-model="product.name"
                                  label="Nome"
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
                                  v-model="product.price"
                                  label="Preço"
                                  type="number"
                                  rounded
                                  filled
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                              >
                                <v-text-field
                                  v-model="product.description"
                                  label="Descrição"
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
    </v-col>
  </v-row>
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
        price: 0,
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
          text: "Descrição",
          tooltip: "Descrição do produto",
          align: "center",
          value: "description"
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
      "loadAllProducts",
    ]),
    async loadProducts(){
      this.loading = true;
      await this.loadAllProducts();
      this.loading = false;
    },
    editItem(item) {
      this.product = Object.assign({}, item)
      this.dialog = true
    },
    async save(){
      try {
        console.log(this.product);
        let response = await productService.saveUpdate(this.product);
        if(response.status < 300) {
          this.$alertSuccess("inserido");
        }
        this.close();
        this.loadProducts();
      }catch(err) {
        // catches errors both in fetch and response.json
        this.$alertError("Houve um problema ao inserir o produto");
        console.log(err);
      }
    },
    initialize() {
      this.product = Object.assign({}, this.defaultProduct);
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.initialize();
      })
    },
  },
  computed:{
    ...mapGetters(['products']),
    formTitle () {
      return this.product.id ? 'Editar item' : 'Novo item';
    },
  },
  created() {
    this.initialize();
    this.loadProducts();
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