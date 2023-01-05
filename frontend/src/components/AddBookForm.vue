<template>
	<v-card>
		<v-card-title>{{ isEditBook ? 'Edit Book' : 'Add New Book' }}</v-card-title>
		<v-card-text class="pb-0">
			<v-form ref="form" v-model="validForm">
				<v-row class="justify-center">
					<v-col cols="6" md="6" sm="6" class="pb-0 white">
						<v-text-field
							v-model="book.name"
							placeholder="Enter Book Name"
							label="Book Name"
							dense
							outlined
							color="brown"
							:rules="[rules.required]"
						/>
					</v-col>
					<v-col cols="6" md="6" sm="6" class="pb-0 white">
						<v-text-field
							v-model="book.author"
							placeholder="Enter Author Name"
							label="Author Name"
							color="brown"
							dense
							outlined
							:rules="[rules.required]"
						/>
					</v-col>
					<v-col cols="6" md="6" sm="6" class="py-0 white">
						<v-file-input
							v-model="currentImage"
							label="Image"
							placeholder="Select Image"
							dense
							outlined
							color="brown"
							accept="image/png, image/jpeg, image/bmp"
						/>
					</v-col>
					<v-col cols="6" md="6" sm="6" class="py-0 white">
						<v-text-field
							v-model="book.genre"
							placeholder="Enter Genre"
							label="Genre"
							color="brown"
							dense
							outlined
							:rules="[rules.required]"
						/>
					</v-col>
					<v-col cols="12" md="12" sm="12" class="py-0 white">
						<v-textarea
							v-model="book.description"
							placeholder="Enter Description"
							label="Description"
							color="brown"
							auto-grow
							rows="3"
							row-height="25"
							dense
							outlined
							:rules="[rules.required]"
						/>
					</v-col>
				</v-row>
			</v-form>
		</v-card-text>
		<v-card-actions>
			<v-row class="text-end mb-0">
				<v-col cols="12" md="12" sm="12" class="pt-3 d-flex justify-end">
					<v-btn class="mr-1" color="#DABDAB" @click="onClose">Close</v-btn>
					<v-btn
						class="ml-3"
						color="#DABDAB"
						@click="onSubmit"
						:disabled="!validForm"
						>Submit</v-btn
					>
				</v-col>
			</v-row>
		</v-card-actions>
	</v-card>
</template>
<script>
export default {
	name: 'AddBookModel',
	props: {
		book: Object,
		isEditBook: {
			type: Boolean,
			default() {
				return false;
			},
		},
	},
	data: () => ({
		image: [],
		validForm: false,
		rules: {
			required: (a) => !!a || 'This field is required',
		},
		ImageRequired: (image) => (image && image.size > 0) || 'Image is required',
	}),
	computed: {
		currentImage: {
			get() {
				let image = [];
				if (!this.isEditBook) {
					return image;
				} else {
					image = new File([], this.book.image, {
						type: 'image',
					});
					return image;
				}
			},
			set(val) {
				this.image = val;
			},
		},
	},
	methods: {
		async onSubmit() {
			if (!this.image?.name) {
				this.image = {
					name: 'NoImage.png',
				};
			}
			const book = {
				...this.book,
				image: this.image.name,
			};
			if (this.isEditBook) {
				this.$emit('onEditSaved', book);
			} else {
				this.$emit('onSubmit', book);
			}
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
