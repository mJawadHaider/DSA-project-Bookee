<template>
	<v-card color="">
		<v-row>
			<v-col cols="1" class="py-1 pt-3">
				<v-avatar color="grey dakren" size="45">
					<span class="white--text" style="font-size: 12px">
						<h1>{{ community.User.initials }}</h1>
					</span>
				</v-avatar>
			</v-col>
			<v-col cols="8" class="pl-2">
				<v-row class="text-start pl-0">
					<v-col cols="9" class="pb-0">
						<h3>{{ community.User.fullName }}</h3>
					</v-col>
					<v-col cols="3" class="justify-end pb-1">
						<v-btn
							color="brown"
							outlined
							small
							:disabled="user.id === community.User.id"
							@click="followBtnClick"
						>
							{{
								user.id === community.User.id || !isUserFollowed
									? 'Follow'
									: 'UnFollow'
							}}
						</v-btn>
					</v-col>
					<v-col cols="12" class="text-end pa-0">
						<span
							v-if="user.id === community.User.id"
							style="color: red; font-size: 12px"
							class="text-end"
						>
							You cannot Follow Yourself
						</span>
					</v-col>
					<v-col cols="12" class="py-0">
						<i
							>{{ statusMessage }} <b>{{ community.book.name }}</b> -
							{{ community.book.genre }}</i
						>
					</v-col>
					<v-col cols="8" class="pt-0">
						by <i>{{ community.book.author }}</i>
					</v-col>
					<v-col cols="4" class="d-flex justify-end">
						<v-menu :close-on-click="true">
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									color="brown"
									dark
									dense
									small
									outlined
									v-bind="attrs"
									v-on="on"
								>
									{{ actionButtonText }}
								</v-btn>
							</template>

							<v-list>
								<v-list-item v-for="(item, index) in bookActions" :key="index">
									<v-list-item-title
										class="book-action"
										@click="bookActionSelected(item)"
									>
										{{ item.title }}
									</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-col>
					<v-col cols="12" class="pt-0">
						<v-divider></v-divider>
					</v-col>
					<v-col cols="12" class="pt-1">
						Description: {{ community.book.description }}
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="3" class="pr-6">
				<v-img height="200px" :src="getImageUrl(`${community.book.image}`)" />
				<v-row class="pt-4 text-center">
					<v-col cols="12" class="py-0">
						<span>Ratings: {{ community.book.ratings }}</span>
					</v-col>
					<v-col cols="12" class="pt-0">
						<v-rating
							v-model="bookRatings"
							color="yellow darken-3"
							background-color="grey darken-1"
							half-increments
							small
							dense
							readonly
						></v-rating>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import { STATUS } from '../enums';

export default {
	name: 'CommunityCard',
	props: {
		community: Object,
		user: Object,
	},
	data() {
		return {
			image: 'book.jpeg',
			bookActions: [
				{ title: 'Current Reading', action: STATUS.reading },
				{ title: 'Completed', action: STATUS.complete },
				{ title: 'My Books', action: STATUS.inQueue },
			],
			selectedBookAction: '',
		};
	},
	computed: {
		bookRatings() {
			return +this.community.book.ratings;
		},
		actionButtonText() {
			if (!this.selectedBookAction) {
				return 'Add To';
			}
			return this.selectedBookAction;
		},
		isUserFollowed() {
			const userFriends = this.user.friends;
			const communityUserId = this.community.User.id;
			if (userFriends && userFriends?.includes(communityUserId)) {
				return true;
			} else return false;
		},
		statusMessage() {
			let msg = '';
			if (this.community.isReading) {
				msg = 'is reading the book: ';
			} else if (this.community.isComplete) {
				msg = 'has read the book: ';
			} else {
				msg = 'has liked the book: ';
			}
			return msg;
		},
	},
	methods: {
		getImageUrl(img) {
			return require('../assets/' + img);
		},
		bookActionSelected(item) {
			this.selectedBookAction = item.title;
			const data = {
				status: item.action,
				bookId: this.community.book.id,
				userId: this.user.id,
			};
			this.$emit('onBookSelection', data);
		},
		followBtnClick() {
			const data = {
				user: this.user,
				friend: this.community.User,
			};
			if (this.isUserFollowed) {
				this.$emit('userUnfollowed', data);
			} else {
				this.$emit('userFollowed', data);
			}
		},
	},
	mounted() {},
};
</script>

<style scoped>
.initials {
	text-decoration-color: #dc8047;
}

.book-action {
	cursor: pointer;
}
</style>
