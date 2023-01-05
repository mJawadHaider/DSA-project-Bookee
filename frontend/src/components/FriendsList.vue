<template>
	<v-card>
		<v-row>
			<v-col class="ml-3 text-center" cols="12">
				<h3 style="font-size: 25px">My People</h3>
			</v-col>
		</v-row>
		<v-row class="pb-5">
			<v-row class="pl-9 pt-4" v-if="!userFriends.length">
				No Friends Found
			</v-row>
			<v-row
				v-else
				class="align-center"
				v-for="(friend, index) in userFriends"
				:key="index"
			>
				<v-col cols="1" class="pl-7">
					<v-avatar color="grey dakren" size="45">
						<span class="white--text" style="font-size: 12px">
							<h1>{{ friend.initials }}</h1>
						</span>
					</v-avatar>
				</v-col>
				<v-col cols="11">
					<v-row>
						<v-col cols="8" class="pl-8 pb-0">
							<b class="mb-0" style="font-size: 18px">{{ friend.fullName }}</b>
						</v-col>
						<v-col cols="4" class="pl-7 pb-0">
							<v-btn
								outlined
								small
								color="brown"
								@click="userUnfollowed(friend)"
							>
								UnFollow</v-btn
							>
						</v-col>
						<v-col v-if="friend.book?.name" cols="12" class="pl-8 pt-0">
							Current Book Reading: <i>{{ friend?.book?.name || 'NaN' }}</i>
						</v-col>
						<v-col v-else cols="12" class="pl-8 pt-0">
							Currently No Activity
						</v-col>
					</v-row>
				</v-col>
				<v-col v-if="index !== userFriends.length - 1" cols="12" class="px-10">
					<v-divider></v-divider>
				</v-col>
			</v-row>
		</v-row>
	</v-card>
</template>

<script>
import CommunityCard from './CommunityCard.vue';

export default {
	name: 'FriendsList',
	components: {
		CommunityCard,
	},
	props: {
		friendsList: [],
		user: Object,
	},
	computed: {
		userFriends() {
			return this.friendsList;
		},
	},
	methods: {
		async userUnfollowed(friend) {
			const data = {
				user: this.user,
				friend: friend,
			};
			this.$emit('unFollow', data);
		},
	},
	mounted() {},
};
</script>

<style></style>
