<template>
<v-card variant="outlined" color="black">
  <v-card-title>
    <v-chip prepend-icon="mdi-file-account" variant="elevated" v-if="isOwner" color="success">
      Document Owner
    </v-chip>
    <v-chip prepend-icon="mdi-file-eye" variant="elevated" v-if="isViewer" color="primary">
      Document Viewer
    </v-chip>
  </v-card-title>
  <v-card-subtitle>
    <v-chip v-for="permission of permissions" :key="permission" variant="outlined" color="primary">
      {{ permission }}
    </v-chip>
  </v-card-subtitle>

  <v-row>
    <v-col cols=4>
      <DocumentDisplay :document="document" />
    </v-col>

    <v-col cols=8>
      <DocumentModify :document="document" :relations="relations"/>
    </v-col>
  </v-row>
</v-card>
</template>

<script>
import DocumentDisplay from './DocumentDisplay.vue'
import DocumentModify from './DocumentModify.vue'
import EventBus from './../../services/EventBus'
import { listRelations } from './../../services/api'

export default {
  name: 'Document',
  components: {
    DocumentDisplay,
    DocumentModify
  },
  data () {
    return {
      relations: []
    }
  },
  props: {
    document: {
      resource_id: { type: Number },
      title: { type: String },
      text: { type: String },
      author: { type: String },
    }
  },
  computed: {
    isOwner () {
      return this.relations.includes('owner')
    },
    isViewer() {
      return this.relations.includes('viewer')
    },
    permissions() {
      return this.relations.filter(x => x !== 'owner' && x !== 'viewer')
    }
  },
  async mounted () {
    const response = await this.getRelations()
    console.log(`user has the following relations to doc:${this.document.resource_id}`, response.data)
  },
  methods: {
    async getRelations () {
      EventBus.emit('SetProgressBar', { indeterminate: true })
      const response = await listRelations(this.$auth0, this.document.resource_id)
      EventBus.emit('SetProgressBar', { indeterminate: false })
      this.relations = response.data
      return response
    }
  }
}
</script>
