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
      <v-btn color="success" class="mx-2" variant="elevated" @click="access">
        <v-icon size="large" color="white" icon="mdi-cloud-key-outline"></v-icon>
        <v-tooltip activator="parent" location="bottom">
            Access
        </v-tooltip>
      </v-btn>

      <v-btn color="primary" class="mx-2" variant="elevated" @click="update">
        <v-icon size="large" color="white" icon="mdi-update"></v-icon>
        <v-tooltip activator="parent" location="bottom">
            Update
        </v-tooltip>
      </v-btn>

      <v-btn color="error" class="mx-2" variant="elevated" @click="remove">
        <v-icon size="large" color="white" icon="mdi-delete"></v-icon>
        <v-tooltip activator="parent" location="bottom">
          Delete
        </v-tooltip>
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
import { updateResource, removeResource } from './../../services/api'
import EventBus from './../../services/EventBus'

export default {
  name: 'Document',
  data () {
    return {
      updateDialog: {
        show: false
      }
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
      const body = {
        resource_id: this.document.resource_id,
        title: '',
        text: '',
        author: ''
      }
      EventBus.emit('updateDoc', { document: body  })
    },
    async remove () {
      EventBus.emit('removeDoc', { document: this.document  })
    }
  },
}
</script>

<style scoped>
  blockquote {
    word-break: break-word;
    width: 300px;
  }
</style>