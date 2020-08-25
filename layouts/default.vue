<template>
  <v-app>
    <div>
      <v-app-bar color="white primary--text" fixed flat>
        <v-toolbar-title class="d-flex align-center">
          <v-img
            max-width="50"
            src="/logo.png"
          />
          <v-btn to="/" color="primary" text>
            Inksnation
          </v-btn>
        </v-toolbar-title>

        <v-spacer />
        <v-btn to="/login" text depressed color="primary" class=" rounded-tr-lg rounded-bl-lg text-capitalize ">
          Login
        </v-btn>
      </v-app-bar>
    </div>

    <v-main class="pt-14">
      <v-slide-y-transition mode="out-in">
        <nuxt />
      </v-slide-y-transition>
    </v-main>

    <v-footer id="contact" dark>
      <v-row justify="center">
        <v-col cols="12" class="text-center font-weight-light">
          Copyright © {{ new Date().getFullYear() }}. All Rights Reserved.
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({

    drawer: false,
    socialLink: [
      {
        name: 'facebook',
        to: 'https://facebook.com',
        icon: 'mdi-facebook'
      },
      {
        name: 'twitter',
        to: 'https://twitter.com',
        icon: 'mdi-twitter'
      },
      {
        name: 'instagram',
        to: 'https://instagram.com',
        icon: 'mdi-instagram'
      },
      {
        name: 'whatsapp',
        to: 'https://wa.me/+27639279824',
        icon: 'mdi-whatsapp'
      }
    ],

    mainLinks: [
      { name: 'Home', route: '/' },
      { name: 'About Us', route: '/about' },
      { name: 'FAQ', route: '/faq' },
      { name: 'Terms & Policy', route: '/policy' },
      { name: 'Contact Us', route: '/contact' }
    ]
  })

}
</script>

<style scoped>
.footer-color {
  background-color: #1f2050;
  color: rgba(255, 255, 255, 0.877);
}
.opacity {
  opacity: .9;
}
.opacity-h {
  opacity: .7;
}
.v-btn:before {
  background-color: transparent;
}

.social-hover:hover {
  color: #6200eaec;
}

.home-active {
  transition: all 0.3s ease-in-out;
  border-bottom: 4px solid #ffff;
}
</style>
