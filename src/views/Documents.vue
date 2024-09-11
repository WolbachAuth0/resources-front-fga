<template>
  <v-card>
    <v-tabs v-model="tab" density="compact">
      <v-tab
        v-for="item of items"
        :key="item.resource_id"
        :value="item.resource_id"
        class="bg-blue-darken-3"
        rounded="shaped" 
        prepend-icon="mdi-file">
          {{ item.title }}
      </v-tab>
    </v-tabs>

    <ProgressBar />
    <v-divider></v-divider>

    <v-window v-model="tab">

      <v-window-item v-for="item of items" :key="item.resource_id" :value="item.resource_id">
        <v-sheet color="grey-darken-1" class="pa-4" elevation="16">
          <v-card variant="elevated" color="background">
            <v-card class="ma-2">
              
              <Document :document="item"/>

            </v-card>
          </v-card>
        </v-sheet>
      </v-window-item>

    </v-window>
  </v-card>
</template>

<script>
import ProgressBar from './../components/ProgressBar.vue'
import Document from './../components/Documents/Document.vue'
import EventBus from './../services/EventBus'
import { listResources, updateResource, removeResource, inviteToDocument } from './../services/api'

export default {
  name: 'DocumentsView',
  metaInfo: {
    title: 'Documents',
  },
  components: {
    ProgressBar,
    Document
  },
  data () {
    return {
      tab: 0,
      items: []
    }
  },
  async mounted () {
    const response = await this.fetchDocuments()
    this.makeAnnouncement(response)
    this.tab = parseInt(this.$route.query?.resource_id || 0)
    EventBus.on('updateDoc', this.updateDocument)
    EventBus.on('removeDoc', this.removeDocument)
    EventBus.on('inviteToDoc', this.inviteToDocument)
  },
  beforeUpdate () {
    this.tab = parseInt(this.$route.query?.resource_id || 0)
  },
  computed: {
    user () {
      if (this.$auth0.isAuthenticated) {
        return user(this.$auth0)
      } else {
        return null
      }
    }
  },
  methods: {
    async fetchDocuments () {
      EventBus.emit('SetProgressBar', { indeterminate: true })
      const response = await listResources(this.$auth0)
      EventBus.emit('SetProgressBar', { indeterminate: false })
      this.items = response.data
      return response
    },
    makeAnnouncement(response) {
      const announcement = {
        text: `<h3>${response.success ? 'Success:' : 'Warning:'}</h3><p>${response.message}</p>`,
        type: response.success ? 'success' : 'error',
      }
      EventBus.emit('announce', announcement)
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
    async removeDocument ({ resource_id }) {
      EventBus.emit('SetProgressBar', { indeterminate: true })
      const id = resource_id
      const response = await removeResource(this.$auth0, id)
      EventBus.emit('SetProgressBar', { indeterminate: false })

      this.makeAnnouncement(response)
      await this.fetchDocuments()
    },
    async inviteToDocument ({ resource_id, email }) {
      EventBus.emit('SetProgressBar', { indeterminate: true })
      const response = await inviteToDocument(this.$auth0, { resource_id, email })
      EventBus.emit('SetProgressBar', { indeterminate: false })

      this.makeAnnouncement(response)
      await this.fetchDocuments()
    }
  },
}
</script>
