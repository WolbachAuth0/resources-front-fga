<template>
  <v-col cols="6" class="pr-4 pb-4">

    <v-card-title class="primary--text">
      User Profile
    </v-card-title>

    <v-card-text>
      Manage your personal, contact, and security information.
    </v-card-text>

    <v-form>
      <v-container fluid>
        <v-row>
          <v-col cols=6>
            <v-text-field
              v-model="profile.given_name"
              prepend-inner-icon="mdi-account-box-outline"
              label="First Name"
              :disabled="isDisabled"
              outlined
            ></v-text-field>

            <v-text-field
              v-model="profile.email"
              prepend-inner-icon="mdi-email-outline"
              label="Email"
              outlined
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols=6>
            <v-text-field
              v-model="profile.family_name"
              prepend-inner-icon="mdi-account-box-outline"
              label="Last Name"
              :disabled="isDisabled"
              outlined
            ></v-text-field>

            <v-text-field
              v-model="profile.nickname"
              prepend-inner-icon="mdi-account-box-outline"
              label="Nickname"
              :disabled="isDisabled"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="2" >
            <v-avatar :image="profile.picture" size="94" referrerpolicy="no-referrer"></v-avatar>
          </v-col>

          <v-col cols="10">
            <v-text-field
              v-model="profile.picture"
              prepend-inner-icon="mdi-camera"
              label="Picture URL"
              :disabled="isDisabled"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        :prepend-icon="isDisabled ? 'mdi-alert-outline' : 'mdi-update'"
        :color="isDisabled ? 'error' : 'primary'"
        variant="elevated"
        class="mx-4 text-white"
        @click="updateProfile"
      >
        <template v-slot:prepend>
          <v-icon color="white"></v-icon>
        </template>
        Update
        <v-tooltip activator="parent" location="bottom">
          {{ isDisabled ? `Profile is managed by ${connection}` : 'Save Changes to Profile' }}
        </v-tooltip>
      </v-btn>
    </v-card-actions>

</v-col>
</template>

<script>
import { fetchProfile, updateProfile } from '../../services/api'
import EventBus from '../../services/EventBus'

export default {
  name: 'UserProfileForm',
  data () {
    return {
      profile: {
        email: '',
        given_name: '',
        family_name: '',
        nickname: '',
        name: '',
        picture: '',
        enableMFA: false
      }
    }
  },
  async mounted () {
    const profile = await this.fetchProfile()
    this.profile.email = profile.data.email,
    this.profile.given_name = profile.data.given_name,
    this.profile.family_name = profile.data.family_name,
    this.profile.nickname = profile.data.nickname,
    this.profile.name = profile.data.name,
    this.profile.picture = profile.data.picture
  },
  props: {
    user: { type: Object }
  },
  computed: {
    isDisabled () {
      if (!this.connection) { return false }
      return !['auth0', 'email', 'sms'].includes(this.connection)
    },
    connection () {
      const connection = this.user.sub?.split('|')[0] || 'auth0'
      return connection
    },
  },
  methods: {
    async fetchProfile () {
      EventBus.emit('SetProgressBar', { indeterminate: true })

      const response = await fetchProfile(this.$auth0)
      
      this.makeAnnouncement(response)
      EventBus.emit('SetProgressBar', { indeterminate: false })
      return response
    },
    async updateProfile () {
      if (this.isDisabled) {
        const response = {
          success: false,
          message: `Cannot update the user's profile because the profile is managed by ${this.connection} and not by auth0.`
        }
        this.makeAnnouncement(response)
        return
      }

      EventBus.emit('SetProgressBar', { indeterminate: true })
      const body = {
        given_name: this.profile.given_name,
        family_name: this.profile.family_name,
        nickname: this.profile.nickname,
        name: this.profile.name,
        picture: this.profile.picture,
        user_metadata: {}
      }
      const response = await updateProfile(this.$auth0, body)
      EventBus.emit('SetProgressBar', { indeterminate: false })
      this.makeAnnouncement(response)
    },
    makeAnnouncement(response) {
      const announcement = {
        text: `<h3>${response.success ? 'Success:' : 'Warning:'}</h3><p>${response.message}</p>`,
        type: response.success ? 'success' : 'error',
      }
      EventBus.emit('announce', announcement)
    }
  }
}
</script>