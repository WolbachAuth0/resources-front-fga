<template>
  <v-card>

    <v-form v-model="form.valid" v-if="canRead">
      <v-container>

          <v-text-field
            v-model="form.title"
            :counter="10"
            label="Document Title"
            :rules="form.titleRules"
            hide-details
            required
            :disabled="!canUpdate"
          ></v-text-field>

          <v-text-field
            v-model="form.text"
            :counter="10"
            label="Text"
            :rules="form.textRules"
            hide-details
            required
            :disabled="!canUpdate"
          ></v-text-field>

          <v-text-field
            v-model="form.author"
            label="Author"
            :rules="form.authorRules"
            hide-details
            required
            :disabled="!canUpdate"
          ></v-text-field>

    </v-container>
  </v-form>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn 
        color="success" 
        class="mx-2" 
        variant="elevated" 
        @click="invite"
        :disabled="!canShare"
      >
        <v-icon size="large" color="white" icon="mdi-cloud-key-outline"></v-icon>
        <v-tooltip activator="parent" location="bottom">
            Invite
        </v-tooltip>
      </v-btn>

      <v-btn
        color="primary"
        class="mx-2"
        variant="elevated"
        @click="update"
        :disabled="!canUpdate"  
      >
        <v-icon size="large" color="white" icon="mdi-update"></v-icon>
        <v-tooltip activator="parent" location="bottom">
            Update
        </v-tooltip>
      </v-btn>

      <v-btn
        color="error"
        class="mx-2"
        variant="elevated"
        @click="remove"
        :disabled="!canDelete"
      >
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
      const payload = {
        resource_id: this.document.resource_id
      }
      EventBus.emit('removeDoc', payload)
    },
    async invite () {
      const payload = {
        resource_id: this.document.resource_id,
        email: 'guest.user@gmail.com'
      }
      EventBus.emit('inviteToDoc', payload)
    }
  },
}
</script>
