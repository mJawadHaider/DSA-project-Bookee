<template>
	<v-app>
		<v-container class="bg" fluid fill-height>
			<v-row class="justify-center">
				<v-col cols="12" md="12" sm="12">
					<v-img
						:src="require('../assets/logo.svg')"
						class="my-3"
						contain
						height="150"
					/>
				</v-col>

				<v-row class="text-center">
					<v-col cols="12" md="12" sm="12">
						<h3 class="font-italic">
							Welcome to Bookee. Let's read, as reading heals!
						</h3>
					</v-col>
				</v-row>
			</v-row>
			<v-row class="mt-8 justify-center">
				<v-card
					:width="$vuetify.breakpoint.mobile ? '80%' : '35%'"
					color="#EFEBE9"
					elevation="7"
				>
					<v-form ref="signInForm" v-model="validForm">
						<v-row class="d-flex align-center" fill>
							<v-col class="text-center pt-6" cols="12" md="12" sm="12">
								<h3
									class="font-italic"
									style="background-color: saddlebrown; color: white"
								>
									SIGN IN
								</h3>
							</v-col>
						</v-row>
						<v-col cols="12" md="12" sm="12" class="pt-3 pb-0">
							<v-text-field
								v-model="loginUser.email"
								placeholder="Enter Email"
								label="Email"
								color="brown"
								dense
								outlined
								prepend-inner-icon="mdi-email-outline"
								:rules="[rules.required, rules.email]"
							/>
						</v-col>
						<v-col cols="12" md="12" sm="12" class="py-0">
							<v-text-field
								v-model="loginUser.password"
								placeholder="Enter Password"
								label="Password"
								dense
								outlined
								color="brown"
								prepend-inner-icon="mdi-lock-outline"
								:append-icon="togglePasswordIcon ? 'mdi-eye' : 'mdi-eye-off'"
								:type="togglePasswordIcon ? 'text' : 'password'"
								:rules="[rules.required, rules.maxlength]"
								@click:append="togglePasswordIcon = !togglePasswordIcon"
							/>
						</v-col>
						<v-col cols="12" md="12" sm="12" class="text-end pt-0">
							<v-btn color="#DABDAB" @click="onClick" :disabled="!validForm"
								>Sign In</v-btn
							>
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
									@click="signUpDialog = true"
								>
									Register Now
								</v-btn>
							</v-col>
						</v-row>
					</v-form>
				</v-card>
			</v-row>
		</v-container>
		<v-dialog
			v-model="signUpDialog"
			max-width="600px"
			persistent
			transition="dialog-bottom-transition"
		>
			<v-card>
				<ModalSignUp ref="modalSignUp" @onClose="onModalClose" />
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
import ModalSignUp from '../components/ModalSignUp.vue';
import { mapState, mapActions } from 'vuex';

export default {
	name: 'Home-Page',

	components: {
		ModalSignUp,
	},

	data: () => ({
		validForm: false,
		togglePasswordIcon: false,
		signUpDialog: false,
		loginUser: {
			email: 'admin@gmail.com',
			password: 'sajjad734',
		},
		rules: {
			required: (a) => !!a || 'This field is required',
			maxlength: (a) => a.length >= 8 || 'Minimum 8 characters are required',
			email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		},
	}),
	computed: {
		...mapState('global', ['user']),
	},
	methods: {
		...mapActions('global', ['login', 'fetchLoggedInUser']),
		async onClick() {
			// const { valid } = await this.$refs.signInForm.validate();
			await this.login(this.loginUser);
			try {
			} catch (e) {
				this.$toast.error('Invalid Email or Password');
			}
			this.$router.push({ name: 'home' });
			this.$toast.success('Welcome. Happy Reading!');
		},
		onModalClose() {
			this.cleanSignUpForm();
			this.signUpDialog = false;
		},
		cleanSignUpForm() {
			this.$refs.modalSignUp.$refs.form.resetValidation();
			this.$refs.modalSignUp.$refs.form.reset();
		},
	},
};
</script>
<style scoped>
.bg {
	background: url('../assets/background_new.svg');
	background-size: 100%;
	height: 100%;
}
</style>
