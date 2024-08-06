<template>
  <v-card variant="elevated" color="background">
    <v-card class="ma-2">
      <v-card variant="outlined" color="black">
        <v-row class="pt-4">

        </v-row>
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
import { user } from '../../services/api'

export default {
  name: 'UserTab',
  components: {
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

