<template>
  <v-card variant="elevated" color="background">
    <v-card class="ma-2">
      <v-card variant="outlined" color="black">
        <DocumentsGroup />
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
import { user, listResources } from './../../services/api'
import DocumentsGroup from './DocumentsGroup.vue'
import EventBus from './../../services/EventBus'

export default {
  name: 'DocumentsTab',
  components: {
    DocumentsGroup
  },
  data () {
    return {
      table: {
        items: [],
        headers: [
          {
            title: 'Title',
            align: 'start',
            sortable: true,
            key: 'title',
          },
          {
            title: 'Text',
            align: 'start',
            sortable: false,
            key: 'text',
          },
          {
            title: 'Author',
            sortable: true,
            key: 'author',
          },
        ],
        loading: false
      }
    }
  },
  async mounted () {
    await this.fetchDocuments()
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
    formatDate(dateString) {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat().format(date)
    },
    async fetchDocuments () {
      EventBus.emit('SetProgressBar', { indeterminate: true })
      const response = await listResources(this.$auth0)
      EventBus.emit('SetProgressBar', { indeterminate: false })
      this.table.items = response.data
      this.makeAnnouncement(response)
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
