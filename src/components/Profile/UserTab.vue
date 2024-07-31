<template>
  <v-card variant="elevated" color="background">
    <v-card class="ma-2">
      <v-card variant="outlined" color="white">
        <v-row class="pt-4">
          <IDTokenPayload :user="user"/>
          <UserProfileForm :user="user"/>
        </v-row>
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
import { user } from '../../services/api'
import IDTokenPayload from './IDTokenPayload.vue'
import UserProfileForm from './UserProfileForm.vue'

export default {
  name: 'UserTab',
  components: {
    IDTokenPayload,
    UserProfileForm
  },
  data () {
    return {}
  },
  computed: {
    user () {
      if (this.$auth0.isAuthenticated) {
        return user(this.$auth0)
      } else {
        return null
      }
    }
  }
}
</script>

