<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="primary bghome" style="height: 70vh">
      <v-col cols="12" md="10" class="text-center">
        <div class=" text-h5 text-md-h3 text-lg-h2 text-capitalize white--text font-weight-bold">
          WORLD'S FIRST RESERVE
          COIN OFFERING ENDS IN
        </div>
        <div class="opacity text-subtitle-2 text-md-h6 white--text mt-3 font-weight-medium">
          EXCHANGER FRANCIS ZEBULUN
        </div>
        <div cols="12" class="text-center mt-6">
          <v-btn
            target="_blank"
            href="https://chat.whatsapp.com/DxV4z4O7BvQ0bpkCFoeuG0"
            text
            color="white"
            class="animate__animated animate__pulse animate__infinite animate__slow"
          >
            <v-icon large class="mx-2">
              mdi-whatsapp
            </v-icon>
            Join us on whatsapp for updates
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" class="mt-n10" md="10">
        <v-card elevation="6">
          <v-card-text class="pb-0">
            <v-text-field
              v-model="searchText"
              prepend-icon="mdi-magnify"
              clearable=""
              color="primary"
              placeholder="Search by username or email"
              @keyup="searchUser"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="users.length && searchText === ''">
      <v-col v-for="(user, i) in users" :key="i" cols="12" sm="6" md="4">
        <v-card outlined>
          <v-card-text class="">
            <div class="text-subtitle-2">
              <div class="text-capitalize text-sutitle-1 d-flex align-center justify-space-between ">
                <strong>Username</strong><span class="text-h6">{{ user.username }}</span>
              </div>
              <div class="d-flex justify-space-between">
                <strong> Email:</strong> {{ user.email }}
              </div>
            </div>
            <div class="d-flex align-center justify-end">
              <div>
                <v-chip
                  small
                  class="ma-1"
                  :color=" getColor(user.activated)"
                >
                  {{ user.activated ? 'Activated' : 'Not Activated' }}
                </v-chip>
                <v-chip
                  small
                  class="ma-1"
                  :color=" getColor(user.verified)"
                >
                  {{ user.verified ? 'Verified' : 'Not Verified' }}
                </v-chip>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="searchUsers.length">
      <v-col v-for="(user, i) in searchUsers" :key="i" cols="12" sm="6" md="4">
        <v-card outlined>
          <v-card-text class="">
            <div class="text-subtitle-2">
              <div class="text-capitalize text-sutitle-1 d-flex align-center justify-space-between">
                <strong>Username</strong><span class="text-h6">{{ user.username }}</span>
              </div>
              <div class="d-flex justify-space-between">
                <strong> Email:</strong> {{ user.email }}
              </div>
            </div>
            <div class="d-flex align-center justify-end">
              <div>
                <v-chip
                  small
                  class="ma-1"
                  :color=" getColor(user.activated)"
                >
                  {{ user.activated ? 'Activated' : 'Not Activated' }}
                </v-chip>
                <v-chip
                  small
                  class="ma-1"
                  :color="getColor(user.verified)"
                >
                  {{ user.verified ? 'Verified' : 'Not Verified' }}
                </v-chip>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="!searchUsers.length">
      <v-col class="text-center text-h6">
        <span>{{ searchError }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    searchText: '',
    searchError: '',
    searchUsers: []
  }),
  head () {
    return {
      title: 'Inksnation',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Inksnation Exchanger Francis Zebulun'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({ allUsers: 'authentication/getUsers' }),
    users () {
      return this.allUsers('all')
    }
  },
  created () {
    this.$store.dispatch('authentication/initUser')
  },
  methods: {
    getColor (status) {
      if (status) {
        return 'primary'
      } else {
        return 'grey lighten-2'
      }
    },
    searchUser () {
      const searchResult = []

      if (this.searchText !== '') {
        this.allUsers('all').forEach((user) => {
          if (user.username.toLowerCase().includes(this.searchText.toLowerCase())) {
            console.log(searchResult)
            console.log(this.searchText)
            searchResult.push(user)
          } else {
            this.searchUsers = []
            this.searchError = `${this.searchText} not found`
          }
        })
      } else {
        this.searchUsers = []
        this.searchError = ''
      }
      this.searchUsers = searchResult
    }
  }
}
</script>
<style >
.bghome {
    background: linear-gradient(#ec268f, #AB1564) ;
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
}

</style>
