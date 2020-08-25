<template>
  <v-app>
    <div>
      <v-app-bar color="white primary--text" flat>
        <v-toolbar-title class="d-flex align-center">
          <v-btn to="/dashboard" color="primary" text>
            Dashboard
          </v-btn>
        </v-toolbar-title>

        <v-spacer />
        <v-btn
          to="/dashboard"
          text
          depressed
          color="primary"
          class=" rounded-tr-lg rounded-bl-lg text-capitalize "
          @click="logout"
        >
          Logout
        </v-btn>
      </v-app-bar>
    </div>

    <v-main class="grey lighten-3">
      <v-slide-y-transition mode="out-in">
        <keep-alive>
          <nuxt />
        </keep-alive>
      </v-slide-y-transition>
    </v-main>

    <v-footer color="grey lighten-2" class="d-flex justify-center">
      <div style="margin:10px">
        <div class="text-overline">
          Copyright © InksUser 2020. All Rights Reserved.
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  data: () => ({

  }),
  created () {
    this.$store.dispatch('authentication/handleAuthStateChanged')
  },
  methods: {
    logout () {
      this.$store.dispatch('authentication/logoutUser')
    }
  }

}
</script>

<style scoped>
.logo.v-btn:before {
  background-color: transparent;
}
</style>
