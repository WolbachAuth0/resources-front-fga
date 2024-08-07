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

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        prepend-icon="mdi-update"
        color="primary"
        variant="elevated"
        class="mx-4 text-white"
        @click="update"
      >
        <template v-slot:prepend>
          <v-icon color="white"></v-icon>
        </template>
        Edit
      </v-btn>

      <v-btn
        prepend-icon="mdi-delete"
        color="error"
        variant="elevated"
        class="mx-4 text-white"
        @click="remove"
      >
        <template v-slot:prepend>
          <v-icon color="white"></v-icon>
        </template>
        Delete
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Document',
  data () {
    return {
    }
  },
  props: {
    document: {
      resource_id: { type: Number },
      title: { type: String },
      text: { type: String },
      author: { type: String },
    },
    isSelected: { type: Boolean, default: false }
  },
  methods: {
    async update () {

    },
    async remove () {

    }
  },
}
</script>

<style scoped>
  blockquote {
    word-break: break-word;
    width: 200px;
  }
</style>