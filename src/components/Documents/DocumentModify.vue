<template>
  <v-card>

    <v-form v-model="form.valid">
      <v-container>

          <v-text-field
            v-model="form.title"
            :counter="10"
            :rules="form.titleRules"
            label="Document Title"
            hide-details
            required
          ></v-text-field>

          <v-text-field
            v-model="form.text"
            :counter="10"
            :rules="form.textRules"
            label="Text"
            hide-details
            required
          ></v-text-field>

          <v-text-field
            v-model="form.author"
            :rules="form.authorRules"
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
      form: {
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
      
    }
  },
  mounted () {
    this.form.title = this.document.title
    this.form.text = this.document.text
    this.form.author = this.document.author
    console.log(this.relations)
  },
  props: {
    document: {
      resource_id: { type: Number },
      title: { type: String },
      text: { type: String },
      author: { type: String },
    },
    relations: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    canRead () {
      return this.relations.includes('can_read')
    },
    canChangeOwner () {
      return this.relations.includes('can_change_owner')
    },
    canDelete () {
      return this.relations.includes('can_delete')
    },
    canShare () {
      return this.relations.includes('can_share')
    },
    canUpdate () {
      return this.relations.includes('can_update')
    },
  },
  methods: {
    async update () {
      const body = {
        resource_id: this.document.resource_id,
        title: this.form.title,
        text: this.form.text,
        author: this.form.author
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
