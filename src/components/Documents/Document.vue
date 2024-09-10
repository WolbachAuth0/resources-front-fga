<template>
<v-card variant="outlined" color="black">
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
  async mounted () {
    await this.getRelations()
  },
  methods: {
    async getRelations () {
      EventBus.emit('SetProgressBar', { indeterminate: true })
      const response = await listRelations(this.$auth0, this.document.resource_id)
      EventBus.emit('SetProgressBar', { indeterminate: false })
      this.relations = response
    }
  }
}
</script>
