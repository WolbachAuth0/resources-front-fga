<template>
  <v-card>
    <v-tabs v-model="tab" density="compact">
      <v-tab value="0" class="bg-blue-darken-3" rounded="shaped" prepend-icon="mdi-information-outline">About</v-tab>
    </v-tabs>

    <ProgressBar />
    <v-divider></v-divider>

    <v-window v-model="tab">

        <v-window-item :value="0">
          <v-sheet color="grey-darken-1" class="pa-4" elevation="16">
            <AboutTab/>
          </v-sheet>
        </v-window-item>

    </v-window>
  </v-card>
</template>

<script>
import ProgressBar from './../components/ProgressBar.vue'
import AboutTab from './../components/Home/AboutTab.vue'

export default {
  name: "HomeView",
  components: {
    ProgressBar,
    AboutTab
  },
  data () {
    return {
      tab: 0
    }
  }
};
</script>
