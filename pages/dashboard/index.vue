<template>
  <v-container v-if="isLogin">
    <v-btn v-if="!show" text @click="show = true">
      <v-icon fab color="primary" class=" mr-2">
        mdi-arrow-left-circle
      </v-icon>
      Go Back
    </v-btn>
    <div v-if="show">
      <v-row>
        <v-btn
          color="primary"
          dark
          fixed
          bottom
          right
          fab
          @click="show = false , component = 'add-user'"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-col cols="12">
          <v-card>
            <v-card flat>
              <v-card-text class="">
                <v-text-field
                  v-model="searchText"
                  light=""
                  prepend-icon="mdi-magnify"
                  clearable=""
                  color="secondary"
                  placeholder="Search by username or email"
                  @keyup="searchUser"
                />
              </v-card-text>
            </v-card>

            <v-tabs

              background-color="secondary"
              center-active
              centered
              dark
            >
              <v-tab @click="type = 'all'">
                All users
              </v-tab>
              <v-tab @click="type = 'verified'">
                Not Verified
              </v-tab>
              <v-tab @click="type = 'activated'">
                Not Activated
              </v-tab>
              <v-tab @click="type = 'paid'">
                Not Paid
              </v-tab>
            </v-tabs>
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
                <div class="d-flex justify-space-between">
                  <strong>Password:</strong> {{ user.password }}
                </div>
                <div class="d-flex justify-space-between">
                  <strong>Pin:</strong> {{ user.pin }}
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
                <v-menu bottom left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      icon
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item @click="edit(i)">
                      <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="deleteUser(i)">
                      <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-if="searchUsers.length">
        <v-col v-for="(user, i) in searchUsers" :key="i" cols="12" sm="6" md="4">
          <v-card outlined>
            <v-card-text class="">
              <div>search</div>
              <div class="text-subtitle-2">
                <div class="text-capitalize text-sutitle-1 d-flex align-center justify-space-between ">
                  <strong>Username</strong><span class="text-h6">{{ user.username }}</span>
                </div>
                <div class="d-flex justify-space-between">
                  <strong> Email:</strong> {{ user.email }}
                </div>
                <div class="d-flex justify-space-between">
                  <strong>Password:</strong> {{ user.password }}
                </div>
                <div class="d-flex justify-space-between">
                  <strong>Pin:</strong> {{ user.pin }}
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

                <v-menu bottom left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      icon
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item @click="edit(i)">
                      <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="deleteUser(i)">
                      <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-if="!users.length " justify="center">
        <v-col class="text-center text-h6">
          <span>No User Found</span>
        </v-col>
      </v-row>

      <v-row v-if="!searchUsers.length">
        <v-col class="text-center text-h6">
          <span>{{ searchError }}</span>
        </v-col>
      </v-row>
    </div>
    <div v-if="!show">
      <keep-alive>
        <component :is="component" :user="editProp" />
      </keep-alive>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import addUser from '../../components/addUser'
import editUser from '../../components/editUser'

export default {
  name: 'Dashboard',
  layout: 'dashboard',

  components: {
    addUser,
    editUser
  },
  data: () => ({
    editProp: null,
    component: '',
    searchText: '',
    show: true,
    searchError: '',

    type: 'all',
    searchUsers: []

  }),
  head () {
    return {
      title: 'Dashboard',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Inksnation Exchanger Francis Zebulun User Dashboard'
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
    ...mapGetters({ allUsers: 'authentication/getUsers', isLogin: 'authentication/getLogin' }),
    users () {
      return this.allUsers(this.type)
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
    },
    edit (index) {
      const selected = this.allUsers('all').[index]
      this.editProp = selected
      this.show = false
      this.component = 'edit-user'
    }

  }

}
</script>

<style>

</style>
