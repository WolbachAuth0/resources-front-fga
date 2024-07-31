<template>
  <v-app>
    <navigation-bar></navigation-bar>
    <drawer></drawer>

    <v-main>
      <v-container class="py-8 px-6 mb-12" fluid>
        <announcer :visible="alert.visible" :text="alert.text" :type="alert.type" :location="alert.location" @show="show" @hide="hide"></announcer>
        <github-ribbon :url="github" />
        <router-view />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import NavigationBar from "./components/Navigationbar.vue";
import Drawer from "./components/Drawer.vue";
import Announcer from "./components/Announcer.vue";
import EventBus from "./services/EventBus";
import GithubRibbon from "./components/GithubRibbon.vue";
const environ = import.meta.env;

export default {
  components: {
    NavigationBar,
    Drawer,
    Announcer,
    GithubRibbon,
  },
  data() {
    return {
      alert: {
        visible: false,
        text: "",
        type: "success",
        location: "top center",
      },
      github: 'https://github.com/WolbachAuth0/api-registration-demo',
    };
  },
  async mounted() {
    EventBus.on("announce", this.makeAnnouncement)
    if (environ.MODE == 'development') {
      console.log(environ)
    }
  },
  methods: {
    makeAnnouncement({ text = "announcement text", type = "success" }) {
      this.alert.text = text;
      this.alert.type = type;
      this.alert.visible = true;
    },
    show() {
      this.alert.visible = true;
    },
    hide() {
      this.alert.visible = false;
    },
    async reauthSilently () {
      const options = {
        authorizationParams: {
          prompt: 'none'
        }
      }
      this.$auth0.loginWithRedirect(options)
    }
  },
}
</script>

<style scoped>
main {
  background-image: url("https://images.unsplash.com/photo-1546198632-9ef6368bef12?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
}
</style>