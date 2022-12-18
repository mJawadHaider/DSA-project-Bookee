<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<v-app-bar app color="#DABDAB" elevation="3" flat>
          <a href="/dashboard"> 
            <v-img 
              src="../assets/logo.svg" 
              width="120px"
              to="/dashboard"
            /> 
          </a>
          <v-app-bar-title @click="onTitleClick">Bookee - Let's Read</v-app-bar-title>
					<v-tabs 
            align-with-title 
            color="brown"
          >
            <v-tab
              v-for="(tab, index) in tabs"
              :key="index"
              :to="tab.path"
            >
              {{ tab.title }}
            </v-tab>
					</v-tabs>
          <div class="mr-11">
            <AccountMenu v-if="user" :user="user" @logout="onLogout"/>
          </div>
				</v-app-bar>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import AccountMenu from './AccountMenu.vue';

export default {
    name: 'ModalSignUp',

    components: {
      AccountMenu,
    },

    data: () => ({
        tabs: [
          {title:"Home", path:"/home"},
					{title:"Friends", path:"/friends"},
					{title:"My Books", path:"/my-books"},  
				],
        user: {},
    }),
    methods: {
      onLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.$router.push('login');
      },
      onTitleClick() {
        console.log('its hereeeeee');
        this.$router.push('/dashboard')
      },
    },
    mounted() {
      this.user = JSON.parse(localStorage.getItem('user') || {});
    },
	}
</script>