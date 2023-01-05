<template>
	<v-form ref="form" v-model="validForm">
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
					v-model="firstName"
					placeholder="Enter First Name"
					label="Fist Name"
					dense
					outlined
					color="brown"
					:rules="[rules.required]"
				/>
			</v-col>
			<v-col cols="6" md="6" sm="6" class="pb-0 white">
				<v-text-field
					v-model="lastName"
					placeholder="Enter Last Name"
					label="Last Name"
					color="brown"
					dense
					outlined
					:rules="[rules.required]"
				/>
			</v-col>
			<v-col cols="10" md="12" sm="12" class="py-0 white">
				<v-text-field
					v-model="email"
					placeholder="Enter Email"
					label="Email"
					dense
					outlined
					color="brown"
					autocomplete="off"
					prepend-inner-icon="mdi-email-outline"
					:rules="[rules.required, rules.email]"
				/>
			</v-col>
			<v-col cols="10" md="12" sm="12" class="py-0">
				<v-text-field
					v-model="password"
					autocomplete="off"
					placeholder="Enter Password"
					label="Password"
					outlined
					color="brown"
					dense
					prepend-inner-icon="mdi-lock-outline"
					:append-icon="togglePasswordIcon ? 'mdi-eye' : 'mdi-eye-off'"
					:type="togglePasswordIcon ? 'text' : 'password'"
					:rules="[rules.required, rules.maxlength]"
					@click:append="togglePasswordIcon = !togglePasswordIcon"
				/>
			</v-col>
			<v-row class="text-end mr-6 mb-0">
				<v-col cols="12" md="12" sm="12" class="mb-3 d-flex justify-end">
					<v-btn class="mr-1" color="#DABDAB" @click="onClose">Close</v-btn>
					<v-btn
						class="ml-3"
						color="#DABDAB"
						@click="onSubmit"
						:disabled="!validForm"
						>Sign Up</v-btn
					>
				</v-col>
			</v-row>
		</v-row>
	</v-form>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
	name: 'ModalSignUp',
	data: () => ({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		togglePasswordIcon: false,
		validForm: false,
		visible: false,
		rules: {
			required: (a) => !!a || 'This field is required',
			maxlength: (a) => a?.length >= 8 || 'Minimum 8 characters are required',
			email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		},
	}),
	methods: {
		...mapActions('global', ['signUp']),
		async onSubmit() {
			const user = {
				firstName: this.firstName,
				lastName: this.lastName,
				email: this.email,
				password: this.password,
			};
			await this.signUp(user);
			this.onClose();
		},
		onClose() {
			this.$emit('onClose');
		},
	},
};
</script>
<style>
.default-fields {
	color: brown;
}
</style>
