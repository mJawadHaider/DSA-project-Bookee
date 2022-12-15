<template>
  <div class="bg">
    <v-row class="justify-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="150" />
      </v-col>

      <v-row class="text-center">
        <v-col cols="12" md="12">
          <h3 class="font-italic">
            Welcome to Bookee. Let's read, as reading heals!
          </h3> 
        </v-col>
          <!-- <v-btn rounded color="brown" dark elevation="10" class="font-weight-black">
            Click Here To Sign Up
          </v-btn> -->
      </v-row>
    </v-row>
    <v-row class="mt-8 justify-center">
      <v-card  width="35%" color="#EFEBE9" elevation="7">
        <v-col cols="12" md="12" sm="12" class="pt-3 white">
          <v-text-field
            v-model="user.email"
            placeholder="Enter Email"
            :required=[true]
          />
        </v-col>
        <v-col cols="12" md="12" sm="12" class="py-0">
          <v-text-field
            v-model="user.password"
            placeholder="Enter Password"
            :required=[true]
          />
        </v-col>
        <v-col cols="12" md="12" sm="12" class="pa-0 text-end">
          <u class="ma-3">Forgot Password? Click Here</u>
        </v-col>
        <v-col cols="12" md="12" sm="12" class="text-end">
          <v-btn color="#DABDAB">Sign In</v-btn>
        </v-col>
        <v-row class="d-flex align-center">
          <v-col class="text-end" cols="6">Did not register yet?</v-col>
          <v-col class="mb-1 pl-0" cols="6">
            <v-btn
              variant="outlined"
              color="brown"
              class="ml-0"
            >
              Register Now
            </v-btn>
          </v-col>
        </v-row>
      </v-card >
    </v-row>
  <v-footer>
    <v-card width="100%" color="brown" height="40px" class="d-flex align-center justify-center">
      &copy; 2022 Bookee - All Rights Reserved
    </v-card>
  </v-footer>
  </div>
</template>
<script>

export default {
  name: 'Home-Page',

  components: {
  },

  data: () => ({
    user: {
      email: 'admin@gmail.com',
      password: 'admin123',
    }
  }),
}
</script>
<style scoped>
.bg {
  background: url('../assets/background_new.svg');
  background-size: 100%;
  height: 100%;
}
</style>