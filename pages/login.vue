<template>
  <v-container fluid class="secondary">
    <v-row no-gutters="" style="height : 100vh" justify="center">
      <v-col cols="12" class="d-flex flex-column align-center justify-center">
        <v-snackbar
          v-model="alert.is"
          top
          :color="alert.type"
        >
          {{ alert.message }}
        </v-snackbar>
        <v-card width="400">
          <v-card-title class="text-uppercase">
            <v-icon color="primary" large class="mr-2">
              mdi-account-circle-outline
            </v-icon>
            Login
          </v-card-title>
          <v-divider />

          <v-form ref="form" v-model="valid" lazy-validation class="pb-2" @submit.prevent>
            <v-card-text class="pb-0">
              <v-row no-gutters="">
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    type="email"
                    name="email"
                    outlined
                    dense
                    required
                    :rules="emailRules"
                    color="primary"
                    label="Email"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    :type="show ? 'text' : 'password'"
                    name="password"
                    outlined
                    dense
                    color="primary"
                    label="Password"
                    required
                    :rules="passwordRules"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"

                    @click:append="show = !show"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="px-3">
              <v-btn

                block
                depressed
                type="submit"
                :loading="loading.login"
                color="secondary"
                @click="submit"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Register',

  data: () => ({
    show: false,
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],

    password: '',
    passwordRules: [
      v => !!v || 'Password is required'
    ]

  }),
  computed: {
    ...mapGetters({ loading: 'authentication/getLoading', alert: 'authentication/getAlert' })
  },
  methods: {
    ...mapActions({ loginUser: 'authentication/loginUser' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.loginUser(user)
      }
    },
    clear () {
      this.reset()
      this.resetValidation()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }

  },
  head () {
    return {
      title: 'Login ',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Login into your free account and start investmenting'
        }
      ]
    }
  }

}
</script>

<style>

</style>
