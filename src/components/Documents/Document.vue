<template>
<v-card variant="outlined" color="black">
  <v-row>
    <v-col cols=4>
      <DocumentDisplay :document="document" />
    </v-col>

    <v-col cols=8>
      <DocumentModify :document="document" />
    </v-col>
  </v-row>
</v-card>
</template>

<script>
import DocumentDisplay from './DocumentDisplay.vue'
import DocumentModify from './DocumentModify.vue'
import { getResourceById, updateResource, removeResource } from './../../services/api'
import EventBus from '../../services/EventBus'

export default {
  name: 'Document',
  components: {
    DocumentDisplay,
    DocumentModify
  },
  data () {
    return {}
  },
  props: {
    document: {
      resource_id: { type: Number },
      title: { type: String },
      text: { type: String },
      author: { type: String },
    }
  }
}
</script>
