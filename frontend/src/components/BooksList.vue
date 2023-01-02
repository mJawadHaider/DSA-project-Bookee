<template>
	<v-card color="#DABDAB">
		<v-row class="justify-center">
			<v-col cols="12" class="text-center">
				<h1>Available Books</h1>
			</v-col>
			<v-col cols="6">
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
				/>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import BookDetails from './BookDetails.vue';
import { mapState } from 'vuex';

export default {
	name: 'BooksList',
	components: {
		BookDetails,
	},
	data: () => ({
		searchQuery: '',
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
	},
	mounted() {},
};
</script>

<style></style>
