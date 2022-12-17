<template>
    <v-form ref="signInForm" valid="validForm">
        <v-row class="pt-6 ma-0 justify-center">
            <v-col class="text-center pt-6" cols="12" md="12" sm="12">
            <h3 class="font-italic" style="background-color:saddlebrown; color:white;">
             SIGN UP
            </h3>
            </v-col>
            <v-col cols="5" md="5" sm="5" class="pb-0 white">
                <v-text-field v-model="user.firstName" placeholder="Enter First Name" variant="outlined"
                    label="Fist Name" :rules="[rules.required]" required />
            </v-col>
            <v-col cols="5" md="5" sm="5" class="pb-0 white">
                <v-text-field v-model="user.lastName" placeholder="Enter Last Name" variant="outlined"
                    label="Last Name" />
            </v-col>
            <v-col cols="10" md="10" sm="10" class="py-0 white">
                <v-text-field v-model="user.email" placeholder="Enter Email" variant="outlined" label="Email"
                    :rules="[rules.required, rules.email]" required />
            </v-col>
            <v-col cols="10" md="10" sm="10" class="py-0">
                <v-text-field v-model="user.password" placeholder="Enter Password" 
                variant="outlined" 
                label="Password" 
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'" 
                @click:append-inner="visible = !visible"
                :rules="[rules.required, rules.maxlength]" required />
            </v-col>
            <v-col cols="10" md="10" sm="10" class="mb-3 text-end">
                <v-btn color="#DABDAB" @click="onClick                                                                                                              ">Sign Up</v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>
<script>

export default {
    name: 'ModalSignUp',

    components: {
    },

    data: () => ({
        visible: false,
        user: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        rules: {
            required: (a) => !!a || 'This field is required',
            maxlength: (a) => a.length >= 8 || 'Minimum 8 characters are required',
            email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        },
    }),
    methods: {
        async onClick() {
            const { valid } = await this.$refs.signInForm.validate();
            if (valid) {
                alert('Form is valid');
            }
        }
    }
}
</script>
<style>
.form {
    width: 100%;
}
</style>