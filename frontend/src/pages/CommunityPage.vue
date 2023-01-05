<template>
	<v-row class="justify-center">
		<v-col cols="2" class="px-1">
			<MorePeople :allUsers="allUsersList" @userFollowed="userFollowed" />
		</v-col>
		<v-col cols="6">
			<CommunityList
				:community-list="communityList"
				:currentUser="currentUser"
				@onBookSelection="onBookSelection"
				@userFollowed="userFollowed"
				@userUnfollowed="unfollowFriend"
			/>
		</v-col>
		<v-col cols="4">
			<FriendsList
				:friendsList="friendsList"
				:user="currentUser"
				@unFollow="unfollowFriend"
			/>
		</v-col>
	</v-row>
</template>

<script>
import CommunityList from '../components/CommunityList';
import FriendsList from '../components/FriendsList';
import MorePeople from '../components/MorePeople.vue';
import { mapState, mapActions } from 'vuex';

export default {
	name: 'CommunityPage',
	components: {
		CommunityList,
		FriendsList,
		MorePeople,
	},
	computed: {
		...mapState('global', ['community', 'user', 'friends', 'allUsers']),
		currentUser() {
			return this.user;
		},
		friendsList() {
			return this.friends;
		},
		communityList() {
			return this.community;
		},
		allUsersList() {
			return this.allUsers;
		},
	},
	methods: {
		...mapActions('global', [
			'getMe',
			'fetchCommunity',
			'getAllFriends',
			'removeFriend',
			'addUserBook',
			'addNewFriend',
			'fetchUsersData',
		]),
		async unfollowFriend(data) {
			await this.removeFriend(data);
			try {
				this.$toast.success('User UnFollowed');
				await this.fetchData();
			} catch (e) {
				this.$toast.error('User Not Found');
			}
		},
		async userFollowed(data) {
			if (!data.user) {
				data = {
					friend: data.friend,
					user: this.currentUser,
				};
			}
			try {
				const isAdded = await this.addNewFriend(data);
				if (!isAdded) {
					return this.$toast.error('User Followed Already');
				}
				this.$toast.success('User Followed');
				// this.currentUser.friends = this.currentUser.friends + data.friendId;
				// await this.getAllFriends(this.currentUser.id);
				await this.fetchData();
			} catch (e) {
				this.$toast.error('User Already Followed');
			}
		},
		async onBookSelection(data) {
			try {
				await this.addUserBook(data);
				const response = 'Book Added to ' + data.status.toUpperCase();
				this.$toast.success(response);
				this.fetchCommunity();
			} catch (e) {
				this.$toast.error('Book Already Added');
			}
		},
		async fetchData() {
			const user = await this.getMe();
			await this.fetchCommunity();
			await this.getAllFriends(user.id);
			await this.fetchUsersData(false);
		},
	},
	async created() {
		await this.fetchData();
	},
};
</script>

<style></style>
