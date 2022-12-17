<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<v-app-bar app color="#DABDAB" elevation="3" flat>
					<v-img src="../assets/logo.svg" class="" width="120px"></v-img>
					<v-app-bar-title>Bookee - Let's Read</v-app-bar-title>
					<v-tabs align-with-title color="white">
						<v-tab style="color: saddlebrown" class="mb-0">
								Home
						</v-tab>
						<v-tab style="color: saddlebrown" class="mb-0">
								Friends
						</v-tab>
						<v-tab style="color: saddlebrown" class="mb-0">
								Books
						</v-tab>
					</v-tabs>
				</v-app-bar>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
    name: 'ModalSignUp',

    components: {
    },

    data: () => ({
        tabs: [
          {title:"Home", path:"/home"},
					{title:"Friends", path:"/friends"},
					{title:"Books", path:"/books"},  
				],
     }),
	}
</script>