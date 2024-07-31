<template>
  <v-col cols="6" class="pl-4 pb-4">

      <v-card-title class="primary--text">
        User ID Token Payload
      </v-card-title>

      <v-card-text>
        <code-block :code="payload" language="json" parent="profile-view"></code-block>
      </v-card-text>

  </v-col>
</template>

<script>
import CodeBlock from '../CodeBlock.vue'

export default {
  name: 'IDTokenPayload',
  components: {
    CodeBlock
  },
  data () {
    return {}
  },
  props: {
    user: { type: Object }
  },
  computed: {
    payload () {
      const json = JSON.stringify(this.user, null, 2)
      return json
    },
  },
}
</script>