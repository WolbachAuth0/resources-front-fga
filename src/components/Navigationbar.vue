<template>
    <!-- Application bar -->
		<v-app-bar :elevation="11" rounded :theme="theme">
      <template v-slot:prepend>
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
        <!-- <v-img :src="oktaLogoWhite" height="45" width="180" float="left"></v-img> -->
        <v-img :src="advisor360" height="45" width="180" float="left"></v-img>
      </template>

      <v-app-bar-title float="left">
        {{ title }}
      </v-app-bar-title>

      <template v-slot:append>
        
        <!-- login button -->
        <v-btn
          v-if="!isAuthenticated"
          prepend-icon="mdi-login"
          variant="elevated"
          color="primary"
          class="mx-4 text-white"
          @click="login"
        >
          <template v-slot:prepend>
            <v-icon color="white"></v-icon>
          </template>
          Login
        </v-btn>

        <!-- logout button -->
        <v-btn 
          v-if="isAuthenticated"
          prepend-icon="mdi-logout"
          variant="elevated"
          color="primary"
          class="mx-4 text-white"
          @click="logout"
        >
          <template v-slot:prepend>
            <v-icon color="white"></v-icon>
          </template>
          Logout
        </v-btn>

      </template>
    </v-app-bar>
</template>

<script>
import authdocs from '../assets/auth0docs.svg'
import oktaLogoWhite from '../assets/okta-logo-white.svg'

export default {
  name: 'NavigationBar',
  data () {
    return {
      theme: 'dark',
      title: 'Demo - Fine Grained Authorization',
      oktaLogoWhite,
      advisor360: 'https://www.advisor360.com/hs-fs/hubfs/Website/Logos/advisor360_logo.png?width=558&height=105&name=advisor360_logo.png',
      authdocs,
      oktahomeURL: 'https://www.okta.com/',
      authdocsURL: 'https://auth0.com/docs',
    }
  },
  computed: {
    iconColor () {
      if (this.theme == 'dark') {
        return 'white'
      } else if (this.theme == 'light') {
        return 'primary'
      }
    },
    isAuthenticated () {
      return this.$auth0.isAuthenticated.value
    },
    isLoading () {
      return this.$auth0.isLoading.value
    },
    user () {
      return this.$auth0.user.value
    },
  },
  methods: {
    async login () {
      this.$auth0.loginWithRedirect()
    },
    async logout () {
      await this.$auth0.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    }
  }
}
</script>
