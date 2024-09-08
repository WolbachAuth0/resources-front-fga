<template>
  <v-card class="ma-4 px-3 bg-surface-light">
    <v-card-title>
      {{ document.title }}
    </v-card-title>

    <v-card-text >
      <blockquote>
        <p>{{ document.text }}</p>
        <br/>
        <footer>~{{ document.author}}</footer>
      </blockquote>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: 'DocumentDisplay',
  data () {
    return {}
  },
  props: {
    document: {
      resource_id: { type: Number },
      title: { type: String },
      text: { type: String },
      author: { type: String },
    }
  }
}
</script>

<style scoped>
  blockquote {
    word-break: break-word;
    width: 300px;
  }
</style>