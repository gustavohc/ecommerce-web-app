<template>
  <v-row justify="center">
    <v-col cols="12" md="4">
      <v-card :elevation="$vuetify.breakpoint.xsOnly ? '0' : '1' ">
        <v-card-title>
          <v-row>
            <v-col>Gerenciador de Produtos</v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            @submit.prevent="signon">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="credentials.username"
                  label="Usuário"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="credentials.password"
                  label="Senha"
                  required
                  :type="hide ? 'password' : 'true'"
                  :append-icon="hide ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append="hide = !hide"
                  ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-alert v-if="alert" :type="alert.type">{{
                  alert.msg
                  }}</v-alert>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card-actions>
                  <v-btn width="100%" type="submit" class="primary" v-on:click.stop.prevent="signon()"
                  :loading="loading">
                    Entrar
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Login",
  created() {
    if (this.authenticated) {
      this.$router.push('/')
    }
  },
  data() {
    return {
      hide: true,
      user: {},
      credentials: {
        username: "",
        password: "",
      },
      checkbox: false,
    };
  },
  computed: {
    ...mapGetters(["loading", "alert", "authenticated"]),
  },
  methods: {
    ...mapActions(["login", "setAlert"]),
    async signon() {
      let result = await this.login(this.credentials);
      if (result.status === 0) {
        this.$alertSuccess(result.msg);
      } else {
        this.setAlert({ ...result, ...{ type: "error" } });
      }
    },
  },
}
</script>

<style>

</style>