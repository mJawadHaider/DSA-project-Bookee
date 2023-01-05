<template>
	<v-card color="#DABDAB">
		<v-row class="justify-center">
			<v-col cols="12" class="pb-0 text-center">
				<h1>Available Books</h1>
			</v-col>
			<v-col
				v-if="user?.isAdmin"
				cols="12"
				class="py-0 pr-7 d-flex justify-end"
			>
				<v-btn color="#EFEBE9" small @click="toggleAddBookModel = true"
					>Add New Book</v-btn
				>
			</v-col>
			<v-col
				cols="12"
				:class="
					user?.isAdmin ? 'pt-0 d-flex justify-center' : 'd-flex justify-center'
				"
			>
				<v-col cols="6" class="pt-0">
					<v-text-field
						v-model="searchQuery"
						label="Search Books"
						placeholder="Search Books"
						color="brown"
						class="mt-0 pt-0"
						hide-details
						dense
						outlined
						prepend-inner-icon="mdi-magnify"
					/>
				</v-col>
			</v-col>
		</v-row>
		<v-row
			v-for="(book, index) in filteredBooksList"
			:key="index"
			class="justify-center px-3"
		>
			<v-col cols="12" class="pb-7">
				<BookDetails
					:book="book"
					:user="user"
					@onBookSelection="onBookSelection"
					@editBtnClicked="onEditBtnClick"
				/>
			</v-col>
		</v-row>
		<v-dialog
			v-model="toggleAddBookModel"
			max-width="600px"
			persistent
			transition="dialog-bottom-transition"
		>
			<AddBookForm
				ref="modelAddBook"
				:book="book"
				:isEditBook="isEditBook"
				@onClose="onCloseAddBookModel"
				@onSubmit="submitBtnClicked"
			/>
		</v-dialog>
	</v-card>
</template>

<script>
import BookDetails from './BookDetails.vue';
import AddBookForm from './AddBookForm.vue';
import { mapState } from 'vuex';

export default {
	name: 'BooksList',
	components: {
		BookDetails,
		AddBookForm,
	},
	data: () => ({
		searchQuery: '',
		toggleAddBookModel: false,
		isEditBook: false,
		book: {
			name: '',
			author: '',
			genre: '',
			description: '',
			image: '',
		},
	}),
	props: {
		booksList: [],
	},
	computed: {
		...mapState('global', ['user']),
		filteredBooksList() {
			if (this.searchQuery) {
				const textValue = this.searchQuery.toUpperCase();
				const filteredList = this.booksList.filter((book) => {
					if (book.name.toUpperCase().indexOf(textValue) > -1) {
						return true;
					}
					return false;
				});
				return filteredList;
			}
			return this.booksList;
		},
	},
	methods: {
		onBookSelection(data) {
			this.$emit('onBookSelection', data);
		},
		cleanAddBookForm() {
			this.toggleAddBookModel = false;
			this.$refs.modelAddBook.$refs.form.resetValidation();
			this.$refs.modelAddBook.$refs.form.reset();
			this.book = {};
		},
		onCloseAddBookModel() {
			this.cleanAddBookForm();
		},
		async submitBtnClicked(book) {
			await this.$emit('newBookAdded', book);
			this.cleanAddBookForm();
		},
		async onEditBtnClick(book) {
			this.isEditBook = true;
			this.book = book;
			this.toggleAddBookModel = true;
		},
	},
	mounted() {},
};
</script>

<style></style>
