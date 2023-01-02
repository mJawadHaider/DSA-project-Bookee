<template>
	<v-card color="#eff0f2" width="100%" class="px-3">
		<v-row color="#eff0f2" class="justify-center text-center">
			<v-col cols="12">
				<h1>Community</h1>
			</v-col>
			<v-col
				v-if="!communityList.length"
				cols="12"
				class="py-1"
				style="background-color: white"
			>
				<span style="font-size: 19px">No Content</span>
			</v-col>
			<v-col v-for="(item, index) in communityList" :key="index" cols="11">
				<CommunityCard
					class="pb-3"
					:community="item"
					:user="currentUser"
					@onBookSelection="onBookSelection"
					@userFollowed="userFollowed"
					@userUnfollowed="userUnfollowed"
				/>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import CommunityCard from './CommunityCard.vue';

export default {
	name: 'CommunityList',
	components: {
		CommunityCard,
	},
	props: {
		communityList: [],
		currentUser: Object,
	},
	methods: {
		onBookSelection(data) {
			this.$emit('onBookSelection', data);
		},
		userFollowed(data) {
			this.$emit('userFollowed', data);
		},
		userUnfollowed(data) {
			this.$emit('userUnfollowed', data);
		},
	},
};
</script>

<style></style>
