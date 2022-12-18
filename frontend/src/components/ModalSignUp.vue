<template>
  <v-form ref="signUnForm" v-model="validForm">
    <v-row class="pt-2 ma-0 justify-center">
      <v-col class="text-center px-0 pt-6" cols="12" md="12" sm="12">
        <h3
          class="font-italic"
          style="background-color: saddlebrown; color: white"
        >
          SIGN UP
        </h3>
      </v-col>
      <v-col cols="6" md="6" sm="6" class="pb-0 white">
        <v-text-field
          v-model="user.firstName"
          placeholder="Enter First Name"
          variant="outlined"
          label="Fist Name"
          :rules="[rules.required]"
          required
        />
      </v-col>
      <v-col cols="6" md="6" sm="6" class="pb-0 white">
        <v-text-field
          v-model="user.lastName"
          placeholder="Enter Last Name"
          variant="outlined"
          label="Last Name"
        />
      </v-col>
      <v-col cols="12" md="12" sm="12" class="py-0 white">
        <v-text-field
          v-model="user.email"
          placeholder="Enter Email"
          variant="outlined"
          label="Email"
          :rules="[rules.required, rules.email]"
          required
        />
      </v-col>
      <v-col cols="12" md="12" sm="12" class="py-0">
        <v-text-field
          v-model="user.password"
          placeholder="Enter Password"
          variant="outlined"
          label="Password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
          :rules="[rules.required, rules.maxlength]"
          required
        />
      </v-col>
      <v-row class="text-end mr-6 mb-0">
        <v-col cols="12" md="12" sm="12" class="mb-3 d-flex justify-end">
          <v-btn class="mr-1" color="#DABDAB" @click="onClose">Close</v-btn>
          <v-btn class="ml-3" color="#DABDAB" @click="onSubmit" :disabled="!validForm">Sign Up</v-btn>
        </v-col>
      </v-row>
    </v-row>
  </v-form>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "ModalSignUp",
  props: {
    user: Object,
  },
  data: () => ({
    validForm: false,
    visible: false,
    rules: {
      required: (a) => !!a || "This field is required",
      maxlength: (a) => a.length >= 8 || "Minimum 8 characters are required",
      email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    },
  }),
  methods: {
    ...mapActions('global', ['signUp']),
    async onSubmit() {
      await this.signUp(this.user);
      this.onClose();
    },
    onClose() {
      this.$emit('onClose');
    },
  },
};
</script>
<style>
.form {
  width: 100%;
}
</style>
