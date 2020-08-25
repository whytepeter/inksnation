<template>
  <v-row justify="center">
    <v-col v-if="alert.is" cols="12" md="6" :class="[alert.is ? 'animate__animated animate__fadeInDown' : 'animate__animated animate__fadeOutUp' ]">
      <v-alert
        :type="alert.type"
        border="top"
        dark
      >
        {{ alert.message }}
      </v-alert>
    </v-col>
    <v-col cols="12">
      <v-card flat color="transparent" width="400" class="mx-auto">
        <v-card-title class="text-uppercase justify-center">
          <v-icon color="primary" large class="mr-2">
            mdi-account-circle-outline
          </v-icon>
          Add New User
        </v-card-title>
        <v-divider />

        <v-form ref="form" v-model="valid" lazy-validation class="pb-2" @submit.prevent>
          <v-card-text class="pb-0">
            <v-row no-gutters="">
              <v-col cols="12">
                <v-text-field
                  v-model="username"
                  type="text"
                  name="username"
                  outlined
                  dense
                  required
                  :rules="usernameRules"
                  color="primary"
                  label="Username"
                />
              </v-col>
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
                  name="password"
                  outlined
                  dense
                  color="primary"
                  label="Password"
                  required
                  :rules="passwordRules"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="pin"
                  name="pin"
                  outlined
                  dense
                  color="primary"
                  label="Pin"
                  required
                  :rules="pinRules"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="phone"
                  name="phone"
                  outlined
                  :rules="phoneRules"
                  dense
                  color="primary"
                  label="Phone"
                />
              </v-col>
              <v-col cols="12" class="d-flex align-center justify-space-around">
                <v-checkbox
                  v-model="activated"
                  color="primary"
                  class="py-0 my-0"
                  type="checkbox"
                  value="1"
                  label="Activated"
                />
                <v-checkbox
                  v-model="verified"
                  color="primary"
                  class="py-0 my-0"
                  type="checkbox"
                  value="1"
                  label="Verified"
                />
                <v-checkbox
                  v-model="paid"
                  color="primary"
                  class="py-0 my-0"
                  type="checkbox"
                  value="1"
                  label="Paid"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="px-3">
            <v-btn

              block
              depressed
              type="submit"

              color="secondary"
              :loading="loading.add"
              @click="submit"
            >
              Add New User
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Adduser',
  data: () => ({
    valid: true,
    username: '',
    usernameRules: [
      v => !!v || 'Username is required'
    ],
    email: '',
    emailRules: [
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],

    password: '',
    passwordRules: [
      v => v.length >= 6 || 'Min 6 characters'
    ],
    pin: '',
    pinRules: [
      v => v.length === 4 || 'Pin must be 4 characters'
    ],
    phone: '',
    phoneRules: [
      v => v.length >= 11 || 'Min 11 characters'
    ],

    activated: false,
    verified: false,
    paid: false

  }),

  computed: {
    ...mapGetters({ loading: 'authentication/getLoading', alert: 'authentication/getAlert' })
  },
  methods: {
    ...mapActions({ add: 'authentication/addUser' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const user = {
          username: this.username,
          email: this.email,
          password: this.password,
          pin: this.pin,
          phone: this.phone,
          activated: this.activated === '1',
          verified: this.verified === '1',
          paid: this.paid === '1'
        }
        this.add(user)
      }
    }

  }
}
</script>

<style>

</style>
