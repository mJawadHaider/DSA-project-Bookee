import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
// import VueIziToast from 'vue-izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import routes from './routes';
import store from './store';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;

// Vue Router Documentation https://v3.router.vuejs.org/installation.html#npm
const router = new createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('token');
	let user = JSON.parse(localStorage.getItem('user') || '{}');

	if (to.path === '/login') {
		return next();
	}
	if (
		to.matched.every((rec) => {
			const roles = rec.meta.roles || [];
			if (rec.meta?.authNotRequired) {
				return next();
			}
			return !roles.includes('all') && !roles.includes(user.role);
		})
	) {
		return next({ path: '/home' });
	}
	next();
});

const app = createApp(App, {
	components,
	directives,
});

app.config.errorHandler = (err, vm) => {
	// err: error trace
	// vm: component in which error occured
	// info: Vue specific error information such as lifecycle hooks, events etc.

	console.error(err, '<=== Main.js Error Tracking');
	if (err) vm.$toast?.error(err.message || err);
};

const options = {
	position: 'topCenter',
};
// app.use(VueIziToast, options);

app.use(router);
app.use(vuetify);
app.use(store);

Promise.all([store.dispatch('fetchUsersData')]).then((res) => {
	app.mount('#app');
});
