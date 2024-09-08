<template>
  <v-card>

    <v-form v-model="valid">
      <v-container>

          <v-text-field
            v-model="title"
            :counter="10"
            :rules="titleRules"
            label="Document Title"
            hide-details
            required
          ></v-text-field>

          <v-text-field
            v-model="text"
            :counter="10"
            :rules="textRules"
            label="Text"
            hide-details
            required
          ></v-text-field>

          <v-text-field
            v-model="author"
            :rules="authorRules"
            label="Author"
            hide-details
            required
          ></v-text-field>

    </v-container>
  </v-form>

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
import EventBus from '../../services/EventBus'

export default {
  name: 'Document',
  data () {
    return {
      title: '',
      text: '',
      author: '',
      valid: false,
      authorRules: [
        value => {
          if (value) return true

          return 'Author is required.'
        }
      ],
      textRules: [
        value => {
          if (value) return true

          return 'Author is required.'
        }
      ],
      titleRules: [
        value => {
          if (value) return true

          return 'Author is required.'
        }
      ],
    }
  },
  mounted () {
    this.title = this.document.title
    this.text = this.document.text
    this.author = this.document.author
  },
  props: {
    document: {
      resource_id: { type: Number },
      title: { type: String },
      text: { type: String },
      author: { type: String },
    }
  },
  methods: {
    async update () {
      const body = {
        resource_id: this.document.resource_id,
        title: this.title,
        text: this.text,
        author: this.author
      }
      EventBus.emit('updateDoc', { document: body })
    },
    async remove () {
      EventBus.emit('removeDoc', { resource_id: this.document.resource_id })
    },
    async access () {

    }
  },
}
</script>
