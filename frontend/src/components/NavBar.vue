<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<v-app-bar app color="#DABDAB" elevation="3" flat>
          <a href="/home"> 
            <v-img 
              src="../assets/logo.svg" 
              width="120px"
              to="/home"
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
            <AccountMenu v-if="currentUser" :user="currentUser" @logout="onLogout"/>
          </div>
				</v-app-bar>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import AccountMenu from './AccountMenu.vue';
import { mapActions, mapState } from 'vuex';

export default {
    name: 'ModalSignUp',
    components: {
      AccountMenu,
    },
    data: () => ({
        searchQuery: '',
        tabs: [
          {title:"Home", path:"/home"},
					{title:"Community", path:"/community"},
					{title:"My Books", path:"/my-books"},  
				],
    }),
    computed: {
      ...mapState('global', ['user']),
      currentUser() {
        return this.user;
      },
    },
    methods: {
      ...mapActions('global', ['getMe']),
      onLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.$router.push('login');
      },
      onTitleClick() {
        this.$router.push('/home')
      },
    },
    async mounted() {
      await this.getMe();
    },
	}
</script>