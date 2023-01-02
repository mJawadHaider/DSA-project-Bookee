<template>
	<v-card width="100%">
		<v-row dense>
			<v-row>
				<v-col cols="12" class="pl-6 py-5">
					<span class="header">People You may Follow</span>
				</v-col>
				<v-col v-if="!allUsers.length" cols="12" class="pl-6 pb-5 pt-0">
					<span style="font-size: 15px">No more people to show !!</span>
				</v-col>
			</v-row>
			<v-row
				v-for="(user, index) in allUsers"
				:key="index"
				:class="index === allUsers.length - 1 ? 'pb-4' : ''"
			>
				<v-col cols="12" class="px-4 py-0">
					<v-divider></v-divider>
				</v-col>
				<v-col cols="2" class="pl-3 pb-0">
					<v-avatar color="grey dakren" size="36">
						<span class="white--text" style="font-size: 9px">
							<h1>{{ user.initials }}</h1>
						</span>
					</v-avatar>
				</v-col>
				<v-col cols="10" class="pl-2 pt-4">
					<v-row class="d-flex align-center">
						<v-col cols="9" class="pl-6 pr-0 pt-4">
							<v-row>
								<v-col cols="12" class="pa-0">
									<span style="font-size: 18px">
										<b>{{ user.fullName }}</b>
									</span>
								</v-col>
								<v-col cols="12" class="pt-0 px-0">
									<span style="font-size: 14px">{{ user.email }}</span>
								</v-col>
							</v-row>
						</v-col>
						<v-col cols="3" md="2" class="px-0 pt-0 d-flex justify-end">
							<v-icon style="cursor: pointer" @click="followUser(user)"
								>mdi-account-plus</v-icon
							>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-row>
	</v-card>
</template>

<script>
export default {
	name: 'MorePeople',
	props: {
		allUsers: [],
	},
	methods: {
		followUser(user) {
			const data = {
				friend: user,
			};
			this.$emit('userFollowed', data);
		},
	},
	mounted() {},
};
</script>

<style>
.header {
	font-size: 18px;
	font-weight: bolder;
}
</style>
