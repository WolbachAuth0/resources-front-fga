<template>
  <v-row>
    <v-col cols="12">
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="doc in documents" :key="doc.resource_id">
          <Document :document="doc" />
        </v-slide-group-item>
      </v-slide-group>
    </v-col>
  </v-row>
</template>

<script>
import { user, updateResource, removeResource, listResources } from './../../services/api'
import Document from './Document.vue'
import EventBus from './../../services/EventBus'

export default {
  name: 'DocumentsGroup',
  components: {
    Document
  },
  data () {
    return {
      documents: []
    }
  },
  async mounted () {
    EventBus.on('updateDoc', this.updateDocument)
    EventBus.on('removeDoc', this.removeDocument)
    const response = await this.fetchDocuments()
    this.makeAnnouncement(response)
  },
  computed: {
    // user () {
    //   if (this.$auth0.isAuthenticated) {
    //     return user(this.$auth0)
    //   } else {
    //     return null
    //   }
    // }
  },
  methods: {
    async fetchDocuments () {
      EventBus.emit('SetProgressBar', { indeterminate: true })
      const response = await listResources(this.$auth0)
      EventBus.emit('SetProgressBar', { indeterminate: false })

      this.documents = response.data
      return response
    },
    async updateDocument ({ document }) {
      EventBus.emit('SetProgressBar', { indeterminate: true })
      const id = document.resource_id
      const body = {
        title: document.title,
        text: document.text,
        author: document.author
      }
      const response = await updateResource(this.$auth0, id, body)
      EventBus.emit('SetProgressBar', { indeterminate: false })

      this.makeAnnouncement(response)
      await this.fetchDocuments()
    },
    async removeDocument ({ document }) {
      EventBus.emit('SetProgressBar', { indeterminate: true })
      const id = document.resource_id
      const response = await removeResource(this.$auth0, id)
      EventBus.emit('SetProgressBar', { indeterminate: false })

      this.makeAnnouncement(response)
      await this.fetchDocuments()
    },
    makeAnnouncement(response) {
      const announcement = {
        text: `<h3>${response.success ? 'Success:' : 'Warning:'}</h3><p>${response.message}</p>`,
        type: response.success ? 'success' : 'error',
      }
      EventBus.emit('announce', announcement)
    }
  },
}
</script>
