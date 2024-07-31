<template>
  
<v-card variant="elevated" color="background">
  <v-card class="ma-2">
    <v-card variant="outlined" color="black">
      <v-card-title>
        Introduction
      </v-card-title>

      <v-card-text>
        The purpose of this application is two fold. First, to demonstrate in practice how to use 
        <a href="https://www.okta.com/customer-identity/">Okta's Customer Identity Cloud (CIC)</a>, 
        also known as <a href="https://auth0.com">Auth0</a>, to handle several different authorization flows. 
        And second, to demonstrate how the Okta FGA platform can be used to grant authorization for specific
        users to access specific resources.
      </v-card-text>
    </v-card>
  </v-card>
</v-card>

</template>

<script>
export default {
  name: 'AboutTab',
  data () {
    return {}
  }
}
</script>