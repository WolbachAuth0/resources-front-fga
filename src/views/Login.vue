<template>
  <v-card>
    <v-tabs v-model="tab" density="compact">
      <v-tab value="0" class="bg-blue-darken-3" rounded="shaped" prepend-icon="mdi-login">
          Login
      </v-tab>
    </v-tabs>

    <ProgressBar />
    <v-divider></v-divider>

    <v-window v-model="tab">

      <v-window-item value="0">
        <v-sheet color="grey-darken-1" class="pa-4" elevation="16">
          <v-card variant="elevated" color="background">
            <v-card class="ma-2">
              <v-card variant="outlined" color="black">
              </v-card>
            </v-card>
          </v-card>
        </v-sheet>
      </v-window-item>

    </v-window>
  </v-card>
</template>

<script>
const environ = import.meta.env

export default {
  name: 'RedirectLogin',
  metaInfo: {
    title: 'Login',
  },
  data () {
    return {
      tab: 0
    }
  },
  computed: {
    to () {
      const query = Object.assign(this.$route.query, {
        response_type: 'code',
        client_id: environ.VITE_AUTH0_CLIENT_ID,
        redirect_uri: `${environ.VITE_AUTH0_APP_BASEURL}/`,
        response_mode: 'query'
      })
      const qs = new URLSearchParams(query).toString()
      const to = `https://${environ.VITE_AUTH0_CUSTOM_DOMAIN}/authorize?${qs}`
      return to
    }
  },
  async mounted () {
    console.log(this.to)
    // window.location.href = this.to
    this.$router.push(this.to)
  },
  methods: {

  },
}
</script>
