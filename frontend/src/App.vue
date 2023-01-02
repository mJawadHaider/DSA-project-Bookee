<template>
	<v-app>
		<v-main class="default-background">
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',
};
</script>

<style>
body,
.default-background {
	/* background-color: #eff0f2; */
	background-color: #f9f7f4;
}
</style>
