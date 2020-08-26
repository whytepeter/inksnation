<template>
  <v-row v-if="user" justify="center">
    <v-snackbar

      v-model="alert.is"
      :color="alert.type"
    >
      {{ alert.message }}
    </v-snackbar>
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
                  v-model="newUser.username"
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
                  v-model="newUser.email"
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
                  v-model="newUser.password"
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
                  v-model="newUser.pin"
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
                  v-model="newUser.phone"
                  name="phone"
                  outlined
                  dense
                  color="primary"
                  label="Phone"
                  :rules="phoneRules"
                />
              </v-col>
              <v-col cols="12" class="d-flex align-center justify-space-around">
                <v-checkbox
                  v-model="newUser.registered"
                  color="primary"
                  class="py-0 my-0"
                  type="checkbox"
                  :value="newUser.valueR"
                  label="Registered"
                />
                <v-checkbox
                  v-model="newUser.activated"
                  color="primary"
                  class="py-0 my-0"
                  type="checkbox"
                  :value="newUser.valueA"
                  label="Activated"
                />
                <v-checkbox
                  v-model="newUser.verified"
                  color="primary"
                  class="py-0 my-0"
                  type="checkbox"
                  :value="newUser.valueV"
                  label="Verified"
                />
                <v-checkbox
                  v-model="newUser.paid"
                  color="primary"
                  class="py-0 my-0"
                  type="checkbox"
                  :value="newUser.valueP"
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
              :loading="loading.edit"
              color="secondary"
              @click="update"
            >
              Update User
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
  props: {
    user: {
      type: Object,
      default: () => ({
        username: 'username',
        email: 'you@example.com',
        password: '123456',
        pin: '1234',
        phone: '01234567890',
        activated: false,
        verified: false,
        paid: false
      })
    }
  },
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

    activated: null,
    verified: null,
    paid: null

  }),
  computed: {
    ...mapGetters({ loading: 'authentication/getLoading', alert: 'authentication/getAlert' }),
    newUser () {
      let activated, verified, paid, registered, valueA, valueV, valueP, valueR

      if (this.user.activated) {
        activated = true
        valueA = 0
      } else {
        activated = false
        valueA = 1
      }
      if (this.user.verified) {
        verified = true
        valueV = 0
      } else {
        verified = false
        valueV = 1
      }
      if (this.user.paid) {
        paid = true
        valueP = 0
      } else {
        paid = false
        valueP = 1
      }
      if (this.user.registered) {
        registered = true
        valueR = 0
      } else {
        registered = false
        valueR = 1
      }

      return {
        username: `${this.user.username}`,
        email: `${this.user.email}`,
        password: `${this.user.password}`,
        pin: `${this.user.pin}`,
        phone: `${this.user.phone}`,
        activated,
        verified,
        paid,
        registered,
        valueA,
        valueV,
        valueP,
        valueR
      }
    }
  },
  methods: {
    ...mapActions({ edit: 'authentication/editUser' }),
    update () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const user = {
          username: this.newUser.username,
          email: this.newUser.email,
          password: this.newUser.password,
          pin: this.newUser.pin,
          phone: this.newUser.phone,
          activated: this.newUser.activated,
          verified: this.newUser.verified,
          paid: this.newUser.paid,
          registered: this.newUser.registered

        }
        this.edit(user)
      }
    }
  }
}
</script>

<style>

</style>
