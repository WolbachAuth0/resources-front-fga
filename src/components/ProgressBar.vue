<template>
  <v-progress-linear 
      :indeterminate="indeterminate" 
      value="100" 
      height="10" 
      class="primary--text"
      :color="indeterminate ? 'primary' : 'background'"
    >
    </v-progress-linear>
</template>

<script>
import EventBus from './../services/EventBus'

export default {
  name: 'ProgressBar',
  data () {
    return {
      indeterminate: false
    }
  },
  mounted () {
    EventBus.on('SetProgressBar', this.setProgressBar)
  },
  methods: {
    setProgressBar (options) {
      this.indeterminate = options.indeterminate
    }
  }
}
</script>