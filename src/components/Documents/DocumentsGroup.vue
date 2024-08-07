<template>
  <v-row>
    <v-col cols="12">
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="doc in documents" :key="doc.resource_id" v-slot="{ isSelected }">
          <Document
            :document="doc"
            :isSelected="isSelected"
          />
        </v-slide-group-item>
      </v-slide-group>
    </v-col>
  </v-row>
</template>

<script>
import { user, listResources } from './../../services/api'
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
  async created () {
    await this.fetchDocuments()
  },
  computed: {
    rowcount () {
      return Math.ceil(documents.length / 3)
    }
    // user () {
    //   if (this.$auth0.isAuthenticated) {
    //     return user(this.$auth0)
    //   } else {
    //     return null
    //   }
    // }
  },
  methods: {
    colcount (rownum) {
      return Math.max(documents.length - 3 * rownum, 3) 
    },
    doc (rownum, colnum) {
      const index = 3*rownum + colnum
      return this.documents[index]
    },
    async fetchDocuments () {
      EventBus.emit('SetProgressBar', { indeterminate: true })
      const response = await listResources(this.$auth0)
      EventBus.emit('SetProgressBar', { indeterminate: false })

      this.documents = response.data
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
