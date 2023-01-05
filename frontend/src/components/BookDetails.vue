<template>
	<v-card elevation="4">
		<v-row class="align-start px-5 py-2">
			<v-col class="pa-0 pt-2" :cols="isCurrentBook ? '4' : '3'">
				<v-img
					height="200px"
					contain
					:src="getImageUrl(`${book.image || ''}`)"
				/>
			</v-col>
			<v-col class="pa-0 pl-3">
				<v-row>
					<v-col class="mb-0 pb-0" cols="10">
						<slot>
							<h2>{{ book.name }}</h2>
						</slot>
					</v-col>
					<v-col v-if="!isCurrentBook && user.isAdmin" class="pl-0" cols="2">
						<v-btn outlined color="brown" @click="editBtnClicked">Edit</v-btn>
					</v-col>
					<v-col v-if="!isCurrentBook" class="py-0" cols="12">
						<b>{{ book.author }}</b> -
						<i>{{ book.genre }}</i>
					</v-col>
					<v-col v-else class="py-2" cols="12">
						Author: <b>{{ book.author }}</b> <br />
						-
						<b
							><i>{{ book.genre }}</i></b
						>
					</v-col>
					<v-col cols="12" class="pt-0 pb-2">
						<v-divider></v-divider>
					</v-col>
					<v-col
						v-if="!isCurrentBook"
						cols="12"
						class="py-0 d-flex justify-end"
					>
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
										style="cursor: pointer"
										@click="bookActionSelected(item)"
									>
										{{ item.title }}
									</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-col>
					<v-col v-if="!isCurrentBook" class="py-0" cols="12">
						{{ book.description }}
					</v-col>
					<v-col
						v-if="isCurrentBook"
						cols="12"
						class="d-flex justify-center pb-0"
					>
						<v-btn small outlined color="brown" @click="bookActionSelected">
							Mark as Completed
						</v-btn>
					</v-col>
					<v-col
						:cols="isCurrentBook ? '5' : '7'"
						:class="isCurrentBook ? 'text-end pb-3 pr-0' : 'text-end pr-0 pt-2'"
					>
						<span class="grey--text">({{ bookRating }}) </span>
					</v-col>
					<v-col
						:class="
							!isCurrentBook
								? 'py-0 pl-0 text-end justify-end'
								: 'text-center pb-3 pl-0 pt-2'
						"
						:cols="isCurrentBook ? '7' : '5'"
					>
						<v-rating
							v-model="bookRating"
							color="yellow darken-3"
							background-color="grey darken-1"
							half-increments
							hover
							:readonly="isCurrentBook"
							:small="isCurrentBook"
						/>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import { STATUS } from '../enums';

export default {
	name: 'Book-Details',
	data: () => ({
		bookActions: [
			{ title: 'Current Reading', action: STATUS.reading },
			{ title: 'Completed', action: STATUS.complete },
			{ title: 'My Books', action: STATUS.inQueue },
		],
		bookRating: 0,
		selectedBookAction: '',
	}),
	props: {
		book: Object,
		user: Object,
		isCurrentBook: {
			type: Boolean,
			default() {
				return false;
			},
		},
	},
	computed: {
		actionButtonText() {
			if (!this.selectedBookAction) {
				return 'Add To';
			}
			return this.selectedBookAction;
		},
	},
	methods: {
		getImageUrl(img) {
			// console.log(this.book, 'this.book', img);
			if (!img) {
				img = 'NoImage.png';
			}
			return require('../assets/' + img);
		},
		bookActionSelected(item) {
			if (this.isCurrentBook) {
				item = {
					action: STATUS.complete,
				};
			} else {
				this.selectedBookAction = item.title;
			}
			this.$emit('onBookSelection', {
				userId: this.user.id,
				bookId: this.book.id,
				status: item.action,
			});
		},
		editBtnClicked() {
			this.$emit('editBtnClicked', this.book);
		},
	},
	mounted() {
		this.bookRating = this.book.rating || 0.0;
	},
};
</script>

<style>
.book-card {
	background-color: #eff0f2;
}
</style>
