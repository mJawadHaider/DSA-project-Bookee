<template>
  <v-app>
    <v-main>
      <HomePage />
      <!-- <router-view /> -->
    </v-main>
  </v-app>
</template>

<script>
import HomePage from './pages/LoginPage.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',

  components: {
    HomePage,
    NavBar
  },

  data: () => ({
    //
  }),
}
</script>
