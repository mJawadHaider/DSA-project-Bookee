<template>
	<div>
		<v-row class="justify-center">
			<v-col cols="4" class="text-center">
				<v-row class="pa-3 pb-0">
					<v-card width="100%">
						<h2>Currently Reading</h2>
					</v-card>
				</v-row>
				<v-row v-if="!booksReading.length" class="px-3 pt-2">
					<v-card width="100%"
						><p style="font-size: 17px" class="mb-0">No Book Added!</p></v-card
					>
				</v-row>
				<v-row v-for="(book, index) in booksReading" :key="index">
					<v-col cols="12" class="pt-6">
						<BookDetails
							:isCurrentBook="true"
							:book="book"
							:user="user"
							@onBookSelection="onBookSelection"
						>
							<h3 class="book-title">{{ book.name }}</h3>
						</BookDetails>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="6">
				<BooksList
					:booksList="booksList"
					:searchQuery="searchQuery"
					@onBookSelection="onBookSelection"
				/>
			</v-col>
			<v-col cols="2">
				<!-- <BookDetails /> -->
			</v-col>
		</v-row>
	</div>
</template>

<script>
import BookDetails from '../components/BookDetails.vue';
import BooksList from '../components/BooksList.vue';
import { mapState, mapActions } from 'vuex';

export default {
	name: 'Home-Page',
	data: () => ({
		searchQuery: '',
	}),
	components: {
		BookDetails,
		BooksList,
	},
	computed: {
		...mapState('global', ['books', 'user', 'bookReading']),
		booksList() {
			return this.books;
		},
		booksReading() {
			const booksArray = this.bookReading.map((book) => {
				return book.book;
			});
			return booksArray;
		},
	},
	methods: {
		...mapActions('global', ['fetchAllBooks', 'getBookReading', 'addUserBook']),
		async onBookSelection(data) {
			await this.addUserBook(data);
			try {
				const response = 'Book Added to ' + data.status.toUpperCase();
				this.$toast.success(response);
				await this.fetchData();
			} catch (e) {
				this.$toast.error('Book Already Added');
			}
		},
		async fetchData() {
			await this.fetchAllBooks();
			await this.getBookReading(this.user.id);
		},
	},
	async mounted() {
		await this.fetchData();
	},
};
</script>

<style>
.book-title {
	font-size: 21px;
}
</style>
