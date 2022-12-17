<template>
  <v-app>
    <v-container class="bg" fluid fill-height>
      <v-row class="justify-center">
        <v-col cols="12">
          <v-img
            :src="require('../assets/logo.svg')"
            class="my-3"
            contain
            height="150"
          />
        </v-col>

        <v-row class="text-center">
          <v-col cols="12" md="12">
            <h3 class="font-italic">
              Welcome to Bookee. Let's read, as reading heals!
            </h3>
          </v-col>
        </v-row>
      </v-row>
      <v-row class="mt-8 justify-center">
        <v-card width="35%" color="#EFEBE9" elevation="7">
          <v-form ref="signInForm" valid="validForm">
            <v-row class="d-flex align-center">
              <v-col class="text-center pt-6" cols="12">
                <h3
                  class="font-italic"
                  style="background-color: saddlebrown; color: white"
                >
                  SIGN IN
                </h3>
              </v-col>
            </v-row>
            <v-col cols="12" md="12" sm="12" class="pt-2">
              <v-text-field
                v-model="user.email"
                placeholder="Enter Email"
                outlined
                label="Email"
                :rules="[rules.required, rules.email]"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" class="py-0 pt-0">
              <v-text-field
                v-model="user.password"
                placeholder="Enter Password"
                outlined
                label="Password"
                :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                :type="visible ? 'text' : 'password'"
                @click:append="visible = !visible"
                :rules="[rules.required, rules.maxlength]"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" class="pa-0 text-end">
              <u class="ma-3">Forgot Password? Click Here</u>
            </v-col>
            <v-col cols="12" md="12" sm="12" class="text-end">
              <v-btn color="#DABDAB" @click="onClick">Sign In</v-btn>
            </v-col>
            <v-row class="d-flex align-center">
              <v-col class="text-end" cols="6">Did not register yet?</v-col>
              <v-col class="mb-1 pl-0" cols="6">
                <v-btn
                  outlined
                  color="brown"
                  class="ml-0"
                  size="small"
                  :scrollable="false"
                  @click="dialog = true"
                >
                  Register Now
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
        <br>
      </v-row>
    </v-container>
    <v-dialog
      v-model="dialog"
      max-width="700px"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <modal-sign-up />
      </v-card>
    </v-dialog>

    <v-footer>
      <v-card
        width="100%"
        color="brown"
        height="40px"
        class="d-flex align-center justify-center"
      >
        &copy; 2022 Bookee - All Rights Reserved
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import ModalSignUp from "./ModalSignUp.vue";

export default {
  name: "Home-Page",

  components: {
    ModalSignUp,
  },

  data: () => ({
    dialog: false,
    user: {
      email: "",
      password: "",
    },
    rules: {
      required: (a) => !!a || "This field is required",
      maxlength: (a) => a.length >= 8 || "Minimum 8 characters are required",
      email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    },
  }),
  methods: {
    async onClick() {
      const { valid } = await this.$refs.signInForm.validate();
      if (valid) {
        alert("Form is valid");
      }
    },
  },
};
</script>
<style scoped>
.bg {
  background: url("../assets/background_new.svg");
  background-size: 100%;
  height: 100%;
}

.dialog {
  align-items: center;
  color: blue;
}
</style>
